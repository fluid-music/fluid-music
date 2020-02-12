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
};

module.exports = audioclip;