const converters = require('../converters');

/**
 * @namespace midiclip
 */
const midiclip = {
  /**
   * Clear all MIDI notes in the currently selected clip.
   */
  clear() { return { address: '/midiclip/clear' } },

  /**
   * Select a MIDI clip by name on the currently selected track. Create the clip
   * if it does not exist. Set the clip's start time and length in whole notes.
   * @param {string} name name of the MIDI clip to select.
   * @param {number} startTimeInWholeNotes
   * @param {number} durationInWholeNotes
   */
  select(name, startTimeInWholeNotes, durationInWholeNotes) {
    if (typeof name !== 'string')
      throw new Error('midiclip.select requires name string, got: ' + name);
    if (typeof startTimeInWholeNotes !== 'number')
      throw new Error('midiclip.select requires start time number, got: ' + startTimeInWholeNotes);
    if (typeof durationInWholeNotes !== 'number')
      throw new Error('midiclip.select requires length number, got: ' + durationInWholeNotes);

    return {
      address: '/midiclip/select',
      args: [
        { type: 'string', value: name },
        { type: 'float',  value: startTimeInWholeNotes }, // start time in whole notes
        { type: 'float',  value: durationInWholeNotes }, // length in whole notes
      ]
    };
  },

  /**
   * Create an /midiclip/n message
   * @param {Integer} noteNum MIDI Note Number
   * @param {Number} startTimeInWholeNotes Note start time in whole notes
   * @param {Number} [durationInWholeNotes=0.25] Note length in whole notes
   * @param {Integer} [velocity] Optional MIDI note velocity.
   */
  note(noteNum, startTimeInWholeNotes, durationInWholeNotes=0.25, velocity) {
    const args = [
      {type: 'integer', value: noteNum },
      {type: 'float',   value: startTimeInWholeNotes },
    ];

    if (durationInWholeNotes && typeof durationInWholeNotes !== 'number')
      throw new Error('midiclip.note got an invalid duration value:', durationInWholeNotes);

    args.push({ type: 'float', value: durationInWholeNotes });

    if (typeof velocity === 'number')
      args.push({ type: 'integer', value: velocity });

    return { address: '/midiclip/insert/note', args }
  },

  /**
   * Build an OSC message that creates a clip with a bunch of midi notes
   * @param { string } clipName name of the clip.
   * @param { number } startTimeInWholeNotes clip start time in whole notes
   * @param { number} durationInWholeNotes clip length in whole notes
   * @param { Object[] } notes array of objects, which look like:
   *    `{ l: lengthWholeNotes, n: midiNoteNumber, s: startTimeWholeNotes }`
   *    Be careful that all note.n properties are numbers.
   */
  create(clipName, startTimeInWholeNotes, durationInWholeNotes, notes) {
    elements = [
      midiclip.select(clipName, startTimeInWholeNotes, durationInWholeNotes),
      midiclip.clear(),
    ];

    notes.forEach((note) => {
      if (typeof note.n !== 'number' ||
          typeof note.s !== 'number' ||
          typeof note.l !== 'number')
          throw new Error('Got bad note: ' + JSON.stringify(note));

      const length = converters.valueToWholeNotes(note.l);
      const start = converters.valueToWholeNotes(note.s);
      const noteMsg = midiclip.note(note.n, start, length, note.v);
      elements.push(noteMsg);
    });

    return elements;
  },
};

module.exports = midiclip;
