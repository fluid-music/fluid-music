const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

/**
 * Recursively find all the filename in a given directory.
 * @param {string} dir directory to search
 * @returns {Promise} An array of all the filenames in a given folder
 */
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

/**
 * Recursively find all the wav files in the given path
 * @param {string} searchPath directory to search
 * @returns {Promise} An array of filenames
 */
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
 * @returns {Promise} An array of directory names
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

/**
 * For every immediate (non-recursive) child directory in base dir `baseDir`,
 * find all the .wav files in that directory. For example,
 *
 * /wav/alpha/a.wav
 * /wav/alpha/b.wav
 * /wav/beta/1/kick.wav
 * /wav/beat/2/snare.wav
 *
 * `waveFilesInFolderGroups('/wav')` would return:
 * ```
 * [
 *  [ /wav/alpha/a.wav, /wav/alpha/b.wav ],
 *  [ /wav/beta/1/kick.wav, /wav/beat/2/kick.wav ],
 * ]
 * ```
 *
 * Note that the result is two layers deep, no matter how deep the folder
 * structure is.
 *
 * Useful if you have a sample library characterized by sub folders, and want a
 * two-dimensional array, with one sub-array for
 * @param {string} baseDir directory to search
 * @returns {Promise} A 2-dimensional array. Each sub-array contains filenames
 *    for all the .wav files (recursively) found insider that top-level sub-dir.
 */
async function wavFilesInFolderGroups(baseDir) {
  const subDirs = await getDirsIn(baseDir);
  console.log(subDirs);
  let wavCollections = await Promise.all(subDirs.map(getWavFilesIn));

  wavCollections = wavCollections.filter((collection, i) => {
    if (collection && collection.length) return true;
    console.log('No wav files found:', subDirs[i]);
    return false;
  });
  return wavCollections;
};

module.exports = {
  getDirsIn,
  getWavFilesIn,
  wavFilesInFolderGroups,
};
