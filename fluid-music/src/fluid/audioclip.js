const audioclip = {
  reverse(reverse = true) {
    const address = reverse ? '/audioclip/reverse' : '/audioclip/unreverse';
    return { address };
  },
};

module.exports = audioclip;