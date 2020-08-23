
const plugin = require('./plugin');
const fluid = { plugin: plugin };

const linearLocal  = (min, max) => (v) => (v - min) / (max - min);
const mapLocal     = (v, min, max) => linearLocal(min, max)(v);
const percentLocal = linearLocal(0, 100);

/*
dryLevelPercent
wetLevelPercent
earlyLevelPercent
earlySendPercent
lateLevelPercent
sizeMeters
widthPercent
predelayMs
decaySeconds
diffusePercent
spinHz
wanderPercent
highCutHz
earlyDampHz
lateDampHz
lowBoostPercent
lowBoostHz
lowCutHz
*/
const dragonflyRoom = {
  type: 'VST2',
  name: 'DragonflyRoomReverb-vst',
  /**
   * Select a `DragonflyRoomReverb-vst` vst plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [pluginId] - optional index of the plugin to select
   */
  select(pluginId) {
    return fluid.plugin.select('DragonflyRoomReverb-vst', 'VST2', pluginId);
  },

  /**
   * @param {number} p a number from 0-100 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDryLevelPercent(p, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dry Level', percentLocal(p), timeInWholeNotes, curve);
  },

  /**
   * @param {number} p a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setEarlyLevelPercent(p, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Early Level', percentLocal(p), timeInWholeNotes, curve);
  },

  /**
   * @param {number} p a number from 0-100 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setEarlySendPercent(p, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Early Send', percentLocal(p), timeInWholeNotes, curve);
  },

  /**
   * @param {number} p a number from 0-100 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLateLevelPercent(p, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Late Level', percentLocal(p), timeInWholeNotes, curve);
  },

  /**
   * @param {number} m a number between 8 and 32 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setSizeMeters(m, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Size', mapLocal(m, 8, 32), timeInWholeNotes, curve);
  },

  /**
   * @param {number} p Between 50% and 150% NOTE: NOT STANDARD 0-100 PERCENT
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setWidthPercent(p, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Width', mapLocal(p, 50, 150), timeInWholeNotes, curve);
  },

  /**
   * @param {number} ms predelay in milliseconds, between from 0 to 100
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPredelayMs(ms, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Predelay', mapLocal(ms, 0, 100), timeInWholeNotes, curve);
  },

  /**
   * @param {number} seconds decay in seconds, from  0.1 to 10
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDecaySeconds(seconds, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Decay', mapLocal(seconds, 0.1, 10), timeInWholeNotes, curve);
  },

  /**
   * @param {number} p a number from 0-100 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDiffusePercent(p, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Diffuse', percentLocal(p), timeInWholeNotes, curve);
  },

  /**
   * @param {number} hz speed in hz from 0 to 5.0
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setSpinHz(hz, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Spin', mapLocal(hz, 0, 5), timeInWholeNotes, curve);
  },

  /**
   * @param {number} p a number from 0-100 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setWanderPercent(p, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Wander', percentLocal(p), timeInWholeNotes, curve);
  },

  /**
   * @param {number} hz frequency between 1000 and 16000
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setHighCutHz(hz, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('High Cut', mapLocal(hz, 1000, 16000), timeInWholeNotes, curve);
  },

  /**
   * @param {number} hz frequency between 1000 and 16000
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setEarlyDampHz(hz, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Early Damp', mapLocal(hz, 1000, 16000), timeInWholeNotes, curve);
  },

  /**
   * @param {number} hz frequency between 1000 and 16000
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLateDampHz(hz, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Late Damp', mapLocal(hz, 1000, 16000), timeInWholeNotes, curve);
  },

  /**
   * @param {number} p a number from 0-100 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLowBoostPercent(p, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Low Boost', percentLocal(p), timeInWholeNotes, curve);
  },

  /**
   * @param {number} hz frequency between 50 and 1050
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLowBoostHz(hz, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Boost Freq', mapLocal(hz, 50, 1050), timeInWholeNotes, curve);
  },

  /**
   * @param {number} hz frequency between 0 and 200
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLowCutHz(hz, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Low Cut', mapLocal(hz, 0, 200), timeInWholeNotes, curve);
  },

  presets: {
    smallVocalRoom() {
      return [
        dragonflyRoom.setDryLevelPercent(0, undefined, undefined),
        dragonflyRoom.setEarlyLevelPercent(100, undefined, undefined),
        dragonflyRoom.setEarlySendPercent(20, undefined, undefined),
        dragonflyRoom.setLateLevelPercent(100, undefined, undefined),
        dragonflyRoom.setSizeMeters(8, undefined, undefined),
        dragonflyRoom.setWidthPercent(90, undefined, undefined),
        dragonflyRoom.setPredelayMs(0, undefined, undefined),
        dragonflyRoom.setDecaySeconds(0.3, undefined, undefined),
        dragonflyRoom.setDiffusePercent(86, undefined, undefined),
        dragonflyRoom.setSpinHz(2.4, undefined, undefined),
        dragonflyRoom.setWanderPercent(12, undefined, undefined),
        dragonflyRoom.setHighCutHz(16000, undefined, undefined),
        dragonflyRoom.setEarlyDampHz(7600, undefined, undefined),
        dragonflyRoom.setLateDampHz(6400, undefined, undefined),
        dragonflyRoom.setLowCutHz(4, undefined, undefined),
        dragonflyRoom.setLowBoostPercent(20, undefined, undefined),
        dragonflyRoom.setLowBoostHz(400, undefined, undefined),
      ];
    },
  },
};

export default dragonflyRoom;
