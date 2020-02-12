const audioclip = {
  reverse(reverse = true) {
    const address = reverse ? '/audioclip/reverse' : '/audioclip/unreverse';
    return { address };
  },

  fadeInOutSeconds(fadeInSeconds, fadeOutSeconds) {
    if (typeof fadeOutSeconds !== 'number' && typeof fadeInSeconds !== 'number')
      throw new Error('audioclip fade has no values');

    const args = [
      { type: 'string', value: '' },
      { type: 'string', value: '' },
    ];

    if (typeof fadeInSeconds) args[0] = { type: 'float', value: fadeInSeconds };
    if (typeof fadeOutSeconds) args[1] = { type: 'float', value: fadeOutSeconds };

    return { address: '/audioclip/fade/seconds', args };
  },

  fadeIn(seconds) {
    return audioclip.fadeInOutSeconds(seconds);
  },

  fadeOut(seconds) {
    return audioclip.fadeInOutSeconds(null, seconds);
  },

  /**
   * Adjust the gain of the selected audio clip.
   * @param {number} dBFS full scale decibel to set
   */
  gain(dBFS) {
    if (typeof dBFS !== 'number')
      throw new Error('audioclip.gain requires a dBFS number');

    return {
      address: '/audioclip/set/db',
      args: [{ type: 'float', value: dBFS }],
    };
  },
};

module.exports = audioclip;