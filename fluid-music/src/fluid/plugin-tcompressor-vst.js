const plugin = require('./plugin');
const fluid = { plugin };

const db2Level = v => (v + 50) / 68; // For "Wet" and "Dry" params
const thresholdDb2Level = v => (v+60) / 60; // For "Threshold" param

/**
 * This is a helper class for Tracktion's #TCompressor VST2 plugin, which is
 * available on Mac, Windows, and Linux. The #T series of plugins are part of
 * Tracktion Waveform's "Daw Essentials" package:
 * https://www.tracktion.com/products/daw-essentials-collection
 * The "Daw Essentials" package comes bundled with OEM, Standard, and Extreme
 * versions of Waveform (but unfortunately, not the "Basic" bundle).
 *
 * Internal Plugins like "volume", "insert", "auxsend", and "auxreturn" work
 * with `fluid.plugin.setParamExplicit` AND `fluid.plugin.setParamNormalized`.
 * However, for Tracktion's VSTs (and possibly all VSTs) `setParamExlicit`
 * behaves the same as `setParamNormalized`. This helper enables #TCompressor
 * configuration using useful units like dBFS and milliseconds instead of
 * normalized 0-1 values.
 *
 * To use any method in this module other than `select`, make sure that a
 * `#TCompressor` plugin instance is selected by first calling
 * `pluginTCompressor.select()`.
 */
const pluginTCompressor = {
  /**
   * Select a `#TCompressor` vst plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [pluginId] - optional index of the plugin to select
   */
  select(pluginId) {
    return fluid.plugin.select('#TCompressor', 'vst', pluginId);
  },

  /**
   * Zero the selected `#TStereo Delay` plugin, resetting to sensible defaults.
   */
  zero() {
    return [
      pluginTCompressor.setEnable(1),
      pluginTCompressor.setDryLevel(0), // Set dry signal to minumum (0%)
      pluginTCompressor.setWetLevel(0), // Set dry signal to minumum (0%)
      pluginTCompressor.setInput(0),
      pluginTCompressor.setAuto(0),
      pluginTCompressor.setMakeUp(0),
      pluginTCompressor.setLookahead(0),
      pluginTCompressor.setRatio(2),
      pluginTCompressor.setThreshold(-30),
      pluginTCompressor.setAttack(50),
      pluginTCompressor.setHold(0),
      pluginTCompressor.setRelease(500),
      pluginTCompressor.setSoftKnee(0),
      pluginTCompressor.setUseSidechainTrigger(0),
      pluginTCompressor.setMonitorSidechain(0),
      pluginTCompressor.setPeakDetection(0),
      pluginTCompressor.setUseSumDetection(0),
      pluginTCompressor.setSoftClip(0),
      pluginTCompressor.setFilter(0),
    ];
  },

  /**
   * @param {number} db Wet signal level in DBFS (0 = unity gain)
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDryLevel(db, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Dry Level', db2Level(db), timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} db Wet signal level in DBFS (0 = unity gain)
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setWetLevel(db, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Wet Level', db2Level(db), timeInWholeNotes, curve);
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
      if (typeof(value) !== Boolean) return Error("value required to be of type Boolean")
      return fluid.plugin.setExternalParamHelper('Enable', value, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a boolean to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMode(value, timeInWholeNotes, curve) {
    if (typeof(value) !== Boolean) return Error("value required to be of type Boolean")
    return fluid.plugin.setExternalParamHelper('Mode', value | 0, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} db threshold value from -60 to 0 in DBFS
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setThreshold(db, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Threshold', thresholdDb2Level(db), timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 1-100 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setRatio(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Ratio', (value-1)/99, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0.1-100 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setAttack(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Attack', (value-0.1)/99.9, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-1000 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setHold(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Hold', value/1000, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 1-1000 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setRelease(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Release', (value-1)/999, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between -20 to 20 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setInput(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Input', (value+20)/40, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between -20 to 20 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMakeUp(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Make-up', (value+20)/40, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0-60 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setSoftKnee(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Soft Knee', value/60, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0 to 10 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLookahead(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Lookahead', value/10, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a boolean to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLimit(value, timeInWholeNotes, curve) {
      if (typeof(value) !== Boolean) return Error("value required to be of type Boolean")
      return fluid.plugin.setExternalParamHelper('Limit', value | 0, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a boolean to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setUseSidechainTrigger(value, timeInWholeNotes, curve) {
    if (typeof(value) !== Boolean) return Error("value required to be of type Boolean")
    return fluid.plugin.setExternalParamHelper('Use Sidechain Trigger', value | 0, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a boolean to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonitorSidechain(value, timeInWholeNotes, curve) {
      if (typeof(value) !== Boolean) return Error("value required to be of type Boolean")
      return fluid.plugin.setExternalParamHelper('Monitor Sidechain', value | 0, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a boolean to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setSoftClip(value, timeInWholeNotes, curve) {
      if (typeof(value) !== Boolean) return Error("value required to be of type Boolean")
      return fluid.plugin.setExternalParamHelper('Soft Clip', value | 0, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between -60 to 0 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setThreshold2(db, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Threshold (2)', thresholdDb2Level(db), timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a boolean to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPeakDetection(value, timeInWholeNotes, curve) {
      if (typeof(value) !== Boolean) return Error("value required to be of type Boolean")
      return fluid.plugin.setExternalParamHelper('Peak Detection', value | 0, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a boolean to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setUseSumDetection(value, timeInWholeNotes, curve) {
      if (typeof(value) !== Boolean) return Error("value required to be of type Boolean")
      return fluid.plugin.setExternalParamHelper('Use Sum Detection', value | 0, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a boolean to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setAuto(value, timeInWholeNotes, curve) {
      if (typeof(value) !== Boolean) return Error("value required to be of type Boolean")
      return fluid.plugin.setExternalParamHelper('Auto', value | 0, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a boolean to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFilter(value, timeInWholeNotes, curve) {
      if (typeof(value) !== Boolean) return Error("value required to be of type Boolean")
      return fluid.plugin.setExternalParamHelper('Filter', value | 0, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value an integer between 0-7 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setType(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Type', value/7, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 10-20000 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFreq(hz, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Freq', (hz-10)/19990, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between 0.025-40 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setQ(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Q', (value-0.025)/37.975, timeInWholeNotes, curve);
  },
  
  /**
   * @param {number} value a number between -30 to 30 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setGain(value, timeInWholeNotes, curve) {
      return fluid.plugin.setExternalParamHelper('Gain', (value+30)/60, timeInWholeNotes, curve);
  },
  
  params : {"DryLevel":"Dry Level","WetLevel":"Wet Level","Enable":"Enable","Mode":"Mode","Threshold":"Threshold","Ratio":"Ratio","Attack":"Attack","Hold":"Hold","Release":"Release","Input":"Input","MakeUp":"Make-up","SoftKnee":"Soft Knee","Lookahead":"Lookahead","Limit":"Limit","UseSidechainTrigger":"Use Sidechain Trigger","MonitorSidechain":"Monitor Sidechain","SoftClip":"Soft Clip","Threshold(2)":"Threshold (2)","PeakDetection":"Peak Detection","UseSumDetection":"Use Sum Detection","Auto":"Auto","Filter":"Filter","Type":"Type","Freq":"Freq","Q":"Q","Gain":"Gain"}

};

module.exports = pluginTCompressor;