const plugin = require('./plugin');
const fluid = { plugin };

// These helpers convert "useful" units like DBfs and milliseconds to the
// normalized equvalients that work with "#TStereo Delay" parameters.
const db2Level = v => (v + 50) / 68; // For "Wet" and "Dry" params
const ms2Time = v => v / 5000;       // For "L Delay" and "R Delay" params

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
  /**
   * Select a `#TStereo Delay` vst2 plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [pluginId] - optional index of the plugin to select
   */
  select(pluginId) {
    return fluid.plugin.select('#TStereo Delay', 'vst', pluginId);
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
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelayLeftMs(delayMs, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('L Delay', ms2Time(delayMs), timeInQuarterNotes, curve);
  },

  /**
   * @param {number} delayMs delay time in milliseconds
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelayRightMs(delayMs, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('R Delay', ms2Time(delayMs), timeInQuarterNotes, curve);
  },

  /**
   * Set Delay time for both left and right channels
   * @param {number} delayMs delay time in milliseconds
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelayMs(delayMs, timeInQuarterNotes, curve) {
    return [
      pluginTStereoDelay.setDelayLeftMs(delayMs, timeInQuarterNotes, curve),
      pluginTStereoDelay.setDelayRightMs(delayMs, timeInQuarterNotes, curve),
    ];
  },

  /**
   * Set the Wet signal level
   * @param {number} db Wet signal level in DBFS (0 = unity gain)
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setWetDbfs(db, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Wet', db2Level(db), timeInQuarterNotes, curve);
  },

  /**
   * Set the Dry signal level
   * @param {number} db Dry signal level in DBFS (0 = unity gain)
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDryDbfs(db, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dry', db2Level(db), timeInQuarterNotes, curve);
  },

  /**
   * If the left channel has non-zero feedback, pan it accross the left/right
   * inputs.
   * @param {number} pan 0=center -1=left 1=right
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setCrossfeedLeft(pan, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('L Cross FB', pan * 0.5 + 0.5, timeInQuarterNotes, curve);
  },

  /**
   * If the right channel has non-zero feedback, pan it accross the left/right
   * inputs.
   * @param {number} pan 0=center -1=left 1=right
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setCrossfeedRight(pan, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('R Cross FB', pan * 0.5 + 0.5, timeInQuarterNotes, curve);
  },

  /**
   * Set the feedback amount from the left delay back into the plugin input.
   * @param {number} amt Left feedback amount. 0=none 1=100% -1=100%(inverted)
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFeedbackLeft(amt, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('L Feedback', amt * 0.5 + 0.5, timeInQuarterNotes, curve);
  },

  /**
   * Set the feedback amount from the right delay back into the plugin input.
   * @param {number} amt Right feedback amount. 0=none 1=100% -1=100%(inverted)
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFeedbackRight(amt, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('R Feedback', amt * 0.5 + 0.5, timeInQuarterNotes, curve);
  },

  /**
   * Set the feedback amount from both left and rights delays.
   * @param {number} amt Right feedback amount. 0=none 1=100% -1=100%(inverted)
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFeedback(amt, timeInQuarterNotes, curve) {
    return [
      fluid.plugin.setExternalParamHelper('L Feedback', amt * 0.5 + 0.5, timeInQuarterNotes, curve),
      fluid.plugin.setExternalParamHelper('R Feedback', amt * 0.5 + 0.5, timeInQuarterNotes, curve),
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
