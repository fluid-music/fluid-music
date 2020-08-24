const plugin = require('./plugin');
const fluid = { plugin };

const db2Level = v => Math.exp(v/8.6864); // For "Wet" and "Dry" params
const Gain2V = v => Math.exp(v/8.6864);

const pluginTReverber8 = {
  type: 'VST2',
  name: '#TReverber8',
  /**
   * Select a `#TReverber8` vst plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [pluginId] - optional index of the plugin to select
   */
  select(pluginId) {
    return fluid.plugin.select('#TReverber8', 'VST2', pluginId);
  },

  zero(){
    return [
      pluginTReverber8.setDecay(0.4),
      pluginTReverber8.setPredelayMs(0),
      pluginTReverber8.setSizePercent(50),
      pluginTReverber8.setDampingHz(18500),
      pluginTReverber8.setBandwidthHz(18500),
      pluginTReverber8.setDensity(0.4),
      pluginTReverber8.setMixPercent(100),
      pluginTReverber8.setEarlyLateMixPercent(75),
      pluginTReverber8.setGainDbfs(0),
    ]
  },

  /**
   * @param {number} value a number between -40 to 0 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDryLevelDbfs(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dry Level', db2Level(value), timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between -40 to 0 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setWetLevelDbfs(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Wet Level', db2Level(value), timeInWholeNotes, curve);
  },

  /**
   * @param {boolean} value a boolean to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setEnable(value, timeInWholeNotes, curve) {
    if (typeof(value) !== "boolean") throw new Error("value required to be of type Boolean")
    return fluid.plugin.setExternalParamHelper('Enable', value, timeInWholeNotes, curve);
  },

  /**
   * Removes frequencies set with Bandwidth in the feedback stage of the
   * reverb meaning that these frequencies are dampened over time.
   *
   * @param {number} value a number between 100-18500 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDampingHz(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Damping', (value-18500)/(-18400), timeInWholeNotes, curve);
  },

  /**
   * Controls the initial density of the reverb. Lower values result in audible
   * early reflections while higher values produce a dense reverb start.
   *
   * @param {number} value a number between 0.1-0.8 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDensity(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Density', (value-0.1)/0.7, timeInWholeNotes, curve);
  },

  /**
   * Sets the frequency range for the Damping parameter.
   *
   * @param {number} value a number between 100-18500 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setBandwidthHz(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Bandwidth', (value-100)/18400, timeInWholeNotes, curve);
  },

  /**
   * Sets the time the reverb needs to decay.
   * @param {number} value a number between 0-0.8 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDecay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Decay', value/0.8, timeInWholeNotes, curve);
  },

  /**
   * Sets the delay before the signal enters the reverb stage. Typically you
   * set it to around a hundredth to a tenth of the reverb Decay. Predelay
   * strongly affects the perceived size of the reverb effect since it controls
   * the time until the first reflection is generated.
   *
   * @param {number} value a number between 0-200 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPredelayMs(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Predelay', value/200, timeInWholeNotes, curve);
  },

  /**
   * Sets the length of the room size. Lower settings simulate a small room
   * while higher settings simulate a big hall or church.
   *
   * @param {number} value a number between 0-100 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setSizePercent(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Size', value/100, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between -45 and 0 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setGainDbfs(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Gain', Gain2V(value), timeInWholeNotes, curve);
  },

  /**
   * Adjusts the relation between the dry signal at the full left to the wet
   * effect signal at the full right. When using #TReverber8 as send effect,
   * we recommend to set Mix to fully wet (100%).
   *
   * @param {number} value a number between 0-100 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMixPercent(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix', value/100, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-100 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setEarlyLateMixPercent(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Early/Late Mix', value/100, timeInWholeNotes, curve);
  },

  params: {
  "dryLevel": "Dry Level",
  "wetLevel": "Wet Level",
  "enable": "Enable",
  "damping": "Damping",
  "density": "Density",
  "bandwidth": "Bandwidth",
  "decay": "Decay",
  "predelay": "Predelay",
  "size": "Size",
  "gain": "Gain",
  "mix": "Mix",
  "earlyLateMix": "Early/Late Mix"
},

};

module.exports = pluginTReverber8;