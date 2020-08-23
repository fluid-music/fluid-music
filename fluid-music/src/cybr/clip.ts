/**
 * Render the selected clip (audio or midi) to an audio file.
 * @param {string} filename output file name
 * @param {number} [tailInSeconds] optionally render addition reverb tail
 */
export function render(filename, tailInSeconds) {
  if (typeof filename !== 'string')
    throw new Error('clip.render filename must be a string');

  if (tailInSeconds && typeof tailInSeconds !== 'number')
    throw new Error('clip.render got a non-number tailInSeconds argument');

  const args : any[] = [{ type: 'string', value: filename }];

  if (typeof tailInSeconds === 'number')
    args.push({ type: 'float', value: tailInSeconds });

  return { address: '/clip/render', args };
};

/**
 * Select a clip on the currently selected track.
 * @param {string} clipName
 */
export function select(clipName) {
  if (typeof clipName !== 'string')
    throw new Error('clip.select clipName must be a string');

  return {
    address: '/clip/select',
    args: [{ type: 'string', value: clipName }],
  };
};

/**
 * Change the length of the clip.
 * @param {number} durationInWholeNotes new length of the clip
 * @param {boolean} [trimStart=false] if true, trim the beginning of the clip,
 *    effectively changing the start time
 */
export function length(durationInWholeNotes, trimStart=false) {
  if (typeof durationInWholeNotes !== 'number')
    throw new Error('clip.length requires a duration in whole notes');

  return {
    address: '/clip/set/length',
    args: [
      { type: 'float', value: durationInWholeNotes },
      { type: 'string', value: trimStart ? 'start' : 'end' },
    ],
  };
}

/**
 * Trim the clip. positive number will make the clip shorter from both the
 * beginning and the end. Unlike many methods, this operates with seconds
 * as the time unit instead of whole notes (or quarter notes).
 * @param {number} [secondsToStart=0]
 * @param {number} [secondsFromEnd=0]
 */
export function trimSeconds(secondsToStart = 0, secondsFromEnd = 0) {
  if (!secondsToStart) secondsToStart = 0;
  if (typeof secondsToStart !== 'number')
    throw new Error('clip.trimSeconds: if present, first argument must be number');
  if (typeof secondsFromEnd !== 'number')
    throw new Error('clip.trimSeconds: if present, second argument must be number');

  return {
    address: '/clip/trim/seconds',
    args: [
      { type: 'float', value: secondsToStart },
      { type: 'float', value: secondsFromEnd },
    ],
  };
}

/**
 * Update the source start time. This does not affect time that the clip is
 * positioned within the session.
 * @param {number} startAtSeconds Time in the source to start the clip
 */
export function setSourceOffsetSeconds(startAtSeconds) {
  if (typeof startAtSeconds !== 'number')
    throw new Error('clip.setSourceOffsetSeconds requires an offset number');

  return {
    address: '/clip/source/offset/seconds',
    args: [ { type: 'float', value: startAtSeconds} ],
  };
}
