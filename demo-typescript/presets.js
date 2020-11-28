const { PodolskiVst2 } = require("fluid-music").plugins

function podolskiSine() {
  return new PodolskiVst2({
    // Set the wave shape to a triangle
    osc1WaveWarpPercent: 100,
    // Tune the oscillator so note 69 (the A above middle C) is 440hz
    osc1Tune: 12,
    // Filter out harmonics above the fundamental. Set via trial and error.
    // The result is not a pure sine tone, but it is close.
    vcf0Cutoff: 16,
    // Full Key Tracking
    vcf0KeyFollowPercent: 100,
    // Emulate a mono synth
    vccMode: PodolskiVst2.parameterLibrary.vccMode.choices.legato,
    // Release just long enough to avoid clipping at low frequencies
    env1ReleasePercent: 16,
    // The filter cuts the fundamental, so boost to full volume
    mainOutput: 200,
  })
}

function podolskiSineSlowDecay() {
  const podolski = podolskiSine()
  podolski.parameters.env1DecayPercent = 70
  podolski.parameters.env1SustainPercent = 27
  podolski.parameters.env1FallRisePercent = 48
  podolski.parameters.env1ReleasePercent = 12.5
  return podolski
}

module.exports = {
  podolskiSine,
  podolskiSineSlowDecay
}
