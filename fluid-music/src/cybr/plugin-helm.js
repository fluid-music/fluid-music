import plugin from './plugin';
const fluid = { plugin };
module.exports = {
  type: 'VST2',
  name: 'helm',
  /**
   * Select a `helm` vst plugin on the selected track, creating a new
   * plugin instance if needed
   * @param {number} [nth] Optional index of the `helm` instance.
   *    The selected track may have multiple plugins with the same name. Index
   *    from within those plugins. Most of the time this isn't needed, because
   *    it is unusual to have more than one plugin with a given name on a
   *    particular track.
   */
  select(nth) {
    return fluid.plugin.select('helm', 'VST2', nth);
  },

  /**
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
  setAmpAttack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('amp_attack', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setAmpDecay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('amp_decay', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setAmpRelease(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('amp_release', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setAmpSustain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('amp_sustain', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setArpFrequency(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('arp_frequency', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setArpGate(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('arp_gate', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setArpOctaves(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('arp_octaves', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setArpOn(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('arp_on', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setArpPattern(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('arp_pattern', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setArpSync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('arp_sync', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setArpTempo(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('arp_tempo', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setBeatsPerMinute(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('beats_per_minute', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setCrossModulation(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('cross_modulation', value, timeInWholeNotes, curve);
  },

  /**
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
    return fluid.plugin.setExternalParamHelper('cutoff', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDelayDryWet(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('delay_dry_wet', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDelayFeedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('delay_feedback', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDelayFrequency(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('delay_frequency', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDelayOn(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('delay_on', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDelaySync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('delay_sync', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDelayTempo(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('delay_tempo', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDistortionDrive(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('distortion_drive', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDistortionMix(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('distortion_mix', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDistortionOn(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('distortion_on', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setDistortionType(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('distortion_type', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFilAttack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('fil_attack', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFilDecay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('fil_decay', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFilEnvDepth(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('fil_env_depth', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFilRelease(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('fil_release', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFilSustain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('fil_sustain', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFilterBlend(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('filter_blend', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFilterDrive(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('filter_drive', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFilterOn(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('filter_on', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFilterShelf(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('filter_shelf', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFilterStyle(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('filter_style', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFormantOn(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('formant_on', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFormantX(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('formant_x', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setFormantY(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('formant_y', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setKeytrack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('keytrack', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setLegato(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('legato', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setModAttack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mod_attack', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setModDecay(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mod_decay', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setModRelease(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mod_release', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setModSustain(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mod_sustain', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo1Amplitude(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_1_amplitude', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo1Frequency(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_1_frequency', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo1Retrigger(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_1_retrigger', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo1Sync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_1_sync', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo1Tempo(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_1_tempo', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo1Waveform(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_1_waveform', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo2Amplitude(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_2_amplitude', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo2Frequency(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_2_frequency', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo2Retrigger(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_2_retrigger', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo2Sync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_2_sync', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo2Tempo(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_2_tempo', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setMonoLfo2Waveform(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('mono_lfo_2_waveform', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setNoiseVolume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('noise_volume', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setNumSteps(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('num_steps', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOsc1Transpose(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('osc_1_transpose', value, timeInWholeNotes, curve);
  },

  /**
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
    return fluid.plugin.setExternalParamHelper('osc_1_tune', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOsc1UnisonDetune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('osc_1_unison_detune', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOsc1UnisonVoices(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('osc_1_unison_voices', value, timeInWholeNotes, curve);
  },

  /**
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
    return fluid.plugin.setExternalParamHelper('osc_1_volume', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOsc1Waveform(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('osc_1_waveform', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOsc2Transpose(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('osc_2_transpose', value, timeInWholeNotes, curve);
  },

  /**
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
    return fluid.plugin.setExternalParamHelper('osc_2_tune', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOsc2UnisonDetune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('osc_2_unison_detune', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOsc2UnisonVoices(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('osc_2_unison_voices', value, timeInWholeNotes, curve);
  },

  /**
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
    return fluid.plugin.setExternalParamHelper('osc_2_volume', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOsc2Waveform(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('osc_2_waveform', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOscFeedbackAmount(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('osc_feedback_amount', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOscFeedbackTranspose(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('osc_feedback_transpose', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setOscFeedbackTune(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('osc_feedback_tune', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPitchBendRange(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('pitch_bend_range', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPolyLfoAmplitude(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('poly_lfo_amplitude', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPolyLfoFrequency(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('poly_lfo_frequency', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPolyLfoSync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('poly_lfo_sync', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPolyLfoTempo(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('poly_lfo_tempo', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPolyLfoWaveform(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('poly_lfo_waveform', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPolyphony(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('polyphony', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPortamento(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('portamento', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setPortamentoType(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('portamento_type', value, timeInWholeNotes, curve);
  },

  /**
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
    return fluid.plugin.setExternalParamHelper('resonance', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setReverbDamping(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('reverb_damping', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setReverbDryWet(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('reverb_dry_wet', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setReverbFeedback(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('reverb_feedback', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setReverbOn(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('reverb_on', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepFrequency(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_frequency', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq00(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_00', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq01(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_01', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq02(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_02', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq03(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_03', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq04(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_04', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq05(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_05', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq06(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_06', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq07(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_07', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq08(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_08', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq09(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_09', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq10(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_10', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq11(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_11', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq12(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_12', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq13(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_13', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq14(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_14', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq15(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_15', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq16(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_16', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq17(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_17', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq18(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_18', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq19(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_19', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq20(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_20', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq21(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_21', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq22(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_22', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq23(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_23', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq24(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_24', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq25(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_25', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq26(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_26', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq27(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_27', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq28(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_28', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq29(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_29', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq30(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_30', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSeq31(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_seq_31', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSequencerRetrigger(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_sequencer_retrigger', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSequencerSync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_sequencer_sync', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSequencerTempo(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_sequencer_tempo', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStepSmoothing(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('step_smoothing', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStutterFrequency(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('stutter_frequency', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStutterOn(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('stutter_on', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStutterResampleFrequency(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('stutter_resample_frequency', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStutterResampleSync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('stutter_resample_sync', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStutterResampleTempo(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('stutter_resample_tempo', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStutterSoftness(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('stutter_softness', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStutterSync(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('stutter_sync', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setStutterTempo(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('stutter_tempo', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setSubOctave(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('sub_octave', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setSubShuffle(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('sub_shuffle', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setSubVolume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('sub_volume', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setSubWaveform(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('sub_waveform', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setUnison1Harmonize(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('unison_1_harmonize', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setUnison2Harmonize(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('unison_2_harmonize', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVelocityTrack(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('velocity_track', value, timeInWholeNotes, curve);
  },

  /**
   * @param {number} value a number between 0-1 to set the parameter to
   * @param {number} [timeInWholeNotes] time to insert automation point in
   *    quarter notes. If no time is supplied, set the initial value
   * @param {number} [curve=0] A number from [-1, 1] (inclusive), which
   *    represents the curvature of the line formed by this point and the next
   *    point. Zero implies a linear change. Higher values create a curve that
   *    begins slowly and accelerates. Lower values create a curve that begins
   *    quickly, and decelerates.
   */
  setVolume(value, timeInWholeNotes, curve) {
    return fluid.plugin.setExternalParamHelper('volume', value, timeInWholeNotes, curve);
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
    ampAttack: {
      name: 'amp_attack',
      units: undefined,
      normalize: undefined,
    },
    ampDecay: {
      name: 'amp_decay',
      units: undefined,
      normalize: undefined,
    },
    ampRelease: {
      name: 'amp_release',
      units: undefined,
      normalize: undefined,
    },
    ampSustain: {
      name: 'amp_sustain',
      units: undefined,
      normalize: undefined,
    },
    arpFrequency: {
      name: 'arp_frequency',
      units: undefined,
      normalize: undefined,
    },
    arpGate: {
      name: 'arp_gate',
      units: undefined,
      normalize: undefined,
    },
    arpOctaves: {
      name: 'arp_octaves',
      units: undefined,
      normalize: undefined,
    },
    arpOn: {
      name: 'arp_on',
      units: undefined,
      normalize: undefined,
    },
    arpPattern: {
      name: 'arp_pattern',
      units: undefined,
      normalize: undefined,
    },
    arpSync: {
      name: 'arp_sync',
      units: undefined,
      normalize: undefined,
    },
    arpTempo: {
      name: 'arp_tempo',
      units: undefined,
      normalize: undefined,
    },
    beatsPerMinute: {
      name: 'beats_per_minute',
      units: undefined,
      normalize: undefined,
    },
    crossModulation: {
      name: 'cross_modulation',
      units: undefined,
      normalize: undefined,
    },
    cutoff: {
      name: 'cutoff',
      units: undefined,
      normalize: undefined,
    },
    delayDryWet: {
      name: 'delay_dry_wet',
      units: undefined,
      normalize: undefined,
    },
    delayFeedback: {
      name: 'delay_feedback',
      units: undefined,
      normalize: undefined,
    },
    delayFrequency: {
      name: 'delay_frequency',
      units: undefined,
      normalize: undefined,
    },
    delayOn: {
      name: 'delay_on',
      units: undefined,
      normalize: undefined,
    },
    delaySync: {
      name: 'delay_sync',
      units: undefined,
      normalize: undefined,
    },
    delayTempo: {
      name: 'delay_tempo',
      units: undefined,
      normalize: undefined,
    },
    distortionDrive: {
      name: 'distortion_drive',
      units: undefined,
      normalize: undefined,
    },
    distortionMix: {
      name: 'distortion_mix',
      units: undefined,
      normalize: undefined,
    },
    distortionOn: {
      name: 'distortion_on',
      units: undefined,
      normalize: undefined,
    },
    distortionType: {
      name: 'distortion_type',
      units: undefined,
      normalize: undefined,
    },
    filAttack: {
      name: 'fil_attack',
      units: undefined,
      normalize: undefined,
    },
    filDecay: {
      name: 'fil_decay',
      units: undefined,
      normalize: undefined,
    },
    filEnvDepth: {
      name: 'fil_env_depth',
      units: undefined,
      normalize: undefined,
    },
    filRelease: {
      name: 'fil_release',
      units: undefined,
      normalize: undefined,
    },
    filSustain: {
      name: 'fil_sustain',
      units: undefined,
      normalize: undefined,
    },
    filterBlend: {
      name: 'filter_blend',
      units: undefined,
      normalize: undefined,
    },
    filterDrive: {
      name: 'filter_drive',
      units: undefined,
      normalize: undefined,
    },
    filterOn: {
      name: 'filter_on',
      units: undefined,
      normalize: undefined,
    },
    filterShelf: {
      name: 'filter_shelf',
      units: undefined,
      normalize: undefined,
    },
    filterStyle: {
      name: 'filter_style',
      units: undefined,
      normalize: undefined,
    },
    formantOn: {
      name: 'formant_on',
      units: undefined,
      normalize: undefined,
    },
    formantX: {
      name: 'formant_x',
      units: undefined,
      normalize: undefined,
    },
    formantY: {
      name: 'formant_y',
      units: undefined,
      normalize: undefined,
    },
    keytrack: {
      name: 'keytrack',
      units: undefined,
      normalize: undefined,
    },
    legato: {
      name: 'legato',
      units: undefined,
      normalize: undefined,
    },
    modAttack: {
      name: 'mod_attack',
      units: undefined,
      normalize: undefined,
    },
    modDecay: {
      name: 'mod_decay',
      units: undefined,
      normalize: undefined,
    },
    modRelease: {
      name: 'mod_release',
      units: undefined,
      normalize: undefined,
    },
    modSustain: {
      name: 'mod_sustain',
      units: undefined,
      normalize: undefined,
    },
    monoLfo1Amplitude: {
      name: 'mono_lfo_1_amplitude',
      units: undefined,
      normalize: undefined,
    },
    monoLfo1Frequency: {
      name: 'mono_lfo_1_frequency',
      units: undefined,
      normalize: undefined,
    },
    monoLfo1Retrigger: {
      name: 'mono_lfo_1_retrigger',
      units: undefined,
      normalize: undefined,
    },
    monoLfo1Sync: {
      name: 'mono_lfo_1_sync',
      units: undefined,
      normalize: undefined,
    },
    monoLfo1Tempo: {
      name: 'mono_lfo_1_tempo',
      units: undefined,
      normalize: undefined,
    },
    monoLfo1Waveform: {
      name: 'mono_lfo_1_waveform',
      units: undefined,
      normalize: undefined,
    },
    monoLfo2Amplitude: {
      name: 'mono_lfo_2_amplitude',
      units: undefined,
      normalize: undefined,
    },
    monoLfo2Frequency: {
      name: 'mono_lfo_2_frequency',
      units: undefined,
      normalize: undefined,
    },
    monoLfo2Retrigger: {
      name: 'mono_lfo_2_retrigger',
      units: undefined,
      normalize: undefined,
    },
    monoLfo2Sync: {
      name: 'mono_lfo_2_sync',
      units: undefined,
      normalize: undefined,
    },
    monoLfo2Tempo: {
      name: 'mono_lfo_2_tempo',
      units: undefined,
      normalize: undefined,
    },
    monoLfo2Waveform: {
      name: 'mono_lfo_2_waveform',
      units: undefined,
      normalize: undefined,
    },
    noiseVolume: {
      name: 'noise_volume',
      units: undefined,
      normalize: undefined,
    },
    numSteps: {
      name: 'num_steps',
      units: undefined,
      normalize: undefined,
    },
    osc1Transpose: {
      name: 'osc_1_transpose',
      units: undefined,
      normalize: undefined,
    },
    osc1Tune: {
      name: 'osc_1_tune',
      units: undefined,
      normalize: undefined,
    },
    osc1UnisonDetune: {
      name: 'osc_1_unison_detune',
      units: undefined,
      normalize: undefined,
    },
    osc1UnisonVoices: {
      name: 'osc_1_unison_voices',
      units: undefined,
      normalize: undefined,
    },
    osc1Volume: {
      name: 'osc_1_volume',
      units: undefined,
      normalize: undefined,
    },
    osc1Waveform: {
      name: 'osc_1_waveform',
      units: undefined,
      normalize: undefined,
    },
    osc2Transpose: {
      name: 'osc_2_transpose',
      units: undefined,
      normalize: undefined,
    },
    osc2Tune: {
      name: 'osc_2_tune',
      units: undefined,
      normalize: undefined,
    },
    osc2UnisonDetune: {
      name: 'osc_2_unison_detune',
      units: undefined,
      normalize: undefined,
    },
    osc2UnisonVoices: {
      name: 'osc_2_unison_voices',
      units: undefined,
      normalize: undefined,
    },
    osc2Volume: {
      name: 'osc_2_volume',
      units: undefined,
      normalize: undefined,
    },
    osc2Waveform: {
      name: 'osc_2_waveform',
      units: undefined,
      normalize: undefined,
    },
    oscFeedbackAmount: {
      name: 'osc_feedback_amount',
      units: undefined,
      normalize: undefined,
    },
    oscFeedbackTranspose: {
      name: 'osc_feedback_transpose',
      units: undefined,
      normalize: undefined,
    },
    oscFeedbackTune: {
      name: 'osc_feedback_tune',
      units: undefined,
      normalize: undefined,
    },
    pitchBendRange: {
      name: 'pitch_bend_range',
      units: undefined,
      normalize: undefined,
    },
    polyLfoAmplitude: {
      name: 'poly_lfo_amplitude',
      units: undefined,
      normalize: undefined,
    },
    polyLfoFrequency: {
      name: 'poly_lfo_frequency',
      units: undefined,
      normalize: undefined,
    },
    polyLfoSync: {
      name: 'poly_lfo_sync',
      units: undefined,
      normalize: undefined,
    },
    polyLfoTempo: {
      name: 'poly_lfo_tempo',
      units: undefined,
      normalize: undefined,
    },
    polyLfoWaveform: {
      name: 'poly_lfo_waveform',
      units: undefined,
      normalize: undefined,
    },
    polyphony: {
      name: 'polyphony',
      units: undefined,
      normalize: undefined,
    },
    portamento: {
      name: 'portamento',
      units: undefined,
      normalize: undefined,
    },
    portamentoType: {
      name: 'portamento_type',
      units: undefined,
      normalize: undefined,
    },
    resonance: {
      name: 'resonance',
      units: undefined,
      normalize: undefined,
    },
    reverbDamping: {
      name: 'reverb_damping',
      units: undefined,
      normalize: undefined,
    },
    reverbDryWet: {
      name: 'reverb_dry_wet',
      units: undefined,
      normalize: undefined,
    },
    reverbFeedback: {
      name: 'reverb_feedback',
      units: undefined,
      normalize: undefined,
    },
    reverbOn: {
      name: 'reverb_on',
      units: undefined,
      normalize: undefined,
    },
    stepFrequency: {
      name: 'step_frequency',
      units: undefined,
      normalize: undefined,
    },
    stepSeq00: {
      name: 'step_seq_00',
      units: undefined,
      normalize: undefined,
    },
    stepSeq01: {
      name: 'step_seq_01',
      units: undefined,
      normalize: undefined,
    },
    stepSeq02: {
      name: 'step_seq_02',
      units: undefined,
      normalize: undefined,
    },
    stepSeq03: {
      name: 'step_seq_03',
      units: undefined,
      normalize: undefined,
    },
    stepSeq04: {
      name: 'step_seq_04',
      units: undefined,
      normalize: undefined,
    },
    stepSeq05: {
      name: 'step_seq_05',
      units: undefined,
      normalize: undefined,
    },
    stepSeq06: {
      name: 'step_seq_06',
      units: undefined,
      normalize: undefined,
    },
    stepSeq07: {
      name: 'step_seq_07',
      units: undefined,
      normalize: undefined,
    },
    stepSeq08: {
      name: 'step_seq_08',
      units: undefined,
      normalize: undefined,
    },
    stepSeq09: {
      name: 'step_seq_09',
      units: undefined,
      normalize: undefined,
    },
    stepSeq10: {
      name: 'step_seq_10',
      units: undefined,
      normalize: undefined,
    },
    stepSeq11: {
      name: 'step_seq_11',
      units: undefined,
      normalize: undefined,
    },
    stepSeq12: {
      name: 'step_seq_12',
      units: undefined,
      normalize: undefined,
    },
    stepSeq13: {
      name: 'step_seq_13',
      units: undefined,
      normalize: undefined,
    },
    stepSeq14: {
      name: 'step_seq_14',
      units: undefined,
      normalize: undefined,
    },
    stepSeq15: {
      name: 'step_seq_15',
      units: undefined,
      normalize: undefined,
    },
    stepSeq16: {
      name: 'step_seq_16',
      units: undefined,
      normalize: undefined,
    },
    stepSeq17: {
      name: 'step_seq_17',
      units: undefined,
      normalize: undefined,
    },
    stepSeq18: {
      name: 'step_seq_18',
      units: undefined,
      normalize: undefined,
    },
    stepSeq19: {
      name: 'step_seq_19',
      units: undefined,
      normalize: undefined,
    },
    stepSeq20: {
      name: 'step_seq_20',
      units: undefined,
      normalize: undefined,
    },
    stepSeq21: {
      name: 'step_seq_21',
      units: undefined,
      normalize: undefined,
    },
    stepSeq22: {
      name: 'step_seq_22',
      units: undefined,
      normalize: undefined,
    },
    stepSeq23: {
      name: 'step_seq_23',
      units: undefined,
      normalize: undefined,
    },
    stepSeq24: {
      name: 'step_seq_24',
      units: undefined,
      normalize: undefined,
    },
    stepSeq25: {
      name: 'step_seq_25',
      units: undefined,
      normalize: undefined,
    },
    stepSeq26: {
      name: 'step_seq_26',
      units: undefined,
      normalize: undefined,
    },
    stepSeq27: {
      name: 'step_seq_27',
      units: undefined,
      normalize: undefined,
    },
    stepSeq28: {
      name: 'step_seq_28',
      units: undefined,
      normalize: undefined,
    },
    stepSeq29: {
      name: 'step_seq_29',
      units: undefined,
      normalize: undefined,
    },
    stepSeq30: {
      name: 'step_seq_30',
      units: undefined,
      normalize: undefined,
    },
    stepSeq31: {
      name: 'step_seq_31',
      units: undefined,
      normalize: undefined,
    },
    stepSequencerRetrigger: {
      name: 'step_sequencer_retrigger',
      units: undefined,
      normalize: undefined,
    },
    stepSequencerSync: {
      name: 'step_sequencer_sync',
      units: undefined,
      normalize: undefined,
    },
    stepSequencerTempo: {
      name: 'step_sequencer_tempo',
      units: undefined,
      normalize: undefined,
    },
    stepSmoothing: {
      name: 'step_smoothing',
      units: undefined,
      normalize: undefined,
    },
    stutterFrequency: {
      name: 'stutter_frequency',
      units: undefined,
      normalize: undefined,
    },
    stutterOn: {
      name: 'stutter_on',
      units: undefined,
      normalize: undefined,
    },
    stutterResampleFrequency: {
      name: 'stutter_resample_frequency',
      units: undefined,
      normalize: undefined,
    },
    stutterResampleSync: {
      name: 'stutter_resample_sync',
      units: undefined,
      normalize: undefined,
    },
    stutterResampleTempo: {
      name: 'stutter_resample_tempo',
      units: undefined,
      normalize: undefined,
    },
    stutterSoftness: {
      name: 'stutter_softness',
      units: undefined,
      normalize: undefined,
    },
    stutterSync: {
      name: 'stutter_sync',
      units: undefined,
      normalize: undefined,
    },
    stutterTempo: {
      name: 'stutter_tempo',
      units: undefined,
      normalize: undefined,
    },
    subOctave: {
      name: 'sub_octave',
      units: undefined,
      normalize: undefined,
    },
    subShuffle: {
      name: 'sub_shuffle',
      units: undefined,
      normalize: undefined,
    },
    subVolume: {
      name: 'sub_volume',
      units: undefined,
      normalize: undefined,
    },
    subWaveform: {
      name: 'sub_waveform',
      units: undefined,
      normalize: undefined,
    },
    unison1Harmonize: {
      name: 'unison_1_harmonize',
      units: undefined,
      normalize: undefined,
    },
    unison2Harmonize: {
      name: 'unison_2_harmonize',
      units: undefined,
      normalize: undefined,
    },
    velocityTrack: {
      name: 'velocity_track',
      units: undefined,
      normalize: undefined,
    },
    volume: {
      name: 'volume',
      units: undefined,
      normalize: undefined,
    },
  },
};
