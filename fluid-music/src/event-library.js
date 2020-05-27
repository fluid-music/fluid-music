const converters = require('./converters');

/**
 * Merge multiple event libraries into one, throw an error if any of the input
 * libraries have overlapping keys.
 * @param  {...NoteLibrary} libraries
 */
const merge = (...libraries) => {
  const result = {};
  const add = (key, value) => {
    if (result.hasOwnProperty(key))
      throw new Error('eventLibrary.merge: input libraries have duplicate key: ' + key);
    result[key] = value;
  };

  for (let library of libraries) {
    if (Array.isArray(library)) library.forEach((value, key) => add(key, value));
    else Object.entries(library).forEach(entry => add(...entry));
  }
  return result;
}

/**
 * Accept a deeply nested array of strings, and return a new deep array of midi
 * note numbers. String arrays can be easier to read than number arrays:
 * ```
 * const chord = ['e4', 'a4', 'b4', 'c#5'];
 * ```
 * 
 * Only works with Arrays of strings, not Objects. Objects are output unchanged.
 * @param {number[]|number} arrayOrNum
 * @returns {number[]|number}
 */
const stringsToNoteNumbers = (arrayOrNum) => {
  if (Array.isArray(arrayOrNum)) {
    return arrayOrNum.map(stringsToNoteNumbers);
  };

  if (typeof arrayOrNum === 'number') return arrayOrNum;
  if (typeof arrayOrNum === 'string') return converters.valueToMidiNoteNumber(arrayOrNum);

  // pass objects
  return arrayOrNum;
}

module.exports = {
  merge,
  stringsToNoteNumbers,
};
