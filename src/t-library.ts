import { valueToMidiNoteNumber }  from './converters'
import { Technique, tLibrary } from './fluid-interfaces'
import { MidiNote } from './techniques'

/**
 * Merge multiple event libraries into one, throw an error if any of the input
 * libraries have overlapping keys.
 * @param  {...NoteLibrary} libraries
 */
export const merge = (...libraries) => {
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
export const stringsToNoteNumbers = (arrayOrNum) => {
  if (Array.isArray(arrayOrNum)) {
    return arrayOrNum.map(stringsToNoteNumbers);
  };

  if (typeof arrayOrNum === 'number') return arrayOrNum;
  if (typeof arrayOrNum === 'string') return valueToMidiNoteNumber(arrayOrNum);

  // pass objects
  return arrayOrNum;
}

function createLetterGetter() {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let i = 0;
  return () => s[i++ % s.length];
}

function createScaleLetterGetterA() {
  const s = 'ABCDEFGTabcdefgt01234567';
  let i = 0;
  return () => s[i++ % s.length];
}

/**
 * Create a technique Library containing 3 octaves in a harmonic minor scale.
 *
 * ```
 * solfege:    do re me fa sol le te ti
 * half steps: 0  2  3  5  7   8  10 11
 * 0va keys:   A  B  C  D  E   F  G  T
 * 8va keys:   a  b  c  d  e   f  g  t
 * 16va keys:  0  1  2  3  4   5  6  7  8
 * ```
 * @param startingNoteNumber the lowest midi note number note in the scale.
 *    The default value, midi note number 33 has fundamental frequency 55hz.
 *    setting startingNoteNumber to an 'A' in any octave will align the
 *    the letter keys with their respective harmonic notes, so you can use
 *    'B' or 'b' to indicate a musical 'b' note, 'c' or 'C' to indicate a
 *    musical c note (and so on).
 */
export function midiScale(startingNoteNumber = 33) : tLibrary {
  if (typeof startingNoteNumber !== 'number') throw new Error('midiScale expected a note number')
  const getKey = createScaleLetterGetterA()
  const harmonicMinorScale = [0, 2, 3, 5, 7, 8, 10, 11]
  const tLibrary = {}
  for (let octave = 0; octave < 3; octave++) {
    for (const degree of harmonicMinorScale) {
      tLibrary[getKey()] = new MidiNote({ note: octave * 12 + degree + startingNoteNumber })
    }
  }
  tLibrary['8'] = new MidiNote({ note: startingNoteNumber + 36 })
  return tLibrary
}



export function fromArray(techniques : Technique[]) {
  const getKey = createLetterGetter()
  const result : tLibrary = {}
  techniques.forEach(tech => result[getKey()] = tech)
  return result
}
