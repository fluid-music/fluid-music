const plugin = require('./fluid/plugin');
const sampler = require('./fluid/sampler');
const audiotrack = require('./fluid/audiotrack');
const midiclip = require('./fluid/midiclip');
const transport = require('./fluid/transport');

const sample = {
  insertWav (trackName, clipName, startBeats, fileName){

    const args = [
      {type: 'string', value: clipName}, 
      {type: 'string', value: fileName}, 
      {type: 'float', value: startBeats},
    ];

    const elements = [
      audiotrack.select(trackName),
      { address: '/sample/insert', args }
    ];

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

module.exports = {
  midiclip,
  sample,
  audiotrack,
  plugin,
  global,
  transport,
  sampler,
};
