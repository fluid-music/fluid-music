const fluid   = require('../fluid-music');
module.exports = {
  /**
   * Remove clips and automation from all tracks for a given session.
   *
   * There is a suble bug: When cleaning, we really want to remove all clips
   * from all existing tracks, Here we are removing all clips from the tracks
   * in the new session. If this session has different tracks than the
   * previously active session, then those older tracks will not be cleaned.
   * @param {Session} session
   */
  cleanup(session) {
    const message = [];
    for (let trackName of Object.keys(session.tracks)) {
      if (fluid.tab.reservedKeys.hasOwnProperty(trackName)) continue;
        message.push(
          fluid.audiotrack.select(trackName),
          fluid.audiotrack.removeClips(),
          fluid.audiotrack.removeAutomation(),
        )
    }
  }
}