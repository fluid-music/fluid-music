#!/usr/bin/env node
const path  = require('path');
const fs    = require('fs');
const fluid = require('.');

const usage = `sample-scan [search-dir=.] [outfile.js]

sample-scan recursively searches "search-dir" for audio files, and generates a
common.js file containing meta data about the files.

"cybr" must be running on the default port for this to work, because sample-scan
doesn't actually read files, it just requests the meta data from cybr.

The metadata for each file includes a ".path" property which will be specified
relative to the current working directory.
`

console.warn(usage);

// Create a generic method for recursively walking a file tree
const dirsToSkip = ['node_modules', '.git'];
const extsToGet = ['.wav', 'aiff', '.aif',]; // '.m4a', '.mp3', '.ogg'];
const walk = async (dirname, takeAction = v=>console.log(v)) => {
  const files = await fs.promises.readdir(dirname);
  for (const file of files) {
    let name = path.join(dirname, file);
    const stats = await fs.promises.lstat(name);
    // Skip symbolic links to mitigate the risk of an infinite loop
    if (!stats.isSymbolicLink() && stats.isDirectory() && dirsToSkip.indexOf(file) === -1) await walk(name, takeAction);
    if (stats.isFile() && extsToGet.indexOf(path.extname(name).toLowerCase()) !== -1) await takeAction(name);    
  }
};

const client = new fluid.Client();
client.connect(true);

// getAndHandleReport requests audio file properties from cybr, and puts it
// into the `results` object.
const cwd     = process.cwd();
const results = {}
const getAndHandleReport = async (filename) => {
  try {
    const result = await client.send(fluid.audiofile.report(filename));
    if (result.args.length < 2 || result.args[0].value) {
      console.error("ERROR:", filename, result.args);
      return;
    }
    const report = JSON.parse(result.args[1].value);
    report.path = path.relative(cwd, report.absolutePath); // path will be relative to the working directory
    if (report.hasOwnProperty('givenPath')) delete report.givenPath;

    const key = path.basename(report.path.slice(0, -path.extname(report.path).length));
    if (results.hasOwnProperty(key)) console.warn(`WARNING: omitting non-unique (${key}) filename: ${report.path}`);
    else results[key] = report;
    console.warn(report.path);
  } catch(e) {
    console.error(e);
  }
}

const args      = process.argv.slice(2);
const arg       = args[0] || '.';
const inputPath = path.isAbsolute(arg) ? arg : path.join(cwd, arg);
const stats     = fs.lstatSync(inputPath);
const writer    = args[1] ? fs.createWriteStream(args[1]) : process.stdout;
if (args[1]) console.log(`Writing to: ${args[1]}`);

let promise;

if (stats.isDirectory()) {
  console.warn('found directory:', inputPath);
  promise = walk(inputPath, getAndHandleReport)
} else if (stats.isFile()) {
  console.warn('found file:', inputPath);
  promise = getAndHandleReport(inputPath);
} else {
  console.error(`ERROR: "${arg}" is not a file or directory`);
  process.kill();
}

promise.then(() => {
  writer.write('module.exports = ');
  writer.write(JSON.stringify(results, null, 2));
  writer.write('\n');
  console.warn('COMPLETE');
}).finally(() => {
  client.close();
});
