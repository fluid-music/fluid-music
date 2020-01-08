const valueToMidiNoteNumber = require('./converters').valueToMidiNoteNumber;

/**
 * Convert rhythm string to a cumulative array of durations.
 *
 * @param {string} rhythm - String representing of a rhythm
 * @returns {object} - a javascript object representing timing. The object will
 *          have two properties, both of which are arrays:
 *          - .totals is a measure of elapsed times
 *          - .deltas is the duration of each character
 */
const parseRhythm = function(rhythm) {
  // advances will look like this: [.4,0,0,0,0.5,0]
  const advances = rhythmToAdvanceArray(rhythm);
  // each segment will look like this: [[.4,0,0,0],[.5, 0]]
  const segments = advanceArrayToSegments(advances);
  // forEach segment, what value does it begin at? [0, 0.4]
  const segmentStartTotals = getSegmentStartTotals(advances);

  const totals = []; // [.1, .2, .3, .4, .65, .90]
  const deltas = []; // [.1, .1, .1, .1, .25, .25]
  segments.forEach((segment, j) => { // segment will look like [.4,0,0,0]
    const segmentTotal = segment[0];
    segment.forEach((_, i) => {
      let v = (i+1) * segmentTotal / segment.length;
      totals.push(v + segmentStartTotals[j]);
      deltas.push(segmentTotal / segment.length)
    });
  });

  return {totals, deltas};
};

/**
 * Convert a rhythm, pattern, and note library to a collection of note objects.
 *
 * @param {string} rhythm
 * @param {string} pattern
 * @param {(number[]|number[][]|object)} noteLibrary - an indexable object
 *        containing notes or arrays of notes. Can be an object or an array.
 *        If it is an array, the pattern is limited symbols single digit
 *        numbers 0-9.
 *
 *        All symbols in the pattern should reference values in the noteLibrary.
 *
 *        To create 'c' and 'd' quarter notes on beats 1 and 3 respectively:
 *        rhythm  = '1234'
 *        pattern = '0.1.'
 *        noteLibrary = ['c4', 'd4']
 *        noteLibrary = {'0': 'c4', '1': 'd4' }
 */
const parseTab = function(rhythm, pattern, noteLibrary) {
  const rhythmObject = parseRhythm(rhythm);
  const symbolsAndCounts = patternToSymbolsAndCounts(pattern);
  let p = 0; // position (in the rhythmObject)
  const results = [];

  for (let sc of symbolsAndCounts) {
    let symbol = sc[0];
    let count = sc[1];
    if (symbol !== '.') {
      let notes = noteLibrary[symbol];
      if (notes === undefined) throw new Error(`noteLibrary has no note or chord for "${symbol}"`);
      if (!Array.isArray(notes)) notes = [notes]
      notes.forEach((note) => {
        const start = (p === 0) ? 0 : rhythmObject.totals[p-1];
        const end = rhythmObject.totals[p+count-1];
        results.push({
          n: valueToMidiNoteNumber(note),
          s: start,
          l: end - start,
        });
      });
    }
    p += count;
  }
  return results;
};

const isEmpty =   (char) => char === ' ' || char === '.';
const notEmpty =  (char) => !isEmpty(char);
const isWhole =   (char) => char === 'w';
const isHalf =    (char) => char === 'h';
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
  if (isWhole(char)) return 1;
  if (isHalf(char)) return 0.5;

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
  if (typeof rhythm === 'string') rhythm = Array.from(rhythm);

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
const advanceArrayToSegments = function(advances) {
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

/**
 * getSegmentStartTotals is a helper method used by parseRhythm. It calculates
 * the start time for each "segment." As an example:
 * "advances" are returned by rhythmToAdvanceArray: [.4,0,0,0,  .5,0,  .5,0]
 * "segments" are returned by getSegments:         [[.4,0,0,0],[.5,0],[.5,0]]
 *
 * Given the advances here, this should return the total amount of time elapsed
 * at the beginning of each segment:                [0,         .4,    .9]
 *
 * Calculating start times before distributing the advances across any zeros in
 * segments allows us to accumulate less floating point error. I do not think
 * there is a reason to export getSegmentStartTotals for public use.
 *
 * @param {number[]} advances - an array returned by rhythmToAdvanceArray()
 * @returns {number[]} - total elapsed times at the beginning of each segment
 */
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

/**
 * This helper method converts a pattern into an intermediary format that is
 * helpful for parsing a tab. Its easiest to understand with an example:
 *
 * const input = 'a-1-bb...';
 * const output = [['a',2], ['1',2], ['b',1], ['b', 1], ['.', 3]];
 *
 * For every new symbol, the out output lists that symbol, and the number of
 * positions that that symbols is active for.
 * @param {string} pattern
 */
const patternToSymbolsAndCounts = function(pattern) {
  const chars = Array.from(pattern.replace(/ /g, '.'));
  const results = [];
  // pattern: '0-......1-....22'
  // symbols:  0 .     1 .   22
  // counts:   2 6     2 4   11

  let currentChar = chars[0];
  let onSymbol = currentChar !== '.'; // are we starting on a symbol?
  if (currentChar === '-') throw new Error(`Bad pattern string: "${chars} (begins on -)`);

  chars.forEach((c) => {
    if (c === '-') {
      if (!onSymbol) throw new Error(`Bad pattern string: "${chars}" (- may not follow .)`);
      results[results.length-1][1]++;
    } else if (c === '.') {
      if (onSymbol || !results.length) results.push([c, 1]);
      else results[results.length-1][1]++;
      onSymbol = false;
    } else {
      results.push([c, 1])
      onSymbol = true;
    }
  });
  return results;
}

/**
 * Created noteObject arrays from deeply nested objects.
 *
 * @param {Object|Array} object - The only required argument. If a rhythm and
 *        noteLibrary
 * @param {[string]} rhythm - rhythm string, if not specified, main `object`
 *        must have a `.r` property.
 * @param {[object|Array]} noteLibrary - An object or array noteLibrary (see
 *        parseTab for details). If not specified, the main `object` must have
 *        a `.noteLibrary` property.
 * @param {[number]} startTime - offset all the notes by this much
 */
const parse = function(object, rhythm, noteLibrary, startTime) {
  let notes = [];
  if (typeof startTime !== 'number') startTime = 0;
  if (object.hasOwnProperty('noteLibrary')) noteLibrary = object.noteLibrary;
  if (object.hasOwnProperty('r')) rhythm = object.r;

  let total = startTime;
  if (Array.isArray(object)) {
    for (let o of object) {
      let a = parseRhythm(rhythm);
      notes.push(...parse(o, rhythm, noteLibrary, total));
      total += a.totals[a.totals.length - 1];
    }
  } else if (typeof object !== 'string') {
    for (let [key, val] of Object.entries(object)) {
      if (key === 'noteLibrary' || key === 'r') continue;
      notes.push(...parse(val, rhythm, noteLibrary, startTime));
    }
  } else {
    const result = parseTab(rhythm, object, noteLibrary).map((n) => {
      n.s += startTime;
      return n;
    });
    notes = notes.concat(result);
  }

  return notes;
}

module.exports = {
  parse,
  parseTab,
  parseRhythm,
  rhythmToElapsedArray,
  rhythmToAdvanceArray,
  advanceArrayToSegments,
  patternToSymbolsAndCounts,
};
