
const plugin = require('./plugin');

const fluid = { plugin };
module.exports = {
  type: 'VST2',
  name: 'Podolski',
  /**
   * Select a `podolski.64` vst plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [nth] Optional index of the `podolski.64` instance.
   *    The selected track may have multiple plugins with the same name. Index
   *    from within those plugins. Most of the time this isn't needed, because
   *    it is unusual to have more than one plugin with a given name on a
   *    particular track.
   */
  select(nth) {
    return fluid.plugin.select('Podolski', 'VST2', nth);
  },

  /**
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
  setMainActiveChrs(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('main: Active #Chrs', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMainActiveDly1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('main: Active #Dly1', value, timeInWholeNotes, curve);
  },

  /**
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
  setVccVoiceStack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Voice Stack', value, timeInWholeNotes, curve);
  },

  /**
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
  setVccGlide(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Glide', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod1', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod2', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod3(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod3', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod4(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod4', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod5(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod5', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod6(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod6', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod7(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod7', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod8(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod8', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod9(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod9', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod10(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod10', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod11(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod11', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod12(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod12', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod13(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod13', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod14(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod14', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod15(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod15', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVccArpStepMod16(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCC: Arp Step Mod16', value, timeInWholeNotes, curve);
  },

  /**
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
    return fluid.plugin.setExternalParamHelper('ENV1: Fall - Rise', value, timeInWholeNotes, curve);
  },

  /**
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
  setOsc1InverseVolume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('OSC1: Inverse Volume', value, timeInWholeNotes, curve);
  },

  /**
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
  setVcf0Type(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF0: Type', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVcf0Cutoff(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF0: Cutoff', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVcf0Resonance(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF0: Resonance', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVcf0Drive(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF0: Drive', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVcf0CutoffMod1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF0: CutoffMod 1', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVcf0Modsource1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF0: Modsource1', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVcf0CutoffMod2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF0: CutoffMod 2', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVcf0Modsource2(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF0: Modsource2', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVcf0KeyFollow(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF0: KeyFollow', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVcf0AutoFM(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF0: AutoFM', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVcf0Click(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCF0: Click', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVca1Pan(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Pan', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVca1Volume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: Volume', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVca1ModDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('VCA1: ModDepth', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setChrsCenter(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Chrs: Center', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setChrsSpeed(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Chrs: Speed', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setChrsDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Chrs: Depth', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setChrsFeedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Chrs: Feedback', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setChrsMix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Chrs: Mix', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDly1SyncLeft(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dly1: Sync Left', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDly1SyncRight(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dly1: Sync Right', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDly1Feedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dly1: Feedback', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDly1Crossfeed(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dly1: Crossfeed', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDly1Mix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('Dly1: Mix', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfogWaveform(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFOG: Waveform', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfogPolarity(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFOG: Polarity', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfo1Restart(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO1: Restart', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfo1Waveform(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO1: Waveform', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfo1Phase(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO1: Phase', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfo1Polarity(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO1: Polarity', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfo1DepthModDpt1(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO1: DepthMod Dpt1', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfo1Rate(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO1: Rate', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLfo1FreqModDpt(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('LFO1: FreqMod Dpt', value, timeInWholeNotes, curve);
  },

  params: {
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
    mainActiveChrs: {
      name: 'main: Active #Chrs',
      units: undefined,
      normalize: undefined,
    },
    mainActiveDly1: {
      name: 'main: Active #Dly1',
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
    vccActiveLfo1: {
      name: 'VCC: Active #LFO1',
      units: undefined,
      normalize: undefined,
    },
    vccVoices: {
      name: 'VCC: Voices',
      units: undefined,
      normalize: undefined,
    },
    vccVoiceStack: {
      name: 'VCC: Voice Stack',
      units: undefined,
      normalize: undefined,
    },
    vccMode: {
      name: 'VCC: Mode',
      units: undefined,
      normalize: undefined,
    },
    vccGlide: {
      name: 'VCC: Glide',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod1: {
      name: 'VCC: Arp Step Mod1',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod2: {
      name: 'VCC: Arp Step Mod2',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod3: {
      name: 'VCC: Arp Step Mod3',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod4: {
      name: 'VCC: Arp Step Mod4',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod5: {
      name: 'VCC: Arp Step Mod5',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod6: {
      name: 'VCC: Arp Step Mod6',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod7: {
      name: 'VCC: Arp Step Mod7',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod8: {
      name: 'VCC: Arp Step Mod8',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod9: {
      name: 'VCC: Arp Step Mod9',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod10: {
      name: 'VCC: Arp Step Mod10',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod11: {
      name: 'VCC: Arp Step Mod11',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod12: {
      name: 'VCC: Arp Step Mod12',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod13: {
      name: 'VCC: Arp Step Mod13',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod14: {
      name: 'VCC: Arp Step Mod14',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod15: {
      name: 'VCC: Arp Step Mod15',
      units: undefined,
      normalize: undefined,
    },
    vccArpStepMod16: {
      name: 'VCC: Arp Step Mod16',
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
      name: 'ENV1: Fall - Rise',
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
    osc1InverseVolume: {
      name: 'OSC1: Inverse Volume',
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
    vcf0Type: {
      name: 'VCF0: Type',
      units: undefined,
      normalize: undefined,
    },
    vcf0Cutoff: {
      name: 'VCF0: Cutoff',
      units: undefined,
      normalize: undefined,
    },
    vcf0Resonance: {
      name: 'VCF0: Resonance',
      units: undefined,
      normalize: undefined,
    },
    vcf0Drive: {
      name: 'VCF0: Drive',
      units: undefined,
      normalize: undefined,
    },
    vcf0CutoffMod1: {
      name: 'VCF0: CutoffMod 1',
      units: undefined,
      normalize: undefined,
    },
    vcf0Modsource1: {
      name: 'VCF0: Modsource1',
      units: undefined,
      normalize: undefined,
    },
    vcf0CutoffMod2: {
      name: 'VCF0: CutoffMod 2',
      units: undefined,
      normalize: undefined,
    },
    vcf0Modsource2: {
      name: 'VCF0: Modsource2',
      units: undefined,
      normalize: undefined,
    },
    vcf0KeyFollow: {
      name: 'VCF0: KeyFollow',
      units: undefined,
      normalize: undefined,
    },
    vcf0AutoFM: {
      name: 'VCF0: AutoFM',
      units: undefined,
      normalize: undefined,
    },
    vcf0Click: {
      name: 'VCF0: Click',
      units: undefined,
      normalize: undefined,
    },
    vca1Pan: {
      name: 'VCA1: Pan',
      units: undefined,
      normalize: undefined,
    },
    vca1Volume: {
      name: 'VCA1: Volume',
      units: undefined,
      normalize: undefined,
    },
    vca1ModDepth: {
      name: 'VCA1: ModDepth',
      units: undefined,
      normalize: undefined,
    },
    chrsCenter: {
      name: 'Chrs: Center',
      units: undefined,
      normalize: undefined,
    },
    chrsSpeed: {
      name: 'Chrs: Speed',
      units: undefined,
      normalize: undefined,
    },
    chrsDepth: {
      name: 'Chrs: Depth',
      units: undefined,
      normalize: undefined,
    },
    chrsFeedback: {
      name: 'Chrs: Feedback',
      units: undefined,
      normalize: undefined,
    },
    chrsMix: {
      name: 'Chrs: Mix',
      units: undefined,
      normalize: undefined,
    },
    dly1SyncLeft: {
      name: 'Dly1: Sync Left',
      units: undefined,
      normalize: undefined,
    },
    dly1SyncRight: {
      name: 'Dly1: Sync Right',
      units: undefined,
      normalize: undefined,
    },
    dly1Feedback: {
      name: 'Dly1: Feedback',
      units: undefined,
      normalize: undefined,
    },
    dly1Crossfeed: {
      name: 'Dly1: Crossfeed',
      units: undefined,
      normalize: undefined,
    },
    dly1Mix: {
      name: 'Dly1: Mix',
      units: undefined,
      normalize: undefined,
    },
    lfogWaveform: {
      name: 'LFOG: Waveform',
      units: undefined,
      normalize: undefined,
    },
    lfogPolarity: {
      name: 'LFOG: Polarity',
      units: undefined,
      normalize: undefined,
    },
    lfo1Restart: {
      name: 'LFO1: Restart',
      units: undefined,
      normalize: undefined,
    },
    lfo1Waveform: {
      name: 'LFO1: Waveform',
      units: undefined,
      normalize: undefined,
    },
    lfo1Phase: {
      name: 'LFO1: Phase',
      units: undefined,
      normalize: undefined,
    },
    lfo1Polarity: {
      name: 'LFO1: Polarity',
      units: undefined,
      normalize: undefined,
    },
    lfo1DepthModDpt1: {
      name: 'LFO1: DepthMod Dpt1',
      units: undefined,
      normalize: undefined,
    },
    lfo1Rate: {
      name: 'LFO1: Rate',
      units: undefined,
      normalize: undefined,
    },
    lfo1FreqModDpt: {
      name: 'LFO1: FreqMod Dpt',
      units: undefined,
      normalize: undefined,
    },
  },
};
