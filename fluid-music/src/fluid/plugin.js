const fs = require('fs');

/**
 * @namespace plugin
 */
const plugin = {
  /**
   * Creates an object that looks like this:
   * ```
   *  {
   *    address: '/plugin/select',
   *    args: [
   *      { type: 'string', value: 'zebra2' },
   *      { type: 'integer', value: 0 },
   *      { type: 'string', value: 'vst' },
   *    ],
   *  }
   * ```
   * @param {string} pluginName - the name of the vst plugin
   * @param {string} [pluginType] - optional type, for example 'VST', 'VST3',
   *        'AudioUnit'. If omitted, search all types.
   * @param {number} [pluginId=0] - If there are multiple instances of the named
   *    plugin on the selected track, use this argument if you want to select a
   *    specific one one (by default this selects the first plugin with the
   *    given name). Note that pluginId only counts plugins that match the given
   *    pluginName, so pluginName='podolski', pluginId=1 will always select the
   *    second podolski instance, even if there are many other plugins on the
   *    track.
   */
  select(pluginName, pluginType, pluginId = 0) {
    if (typeof pluginName !== 'string')
      throw new Error('plugin.select(pluginName) needs a string, got: ' + undefined);

    if (typeof pluginId !== 'number' || pluginId !== Math.floor(pluginId))
      throw new Error('plugin.select pluginId values must be an integer');

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
   * Changes the automation curve of the parameter value, adds a point to the
   * curve at the specified normalized value and time. The server automatically
   * adds a point at the default value of the parameter at time 0.
   *
   * @param {string} paramName the name of the parameter
   * @param {number} normalizedValue a normalized parameter value from 0 to 1
   * @param {number} [timeInWholeNotes=0] time of parameter change in whole notes
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setParamNormalizedAt(paramName, normalizedValue, timeInWholeNotes=0, curve=0) {
    if (typeof paramName !== 'string')
      throw new Error('plugin.setParam needs a parameterName, got: ' + paramName);
    if (typeof normalizedValue !== 'number')
      throw new Error('plugin.setParam needs a value number, got ' + normalizedValue);
    if (typeof timeInWholeNotes !== 'number')
      throw new Error('plugin.setParam needs a time number, got ' + timeInWholeNotes);
    if (typeof curve !== 'number')
      throw new Error('plugin.setParam needs a curve number, got ' + curve);

    return {
      address: '/plugin/param/set/at',
      args: [
        { type: 'string', value: paramName },
        { type: 'float', value: normalizedValue },
        { type: 'float', value: timeInWholeNotes },
        { type: 'float', value: curve },
        { type: 'string', value: "normalized" },
      ],
    }
  },

  /**
   * Changes the automation curve of the parameter value, adds a point to the
   * curve at the specified value and time. The server automatically adds a
   * point at the default value of the parameter at time 0.
   *
   * @param {string} paramName - the name of the parameter
   * @param {number} paramValue - the explicit value of the parameter set
   * @param {number} [timeInWholeNotes=0] time at which the param change will be
   *    inserted
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setParamExplicitAt(paramName, paramValue, timeInWholeNotes=0, curve = 0) {
    if (typeof paramName !== 'string')
      throw new Error('plugin.setParam needs a parameterName, got: ' + paramName);
    if (typeof paramValue !== 'number')
      throw new Error('plugin.setParam needs a value number, got ' + paramValue);
    if (typeof timeInWholeNotes !== 'number')
      throw new Error('plugin.setParam needs a time number, got ' + timeInWholeNotes);
    if (typeof curve !== 'number')
      throw new Error('plugin.setParam needs a curve number, got ' + curve);

    return {
      address: '/plugin/param/set/at',
      args: [
        { type: 'string', value: paramName },
        { type: 'float', value: paramValue },
        { type: 'float', value: timeInWholeNotes },
        { type: 'float', value: curve },
        { type: 'string', value: "explicit" },
      ],
    }
  },

  /**
   * Helper that makes plugin speciffic modules easier to write. You probably
   * do not need this unless you are writing an adapter.
   *
   * For Tracktion VSTs, all parameters are normalized, so setParamNormalized
   * and setParamExplicit are effectively the same. This can make code that
   * parameterizes VSTs difficult to read and write. To address this, plugin
   * speciffic adapters can provide an abstraction layer that makes the code
   * pretty and fun to read and write. This is a helper method that makes
   * those adapters cleaner.
   *
   * @param {string} paramName the name of the parameter
   * @param {number} paramValue the explicit value of the parameter set
   * @param {number} [timeInWholeNotes=0] time at which to insert automation
   *    point
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setExternalParamHelper(paramName, paramValue, timeInWholeNotes, curve) {
    if (timeInWholeNotes === undefined)
      return plugin.setParamExplicit(paramName, paramValue);

    return plugin.setParamExplicitAt(paramName, paramValue, timeInWholeNotes, curve);
  },

  /**
   * Route the named track to the side chain input for the selected plugin. Note
   * that this might not actually enable the side chain in the plugin
   * configuration. For VSTs, enabling the side chain input may not be
   * accessible from the fluid API, in which case it must be accomplished with a
   * plugin preset.
   *
   * @param {string} inputTrackName - a track with this name will feed the
   *    selected plugin's side chain input. The track will be created if it does
   *    not exist.
   */
  setSideChainInput(inputTrackName) {
    if (typeof inputTrackName !== 'string')
      throw new Error('plugin.setSideChainInput requires an input track name');

    return {
      address: '/plugin/sidechain/input/set',
      args: [ {type: 'string', value: inputTrackName } ],
    }
  },

  /**
   * Save a preset file on the server. If this is a relative path, the preset
   * will be saved to the first path in the preset search path, which can be
   * found with `cybr --preset-path`
   * @param {string} presetName Filename, optionally with `.trkpreset` suffix.
   */
  save(presetName) {
    if (typeof presetName !== 'string')
      throw new Error('plugin.save requires preset name as argument');

    return {
      address: '/plugin/save',
      args: { type: 'string', value: presetName },
    };
  },

  /**
   * Load a preset file. Check the preset search path with `cybr --preset-path`
   * @param {string} presetName - Filename, with optional `.trkpreset` suffix.
   */
  load(presetName) {
    if (typeof presetName !== 'string')
      throw new Error('plugin.load requires preset name as argument');

    return {
      address: '/plugin/load',
      args: { type: 'string', value: presetName },
    };
  },

  /**
   * Load a .trkpreset file from the client. Request that the server load that
   * preset on the currently selected track.
   * @param {String|Buffer} file A .trkpreset filename string OR a node Buffer
   *    object containing the contents of a .trkpreset file
   */
  loadTrkpreset(file) {
    let buffer;
    if (!file)
      throw new Error('plugin.loadTrkpreset requires a file argument');

    if (typeof file === 'string') {
      buffer = fs.readFileSync(file);
      if (!buffer) throw new Error('plugin.loadTrkpreset failed to load file: ' + filename);
    } else if (Buffer.isBuffer(file)) {
      buffer = file;
    } else {
      throw new Error('plugin.loadTrkpreset requires a Buffer or filename')
    }

    // Pad with \0 as required by OSC spec
    const paddingLength = (4 - (buffer.length % 4)) % 4;
    const padding = Buffer.alloc(paddingLength);
    if (paddingLength)
      buffer = Buffer.concat([buffer, padding]);

    return {
      address: '/plugin/load/trkpreset',
      args: [ { type: 'blob', value: buffer } ],
    };
  },

  addpath(presetDir) {
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
