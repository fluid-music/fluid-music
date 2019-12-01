const s11 = require('sharp11');
const Parser = require('expr-eval').Parser;
const parser = new Parser();

/**
 * Create an /midiclip/n message
 * @param {[Integer]} noteNum - MIDI Note Number
 * @param {Number} startTimeInQuarterNotes - Note start time in quarter notes
 * @param {Number} durationInQuarterNotes - Note length in quarter notes
 * @param {[Integer]} velocity - Optional MIDI note velocity.
 */
const createMidiNoteMessage = function(noteNum, startTimeInQuarterNotes, durationInQuarterNotes, velocity) {
  const args = [
    {type: 'integer', value: noteNum },
    {type: 'float',   value: startTimeInQuarterNotes },
  ];

  if (typeof durationInQuarterNotes !== 'number') durationInQuarterNotes = 1;
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
 * Convert an  object to a fluid osc message
 * 
 * @param { string } trackName
 * @param { string } clipName
 * @param { Number } startBeats - Note start time in beats
 * @param { Number} lengthBeats - Note length in beats
 * @param { Array } steps - array of { l: length, n: note } objects
 */
const fluidObjToOsc = function(trackName, clipName, startBeats, lengthBeats, steps) {

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

  let elapsed = 0;
  const appendNote = (note, length) => { // add note, but do not advance elapsed Time
    const noteNumber = valueToMidiNoteNumber(note);
    const msg = createMidiNoteMessage(noteNumber, elapsed, length);
    elements.push(msg);
  }

  steps.forEach((step) => {
    // YAML files specify durations in whole notes, so '1/4' is a quarter note.
    // OSC spec specifies durations in quarter notes, so 1 is a quarter note
    const numWholeNotes = valueToWholeNotes(step.l);
    const numQuarterNotes = numWholeNotes * 4;

    if (Array.isArray(step.n)) step.n.forEach((n) => appendNote(n, numQuarterNotes));
    else if (step.n) appendNote(step.n, numQuarterNotes);
    elapsed += numQuarterNotes;
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
