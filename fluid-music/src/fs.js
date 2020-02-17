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

async function getWavFilesIn(searchPath) {
  return walk(searchPath).then((files) => {
    return files.filter(filename => filename.toLowerCase().endsWith('.wav'));
  });
};


/**
 * Non-recursively get an array containing the full path name of all the
 * directories in baseDir.
 *
 * @param {string} baseDir directory to search
 */
async function getDirsIn(baseDir) {
  let files = (await fsp.readdir(baseDir)).map(filename => {
    return path.join(baseDir, filename) 
  });
  let stats = await Promise.all(files.map(filename => fsp.stat(filename)));
  const results = [];
  files.forEach((filename, i) => {
    if (stats[i].isDirectory()) results.push(filename);
  });

  return results;
};

module.exports = {
  getDirsIn,
  getWavFilesIn,
};
