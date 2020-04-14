const R = require('ramda');

/**
 * Characters in this string do not signify a note onset in a pattern
 */
const nonOnsets = '_.- '

function hasOnsetChar(pString) {
  const chars = Array.from(pString);
  for (let char of chars) {
    if (!R.includes(char, nonOnsets)) return true;
  }
  return false;
}

function countOnsetChars(pString) {
  const chars = Array.from(pString);
  const results = R.map(char => R.includes(char, nonOnsets), chars);
  return R.reduce((acc, e) => acc + (e ? 0 : 1), 0, results);
}

module.exports = {
  countOnsetChars,
  hasOnsetChar,
  nonOnsets,
};
  