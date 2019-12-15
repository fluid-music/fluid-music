const converters = require('./converters');

const audiotrack = {
  select(trackName) {
    if (typeof trackName !== 'string')
      throw new Error('audiotrack.Select requires track name string, got: ' + trackName);
    return {
      address: '/audiotrack/select',
      args: [{ type: 'string', value: trackName }],
    }
  },
}

const midiclip = {
  clear() { return { address: '/midiclip/clear' } },

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
   * @param {[Integer]} noteNum - MIDI Note Number
   * @param {Number} startTimeInWholeNotes - Note start time in Whole notes
   * @param {Number} durationInWholeNotes - Note length in Whole notes
   * @param {[Integer]} velocity - Optional MIDI note velocity.
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

    return { address: '/midiclip/n', args }
  },

  /**
   * Build a OSC message that creates a clip with a bunch of midi notes
   *
   * @param { string } trackName
   * @param { string } clipName
   * @param { Number } startBeats - Clip start time in quarter notes
   * @param { Number} lengthBeats - Clip length in quarter notes
   * @param { {l:number, n: number, s: start}[] } notes - array of objects like:
   *        { l: length, n: note, s: start } objects
   */
  create(trackName, clipName, startBeats, lengthBeats, notes) {
    elements = [
      audiotrack.select(trackName),
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

    return newClipMsg = {
      oscType: 'bundle',
      timetag: 0,
      elements
    };
  },
};


const plugin = {
  select(pluginName) {
    if (typeof pluginName !== 'string')
      throw new Error('plugin.select(pluginName) needs a string, got: ' + undefined);
    return {
      address: '/plugin/select',
      args: [{ type: 'string', value: pluginName}],
    };
  }
};

const global = {
  /**
   * @param {string} filename - '.tracktionedit' or '.wav' filename
   * @param {[bool]} absolute - If true use absolute paths for audio file
   *        references. Else use relative paths.
   */
  save(filename, absolute) {
    return {
      address: '/save',
      args: [
        { type: 'string', value: filename },
        { type: 'string', value: absolute ? 'absolute' : 'relative' },
      ],
    };
  },
}

module.exports = {
  midiclip,
  audiotrack,
  plugin,
  global,
};
