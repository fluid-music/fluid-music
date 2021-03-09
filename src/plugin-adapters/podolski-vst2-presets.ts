import { PodolskiVst2 } from './podolski-vst2'

/** Almost pure sine tone with a very short attack and release */
export function sine() {
  return new PodolskiVst2({
    // Set the wave shape to a triangle
    osc1WaveWarpPercent: 100,
    // Tune the oscillator so note 69 (the A above middle C) is 440hz.
    // This is needed because the default patch has 'transpose' set to -12.
    osc1Tune: 12,
    // Filter out harmonics above the fundamental. Set via trial and error.
    // The result is not a pure sine tone, but it is close.
    vcf0Cutoff: 16,
    // Full Key Tracking
    vcf0KeyFollowPercent: 100,
    // In mono and legato modes, Podolski outputs an audible 'click' when the
    // onset of a note EXACTLY coincides with the release of the previous note.
    // While overall, it makes the more sense for a sub-bass oriented patch to
    // be monophonic, setting it to poly avoids triggering the 'click' artifact.
    vccMode: PodolskiVst2.parameterLibrary.vccMode.choices.poly,
    // Release just long enough to avoid clipping at low frequencies. A value
    // of 16 results in approximately 25ms of release.
    env1ReleasePercent: 16,
    // The filter cuts the fundamental, so boost to full volume
    mainOutput: 200,
  })
}

/** Moog-ish sine bass sound, with a natural (acoustic bass sounding) decay */
export function sineSlowDecay() {
  const podolski = sine()
  podolski.parameters.env1DecayPercent = 60
  podolski.parameters.env1SustainPercent = 53
  podolski.parameters.env1FallRisePercent = -11
  podolski.parameters.env1ReleasePercent = 16
  return podolski
}

/**
 * A bright, rich pad with a touch of chorus and delay. It has a fast attack and
 * release, and is a good, neutral starting point for more elaborate patches.
 */
export function brightPad() {
  return new PodolskiVst2({
    // Envelope
    env1AttackPercent: 9,
    env1DecayPercent: 20,
    env1SustainPercent: 80,
    env1FallRisePercent: -22,
    env1ReleasePercent: 16,
    env1VelocityPercent: 55,
    // Oscillator
    osc1WaveWarpPercent: 33,
    osc1PhaseModDepth: 0,
    osc1PhaseModSrc: PodolskiVst2.parameterLibrary.osc1PhaseModSrc.choices.lfoglobal,
    vca1ModDepthPercent: 60,
    osc1Tune: 12,
    osc1InverseVolumePercent: 60,
    osc1WarpModSrc: PodolskiVst2.parameterLibrary.osc1WarpModSrc.choices.keyfollow,
    osc1WarpModDepthPercent: 47,
    // Filter
    vcf0Cutoff: 28,
    vcf0ResonancePercent: 6,
    vcf0KeyFollowPercent: 100,
    vcf0Modsource1: PodolskiVst2.parameterLibrary.vcf0Modsource1.choices.velocity,
    vcf0CutoffMod1: 15,
    vcf0Modsource2: PodolskiVst2.parameterLibrary.vcf0Modsource2.choices.envelope1,
    vcf0CutoffMod2: 48,
    vcf0DrivePercent: 40,
    vcf0ClickPercent: 18,
    // LFO1
    lfo1Sync: 0.346,
    lfo1Waveform: PodolskiVst2.parameterLibrary.lfo1Waveform.choices.sine,
    lfo1Restart: PodolskiVst2.parameterLibrary.lfo1Restart.choices.sync,
    lfo1DelayPercent: 25,
    lfo1DepthModDpt1Percent: 0,
    // Global LFO
    lfogSync: .308,
    lfogWaveform: PodolskiVst2.parameterLibrary.lfogWaveform.choices.sine,
    // Chorus
    chrsCenterPercent: 80,
    chrsSpeedPercent: 22,
    chrsDepthPercent: 99,
    chrsFeedbackPercent: 0,
    chrsMixPercent: 32,
    // Delay
    dly1SyncLeft: PodolskiVst2.parameterLibrary.dly1SyncLeft.choices['1/4'],
    dly1SyncRight: PodolskiVst2.parameterLibrary.dly1SyncRight.choices['1/8 dot'],
    dly1CrossfeedPercent: 36,
    dly1MixPercent: 3,
    // Main
    mainOutput: 100,
  })
}
