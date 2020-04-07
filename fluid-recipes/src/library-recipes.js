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

/**
 * Create a 16 noteLibrary on an ascending minor scale noteLibrary. The
 * noteLibrary begins on the specified midi note with '0', and counts upwards to
 * 'f' in hexadecimal.
 *
 * @param {number} [startNote=33] Midi note number to begin the scale on. 33
 *    creates an A-minor scale.
 * @returns {object} A `noteLibrary` object
 */
const createMinorScale = (startNote=33) => {
  //                    w  h  w  w  h   w | w   w   h   w   w   h   w | w   w
  const intervals = [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24, 26];
  const keys      = [0, 1, 2, 3, 4, 5, 6,  7,  8,  9,  'a','b','c','d','e','f'];
  const obj       = R.zipObj(keys, intervals);
  return R.mapObjIndexed(n => n+startNote, obj);
}

module.exports = {
  createMinorScale,
  rotate,
};
