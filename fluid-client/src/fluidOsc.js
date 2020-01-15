const converters = require('./converters');
const plugin = require('./fluid/plugin');
const sampler = require('./fluid/sampler.js');

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
   * Build an OSC message that creates a clip with a bunch of midi notes
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

    return elements;
  },
};


const sample = {
  insertWav (trackName, clipName, startBeats, fileName){

    const args = [
      {type: 'string', value: clipName}, 
      {type: 'string', value: fileName}, 
      {type: 'float', value: startBeats},
  ]

    elements = [
      audiotrack.select(trackName),
      {address: '/sample/insert', args}
    ]

    return elements;
  }
}

const global = {
  /**
   * @param {string} [filename] - '.tracktionedit' or '.wav' filename. If no
   *        filename is provided, an empty string will be used, which implies
   *        'save' as opposed to 'save as'.
   * @param {string} [samplePathMode='decide'] - How should file references to
   *        samples be saved? 'a' = absolute, 'r' = relative, d = save samples
   *        that are in a child folder of the edit as relative, and everything
   *        else as absolute.
   */
  save(filename, samplePathMode) {
    if (samplePathMode && typeof samplePathMode !== 'string')
      throw new Error('global.save samplePathMode argument must be a string');

    const args = [ { type: 'string', value: filename || ''} ];

    if (samplePathMode) args.push({ type: 'string', value: samplePathMode });

    return { address: '/file/save', args };
  },

  /**
   * Request that the server change its working directory.
   * @param {String} path - target working directory
   */
  cd(path) {
    if (typeof path !== 'string')
      throw new Error('cd (change directory) requires a string pathname');

    return {
      address: '/cd',
      args: { type: 'string', value: path },
    };
  },

  /**
   * Select an session file, loading it if it exists.
   * @param {String} filename - the edit filename to activate
   * @param {boolean} [forceEmptyEdit=false] - If true, activate an empty edit,
   *        overwriting any existing edit if one exists.
   */
  activate(filename, forceEmptyEdit) {
    if (typeof filename !== 'string')
      throw new Error('activate requires a string pathname');

    if (!filename.toLowerCase().endsWith('.tracktionedit'))
      console.warn('WARNING: trying to activate a file with an unexpected file extension');

    return {
      address: '/file/activate',
      args: [
        { type: 'string', value: filename },
        { type: 'integer', value: forceEmptyEdit ? 1 : 0 },
      ],
    };
  }
};

const transport = {
  play() { return { address: '/transport/play',} },
  stop() { return { address: '/transport/stop',} },

  /**
   * Set loop points, and enable looping.
   * @param {Number|false} startQuarterNotes - The number of quarter notes at
   *        which the loop should begin. Or `false`, which disables looping.
   * @param {Number} lengthQuarterNotes - The length of the loop, measured in
   *        quarter notes.
   */
  loop(startQuarterNotes, lengthQuarterNotes) {
    if (startQuarterNotes === false) {
      // disable looping
      startQuarterNotes = 0;
      lengthQuarterNotes = 0;
    }

    if (typeof startQuarterNotes !== 'number' || typeof lengthQuarterNotes !== 'number')
      throw new Error('transport.loop requires start and length times (in quarter notes)');

    return {
      address: '/transport/loop',
      args: [
        { type: 'float', value: startQuarterNotes },
        { type: 'float', value: lengthQuarterNotes },
      ],
    };
  },

  to(quarterNotes) {
    if (typeof quarterNotes !== 'number')
      throw new Error('transport.to requires number of beats to go to');

    return {
      address: '/transport/to',
      args: [
        { type: 'float', value: quarterNotes },
      ]
    };
  },
};



module.exports = {
  midiclip,
  sample,
  audiotrack,
  plugin,
  global,
  transport,
  sampler,
};
