const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

async function walk(dir) {
    let files = await fsp.readdir(dir);
    files = await Promise.all(files.map(async file => {
        const filePath = path.join(dir, file);
        const stats = await fsp.stat(filePath);
        if (stats.isDirectory()) return walk(filePath);
        else if(stats.isFile()) return filePath;
    }));

    return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

const getWavFilenames = async function(searchPath) {
  return walk(searchPath).then((files) => {
    return files.filter(filename => filename.toLowerCase().endsWith('.wav'));
  });
};

/**
 * Randomly get an element from an object or array
 * @param {Object|Array} input 
 */
function randomChoice(input) {
  if (!input.length && !(Object.keys(input).length))
    return undefined;
  if (Array.isArray(input))
    return input[Math.floor(Math.random() * input.length)];
  else
    return input[randomChoice(Object.keys(input))];
}

/**
 * Get an array containing the full path name of all the directories in baseDir
 * @param {string} baseDir directory to search
 */
async function getSubDirs(baseDir) {
  let files = (await fsp.readdir(baseDir)).map(filename => {
    return path.join(baseDir, filename) 
  });
  let stats = await Promise.all(files.map( filename => fsp.stat(filename)));
  const results = [];
  files.forEach((filename, i) => {
    if (stats[i].isDirectory()) results.push(filename);
  });

  return results;
};


async function run() {
  const baseDir = '/Users/charles/projects/reaper/sounds/';
  const subDirs = await getSubDirs(baseDir);
  console.log(subDirs);
  let wavCollections = (await Promise.all(subDirs.map(getWavFilenames)))
  wavCollections = wavCollections.filter((collection, i) => {
    if (collection && collection.length) return true;
    console.log('No wav files found:', subDirs[i]);
    return false;
  });

  wavCollections.forEach(collection => {
    console.log(randomChoice(collection));
  });
}

run().then(result => {
  console.log('Done!');
});
