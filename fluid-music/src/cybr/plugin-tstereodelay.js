const plugin = require('./plugin');
const fluid = { plugin };

// These helpers convert "useful" units like DBfs and milliseconds to the
// normalized equvalients that work with "#TStereo Delay" parameters.
const db2Level = v => (v + 50) / 68; // For "Wet" and "Dry" params
const ms2Time  = v => v / 5000;      // For "L Delay" and "R Delay" params

// For "L High Cut", "R High Cut"
// 0-1 maps to 20-20000, with an exponential curve (^2)
// Calculated freq2V by inverting: https://www.desmos.com/calculator/jmecinvjjh
const denom = Math.sqrt(19980);
const freq2V = v => Math.sqrt(v-20) / denom;

/**
 * This is a helper class for Tracktion's #TStereoDelay VST2 plugin, which is
 * available on Mac, Windows, and Linux. The #T series of plugins are part of
 * Tracktion Waveform's "Daw Essentials" package:
 * https://www.tracktion.com/products/daw-essentials-collection
 * The "Daw Essentials" package comes bundled with OEM, Standard, and Extreme
 * versions of Waveform (but unfortunately, not the "Basic" bundle).
 *
 * Internal Plugins like "volume", "insert", "auxsend", and "auxreturn" work
 * with `fluid.plugin.setParamExplicit` AND `fluid.plugin.setParamNormalized`.
 * However, for Tracktion's VSTs (and possibly all VSTs) `setParamExlicit`
 * behaves the same as `setParamNormalized`. This helper enables #TStereoDelay
 * configuration using useful units like dBFS and milliseconds instead of
 * normalized 0-1 values.
 *
 * To use any method in this module other than `select`, make sure that a
 * `#TStereo Delay` plugin instance is selected by first calling
 * `pluginTStereoDelay.select()`.
 *
 * `#TStereo Delay` has several wet/dry controls:
 * - "Wet" - This is the value that appears in the UI
 * - "Wet Level" - Extra control that appears only in tracktion's bottom bar
 * - "Dry"
 * - "Dry Level"
 *
 * This module uses "Wet" and "Dry", because it makes it easier to understand
 * from when the plugin is viewed in a GUI.
 *
 * The `#TStereo Delay` has some limited tempo sync abilities. When sync is
 * enabled, the following VST parameters control the delay time:
 * - "L Note Delay"
 * - "L Note Offset"
 * - "R Note Delay"
 * - "R Note Offset"
 *
 * When sync is disabled, the following params control the delay time:
 * - "L Delay"
 * - "R Delay"
 */
