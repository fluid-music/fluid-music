const R = require('ramda');

const patternHelpers  = require('./pattern-helpers');
const countOnsetChars = patternHelpers.countOnsetChars;
const hasOnsetChar    = patternHelpers.hasOnsetChar;
const nonOnsets       = patternHelpers.nonOnsets;

const wiggle = (pString, n) => {
  if (!hasOnsetChar(pString))
    throw new Error(`wiggle: pattern string (${pString}) must have at least one Onset character`);

  if (n === undefined) n = countOnsetChars(pString);

  let i = 0;
  let permutations = 0;
  const results = [];
  while (permutations < n) {
    if (!R.includes(pString[i], nonOnsets)) {
      let permutationChars = R.insert(i+1, '-', pString);
      results.push(R.join('', permutationChars));
      permutations++;
    }
    i = (i+1) % pString.length;
  }
  return results;
};

module.exports = {
  wiggle,
};
