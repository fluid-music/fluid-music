const s11 = require('sharp11');
const Parser = require('expr-eval').Parser;
const parser = new Parser();

/**
 * Convert a string or number to a number of whole notes.
 * @param {String|Number} value - input value can be 'quarter' or '1/4' or 0.25
 * @returns {Number} - A duration in whole notes
 */
const valueToWholeNotes = function(value) {
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
  else throw new Error('Cannot convert to number of whole notes:', JSON.stringify(value));
  return length;
}

const valueToMidiNoteNumber = function(value) {
  let noteNumber;
  if      (typeof value === 'number') noteNumber = value;
  else if (typeof value === 'string') noteNumber = s11.note.create(value).value();
  else throw new Error('Note value invalid: ' + JSON.stringify(value));
  return noteNumber;
};


module.exports = {
  valueToWholeNotes,
  valueToMidiNoteNumber,
}
