/**
 * Convert rhythm string to a cumulative array of durations
 * @param {string} rhythm - String representing of a rhythm
 * @returns {number[]} - monotonic time elapsed
 */
const parseRhythm = function(rhythm) {
  // advances will look like this: [.4,0,0,0,0.5,0]
  const advances = rhythmToAdvanceArray(rhythm);
  // each segment will look like this: [[.4,0,0,0],[.5, 0]]
  const segments = getSegments(advances);
  // forEach segment, what value does it begin at? [0, 0.4]
  const segmentStartTotals = getSegmentStartTotals(advances);

  const result = [];
  segments.forEach((segment, j) => { // segment will look like [.4,0,0,0]
    const segmentTotal = segment[0];
    segment.forEach((_, i) => {
      let v = (i+1) * segmentTotal / segment.length;
      result.push(v + segmentStartTotals[j]);
    });
  });

  return result;
};

const isEmpty =   (char) => char === ' ' || char === '.';
const notEmpty =  (char) => !isEmpty(char);
const isQuarter = (char) => char.length === 1 && '1234567890'.includes(char);
const is8th =     (char) => char === '+';
const is16th =    (char) => char === 'a' || char === 'e';
const is32nd =    (char) => char === 't';

/**
 * Helper method gets the implied division of a rhythm char.
 * @param {string} char 
 */
const division = (char) => {
  if (typeof char !== 'string' || char.length !== 1)
    throw new Error(`division must be a string of length 1, got: '${char}'`);

  if (isEmpty(char)) return 0;
  if (isQuarter(char)) return 1/4;
  if (is8th(char)) return 1/8;
  if (is16th(char)) return 1/16;
  if (is32nd(char)) return 1/32;

  throw new Error(`No division for '${char}' character`);
};

/**
 * Convert each character in an string to an duration.
 * In the following examples, q=1/4 and e=1/8
 * Quarter notes:
 *   rhythm - '1+2+'
 *   result - [e,e,e,e]
 * Spaces leave a 0 in the array.
 *   rhythm - '1 + '
 *   result - [e,0,e,0]
 * Eighth and quarter notes:
 *   rhythm - '1234+'
 *   result - [q,q,q,e,e]
 *
 * See tests for more examples.
 * @param {string} rhythm - String representing of a rhythm
 * @returns {number[]}  - An array of durations for each character
 */
const rhythmToAdvanceArray = function(rhythm) {
  if (typeof rhythm === 'string') rhythm = rhythm.split('');

  const result = [];

  rhythm.forEach((char, i, array) => {
    let next = null; // next non-zero value
    for (const c of array.slice(i+1)) {
      if (notEmpty(c)) {
        next = c;
        break;
      }
    }

    let amount = null;
    if (isEmpty(char)) 
      amount = 0;
    else if (next === null)
      amount = division(char);
    else
      amount = Math.min(division(char), division(next));

    result.push(amount);
  });

  return result;
}

const rhythmToElapsedArray = function(rhythm) {
  rhythm = rhythmToAdvanceArray(rhythm);

  let accumulator = 0;
  return rhythm.map((value) => accumulator += value);
};

/**
 * Create sub groups for advances.
 *
 * This helper class is only exported for testing purposes.
 *   in  - [1,0,0,0,2,0]
 *   out - [[1,0,0,0], [2,0]]
 * @param {number[]} advances
 */
const getSegments = function(advances) {
  const nonZeroIndices = []; // [0, 4]
  advances.forEach((e, i) => { if (e !== 0) nonZeroIndices.push(i); });
  const segments = [];
  nonZeroIndices.forEach((nonZeroStartIndex, i, array) => {
    let start = nonZeroStartIndex;
    let end   = (i+1 === array.length) ? advances.length: array[i+1];
    segments.push(advances.slice(start, end));
  });
  return segments;
}

const getSegmentStartTotals = function(advances) {
  const result = [];
  let accumulator = 0;

  advances.forEach(v => {
    if (!v) return;
    result.push(accumulator);
    accumulator += v;
  });
  return result;
}

module.exports = {
  parseRhythm,
  rhythmToElapsedArray,
  rhythmToAdvanceArray,
  getSegments,
};
