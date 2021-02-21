const converters = require('../converters');

/**
 * Clear all MIDI notes in the currently selected clip.
 */
export function clear() {
  return { address: '/midiclip/clear' }
}

/**
 * Select a MIDI clip by name on the currently selected track. Create the clip
 * if it does not exist. Set the clip's start time and length in whole notes.
 * @param name name of the MIDI clip to select.
 * @param startTimeSeconds
 * @param durationSeconds
 */
export function select(name : string, startTimeSeconds : number, durationSeconds : number) {
  if (typeof name !== 'string')
    throw new Error('midiclip.select requires name string, got: ' + name);
  if (typeof startTimeSeconds !== 'number')
    throw new Error('midiclip.select requires start time number, got: ' + startTimeSeconds);
  if (typeof durationSeconds !== 'number')
    throw new Error('midiclip.select requires length number, got: ' + durationSeconds);

  return {
    address: '/midiclip/select',
    args: [
      { type: 'string', value: name },
      { type: 'double',  value: startTimeSeconds }, // start time in whole notes
      { type: 'double',  value: durationSeconds }, // length in whole notes
    ],
  };
}

/**
 * Create an /midiclip/note message
 * @param {Integer} noteNum MIDI Note Number
 * @param {Number} startTimeInWholeNotes Note start time in whole notes
 * @param {Number} [durationInWholeNotes=0.25] Note length in whole notes
 * @param {Integer} [velocity] Optional MIDI note velocity.
 */
export function note(
  noteNum : number,
  startTimeInWholeNotes : number,
  durationInWholeNotes : number = 0.25,
  velocity? : number)
{
  const args = [
    {type: 'integer', value: noteNum },
    {type: 'float',   value: startTimeInWholeNotes },
  ];

  if (durationInWholeNotes && typeof durationInWholeNotes !== 'number')
    throw new Error('midiclip.note got an invalid duration value: ' + durationInWholeNotes);

  args.push({ type: 'float', value: durationInWholeNotes });

  if (typeof velocity === 'number')
    args.push({ type: 'integer', value: velocity });

  return { address: '/midiclip/insert/note', args }
}

/**
 * Build an OSC message that creates a clip with a bunch of midi notes
 * @param clipName name of the clip.
 * @param startTimeSeconds clip start time in whole notes
 * @param durationSeconds clip length in whole notes
 * @param notes array of objects, which look like:
 *    `{ duration: lengthWholeNotes, n: midiNoteNumber, startTime: startTimeWholeNotes }`
 */
export function create(clipName : string, startTimeSeconds : number, durationSeconds : number, notes : any[]) {
  const elements = [
    select(clipName, startTimeSeconds, durationSeconds),
    clear(),
  ];

  notes.forEach((noteObject) => {
    if (typeof noteObject.n !== 'number' ||
        typeof noteObject.startTime !== 'number' ||
        typeof noteObject.duration !== 'number')
        throw new Error('Got bad note: ' + JSON.stringify(noteObject));

    const length = converters.valueToWholeNotes(noteObject.duration);
    const start = converters.valueToWholeNotes(noteObject.startTime);
    const noteMsg = note(noteObject.n, start, length, noteObject.v);
    elements.push(noteMsg);
  });

  return elements;
}
