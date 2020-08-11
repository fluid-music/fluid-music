const path = require('path');
const fluid = require('fluid-music');

// The default podolski patch is a saw wave with a low pass filter set to track
// the input pitch.
const initPresetFile = path.join(__dirname, 'trkpreset', 'podolski-64-init.trkpreset');

// input between +-24, output between 0 and 1;
const oscTune = (v) => (v + 24) / 48;

const oscModes = {
  poly: 0,
  mono: 0.3,
  legato: 0.6,
  arp: 0.9,
}

module.exports = {
  sine() {
    return [
      fluid.pluginPodolski.select(),
      fluid.plugin.loadTrkpreset(initPresetFile),
      
      // Set the wave shape to a triangle
      fluid.pluginPodolski.setOsc1WaveWarp(1.0),

      // Tune the oscillator so note 69 (the A above middle C) is 440hz
      fluid.pluginPodolski.setOsc1Tune(oscTune(12)),

      // Filter out harmonics above the fundamental. Set via trial and error.
      // The result is not a pure sine tone, but it is close.
      fluid.pluginPodolski.setVcf0Cutoff(16 / 150),

      // Full key tracking
      fluid.pluginPodolski.setVcf0KeyFollow(1),

      // Emulate a mono synth
      fluid.pluginPodolski.setVccMode(oscModes.legato),

      // The filter cuts the fundamental, so boost to full volume
      fluid.pluginPodolski.setMainOutput(1),
    ];
  },

  /**
   * Slowly decaying sine bass.
   */
  sineSlowDecay() {
    return module.exports.sine().concat([
      fluid.pluginPodolski.setEnv1Decay(0.70),
      fluid.pluginPodolski.setEnv1Sustain(0.27),
      fluid.pluginPodolski.setEnv1FallRise(0.48),
      fluid.pluginPodolski.setEnv1Release(0.125),
    ]);
  }
};
