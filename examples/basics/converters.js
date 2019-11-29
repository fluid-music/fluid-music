const s11 = require('sharp11');
const Parser = require('expr-eval').Parser;
const parser = new Parser();

/**
 * Create an 
 * @param {[Integer]} noteNum - Midi Note Number
 * @param {Number} startBeats - Note start time in beats
 * @param {Number} lengthBeats - Note length in beats
 * @param {[Integer]} velocity - Midi note velocity
 */
const createMidiNoteMessage = function(noteNum, startBeats, lengthBeats, velocity) {
  const args = [
    {type: 'integer', value: noteNum },
    {type: 'float',   value: startBeats },
  ];

  if (typeof lengthBeats !== 'number') lengthBeats = 1;
  args.push({ type: 'float', value: lengthBeats });

  if (typeof velocity === 'number') args.push({ type: 'float', value: velocity });

  return { address: '/midiclip/n', args }
}


/**
 * Convert an  object to fluid osc message
 * 
 * @param { string } trackName
 * @param { string } clipName
 * @param {Number} startBeats - Note start time in beats
 * @param {Number} lengthBeats - Note length in beats
 * @param { Array } steps - array of {l: length, n: note } objects
 */
function fluidObjToOsc(trackName, clipName, startBeats, lengthBeats, steps) {

  elements = [
    {
      address: '/audiotrack/select',
      args: { type: 'string', value: trackName },
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
  const appendNote = (note, length, velocity) => { // add note, but do not advance elapsed Time
    let noteNumber;
    if      (typeof note === 'number') noteNumber = note;
    else if (typeof note === 'string') noteNumber = s11.note.create(note).value();
    else throw new Error('Note value invalid: ' + JSON.stringify(note));
    const msg = createMidiNoteMessage(noteNumber, elapsed, length);
    elements.push(msg);
  }

  steps.forEach((step) => {
    // YAML files specify durations in whole notes, so '1/4' is a quarter note.
    // OSC spec specifies durations in quarter notes, so 1 is a quarter note
    let length;
    if (typeof step.l === 'number') length = step.l;
    if (typeof step.l === 'string') length = parser.evaluate(step.l);
    length *= 4; // convert whole notes to quarter notes

    if (Array.isArray(step.n)) step.n.forEach((n) => appendNote(n, length));
    else if (step.n) appendNote(step.n, length);
    elapsed += length;
  });

  return newClipMsg = {
    oscType: 'bundle',
    timetag: 0,
    elements
  };
}

module.exports = fluidObjToOsc;