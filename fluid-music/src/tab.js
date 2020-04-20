const R = require('ramda');
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
 * Helper method to convert velocity string to an array corresponding to
 * velocties of each symbol in symbolsAndCounts.
 *
 * @param {string} vPattern - String representation of note velocities.
 * @param symbolsAndCounts from patternToSymbolsAndCounts
 * @param {number[]} vLibrary - an indexable array containing velocity values.
 *
 * @returns {number[]} - an array representing the velocity of each symbol.
 */
const parseVelocity = function(vPattern, symbolsAndCounts, vLibrary){
  let p = 0;
  const velArray = []
  if(typeof(vPattern) !== 'string') return false;
  for (let sc of symbolsAndCounts){
    let symbol = sc[0];
    let count = sc[1];

    if (isEmpty(symbol)) {
      velArray.push(0);
      p += count;
      continue;
    }

    if (!vLibrary.hasOwnProperty(vPattern[p]))
        throw new Error(`velLibrary has no velocity value for "${vPattern[p]}"`);
    let vel = vLibrary[vPattern[p]];

    velArray.push(vel)
    p += count;
  }
  return velArray;
}

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
 *        noteLibrary = [60, 62]
 *        noteLibrary = {'0': 60, '1': 62 }
 */
const parseTab = function(rhythm, pattern, noteLibrary, vPattern, vLibrary) {
  if (pattern.length > rhythm.length)
    throw new Error(`parseTab: rhythm ('${rhythm}') not long enough for pattern ('${pattern}')`);

  const rhythmObject = parseRhythm(rhythm);
  const symbolsAndCounts = patternToSymbolsAndCounts(pattern);
  const velocityArray = parseVelocity(vPattern, symbolsAndCounts, vLibrary);

  let p = 0; // position (in the rhythmObject)
  const clip = {
    notes: [],
    duration: R.last(rhythmObject.totals),
  };

  for (let [index, sc] of symbolsAndCounts.entries()) {
    let symbol = sc[0];
    let count = sc[1];
    if (symbol !== '.') {
      if (!noteLibrary.hasOwnProperty(symbol))
        throw new Error(`noteLibrary has no note or chord for "${symbol}"`);
      let notes = noteLibrary[symbol];
      if (!Array.isArray(notes)) notes = [notes];
      notes.forEach((note) => {
        const start = (p === 0) ? 0 : rhythmObject.totals[p-1];
        const end = rhythmObject.totals[p+count-1];
        let noteObject = {
          s: start,
          l: end - start,
          n: note,
        };
        if (vLibrary !== undefined) {
          noteObject.v = velocityArray[index];
        }
        clip.notes.push(noteObject);
      });
    }
    p += count;
  }

  return clip;
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
 * In the following examples, q=1/4 and e=1/8 and h=1/2
 * Quarter notes:
 *   rhythm - '1+2+'
 *   result - [e,e,e,e]
 * Spaces leave a 0 in the array.
 *   rhythm - '1 + '
 *   result - [e,0,e,0]
 * Eighth and quarter notes:
 *   rhythm - '1234+'
 *   result - [q,q,q,e,e]
 * Whole notes always 1. Half notes always get 0.5
 *   rhythm - 'h34'
 *   result - [h,q,q]
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

    let amount = division(char);
    if ((amount > 0) && (amount < 0.5) && next !== null)
      amount = Math.min(amount, division(next));

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
  if (currentChar === '-') throw new Error(`Bad pattern string: "${chars}" (begins on -)`);

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
 * Creates noteObject arrays from deeply nested objects. Takes a deeply nested
 * Object or Array, and converts it to an array of notes. The following example
 * will generate four eighth notes separated by eighth note rests.
 * ```json
 *  {
 *    "noteLibrary": [1, 2, 3, 4],
 *    "r": "1+2+",
 *    "p": [
 *      "1.3.",
 *      "3.4."
 *    ]
 *  }
 * ```
 * The `.p` field in the object above is a pattern. Each character in the string
 * indexes the note library (for details, see the parseTab documentation).
 *
 * Several important things to understand:
 * - The example above contains a sub pattern specified in the `.p' field. The
 *   key (`.p`) is arbitrary. It could also `.b`, `.c`, or `.pattern`. However,
 *   it must not be one of the reserved keys such as `.noteLibrary` or `.r`.
 * - Pattern arrays imply a sequence of events
 * - Pattern objects imply layering of events
 * - Sub-patterns inherit their parent's `.r`hythm and `.noteLibrary` unless it
 *   is an object sub-pattern, in which case it may optionally specify its own.
 *
 * The following example contains has an pattern object, with two layers. One
 * for hi-hat, and one for kick and snare. Note that unlike the pattern array
 * example above, the two layers in the pattern object occur simultaneously.
 * ```json
 * {
 *  "noteLibrary": { "k": 36, "h": 42, "s": 38 },
 *  "r":  "1 + 2 + 3 + 4 + ",
 *  "ks": "k . s . . . s k ",
 *  "hh": "h h h h h h h h "
 * }
 * ```
 * For more diverse examples (and more deeply nested objects), see the tests.
 *
 * @param {Object|Array|String} object - The only required argument.
 * @param {String} [rhythm] - rhythm string, if not specified, `object`
 *        must have a `.r` property.
 * @param {Object|Array} [noteLibrary] - An object or array noteLibrary (see
 *        parseTab for details). If not specified, `object` must have a
 *        `.noteLibrary` property.
 * @param {Number} [startTime] - offset all the notes by this much
 * @returns {Object[]} An array of noteObjects. The array will have an
 *          additional `.duration` parameter.
 */
const parse = function(object, rhythm, noteLibrary, startTime, vPattern, vLibrary) {
  let notes = [];
  notes.duration = 0;
  if (typeof startTime !== 'number') startTime = 0;
  if (object.hasOwnProperty('noteLibrary')) noteLibrary = object.noteLibrary;
  if (object.hasOwnProperty('vLibrary')) vLibrary = object.vLibrary;
  if (object.hasOwnProperty('r')) rhythm = object.r;
  if (object.hasOwnProperty('v')) vPattern = object.v;
  if (object.hasOwnProperty('startTime'))
    throw new Error('parse: startTime is not a legal pattern key');

  if (rhythm === undefined || noteLibrary === undefined)
    throw new Error('tab.parse could not find rhythm AND a noteLibrary');

  if (Array.isArray(object)) {
    for (let o of object) {
      let newNotes = parse(o, rhythm, noteLibrary, startTime, vPattern, vLibrary);
      notes.push(...newNotes);
      notes.duration += newNotes.duration;
      startTime += newNotes.duration; // NOTE: must be '+=', not '='
    }
  } else if (typeof object === 'string') {
    // We have a string that can be parsed with parseTab
    const result = parseTab(rhythm, object, noteLibrary, vPattern, vLibrary).map((n) => {
      n.s += startTime;
      return n;
    });
    notes = notes.concat(result);
    const a = parseRhythm(rhythm);
    notes.duration = a.totals[a.totals.length-1];
  } else {
    let duration = 0;
    for (let [key, val] of Object.entries(object)) {
      if (reservedKeys.hasOwnProperty(key)) continue;
      let newNotes = parse(val, rhythm, noteLibrary, startTime, vPattern, vLibrary, );
      notes.push(...newNotes);
      if (newNotes.duration > duration) duration = newNotes.duration;
    }
    notes.duration = duration;
  }

  return notes;
}

/**
 * These keys cannot be used for patterns in tabs and scores.
 */
const reservedKeys = {
  r: null,
  v: null,
  noteLibrary : null,
  nLibrary: null,
  vLibrary: null,
  duration: null,
  startTime: null,
  meta: null,
  originalValue: null,
  name: null,
  clips: null,
  tracks: null,
  key: null,
  parent: null,
  regions: null,
};

module.exports = {
  parse,
  parseTab,
  parseRhythm,
  reservedKeys,
  rhythmToElapsedArray,
  rhythmToAdvanceArray,
  advanceArrayToSegments,
  patternToSymbolsAndCounts,
};
