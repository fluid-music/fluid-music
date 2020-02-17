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
    return { address: '/audiotrack/insert/wav', args };
  },

  /**
   * Selects a track, ensuring that it has a bus return. Afterwords, other
   * tracks can add sends that target the track selected with this method.
   *
   * Use the audiotrack.send method to send from other tracks to a return.
   *
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
   * @param {string} busName The name of the return bus to send to
   * @param {number} [levelDb=0] default on the server is 0
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

    return { address: '/audiotrack/send/set/db', args };
  },

  mute(mute = true) {
    if (mute) return { address: '/audiotrack/mute'};
    else return { address: '/audiotrack/unmute'};
  },

  unmute() { return { address: '/audiotrack/unmute'}},

  gain(dBFS) {
    if (typeof dBFS !== 'number')
      throw new Error('audiotrack.gain requires a number in dBFS');

    return {
      address: '/audiotrack/set/db',
      args: [{ type: 'float', value: dBFS }],
    };
  },

  /**
   * Render a region of the track to an audio file. If no time range is
   * supplied, the engine should use the loop time range.
   *
   * @param {string} outFilename output filename
   * @param {number} [startQuarterNotes] start time in quarter notes
   * @param {number} [durationQuarterNotes] duration in quarter notes
   */
  renderRegion(outFilename, startQuarterNotes, durationQuarterNotes) {
    if (typeof outFilename !== 'string')
      throw new Error('audiotrack.renderRegion requires a outputFilename string');

    const args =  [{ type: 'string', value: outFilename }];

    if (startQuarterNotes !== undefined || durationQuarterNotes !== undefined) {
      if (typeof startQuarterNotes !== 'number' ||
          typeof durationQuarterNotes !== 'number')
      {
        const msg =
          'An invalid time range was supplied to renderRegion: ' +
          'Both start and duration values must be numbers.';
        throw new Error(msg);
      }
    }

    if (typeof startQuarterNotes === 'number') {
      args.push({ type: 'float', value: startQuarterNotes });
      args.push({ type: 'float', value: durationQuarterNotes });
    }

    return { args, address: '/audiotrack/region/render' }
  },
}

module.exports = audiotrack;
