const R       = require('ramda');
const fluid   = require('../fluid-music');

const helpers = {
   /**
   * Remove clips and automation from all tracks for a given session.
   * @param {Session} session
   */
  cleanup(session) {
    // There is a suble bug: When cleaning, we really want to remove all clips
    // from all existing tracks, Here we are removing all clips from the tracks
    // in the new session. If this session has different tracks than the
    // previously active session, then those older tracks will not be cleaned.
    const message = [
      fluid.audiotrack.select('kick'),
      fluid.audiotrack.removeClips(),
      fluid.audiotrack.removeAutomation(),
    ];
    for (let trackName of Object.keys(session.tracks)) {
      if (fluid.tab.reservedKeys.hasOwnProperty(trackName)) continue;
      message.push(
        fluid.audiotrack.select(trackName),
        fluid.audiotrack.removeClips(),
        fluid.audiotrack.removeAutomation(),
      )
    }
    return message;
  },

  /**
   * @param {Track} track a fluid session track object
   * @param {number} [amt=0.01] duration to to humanize
   */
  humanize(track, amt = 0.01) {
    for (let clip of track.clips) {
      for (let note of clip.notes) {
        let startTime = note.s + Math.random() * amt - (amt*0.5);
        note.s = Math.max(0, startTime);
      }
    }
  },

  /**
   * Open the Zebra2 lowpass filter over 16 measures
   */
  filterAutomation: [
    fluid.pluginZebra2Vst2.select(),
    fluid.pluginZebra2Vst2.setVcf5Cutoff(0.5, 1),
    fluid.pluginZebra2Vst2.setVcf5Cutoff(1.0, 16),
    fluid.pluginZebra2Vst2.setVcf5Resonance(0.3),
  ],

  /**
   * 16 measures of 4-on-the-floor
   */
  kick: { r: '1234', kick: ['', 'k.k.', R.repeat('kkkk', 14)], v:'2222' },

  duckUnderKick: [
    fluid.plugin.select('#TCompressor'),
    fluid.plugin.setSideChainInput('kick'),
    fluid.plugin.setParamNormalized('Use Sidechain Trigger', 1),
    fluid.plugin.setParamNormalized('Threshold', 0.40),
    fluid.plugin.setParamNormalized('Release', 0.18),
    fluid.plugin.setParamNormalized('Ratio', 0.50),
  ],
};

module.exports = helpers;
