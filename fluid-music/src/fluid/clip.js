const clip = {
  /**
   * Render the selected clip (audio or midi) to an audio file.
   * @param {string} filename output file name
   * @param {number} [tailInSeconds] optionally render addition reverb tail
   */
  render(filename, tailInSeconds) {
    if (typeof filename !== 'string')
      throw new Error('clip.render filename must be a string');

    if (tailInSeconds && typeof tailInSeconds !== 'number')
      throw new Error('clip.render got a non-number tailInSeconds argument');

    args = [{ type: 'string', value: filename }];

    if (typeof tailInSeconds === 'number')
      args.push({ type: 'float', value: tailInSeconds });

    return { address: '/clip/render', args };
  }
};

module.exports = clip;
