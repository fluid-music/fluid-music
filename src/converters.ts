const s11    = require('sharp11');
const Parser = require('expr-eval').Parser;
const parser = new Parser();

export function clamp (min : number, max : number, v : number) {
  if (min > max) [min, max] = [max, min]
  return Math.max(Math.min(max, v), min)
}

export function dbToGain (db : number) {
  return Math.pow(10, db / 20)
}

export function gainToDb (gain : number) {
  return 20 * Math.log10(gain)
}

/**
 * Convert a string or number to a number of whole notes.
 * @param {String|Number} value - input value can be 'quarter' or '1/4' or 0.25
 * @returns {Number} - A duration in whole notes
 */
export const valueToWholeNotes = function(value : string | number) {
  let length;
  if (typeof value === 'number') length = value;
  else if (typeof value === 'string') {
    if (value === 'quarter') return 0.25;
    if (value === 'half') return 0.5;
    if (value === 'whole') return 1;
    try {
      length = parser.evaluate(value);
    } catch (e) {
      length = s11.duration.asDuration(value).value() * 0.25;
    }
  }
  else throw new Error('Cannot convert to number of whole notes:' + JSON.stringify(value));
  return length;
}

export const valueToMidiNoteNumber = function(value : number|string) {
  let noteNumber;
  if      (typeof value === 'number') noteNumber = value;
  else if (typeof value === 'string') {
    let i = value.indexOf('+');
    if (i === -1) i = value.indexOf('-');
    if (i !== -1) {
      const first = value.slice(0, i);
      const second = value.slice(i);
      noteNumber = parser.evaluate(s11.note.create(first).value() + second);
    } else {
      noteNumber = s11.note.create(value).value();
    }
  }
  else throw new Error('Note value invalid: ' + JSON.stringify(value));
  return noteNumber;
};

/**
 * Convert a midi note number to fundamental frequency in hz. Equal temperment.
 * @param midiNoteNumber
 * @returns fundamental frequency in hz
 */
export const m2f = (midiNote : number) => 440 * Math.pow(2, (midiNote-69)/12);

/**
 * Convert a frequency to a midi note number, assuming 69=A5=440hz.
 * The output is not rounded to an integer, so use Math.round on the output if
 * you need an integer note number.
 * @param hz frequency in hz
 * @returns midi note number
 */
export const f2m = (hz : number) => 69 + 12 * Math.log2(hz/440);

export const numberToMidiNote = (note : number) => ({type: 'midiNote', note});

export function midiVelocityToDbfs(v : number, min = -60, max = 6) {
  const range = max - min;
  return clamp(min, max, v / 127 * range + min);
};

export function velocityNumberToDynamic(velocity : number) {
  return {
    v: velocity,
    dbfs: midiVelocityToDbfs(velocity, -10, 10),
    intensity: clamp(0, 1, Math.floor(velocity / 127)),
  }
}
