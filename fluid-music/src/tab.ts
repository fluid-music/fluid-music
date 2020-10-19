const R = require('ramda');

import { Clip, TechniqueEvent } from './fluid-interfaces'

/**
 * Rhythm is the parsed representation of a rhythm string. A Rhythm object and
 * its properties are "frozen", and cannot be modified.
 * @typedef Rhythm
 * @property {number[]} totals
 * @property {number[]} deltas
 * @property {string} r The original rhythm sting that created this
 */

/**
 * Convert rhythm string to a cumulative array of durations.
 *
 * @param {string} rhythm - String representing of a rhythm
 * @returns {Rhythm} - a javascript object representing timing. The object will
 *          have two properties, both of which are arrays:
 *          - .totals is a measure of elapsed times
 *          - .deltas is the duration of each character
 */
export function parseRhythm(rhythm) {
  // advances will look like this: [.4,0,0,0,0.5,0]
  const advances = rhythmToAdvanceArray(rhythm);
  // each segment will look like this: [[.4,0,0,0],[.5, 0]]
  const segments = advanceArrayToSegments(advances);
  // forEach segment, what value does it begin at? [0, 0.4]
  const segmentStartTotals = getSegmentStartTotals(advances);

  const totals : number[] = []; // [.1, .2, .3, .4, .65, .90]
  const deltas : number[] = []; // [.1, .1, .1, .1, .25, .25]
  segments.forEach((segment, j) => { // segment will look like [.4,0,0,0]
    const segmentTotal = segment[0];
    segment.forEach((_, i) => {
      let v = (i+1) * segmentTotal / segment.length;
      totals.push(v + segmentStartTotals[j]);
      deltas.push(segmentTotal / segment.length)
    });
  });

  const result = Object.freeze({
    totals: Object.freeze(totals),
    deltas: Object.freeze(deltas),
    r: rhythm,
  });

  return result;
};

/**
 * Convert a rhythm, pattern, and note library to a `Clip`.
 *
 * @param {string|Rhythm} rhythm
 * @param {string} nPattern
 * @param {NoteLibrary} tLibrary an indexable object
 *        containing notes or arrays of notes. Can be an object or an array.
 *        If it is an array, the pattern may only contain single digit numbers
 *        (i.e. 0-9).
 *
 *        All symbols in the pattern should reference values in the noteLibrary.
 *
 *        To create 'c' and 'd' quarter notes on beats 1 and 3 respectively:
 *        rhythm  = '1234'
 *        pattern = '0.1.'
 *        noteLibrary = [60, 62]
 *        noteLibrary = {'0': 60, '1': 62 }
 * @returns {Clip} (missing `startTime`. `startTime` is added by `score.parse`)
 */
export function parseTab(rhythm, nPattern, tLibrary) : Clip {

  const rhythmObject = typeof rhythm === 'string' ? parseRhythm(rhythm) : rhythm;
  const symbolsAndCounts = patternToSymbolsAndCounts(nPattern);

  if (nPattern.length > rhythmObject.r.length)
    throw new Error(`parseTab: rhythm ('${rhythm}') not long enough for pattern ('${nPattern}')`);

  let p = 0; // position (in the rhythmObject)
  const clip : Clip = {
    startTime : 0,
    events: [] as TechniqueEvent[],
    duration: R.last(rhythmObject.totals),
    midiEvents: [],
    fileEvents: [],
    unmappedEvents: [],
  };

  for (const sc of symbolsAndCounts) {
    let symbol = sc[0];
    let count = sc[1];
    if (symbol !== '.') {
      if (!tLibrary.hasOwnProperty(symbol))
        throw new Error(`noteLibrary has no note or chord for "${symbol}"`);

      // Get the event from the tLibrary. Allow tLibrary to contain a single
      // event OR an array of simultaneous events
      let notes = tLibrary[symbol];
      if (!Array.isArray(notes)) notes = [notes]
      // Calculate the event start and end times
      const start = (p === 0) ? 0 : rhythmObject.totals[p-1];
      const end = rhythmObject.totals[p+count-1];
      const duration = end - start;

      for (const note of notes) {
        // Copy the event (so we don't modify the tLibrary)

        const clipEvent : TechniqueEvent = {
          technique: note,
          startTime: start,
          duration
        }
        clip.events.push(clipEvent)
      }
    }
    p += count;
  }

  return clip;
};

const isEmpty =   (char : string) => char === ' ' || char === '.';
const notEmpty =  (char : string) => !isEmpty(char);
const isWhole =   (char : string) => char === 'w';
const isHalf =    (char : string) => char === 'h';
const isQuarter = (char : string) => char.length === 1 && '1234567890'.includes(char);
const is8th =     (char : string) => char === '+';
const is16th =    (char : string) => char === 'a' || char === 'e';
const is32nd =    (char : string) => char === 't';

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
export function rhythmToAdvanceArray(rhythm) {
  if (typeof rhythm === 'string') rhythm = Array.from(rhythm);

  const result : number[] = [];

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

/**
 * Create sub groups for advances.
 *
 * This helper class is only exported for testing purposes.
 *   in  - [1,0,0,0,2,0]
 *   out - [[1,0,0,0], [2,0]]
 * @param {number[]} advances
 */
export function advanceArrayToSegments(advances : number[]) : number[][] {
  const nonZeroIndices : number[] = []; // [0, 4]
  advances.forEach((e, i) => { if (e !== 0) nonZeroIndices.push(i); });
  const segments : number[][] = [];
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
function getSegmentStartTotals(advances) : number[] {
  const result : number[] = [];
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
 * ```
 * const input = 'a-1-bb...';
 * const output = [['a',2], ['1',2], ['b',1], ['b', 1], ['.', 3]];
 * ```
 *
 * For every new symbol, the out output lists that symbol, and the number of
 * positions that that symbols is active for.
 * @param {string} pattern
 */
export function patternToSymbolsAndCounts(pattern) {
  return arrayToSymbolsAndCounts(Array.from(pattern));
}

function arrayToSymbolsAndCounts(chars : string[]) : [string, number][] {
  chars = chars.map(c => c === ' ' ? '.' : c);
  const results : [string, number][] = [];
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
 * createDynamicGetter is part of an experiment with dynamics that work even
 * when applied to clips that were derived from a different rhythm string. For
 * this to work, we need to be able to get the dynamic at an arbitrary point in
 * time (and not just at a discrete point in the rhythm string).
 *
 * @param {string|Rhythm} rhythm
 * @param {string} dPattern dynamic pattern string
 * @param {Object} dLibrary
 * @returns {function}
 */
export function createDynamicGetter(rhythm, dPattern, dLibrary) {
  const clip = parseTab(rhythm, dPattern, dLibrary);
  return (time) => {
    let event = clip.events[0] || null;
    for (const e of clip.events) {
      if (e.startTime > time) break;
      event = e;
    }
    return event?.technique;
  };
};

/**
 * These keys cannot be used for patterns in tabs and scores.
 */
export const reservedKeys = {
  r: null,            // rhythm pattern
  d: null,            // dynamics pattern
  v: null,            // deprecated. formerly velocity
  noteLibrary : null, // deprecated in favor of tLibrary
  nLibrary: null,     // deprecated in favor of tLibrary
  vLibrary: null,     // deprecated in favor of dLibrary
  eLibrary: null,     // Possible use: events library
  dLibrary: null,     // dynamics library
  tLibrary: null,     // technique Library
  eventMappers: null, // specifies custom eventMapper methods
  plugins: null,      // tracksObject has a .plugins array
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
