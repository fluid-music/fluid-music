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
