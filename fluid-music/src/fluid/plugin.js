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
   * @param {string} pluginId - the id of the plugin
   */
  select(pluginName, pluginType, pluginId = 0) {
    if (typeof pluginName !== 'string')
      throw new Error('plugin.select(pluginName) needs a string, got: ' + undefined);

    const args = [
      { type: 'string', value: pluginName},
      { type: 'integer', value: pluginId},
    ];
    if (typeof pluginType === 'string') {
      if (pluginType.toLowerCase() === 'vst2') {
        throw new Error('"vst2" is not a valid plugin type, use "vst" instead');
      }
      args.push({ type: 'string', value: pluginType });
    }

    return { args, address: '/plugin/select' };
  },
  
  /**
   * Changes the specified parameter to the normalized value provided.
   *
   * @param {string} paramName - the name of the parameter
   * @param {number} normalizedValue - the normalized value of the parameter set
   */
  setParamNormalized(paramName, normalizedValue) {
    if (typeof paramName !== 'string')
      throw new Error('plugin.setParam needs a parameterName, got: ' + paramName);
    if (typeof normalizedValue !== 'number')
      throw new Error('plugin.setParam needs a value number, got ' + normalizedValue);

    return {
      address: '/plugin/param/set',
      args: [
        { type: 'string', value: paramName },
        { type: 'float', value: normalizedValue },
        { type: 'string', value: "normalized" },
      ],
    }
  },

  /**
   * Changes the specified parameter to the explicit value provided.
   *
   * @param {string} paramName - the name of the parameter
   * @param {number} paramValue - the explicit value of the parameter set
   */
  setParamExplicit(paramName, paramValue) {
    if (typeof paramName !== 'string')
      throw new Error('plugin.setParam needs a parameterName, got: ' + paramName);
    if (typeof paramValue !== 'number')
      throw new Error('plugin.setParam needs a value number, got ' + paramValue);

    return {
      address: '/plugin/param/set',
      args: [
        { type: 'string', value: paramName },
        { type: 'float', value: paramValue },
        { type: 'string', value: "explicit" },
      ],
    }
  },

  /**
   * Changes the automation curve of the parameter value,
   * adds a point to the curve at the specified normalized value and time.
   * The server automatically adds a point at the default value of the parameter at time 0.
   *
   * @param {string} paramName - the name of the parameter
   * @param {number} normalizedValue - a normalized parameter value from 0 to 1
   * @param {number} timeInQuarterNotes - time of parameter change in quarter notes
   * @param {number} curve - the curvature of the line formed by this point and the next point
   */
  setParamNormalizedAt(paramName, normalizedValue, timeInQuarterNotes = 0, curve = 0) {
    if (typeof paramName !== 'string')
      throw new Error('plugin.setParam needs a parameterName, got: ' + paramName);
    if (typeof normalizedValue !== 'number')
      throw new Error('plugin.setParam needs a value number, got ' + normalizedValue);
    if (typeof timeInQuarterNotes !== 'number')
      throw new Error('plugin.setParam needs a time number, got ' + timeInQuarterNotes);
    if (typeof curve !== 'number')
      throw new Error('plugin.setParam needs a curve number, got ' + curve);

    return {
      address: '/plugin/param/set/at',
      args: [
        { type: 'string', value: paramName },
        { type: 'float', value: normalizedValue },
        { type: 'float', value: timeInQuarterNotes },
        { type: 'float', value: curve },
        { type: 'string', value: "normalized" },
      ],
    }
  },

  /**
   * Changes the automation curve of the parameter value,
   * adds a point to the curve at the specified value and time.
   * The server automatically adds a point at the default value of the parameter at time 0.
   *
   * @param {string} paramName - the name of the parameter
   * @param {number} paramValue - the explicit value of the parameter set
   * @param {number} timeInQuarterNotes - time of parameter change in quarter notes
   * @param {number} curve - the curvature of the line formed by this point and the next point
   */
  setParamExplicitAt(paramName, paramValue, timeInQuarterNotes = 0, curve = 0) {
    if (typeof paramName !== 'string')
      throw new Error('plugin.setParam needs a parameterName, got: ' + paramName);
    if (typeof paramValue !== 'number')
      throw new Error('plugin.setParam needs a value number, got ' + paramValue);
    if (typeof timeInQuarterNotes !== 'number')
      throw new Error('plugin.setParam needs a time number, got ' + timeInQuarterNotes);
    if (typeof curve !== 'number')
      throw new Error('plugin.setParam needs a curve number, got ' + curve);

    return {
      address: '/plugin/param/set/at',
      args: [
        { type: 'string', value: paramName },
        { type: 'float', value: paramValue },
        { type: 'float', value: timeInQuarterNotes },
        { type: 'float', value: curve },
        { type: 'string', value: "explicit" },
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
