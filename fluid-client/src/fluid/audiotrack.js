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
}

module.exports = audiotrack;