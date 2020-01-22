const audiotrack = {
  select(trackName) {
    if (typeof trackName !== 'string')
      throw new Error('audiotrack.Select requires track name string, got: ' + trackName);
    return {
      address: '/audiotrack/select',
      args: [{ type: 'string', value: trackName }],
    }
  },

  insertWav (clipName, startBeats, fileName){
    const args = [
      {type: 'string', value: clipName}, 
      {type: 'string', value: fileName}, 
      {type: 'float', value: startBeats},
    ];

    const elements = [
      { address: '/audiotrack/insert/wav', args }
    ];

    return elements;
  },

  /**
   * Selects a track, ensuring that it has a bus return;
   * @param {string} busName - name of audiotrack (the return will be named
   *                           after the audio track).
   */
  selectReturnTrack(busName) {
    if (typeof busName !== 'string')
      throw new Error('bus.selectReturnTrack requires track name string, got: ' + busName);

    return {
      address: '/audiotrack/select/return',
      args: [{ type: 'string', value: busName }],
    }
  },

  /**
   * Adjust the send level to the specified bus, adding the send (post-gain) if
   * it does not yet exist. Use with audiotrack.selectReturnTrack(busName).
   * @param {string} busName - The name of the return bus to send to
   * @param {number} [levelDb] = default on the server is 0
   */
  send(busName, levelDb) {
    if (typeof busName !== 'string')
      throw new Error('send requires track name string, got: ' + busName);

    if (typeof levelDb !== undefined && typeof levelDb !== 'number')
      throw new Error('if send has a levelDb, it must be a number');

    const args =  [
      { type: 'string', value: busName },
      { type: 'string', value: 'ignored'},
      { type: 'string', value: 'post-gain'},
    ];

    if (typeof levelDb === 'number')
      args[1] = { type: 'float', value: levelDb };

    return { address: '/audiotrack/send/level', args };
  }
}

module.exports = audiotrack;