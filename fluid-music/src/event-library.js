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

module.exports = {
  merge,
}
