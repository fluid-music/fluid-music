
const plugin = require('./plugin');
const fluid = { plugin };
module.exports = {
  type: 'VST2',
  name: 'Zebra2',
  /**
   * Select a `Zebra2` vst plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [nth] Optional index of the `Zebra2` instance.
   *    The selected track may have multiple plugins with the same name. Index
   *    from within those plugins. Most of the time this isn't needed, because
   *    it is unusual to have more than one plugin with a given name on a
   *    particular track.
   */
  select(nth) {
    return fluid.plugin.select('Zebra2', 'vst', nth);
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
  setMainOutput(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('main: Output', value, timeInWholeNotes, curve);
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
  setMainActiveLfog(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('main: Active #LFOG', value, timeInWholeNotes, curve);
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
  setMainActiveLfog2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('main: Active #LFOG2', value, timeInWholeNotes, curve);
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
  setPcoreX1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: X1', value, timeInWholeNotes, curve);
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
  setPcoreY1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Y1', value, timeInWholeNotes, curve);
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
  setPcoreX2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: X2', value, timeInWholeNotes, curve);
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
  setPcoreY2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Y2', value, timeInWholeNotes, curve);
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
  setPcoreX3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: X3', value, timeInWholeNotes, curve);
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
  setPcoreY3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Y3', value, timeInWholeNotes, curve);
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
  setPcoreX4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: X4', value, timeInWholeNotes, curve);
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
  setPcoreY4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Y4', value, timeInWholeNotes, curve);
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
  setPcoreMatrix1Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix1 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix1Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix1 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix1ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix1 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix1Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix1 Via', value, timeInWholeNotes, curve);
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
  setPcoreMatrix2Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix2 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix2Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix2 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix2ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix2 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix2Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix2 Via', value, timeInWholeNotes, curve);
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
  setPcoreMatrix3Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix3 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix3Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix3 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix3ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix3 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix3Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix3 Via', value, timeInWholeNotes, curve);
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
  setPcoreMatrix4Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix4 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix4Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix4 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix4ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix4 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix4Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix4 Via', value, timeInWholeNotes, curve);
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
  setLfogSync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFOG: Sync', value, timeInWholeNotes, curve);
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
  setLfogPhase(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFOG: Phase', value, timeInWholeNotes, curve);
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
  setLfog2Sync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFOG2: Sync', value, timeInWholeNotes, curve);
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
  setLfog2Phase(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFOG2: Phase', value, timeInWholeNotes, curve);
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
  setVccActiveLfo1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Active #LFO1', value, timeInWholeNotes, curve);
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
  setVccActiveLfo2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Active #LFO2', value, timeInWholeNotes, curve);
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
  setVccActiveLfo3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Active #LFO3', value, timeInWholeNotes, curve);
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
  setVccActiveLfo4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Active #LFO4', value, timeInWholeNotes, curve);
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
  setVccVoices(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Voices', value, timeInWholeNotes, curve);
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
  setVccVoicing(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Voicing', value, timeInWholeNotes, curve);
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
  setVccMode(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Mode', value, timeInWholeNotes, curve);
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
  setVccPortamento(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Portamento', value, timeInWholeNotes, curve);
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
  setVccTranspose(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Transpose', value, timeInWholeNotes, curve);
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
  setVccFineTuneCents(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: FineTuneCents', value, timeInWholeNotes, curve);
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
  setVccArpStepModA1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA1', value, timeInWholeNotes, curve);
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
  setVccArpStepModA2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA2', value, timeInWholeNotes, curve);
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
  setVccArpStepModA3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA3', value, timeInWholeNotes, curve);
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
  setVccArpStepModA4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA4', value, timeInWholeNotes, curve);
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
  setVccArpStepModA5(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA5', value, timeInWholeNotes, curve);
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
  setVccArpStepModA6(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA6', value, timeInWholeNotes, curve);
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
  setVccArpStepModA7(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA7', value, timeInWholeNotes, curve);
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
  setVccArpStepModA8(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA8', value, timeInWholeNotes, curve);
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
  setVccArpStepModA9(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA9', value, timeInWholeNotes, curve);
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
  setVccArpStepModA10(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA10', value, timeInWholeNotes, curve);
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
  setVccArpStepModA11(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA11', value, timeInWholeNotes, curve);
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
  setVccArpStepModA12(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA12', value, timeInWholeNotes, curve);
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
  setVccArpStepModA13(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA13', value, timeInWholeNotes, curve);
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
  setVccArpStepModA14(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA14', value, timeInWholeNotes, curve);
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
  setVccArpStepModA15(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA15', value, timeInWholeNotes, curve);
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
  setVccArpStepModA16(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step ModA16', value, timeInWholeNotes, curve);
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
  setEnv1Init(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Init', value, timeInWholeNotes, curve);
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
  setEnv1Attack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Attack', value, timeInWholeNotes, curve);
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
  setEnv1Decay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Decay', value, timeInWholeNotes, curve);
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
  setEnv1Sustain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Sustain', value, timeInWholeNotes, curve);
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
  setEnv1FallRise(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Fall/Rise', value, timeInWholeNotes, curve);
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
  setEnv1Sustain2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Sustain2', value, timeInWholeNotes, curve);
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
  setEnv1Release(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Release', value, timeInWholeNotes, curve);
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
  setEnv1Velocity(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Velocity', value, timeInWholeNotes, curve);
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
  setEnv1Slope(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV1: Slope', value, timeInWholeNotes, curve);
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
  setEnv2Init(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Init', value, timeInWholeNotes, curve);
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
  setEnv2Attack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Attack', value, timeInWholeNotes, curve);
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
  setEnv2Decay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Decay', value, timeInWholeNotes, curve);
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
  setEnv2Sustain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Sustain', value, timeInWholeNotes, curve);
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
  setEnv2FallRise(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Fall/Rise', value, timeInWholeNotes, curve);
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
  setEnv2Sustain2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Sustain2', value, timeInWholeNotes, curve);
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
  setEnv2Release(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Release', value, timeInWholeNotes, curve);
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
  setEnv2Velocity(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Velocity', value, timeInWholeNotes, curve);
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
  setEnv2Slope(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV2: Slope', value, timeInWholeNotes, curve);
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
  setEnv3Init(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Init', value, timeInWholeNotes, curve);
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
  setEnv3Attack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Attack', value, timeInWholeNotes, curve);
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
  setEnv3Decay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Decay', value, timeInWholeNotes, curve);
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
  setEnv3Sustain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Sustain', value, timeInWholeNotes, curve);
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
  setEnv3FallRise(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Fall/Rise', value, timeInWholeNotes, curve);
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
  setEnv3Sustain2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Sustain2', value, timeInWholeNotes, curve);
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
  setEnv3Release(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Release', value, timeInWholeNotes, curve);
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
  setEnv3Velocity(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Velocity', value, timeInWholeNotes, curve);
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
  setEnv3Slope(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV3: Slope', value, timeInWholeNotes, curve);
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
  setEnv4Init(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Init', value, timeInWholeNotes, curve);
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
  setEnv4Attack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Attack', value, timeInWholeNotes, curve);
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
  setEnv4Decay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Decay', value, timeInWholeNotes, curve);
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
  setEnv4Sustain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Sustain', value, timeInWholeNotes, curve);
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
  setEnv4FallRise(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Fall/Rise', value, timeInWholeNotes, curve);
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
  setEnv4Sustain2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Sustain2', value, timeInWholeNotes, curve);
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
  setEnv4Release(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Release', value, timeInWholeNotes, curve);
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
  setEnv4Velocity(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Velocity', value, timeInWholeNotes, curve);
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
  setEnv4Slope(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ENV4: Slope', value, timeInWholeNotes, curve);
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
  setMseg1Velocity(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG1: Velocity', value, timeInWholeNotes, curve);
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
  setMseg1Attack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG1: Attack', value, timeInWholeNotes, curve);
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
  setMseg1Loop(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG1: Loop', value, timeInWholeNotes, curve);
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
  setMseg1Release(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG1: Release', value, timeInWholeNotes, curve);
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
  setMseg2Velocity(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG2: Velocity', value, timeInWholeNotes, curve);
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
  setMseg2Attack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG2: Attack', value, timeInWholeNotes, curve);
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
  setMseg2Loop(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG2: Loop', value, timeInWholeNotes, curve);
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
  setMseg2Release(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG2: Release', value, timeInWholeNotes, curve);
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
  setMseg3Velocity(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG3: Velocity', value, timeInWholeNotes, curve);
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
  setMseg3Attack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG3: Attack', value, timeInWholeNotes, curve);
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
  setMseg3Loop(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG3: Loop', value, timeInWholeNotes, curve);
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
  setMseg3Release(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG3: Release', value, timeInWholeNotes, curve);
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
  setMseg4Velocity(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG4: Velocity', value, timeInWholeNotes, curve);
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
  setMseg4Attack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG4: Attack', value, timeInWholeNotes, curve);
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
  setMseg4Loop(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG4: Loop', value, timeInWholeNotes, curve);
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
  setMseg4Release(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MSEG4: Release', value, timeInWholeNotes, curve);
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
  setLfo1Sync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO1: Sync', value, timeInWholeNotes, curve);
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
  setLfo1Delay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO1: Delay', value, timeInWholeNotes, curve);
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
  setLfo2Sync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO2: Sync', value, timeInWholeNotes, curve);
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
  setLfo2Delay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO2: Delay', value, timeInWholeNotes, curve);
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
  setLfo3Sync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO3: Sync', value, timeInWholeNotes, curve);
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
  setLfo3Delay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO3: Delay', value, timeInWholeNotes, curve);
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
  setLfo4Sync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO4: Sync', value, timeInWholeNotes, curve);
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
  setLfo4Delay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO4: Delay', value, timeInWholeNotes, curve);
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
  setMmix1Constant(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MMix1: Constant', value, timeInWholeNotes, curve);
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
  setMmix2Constant(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MMix2: Constant', value, timeInWholeNotes, curve);
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
  setMmix3Constant(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MMix3: Constant', value, timeInWholeNotes, curve);
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
  setMmix4Constant(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('MMix4: Constant', value, timeInWholeNotes, curve);
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
  setOsc1Tune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Tune', value, timeInWholeNotes, curve);
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
  setOsc1TuneModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: TuneModSrc', value, timeInWholeNotes, curve);
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
  setOsc1TuneModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: TuneModDepth', value, timeInWholeNotes, curve);
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
  setOsc1Phase(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Phase', value, timeInWholeNotes, curve);
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
  setOsc1PhaseModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: PhaseModSrc', value, timeInWholeNotes, curve);
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
  setOsc1PhaseModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: PhaseModDepth', value, timeInWholeNotes, curve);
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
  setOsc1WaveWarp(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: WaveWarp', value, timeInWholeNotes, curve);
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
  setOsc1WarpModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: WarpModSrc', value, timeInWholeNotes, curve);
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
  setOsc1WarpModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: WarpModDepth', value, timeInWholeNotes, curve);
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
  setOsc1Vibrato(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Vibrato', value, timeInWholeNotes, curve);
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
  setOsc1SpectraFX1Val(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SpectraFX1 Val', value, timeInWholeNotes, curve);
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
  setOsc1Sfx1modsrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SFX1ModSrc', value, timeInWholeNotes, curve);
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
  setOsc1Sfx1moddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SFX1ModDepth', value, timeInWholeNotes, curve);
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
  setOsc1SpectraFX2Val(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SpectraFX2 Val', value, timeInWholeNotes, curve);
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
  setOsc1Sfx2modsrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SFX2ModSrc', value, timeInWholeNotes, curve);
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
  setOsc1Sfx2moddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SFX2ModDepth', value, timeInWholeNotes, curve);
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
  setOsc1Detune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Detune', value, timeInWholeNotes, curve);
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
  setOsc1Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Volume', value, timeInWholeNotes, curve);
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
  setOsc1VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setOsc1VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setOsc1Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Pan', value, timeInWholeNotes, curve);
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
  setOsc1PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: PanModSrc', value, timeInWholeNotes, curve);
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
  setOsc1PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: PanModDepth', value, timeInWholeNotes, curve);
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
  setOsc1SyncTune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SyncTune', value, timeInWholeNotes, curve);
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
  setOsc1SyncModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SyncModSrc', value, timeInWholeNotes, curve);
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
  setOsc1SyncModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: SyncModDepth', value, timeInWholeNotes, curve);
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
  setOsc1PolyWidth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Poly Width', value, timeInWholeNotes, curve);
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
  setOsc1Normalize(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Normalize', value, timeInWholeNotes, curve);
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
  setOsc2Tune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Tune', value, timeInWholeNotes, curve);
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
  setOsc2TuneModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: TuneModSrc', value, timeInWholeNotes, curve);
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
  setOsc2TuneModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: TuneModDepth', value, timeInWholeNotes, curve);
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
  setOsc2Phase(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Phase', value, timeInWholeNotes, curve);
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
  setOsc2PhaseModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: PhaseModSrc', value, timeInWholeNotes, curve);
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
  setOsc2PhaseModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: PhaseModDepth', value, timeInWholeNotes, curve);
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
  setOsc2WaveWarp(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: WaveWarp', value, timeInWholeNotes, curve);
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
  setOsc2WarpModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: WarpModSrc', value, timeInWholeNotes, curve);
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
  setOsc2WarpModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: WarpModDepth', value, timeInWholeNotes, curve);
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
  setOsc2Vibrato(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Vibrato', value, timeInWholeNotes, curve);
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
  setOsc2SpectraFX1Val(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SpectraFX1 Val', value, timeInWholeNotes, curve);
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
  setOsc2Sfx1modsrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SFX1ModSrc', value, timeInWholeNotes, curve);
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
  setOsc2Sfx1moddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SFX1ModDepth', value, timeInWholeNotes, curve);
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
  setOsc2SpectraFX2Val(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SpectraFX2 Val', value, timeInWholeNotes, curve);
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
  setOsc2Sfx2modsrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SFX2ModSrc', value, timeInWholeNotes, curve);
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
  setOsc2Sfx2moddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SFX2ModDepth', value, timeInWholeNotes, curve);
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
  setOsc2Detune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Detune', value, timeInWholeNotes, curve);
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
  setOsc2Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Volume', value, timeInWholeNotes, curve);
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
  setOsc2VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setOsc2VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setOsc2Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Pan', value, timeInWholeNotes, curve);
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
  setOsc2PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: PanModSrc', value, timeInWholeNotes, curve);
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
  setOsc2PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: PanModDepth', value, timeInWholeNotes, curve);
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
  setOsc2SyncTune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SyncTune', value, timeInWholeNotes, curve);
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
  setOsc2SyncModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SyncModSrc', value, timeInWholeNotes, curve);
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
  setOsc2SyncModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: SyncModDepth', value, timeInWholeNotes, curve);
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
  setOsc2PolyWidth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Poly Width', value, timeInWholeNotes, curve);
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
  setOsc2Normalize(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC2: Normalize', value, timeInWholeNotes, curve);
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
  setOsc3Tune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Tune', value, timeInWholeNotes, curve);
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
  setOsc3TuneModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: TuneModSrc', value, timeInWholeNotes, curve);
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
  setOsc3TuneModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: TuneModDepth', value, timeInWholeNotes, curve);
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
  setOsc3Phase(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Phase', value, timeInWholeNotes, curve);
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
  setOsc3PhaseModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: PhaseModSrc', value, timeInWholeNotes, curve);
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
  setOsc3PhaseModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: PhaseModDepth', value, timeInWholeNotes, curve);
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
  setOsc3WaveWarp(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: WaveWarp', value, timeInWholeNotes, curve);
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
  setOsc3WarpModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: WarpModSrc', value, timeInWholeNotes, curve);
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
  setOsc3WarpModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: WarpModDepth', value, timeInWholeNotes, curve);
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
  setOsc3Vibrato(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Vibrato', value, timeInWholeNotes, curve);
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
  setOsc3SpectraFX1Val(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SpectraFX1 Val', value, timeInWholeNotes, curve);
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
  setOsc3Sfx1modsrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SFX1ModSrc', value, timeInWholeNotes, curve);
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
  setOsc3Sfx1moddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SFX1ModDepth', value, timeInWholeNotes, curve);
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
  setOsc3SpectraFX2Val(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SpectraFX2 Val', value, timeInWholeNotes, curve);
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
  setOsc3Sfx2modsrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SFX2ModSrc', value, timeInWholeNotes, curve);
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
  setOsc3Sfx2moddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SFX2ModDepth', value, timeInWholeNotes, curve);
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
  setOsc3Detune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Detune', value, timeInWholeNotes, curve);
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
  setOsc3Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Volume', value, timeInWholeNotes, curve);
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
  setOsc3VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setOsc3VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setOsc3Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Pan', value, timeInWholeNotes, curve);
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
  setOsc3PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: PanModSrc', value, timeInWholeNotes, curve);
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
  setOsc3PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: PanModDepth', value, timeInWholeNotes, curve);
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
  setOsc3SyncTune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SyncTune', value, timeInWholeNotes, curve);
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
  setOsc3SyncModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SyncModSrc', value, timeInWholeNotes, curve);
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
  setOsc3SyncModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: SyncModDepth', value, timeInWholeNotes, curve);
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
  setOsc3PolyWidth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Poly Width', value, timeInWholeNotes, curve);
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
  setOsc3Normalize(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC3: Normalize', value, timeInWholeNotes, curve);
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
  setOsc4Tune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Tune', value, timeInWholeNotes, curve);
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
  setOsc4TuneModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: TuneModSrc', value, timeInWholeNotes, curve);
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
  setOsc4TuneModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: TuneModDepth', value, timeInWholeNotes, curve);
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
  setOsc4Phase(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Phase', value, timeInWholeNotes, curve);
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
  setOsc4PhaseModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: PhaseModSrc', value, timeInWholeNotes, curve);
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
  setOsc4PhaseModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: PhaseModDepth', value, timeInWholeNotes, curve);
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
  setOsc4WaveWarp(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: WaveWarp', value, timeInWholeNotes, curve);
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
  setOsc4WarpModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: WarpModSrc', value, timeInWholeNotes, curve);
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
  setOsc4WarpModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: WarpModDepth', value, timeInWholeNotes, curve);
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
  setOsc4Vibrato(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Vibrato', value, timeInWholeNotes, curve);
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
  setOsc4SpectraFX1Val(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SpectraFX1 Val', value, timeInWholeNotes, curve);
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
  setOsc4Sfx1modsrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SFX1ModSrc', value, timeInWholeNotes, curve);
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
  setOsc4Sfx1moddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SFX1ModDepth', value, timeInWholeNotes, curve);
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
  setOsc4SpectraFX2Val(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SpectraFX2 Val', value, timeInWholeNotes, curve);
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
  setOsc4Sfx2modsrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SFX2ModSrc', value, timeInWholeNotes, curve);
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
  setOsc4Sfx2moddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SFX2ModDepth', value, timeInWholeNotes, curve);
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
  setOsc4Detune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Detune', value, timeInWholeNotes, curve);
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
  setOsc4Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Volume', value, timeInWholeNotes, curve);
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
  setOsc4VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setOsc4VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setOsc4Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Pan', value, timeInWholeNotes, curve);
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
  setOsc4PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: PanModSrc', value, timeInWholeNotes, curve);
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
  setOsc4PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: PanModDepth', value, timeInWholeNotes, curve);
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
  setOsc4SyncTune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SyncTune', value, timeInWholeNotes, curve);
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
  setOsc4SyncModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SyncModSrc', value, timeInWholeNotes, curve);
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
  setOsc4SyncModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: SyncModDepth', value, timeInWholeNotes, curve);
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
  setOsc4PolyWidth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Poly Width', value, timeInWholeNotes, curve);
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
  setOsc4Normalize(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC4: Normalize', value, timeInWholeNotes, curve);
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
  setNoise1Filter1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: Filter1', value, timeInWholeNotes, curve);
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
  setNoise1F1ModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: F1 ModSrc', value, timeInWholeNotes, curve);
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
  setNoise1F1ModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: F1 ModDepth', value, timeInWholeNotes, curve);
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
  setNoise1Filter2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: Filter2', value, timeInWholeNotes, curve);
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
  setNoise1F2ModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: F2 ModSrc', value, timeInWholeNotes, curve);
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
  setNoise1F2ModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: F2 ModDepth', value, timeInWholeNotes, curve);
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
  setNoise1Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: Volume', value, timeInWholeNotes, curve);
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
  setNoise1VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setNoise1VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setNoise1Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: Pan', value, timeInWholeNotes, curve);
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
  setNoise1PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: PanModSrc', value, timeInWholeNotes, curve);
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
  setNoise1PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: PanModDepth', value, timeInWholeNotes, curve);
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
  setNoise1Width(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise1: Width', value, timeInWholeNotes, curve);
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
  setNoise2Filter1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: Filter1', value, timeInWholeNotes, curve);
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
  setNoise2F1ModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: F1 ModSrc', value, timeInWholeNotes, curve);
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
  setNoise2F1ModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: F1 ModDepth', value, timeInWholeNotes, curve);
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
  setNoise2Filter2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: Filter2', value, timeInWholeNotes, curve);
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
  setNoise2F2ModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: F2 ModSrc', value, timeInWholeNotes, curve);
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
  setNoise2F2ModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: F2 ModDepth', value, timeInWholeNotes, curve);
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
  setNoise2Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: Volume', value, timeInWholeNotes, curve);
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
  setNoise2VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setNoise2VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setNoise2Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: Pan', value, timeInWholeNotes, curve);
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
  setNoise2PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: PanModSrc', value, timeInWholeNotes, curve);
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
  setNoise2PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: PanModDepth', value, timeInWholeNotes, curve);
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
  setNoise2Width(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Noise2: Width', value, timeInWholeNotes, curve);
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
  setVcf1Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: Type', value, timeInWholeNotes, curve);
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
  setVcf1Cutoff(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: Cutoff', value, timeInWholeNotes, curve);
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
  setVcf1Resonance(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: Resonance', value, timeInWholeNotes, curve);
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
  setVcf1Drive(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: Drive', value, timeInWholeNotes, curve);
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
  setVcf1Gain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: Gain', value, timeInWholeNotes, curve);
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
  setVcf1ModDepth1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: ModDepth1', value, timeInWholeNotes, curve);
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
  setVcf1ModDepth2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: ModDepth2', value, timeInWholeNotes, curve);
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
  setVcf1KeyFollow(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF1: KeyFollow', value, timeInWholeNotes, curve);
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
  setVcf2Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: Type', value, timeInWholeNotes, curve);
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
  setVcf2Cutoff(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: Cutoff', value, timeInWholeNotes, curve);
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
  setVcf2Resonance(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: Resonance', value, timeInWholeNotes, curve);
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
  setVcf2Drive(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: Drive', value, timeInWholeNotes, curve);
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
  setVcf2Gain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: Gain', value, timeInWholeNotes, curve);
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
  setVcf2ModDepth1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: ModDepth1', value, timeInWholeNotes, curve);
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
  setVcf2ModDepth2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: ModDepth2', value, timeInWholeNotes, curve);
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
  setVcf2KeyFollow(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF2: KeyFollow', value, timeInWholeNotes, curve);
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
  setVcf3Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: Type', value, timeInWholeNotes, curve);
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
  setVcf3Cutoff(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: Cutoff', value, timeInWholeNotes, curve);
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
  setVcf3Resonance(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: Resonance', value, timeInWholeNotes, curve);
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
  setVcf3Drive(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: Drive', value, timeInWholeNotes, curve);
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
  setVcf3Gain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: Gain', value, timeInWholeNotes, curve);
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
  setVcf3ModDepth1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: ModDepth1', value, timeInWholeNotes, curve);
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
  setVcf3ModDepth2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: ModDepth2', value, timeInWholeNotes, curve);
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
  setVcf3KeyFollow(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF3: KeyFollow', value, timeInWholeNotes, curve);
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
  setVcf4Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: Type', value, timeInWholeNotes, curve);
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
  setVcf4Cutoff(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: Cutoff', value, timeInWholeNotes, curve);
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
  setVcf4Resonance(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: Resonance', value, timeInWholeNotes, curve);
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
  setVcf4Drive(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: Drive', value, timeInWholeNotes, curve);
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
  setVcf4Gain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: Gain', value, timeInWholeNotes, curve);
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
  setVcf4ModDepth1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: ModDepth1', value, timeInWholeNotes, curve);
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
  setVcf4ModDepth2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: ModDepth2', value, timeInWholeNotes, curve);
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
  setVcf4KeyFollow(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF4: KeyFollow', value, timeInWholeNotes, curve);
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
  setFmo1Tune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Tune', value, timeInWholeNotes, curve);
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
  setFmo1TuneModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: TuneModSrc', value, timeInWholeNotes, curve);
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
  setFmo1TuneModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: TuneModDepth', value, timeInWholeNotes, curve);
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
  setFmo1FmDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: FM Depth', value, timeInWholeNotes, curve);
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
  setFmo1FmModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: FM ModSrc', value, timeInWholeNotes, curve);
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
  setFmo1FmModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: FM ModDepth', value, timeInWholeNotes, curve);
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
  setFmo1Vibrato(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Vibrato', value, timeInWholeNotes, curve);
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
  setFmo1Detune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Detune', value, timeInWholeNotes, curve);
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
  setFmo1Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Volume', value, timeInWholeNotes, curve);
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
  setFmo1VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setFmo1VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setFmo1Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Pan', value, timeInWholeNotes, curve);
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
  setFmo1PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: PanModSrc', value, timeInWholeNotes, curve);
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
  setFmo1PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: PanModDepth', value, timeInWholeNotes, curve);
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
  setFmo1Width(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO1: Width', value, timeInWholeNotes, curve);
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
  setFmo2Tune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Tune', value, timeInWholeNotes, curve);
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
  setFmo2TuneModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: TuneModSrc', value, timeInWholeNotes, curve);
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
  setFmo2TuneModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: TuneModDepth', value, timeInWholeNotes, curve);
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
  setFmo2FmDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: FM Depth', value, timeInWholeNotes, curve);
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
  setFmo2FmModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: FM ModSrc', value, timeInWholeNotes, curve);
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
  setFmo2FmModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: FM ModDepth', value, timeInWholeNotes, curve);
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
  setFmo2Vibrato(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Vibrato', value, timeInWholeNotes, curve);
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
  setFmo2Detune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Detune', value, timeInWholeNotes, curve);
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
  setFmo2Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Volume', value, timeInWholeNotes, curve);
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
  setFmo2VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setFmo2VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setFmo2Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Pan', value, timeInWholeNotes, curve);
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
  setFmo2PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: PanModSrc', value, timeInWholeNotes, curve);
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
  setFmo2PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: PanModDepth', value, timeInWholeNotes, curve);
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
  setFmo2Width(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO2: Width', value, timeInWholeNotes, curve);
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
  setFmo3Tune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Tune', value, timeInWholeNotes, curve);
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
  setFmo3TuneModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: TuneModSrc', value, timeInWholeNotes, curve);
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
  setFmo3TuneModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: TuneModDepth', value, timeInWholeNotes, curve);
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
  setFmo3FmDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: FM Depth', value, timeInWholeNotes, curve);
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
  setFmo3FmModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: FM ModSrc', value, timeInWholeNotes, curve);
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
  setFmo3FmModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: FM ModDepth', value, timeInWholeNotes, curve);
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
  setFmo3Vibrato(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Vibrato', value, timeInWholeNotes, curve);
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
  setFmo3Detune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Detune', value, timeInWholeNotes, curve);
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
  setFmo3Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Volume', value, timeInWholeNotes, curve);
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
  setFmo3VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setFmo3VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setFmo3Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Pan', value, timeInWholeNotes, curve);
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
  setFmo3PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: PanModSrc', value, timeInWholeNotes, curve);
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
  setFmo3PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: PanModDepth', value, timeInWholeNotes, curve);
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
  setFmo3Width(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO3: Width', value, timeInWholeNotes, curve);
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
  setFmo4Tune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Tune', value, timeInWholeNotes, curve);
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
  setFmo4TuneModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: TuneModSrc', value, timeInWholeNotes, curve);
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
  setFmo4TuneModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: TuneModDepth', value, timeInWholeNotes, curve);
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
  setFmo4FmDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: FM Depth', value, timeInWholeNotes, curve);
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
  setFmo4FmModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: FM ModSrc', value, timeInWholeNotes, curve);
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
  setFmo4FmModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: FM ModDepth', value, timeInWholeNotes, curve);
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
  setFmo4Vibrato(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Vibrato', value, timeInWholeNotes, curve);
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
  setFmo4Detune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Detune', value, timeInWholeNotes, curve);
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
  setFmo4Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Volume', value, timeInWholeNotes, curve);
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
  setFmo4VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setFmo4VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setFmo4Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Pan', value, timeInWholeNotes, curve);
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
  setFmo4PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: PanModSrc', value, timeInWholeNotes, curve);
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
  setFmo4PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: PanModDepth', value, timeInWholeNotes, curve);
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
  setFmo4Width(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('FMO4: Width', value, timeInWholeNotes, curve);
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
  setComb1Tune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Tune', value, timeInWholeNotes, curve);
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
  setComb1KeyScale(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: key scale', value, timeInWholeNotes, curve);
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
  setComb1TuneModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: TuneModDepth', value, timeInWholeNotes, curve);
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
  setComb1Detune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Detune', value, timeInWholeNotes, curve);
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
  setComb1Vibrato(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Vibrato', value, timeInWholeNotes, curve);
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
  setComb1Feedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Feedback', value, timeInWholeNotes, curve);
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
  setComb1Fbmoddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: FBModDepth', value, timeInWholeNotes, curve);
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
  setComb1Damp(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Damp', value, timeInWholeNotes, curve);
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
  setComb1DampModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: DampModDepth', value, timeInWholeNotes, curve);
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
  setComb1PreFill(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: PreFill', value, timeInWholeNotes, curve);
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
  setComb1Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Input', value, timeInWholeNotes, curve);
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
  setComb1InputMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: InputMod', value, timeInWholeNotes, curve);
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
  setComb1Tone(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Tone', value, timeInWholeNotes, curve);
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
  setComb1ToneMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: ToneMod', value, timeInWholeNotes, curve);
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
  setComb1Flavour(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Flavour', value, timeInWholeNotes, curve);
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
  setComb1FlavourMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: FlavourMod', value, timeInWholeNotes, curve);
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
  setComb1Distortion(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Distortion', value, timeInWholeNotes, curve);
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
  setComb1Dry(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Dry', value, timeInWholeNotes, curve);
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
  setComb1Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Volume', value, timeInWholeNotes, curve);
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
  setComb1VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setComb1VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setComb1Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Pan', value, timeInWholeNotes, curve);
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
  setComb1PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: PanModSrc', value, timeInWholeNotes, curve);
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
  setComb1PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: PanModDepth', value, timeInWholeNotes, curve);
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
  setComb1Width(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb1: Width', value, timeInWholeNotes, curve);
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
  setComb2Tune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Tune', value, timeInWholeNotes, curve);
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
  setComb2KeyScale(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: key scale', value, timeInWholeNotes, curve);
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
  setComb2TuneModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: TuneModDepth', value, timeInWholeNotes, curve);
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
  setComb2Detune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Detune', value, timeInWholeNotes, curve);
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
  setComb2Vibrato(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Vibrato', value, timeInWholeNotes, curve);
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
  setComb2Feedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Feedback', value, timeInWholeNotes, curve);
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
  setComb2Fbmoddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: FBModDepth', value, timeInWholeNotes, curve);
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
  setComb2Damp(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Damp', value, timeInWholeNotes, curve);
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
  setComb2DampModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: DampModDepth', value, timeInWholeNotes, curve);
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
  setComb2PreFill(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: PreFill', value, timeInWholeNotes, curve);
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
  setComb2Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Input', value, timeInWholeNotes, curve);
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
  setComb2InputMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: InputMod', value, timeInWholeNotes, curve);
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
  setComb2Tone(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Tone', value, timeInWholeNotes, curve);
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
  setComb2ToneMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: ToneMod', value, timeInWholeNotes, curve);
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
  setComb2Flavour(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Flavour', value, timeInWholeNotes, curve);
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
  setComb2FlavourMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: FlavourMod', value, timeInWholeNotes, curve);
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
  setComb2Distortion(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Distortion', value, timeInWholeNotes, curve);
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
  setComb2Dry(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Dry', value, timeInWholeNotes, curve);
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
  setComb2Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Volume', value, timeInWholeNotes, curve);
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
  setComb2VolumeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: VolumeModSrc', value, timeInWholeNotes, curve);
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
  setComb2VolumeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: VolumeModDepth', value, timeInWholeNotes, curve);
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
  setComb2Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Pan', value, timeInWholeNotes, curve);
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
  setComb2PanModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: PanModSrc', value, timeInWholeNotes, curve);
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
  setComb2PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: PanModDepth', value, timeInWholeNotes, curve);
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
  setComb2Width(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comb2: Width', value, timeInWholeNotes, curve);
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
  setShape1Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Depth', value, timeInWholeNotes, curve);
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
  setShape1DModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: D_ModSrc', value, timeInWholeNotes, curve);
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
  setShape1DModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: D_ModDepth', value, timeInWholeNotes, curve);
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
  setShape1Edge(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Edge', value, timeInWholeNotes, curve);
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
  setShape1EdgeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Edge ModSrc', value, timeInWholeNotes, curve);
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
  setShape1EdgeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Edge ModDepth', value, timeInWholeNotes, curve);
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
  setShape1Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Input', value, timeInWholeNotes, curve);
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
  setShape1Output(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: Output', value, timeInWholeNotes, curve);
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
  setShape1HiOut(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape1: HiOut', value, timeInWholeNotes, curve);
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
  setShape2Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Depth', value, timeInWholeNotes, curve);
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
  setShape2DModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: D_ModSrc', value, timeInWholeNotes, curve);
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
  setShape2DModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: D_ModDepth', value, timeInWholeNotes, curve);
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
  setShape2Edge(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Edge', value, timeInWholeNotes, curve);
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
  setShape2EdgeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Edge ModSrc', value, timeInWholeNotes, curve);
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
  setShape2EdgeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Edge ModDepth', value, timeInWholeNotes, curve);
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
  setShape2Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Input', value, timeInWholeNotes, curve);
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
  setShape2Output(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: Output', value, timeInWholeNotes, curve);
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
  setShape2HiOut(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape2: HiOut', value, timeInWholeNotes, curve);
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
  setMix1Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix1: Pan', value, timeInWholeNotes, curve);
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
  setMix1Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix1: Mix', value, timeInWholeNotes, curve);
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
  setMix1PanMode(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix1: Pan Mode', value, timeInWholeNotes, curve);
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
  setMix1PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix1: PanMod Depth', value, timeInWholeNotes, curve);
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
  setMix1PanModSource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix1: PanMod Source', value, timeInWholeNotes, curve);
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
  setMix2Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix2: Pan', value, timeInWholeNotes, curve);
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
  setMix2Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix2: Mix', value, timeInWholeNotes, curve);
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
  setMix2PanMode(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix2: Pan Mode', value, timeInWholeNotes, curve);
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
  setMix2PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix2: PanMod Depth', value, timeInWholeNotes, curve);
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
  setMix2PanModSource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix2: PanMod Source', value, timeInWholeNotes, curve);
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
  setMix3Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix3: Pan', value, timeInWholeNotes, curve);
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
  setMix3Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix3: Mix', value, timeInWholeNotes, curve);
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
  setMix3PanMode(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix3: Pan Mode', value, timeInWholeNotes, curve);
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
  setMix3PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix3: PanMod Depth', value, timeInWholeNotes, curve);
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
  setMix3PanModSource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix3: PanMod Source', value, timeInWholeNotes, curve);
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
  setMix4Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix4: Pan', value, timeInWholeNotes, curve);
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
  setMix4Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix4: Mix', value, timeInWholeNotes, curve);
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
  setMix4PanMode(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix4: Pan Mode', value, timeInWholeNotes, curve);
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
  setMix4PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix4: PanMod Depth', value, timeInWholeNotes, curve);
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
  setMix4PanModSource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix4: PanMod Source', value, timeInWholeNotes, curve);
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
  setXmf1Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Type', value, timeInWholeNotes, curve);
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
  setXmf1Cutoff(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Cutoff', value, timeInWholeNotes, curve);
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
  setXmf1Resonance(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Resonance', value, timeInWholeNotes, curve);
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
  setXmf1FreqMod1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Freq mod 1', value, timeInWholeNotes, curve);
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
  setXmf1FreqMod2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Freq mod 2', value, timeInWholeNotes, curve);
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
  setXmf1KeyFollow(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: KeyFollow', value, timeInWholeNotes, curve);
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
  setXmf1FreqOffset(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: FreqOffset', value, timeInWholeNotes, curve);
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
  setXmf1FreqOffMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: FreqOffMod', value, timeInWholeNotes, curve);
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
  setXmf1FilterFM(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: FilterFM', value, timeInWholeNotes, curve);
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
  setXmf1Xfmmod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: XFMmod', value, timeInWholeNotes, curve);
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
  setXmf1Overload(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Overload', value, timeInWholeNotes, curve);
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
  setXmf1Click(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF1: Click', value, timeInWholeNotes, curve);
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
  setXmf2Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Type', value, timeInWholeNotes, curve);
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
  setXmf2Cutoff(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Cutoff', value, timeInWholeNotes, curve);
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
  setXmf2Resonance(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Resonance', value, timeInWholeNotes, curve);
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
  setXmf2FreqMod1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Freq mod 1', value, timeInWholeNotes, curve);
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
  setXmf2FreqMod2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Freq mod 2', value, timeInWholeNotes, curve);
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
  setXmf2KeyFollow(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: KeyFollow', value, timeInWholeNotes, curve);
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
  setXmf2FreqOffset(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: FreqOffset', value, timeInWholeNotes, curve);
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
  setXmf2FreqOffMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: FreqOffMod', value, timeInWholeNotes, curve);
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
  setXmf2FilterFM(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: FilterFM', value, timeInWholeNotes, curve);
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
  setXmf2Xfmmod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: XFMmod', value, timeInWholeNotes, curve);
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
  setXmf2Overload(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Overload', value, timeInWholeNotes, curve);
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
  setXmf2Click(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF2: Click', value, timeInWholeNotes, curve);
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
  setModFX1Center(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Center', value, timeInWholeNotes, curve);
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
  setModFX1Speed(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Speed', value, timeInWholeNotes, curve);
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
  setModFX1Stereo(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Stereo', value, timeInWholeNotes, curve);
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
  setModFX1Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Depth', value, timeInWholeNotes, curve);
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
  setModFX1Feedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Feedback', value, timeInWholeNotes, curve);
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
  setModFX1Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Mix', value, timeInWholeNotes, curve);
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
  setModFX1LowCutFreq(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: LowCut Freq', value, timeInWholeNotes, curve);
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
  setModFX1HiCutFreq(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: HiCut Freq', value, timeInWholeNotes, curve);
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
  setModFX1Quad(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Quad', value, timeInWholeNotes, curve);
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
  setModFX1QuadPhase(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: QuadPhase', value, timeInWholeNotes, curve);
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
  setModFX1LowBoostDb(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: Low Boost dB', value, timeInWholeNotes, curve);
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
  setModFX1HighBoostDb(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX1: High Boost dB', value, timeInWholeNotes, curve);
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
  setModFX2Center(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Center', value, timeInWholeNotes, curve);
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
  setModFX2Speed(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Speed', value, timeInWholeNotes, curve);
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
  setModFX2Stereo(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Stereo', value, timeInWholeNotes, curve);
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
  setModFX2Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Depth', value, timeInWholeNotes, curve);
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
  setModFX2Feedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Feedback', value, timeInWholeNotes, curve);
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
  setModFX2Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Mix', value, timeInWholeNotes, curve);
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
  setModFX2LowCutFreq(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: LowCut Freq', value, timeInWholeNotes, curve);
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
  setModFX2HiCutFreq(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: HiCut Freq', value, timeInWholeNotes, curve);
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
  setModFX2Quad(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Quad', value, timeInWholeNotes, curve);
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
  setModFX2QuadPhase(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: QuadPhase', value, timeInWholeNotes, curve);
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
  setModFX2LowBoostDb(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: Low Boost dB', value, timeInWholeNotes, curve);
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
  setModFX2HighBoostDb(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ModFX2: High Boost dB', value, timeInWholeNotes, curve);
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
  setDelay1Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay1: Mix', value, timeInWholeNotes, curve);
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
  setDelay1Feedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay1: Feedback', value, timeInWholeNotes, curve);
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
  setDelay1XBack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay1: X-back', value, timeInWholeNotes, curve);
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
  setDelay1Lowpass(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay1: Lowpass', value, timeInWholeNotes, curve);
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
  setDelay1Hipass(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay1: Hipass', value, timeInWholeNotes, curve);
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
  setDelay2Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay2: Mix', value, timeInWholeNotes, curve);
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
  setDelay2Feedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay2: Feedback', value, timeInWholeNotes, curve);
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
  setDelay2XBack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay2: X-back', value, timeInWholeNotes, curve);
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
  setDelay2Lowpass(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay2: Lowpass', value, timeInWholeNotes, curve);
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
  setDelay2Hipass(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Delay2: Hipass', value, timeInWholeNotes, curve);
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
  setShape3Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Depth', value, timeInWholeNotes, curve);
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
  setShape3DModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: D_ModSrc', value, timeInWholeNotes, curve);
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
  setShape3DModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: D_ModDepth', value, timeInWholeNotes, curve);
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
  setShape3Edge(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Edge', value, timeInWholeNotes, curve);
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
  setShape3EdgeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Edge ModSrc', value, timeInWholeNotes, curve);
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
  setShape3EdgeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Edge ModDepth', value, timeInWholeNotes, curve);
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
  setShape3Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Input', value, timeInWholeNotes, curve);
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
  setShape3Output(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: Output', value, timeInWholeNotes, curve);
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
  setShape3HiOut(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape3: HiOut', value, timeInWholeNotes, curve);
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
  setShape4Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Depth', value, timeInWholeNotes, curve);
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
  setShape4DModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: D_ModSrc', value, timeInWholeNotes, curve);
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
  setShape4DModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: D_ModDepth', value, timeInWholeNotes, curve);
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
  setShape4Edge(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Edge', value, timeInWholeNotes, curve);
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
  setShape4EdgeModSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Edge ModSrc', value, timeInWholeNotes, curve);
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
  setShape4EdgeModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Edge ModDepth', value, timeInWholeNotes, curve);
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
  setShape4Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Input', value, timeInWholeNotes, curve);
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
  setShape4Output(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: Output', value, timeInWholeNotes, curve);
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
  setShape4HiOut(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Shape4: HiOut', value, timeInWholeNotes, curve);
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
  setMix5Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix5: Pan', value, timeInWholeNotes, curve);
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
  setMix5Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix5: Mix', value, timeInWholeNotes, curve);
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
  setMix5PanMode(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix5: Pan Mode', value, timeInWholeNotes, curve);
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
  setMix5PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix5: PanMod Depth', value, timeInWholeNotes, curve);
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
  setMix5PanModSource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix5: PanMod Source', value, timeInWholeNotes, curve);
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
  setMix6Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix6: Pan', value, timeInWholeNotes, curve);
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
  setMix6Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix6: Mix', value, timeInWholeNotes, curve);
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
  setMix6PanMode(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix6: Pan Mode', value, timeInWholeNotes, curve);
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
  setMix6PanModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix6: PanMod Depth', value, timeInWholeNotes, curve);
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
  setMix6PanModSource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Mix6: PanMod Source', value, timeInWholeNotes, curve);
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
  setRev1Dry(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Dry', value, timeInWholeNotes, curve);
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
  setRev1Wet(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Wet', value, timeInWholeNotes, curve);
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
  setRev1Feedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Feedback', value, timeInWholeNotes, curve);
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
  setRev1Damp(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Damp', value, timeInWholeNotes, curve);
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
  setRev1Range(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Range', value, timeInWholeNotes, curve);
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
  setRev1Speed(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Speed', value, timeInWholeNotes, curve);
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
  setRev1Modulation(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Modulation', value, timeInWholeNotes, curve);
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
  setRev1DiffFeedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Diff Feedback', value, timeInWholeNotes, curve);
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
  setRev1DiffRange(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Diff Range', value, timeInWholeNotes, curve);
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
  setRev1DiffMix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Diff Mix', value, timeInWholeNotes, curve);
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
  setRev1DiffMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Diff Mod', value, timeInWholeNotes, curve);
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
  setRev1DiffSpeed(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Rev1: Diff Speed', value, timeInWholeNotes, curve);
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
  setComp1Compression(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Compression', value, timeInWholeNotes, curve);
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
  setComp1Threshold(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Threshold', value, timeInWholeNotes, curve);
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
  setComp1Attack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Attack', value, timeInWholeNotes, curve);
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
  setComp1Release(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Release', value, timeInWholeNotes, curve);
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
  setComp1Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Input', value, timeInWholeNotes, curve);
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
  setComp1Output(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp1: Output', value, timeInWholeNotes, curve);
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
  setComp2Compression(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Compression', value, timeInWholeNotes, curve);
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
  setComp2Threshold(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Threshold', value, timeInWholeNotes, curve);
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
  setComp2Attack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Attack', value, timeInWholeNotes, curve);
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
  setComp2Release(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Release', value, timeInWholeNotes, curve);
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
  setComp2Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Input', value, timeInWholeNotes, curve);
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
  setComp2Output(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Comp2: Output', value, timeInWholeNotes, curve);
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
  setEq1FreqLowShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Freq LowShelf', value, timeInWholeNotes, curve);
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
  setEq1QLowShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Q LowShelf', value, timeInWholeNotes, curve);
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
  setEq1GainLowShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Gain LowShelf', value, timeInWholeNotes, curve);
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
  setEq1FreqMid1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Freq Mid1', value, timeInWholeNotes, curve);
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
  setEq1QMid1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Q Mid1', value, timeInWholeNotes, curve);
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
  setEq1GainMid1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Gain Mid1', value, timeInWholeNotes, curve);
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
  setEq1FreqMid2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Freq Mid2', value, timeInWholeNotes, curve);
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
  setEq1QMid2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Q Mid2', value, timeInWholeNotes, curve);
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
  setEq1GainMid2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Gain Mid2', value, timeInWholeNotes, curve);
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
  setEq1FreqHiShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Freq HiShelf', value, timeInWholeNotes, curve);
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
  setEq1QHiShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Q HiShelf', value, timeInWholeNotes, curve);
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
  setEq1GainHiShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ1: Gain HiShelf', value, timeInWholeNotes, curve);
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
  setEq2FreqLowShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Freq LowShelf', value, timeInWholeNotes, curve);
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
  setEq2QLowShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Q LowShelf', value, timeInWholeNotes, curve);
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
  setEq2GainLowShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Gain LowShelf', value, timeInWholeNotes, curve);
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
  setEq2FreqMid1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Freq Mid1', value, timeInWholeNotes, curve);
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
  setEq2QMid1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Q Mid1', value, timeInWholeNotes, curve);
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
  setEq2GainMid1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Gain Mid1', value, timeInWholeNotes, curve);
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
  setEq2FreqMid2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Freq Mid2', value, timeInWholeNotes, curve);
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
  setEq2QMid2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Q Mid2', value, timeInWholeNotes, curve);
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
  setEq2GainMid2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Gain Mid2', value, timeInWholeNotes, curve);
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
  setEq2FreqHiShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Freq HiShelf', value, timeInWholeNotes, curve);
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
  setEq2QHiShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Q HiShelf', value, timeInWholeNotes, curve);
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
  setEq2GainHiShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('EQ2: Gain HiShelf', value, timeInWholeNotes, curve);
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
  setVcf5Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: Type', value, timeInWholeNotes, curve);
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
  setVcf5Cutoff(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: Cutoff', value, timeInWholeNotes, curve);
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
  setVcf5Resonance(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: Resonance', value, timeInWholeNotes, curve);
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
  setVcf5Drive(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: Drive', value, timeInWholeNotes, curve);
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
  setVcf5Gain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: Gain', value, timeInWholeNotes, curve);
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
  setVcf5ModDepth1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: ModDepth1', value, timeInWholeNotes, curve);
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
  setVcf5ModDepth2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: ModDepth2', value, timeInWholeNotes, curve);
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
  setVcf5KeyFollow(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF5: KeyFollow', value, timeInWholeNotes, curve);
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
  setVcf6Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: Type', value, timeInWholeNotes, curve);
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
  setVcf6Cutoff(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: Cutoff', value, timeInWholeNotes, curve);
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
  setVcf6Resonance(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: Resonance', value, timeInWholeNotes, curve);
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
  setVcf6Drive(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: Drive', value, timeInWholeNotes, curve);
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
  setVcf6Gain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: Gain', value, timeInWholeNotes, curve);
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
  setVcf6ModDepth1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: ModDepth1', value, timeInWholeNotes, curve);
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
  setVcf6ModDepth2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: ModDepth2', value, timeInWholeNotes, curve);
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
  setVcf6KeyFollow(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF6: KeyFollow', value, timeInWholeNotes, curve);
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
  setSb1Frequency(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: Frequency', value, timeInWholeNotes, curve);
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
  setSb1Fmodsource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: FModSource', value, timeInWholeNotes, curve);
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
  setSb1Fmoddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: FModDepth', value, timeInWholeNotes, curve);
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
  setSb1Offset(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: Offset', value, timeInWholeNotes, curve);
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
  setSb1Omodsource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: OModSource', value, timeInWholeNotes, curve);
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
  setSb1Omoddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: OModDepth', value, timeInWholeNotes, curve);
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
  setSb1Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: Mix', value, timeInWholeNotes, curve);
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
  setSb1Mmodsource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: MModSource', value, timeInWholeNotes, curve);
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
  setSb1Mmoddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB1: MModDepth', value, timeInWholeNotes, curve);
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
  setSb2Frequency(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: Frequency', value, timeInWholeNotes, curve);
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
  setSb2Fmodsource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: FModSource', value, timeInWholeNotes, curve);
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
  setSb2Fmoddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: FModDepth', value, timeInWholeNotes, curve);
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
  setSb2Offset(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: Offset', value, timeInWholeNotes, curve);
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
  setSb2Omodsource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: OModSource', value, timeInWholeNotes, curve);
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
  setSb2Omoddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: OModDepth', value, timeInWholeNotes, curve);
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
  setSb2Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: Mix', value, timeInWholeNotes, curve);
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
  setSb2Mmodsource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: MModSource', value, timeInWholeNotes, curve);
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
  setSb2Mmoddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB2: MModDepth', value, timeInWholeNotes, curve);
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
  setSb3Frequency(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: Frequency', value, timeInWholeNotes, curve);
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
  setSb3Fmodsource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: FModSource', value, timeInWholeNotes, curve);
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
  setSb3Fmoddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: FModDepth', value, timeInWholeNotes, curve);
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
  setSb3Offset(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: Offset', value, timeInWholeNotes, curve);
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
  setSb3Omodsource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: OModSource', value, timeInWholeNotes, curve);
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
  setSb3Omoddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: OModDepth', value, timeInWholeNotes, curve);
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
  setSb3Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: Mix', value, timeInWholeNotes, curve);
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
  setSb3Mmodsource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: MModSource', value, timeInWholeNotes, curve);
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
  setSb3Mmoddepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('SB3: MModDepth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix5Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix5 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix5Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix5 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix5ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix5 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix5Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix5 Via', value, timeInWholeNotes, curve);
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
  setPcoreMatrix6Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix6 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix6Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix6 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix6ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix6 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix6Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix6 Via', value, timeInWholeNotes, curve);
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
  setPcoreMatrix7Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix7 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix7Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix7 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix7ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix7 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix7Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix7 Via', value, timeInWholeNotes, curve);
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
  setPcoreMatrix8Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix8 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix8Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix8 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix8ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix8 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix8Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix8 Via', value, timeInWholeNotes, curve);
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
  setPcoreMatrix9Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix9 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix9Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix9 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix9ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix9 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix9Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix9 Via', value, timeInWholeNotes, curve);
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
  setPcoreMatrix10Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix10 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix10Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix10 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix10ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix10 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix10Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix10 Via', value, timeInWholeNotes, curve);
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
  setPcoreMatrix11Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix11 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix11Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix11 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix11ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix11 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix11Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix11 Via', value, timeInWholeNotes, curve);
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
  setPcoreMatrix12Source(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix12 Source', value, timeInWholeNotes, curve);
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
  setPcoreMatrix12Depth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix12 Depth', value, timeInWholeNotes, curve);
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
  setPcoreMatrix12ViaSrc(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix12 ViaSrc', value, timeInWholeNotes, curve);
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
  setPcoreMatrix12Via(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('PCore: Matrix12 Via', value, timeInWholeNotes, curve);
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
  setXmf3Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Type', value, timeInWholeNotes, curve);
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
  setXmf3Cutoff(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Cutoff', value, timeInWholeNotes, curve);
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
  setXmf3Resonance(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Resonance', value, timeInWholeNotes, curve);
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
  setXmf3FreqMod1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Freq mod 1', value, timeInWholeNotes, curve);
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
  setXmf3FreqMod2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Freq mod 2', value, timeInWholeNotes, curve);
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
  setXmf3KeyFollow(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: KeyFollow', value, timeInWholeNotes, curve);
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
  setXmf3FreqOffset(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: FreqOffset', value, timeInWholeNotes, curve);
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
  setXmf3FreqOffMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: FreqOffMod', value, timeInWholeNotes, curve);
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
  setXmf3FilterFM(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: FilterFM', value, timeInWholeNotes, curve);
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
  setXmf3Xfmmod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: XFMmod', value, timeInWholeNotes, curve);
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
  setXmf3Overload(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Overload', value, timeInWholeNotes, curve);
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
  setXmf3Click(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('XMF3: Click', value, timeInWholeNotes, curve);
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
  setDist1Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Type', value, timeInWholeNotes, curve);
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
  setDist1Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Input', value, timeInWholeNotes, curve);
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
  setDist1Output(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Output', value, timeInWholeNotes, curve);
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
  setDist1PreTilt(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Pre Tilt', value, timeInWholeNotes, curve);
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
  setDist1PostTilt(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Post Tilt', value, timeInWholeNotes, curve);
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
  setDist1CenterFreq(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Center Freq', value, timeInWholeNotes, curve);
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
  setDist1Low(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Low', value, timeInWholeNotes, curve);
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
  setDist1High(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: High', value, timeInWholeNotes, curve);
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
  setDist1PostFilter(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist1: Post Filter', value, timeInWholeNotes, curve);
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
  setDist2Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Type', value, timeInWholeNotes, curve);
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
  setDist2Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Input', value, timeInWholeNotes, curve);
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
  setDist2Output(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Output', value, timeInWholeNotes, curve);
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
  setDist2PreTilt(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Pre Tilt', value, timeInWholeNotes, curve);
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
  setDist2PostTilt(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Post Tilt', value, timeInWholeNotes, curve);
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
  setDist2CenterFreq(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Center Freq', value, timeInWholeNotes, curve);
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
  setDist2Low(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Low', value, timeInWholeNotes, curve);
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
  setDist2High(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: High', value, timeInWholeNotes, curve);
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
  setDist2PostFilter(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist2: Post Filter', value, timeInWholeNotes, curve);
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
  setDist3Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Type', value, timeInWholeNotes, curve);
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
  setDist3Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Input', value, timeInWholeNotes, curve);
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
  setDist3Output(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Output', value, timeInWholeNotes, curve);
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
  setDist3PreTilt(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Pre Tilt', value, timeInWholeNotes, curve);
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
  setDist3PostTilt(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Post Tilt', value, timeInWholeNotes, curve);
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
  setDist3CenterFreq(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Center Freq', value, timeInWholeNotes, curve);
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
  setDist3Low(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Low', value, timeInWholeNotes, curve);
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
  setDist3High(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: High', value, timeInWholeNotes, curve);
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
  setDist3PostFilter(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist3: Post Filter', value, timeInWholeNotes, curve);
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
  setDist4Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Type', value, timeInWholeNotes, curve);
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
  setDist4Input(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Input', value, timeInWholeNotes, curve);
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
  setDist4Output(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Output', value, timeInWholeNotes, curve);
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
  setDist4PreTilt(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Pre Tilt', value, timeInWholeNotes, curve);
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
  setDist4PostTilt(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Post Tilt', value, timeInWholeNotes, curve);
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
  setDist4CenterFreq(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Center Freq', value, timeInWholeNotes, curve);
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
  setDist4Low(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Low', value, timeInWholeNotes, curve);
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
  setDist4High(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: High', value, timeInWholeNotes, curve);
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
  setDist4PostFilter(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dist4: Post Filter', value, timeInWholeNotes, curve);
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
  setFold1Ripples(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Ripples', value, timeInWholeNotes, curve);
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
  setFold1Folds(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Folds', value, timeInWholeNotes, curve);
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
  setFold1FoldMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Fold Mod', value, timeInWholeNotes, curve);
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
  setFold1FoldModSource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Fold ModSource', value, timeInWholeNotes, curve);
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
  setFold1Bias(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Bias', value, timeInWholeNotes, curve);
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
  setFold1BiasMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Bias Mod', value, timeInWholeNotes, curve);
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
  setFold1BiasModSource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Bias ModSource', value, timeInWholeNotes, curve);
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
  setFold1FoldRatio(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: FoldRatio', value, timeInWholeNotes, curve);
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
  setFold1FoldSlope(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: FoldSlope', value, timeInWholeNotes, curve);
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
  setFold1ClipAngle(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold1: Clip Angle', value, timeInWholeNotes, curve);
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
  setFold2Ripples(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Ripples', value, timeInWholeNotes, curve);
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
  setFold2Folds(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Folds', value, timeInWholeNotes, curve);
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
  setFold2FoldMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Fold Mod', value, timeInWholeNotes, curve);
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
  setFold2FoldModSource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Fold ModSource', value, timeInWholeNotes, curve);
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
  setFold2Bias(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Bias', value, timeInWholeNotes, curve);
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
  setFold2BiasMod(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Bias Mod', value, timeInWholeNotes, curve);
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
  setFold2BiasModSource(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Bias ModSource', value, timeInWholeNotes, curve);
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
  setFold2FoldRatio(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: FoldRatio', value, timeInWholeNotes, curve);
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
  setFold2FoldSlope(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: FoldSlope', value, timeInWholeNotes, curve);
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
  setFold2ClipAngle(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Fold2: Clip Angle', value, timeInWholeNotes, curve);
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
  setVca1Pan1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan1', value, timeInWholeNotes, curve);
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
  setVca1PanModSrc1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Src1', value, timeInWholeNotes, curve);
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
  setVca1PanModDpt1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Dpt1', value, timeInWholeNotes, curve);
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
  setVca1Volume1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Volume1', value, timeInWholeNotes, curve);
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
  setVca1Vca1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: VCA1', value, timeInWholeNotes, curve);
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
  setVca1Modulation1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Modulation1', value, timeInWholeNotes, curve);
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
  setVca1ModDepth1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mod Depth1', value, timeInWholeNotes, curve);
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
  setVca1Pan2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan2', value, timeInWholeNotes, curve);
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
  setVca1PanModSrc2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Src2', value, timeInWholeNotes, curve);
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
  setVca1PanModDpt2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Dpt2', value, timeInWholeNotes, curve);
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
  setVca1Volume2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Volume2', value, timeInWholeNotes, curve);
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
  setVca1Vca2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: VCA2', value, timeInWholeNotes, curve);
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
  setVca1Modulation2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Modulation2', value, timeInWholeNotes, curve);
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
  setVca1ModDepth2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mod Depth2', value, timeInWholeNotes, curve);
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
  setVca1Pan3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan3', value, timeInWholeNotes, curve);
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
  setVca1PanModSrc3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Src3', value, timeInWholeNotes, curve);
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
  setVca1PanModDpt3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Dpt3', value, timeInWholeNotes, curve);
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
  setVca1Volume3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Volume3', value, timeInWholeNotes, curve);
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
  setVca1Vca3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: VCA3', value, timeInWholeNotes, curve);
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
  setVca1Modulation3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Modulation3', value, timeInWholeNotes, curve);
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
  setVca1ModDepth3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mod Depth3', value, timeInWholeNotes, curve);
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
  setVca1Pan4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan4', value, timeInWholeNotes, curve);
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
  setVca1PanModSrc4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Src4', value, timeInWholeNotes, curve);
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
  setVca1PanModDpt4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan Mod Dpt4', value, timeInWholeNotes, curve);
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
  setVca1Volume4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Volume4', value, timeInWholeNotes, curve);
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
  setVca1Vca4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: VCA4', value, timeInWholeNotes, curve);
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
  setVca1Modulation4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Modulation4', value, timeInWholeNotes, curve);
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
  setVca1ModDepth4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mod Depth4', value, timeInWholeNotes, curve);
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
  setVca1Mute1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mute1', value, timeInWholeNotes, curve);
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
  setVca1Mute2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mute2', value, timeInWholeNotes, curve);
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
  setVca1Mute3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mute3', value, timeInWholeNotes, curve);
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
  setVca1Mute4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Mute4', value, timeInWholeNotes, curve);
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
  setVca1Panning1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Panning1', value, timeInWholeNotes, curve);
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
  setVca1Panning2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Panning2', value, timeInWholeNotes, curve);
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
  setVca1Panning3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Panning3', value, timeInWholeNotes, curve);
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
  setVca1Panning4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Panning4', value, timeInWholeNotes, curve);
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
  setVca1Bus1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Bus1', value, timeInWholeNotes, curve);
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
  setVca1Bus2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Bus2', value, timeInWholeNotes, curve);
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
  setVca1Bus3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Bus3', value, timeInWholeNotes, curve);
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
  setVca1Bus4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Bus4', value, timeInWholeNotes, curve);
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
  setVca1Send1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Send1', value, timeInWholeNotes, curve);
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
  setVca1SendMod1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: SendMod1', value, timeInWholeNotes, curve);
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
  setVca1SendDepth1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: SendDepth1', value, timeInWholeNotes, curve);
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
  setVca1Send2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Send2', value, timeInWholeNotes, curve);
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
  setVca1SendMod2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: SendMod2', value, timeInWholeNotes, curve);
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
  setVca1SendDepth2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: SendDepth2', value, timeInWholeNotes, curve);
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
  setNuRev1PreDelay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Pre-Delay', value, timeInWholeNotes, curve);
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
  setNuRev1Damp(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Damp', value, timeInWholeNotes, curve);
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
  setNuRev1Decay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Decay', value, timeInWholeNotes, curve);
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
  setNuRev1Size(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Size', value, timeInWholeNotes, curve);
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
  setNuRev1Tone(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Tone', value, timeInWholeNotes, curve);
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
  setNuRev1Width(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Width', value, timeInWholeNotes, curve);
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
  setNuRev1DryWetMix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('NuRev1: Dry/Wet Mix', value, timeInWholeNotes, curve);
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
  setZmasReturn1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ZMas: Return1', value, timeInWholeNotes, curve);
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
  setZmasReturn2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ZMas: Return2', value, timeInWholeNotes, curve);
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
  setZmasMaster(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('ZMas: Master', value, timeInWholeNotes, curve);
  },

  params: {
    dryLevel: {
      name: 'Dry Level',
      units: undefined,
      normalize: undefined,
    },
    wetLevel: {
      name: 'Wet Level',
      units: undefined,
      normalize: undefined,
    },
    mainOutput: {
      name: 'main: Output',
      units: undefined,
      normalize: undefined,
    },
    mainActiveLfog: {
      name: 'main: Active #LFOG',
      units: undefined,
      normalize: undefined,
    },
    mainActiveLfog2: {
      name: 'main: Active #LFOG2',
      units: undefined,
      normalize: undefined,
    },
    pcoreX1: {
      name: 'PCore: X1',
      units: undefined,
      normalize: undefined,
    },
    pcoreY1: {
      name: 'PCore: Y1',
      units: undefined,
      normalize: undefined,
    },
    pcoreX2: {
      name: 'PCore: X2',
      units: undefined,
      normalize: undefined,
    },
    pcoreY2: {
      name: 'PCore: Y2',
      units: undefined,
      normalize: undefined,
    },
    pcoreX3: {
      name: 'PCore: X3',
      units: undefined,
      normalize: undefined,
    },
    pcoreY3: {
      name: 'PCore: Y3',
      units: undefined,
      normalize: undefined,
    },
    pcoreX4: {
      name: 'PCore: X4',
      units: undefined,
      normalize: undefined,
    },
    pcoreY4: {
      name: 'PCore: Y4',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix1Source: {
      name: 'PCore: Matrix1 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix1Depth: {
      name: 'PCore: Matrix1 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix1ViaSrc: {
      name: 'PCore: Matrix1 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix1Via: {
      name: 'PCore: Matrix1 Via',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix2Source: {
      name: 'PCore: Matrix2 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix2Depth: {
      name: 'PCore: Matrix2 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix2ViaSrc: {
      name: 'PCore: Matrix2 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix2Via: {
      name: 'PCore: Matrix2 Via',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix3Source: {
      name: 'PCore: Matrix3 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix3Depth: {
      name: 'PCore: Matrix3 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix3ViaSrc: {
      name: 'PCore: Matrix3 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix3Via: {
      name: 'PCore: Matrix3 Via',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix4Source: {
      name: 'PCore: Matrix4 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix4Depth: {
      name: 'PCore: Matrix4 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix4ViaSrc: {
      name: 'PCore: Matrix4 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix4Via: {
      name: 'PCore: Matrix4 Via',
      units: undefined,
      normalize: undefined,
    },
    lfogSync: {
      name: 'LFOG: Sync',
      units: undefined,
      normalize: undefined,
    },
    lfogPhase: {
      name: 'LFOG: Phase',
      units: undefined,
      normalize: undefined,
    },
    lfog2Sync: {
      name: 'LFOG2: Sync',
      units: undefined,
      normalize: undefined,
    },
    lfog2Phase: {
      name: 'LFOG2: Phase',
      units: undefined,
      normalize: undefined,
    },
    vccActiveLfo1: {
      name: 'VCC: Active #LFO1',
      units: undefined,
      normalize: undefined,
    },
    vccActiveLfo2: {
      name: 'VCC: Active #LFO2',
      units: undefined,
      normalize: undefined,
    },
    vccActiveLfo3: {
      name: 'VCC: Active #LFO3',
      units: undefined,
      normalize: undefined,
    },
    vccActiveLfo4: {
      name: 'VCC: Active #LFO4',
      units: undefined,
      normalize: undefined,
    },
    vccVoices: {
      name: 'VCC: Voices',
      units: undefined,
      normalize: undefined,
    },
    vccVoicing: {
      name: 'VCC: Voicing',
      units: undefined,
      normalize: undefined,
    },
    vccMode: {
      name: 'VCC: Mode',
      units: undefined,
      normalize: undefined,
    },
    vccPortamento: {
      name: 'VCC: Portamento',
      units: undefined,
      normalize: undefined,
    },
    vccTranspose: {
      name: 'VCC: Transpose',
      units: undefined,
      normalize: undefined,
    },
    vccFineTuneCents: {
      name: 'VCC: FineTuneCents',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA1: {
      name: 'VCC: Arp Step ModA1',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA2: {
      name: 'VCC: Arp Step ModA2',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA3: {
      name: 'VCC: Arp Step ModA3',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA4: {
      name: 'VCC: Arp Step ModA4',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA5: {
      name: 'VCC: Arp Step ModA5',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA6: {
      name: 'VCC: Arp Step ModA6',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA7: {
      name: 'VCC: Arp Step ModA7',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA8: {
      name: 'VCC: Arp Step ModA8',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA9: {
      name: 'VCC: Arp Step ModA9',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA10: {
      name: 'VCC: Arp Step ModA10',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA11: {
      name: 'VCC: Arp Step ModA11',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA12: {
      name: 'VCC: Arp Step ModA12',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA13: {
      name: 'VCC: Arp Step ModA13',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA14: {
      name: 'VCC: Arp Step ModA14',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA15: {
      name: 'VCC: Arp Step ModA15',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepModA16: {
      name: 'VCC: Arp Step ModA16',
      units: undefined,
      normalize: undefined,
    },
    env1Init: {
      name: 'ENV1: Init',
      units: undefined,
      normalize: undefined,
    },
    env1Attack: {
      name: 'ENV1: Attack',
      units: undefined,
      normalize: undefined,
    },
    env1Decay: {
      name: 'ENV1: Decay',
      units: undefined,
      normalize: undefined,
    },
    env1Sustain: {
      name: 'ENV1: Sustain',
      units: undefined,
      normalize: undefined,
    },
    env1FallRise: {
      name: 'ENV1: Fall/Rise',
      units: undefined,
      normalize: undefined,
    },
    env1Sustain2: {
      name: 'ENV1: Sustain2',
      units: undefined,
      normalize: undefined,
    },
    env1Release: {
      name: 'ENV1: Release',
      units: undefined,
      normalize: undefined,
    },
    env1Velocity: {
      name: 'ENV1: Velocity',
      units: undefined,
      normalize: undefined,
    },
    env1Slope: {
      name: 'ENV1: Slope',
      units: undefined,
      normalize: undefined,
    },
    env2Init: {
      name: 'ENV2: Init',
      units: undefined,
      normalize: undefined,
    },
    env2Attack: {
      name: 'ENV2: Attack',
      units: undefined,
      normalize: undefined,
    },
    env2Decay: {
      name: 'ENV2: Decay',
      units: undefined,
      normalize: undefined,
    },
    env2Sustain: {
      name: 'ENV2: Sustain',
      units: undefined,
      normalize: undefined,
    },
    env2FallRise: {
      name: 'ENV2: Fall/Rise',
      units: undefined,
      normalize: undefined,
    },
    env2Sustain2: {
      name: 'ENV2: Sustain2',
      units: undefined,
      normalize: undefined,
    },
    env2Release: {
      name: 'ENV2: Release',
      units: undefined,
      normalize: undefined,
    },
    env2Velocity: {
      name: 'ENV2: Velocity',
      units: undefined,
      normalize: undefined,
    },
    env2Slope: {
      name: 'ENV2: Slope',
      units: undefined,
      normalize: undefined,
    },
    env3Init: {
      name: 'ENV3: Init',
      units: undefined,
      normalize: undefined,
    },
    env3Attack: {
      name: 'ENV3: Attack',
      units: undefined,
      normalize: undefined,
    },
    env3Decay: {
      name: 'ENV3: Decay',
      units: undefined,
      normalize: undefined,
    },
    env3Sustain: {
      name: 'ENV3: Sustain',
      units: undefined,
      normalize: undefined,
    },
    env3FallRise: {
      name: 'ENV3: Fall/Rise',
      units: undefined,
      normalize: undefined,
    },
    env3Sustain2: {
      name: 'ENV3: Sustain2',
      units: undefined,
      normalize: undefined,
    },
    env3Release: {
      name: 'ENV3: Release',
      units: undefined,
      normalize: undefined,
    },
    env3Velocity: {
      name: 'ENV3: Velocity',
      units: undefined,
      normalize: undefined,
    },
    env3Slope: {
      name: 'ENV3: Slope',
      units: undefined,
      normalize: undefined,
    },
    env4Init: {
      name: 'ENV4: Init',
      units: undefined,
      normalize: undefined,
    },
    env4Attack: {
      name: 'ENV4: Attack',
      units: undefined,
      normalize: undefined,
    },
    env4Decay: {
      name: 'ENV4: Decay',
      units: undefined,
      normalize: undefined,
    },
    env4Sustain: {
      name: 'ENV4: Sustain',
      units: undefined,
      normalize: undefined,
    },
    env4FallRise: {
      name: 'ENV4: Fall/Rise',
      units: undefined,
      normalize: undefined,
    },
    env4Sustain2: {
      name: 'ENV4: Sustain2',
      units: undefined,
      normalize: undefined,
    },
    env4Release: {
      name: 'ENV4: Release',
      units: undefined,
      normalize: undefined,
    },
    env4Velocity: {
      name: 'ENV4: Velocity',
      units: undefined,
      normalize: undefined,
    },
    env4Slope: {
      name: 'ENV4: Slope',
      units: undefined,
      normalize: undefined,
    },
    mseg1Velocity: {
      name: 'MSEG1: Velocity',
      units: undefined,
      normalize: undefined,
    },
    mseg1Attack: {
      name: 'MSEG1: Attack',
      units: undefined,
      normalize: undefined,
    },
    mseg1Loop: {
      name: 'MSEG1: Loop',
      units: undefined,
      normalize: undefined,
    },
    mseg1Release: {
      name: 'MSEG1: Release',
      units: undefined,
      normalize: undefined,
    },
    mseg2Velocity: {
      name: 'MSEG2: Velocity',
      units: undefined,
      normalize: undefined,
    },
    mseg2Attack: {
      name: 'MSEG2: Attack',
      units: undefined,
      normalize: undefined,
    },
    mseg2Loop: {
      name: 'MSEG2: Loop',
      units: undefined,
      normalize: undefined,
    },
    mseg2Release: {
      name: 'MSEG2: Release',
      units: undefined,
      normalize: undefined,
    },
    mseg3Velocity: {
      name: 'MSEG3: Velocity',
      units: undefined,
      normalize: undefined,
    },
    mseg3Attack: {
      name: 'MSEG3: Attack',
      units: undefined,
      normalize: undefined,
    },
    mseg3Loop: {
      name: 'MSEG3: Loop',
      units: undefined,
      normalize: undefined,
    },
    mseg3Release: {
      name: 'MSEG3: Release',
      units: undefined,
      normalize: undefined,
    },
    mseg4Velocity: {
      name: 'MSEG4: Velocity',
      units: undefined,
      normalize: undefined,
    },
    mseg4Attack: {
      name: 'MSEG4: Attack',
      units: undefined,
      normalize: undefined,
    },
    mseg4Loop: {
      name: 'MSEG4: Loop',
      units: undefined,
      normalize: undefined,
    },
    mseg4Release: {
      name: 'MSEG4: Release',
      units: undefined,
      normalize: undefined,
    },
    lfo1Sync: {
      name: 'LFO1: Sync',
      units: undefined,
      normalize: undefined,
    },
    lfo1Delay: {
      name: 'LFO1: Delay',
      units: undefined,
      normalize: undefined,
    },
    lfo2Sync: {
      name: 'LFO2: Sync',
      units: undefined,
      normalize: undefined,
    },
    lfo2Delay: {
      name: 'LFO2: Delay',
      units: undefined,
      normalize: undefined,
    },
    lfo3Sync: {
      name: 'LFO3: Sync',
      units: undefined,
      normalize: undefined,
    },
    lfo3Delay: {
      name: 'LFO3: Delay',
      units: undefined,
      normalize: undefined,
    },
    lfo4Sync: {
      name: 'LFO4: Sync',
      units: undefined,
      normalize: undefined,
    },
    lfo4Delay: {
      name: 'LFO4: Delay',
      units: undefined,
      normalize: undefined,
    },
    mmix1Constant: {
      name: 'MMix1: Constant',
      units: undefined,
      normalize: undefined,
    },
    mmix2Constant: {
      name: 'MMix2: Constant',
      units: undefined,
      normalize: undefined,
    },
    mmix3Constant: {
      name: 'MMix3: Constant',
      units: undefined,
      normalize: undefined,
    },
    mmix4Constant: {
      name: 'MMix4: Constant',
      units: undefined,
      normalize: undefined,
    },
    osc1Tune: {
      name: 'OSC1: Tune',
      units: undefined,
      normalize: undefined,
    },
    osc1TuneModSrc: {
      name: 'OSC1: TuneModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc1TuneModDepth: {
      name: 'OSC1: TuneModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc1Phase: {
      name: 'OSC1: Phase',
      units: undefined,
      normalize: undefined,
    },
    osc1PhaseModSrc: {
      name: 'OSC1: PhaseModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc1PhaseModDepth: {
      name: 'OSC1: PhaseModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc1WaveWarp: {
      name: 'OSC1: WaveWarp',
      units: undefined,
      normalize: undefined,
    },
    osc1WarpModSrc: {
      name: 'OSC1: WarpModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc1WarpModDepth: {
      name: 'OSC1: WarpModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc1Vibrato: {
      name: 'OSC1: Vibrato',
      units: undefined,
      normalize: undefined,
    },
    osc1SpectraFX1Val: {
      name: 'OSC1: SpectraFX1 Val',
      units: undefined,
      normalize: undefined,
    },
    osc1Sfx1modsrc: {
      name: 'OSC1: SFX1ModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc1Sfx1moddepth: {
      name: 'OSC1: SFX1ModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc1SpectraFX2Val: {
      name: 'OSC1: SpectraFX2 Val',
      units: undefined,
      normalize: undefined,
    },
    osc1Sfx2modsrc: {
      name: 'OSC1: SFX2ModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc1Sfx2moddepth: {
      name: 'OSC1: SFX2ModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc1Detune: {
      name: 'OSC1: Detune',
      units: undefined,
      normalize: undefined,
    },
    osc1Volume: {
      name: 'OSC1: Volume',
      units: undefined,
      normalize: undefined,
    },
    osc1VolumeModSrc: {
      name: 'OSC1: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc1VolumeModDepth: {
      name: 'OSC1: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc1Pan: {
      name: 'OSC1: Pan',
      units: undefined,
      normalize: undefined,
    },
    osc1PanModSrc: {
      name: 'OSC1: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc1PanModDepth: {
      name: 'OSC1: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc1SyncTune: {
      name: 'OSC1: SyncTune',
      units: undefined,
      normalize: undefined,
    },
    osc1SyncModSrc: {
      name: 'OSC1: SyncModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc1SyncModDepth: {
      name: 'OSC1: SyncModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc1PolyWidth: {
      name: 'OSC1: Poly Width',
      units: undefined,
      normalize: undefined,
    },
    osc1Normalize: {
      name: 'OSC1: Normalize',
      units: undefined,
      normalize: undefined,
    },
    osc2Tune: {
      name: 'OSC2: Tune',
      units: undefined,
      normalize: undefined,
    },
    osc2TuneModSrc: {
      name: 'OSC2: TuneModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc2TuneModDepth: {
      name: 'OSC2: TuneModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc2Phase: {
      name: 'OSC2: Phase',
      units: undefined,
      normalize: undefined,
    },
    osc2PhaseModSrc: {
      name: 'OSC2: PhaseModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc2PhaseModDepth: {
      name: 'OSC2: PhaseModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc2WaveWarp: {
      name: 'OSC2: WaveWarp',
      units: undefined,
      normalize: undefined,
    },
    osc2WarpModSrc: {
      name: 'OSC2: WarpModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc2WarpModDepth: {
      name: 'OSC2: WarpModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc2Vibrato: {
      name: 'OSC2: Vibrato',
      units: undefined,
      normalize: undefined,
    },
    osc2SpectraFX1Val: {
      name: 'OSC2: SpectraFX1 Val',
      units: undefined,
      normalize: undefined,
    },
    osc2Sfx1modsrc: {
      name: 'OSC2: SFX1ModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc2Sfx1moddepth: {
      name: 'OSC2: SFX1ModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc2SpectraFX2Val: {
      name: 'OSC2: SpectraFX2 Val',
      units: undefined,
      normalize: undefined,
    },
    osc2Sfx2modsrc: {
      name: 'OSC2: SFX2ModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc2Sfx2moddepth: {
      name: 'OSC2: SFX2ModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc2Detune: {
      name: 'OSC2: Detune',
      units: undefined,
      normalize: undefined,
    },
    osc2Volume: {
      name: 'OSC2: Volume',
      units: undefined,
      normalize: undefined,
    },
    osc2VolumeModSrc: {
      name: 'OSC2: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc2VolumeModDepth: {
      name: 'OSC2: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc2Pan: {
      name: 'OSC2: Pan',
      units: undefined,
      normalize: undefined,
    },
    osc2PanModSrc: {
      name: 'OSC2: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc2PanModDepth: {
      name: 'OSC2: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc2SyncTune: {
      name: 'OSC2: SyncTune',
      units: undefined,
      normalize: undefined,
    },
    osc2SyncModSrc: {
      name: 'OSC2: SyncModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc2SyncModDepth: {
      name: 'OSC2: SyncModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc2PolyWidth: {
      name: 'OSC2: Poly Width',
      units: undefined,
      normalize: undefined,
    },
    osc2Normalize: {
      name: 'OSC2: Normalize',
      units: undefined,
      normalize: undefined,
    },
    osc3Tune: {
      name: 'OSC3: Tune',
      units: undefined,
      normalize: undefined,
    },
    osc3TuneModSrc: {
      name: 'OSC3: TuneModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc3TuneModDepth: {
      name: 'OSC3: TuneModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc3Phase: {
      name: 'OSC3: Phase',
      units: undefined,
      normalize: undefined,
    },
    osc3PhaseModSrc: {
      name: 'OSC3: PhaseModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc3PhaseModDepth: {
      name: 'OSC3: PhaseModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc3WaveWarp: {
      name: 'OSC3: WaveWarp',
      units: undefined,
      normalize: undefined,
    },
    osc3WarpModSrc: {
      name: 'OSC3: WarpModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc3WarpModDepth: {
      name: 'OSC3: WarpModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc3Vibrato: {
      name: 'OSC3: Vibrato',
      units: undefined,
      normalize: undefined,
    },
    osc3SpectraFX1Val: {
      name: 'OSC3: SpectraFX1 Val',
      units: undefined,
      normalize: undefined,
    },
    osc3Sfx1modsrc: {
      name: 'OSC3: SFX1ModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc3Sfx1moddepth: {
      name: 'OSC3: SFX1ModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc3SpectraFX2Val: {
      name: 'OSC3: SpectraFX2 Val',
      units: undefined,
      normalize: undefined,
    },
    osc3Sfx2modsrc: {
      name: 'OSC3: SFX2ModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc3Sfx2moddepth: {
      name: 'OSC3: SFX2ModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc3Detune: {
      name: 'OSC3: Detune',
      units: undefined,
      normalize: undefined,
    },
    osc3Volume: {
      name: 'OSC3: Volume',
      units: undefined,
      normalize: undefined,
    },
    osc3VolumeModSrc: {
      name: 'OSC3: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc3VolumeModDepth: {
      name: 'OSC3: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc3Pan: {
      name: 'OSC3: Pan',
      units: undefined,
      normalize: undefined,
    },
    osc3PanModSrc: {
      name: 'OSC3: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc3PanModDepth: {
      name: 'OSC3: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc3SyncTune: {
      name: 'OSC3: SyncTune',
      units: undefined,
      normalize: undefined,
    },
    osc3SyncModSrc: {
      name: 'OSC3: SyncModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc3SyncModDepth: {
      name: 'OSC3: SyncModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc3PolyWidth: {
      name: 'OSC3: Poly Width',
      units: undefined,
      normalize: undefined,
    },
    osc3Normalize: {
      name: 'OSC3: Normalize',
      units: undefined,
      normalize: undefined,
    },
    osc4Tune: {
      name: 'OSC4: Tune',
      units: undefined,
      normalize: undefined,
    },
    osc4TuneModSrc: {
      name: 'OSC4: TuneModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc4TuneModDepth: {
      name: 'OSC4: TuneModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc4Phase: {
      name: 'OSC4: Phase',
      units: undefined,
      normalize: undefined,
    },
    osc4PhaseModSrc: {
      name: 'OSC4: PhaseModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc4PhaseModDepth: {
      name: 'OSC4: PhaseModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc4WaveWarp: {
      name: 'OSC4: WaveWarp',
      units: undefined,
      normalize: undefined,
    },
    osc4WarpModSrc: {
      name: 'OSC4: WarpModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc4WarpModDepth: {
      name: 'OSC4: WarpModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc4Vibrato: {
      name: 'OSC4: Vibrato',
      units: undefined,
      normalize: undefined,
    },
    osc4SpectraFX1Val: {
      name: 'OSC4: SpectraFX1 Val',
      units: undefined,
      normalize: undefined,
    },
    osc4Sfx1modsrc: {
      name: 'OSC4: SFX1ModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc4Sfx1moddepth: {
      name: 'OSC4: SFX1ModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc4SpectraFX2Val: {
      name: 'OSC4: SpectraFX2 Val',
      units: undefined,
      normalize: undefined,
    },
    osc4Sfx2modsrc: {
      name: 'OSC4: SFX2ModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc4Sfx2moddepth: {
      name: 'OSC4: SFX2ModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc4Detune: {
      name: 'OSC4: Detune',
      units: undefined,
      normalize: undefined,
    },
    osc4Volume: {
      name: 'OSC4: Volume',
      units: undefined,
      normalize: undefined,
    },
    osc4VolumeModSrc: {
      name: 'OSC4: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc4VolumeModDepth: {
      name: 'OSC4: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc4Pan: {
      name: 'OSC4: Pan',
      units: undefined,
      normalize: undefined,
    },
    osc4PanModSrc: {
      name: 'OSC4: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc4PanModDepth: {
      name: 'OSC4: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc4SyncTune: {
      name: 'OSC4: SyncTune',
      units: undefined,
      normalize: undefined,
    },
    osc4SyncModSrc: {
      name: 'OSC4: SyncModSrc',
      units: undefined,
      normalize: undefined,
    },
    osc4SyncModDepth: {
      name: 'OSC4: SyncModDepth',
      units: undefined,
      normalize: undefined,
    },
    osc4PolyWidth: {
      name: 'OSC4: Poly Width',
      units: undefined,
      normalize: undefined,
    },
    osc4Normalize: {
      name: 'OSC4: Normalize',
      units: undefined,
      normalize: undefined,
    },
    noise1Filter1: {
      name: 'Noise1: Filter1',
      units: undefined,
      normalize: undefined,
    },
    noise1F1ModSrc: {
      name: 'Noise1: F1 ModSrc',
      units: undefined,
      normalize: undefined,
    },
    noise1F1ModDepth: {
      name: 'Noise1: F1 ModDepth',
      units: undefined,
      normalize: undefined,
    },
    noise1Filter2: {
      name: 'Noise1: Filter2',
      units: undefined,
      normalize: undefined,
    },
    noise1F2ModSrc: {
      name: 'Noise1: F2 ModSrc',
      units: undefined,
      normalize: undefined,
    },
    noise1F2ModDepth: {
      name: 'Noise1: F2 ModDepth',
      units: undefined,
      normalize: undefined,
    },
    noise1Volume: {
      name: 'Noise1: Volume',
      units: undefined,
      normalize: undefined,
    },
    noise1VolumeModSrc: {
      name: 'Noise1: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    noise1VolumeModDepth: {
      name: 'Noise1: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    noise1Pan: {
      name: 'Noise1: Pan',
      units: undefined,
      normalize: undefined,
    },
    noise1PanModSrc: {
      name: 'Noise1: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    noise1PanModDepth: {
      name: 'Noise1: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    noise1Width: {
      name: 'Noise1: Width',
      units: undefined,
      normalize: undefined,
    },
    noise2Filter1: {
      name: 'Noise2: Filter1',
      units: undefined,
      normalize: undefined,
    },
    noise2F1ModSrc: {
      name: 'Noise2: F1 ModSrc',
      units: undefined,
      normalize: undefined,
    },
    noise2F1ModDepth: {
      name: 'Noise2: F1 ModDepth',
      units: undefined,
      normalize: undefined,
    },
    noise2Filter2: {
      name: 'Noise2: Filter2',
      units: undefined,
      normalize: undefined,
    },
    noise2F2ModSrc: {
      name: 'Noise2: F2 ModSrc',
      units: undefined,
      normalize: undefined,
    },
    noise2F2ModDepth: {
      name: 'Noise2: F2 ModDepth',
      units: undefined,
      normalize: undefined,
    },
    noise2Volume: {
      name: 'Noise2: Volume',
      units: undefined,
      normalize: undefined,
    },
    noise2VolumeModSrc: {
      name: 'Noise2: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    noise2VolumeModDepth: {
      name: 'Noise2: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    noise2Pan: {
      name: 'Noise2: Pan',
      units: undefined,
      normalize: undefined,
    },
    noise2PanModSrc: {
      name: 'Noise2: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    noise2PanModDepth: {
      name: 'Noise2: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    noise2Width: {
      name: 'Noise2: Width',
      units: undefined,
      normalize: undefined,
    },
    vcf1Type: {
      name: 'VCF1: Type',
      units: undefined,
      normalize: undefined,
    },
    vcf1Cutoff: {
      name: 'VCF1: Cutoff',
      units: undefined,
      normalize: undefined,
    },
    vcf1Resonance: {
      name: 'VCF1: Resonance',
      units: undefined,
      normalize: undefined,
    },
    vcf1Drive: {
      name: 'VCF1: Drive',
      units: undefined,
      normalize: undefined,
    },
    vcf1Gain: {
      name: 'VCF1: Gain',
      units: undefined,
      normalize: undefined,
    },
    vcf1ModDepth1: {
      name: 'VCF1: ModDepth1',
      units: undefined,
      normalize: undefined,
    },
    vcf1ModDepth2: {
      name: 'VCF1: ModDepth2',
      units: undefined,
      normalize: undefined,
    },
    vcf1KeyFollow: {
      name: 'VCF1: KeyFollow',
      units: undefined,
      normalize: undefined,
    },
    vcf2Type: {
      name: 'VCF2: Type',
      units: undefined,
      normalize: undefined,
    },
    vcf2Cutoff: {
      name: 'VCF2: Cutoff',
      units: undefined,
      normalize: undefined,
    },
    vcf2Resonance: {
      name: 'VCF2: Resonance',
      units: undefined,
      normalize: undefined,
    },
    vcf2Drive: {
      name: 'VCF2: Drive',
      units: undefined,
      normalize: undefined,
    },
    vcf2Gain: {
      name: 'VCF2: Gain',
      units: undefined,
      normalize: undefined,
    },
    vcf2ModDepth1: {
      name: 'VCF2: ModDepth1',
      units: undefined,
      normalize: undefined,
    },
    vcf2ModDepth2: {
      name: 'VCF2: ModDepth2',
      units: undefined,
      normalize: undefined,
    },
    vcf2KeyFollow: {
      name: 'VCF2: KeyFollow',
      units: undefined,
      normalize: undefined,
    },
    vcf3Type: {
      name: 'VCF3: Type',
      units: undefined,
      normalize: undefined,
    },
    vcf3Cutoff: {
      name: 'VCF3: Cutoff',
      units: undefined,
      normalize: undefined,
    },
    vcf3Resonance: {
      name: 'VCF3: Resonance',
      units: undefined,
      normalize: undefined,
    },
    vcf3Drive: {
      name: 'VCF3: Drive',
      units: undefined,
      normalize: undefined,
    },
    vcf3Gain: {
      name: 'VCF3: Gain',
      units: undefined,
      normalize: undefined,
    },
    vcf3ModDepth1: {
      name: 'VCF3: ModDepth1',
      units: undefined,
      normalize: undefined,
    },
    vcf3ModDepth2: {
      name: 'VCF3: ModDepth2',
      units: undefined,
      normalize: undefined,
    },
    vcf3KeyFollow: {
      name: 'VCF3: KeyFollow',
      units: undefined,
      normalize: undefined,
    },
    vcf4Type: {
      name: 'VCF4: Type',
      units: undefined,
      normalize: undefined,
    },
    vcf4Cutoff: {
      name: 'VCF4: Cutoff',
      units: undefined,
      normalize: undefined,
    },
    vcf4Resonance: {
      name: 'VCF4: Resonance',
      units: undefined,
      normalize: undefined,
    },
    vcf4Drive: {
      name: 'VCF4: Drive',
      units: undefined,
      normalize: undefined,
    },
    vcf4Gain: {
      name: 'VCF4: Gain',
      units: undefined,
      normalize: undefined,
    },
    vcf4ModDepth1: {
      name: 'VCF4: ModDepth1',
      units: undefined,
      normalize: undefined,
    },
    vcf4ModDepth2: {
      name: 'VCF4: ModDepth2',
      units: undefined,
      normalize: undefined,
    },
    vcf4KeyFollow: {
      name: 'VCF4: KeyFollow',
      units: undefined,
      normalize: undefined,
    },
    fmo1Tune: {
      name: 'FMO1: Tune',
      units: undefined,
      normalize: undefined,
    },
    fmo1TuneModSrc: {
      name: 'FMO1: TuneModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo1TuneModDepth: {
      name: 'FMO1: TuneModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo1FmDepth: {
      name: 'FMO1: FM Depth',
      units: undefined,
      normalize: undefined,
    },
    fmo1FmModSrc: {
      name: 'FMO1: FM ModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo1FmModDepth: {
      name: 'FMO1: FM ModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo1Vibrato: {
      name: 'FMO1: Vibrato',
      units: undefined,
      normalize: undefined,
    },
    fmo1Detune: {
      name: 'FMO1: Detune',
      units: undefined,
      normalize: undefined,
    },
    fmo1Volume: {
      name: 'FMO1: Volume',
      units: undefined,
      normalize: undefined,
    },
    fmo1VolumeModSrc: {
      name: 'FMO1: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo1VolumeModDepth: {
      name: 'FMO1: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo1Pan: {
      name: 'FMO1: Pan',
      units: undefined,
      normalize: undefined,
    },
    fmo1PanModSrc: {
      name: 'FMO1: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo1PanModDepth: {
      name: 'FMO1: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo1Width: {
      name: 'FMO1: Width',
      units: undefined,
      normalize: undefined,
    },
    fmo2Tune: {
      name: 'FMO2: Tune',
      units: undefined,
      normalize: undefined,
    },
    fmo2TuneModSrc: {
      name: 'FMO2: TuneModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo2TuneModDepth: {
      name: 'FMO2: TuneModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo2FmDepth: {
      name: 'FMO2: FM Depth',
      units: undefined,
      normalize: undefined,
    },
    fmo2FmModSrc: {
      name: 'FMO2: FM ModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo2FmModDepth: {
      name: 'FMO2: FM ModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo2Vibrato: {
      name: 'FMO2: Vibrato',
      units: undefined,
      normalize: undefined,
    },
    fmo2Detune: {
      name: 'FMO2: Detune',
      units: undefined,
      normalize: undefined,
    },
    fmo2Volume: {
      name: 'FMO2: Volume',
      units: undefined,
      normalize: undefined,
    },
    fmo2VolumeModSrc: {
      name: 'FMO2: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo2VolumeModDepth: {
      name: 'FMO2: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo2Pan: {
      name: 'FMO2: Pan',
      units: undefined,
      normalize: undefined,
    },
    fmo2PanModSrc: {
      name: 'FMO2: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo2PanModDepth: {
      name: 'FMO2: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo2Width: {
      name: 'FMO2: Width',
      units: undefined,
      normalize: undefined,
    },
    fmo3Tune: {
      name: 'FMO3: Tune',
      units: undefined,
      normalize: undefined,
    },
    fmo3TuneModSrc: {
      name: 'FMO3: TuneModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo3TuneModDepth: {
      name: 'FMO3: TuneModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo3FmDepth: {
      name: 'FMO3: FM Depth',
      units: undefined,
      normalize: undefined,
    },
    fmo3FmModSrc: {
      name: 'FMO3: FM ModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo3FmModDepth: {
      name: 'FMO3: FM ModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo3Vibrato: {
      name: 'FMO3: Vibrato',
      units: undefined,
      normalize: undefined,
    },
    fmo3Detune: {
      name: 'FMO3: Detune',
      units: undefined,
      normalize: undefined,
    },
    fmo3Volume: {
      name: 'FMO3: Volume',
      units: undefined,
      normalize: undefined,
    },
    fmo3VolumeModSrc: {
      name: 'FMO3: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo3VolumeModDepth: {
      name: 'FMO3: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo3Pan: {
      name: 'FMO3: Pan',
      units: undefined,
      normalize: undefined,
    },
    fmo3PanModSrc: {
      name: 'FMO3: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo3PanModDepth: {
      name: 'FMO3: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo3Width: {
      name: 'FMO3: Width',
      units: undefined,
      normalize: undefined,
    },
    fmo4Tune: {
      name: 'FMO4: Tune',
      units: undefined,
      normalize: undefined,
    },
    fmo4TuneModSrc: {
      name: 'FMO4: TuneModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo4TuneModDepth: {
      name: 'FMO4: TuneModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo4FmDepth: {
      name: 'FMO4: FM Depth',
      units: undefined,
      normalize: undefined,
    },
    fmo4FmModSrc: {
      name: 'FMO4: FM ModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo4FmModDepth: {
      name: 'FMO4: FM ModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo4Vibrato: {
      name: 'FMO4: Vibrato',
      units: undefined,
      normalize: undefined,
    },
    fmo4Detune: {
      name: 'FMO4: Detune',
      units: undefined,
      normalize: undefined,
    },
    fmo4Volume: {
      name: 'FMO4: Volume',
      units: undefined,
      normalize: undefined,
    },
    fmo4VolumeModSrc: {
      name: 'FMO4: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo4VolumeModDepth: {
      name: 'FMO4: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo4Pan: {
      name: 'FMO4: Pan',
      units: undefined,
      normalize: undefined,
    },
    fmo4PanModSrc: {
      name: 'FMO4: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    fmo4PanModDepth: {
      name: 'FMO4: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    fmo4Width: {
      name: 'FMO4: Width',
      units: undefined,
      normalize: undefined,
    },
    comb1Tune: {
      name: 'Comb1: Tune',
      units: undefined,
      normalize: undefined,
    },
    comb1KeyScale: {
      name: 'Comb1: key scale',
      units: undefined,
      normalize: undefined,
    },
    comb1TuneModDepth: {
      name: 'Comb1: TuneModDepth',
      units: undefined,
      normalize: undefined,
    },
    comb1Detune: {
      name: 'Comb1: Detune',
      units: undefined,
      normalize: undefined,
    },
    comb1Vibrato: {
      name: 'Comb1: Vibrato',
      units: undefined,
      normalize: undefined,
    },
    comb1Feedback: {
      name: 'Comb1: Feedback',
      units: undefined,
      normalize: undefined,
    },
    comb1Fbmoddepth: {
      name: 'Comb1: FBModDepth',
      units: undefined,
      normalize: undefined,
    },
    comb1Damp: {
      name: 'Comb1: Damp',
      units: undefined,
      normalize: undefined,
    },
    comb1DampModDepth: {
      name: 'Comb1: DampModDepth',
      units: undefined,
      normalize: undefined,
    },
    comb1PreFill: {
      name: 'Comb1: PreFill',
      units: undefined,
      normalize: undefined,
    },
    comb1Input: {
      name: 'Comb1: Input',
      units: undefined,
      normalize: undefined,
    },
    comb1InputMod: {
      name: 'Comb1: InputMod',
      units: undefined,
      normalize: undefined,
    },
    comb1Tone: {
      name: 'Comb1: Tone',
      units: undefined,
      normalize: undefined,
    },
    comb1ToneMod: {
      name: 'Comb1: ToneMod',
      units: undefined,
      normalize: undefined,
    },
    comb1Flavour: {
      name: 'Comb1: Flavour',
      units: undefined,
      normalize: undefined,
    },
    comb1FlavourMod: {
      name: 'Comb1: FlavourMod',
      units: undefined,
      normalize: undefined,
    },
    comb1Distortion: {
      name: 'Comb1: Distortion',
      units: undefined,
      normalize: undefined,
    },
    comb1Dry: {
      name: 'Comb1: Dry',
      units: undefined,
      normalize: undefined,
    },
    comb1Volume: {
      name: 'Comb1: Volume',
      units: undefined,
      normalize: undefined,
    },
    comb1VolumeModSrc: {
      name: 'Comb1: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    comb1VolumeModDepth: {
      name: 'Comb1: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    comb1Pan: {
      name: 'Comb1: Pan',
      units: undefined,
      normalize: undefined,
    },
    comb1PanModSrc: {
      name: 'Comb1: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    comb1PanModDepth: {
      name: 'Comb1: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    comb1Width: {
      name: 'Comb1: Width',
      units: undefined,
      normalize: undefined,
    },
    comb2Tune: {
      name: 'Comb2: Tune',
      units: undefined,
      normalize: undefined,
    },
    comb2KeyScale: {
      name: 'Comb2: key scale',
      units: undefined,
      normalize: undefined,
    },
    comb2TuneModDepth: {
      name: 'Comb2: TuneModDepth',
      units: undefined,
      normalize: undefined,
    },
    comb2Detune: {
      name: 'Comb2: Detune',
      units: undefined,
      normalize: undefined,
    },
    comb2Vibrato: {
      name: 'Comb2: Vibrato',
      units: undefined,
      normalize: undefined,
    },
    comb2Feedback: {
      name: 'Comb2: Feedback',
      units: undefined,
      normalize: undefined,
    },
    comb2Fbmoddepth: {
      name: 'Comb2: FBModDepth',
      units: undefined,
      normalize: undefined,
    },
    comb2Damp: {
      name: 'Comb2: Damp',
      units: undefined,
      normalize: undefined,
    },
    comb2DampModDepth: {
      name: 'Comb2: DampModDepth',
      units: undefined,
      normalize: undefined,
    },
    comb2PreFill: {
      name: 'Comb2: PreFill',
      units: undefined,
      normalize: undefined,
    },
    comb2Input: {
      name: 'Comb2: Input',
      units: undefined,
      normalize: undefined,
    },
    comb2InputMod: {
      name: 'Comb2: InputMod',
      units: undefined,
      normalize: undefined,
    },
    comb2Tone: {
      name: 'Comb2: Tone',
      units: undefined,
      normalize: undefined,
    },
    comb2ToneMod: {
      name: 'Comb2: ToneMod',
      units: undefined,
      normalize: undefined,
    },
    comb2Flavour: {
      name: 'Comb2: Flavour',
      units: undefined,
      normalize: undefined,
    },
    comb2FlavourMod: {
      name: 'Comb2: FlavourMod',
      units: undefined,
      normalize: undefined,
    },
    comb2Distortion: {
      name: 'Comb2: Distortion',
      units: undefined,
      normalize: undefined,
    },
    comb2Dry: {
      name: 'Comb2: Dry',
      units: undefined,
      normalize: undefined,
    },
    comb2Volume: {
      name: 'Comb2: Volume',
      units: undefined,
      normalize: undefined,
    },
    comb2VolumeModSrc: {
      name: 'Comb2: VolumeModSrc',
      units: undefined,
      normalize: undefined,
    },
    comb2VolumeModDepth: {
      name: 'Comb2: VolumeModDepth',
      units: undefined,
      normalize: undefined,
    },
    comb2Pan: {
      name: 'Comb2: Pan',
      units: undefined,
      normalize: undefined,
    },
    comb2PanModSrc: {
      name: 'Comb2: PanModSrc',
      units: undefined,
      normalize: undefined,
    },
    comb2PanModDepth: {
      name: 'Comb2: PanModDepth',
      units: undefined,
      normalize: undefined,
    },
    comb2Width: {
      name: 'Comb2: Width',
      units: undefined,
      normalize: undefined,
    },
    shape1Depth: {
      name: 'Shape1: Depth',
      units: undefined,
      normalize: undefined,
    },
    shape1DModSrc: {
      name: 'Shape1: D_ModSrc',
      units: undefined,
      normalize: undefined,
    },
    shape1DModDepth: {
      name: 'Shape1: D_ModDepth',
      units: undefined,
      normalize: undefined,
    },
    shape1Edge: {
      name: 'Shape1: Edge',
      units: undefined,
      normalize: undefined,
    },
    shape1EdgeModSrc: {
      name: 'Shape1: Edge ModSrc',
      units: undefined,
      normalize: undefined,
    },
    shape1EdgeModDepth: {
      name: 'Shape1: Edge ModDepth',
      units: undefined,
      normalize: undefined,
    },
    shape1Input: {
      name: 'Shape1: Input',
      units: undefined,
      normalize: undefined,
    },
    shape1Output: {
      name: 'Shape1: Output',
      units: undefined,
      normalize: undefined,
    },
    shape1HiOut: {
      name: 'Shape1: HiOut',
      units: undefined,
      normalize: undefined,
    },
    shape2Depth: {
      name: 'Shape2: Depth',
      units: undefined,
      normalize: undefined,
    },
    shape2DModSrc: {
      name: 'Shape2: D_ModSrc',
      units: undefined,
      normalize: undefined,
    },
    shape2DModDepth: {
      name: 'Shape2: D_ModDepth',
      units: undefined,
      normalize: undefined,
    },
    shape2Edge: {
      name: 'Shape2: Edge',
      units: undefined,
      normalize: undefined,
    },
    shape2EdgeModSrc: {
      name: 'Shape2: Edge ModSrc',
      units: undefined,
      normalize: undefined,
    },
    shape2EdgeModDepth: {
      name: 'Shape2: Edge ModDepth',
      units: undefined,
      normalize: undefined,
    },
    shape2Input: {
      name: 'Shape2: Input',
      units: undefined,
      normalize: undefined,
    },
    shape2Output: {
      name: 'Shape2: Output',
      units: undefined,
      normalize: undefined,
    },
    shape2HiOut: {
      name: 'Shape2: HiOut',
      units: undefined,
      normalize: undefined,
    },
    mix1Pan: {
      name: 'Mix1: Pan',
      units: undefined,
      normalize: undefined,
    },
    mix1Mix: {
      name: 'Mix1: Mix',
      units: undefined,
      normalize: undefined,
    },
    mix1PanMode: {
      name: 'Mix1: Pan Mode',
      units: undefined,
      normalize: undefined,
    },
    mix1PanModDepth: {
      name: 'Mix1: PanMod Depth',
      units: undefined,
      normalize: undefined,
    },
    mix1PanModSource: {
      name: 'Mix1: PanMod Source',
      units: undefined,
      normalize: undefined,
    },
    mix2Pan: {
      name: 'Mix2: Pan',
      units: undefined,
      normalize: undefined,
    },
    mix2Mix: {
      name: 'Mix2: Mix',
      units: undefined,
      normalize: undefined,
    },
    mix2PanMode: {
      name: 'Mix2: Pan Mode',
      units: undefined,
      normalize: undefined,
    },
    mix2PanModDepth: {
      name: 'Mix2: PanMod Depth',
      units: undefined,
      normalize: undefined,
    },
    mix2PanModSource: {
      name: 'Mix2: PanMod Source',
      units: undefined,
      normalize: undefined,
    },
    mix3Pan: {
      name: 'Mix3: Pan',
      units: undefined,
      normalize: undefined,
    },
    mix3Mix: {
      name: 'Mix3: Mix',
      units: undefined,
      normalize: undefined,
    },
    mix3PanMode: {
      name: 'Mix3: Pan Mode',
      units: undefined,
      normalize: undefined,
    },
    mix3PanModDepth: {
      name: 'Mix3: PanMod Depth',
      units: undefined,
      normalize: undefined,
    },
    mix3PanModSource: {
      name: 'Mix3: PanMod Source',
      units: undefined,
      normalize: undefined,
    },
    mix4Pan: {
      name: 'Mix4: Pan',
      units: undefined,
      normalize: undefined,
    },
    mix4Mix: {
      name: 'Mix4: Mix',
      units: undefined,
      normalize: undefined,
    },
    mix4PanMode: {
      name: 'Mix4: Pan Mode',
      units: undefined,
      normalize: undefined,
    },
    mix4PanModDepth: {
      name: 'Mix4: PanMod Depth',
      units: undefined,
      normalize: undefined,
    },
    mix4PanModSource: {
      name: 'Mix4: PanMod Source',
      units: undefined,
      normalize: undefined,
    },
    xmf1Type: {
      name: 'XMF1: Type',
      units: undefined,
      normalize: undefined,
    },
    xmf1Cutoff: {
      name: 'XMF1: Cutoff',
      units: undefined,
      normalize: undefined,
    },
    xmf1Resonance: {
      name: 'XMF1: Resonance',
      units: undefined,
      normalize: undefined,
    },
    xmf1FreqMod1: {
      name: 'XMF1: Freq mod 1',
      units: undefined,
      normalize: undefined,
    },
    xmf1FreqMod2: {
      name: 'XMF1: Freq mod 2',
      units: undefined,
      normalize: undefined,
    },
    xmf1KeyFollow: {
      name: 'XMF1: KeyFollow',
      units: undefined,
      normalize: undefined,
    },
    xmf1FreqOffset: {
      name: 'XMF1: FreqOffset',
      units: undefined,
      normalize: undefined,
    },
    xmf1FreqOffMod: {
      name: 'XMF1: FreqOffMod',
      units: undefined,
      normalize: undefined,
    },
    xmf1FilterFM: {
      name: 'XMF1: FilterFM',
      units: undefined,
      normalize: undefined,
    },
    xmf1Xfmmod: {
      name: 'XMF1: XFMmod',
      units: undefined,
      normalize: undefined,
    },
    xmf1Overload: {
      name: 'XMF1: Overload',
      units: undefined,
      normalize: undefined,
    },
    xmf1Click: {
      name: 'XMF1: Click',
      units: undefined,
      normalize: undefined,
    },
    xmf2Type: {
      name: 'XMF2: Type',
      units: undefined,
      normalize: undefined,
    },
    xmf2Cutoff: {
      name: 'XMF2: Cutoff',
      units: undefined,
      normalize: undefined,
    },
    xmf2Resonance: {
      name: 'XMF2: Resonance',
      units: undefined,
      normalize: undefined,
    },
    xmf2FreqMod1: {
      name: 'XMF2: Freq mod 1',
      units: undefined,
      normalize: undefined,
    },
    xmf2FreqMod2: {
      name: 'XMF2: Freq mod 2',
      units: undefined,
      normalize: undefined,
    },
    xmf2KeyFollow: {
      name: 'XMF2: KeyFollow',
      units: undefined,
      normalize: undefined,
    },
    xmf2FreqOffset: {
      name: 'XMF2: FreqOffset',
      units: undefined,
      normalize: undefined,
    },
    xmf2FreqOffMod: {
      name: 'XMF2: FreqOffMod',
      units: undefined,
      normalize: undefined,
    },
    xmf2FilterFM: {
      name: 'XMF2: FilterFM',
      units: undefined,
      normalize: undefined,
    },
    xmf2Xfmmod: {
      name: 'XMF2: XFMmod',
      units: undefined,
      normalize: undefined,
    },
    xmf2Overload: {
      name: 'XMF2: Overload',
      units: undefined,
      normalize: undefined,
    },
    xmf2Click: {
      name: 'XMF2: Click',
      units: undefined,
      normalize: undefined,
    },
    modFX1Center: {
      name: 'ModFX1: Center',
      units: undefined,
      normalize: undefined,
    },
    modFX1Speed: {
      name: 'ModFX1: Speed',
      units: undefined,
      normalize: undefined,
    },
    modFX1Stereo: {
      name: 'ModFX1: Stereo',
      units: undefined,
      normalize: undefined,
    },
    modFX1Depth: {
      name: 'ModFX1: Depth',
      units: undefined,
      normalize: undefined,
    },
    modFX1Feedback: {
      name: 'ModFX1: Feedback',
      units: undefined,
      normalize: undefined,
    },
    modFX1Mix: {
      name: 'ModFX1: Mix',
      units: undefined,
      normalize: undefined,
    },
    modFX1LowCutFreq: {
      name: 'ModFX1: LowCut Freq',
      units: undefined,
      normalize: undefined,
    },
    modFX1HiCutFreq: {
      name: 'ModFX1: HiCut Freq',
      units: undefined,
      normalize: undefined,
    },
    modFX1Quad: {
      name: 'ModFX1: Quad',
      units: undefined,
      normalize: undefined,
    },
    modFX1QuadPhase: {
      name: 'ModFX1: QuadPhase',
      units: undefined,
      normalize: undefined,
    },
    modFX1LowBoostDb: {
      name: 'ModFX1: Low Boost dB',
      units: undefined,
      normalize: undefined,
    },
    modFX1HighBoostDb: {
      name: 'ModFX1: High Boost dB',
      units: undefined,
      normalize: undefined,
    },
    modFX2Center: {
      name: 'ModFX2: Center',
      units: undefined,
      normalize: undefined,
    },
    modFX2Speed: {
      name: 'ModFX2: Speed',
      units: undefined,
      normalize: undefined,
    },
    modFX2Stereo: {
      name: 'ModFX2: Stereo',
      units: undefined,
      normalize: undefined,
    },
    modFX2Depth: {
      name: 'ModFX2: Depth',
      units: undefined,
      normalize: undefined,
    },
    modFX2Feedback: {
      name: 'ModFX2: Feedback',
      units: undefined,
      normalize: undefined,
    },
    modFX2Mix: {
      name: 'ModFX2: Mix',
      units: undefined,
      normalize: undefined,
    },
    modFX2LowCutFreq: {
      name: 'ModFX2: LowCut Freq',
      units: undefined,
      normalize: undefined,
    },
    modFX2HiCutFreq: {
      name: 'ModFX2: HiCut Freq',
      units: undefined,
      normalize: undefined,
    },
    modFX2Quad: {
      name: 'ModFX2: Quad',
      units: undefined,
      normalize: undefined,
    },
    modFX2QuadPhase: {
      name: 'ModFX2: QuadPhase',
      units: undefined,
      normalize: undefined,
    },
    modFX2LowBoostDb: {
      name: 'ModFX2: Low Boost dB',
      units: undefined,
      normalize: undefined,
    },
    modFX2HighBoostDb: {
      name: 'ModFX2: High Boost dB',
      units: undefined,
      normalize: undefined,
    },
    delay1Mix: {
      name: 'Delay1: Mix',
      units: undefined,
      normalize: undefined,
    },
    delay1Feedback: {
      name: 'Delay1: Feedback',
      units: undefined,
      normalize: undefined,
    },
    delay1XBack: {
      name: 'Delay1: X-back',
      units: undefined,
      normalize: undefined,
    },
    delay1Lowpass: {
      name: 'Delay1: Lowpass',
      units: undefined,
      normalize: undefined,
    },
    delay1Hipass: {
      name: 'Delay1: Hipass',
      units: undefined,
      normalize: undefined,
    },
    delay2Mix: {
      name: 'Delay2: Mix',
      units: undefined,
      normalize: undefined,
    },
    delay2Feedback: {
      name: 'Delay2: Feedback',
      units: undefined,
      normalize: undefined,
    },
    delay2XBack: {
      name: 'Delay2: X-back',
      units: undefined,
      normalize: undefined,
    },
    delay2Lowpass: {
      name: 'Delay2: Lowpass',
      units: undefined,
      normalize: undefined,
    },
    delay2Hipass: {
      name: 'Delay2: Hipass',
      units: undefined,
      normalize: undefined,
    },
    shape3Depth: {
      name: 'Shape3: Depth',
      units: undefined,
      normalize: undefined,
    },
    shape3DModSrc: {
      name: 'Shape3: D_ModSrc',
      units: undefined,
      normalize: undefined,
    },
    shape3DModDepth: {
      name: 'Shape3: D_ModDepth',
      units: undefined,
      normalize: undefined,
    },
    shape3Edge: {
      name: 'Shape3: Edge',
      units: undefined,
      normalize: undefined,
    },
    shape3EdgeModSrc: {
      name: 'Shape3: Edge ModSrc',
      units: undefined,
      normalize: undefined,
    },
    shape3EdgeModDepth: {
      name: 'Shape3: Edge ModDepth',
      units: undefined,
      normalize: undefined,
    },
    shape3Input: {
      name: 'Shape3: Input',
      units: undefined,
      normalize: undefined,
    },
    shape3Output: {
      name: 'Shape3: Output',
      units: undefined,
      normalize: undefined,
    },
    shape3HiOut: {
      name: 'Shape3: HiOut',
      units: undefined,
      normalize: undefined,
    },
    shape4Depth: {
      name: 'Shape4: Depth',
      units: undefined,
      normalize: undefined,
    },
    shape4DModSrc: {
      name: 'Shape4: D_ModSrc',
      units: undefined,
      normalize: undefined,
    },
    shape4DModDepth: {
      name: 'Shape4: D_ModDepth',
      units: undefined,
      normalize: undefined,
    },
    shape4Edge: {
      name: 'Shape4: Edge',
      units: undefined,
      normalize: undefined,
    },
    shape4EdgeModSrc: {
      name: 'Shape4: Edge ModSrc',
      units: undefined,
      normalize: undefined,
    },
    shape4EdgeModDepth: {
      name: 'Shape4: Edge ModDepth',
      units: undefined,
      normalize: undefined,
    },
    shape4Input: {
      name: 'Shape4: Input',
      units: undefined,
      normalize: undefined,
    },
    shape4Output: {
      name: 'Shape4: Output',
      units: undefined,
      normalize: undefined,
    },
    shape4HiOut: {
      name: 'Shape4: HiOut',
      units: undefined,
      normalize: undefined,
    },
    mix5Pan: {
      name: 'Mix5: Pan',
      units: undefined,
      normalize: undefined,
    },
    mix5Mix: {
      name: 'Mix5: Mix',
      units: undefined,
      normalize: undefined,
    },
    mix5PanMode: {
      name: 'Mix5: Pan Mode',
      units: undefined,
      normalize: undefined,
    },
    mix5PanModDepth: {
      name: 'Mix5: PanMod Depth',
      units: undefined,
      normalize: undefined,
    },
    mix5PanModSource: {
      name: 'Mix5: PanMod Source',
      units: undefined,
      normalize: undefined,
    },
    mix6Pan: {
      name: 'Mix6: Pan',
      units: undefined,
      normalize: undefined,
    },
    mix6Mix: {
      name: 'Mix6: Mix',
      units: undefined,
      normalize: undefined,
    },
    mix6PanMode: {
      name: 'Mix6: Pan Mode',
      units: undefined,
      normalize: undefined,
    },
    mix6PanModDepth: {
      name: 'Mix6: PanMod Depth',
      units: undefined,
      normalize: undefined,
    },
    mix6PanModSource: {
      name: 'Mix6: PanMod Source',
      units: undefined,
      normalize: undefined,
    },
    rev1Dry: {
      name: 'Rev1: Dry',
      units: undefined,
      normalize: undefined,
    },
    rev1Wet: {
      name: 'Rev1: Wet',
      units: undefined,
      normalize: undefined,
    },
    rev1Feedback: {
      name: 'Rev1: Feedback',
      units: undefined,
      normalize: undefined,
    },
    rev1Damp: {
      name: 'Rev1: Damp',
      units: undefined,
      normalize: undefined,
    },
    rev1Range: {
      name: 'Rev1: Range',
      units: undefined,
      normalize: undefined,
    },
    rev1Speed: {
      name: 'Rev1: Speed',
      units: undefined,
      normalize: undefined,
    },
    rev1Modulation: {
      name: 'Rev1: Modulation',
      units: undefined,
      normalize: undefined,
    },
    rev1DiffFeedback: {
      name: 'Rev1: Diff Feedback',
      units: undefined,
      normalize: undefined,
    },
    rev1DiffRange: {
      name: 'Rev1: Diff Range',
      units: undefined,
      normalize: undefined,
    },
    rev1DiffMix: {
      name: 'Rev1: Diff Mix',
      units: undefined,
      normalize: undefined,
    },
    rev1DiffMod: {
      name: 'Rev1: Diff Mod',
      units: undefined,
      normalize: undefined,
    },
    rev1DiffSpeed: {
      name: 'Rev1: Diff Speed',
      units: undefined,
      normalize: undefined,
    },
    comp1Compression: {
      name: 'Comp1: Compression',
      units: undefined,
      normalize: undefined,
    },
    comp1Threshold: {
      name: 'Comp1: Threshold',
      units: undefined,
      normalize: undefined,
    },
    comp1Attack: {
      name: 'Comp1: Attack',
      units: undefined,
      normalize: undefined,
    },
    comp1Release: {
      name: 'Comp1: Release',
      units: undefined,
      normalize: undefined,
    },
    comp1Input: {
      name: 'Comp1: Input',
      units: undefined,
      normalize: undefined,
    },
    comp1Output: {
      name: 'Comp1: Output',
      units: undefined,
      normalize: undefined,
    },
    comp2Compression: {
      name: 'Comp2: Compression',
      units: undefined,
      normalize: undefined,
    },
    comp2Threshold: {
      name: 'Comp2: Threshold',
      units: undefined,
      normalize: undefined,
    },
    comp2Attack: {
      name: 'Comp2: Attack',
      units: undefined,
      normalize: undefined,
    },
    comp2Release: {
      name: 'Comp2: Release',
      units: undefined,
      normalize: undefined,
    },
    comp2Input: {
      name: 'Comp2: Input',
      units: undefined,
      normalize: undefined,
    },
    comp2Output: {
      name: 'Comp2: Output',
      units: undefined,
      normalize: undefined,
    },
    eq1FreqLowShelf: {
      name: 'EQ1: Freq LowShelf',
      units: undefined,
      normalize: undefined,
    },
    eq1QLowShelf: {
      name: 'EQ1: Q LowShelf',
      units: undefined,
      normalize: undefined,
    },
    eq1GainLowShelf: {
      name: 'EQ1: Gain LowShelf',
      units: undefined,
      normalize: undefined,
    },
    eq1FreqMid1: {
      name: 'EQ1: Freq Mid1',
      units: undefined,
      normalize: undefined,
    },
    eq1QMid1: {
      name: 'EQ1: Q Mid1',
      units: undefined,
      normalize: undefined,
    },
    eq1GainMid1: {
      name: 'EQ1: Gain Mid1',
      units: undefined,
      normalize: undefined,
    },
    eq1FreqMid2: {
      name: 'EQ1: Freq Mid2',
      units: undefined,
      normalize: undefined,
    },
    eq1QMid2: {
      name: 'EQ1: Q Mid2',
      units: undefined,
      normalize: undefined,
    },
    eq1GainMid2: {
      name: 'EQ1: Gain Mid2',
      units: undefined,
      normalize: undefined,
    },
    eq1FreqHiShelf: {
      name: 'EQ1: Freq HiShelf',
      units: undefined,
      normalize: undefined,
    },
    eq1QHiShelf: {
      name: 'EQ1: Q HiShelf',
      units: undefined,
      normalize: undefined,
    },
    eq1GainHiShelf: {
      name: 'EQ1: Gain HiShelf',
      units: undefined,
      normalize: undefined,
    },
    eq2FreqLowShelf: {
      name: 'EQ2: Freq LowShelf',
      units: undefined,
      normalize: undefined,
    },
    eq2QLowShelf: {
      name: 'EQ2: Q LowShelf',
      units: undefined,
      normalize: undefined,
    },
    eq2GainLowShelf: {
      name: 'EQ2: Gain LowShelf',
      units: undefined,
      normalize: undefined,
    },
    eq2FreqMid1: {
      name: 'EQ2: Freq Mid1',
      units: undefined,
      normalize: undefined,
    },
    eq2QMid1: {
      name: 'EQ2: Q Mid1',
      units: undefined,
      normalize: undefined,
    },
    eq2GainMid1: {
      name: 'EQ2: Gain Mid1',
      units: undefined,
      normalize: undefined,
    },
    eq2FreqMid2: {
      name: 'EQ2: Freq Mid2',
      units: undefined,
      normalize: undefined,
    },
    eq2QMid2: {
      name: 'EQ2: Q Mid2',
      units: undefined,
      normalize: undefined,
    },
    eq2GainMid2: {
      name: 'EQ2: Gain Mid2',
      units: undefined,
      normalize: undefined,
    },
    eq2FreqHiShelf: {
      name: 'EQ2: Freq HiShelf',
      units: undefined,
      normalize: undefined,
    },
    eq2QHiShelf: {
      name: 'EQ2: Q HiShelf',
      units: undefined,
      normalize: undefined,
    },
    eq2GainHiShelf: {
      name: 'EQ2: Gain HiShelf',
      units: undefined,
      normalize: undefined,
    },
    vcf5Type: {
      name: 'VCF5: Type',
      units: undefined,
      normalize: undefined,
    },
    vcf5Cutoff: {
      name: 'VCF5: Cutoff',
      units: undefined,
      normalize: undefined,
    },
    vcf5Resonance: {
      name: 'VCF5: Resonance',
      units: undefined,
      normalize: undefined,
    },
    vcf5Drive: {
      name: 'VCF5: Drive',
      units: undefined,
      normalize: undefined,
    },
    vcf5Gain: {
      name: 'VCF5: Gain',
      units: undefined,
      normalize: undefined,
    },
    vcf5ModDepth1: {
      name: 'VCF5: ModDepth1',
      units: undefined,
      normalize: undefined,
    },
    vcf5ModDepth2: {
      name: 'VCF5: ModDepth2',
      units: undefined,
      normalize: undefined,
    },
    vcf5KeyFollow: {
      name: 'VCF5: KeyFollow',
      units: undefined,
      normalize: undefined,
    },
    vcf6Type: {
      name: 'VCF6: Type',
      units: undefined,
      normalize: undefined,
    },
    vcf6Cutoff: {
      name: 'VCF6: Cutoff',
      units: undefined,
      normalize: undefined,
    },
    vcf6Resonance: {
      name: 'VCF6: Resonance',
      units: undefined,
      normalize: undefined,
    },
    vcf6Drive: {
      name: 'VCF6: Drive',
      units: undefined,
      normalize: undefined,
    },
    vcf6Gain: {
      name: 'VCF6: Gain',
      units: undefined,
      normalize: undefined,
    },
    vcf6ModDepth1: {
      name: 'VCF6: ModDepth1',
      units: undefined,
      normalize: undefined,
    },
    vcf6ModDepth2: {
      name: 'VCF6: ModDepth2',
      units: undefined,
      normalize: undefined,
    },
    vcf6KeyFollow: {
      name: 'VCF6: KeyFollow',
      units: undefined,
      normalize: undefined,
    },
    sb1Frequency: {
      name: 'SB1: Frequency',
      units: undefined,
      normalize: undefined,
    },
    sb1Fmodsource: {
      name: 'SB1: FModSource',
      units: undefined,
      normalize: undefined,
    },
    sb1Fmoddepth: {
      name: 'SB1: FModDepth',
      units: undefined,
      normalize: undefined,
    },
    sb1Offset: {
      name: 'SB1: Offset',
      units: undefined,
      normalize: undefined,
    },
    sb1Omodsource: {
      name: 'SB1: OModSource',
      units: undefined,
      normalize: undefined,
    },
    sb1Omoddepth: {
      name: 'SB1: OModDepth',
      units: undefined,
      normalize: undefined,
    },
    sb1Mix: {
      name: 'SB1: Mix',
      units: undefined,
      normalize: undefined,
    },
    sb1Mmodsource: {
      name: 'SB1: MModSource',
      units: undefined,
      normalize: undefined,
    },
    sb1Mmoddepth: {
      name: 'SB1: MModDepth',
      units: undefined,
      normalize: undefined,
    },
    sb2Frequency: {
      name: 'SB2: Frequency',
      units: undefined,
      normalize: undefined,
    },
    sb2Fmodsource: {
      name: 'SB2: FModSource',
      units: undefined,
      normalize: undefined,
    },
    sb2Fmoddepth: {
      name: 'SB2: FModDepth',
      units: undefined,
      normalize: undefined,
    },
    sb2Offset: {
      name: 'SB2: Offset',
      units: undefined,
      normalize: undefined,
    },
    sb2Omodsource: {
      name: 'SB2: OModSource',
      units: undefined,
      normalize: undefined,
    },
    sb2Omoddepth: {
      name: 'SB2: OModDepth',
      units: undefined,
      normalize: undefined,
    },
    sb2Mix: {
      name: 'SB2: Mix',
      units: undefined,
      normalize: undefined,
    },
    sb2Mmodsource: {
      name: 'SB2: MModSource',
      units: undefined,
      normalize: undefined,
    },
    sb2Mmoddepth: {
      name: 'SB2: MModDepth',
      units: undefined,
      normalize: undefined,
    },
    sb3Frequency: {
      name: 'SB3: Frequency',
      units: undefined,
      normalize: undefined,
    },
    sb3Fmodsource: {
      name: 'SB3: FModSource',
      units: undefined,
      normalize: undefined,
    },
    sb3Fmoddepth: {
      name: 'SB3: FModDepth',
      units: undefined,
      normalize: undefined,
    },
    sb3Offset: {
      name: 'SB3: Offset',
      units: undefined,
      normalize: undefined,
    },
    sb3Omodsource: {
      name: 'SB3: OModSource',
      units: undefined,
      normalize: undefined,
    },
    sb3Omoddepth: {
      name: 'SB3: OModDepth',
      units: undefined,
      normalize: undefined,
    },
    sb3Mix: {
      name: 'SB3: Mix',
      units: undefined,
      normalize: undefined,
    },
    sb3Mmodsource: {
      name: 'SB3: MModSource',
      units: undefined,
      normalize: undefined,
    },
    sb3Mmoddepth: {
      name: 'SB3: MModDepth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix5Source: {
      name: 'PCore: Matrix5 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix5Depth: {
      name: 'PCore: Matrix5 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix5ViaSrc: {
      name: 'PCore: Matrix5 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix5Via: {
      name: 'PCore: Matrix5 Via',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix6Source: {
      name: 'PCore: Matrix6 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix6Depth: {
      name: 'PCore: Matrix6 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix6ViaSrc: {
      name: 'PCore: Matrix6 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix6Via: {
      name: 'PCore: Matrix6 Via',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix7Source: {
      name: 'PCore: Matrix7 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix7Depth: {
      name: 'PCore: Matrix7 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix7ViaSrc: {
      name: 'PCore: Matrix7 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix7Via: {
      name: 'PCore: Matrix7 Via',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix8Source: {
      name: 'PCore: Matrix8 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix8Depth: {
      name: 'PCore: Matrix8 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix8ViaSrc: {
      name: 'PCore: Matrix8 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix8Via: {
      name: 'PCore: Matrix8 Via',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix9Source: {
      name: 'PCore: Matrix9 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix9Depth: {
      name: 'PCore: Matrix9 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix9ViaSrc: {
      name: 'PCore: Matrix9 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix9Via: {
      name: 'PCore: Matrix9 Via',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix10Source: {
      name: 'PCore: Matrix10 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix10Depth: {
      name: 'PCore: Matrix10 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix10ViaSrc: {
      name: 'PCore: Matrix10 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix10Via: {
      name: 'PCore: Matrix10 Via',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix11Source: {
      name: 'PCore: Matrix11 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix11Depth: {
      name: 'PCore: Matrix11 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix11ViaSrc: {
      name: 'PCore: Matrix11 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix11Via: {
      name: 'PCore: Matrix11 Via',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix12Source: {
      name: 'PCore: Matrix12 Source',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix12Depth: {
      name: 'PCore: Matrix12 Depth',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix12ViaSrc: {
      name: 'PCore: Matrix12 ViaSrc',
      units: undefined,
      normalize: undefined,
    },
    pcoreMatrix12Via: {
      name: 'PCore: Matrix12 Via',
      units: undefined,
      normalize: undefined,
    },
    xmf3Type: {
      name: 'XMF3: Type',
      units: undefined,
      normalize: undefined,
    },
    xmf3Cutoff: {
      name: 'XMF3: Cutoff',
      units: undefined,
      normalize: undefined,
    },
    xmf3Resonance: {
      name: 'XMF3: Resonance',
      units: undefined,
      normalize: undefined,
    },
    xmf3FreqMod1: {
      name: 'XMF3: Freq mod 1',
      units: undefined,
      normalize: undefined,
    },
    xmf3FreqMod2: {
      name: 'XMF3: Freq mod 2',
      units: undefined,
      normalize: undefined,
    },
    xmf3KeyFollow: {
      name: 'XMF3: KeyFollow',
      units: undefined,
      normalize: undefined,
    },
    xmf3FreqOffset: {
      name: 'XMF3: FreqOffset',
      units: undefined,
      normalize: undefined,
    },
    xmf3FreqOffMod: {
      name: 'XMF3: FreqOffMod',
      units: undefined,
      normalize: undefined,
    },
    xmf3FilterFM: {
      name: 'XMF3: FilterFM',
      units: undefined,
      normalize: undefined,
    },
    xmf3Xfmmod: {
      name: 'XMF3: XFMmod',
      units: undefined,
      normalize: undefined,
    },
    xmf3Overload: {
      name: 'XMF3: Overload',
      units: undefined,
      normalize: undefined,
    },
    xmf3Click: {
      name: 'XMF3: Click',
      units: undefined,
      normalize: undefined,
    },
    dist1Type: {
      name: 'Dist1: Type',
      units: undefined,
      normalize: undefined,
    },
    dist1Input: {
      name: 'Dist1: Input',
      units: undefined,
      normalize: undefined,
    },
    dist1Output: {
      name: 'Dist1: Output',
      units: undefined,
      normalize: undefined,
    },
    dist1PreTilt: {
      name: 'Dist1: Pre Tilt',
      units: undefined,
      normalize: undefined,
    },
    dist1PostTilt: {
      name: 'Dist1: Post Tilt',
      units: undefined,
      normalize: undefined,
    },
    dist1CenterFreq: {
      name: 'Dist1: Center Freq',
      units: undefined,
      normalize: undefined,
    },
    dist1Low: {
      name: 'Dist1: Low',
      units: undefined,
      normalize: undefined,
    },
    dist1High: {
      name: 'Dist1: High',
      units: undefined,
      normalize: undefined,
    },
    dist1PostFilter: {
      name: 'Dist1: Post Filter',
      units: undefined,
      normalize: undefined,
    },
    dist2Type: {
      name: 'Dist2: Type',
      units: undefined,
      normalize: undefined,
    },
    dist2Input: {
      name: 'Dist2: Input',
      units: undefined,
      normalize: undefined,
    },
    dist2Output: {
      name: 'Dist2: Output',
      units: undefined,
      normalize: undefined,
    },
    dist2PreTilt: {
      name: 'Dist2: Pre Tilt',
      units: undefined,
      normalize: undefined,
    },
    dist2PostTilt: {
      name: 'Dist2: Post Tilt',
      units: undefined,
      normalize: undefined,
    },
    dist2CenterFreq: {
      name: 'Dist2: Center Freq',
      units: undefined,
      normalize: undefined,
    },
    dist2Low: {
      name: 'Dist2: Low',
      units: undefined,
      normalize: undefined,
    },
    dist2High: {
      name: 'Dist2: High',
      units: undefined,
      normalize: undefined,
    },
    dist2PostFilter: {
      name: 'Dist2: Post Filter',
      units: undefined,
      normalize: undefined,
    },
    dist3Type: {
      name: 'Dist3: Type',
      units: undefined,
      normalize: undefined,
    },
    dist3Input: {
      name: 'Dist3: Input',
      units: undefined,
      normalize: undefined,
    },
    dist3Output: {
      name: 'Dist3: Output',
      units: undefined,
      normalize: undefined,
    },
    dist3PreTilt: {
      name: 'Dist3: Pre Tilt',
      units: undefined,
      normalize: undefined,
    },
    dist3PostTilt: {
      name: 'Dist3: Post Tilt',
      units: undefined,
      normalize: undefined,
    },
    dist3CenterFreq: {
      name: 'Dist3: Center Freq',
      units: undefined,
      normalize: undefined,
    },
    dist3Low: {
      name: 'Dist3: Low',
      units: undefined,
      normalize: undefined,
    },
    dist3High: {
      name: 'Dist3: High',
      units: undefined,
      normalize: undefined,
    },
    dist3PostFilter: {
      name: 'Dist3: Post Filter',
      units: undefined,
      normalize: undefined,
    },
    dist4Type: {
      name: 'Dist4: Type',
      units: undefined,
      normalize: undefined,
    },
    dist4Input: {
      name: 'Dist4: Input',
      units: undefined,
      normalize: undefined,
    },
    dist4Output: {
      name: 'Dist4: Output',
      units: undefined,
      normalize: undefined,
    },
    dist4PreTilt: {
      name: 'Dist4: Pre Tilt',
      units: undefined,
      normalize: undefined,
    },
    dist4PostTilt: {
      name: 'Dist4: Post Tilt',
      units: undefined,
      normalize: undefined,
    },
    dist4CenterFreq: {
      name: 'Dist4: Center Freq',
      units: undefined,
      normalize: undefined,
    },
    dist4Low: {
      name: 'Dist4: Low',
      units: undefined,
      normalize: undefined,
    },
    dist4High: {
      name: 'Dist4: High',
      units: undefined,
      normalize: undefined,
    },
    dist4PostFilter: {
      name: 'Dist4: Post Filter',
      units: undefined,
      normalize: undefined,
    },
    fold1Ripples: {
      name: 'Fold1: Ripples',
      units: undefined,
      normalize: undefined,
    },
    fold1Folds: {
      name: 'Fold1: Folds',
      units: undefined,
      normalize: undefined,
    },
    fold1FoldMod: {
      name: 'Fold1: Fold Mod',
      units: undefined,
      normalize: undefined,
    },
    fold1FoldModSource: {
      name: 'Fold1: Fold ModSource',
      units: undefined,
      normalize: undefined,
    },
    fold1Bias: {
      name: 'Fold1: Bias',
      units: undefined,
      normalize: undefined,
    },
    fold1BiasMod: {
      name: 'Fold1: Bias Mod',
      units: undefined,
      normalize: undefined,
    },
    fold1BiasModSource: {
      name: 'Fold1: Bias ModSource',
      units: undefined,
      normalize: undefined,
    },
    fold1FoldRatio: {
      name: 'Fold1: FoldRatio',
      units: undefined,
      normalize: undefined,
    },
    fold1FoldSlope: {
      name: 'Fold1: FoldSlope',
      units: undefined,
      normalize: undefined,
    },
    fold1ClipAngle: {
      name: 'Fold1: Clip Angle',
      units: undefined,
      normalize: undefined,
    },
    fold2Ripples: {
      name: 'Fold2: Ripples',
      units: undefined,
      normalize: undefined,
    },
    fold2Folds: {
      name: 'Fold2: Folds',
      units: undefined,
      normalize: undefined,
    },
    fold2FoldMod: {
      name: 'Fold2: Fold Mod',
      units: undefined,
      normalize: undefined,
    },
    fold2FoldModSource: {
      name: 'Fold2: Fold ModSource',
      units: undefined,
      normalize: undefined,
    },
    fold2Bias: {
      name: 'Fold2: Bias',
      units: undefined,
      normalize: undefined,
    },
    fold2BiasMod: {
      name: 'Fold2: Bias Mod',
      units: undefined,
      normalize: undefined,
    },
    fold2BiasModSource: {
      name: 'Fold2: Bias ModSource',
      units: undefined,
      normalize: undefined,
    },
    fold2FoldRatio: {
      name: 'Fold2: FoldRatio',
      units: undefined,
      normalize: undefined,
    },
    fold2FoldSlope: {
      name: 'Fold2: FoldSlope',
      units: undefined,
      normalize: undefined,
    },
    fold2ClipAngle: {
      name: 'Fold2: Clip Angle',
      units: undefined,
      normalize: undefined,
    },
    vca1Pan1: {
      name: 'VCA1: Pan1',
      units: undefined,
      normalize: undefined,
    },
    vca1PanModSrc1: {
      name: 'VCA1: Pan Mod Src1',
      units: undefined,
      normalize: undefined,
    },
    vca1PanModDpt1: {
      name: 'VCA1: Pan Mod Dpt1',
      units: undefined,
      normalize: undefined,
    },
    vca1Volume1: {
      name: 'VCA1: Volume1',
      units: undefined,
      normalize: undefined,
    },
    vca1Vca1: {
      name: 'VCA1: VCA1',
      units: undefined,
      normalize: undefined,
    },
    vca1Modulation1: {
      name: 'VCA1: Modulation1',
      units: undefined,
      normalize: undefined,
    },
    vca1ModDepth1: {
      name: 'VCA1: Mod Depth1',
      units: undefined,
      normalize: undefined,
    },
    vca1Pan2: {
      name: 'VCA1: Pan2',
      units: undefined,
      normalize: undefined,
    },
    vca1PanModSrc2: {
      name: 'VCA1: Pan Mod Src2',
      units: undefined,
      normalize: undefined,
    },
    vca1PanModDpt2: {
      name: 'VCA1: Pan Mod Dpt2',
      units: undefined,
      normalize: undefined,
    },
    vca1Volume2: {
      name: 'VCA1: Volume2',
      units: undefined,
      normalize: undefined,
    },
    vca1Vca2: {
      name: 'VCA1: VCA2',
      units: undefined,
      normalize: undefined,
    },
    vca1Modulation2: {
      name: 'VCA1: Modulation2',
      units: undefined,
      normalize: undefined,
    },
    vca1ModDepth2: {
      name: 'VCA1: Mod Depth2',
      units: undefined,
      normalize: undefined,
    },
    vca1Pan3: {
      name: 'VCA1: Pan3',
      units: undefined,
      normalize: undefined,
    },
    vca1PanModSrc3: {
      name: 'VCA1: Pan Mod Src3',
      units: undefined,
      normalize: undefined,
    },
    vca1PanModDpt3: {
      name: 'VCA1: Pan Mod Dpt3',
      units: undefined,
      normalize: undefined,
    },
    vca1Volume3: {
      name: 'VCA1: Volume3',
      units: undefined,
      normalize: undefined,
    },
    vca1Vca3: {
      name: 'VCA1: VCA3',
      units: undefined,
      normalize: undefined,
    },
    vca1Modulation3: {
      name: 'VCA1: Modulation3',
      units: undefined,
      normalize: undefined,
    },
    vca1ModDepth3: {
      name: 'VCA1: Mod Depth3',
      units: undefined,
      normalize: undefined,
    },
    vca1Pan4: {
      name: 'VCA1: Pan4',
      units: undefined,
      normalize: undefined,
    },
    vca1PanModSrc4: {
      name: 'VCA1: Pan Mod Src4',
      units: undefined,
      normalize: undefined,
    },
    vca1PanModDpt4: {
      name: 'VCA1: Pan Mod Dpt4',
      units: undefined,
      normalize: undefined,
    },
    vca1Volume4: {
      name: 'VCA1: Volume4',
      units: undefined,
      normalize: undefined,
    },
    vca1Vca4: {
      name: 'VCA1: VCA4',
      units: undefined,
      normalize: undefined,
    },
    vca1Modulation4: {
      name: 'VCA1: Modulation4',
      units: undefined,
      normalize: undefined,
    },
    vca1ModDepth4: {
      name: 'VCA1: Mod Depth4',
      units: undefined,
      normalize: undefined,
    },
    vca1Mute1: {
      name: 'VCA1: Mute1',
      units: undefined,
      normalize: undefined,
    },
    vca1Mute2: {
      name: 'VCA1: Mute2',
      units: undefined,
      normalize: undefined,
    },
    vca1Mute3: {
      name: 'VCA1: Mute3',
      units: undefined,
      normalize: undefined,
    },
    vca1Mute4: {
      name: 'VCA1: Mute4',
      units: undefined,
      normalize: undefined,
    },
    vca1Panning1: {
      name: 'VCA1: Panning1',
      units: undefined,
      normalize: undefined,
    },
    vca1Panning2: {
      name: 'VCA1: Panning2',
      units: undefined,
      normalize: undefined,
    },
    vca1Panning3: {
      name: 'VCA1: Panning3',
      units: undefined,
      normalize: undefined,
    },
    vca1Panning4: {
      name: 'VCA1: Panning4',
      units: undefined,
      normalize: undefined,
    },
    vca1Bus1: {
      name: 'VCA1: Bus1',
      units: undefined,
      normalize: undefined,
    },
    vca1Bus2: {
      name: 'VCA1: Bus2',
      units: undefined,
      normalize: undefined,
    },
    vca1Bus3: {
      name: 'VCA1: Bus3',
      units: undefined,
      normalize: undefined,
    },
    vca1Bus4: {
      name: 'VCA1: Bus4',
      units: undefined,
      normalize: undefined,
    },
    vca1Send1: {
      name: 'VCA1: Send1',
      units: undefined,
      normalize: undefined,
    },
    vca1SendMod1: {
      name: 'VCA1: SendMod1',
      units: undefined,
      normalize: undefined,
    },
    vca1SendDepth1: {
      name: 'VCA1: SendDepth1',
      units: undefined,
      normalize: undefined,
    },
    vca1Send2: {
      name: 'VCA1: Send2',
      units: undefined,
      normalize: undefined,
    },
    vca1SendMod2: {
      name: 'VCA1: SendMod2',
      units: undefined,
      normalize: undefined,
    },
    vca1SendDepth2: {
      name: 'VCA1: SendDepth2',
      units: undefined,
      normalize: undefined,
    },
    nuRev1PreDelay: {
      name: 'NuRev1: Pre-Delay',
      units: undefined,
      normalize: undefined,
    },
    nuRev1Damp: {
      name: 'NuRev1: Damp',
      units: undefined,
      normalize: undefined,
    },
    nuRev1Decay: {
      name: 'NuRev1: Decay',
      units: undefined,
      normalize: undefined,
    },
    nuRev1Size: {
      name: 'NuRev1: Size',
      units: undefined,
      normalize: undefined,
    },
    nuRev1Tone: {
      name: 'NuRev1: Tone',
      units: undefined,
      normalize: undefined,
    },
    nuRev1Width: {
      name: 'NuRev1: Width',
      units: undefined,
      normalize: undefined,
    },
    nuRev1DryWetMix: {
      name: 'NuRev1: Dry/Wet Mix',
      units: undefined,
      normalize: undefined,
    },
    zmasReturn1: {
      name: 'ZMas: Return1',
      units: undefined,
      normalize: undefined,
    },
    zmasReturn2: {
      name: 'ZMas: Return2',
      units: undefined,
      normalize: undefined,
    },
    zmasMaster: {
      name: 'ZMas: Master',
      units: undefined,
      normalize: undefined,
    },
  },
};
