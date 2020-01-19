const fs = require('fs');

const plugin = {
  /**
   * Creates an object that looks like this:
   *  {
   *    address: '/plugin/select',
   *    args: [
   *      { type: 'string', value: 'zebra2' },
   *      { type: 'string', value: 'vst' },
   *    ],
   *  }
   * @param {string} pluginName - the name of the vst plugin
   * @param {[string]} pluginType - optional type, for example 'VST', 'VST3',
   *        'AudioUnit'. If omitted, search all types.
   */
  select(pluginName, pluginType) {
    if (typeof pluginName !== 'string')
      throw new Error('plugin.select(pluginName) needs a string, got: ' + undefined);

    const args = [{ type: 'string', value: pluginName}];
    if (typeof pluginType === 'string') {
      if (pluginType.toLowerCase() === 'vst2') {
        throw new Error('"vst2" is not a valid plugin type, use "vst" instead');
      }
      args.push({ type: 'string', value: pluginType });
    }

    return { args, address: '/plugin/select' };
  },

  setParam(paramName, normalizedValue) {
    if (typeof paramName !== 'string')
      throw new Error('plugin.setParam needs a parameterName, got: ' + paramName);
    if (typeof normalizedValue !== 'number')
      throw new Error('plugin.setParam needs a value number, got ' + normalizedValue);
    return {
      address: '/plugin/param/set',
      args: [
        { type: 'string', value: paramName },
        { type: 'float', value: normalizedValue },
      ],
    }
  },

  save(presetName) {
    if (typeof presetName !== 'string')
      throw new Error('plugin.save requires preset name as argument');

    return {
      address: '/plugin/save',
      args: { type: 'string', value: presetName },
    };
  },

  load(presetName) {
    if (typeof presetName !== 'string')
      throw new Error('plugin.load requires preset name as argument');

    return {
      address: '/plugin/load',
      args: { type: 'string', value: presetName },
    };
  },

  /**
   * Load a .trkpreset file on the client side, and send it to 
   * @param {Buffer|String} file - A
   */
  loadTrkpreset(file) {
    console.warn('fluid.plugin.loadTrkpreset should be avoided, because it\n\
    might be deprecated in a future release. Most presets are too large to\n\
    fit in a udp packet. Eventually, we want to send messages over TCP, but\n\
    before we can do that, the juce OSC code needs to be updated.');

    let buffer;
    if (!file)
      throw new Error('plugin.loadTrkpreset requires a file argument');

    if (typeof file === 'string') {
      buffer = fs.readFileSync(file);
      if (!buffer) throw new Error('plugin.loadTrkpreset failed to load file: ' + filename);
    }
    else if (file instanceof Buffer) {
      buffer = file;
    } else {
      throw new Error('plugin.loadTrkpreset requires a Buffer or filename')
    }

    return {
      address: '/plugin/load/trkpreset',
      args: [ { type: 'blob', value: buffer } ],
    };
  },

  addpath(presetDir){
    throw new Error('fluid.plugin.addpath is deprecated, and should not be used.\n\
    To change the plugin search path, use ./cybr --preset-dirs=path \n\
    The goal it so move away from specifying any kind of paths on the client.\n\
    It is possible to use absolute paths, but this may be deprecated eventually.');

    if (typeof presetDir !== 'string')
      throw new Error('plugin.addpath requires preset directory as argument');
    return {
        address: '/plugin/preset/addpath',
        args: { type: 'string', value: presetDir },
    };
  }
};

module.exports = plugin;
