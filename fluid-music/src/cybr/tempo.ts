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

