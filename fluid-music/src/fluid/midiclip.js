const converters = require('../converters');
const audiotrack = require('./audiotrack');
/**
 * Represents a MIDI note within midi clip
 * @typedef {Object} noteObject
 * @property {number} n note (probably a MIDI note number)
 * @property {number} l length in whole notes
 * @property {number} s start time in whole notes
 * @property {number} [v=64] optional midi velocity
 */

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
   * if it does not exist. Set the clip's start time and length in quarter notes.
   * @param {string} name name of the MIDI clip to select.
   * @param {number} startTimeInQuarterNotes
   * @param {number} lengthInQuarterNotes
   */
  select(name, startTimeInQuarterNotes, lengthInQuarterNotes) {
    if (typeof name !== 'string')
      throw new Error('midiclip.Select requires name string, got: ' + name);
    if (typeof startTimeInQuarterNotes !== 'number')
      throw new Error('midiclip.Select requires start time number, got: ' + startTimeInQuarterNotes);
    if (typeof lengthInQuarterNotes !== 'number')
      throw new Error('midiclip.Select requires length number, got: ' + lengthInQuarterNotes);

    return {
      address: '/midiclip/select',
      args: [
        { type: 'string', value: name },
        { type: 'float',  value: startTimeInQuarterNotes }, // start time in quarter notes
        { type: 'float',  value: lengthInQuarterNotes }, // length in quarter notes
      ]
    };
  },

  /**
   * Create an /midiclip/n message
   * @param {Integer} noteNum MIDI Note Number
   * @param {Number} startTimeInWholeNotes Note start time in Whole notes
   * @param {Number} durationInWholeNotes Note length in Whole notes
   * @param {Integer} [velocity] Optional MIDI note velocity.
   */
  note(noteNum, startTimeInWholeNotes, durationInWholeNotes, velocity) {
    const args = [
      {type: 'integer', value: noteNum },
      {type: 'float',   value: startTimeInWholeNotes * 4 },
    ];

    const durationInQuarterNotes =
      (typeof durationInWholeNotes === 'number') ? durationInWholeNotes * 4 : 1;
    args.push({ type: 'float', value: durationInQuarterNotes });

    if (typeof velocity === 'number')
      args.push({ type: 'integer', value: velocity });

    return { address: '/midiclip/insert/note', args }
  },

  /**
   * Build an OSC message that creates a clip with a bunch of midi notes

   * @param { string } clipName name of the clip.
   * @param { number } startBeats - Clip start time in quarter notes
   * @param { number} lengthBeats - Clip length in quarter notes
   * @param { noteObject[] } notes - array of objects, which look like:
   *    { l: length, n: note, s: start }
   */
  create(clipName, startBeats, lengthBeats, notes) {
    elements = [
      midiclip.select(clipName, startBeats, lengthBeats),
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
