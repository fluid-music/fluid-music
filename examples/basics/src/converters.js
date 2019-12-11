const s11 = require('sharp11');
const Parser = require('expr-eval').Parser;
const parser = new Parser();

/**
 * Create an /midiclip/n message
 * @param {[Integer]} noteNum - MIDI Note Number
 * @param {Number} startTimeInWholeNotes - Note start time in Whole notes
 * @param {Number} durationInWholeNotes - Note length in Whole notes
 * @param {[Integer]} velocity - Optional MIDI note velocity.
 */
const createMidiNoteMessage = function(noteNum, startTimeInWholeNotes, durationInWholeNotes, velocity) {
  const args = [
    {type: 'integer', value: noteNum },
    {type: 'float',   value: startTimeInWholeNotes * 4 },
  ];

  const durationInQuarterNotes =
    (typeof durationInWholeNotes === 'number') ? durationInWholeNotes * 4 : 1;
  args.push({ type: 'float', value: durationInQuarterNotes });

  if (typeof velocity === 'number') args.push({ type: 'integer', value: velocity });

  return { address: '/midiclip/n', args }
}

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

/**
 * Build a OSC message that creates a clip with a bunch of midi notes
 *
 * @param { string } trackName
 * @param { string } clipName
 * @param { Number } startBeats - Clip start time in beats
 * @param { Number} lengthBeats - Clip length in beats
 * @param { {l:number, n: number, s: start}[] } notes - array of objects like:
 *        { l: length, n: note, s: start } objects
 */
const fluidObjToOsc = function(trackName, clipName, startBeats, lengthBeats, notes) {

  elements = [
    {
      address: '/audiotrack/select',
      args: [{ type: 'string', value: trackName }],
    },
    {
      address: '/midiclip/select',
      args: [
        { type: 'string', value: clipName },
        { type: 'float',  value: startBeats },
        { type: 'float',  value: lengthBeats },
      ]
    },
    { address: '/midiclip/clear' },
  ];

  notes.forEach((step) => {
    // YAML files specify durations in whole notes, so '1/4' is a quarter note.
    // OSC spec specifies durations in quarter notes, so 1 is a quarter note
    const length = valueToWholeNotes(step.l);
    const start = valueToWholeNotes(step.s);

    if (typeof step.n !== 'number' ||
        typeof step.s !== 'number' ||
        typeof step.l !== 'number')
        throw new Error('Got bad step: ' + JSON.stringify(step));

    const noteMsg = createMidiNoteMessage(step.n, start, length, step.v);
    elements.push(noteMsg);
  });

  return newClipMsg = {
    oscType: 'bundle',
    timetag: 0,
    elements
  };
}

module.exports = {
  valueToWholeNotes,
  valueToMidiNoteNumber,
  fluidObjToOsc,
  createMidiNoteMessage,
}
