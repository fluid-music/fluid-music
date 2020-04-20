
const plugin = require('./plugin');
const fluid = { plugin };
module.exports = {
  /**
   * Select a `Zebra2` vst2 plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [pluginId] - optional index of the plugin to select
   */
  select(pluginId) {
    return fluid.plugin.select('Zebra2', 'vst', pluginId);
  },


  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDryLevel(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dry Level', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setWetLevel(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Wet Level', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMainOutput(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('main: Output', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMainActiveLFOG(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('main: Active #LFOG', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMainActiveLFOG2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('main: Active #LFOG2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreX1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: X1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreY1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Y1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreX2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: X2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreY2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Y2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreX3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: X3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreY3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Y3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreX4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: X4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreY4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Y4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix1Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix1 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix1Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix1 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix1ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix1 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix1Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix1 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix2Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix2 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix2Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix2 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix2ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix2 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix2Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix2 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix3Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix3 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix3Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix3 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix3ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix3 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix3Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix3 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix4Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix4 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix4Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix4 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix4ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix4 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix4Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix4 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFOGSync(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFOG: Sync', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFOGPhase(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFOG: Phase', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFOG2Sync(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFOG2: Sync', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFOG2Phase(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFOG2: Phase', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCActiveLFO1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Active #LFO1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCActiveLFO2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Active #LFO2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCActiveLFO3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Active #LFO3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCActiveLFO4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Active #LFO4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCVoices(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Voices', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCVoicing(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Voicing', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCMode(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Mode', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCPortamento(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Portamento', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCTranspose(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Transpose', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCFineTuneCents(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: FineTuneCents', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA5(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA5', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA6(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA6', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA7(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA7', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA8(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA8', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA9(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA9', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA10(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA10', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA11(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA11', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA12(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA12', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA13(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA13', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA14(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA14', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA15(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA15', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCCArpStepModA16(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA16', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV1Init(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Init', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV1Attack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Attack', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV1Decay(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Decay', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV1Sustain(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Sustain', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV1FallRise(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Fall/Rise', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV1Sustain2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Sustain2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV1Release(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Release', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV1Velocity(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Velocity', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV1Slope(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Slope', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV2Init(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Init', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV2Attack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Attack', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV2Decay(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Decay', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV2Sustain(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Sustain', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV2FallRise(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Fall/Rise', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV2Sustain2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Sustain2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV2Release(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Release', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV2Velocity(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Velocity', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV2Slope(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Slope', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV3Init(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Init', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV3Attack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Attack', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV3Decay(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Decay', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV3Sustain(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Sustain', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV3FallRise(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Fall/Rise', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV3Sustain2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Sustain2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV3Release(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Release', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV3Velocity(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Velocity', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV3Slope(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Slope', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV4Init(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Init', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV4Attack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Attack', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV4Decay(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Decay', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV4Sustain(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Sustain', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV4FallRise(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Fall/Rise', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV4Sustain2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Sustain2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV4Release(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Release', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV4Velocity(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Velocity', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setENV4Slope(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Slope', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG1Velocity(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG1: Velocity', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG1Attack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG1: Attack', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG1Loop(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG1: Loop', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG1Release(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG1: Release', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG2Velocity(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG2: Velocity', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG2Attack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG2: Attack', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG2Loop(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG2: Loop', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG2Release(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG2: Release', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG3Velocity(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG3: Velocity', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG3Attack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG3: Attack', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG3Loop(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG3: Loop', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG3Release(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG3: Release', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG4Velocity(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG4: Velocity', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG4Attack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG4: Attack', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG4Loop(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG4: Loop', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMSEG4Release(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG4: Release', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFO1Sync(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO1: Sync', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFO1Delay(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO1: Delay', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFO2Sync(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO2: Sync', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFO2Delay(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO2: Delay', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFO3Sync(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO3: Sync', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFO3Delay(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO3: Delay', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFO4Sync(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO4: Sync', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setLFO4Delay(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO4: Delay', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMMix1Constant(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MMix1: Constant', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMMix2Constant(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MMix2: Constant', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMMix3Constant(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MMix3: Constant', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMMix4Constant(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MMix4: Constant', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1Tune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Tune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1TuneModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: TuneModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1TuneModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: TuneModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1Phase(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Phase', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1PhaseModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: PhaseModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1PhaseModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: PhaseModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1WaveWarp(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: WaveWarp', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1WarpModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: WarpModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1WarpModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: WarpModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1Vibrato(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Vibrato', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1SpectraFX1Val(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SpectraFX1 Val', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1SFX1ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SFX1ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1SFX1ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SFX1ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1SpectraFX2Val(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SpectraFX2 Val', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1SFX2ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SFX2ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1SFX2ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SFX2ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1Detune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Detune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1SyncTune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SyncTune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1SyncModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SyncModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1SyncModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SyncModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1PolyWidth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Poly Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC1Normalize(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Normalize', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2Tune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Tune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2TuneModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: TuneModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2TuneModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: TuneModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2Phase(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Phase', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2PhaseModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: PhaseModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2PhaseModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: PhaseModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2WaveWarp(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: WaveWarp', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2WarpModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: WarpModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2WarpModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: WarpModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2Vibrato(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Vibrato', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2SpectraFX1Val(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SpectraFX1 Val', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2SFX1ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SFX1ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2SFX1ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SFX1ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2SpectraFX2Val(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SpectraFX2 Val', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2SFX2ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SFX2ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2SFX2ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SFX2ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2Detune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Detune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2SyncTune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SyncTune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2SyncModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SyncModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2SyncModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SyncModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2PolyWidth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Poly Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC2Normalize(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Normalize', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3Tune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Tune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3TuneModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: TuneModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3TuneModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: TuneModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3Phase(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Phase', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3PhaseModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: PhaseModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3PhaseModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: PhaseModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3WaveWarp(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: WaveWarp', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3WarpModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: WarpModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3WarpModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: WarpModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3Vibrato(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Vibrato', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3SpectraFX1Val(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SpectraFX1 Val', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3SFX1ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SFX1ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3SFX1ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SFX1ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3SpectraFX2Val(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SpectraFX2 Val', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3SFX2ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SFX2ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3SFX2ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SFX2ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3Detune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Detune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3SyncTune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SyncTune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3SyncModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SyncModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3SyncModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SyncModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3PolyWidth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Poly Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC3Normalize(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Normalize', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4Tune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Tune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4TuneModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: TuneModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4TuneModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: TuneModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4Phase(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Phase', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4PhaseModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: PhaseModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4PhaseModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: PhaseModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4WaveWarp(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: WaveWarp', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4WarpModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: WarpModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4WarpModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: WarpModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4Vibrato(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Vibrato', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4SpectraFX1Val(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SpectraFX1 Val', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4SFX1ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SFX1ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4SFX1ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SFX1ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4SpectraFX2Val(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SpectraFX2 Val', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4SFX2ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SFX2ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4SFX2ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SFX2ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4Detune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Detune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4SyncTune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SyncTune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4SyncModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SyncModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4SyncModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SyncModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4PolyWidth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Poly Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setOSC4Normalize(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Normalize', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1Filter1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: Filter1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1F1ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: F1 ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1F1ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: F1 ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1Filter2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: Filter2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1F2ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: F2 ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1F2ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: F2 ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise1Width(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2Filter1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: Filter1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2F1ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: F1 ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2F1ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: F1 ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2Filter2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: Filter2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2F2ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: F2 ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2F2ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: F2 ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNoise2Width(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF1Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF1Cutoff(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: Cutoff', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF1Resonance(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: Resonance', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF1Drive(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: Drive', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF1Gain(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: Gain', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF1ModDepth1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: ModDepth1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF1ModDepth2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: ModDepth2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF1KeyFollow(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: KeyFollow', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF2Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF2Cutoff(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: Cutoff', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF2Resonance(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: Resonance', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF2Drive(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: Drive', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF2Gain(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: Gain', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF2ModDepth1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: ModDepth1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF2ModDepth2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: ModDepth2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF2KeyFollow(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: KeyFollow', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF3Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF3Cutoff(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: Cutoff', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF3Resonance(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: Resonance', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF3Drive(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: Drive', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF3Gain(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: Gain', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF3ModDepth1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: ModDepth1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF3ModDepth2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: ModDepth2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF3KeyFollow(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: KeyFollow', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF4Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF4Cutoff(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: Cutoff', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF4Resonance(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: Resonance', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF4Drive(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: Drive', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF4Gain(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: Gain', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF4ModDepth1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: ModDepth1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF4ModDepth2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: ModDepth2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF4KeyFollow(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: KeyFollow', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1Tune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Tune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1TuneModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: TuneModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1TuneModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: TuneModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1FMDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: FM Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1FMModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: FM ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1FMModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: FM ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1Vibrato(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Vibrato', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1Detune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Detune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO1Width(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2Tune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Tune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2TuneModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: TuneModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2TuneModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: TuneModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2FMDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: FM Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2FMModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: FM ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2FMModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: FM ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2Vibrato(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Vibrato', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2Detune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Detune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO2Width(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3Tune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Tune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3TuneModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: TuneModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3TuneModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: TuneModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3FMDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: FM Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3FMModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: FM ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3FMModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: FM ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3Vibrato(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Vibrato', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3Detune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Detune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO3Width(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4Tune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Tune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4TuneModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: TuneModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4TuneModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: TuneModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4FMDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: FM Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4FMModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: FM ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4FMModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: FM ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4Vibrato(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Vibrato', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4Detune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Detune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFMO4Width(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Tune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Tune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1KeyScale(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: key scale', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1TuneModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: TuneModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Detune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Detune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Vibrato(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Vibrato', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Feedback(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Feedback', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1FBModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: FBModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Damp(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Damp', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1DampModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: DampModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1PreFill(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: PreFill', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1InputMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: InputMod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Tone(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Tone', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1ToneMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: ToneMod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Flavour(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Flavour', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1FlavourMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: FlavourMod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Distortion(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Distortion', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Dry(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Dry', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb1Width(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Tune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Tune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2KeyScale(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: key scale', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2TuneModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: TuneModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Detune(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Detune', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Vibrato(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Vibrato', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Feedback(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Feedback', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2FBModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: FBModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Damp(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Damp', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2DampModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: DampModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2PreFill(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: PreFill', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2InputMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: InputMod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Tone(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Tone', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2ToneMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: ToneMod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Flavour(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Flavour', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2FlavourMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: FlavourMod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Distortion(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Distortion', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Dry(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Dry', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Volume(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Volume', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2VolumeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: VolumeModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2VolumeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: VolumeModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2PanModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: PanModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: PanModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComb2Width(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape1Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape1D_ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: D_ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape1D_ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: D_ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape1Edge(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Edge', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape1EdgeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Edge ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape1EdgeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Edge ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape1Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape1Output(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Output', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape1HiOut(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: HiOut', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape2Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape2D_ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: D_ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape2D_ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: D_ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape2Edge(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Edge', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape2EdgeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Edge ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape2EdgeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Edge ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape2Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape2Output(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Output', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape2HiOut(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: HiOut', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix1Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix1: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix1Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix1: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix1PanMode(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix1: Pan Mode', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix1PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix1: PanMod Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix1PanModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix1: PanMod Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix2Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix2: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix2Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix2: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix2PanMode(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix2: Pan Mode', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix2PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix2: PanMod Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix2PanModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix2: PanMod Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix3Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix3: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix3Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix3: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix3PanMode(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix3: Pan Mode', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix3PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix3: PanMod Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix3PanModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix3: PanMod Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix4Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix4: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix4Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix4: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix4PanMode(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix4: Pan Mode', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix4PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix4: PanMod Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix4PanModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix4: PanMod Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1Cutoff(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Cutoff', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1Resonance(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Resonance', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1FreqMod1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Freq mod 1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1FreqMod2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Freq mod 2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1KeyFollow(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: KeyFollow', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1FreqOffset(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: FreqOffset', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1FreqOffMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: FreqOffMod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1FilterFM(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: FilterFM', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1XFMmod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: XFMmod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1Overload(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Overload', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF1Click(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Click', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2Cutoff(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Cutoff', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2Resonance(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Resonance', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2FreqMod1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Freq mod 1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2FreqMod2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Freq mod 2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2KeyFollow(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: KeyFollow', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2FreqOffset(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: FreqOffset', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2FreqOffMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: FreqOffMod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2FilterFM(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: FilterFM', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2XFMmod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: XFMmod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2Overload(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Overload', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF2Click(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Click', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1Center(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Center', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1Speed(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Speed', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1Stereo(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Stereo', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1Feedback(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Feedback', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1LowCutFreq(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: LowCut Freq', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1HiCutFreq(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: HiCut Freq', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1Quad(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Quad', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1QuadPhase(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: QuadPhase', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1LowBoostDB(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Low Boost dB', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX1HighBoostDB(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: High Boost dB', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2Center(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Center', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2Speed(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Speed', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2Stereo(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Stereo', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2Feedback(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Feedback', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2LowCutFreq(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: LowCut Freq', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2HiCutFreq(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: HiCut Freq', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2Quad(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Quad', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2QuadPhase(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: QuadPhase', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2LowBoostDB(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Low Boost dB', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setModFX2HighBoostDB(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: High Boost dB', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelay1Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay1: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelay1Feedback(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay1: Feedback', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelay1XBack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay1: X-back', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelay1Lowpass(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay1: Lowpass', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelay1Hipass(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay1: Hipass', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelay2Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay2: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelay2Feedback(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay2: Feedback', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelay2XBack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay2: X-back', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelay2Lowpass(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay2: Lowpass', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDelay2Hipass(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay2: Hipass', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape3Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape3D_ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: D_ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape3D_ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: D_ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape3Edge(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Edge', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape3EdgeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Edge ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape3EdgeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Edge ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape3Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape3Output(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Output', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape3HiOut(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: HiOut', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape4Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape4D_ModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: D_ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape4D_ModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: D_ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape4Edge(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Edge', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape4EdgeModSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Edge ModSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape4EdgeModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Edge ModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape4Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape4Output(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Output', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setShape4HiOut(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: HiOut', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix5Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix5: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix5Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix5: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix5PanMode(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix5: Pan Mode', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix5PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix5: PanMod Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix5PanModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix5: PanMod Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix6Pan(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix6: Pan', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix6Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix6: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix6PanMode(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix6: Pan Mode', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix6PanModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix6: PanMod Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setMix6PanModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix6: PanMod Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1Dry(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Dry', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1Wet(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Wet', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1Feedback(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Feedback', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1Damp(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Damp', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1Range(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Range', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1Speed(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Speed', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1Modulation(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Modulation', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1DiffFeedback(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Diff Feedback', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1DiffRange(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Diff Range', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1DiffMix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Diff Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1DiffMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Diff Mod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setRev1DiffSpeed(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Diff Speed', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp1Compression(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Compression', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp1Threshold(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Threshold', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp1Attack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Attack', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp1Release(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Release', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp1Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp1Output(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Output', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp2Compression(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Compression', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp2Threshold(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Threshold', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp2Attack(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Attack', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp2Release(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Release', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp2Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setComp2Output(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Output', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1FreqLowShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Freq LowShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1QLowShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Q LowShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1GainLowShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Gain LowShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1FreqMid1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Freq Mid1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1QMid1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Q Mid1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1GainMid1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Gain Mid1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1FreqMid2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Freq Mid2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1QMid2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Q Mid2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1GainMid2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Gain Mid2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1FreqHiShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Freq HiShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1QHiShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Q HiShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ1GainHiShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Gain HiShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2FreqLowShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Freq LowShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2QLowShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Q LowShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2GainLowShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Gain LowShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2FreqMid1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Freq Mid1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2QMid1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Q Mid1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2GainMid1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Gain Mid1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2FreqMid2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Freq Mid2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2QMid2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Q Mid2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2GainMid2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Gain Mid2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2FreqHiShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Freq HiShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2QHiShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Q HiShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setEQ2GainHiShelf(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Gain HiShelf', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF5Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF5Cutoff(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: Cutoff', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF5Resonance(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: Resonance', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF5Drive(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: Drive', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF5Gain(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: Gain', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF5ModDepth1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: ModDepth1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF5ModDepth2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: ModDepth2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF5KeyFollow(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: KeyFollow', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF6Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF6Cutoff(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: Cutoff', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF6Resonance(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: Resonance', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF6Drive(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: Drive', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF6Gain(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: Gain', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF6ModDepth1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: ModDepth1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF6ModDepth2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: ModDepth2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCF6KeyFollow(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: KeyFollow', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB1Frequency(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: Frequency', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB1FModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: FModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB1FModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: FModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB1Offset(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: Offset', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB1OModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: OModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB1OModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: OModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB1Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB1MModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: MModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB1MModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: MModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB2Frequency(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: Frequency', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB2FModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: FModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB2FModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: FModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB2Offset(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: Offset', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB2OModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: OModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB2OModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: OModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB2Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB2MModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: MModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB2MModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: MModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB3Frequency(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: Frequency', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB3FModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: FModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB3FModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: FModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB3Offset(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: Offset', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB3OModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: OModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB3OModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: OModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB3Mix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB3MModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: MModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setSB3MModDepth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: MModDepth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix5Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix5 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix5Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix5 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix5ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix5 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix5Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix5 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix6Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix6 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix6Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix6 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix6ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix6 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix6Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix6 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix7Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix7 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix7Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix7 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix7ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix7 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix7Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix7 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix8Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix8 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix8Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix8 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix8ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix8 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix8Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix8 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix9Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix9 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix9Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix9 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix9ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix9 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix9Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix9 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix10Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix10 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix10Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix10 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix10ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix10 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix10Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix10 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix11Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix11 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix11Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix11 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix11ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix11 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix11Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix11 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix12Source(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix12 Source', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix12Depth(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix12 Depth', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix12ViaSrc(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix12 ViaSrc', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setPCoreMatrix12Via(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix12 Via', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3Cutoff(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Cutoff', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3Resonance(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Resonance', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3FreqMod1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Freq mod 1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3FreqMod2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Freq mod 2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3KeyFollow(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: KeyFollow', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3FreqOffset(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: FreqOffset', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3FreqOffMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: FreqOffMod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3FilterFM(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: FilterFM', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3XFMmod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: XFMmod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3Overload(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Overload', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setXMF3Click(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Click', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist1Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist1Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist1Output(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Output', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist1PreTilt(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Pre Tilt', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist1PostTilt(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Post Tilt', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist1CenterFreq(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Center Freq', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist1Low(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Low', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist1High(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: High', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist1PostFilter(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Post Filter', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist2Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist2Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist2Output(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Output', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist2PreTilt(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Pre Tilt', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist2PostTilt(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Post Tilt', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist2CenterFreq(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Center Freq', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist2Low(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Low', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist2High(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: High', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist2PostFilter(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Post Filter', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist3Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist3Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist3Output(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Output', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist3PreTilt(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Pre Tilt', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist3PostTilt(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Post Tilt', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist3CenterFreq(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Center Freq', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist3Low(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Low', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist3High(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: High', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist3PostFilter(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Post Filter', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist4Type(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Type', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist4Input(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Input', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist4Output(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Output', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist4PreTilt(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Pre Tilt', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist4PostTilt(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Post Tilt', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist4CenterFreq(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Center Freq', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist4Low(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Low', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist4High(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: High', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setDist4PostFilter(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Post Filter', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold1Ripples(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Ripples', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold1Folds(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Folds', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold1FoldMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Fold Mod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold1FoldModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Fold ModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold1Bias(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Bias', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold1BiasMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Bias Mod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold1BiasModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Bias ModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold1FoldRatio(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: FoldRatio', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold1FoldSlope(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: FoldSlope', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold1ClipAngle(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Clip Angle', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold2Ripples(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Ripples', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold2Folds(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Folds', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold2FoldMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Fold Mod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold2FoldModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Fold ModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold2Bias(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Bias', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold2BiasMod(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Bias Mod', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold2BiasModSource(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Bias ModSource', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold2FoldRatio(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: FoldRatio', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold2FoldSlope(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: FoldSlope', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setFold2ClipAngle(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Clip Angle', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Pan1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1PanModSrc1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Src1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1PanModDpt1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Dpt1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Volume1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Volume1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1VCA1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: VCA1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Modulation1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Modulation1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1ModDepth1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mod Depth1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Pan2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1PanModSrc2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Src2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1PanModDpt2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Dpt2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Volume2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Volume2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1VCA2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: VCA2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Modulation2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Modulation2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1ModDepth2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mod Depth2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Pan3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1PanModSrc3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Src3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1PanModDpt3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Dpt3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Volume3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Volume3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1VCA3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: VCA3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Modulation3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Modulation3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1ModDepth3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mod Depth3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Pan4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1PanModSrc4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Src4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1PanModDpt4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Dpt4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Volume4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Volume4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1VCA4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: VCA4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Modulation4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Modulation4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1ModDepth4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mod Depth4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Mute1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mute1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Mute2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mute2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Mute3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mute3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Mute4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mute4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Panning1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Panning1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Panning2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Panning2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Panning3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Panning3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Panning4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Panning4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Bus1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Bus1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Bus2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Bus2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Bus3(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Bus3', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Bus4(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Bus4', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Send1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Send1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1SendMod1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: SendMod1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1SendDepth1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: SendDepth1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1Send2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Send2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1SendMod2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: SendMod2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setVCA1SendDepth2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: SendDepth2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNuRev1PreDelay(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Pre-Delay', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNuRev1Damp(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Damp', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNuRev1Decay(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Decay', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNuRev1Size(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Size', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNuRev1Tone(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Tone', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNuRev1Width(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Width', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setNuRev1DryWetMix(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Dry/Wet Mix', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setZMasReturn1(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ZMas: Return1', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setZMasReturn2(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ZMas: Return2', value, timeInQuarterNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInQuarterNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve] A number from [-1, 1] (inclusive), which represents
   *    the curvature of the line formed by this point and the next point. Zero
   *    implies a linear change. Higher values create a curve that begins slowly
   *    and accelerates. Lower values create a curve that begins quickly, and
   *    decelerates.
   */
  setZMasMaster(value, timeInQuarterNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ZMas: Master', value, timeInQuarterNotes, curve);
  },
};
