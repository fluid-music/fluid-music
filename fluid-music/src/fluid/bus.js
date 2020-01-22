const bus = {
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

  sendLevel(busName, level) {
    if (typeof busName !== 'string')
      throw new Error('sendLevel requires track name string, got: ' + busName);

    if (typeof level !== undefined && typeof level !== 'number')
      throw new Error('if sendLevel has a level, it must be a number');

    const args =  [
      { type: 'string', value: busName },
      { type: 'string', value: 'ignored'},
      { type: 'string', value: 'post-gain'},
    ];

    if (typeof level === 'number')
      args[1] = { type: 'float', value: level };

    return { address: '/audiotrack/send/level', args }
  }
};

module.exports = bus;