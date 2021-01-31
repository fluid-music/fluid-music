
/**
 * Set the reversed state of the selected audio clip
 * @param {boolean} reverse true=reverse false=forward
 */
export function reverse(reverse = true) {
  const address = reverse ? '/audioclip/reverse' : '/audioclip/unreverse';
  return { address };
};

/**
 * Set a fade in and fade out. No effect if there is no selected clip, or the
 * selected clip is a midi clip.
 * @param fadeInSeconds fade in time in seconds
 * @param fadeOutSeconds fade out time in seconds
 */
export function fadeInOutSeconds(fadeInSeconds: number|undefined, fadeOutSeconds : number|undefined) {
  if (typeof fadeOutSeconds !== 'number' && typeof fadeInSeconds !== 'number')
    throw new Error('audioclip fade has no values');

  const args : any[] = [
    { type: 'string', value: '' },
    { type: 'string', value: '' },
  ];

  if (typeof fadeInSeconds === 'number') args[0] = { type: 'float', value: fadeInSeconds };
  if (typeof fadeOutSeconds === 'number') args[1] = { type: 'float', value: fadeOutSeconds };

  return { address: '/audioclip/fade/seconds', args };
};

/**
 * Set the fade in time in seconds. No effect if there is no selected clip, or
 * the selected clip is a midi clip.
 * @param seconds fade in time in seconds
 */
export function fadeIn(seconds : number) {
  return fadeInOutSeconds(seconds, undefined);
};

/**
 * Set the fade out time in seconds. No effect if there is no selected clip,
 * or the selected clip is a midi clip.
 * @param seconds fade in time in seconds
 */
export function fadeOut(seconds: number) {
  return fadeInOutSeconds(undefined, seconds);
};

/**
 * Adjust the gain of the selected audio clip.
 * @param {number} dBFS full scale decibel to set
 */
export function gain(dBFS : number) {
  if (typeof dBFS !== 'number')
    throw new Error('audioclip.gain requires a dBFS number');

  return {
    address: '/audioclip/set/db',
    args: [{ type: 'float', value: dBFS }],
  };
};

/**
 * Set the audio clips semitone offset (when the audio clip plays, its pitch
 * will be offset by this value).
 * @param semitones
 */
export function pitchSemitones(semitones : number) {
  if (typeof semitones !== 'number')
    throw new Error('pitchSemitones requires a semitones number')

  return {
    address: '/audioclip/set/pitch',
    args: [{ type: 'float', value: semitones }]
  }
}
