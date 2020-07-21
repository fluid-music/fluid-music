
const plugin = require('./plugin');
const fluid = { plugin };

const linear = (min, max) => (v) => (v - min) / (max - min);
const map = (v, min, max) => linear(min, max)(v);
const percent = linear(0, 100);

const dragonflyRoom = module.exports = {
  /**
   * Select a `DragonflyRoomReverb-vst` vst plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [pluginId] - optional index of the plugin to select
   */
  select(pluginId) {
    return fluid.plugin.select('DragonflyRoomReverb-vst', 'vst', pluginId);
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
    return fluid.plugin.setExternalParamHelper('Dry Level', percent(p), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Early Level', percent(p), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Early Send', percent(p), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Late Level', percent(p), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Size', map(m, 8, 32), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Width', map(p, 50, 150), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Predelay', map(ms, 0, 100), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Decay', map(seconds, 0.1, 10), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Diffuse', percent(p), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Spin', map(hz, 0, 5), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Wander', percent(p), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('High Cut', map(hz, 1000, 16000), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Early Damp', map(hz, 1000, 16000), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Late Damp', map(hz, 1000, 16000), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Low Boost', percent(p), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Boost Freq', map(hz, 50, 1050), timeInWholeNotes, curve);
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
    return fluid.plugin.setExternalParamHelper('Low Cut', map(hz, 0, 200), timeInWholeNotes, curve);
  },

  presets: {
    smallVocalRoom() {
      return [
        dragonflyRoom.setDryLevelPercent(0),
        dragonflyRoom.setEarlyLevelPercent(100),
        dragonflyRoom.setEarlySendPercent(20),
        dragonflyRoom.setLateLevelPercent(100),
        dragonflyRoom.setSizeMeters(8),
        dragonflyRoom.setWidthPercent(90),
        dragonflyRoom.setPredelayMs(0),
        dragonflyRoom.setDecaySeconds(0.3),
        dragonflyRoom.setDiffusePercent(86),
        dragonflyRoom.setSpinHz(2.4),
        dragonflyRoom.setWanderPercent(12),
        dragonflyRoom.setHighCutHz(16000),
        dragonflyRoom.setEarlyDampHz(7600),
        dragonflyRoom.setLateDampHz(6400),
        dragonflyRoom.setLowCutHz(4),
        dragonflyRoom.setLowBoostPercent(20),
        dragonflyRoom.setLowBoostHz(400),
      ];
    },
  },

  params: {
    dryLevelPercent: {
      name: 'Dry Level',
      units: 'percent',
      normalize: percent,
    },
    wetLevelPercent: {
      name: 'Wet Level',
      units: 'percent',
      normalize: percent,
    },
    earlyLevelPercent: {
      name: 'Early Level',
      units: 'percent',
      normalize: percent,
    },
    earlySendPercent: {
      name: 'Early Send',
      units: 'percent',
      normalize: percent,
    },
    lateLevelPercent: {
      name: 'Late Level',
      units: 'percent',
      normalize: percent,
    },
    sizeMeters: {
      name: 'Size',
      units: 'meters',
      normalize: linear(8, 32),
    },
    widthPercent: {
      name: 'Width',
      units: 'percent',
      normalize: linear(50, 150),
    },
    predelayMs: {
      name: 'Predelay',
      units: 'milliseconds',
      normalize: linear(0, 100),
    },
    decaySeconds: {
      name: 'Decay',
      units: 'seconds',
      normalize: linear(0.1, 10),
    },
    diffusePercent: {
      name: 'Diffuse',
      units: 'percent',
      normalize: percent,
    },
    spinHz: {
      name: 'Spin',
      units: 'hz',
      normalize: linear(0, 5),
    },
    wanderPercent: {
      name: 'Wander',
      units: 'percent',
      normalize: percent,
    },
    highCutHz: {
      name: 'High Cut',
      units: 'hz',
      normalize: linear(1000, 16000),
    },
    earlyDampHz: {
      name: 'Early Damp',
      units: 'hz',
      normalize: linear(1000, 16000),
    },
    lateDampHz: {
      name: 'Late Damp',
      units: 'hz',
      normalize: linear(1000, 16000),
    },
    lowBoostPercent: {
      name: 'Low Boost',
      units: 'percent',
      normalize: percent,
    },
    lowBoostHz: { // renamed from boostFreq
      name: 'Boost Freq',
      units: 'hz',
      normalize: linear(50, 1050),
    },
    lowCutHz: {
      name: 'Low Cut',
      units: 'hz',
      normalize: linear(50, 200),
    },
  },
};
