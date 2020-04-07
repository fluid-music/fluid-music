const R = require('ramda');

/**
 * @param {Object} noteLibrary - A JavaScript object wherein values are numbers
 * @param {Number} amount An interger number of steps to rotate the values
 * @returns {Object} a noteLibrary style object, wherein the keys all point to
 *    subsequent values.
 */
const rotate = (noteLibrary, amount=1) => {
  const paris = R.toPairs(noteLibrary);
  const sortedPairs = R.sort((a,b) => {a[1] - b[1]}, paris);
  const result = {};
  sortedPairs.forEach((val, i, all) => {
    const otherIndex = R.mathMod(i + amount, all.length);
    result[val[0]] = all[otherIndex][1];
  });
  return result;
};

module.exports = {
  rotate,
};
