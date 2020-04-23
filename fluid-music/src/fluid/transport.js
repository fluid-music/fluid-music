/**
 * @namespace transport
 */
const transport = {
  play() { return { address: '/transport/play',} },
  stop() { return { address: '/transport/stop',} },

  /**
   * Set loop points, and enable looping.
   * @param {Number|false} startTimeInWholeNotes - The number of quarter notes
   *    at which the loop should begin. Or `false`, which disables looping.
   * @param {Number} durationInWholeNotes - The length of the loop, measured in
   *    quarter notes.
   */
  loop(startTimeInWholeNotes, durationInWholeNotes) {
    if (startTimeInWholeNotes === false) {
      // disable looping
      startTimeInWholeNotes = 0;
      durationInWholeNotes = 0;
    }

    if (typeof startTimeInWholeNotes !== 'number' || typeof durationInWholeNotes !== 'number')
      throw new Error('transport.loop requires start and length times (in quarter notes)');

    return {
      address: '/transport/loop',
      args: [
        { type: 'float', value: startTimeInWholeNotes },
        { type: 'float', value: durationInWholeNotes },
      ],
    };
  },

  to(timeInWholeNotes) {
    if (typeof timeInWholeNotes !== 'number')
      throw new Error('transport.to requires a time (number of whole notes) to go to');

    return {
      address: '/transport/to',
      args: [
        { type: 'float', value: timeInWholeNotes },
      ]
    };
  },
};

module.exports = transport;