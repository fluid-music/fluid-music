/**
 * @namespace audioclip
 */
const audioclip = {
  /**
   * Set the reversed state of the selected audio clip
   * @param {boolean} reverse true=reverse false=forward
   */
  reverse(reverse = true) {
    const address = reverse ? '/audioclip/reverse' : '/audioclip/unreverse';
    return { address };
  },

  /**
   * Set a fade in and fade out. No effect if there is no selected clip, or the
   * selected clip is a midi clip.
   * @param {number} fadeInSeconds fade in time in seconds
   * @param {number} fadeOutSeconds fade out time in seconds
   */
  fadeInOutSeconds(fadeInSeconds, fadeOutSeconds) {
    if (typeof fadeOutSeconds !== 'number' && typeof fadeInSeconds !== 'number')
      throw new Error('audioclip fade has no values');

    const args = [
      { type: 'string', value: '' },
      { type: 'string', value: '' },
    ];

    if (typeof fadeInSeconds === 'number') args[0] = { type: 'float', value: fadeInSeconds };
    if (typeof fadeOutSeconds === 'number') args[1] = { type: 'float', value: fadeOutSeconds };

    return { address: '/audioclip/fade/seconds', args };
  },

  /**
   * Set the fade in time in seconds. No effect if there is no selected clip, or
   * the selected clip is a midi clip.
   * @param {number} seconds fade in time in seconds
   */
  fadeIn(seconds) {
    return audioclip.fadeInOutSeconds(seconds);
  },

  /**
   * Set the fade out time in seconds. No effect if there is no selected clip,
   * or the selected clip is a midi clip.
   * @param {number} seconds fade in time in seconds
   */
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