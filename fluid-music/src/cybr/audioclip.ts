
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

/**
 * Set time stretch mode. 
 * elastique and melodyne modes are only available if tracktion is 
 * built with elastique / melodyne.
 * 
 * Available modes:
 *  disabled = 0           // default
 *  elastiqueTransient = 1 // defunct
 *  elastiqueTonal = 2     // defunct
 *  soundtouchNormal = 3
 *  soundtouchBetter = 4
 *  melodyne = 5
 *  elastiquePro = 6
 *  elastiqueEfficient = 7
 *  elastiqueMobile = 8
 *  elastiqueMonophonic = 9
 * 
 * @param {number} mode the time stretch mode
 */
export function stretchMode(mode : number = 0) {
  if (typeof mode !== 'number')
    throw new Error('stretchMode requires a mode number')
  if (mode > 9 || mode < 0)
    throw new RangeError('stretchMode only accepts integers between 0 - 9')
  if (!Number.isInteger(mode))
    throw new TypeError('stretchMode requires an integer mode argument')

  return {
    address: '/audioclip/set/stretch-mode',
    args: [{ type: 'integer', value: mode }],
  }
}


/**
 * Set speed ratio for the clip.
 * @param {number} ratio the speed ratio from 0.02 to 10.
 */
export function speedRatio(ratio : number = 1) {
  if (typeof ratio !== 'number')
    throw new Error('stretchMode requires a mode number')
  if (ratio > 10 || ratio < 0.02)
    throw new RangeError('speedRatio only accepts numbers between 0.02 - 10')
  
  return {
    address: '/audioclip/set/speed-ratio',
    args: [{ type: 'float', value: ratio }],
  }
}