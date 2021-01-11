/**
 * Begin playback
 */
export function play() { return { address: '/transport/play' }; }

 /**
 * Stop playback
 */
export function stop() { return { address: '/transport/stop' }; }

/**
 * Set loop points, and enable looping.
 * @param startTimeInWholeNotes The number of whole notes at which the loop
 *    should begin. Or `false`, which disables looping.
 * @param durationInWholeNotes The length of the loop, measured in whole notes.
 */
export function loop(startTimeInWholeNotes : number|boolean, durationInWholeNotes? : number) {
  if (startTimeInWholeNotes === false) {
    // disable looping
    startTimeInWholeNotes = 0;
    durationInWholeNotes = 0;
  } else if (startTimeInWholeNotes === true) {
    throw new Error('to enable looping, the first argument to transport.loop must be a startTime number (not `true`)')
  }

  if (typeof startTimeInWholeNotes !== 'number' || typeof durationInWholeNotes !== 'number')
    throw new Error('transport.loop requires start and length times (in whole notes)');

  return {
    address: '/transport/loop',
    args: [
      { type: 'float', value: startTimeInWholeNotes },
      { type: 'float', value: durationInWholeNotes },
    ],
  };
}

/**
 * Move the playback transport
 */
export function to(timeInWholeNotes) {
  if (typeof timeInWholeNotes !== 'number')
    throw new Error('transport.to requires a time (number of whole notes) to go to');

  return {
    address: '/transport/to',
    args: [
      { type: 'float', value: timeInWholeNotes },
    ]
  };
}
