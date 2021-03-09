/**
 * Set the tempo at the beginning of the project
 * @param {number} bpm - Beats per minute
 */
export function set(bpm) {
  if (typeof bpm !== 'number')
    throw new Error('Cannot set tempo: missing bpm');

  return {
    address: '/tempo/set',
    args: [ { type: 'float', value: bpm } ],
  };
}

/**
 * Create a time signature at the specified time. If there is already a time
 * signature at this time, it will be replaced.
 * @param upper top number of the time signature
 * @param lower bottom number of the time signature
 * @param timeSeconds time at which to insert the time signature
 */
export function setTimeSignatureSeconds(upper : number, lower : number, timeSeconds : number = 0) {
  if (upper < 1 || upper > 16 || !([2, 4, 8, 16, 32].includes(lower)))
    throw new Error(`Invalid time signature value: ${upper}/${lower}`)

  // The OSC handler on the server is overloaded if that last (3rd) argument is
  // an integer, it will be treated as a bar number.
  return {
    address: '/tempo/set/timesig',
    args: [
      { type: 'integer', value: upper },
      { type: 'integer', value: lower },
      { type: 'double', value: timeSeconds },
    ]
  }
}

/**
 * Create a time signature at the specified time. If there is already a time
 * signature at this time, it will be replaced.
 * @param upper top number of the time signature
 * @param lower bottom number of the time signature
 * @param measureNumber measure number at which to insert the time signature,
 *    indexed from 1 (not 0).
 */
export function setTimeSignature(upper : number, lower : number, measureNumber : number = 1) {
  if (upper < 1 || upper > 16 || !([2, 4, 8, 16, 32].includes(lower)))
    throw new Error(`Invalid time signature value: ${upper}/${lower}`)

  if (measureNumber < 1)
    throw new Error(`Invalid measure number: ${measureNumber}. (measure numbers start at 1)`)

  // The OSC handler on the server is overloaded if that last (3rd) argument is
  // an integer, it will be treated as a bar number.
  return {
    address: '/tempo/set/timesig',
    args: [
      { type: 'integer', value: upper },
      { type: 'integer', value: lower },
      { type: 'integer', value: measureNumber },
    ]
  }
}