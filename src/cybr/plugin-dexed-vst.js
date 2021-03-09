const plugin = require('./plugin');
const fluid = { plugin };

module.exports = {
    type: 'VST2',
    name: 'Dexed',
  /**
   * Select a `Dexed` vst plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [pluginId] - optional index of the plugin to select
   */
  select(pluginId) {
    return fluid.plugin.select('Dexed', 'VST2', pluginId);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDryLevel(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Dry Level', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setWetLevel(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Wet Level', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setCutoff(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Cutoff', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setResonance(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Resonance', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOutput(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Output', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMasterTuneAdj(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('MASTER TUNE ADJ', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setAlgorithm(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('ALGORITHM', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFeedback(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('FEEDBACK', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOscKeySync(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OSC KEY SYNC', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfoSpeed(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('LFO SPEED', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfoDelay(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('LFO DELAY', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfoPmDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('LFO PM DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfoAmDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('LFO AM DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfoKeySync(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('LFO KEY SYNC', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfoWave(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('LFO WAVE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMiddleC(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('MIDDLE C', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPModeSens(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('P MODE SENS.', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPitchEgRate1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('PITCH EG RATE 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPitchEgRate2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('PITCH EG RATE 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPitchEgRate3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('PITCH EG RATE 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPitchEgRate4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('PITCH EG RATE 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPitchEgLevel1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('PITCH EG LEVEL 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPitchEgLevel2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('PITCH EG LEVEL 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPitchEgLevel3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('PITCH EG LEVEL 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPitchEgLevel4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('PITCH EG LEVEL 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1EgRate1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 EG RATE 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1EgRate2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 EG RATE 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1EgRate3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 EG RATE 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1EgRate4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 EG RATE 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1EgLevel1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 EG LEVEL 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1EgLevel2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 EG LEVEL 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1EgLevel3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 EG LEVEL 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1EgLevel4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 EG LEVEL 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1OutputLevel(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 OUTPUT LEVEL', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1Mode(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 MODE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1FCoarse(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 F COARSE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1FFine(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 F FINE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1OscDetune(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 OSC DETUNE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1BreakPoint(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 BREAK POINT', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1LScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 L SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1RScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 R SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1LKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 L KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1RKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 R KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1RateScaling(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 RATE SCALING', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1AModSens(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 A MOD SENS.', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1KeyVelocity(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 KEY VELOCITY', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp1Switch(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP1 SWITCH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2EgRate1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 EG RATE 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2EgRate2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 EG RATE 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2EgRate3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 EG RATE 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2EgRate4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 EG RATE 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2EgLevel1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 EG LEVEL 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2EgLevel2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 EG LEVEL 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2EgLevel3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 EG LEVEL 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2EgLevel4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 EG LEVEL 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2OutputLevel(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 OUTPUT LEVEL', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2Mode(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 MODE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2FCoarse(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 F COARSE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2FFine(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 F FINE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2OscDetune(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 OSC DETUNE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2BreakPoint(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 BREAK POINT', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2LScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 L SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2RScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 R SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2LKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 L KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2RKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 R KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2RateScaling(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 RATE SCALING', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2AModSens(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 A MOD SENS.', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2KeyVelocity(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 KEY VELOCITY', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp2Switch(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP2 SWITCH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3EgRate1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 EG RATE 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3EgRate2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 EG RATE 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3EgRate3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 EG RATE 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3EgRate4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 EG RATE 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3EgLevel1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 EG LEVEL 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3EgLevel2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 EG LEVEL 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3EgLevel3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 EG LEVEL 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3EgLevel4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 EG LEVEL 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3OutputLevel(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 OUTPUT LEVEL', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3Mode(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 MODE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3FCoarse(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 F COARSE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3FFine(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 F FINE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3OscDetune(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 OSC DETUNE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3BreakPoint(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 BREAK POINT', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3LScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 L SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3RScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 R SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3LKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 L KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3RKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 R KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3RateScaling(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 RATE SCALING', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3AModSens(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 A MOD SENS.', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3KeyVelocity(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 KEY VELOCITY', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp3Switch(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP3 SWITCH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4EgRate1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 EG RATE 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4EgRate2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 EG RATE 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4EgRate3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 EG RATE 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4EgRate4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 EG RATE 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4EgLevel1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 EG LEVEL 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4EgLevel2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 EG LEVEL 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4EgLevel3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 EG LEVEL 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4EgLevel4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 EG LEVEL 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4OutputLevel(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 OUTPUT LEVEL', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4Mode(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 MODE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4FCoarse(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 F COARSE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4FFine(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 F FINE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4OscDetune(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 OSC DETUNE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4BreakPoint(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 BREAK POINT', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4LScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 L SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4RScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 R SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4LKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 L KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4RKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 R KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4RateScaling(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 RATE SCALING', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4AModSens(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 A MOD SENS.', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4KeyVelocity(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 KEY VELOCITY', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp4Switch(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP4 SWITCH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5EgRate1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 EG RATE 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5EgRate2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 EG RATE 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5EgRate3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 EG RATE 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5EgRate4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 EG RATE 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5EgLevel1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 EG LEVEL 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5EgLevel2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 EG LEVEL 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5EgLevel3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 EG LEVEL 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5EgLevel4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 EG LEVEL 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5OutputLevel(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 OUTPUT LEVEL', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5Mode(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 MODE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5FCoarse(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 F COARSE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5FFine(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 F FINE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5OscDetune(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 OSC DETUNE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5BreakPoint(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 BREAK POINT', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5LScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 L SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5RScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 R SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5LKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 L KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5RKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 R KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5RateScaling(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 RATE SCALING', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5AModSens(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 A MOD SENS.', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5KeyVelocity(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 KEY VELOCITY', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp5Switch(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP5 SWITCH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6EgRate1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 EG RATE 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6EgRate2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 EG RATE 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6EgRate3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 EG RATE 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6EgRate4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 EG RATE 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6EgLevel1(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 EG LEVEL 1', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6EgLevel2(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 EG LEVEL 2', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6EgLevel3(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 EG LEVEL 3', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6EgLevel4(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 EG LEVEL 4', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6OutputLevel(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 OUTPUT LEVEL', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6Mode(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 MODE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6FCoarse(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 F COARSE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6FFine(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 F FINE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6OscDetune(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 OSC DETUNE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6BreakPoint(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 BREAK POINT', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6LScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 L SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6RScaleDepth(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 R SCALE DEPTH', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6LKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 L KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6RKeyScale(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 R KEY SCALE', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6RateScaling(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 RATE SCALING', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6AModSens(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 A MOD SENS.', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6KeyVelocity(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 KEY VELOCITY', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOp6Switch(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('OP6 SWITCH', value, timeInWholeNotes, curve);
  },
  
  params : {"DryLevel":"Dry Level","WetLevel":"Wet Level","Cutoff":"Cutoff","Resonance":"Resonance","Output":"Output","MasterTuneAdj":"MASTER TUNE ADJ","Algorithm":"ALGORITHM","Feedback":"FEEDBACK","OscKeySync":"OSC KEY SYNC","LfoSpeed":"LFO SPEED","LfoDelay":"LFO DELAY","LfoPmDepth":"LFO PM DEPTH","LfoAmDepth":"LFO AM DEPTH","LfoKeySync":"LFO KEY SYNC","LfoWave":"LFO WAVE","MiddleC":"MIDDLE C","PModeSens":"P MODE SENS.","PitchEgRate1":"PITCH EG RATE 1","PitchEgRate2":"PITCH EG RATE 2","PitchEgRate3":"PITCH EG RATE 3","PitchEgRate4":"PITCH EG RATE 4","PitchEgLevel1":"PITCH EG LEVEL 1","PitchEgLevel2":"PITCH EG LEVEL 2","PitchEgLevel3":"PITCH EG LEVEL 3","PitchEgLevel4":"PITCH EG LEVEL 4","Op1EgRate1":"OP1 EG RATE 1","Op1EgRate2":"OP1 EG RATE 2","Op1EgRate3":"OP1 EG RATE 3","Op1EgRate4":"OP1 EG RATE 4","Op1EgLevel1":"OP1 EG LEVEL 1","Op1EgLevel2":"OP1 EG LEVEL 2","Op1EgLevel3":"OP1 EG LEVEL 3","Op1EgLevel4":"OP1 EG LEVEL 4","Op1OutputLevel":"OP1 OUTPUT LEVEL","Op1Mode":"OP1 MODE","Op1FCoarse":"OP1 F COARSE","Op1FFine":"OP1 F FINE","Op1OscDetune":"OP1 OSC DETUNE","Op1BreakPoint":"OP1 BREAK POINT","Op1LScaleDepth":"OP1 L SCALE DEPTH","Op1RScaleDepth":"OP1 R SCALE DEPTH","Op1LKeyScale":"OP1 L KEY SCALE","Op1RKeyScale":"OP1 R KEY SCALE","Op1RateScaling":"OP1 RATE SCALING","Op1AModSens":"OP1 A MOD SENS.","Op1KeyVelocity":"OP1 KEY VELOCITY","Op1Switch":"OP1 SWITCH","Op2EgRate1":"OP2 EG RATE 1","Op2EgRate2":"OP2 EG RATE 2","Op2EgRate3":"OP2 EG RATE 3","Op2EgRate4":"OP2 EG RATE 4","Op2EgLevel1":"OP2 EG LEVEL 1","Op2EgLevel2":"OP2 EG LEVEL 2","Op2EgLevel3":"OP2 EG LEVEL 3","Op2EgLevel4":"OP2 EG LEVEL 4","Op2OutputLevel":"OP2 OUTPUT LEVEL","Op2Mode":"OP2 MODE","Op2FCoarse":"OP2 F COARSE","Op2FFine":"OP2 F FINE","Op2OscDetune":"OP2 OSC DETUNE","Op2BreakPoint":"OP2 BREAK POINT","Op2LScaleDepth":"OP2 L SCALE DEPTH","Op2RScaleDepth":"OP2 R SCALE DEPTH","Op2LKeyScale":"OP2 L KEY SCALE","Op2RKeyScale":"OP2 R KEY SCALE","Op2RateScaling":"OP2 RATE SCALING","Op2AModSens":"OP2 A MOD SENS.","Op2KeyVelocity":"OP2 KEY VELOCITY","Op2Switch":"OP2 SWITCH","Op3EgRate1":"OP3 EG RATE 1","Op3EgRate2":"OP3 EG RATE 2","Op3EgRate3":"OP3 EG RATE 3","Op3EgRate4":"OP3 EG RATE 4","Op3EgLevel1":"OP3 EG LEVEL 1","Op3EgLevel2":"OP3 EG LEVEL 2","Op3EgLevel3":"OP3 EG LEVEL 3","Op3EgLevel4":"OP3 EG LEVEL 4","Op3OutputLevel":"OP3 OUTPUT LEVEL","Op3Mode":"OP3 MODE","Op3FCoarse":"OP3 F COARSE","Op3FFine":"OP3 F FINE","Op3OscDetune":"OP3 OSC DETUNE","Op3BreakPoint":"OP3 BREAK POINT","Op3LScaleDepth":"OP3 L SCALE DEPTH","Op3RScaleDepth":"OP3 R SCALE DEPTH","Op3LKeyScale":"OP3 L KEY SCALE","Op3RKeyScale":"OP3 R KEY SCALE","Op3RateScaling":"OP3 RATE SCALING","Op3AModSens":"OP3 A MOD SENS.","Op3KeyVelocity":"OP3 KEY VELOCITY","Op3Switch":"OP3 SWITCH","Op4EgRate1":"OP4 EG RATE 1","Op4EgRate2":"OP4 EG RATE 2","Op4EgRate3":"OP4 EG RATE 3","Op4EgRate4":"OP4 EG RATE 4","Op4EgLevel1":"OP4 EG LEVEL 1","Op4EgLevel2":"OP4 EG LEVEL 2","Op4EgLevel3":"OP4 EG LEVEL 3","Op4EgLevel4":"OP4 EG LEVEL 4","Op4OutputLevel":"OP4 OUTPUT LEVEL","Op4Mode":"OP4 MODE","Op4FCoarse":"OP4 F COARSE","Op4FFine":"OP4 F FINE","Op4OscDetune":"OP4 OSC DETUNE","Op4BreakPoint":"OP4 BREAK POINT","Op4LScaleDepth":"OP4 L SCALE DEPTH","Op4RScaleDepth":"OP4 R SCALE DEPTH","Op4LKeyScale":"OP4 L KEY SCALE","Op4RKeyScale":"OP4 R KEY SCALE","Op4RateScaling":"OP4 RATE SCALING","Op4AModSens":"OP4 A MOD SENS.","Op4KeyVelocity":"OP4 KEY VELOCITY","Op4Switch":"OP4 SWITCH","Op5EgRate1":"OP5 EG RATE 1","Op5EgRate2":"OP5 EG RATE 2","Op5EgRate3":"OP5 EG RATE 3","Op5EgRate4":"OP5 EG RATE 4","Op5EgLevel1":"OP5 EG LEVEL 1","Op5EgLevel2":"OP5 EG LEVEL 2","Op5EgLevel3":"OP5 EG LEVEL 3","Op5EgLevel4":"OP5 EG LEVEL 4","Op5OutputLevel":"OP5 OUTPUT LEVEL","Op5Mode":"OP5 MODE","Op5FCoarse":"OP5 F COARSE","Op5FFine":"OP5 F FINE","Op5OscDetune":"OP5 OSC DETUNE","Op5BreakPoint":"OP5 BREAK POINT","Op5LScaleDepth":"OP5 L SCALE DEPTH","Op5RScaleDepth":"OP5 R SCALE DEPTH","Op5LKeyScale":"OP5 L KEY SCALE","Op5RKeyScale":"OP5 R KEY SCALE","Op5RateScaling":"OP5 RATE SCALING","Op5AModSens":"OP5 A MOD SENS.","Op5KeyVelocity":"OP5 KEY VELOCITY","Op5Switch":"OP5 SWITCH","Op6EgRate1":"OP6 EG RATE 1","Op6EgRate2":"OP6 EG RATE 2","Op6EgRate3":"OP6 EG RATE 3","Op6EgRate4":"OP6 EG RATE 4","Op6EgLevel1":"OP6 EG LEVEL 1","Op6EgLevel2":"OP6 EG LEVEL 2","Op6EgLevel3":"OP6 EG LEVEL 3","Op6EgLevel4":"OP6 EG LEVEL 4","Op6OutputLevel":"OP6 OUTPUT LEVEL","Op6Mode":"OP6 MODE","Op6FCoarse":"OP6 F COARSE","Op6FFine":"OP6 F FINE","Op6OscDetune":"OP6 OSC DETUNE","Op6BreakPoint":"OP6 BREAK POINT","Op6LScaleDepth":"OP6 L SCALE DEPTH","Op6RScaleDepth":"OP6 R SCALE DEPTH","Op6LKeyScale":"OP6 L KEY SCALE","Op6RKeyScale":"OP6 R KEY SCALE","Op6RateScaling":"OP6 RATE SCALING","Op6AModSens":"OP6 A MOD SENS.","Op6KeyVelocity":"OP6 KEY VELOCITY","Op6Switch":"OP6 SWITCH"}

};