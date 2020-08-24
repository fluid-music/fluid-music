/**
 * @namespace sampler
 */

/**
 * Add a sample to the currently selected sampler.
 * @param {string} name the name of the sample to add
 * @param {string} filename the filename (relative to server WD, or absolute)
 * @param {Number} noteNum the Midi note number to add the sample to
 * @param {number} [gain=0] Gain in DBFS (0 is unity)
 * @param {number} [pan=0] pan (-1 = hard left, 1 = hard right)
 * @param {boolean} [oneShot=false]
 */
export function add(name, filename, noteNum, gain, pan, oneShot) {
  if (typeof name !== 'string')
    throw new Error('sampler.add needs a string note name');
  if (typeof filename !== 'string')
    throw new Error('sampler.add needs a string filename');
  if (typeof noteNum !== 'number')
    throw new Error('sampler.add needs noteNum integer');
  if (gain && typeof gain !== 'number')
    throw new Error('sampler.add gain must be a number');
  if (pan && typeof pan !== 'number')
    throw new Error('sampler.add pan must be a number');

  const msg = {
    address: '/plugin/sampler/add',
    args: [
      { type: 'string', value: name },
      { type: 'string', value: filename },
      { type: 'integer', value: noteNum },
    ],
  };

  msg.args.push((typeof gain === 'number') ? { type: 'float', value: gain } : { type: 'string', value: '' });
  msg.args.push((typeof pan === 'number') ? { type: 'float', value : pan } : { type: 'string', value: '' });
  msg.args.push((typeof oneShot === 'boolean') ? { type: 'integer', value: oneShot ? 1 : 0 } : { type: 'string', value: '' });

  return msg;
}

export function clearAll() {
  return { address: '/plugin/sampler/clear-all' };
}