const pluginTStereoDelay = {
  type: 'VST2',
  name: '#TStereo Delay',
  /**
   * Select a `#TStereo Delay` vst2 plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [pluginId] - optional index of the plugin to select
   */
  select(pluginId) {
    return fluid.plugin.select('#TStereo Delay', 'VST2', pluginId);
  },

  /**
   * Zero the selected `#TStereo Delay` plugin, resetting to sensible defaults.
   */
  zero() {
    return [
      fluid.plugin.setParamExplicit('Dry', 0), // Set dry signal to minumum (0%)
      pluginTStereoDelay.setWetDbfs(0),        // Set wet signal to unity gain
      pluginTStereoDelay.setDelayMs(0),
      pluginTStereoDelay.disableSync(),
      pluginTStereoDelay.setFeedbackLeft(0),
      pluginTStereoDelay.setFeedbackRight(0),
    ];
  },

  /**
   * @param {number} delayMs delay time in milliseconds
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDelayLeftMs(delayMs, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('L Delay', ms2Time(delayMs), timeInWholeNotes, curve);
  },

  /**
   * @param {number} delayMs delay time in milliseconds
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDelayRightMs(delayMs, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('R Delay', ms2Time(delayMs), timeInWholeNotes, curve);
  },

  /**
   * Set Delay time for both left and right channels
   * @param {number} delayMs delay time in milliseconds
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDelayMs(delayMs, timeInWholeNotes, curve) {
    return [
      pluginTStereoDelay.setDelayLeftMs(delayMs, timeInWholeNotes, curve),
      pluginTStereoDelay.setDelayRightMs(delayMs, timeInWholeNotes, curve),
    ];
  },

  /**
   * Set the Wet signal level
   * @param {number} db Wet signal level in DBFS (0 = unity gain)
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setWetDbfs(db, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Wet', db2Level(db), timeInWholeNotes, curve);
  },

  /**
   * Set the Dry signal level
   * @param {number} db Dry signal level in DBFS (0 = unity gain)
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDryDbfs(db, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dry', db2Level(db), timeInWholeNotes, curve);
  },

  /**
   * If the left channel has non-zero feedback, pan it accross the left/right
   * inputs.
   * @param {number} pan 0=center -1=left 1=right
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setCrossfeedLeft(pan, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('L Cross FB', pan * 0.5 + 0.5, timeInWholeNotes, curve);
  },

  /**
   * If the right channel has non-zero feedback, pan it accross the left/right
   * inputs.
   * @param {number} pan 0=center -1=left 1=right
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setCrossfeedRight(pan, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('R Cross FB', pan * 0.5 + 0.5, timeInWholeNotes, curve);
  },

  /**
   * Set the feedback amount from the left delay back into the plugin input.
   * @param {number} amt Left feedback amount. 0=none 1=100% -1=100%(inverted)
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFeedbackLeft(amt, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('L Feedback', amt * 0.5 + 0.5, timeInWholeNotes, curve);
  },

  /**
   * Set the feedback amount from the right delay back into the plugin input.
   * @param {number} amt Right feedback amount. 0=none 1=100% -1=100%(inverted)
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFeedbackRight(amt, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('R Feedback', amt * 0.5 + 0.5, timeInWholeNotes, curve);
  },

  /**
   * Set the feedback amount from both left and rights delays.
   * @param {number} amt Right feedback amount. 0=none 1=100% -1=100%(inverted)
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFeedback(amt, timeInWholeNotes, curve) {
    return [
      fluid.plugin.setExternalParamHelper('L Feedback', amt * 0.5 + 0.5, timeInWholeNotes, curve),
      fluid.plugin.setExternalParamHelper('R Feedback', amt * 0.5 + 0.5, timeInWholeNotes, curve),
    ];
  },

  /**
   * #TStereo Delay has a 'Sync' feature, which is not currently well supported
   * by this fluid module. I recommend disabling it. If you want to use the sync
   * feature, you must use the `fluid.plugin.setParam` methods.
   *
   * Note that Waveform's sync feature does not follow tempo automation, so it
   * is probably best to just calculate tempos in milliseconds and specify them
   * using the `fluid.pluginTStereoDelay.setDelayMs` helpers.
   */
  disableSync() {
    return fluid.plugin.setParamExplicit('Sync', 0);
  },

  /**
   * Pan the right delay channel.
   * @param {number} amt Right channel pan amount. 0=Center 1=Right -1=Left
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPanRight(amt, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('R Pan', amt * 0.5 + 0.5, timeInWholeNotes, curve);
  },

  /**
   * Pan the left delay channel.
   * @param {number} amt Left channel pan amount. 0=Center 1=Right -1=Left
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPanLeft(amt, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('L Pan', amt * 0.5 + 0.5, timeInWholeNotes, curve);
  },

  /**
   * Pan to the center, specifying the width
   * @param {number} width Stereo width. 0=mono 1=Stereo -1=InvertStereo
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPanWidth(amt, timeInWholeNotes, curve) {
    const panR = amt;
    const panL = panR * -1;
    return [
      pluginTStereoDelay.setPanLeft(panL, timeInWholeNotes, curve),
      pluginTStereoDelay.setPanRight(panR, timeInWholeNotes, curve),
    ];
  },

  /**
   * Set low pass cutoff frequency on the left channel of the delay
   * @param {number} freq frequency between 20 and 20000
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLowPassFreqLeft(freq, timeInWholeNotes, curve) {
    freq = Math.min(freq, 20000);
    freq = Math.max(freq, 20);
    const amt = freq2V(freq);
    return fluid.plugin.setExternalParamHelper('L High Cut', amt, timeInWholeNotes, curve);
  },

  /**
   * Set low pass cutoff frequency on the right channel of the delay
   * @param {number} freq frequency between 20 and 20000
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLowPassFreqRight(freq, timeInWholeNotes, curve) {
    freq = Math.min(freq, 20000);
    freq = Math.max(freq, 20);
    const amt = freq2V(freq);
    return fluid.plugin.setExternalParamHelper('R High Cut', amt, timeInWholeNotes, curve);
  },

  /**
   * Set low pass cutoff frequency on both channel of the delay
   * @param {number} freq frequency between 20 and 20000
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    whole  notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLowPassFreq(freq, timeInWholeNotes, curve) {
    return [
      pluginTStereoDelay.setLowPassFreqLeft(freq, timeInWholeNotes, curve),
      pluginTStereoDelay.setLowPassFreqRight(freq, timeInWholeNotes, curve),
    ];
  },
}

module.exports = pluginTStereoDelay;

// Dry Level
// Wet Level
// Enable
// Input
// Sync
// L Source
// L Feedback
// L Cross FB
// L Note Delay
// L Note Offset
// L Delay
// L Pan
// L Low Cut
// L High Cut
// R Source
// R Feedback
// R Cross FB
// R Note Delay
// R Note Offset
// R Delay
// R Pan
// R Low Cut
// R High Cut
// Wet
// Dry
