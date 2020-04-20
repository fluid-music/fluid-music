/**
 * @namespace transport
 */
const transport = {
  play() { return { address: '/transport/play',} },
  stop() { return { address: '/transport/stop',} },

  /**
   * Set loop points, and enable looping.
   * @param {Number|false} startQuarterNotes - The number of quarter notes at
   *        which the loop should begin. Or `false`, which disables looping.
   * @param {Number} lengthQuarterNotes - The length of the loop, measured in
   *        quarter notes.
   */
  loop(startQuarterNotes, lengthQuarterNotes) {
    if (startQuarterNotes === false) {
      // disable looping
      startQuarterNotes = 0;
      lengthQuarterNotes = 0;
    }

    if (typeof startQuarterNotes !== 'number' || typeof lengthQuarterNotes !== 'number')
      throw new Error('transport.loop requires start and length times (in quarter notes)');

    return {
      address: '/transport/loop',
      args: [
        { type: 'float', value: startQuarterNotes },
        { type: 'float', value: lengthQuarterNotes },
      ],
    };
  },

  to(quarterNotes) {
    if (typeof quarterNotes !== 'number')
      throw new Error('transport.to requires number of beats to go to');

    return {
      address: '/transport/to',
      args: [
        { type: 'float', value: quarterNotes },
      ]
    };
  },
};

module.exports = transport;