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

export function setTimeSignature(upper : number, lower : number, startTime : number = 0) {
  if (upper < 1 || upper > 16 || !([2, 4, 8, 16, 32].includes(lower)))
    throw new Error(`Invalid time signature value: ${upper}/${lower}`)

  return {
    address: '/tempo/set/timesig',
    args: [
      { type: 'integer', value: upper },
      { type: 'integer', value: lower },
      { type: 'float', value: startTime },
    ]
  }
}
