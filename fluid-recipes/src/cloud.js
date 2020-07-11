const _ = require('underscore');
const fluid = require('fluid-music');
const valueToMidiNoteNumber = fluid.converters.valueToMidiNoteNumber;

/**
 * Waveform generator function
 *
 * @callback waveGenerator
 * @param {number} time - input time
 * @returns {number} value - output value
 */

/**
 * Create a 0-1 sawtooth generator for the given period
 * @param {number} period - period of the waveform
 * @returns {waveGenerator} - sawtooth generator function
 */
const saw = (period) => (time) => ((time % period) / period);

/**
 * Create a sine wave generator function
 * @param {number} period - waveform period
 * @param {number} [gain=1] - output gain multiplier (pre-offset)
 * @param {number} [offset=0] - added to the output waveform (post-gain)
 * @param {number} [phaseOffset=0] - waveform phase offset in radians
 * @returns {waveGenerator} sine wave generator
 */
const sin = (period, gain = 1, offset = 0, phaseOffset = 0) =>
  (time) => Math.sin((time * 2 * Math.PI / period) + phaseOffset) * gain + offset;

/**
 * Create a cosine wave generator function
 * @param {number} period - waveform period
 * @param {number} [gain=1] - output gain multiplier (pre-offset)
 * @param {number} [offset=0] - added to the output waveform (post-gain)
 * @param {number} [phaseOffset=0] - waveform phase offset in radians
 * @returns {waveGenerator} cosine wave generator function
 */
const cos = (period, gain = 1, offset = 0, phaseOffset = 0) =>
  (time) => Math.cos((time * 2 * Math.PI / period) + phaseOffset) * gain + offset;

/**
 * Create a waveform that looks like a speed bump, starting at `min`, rising up
 * to `max`, and falling back to `min` in the duration of `period`.
 * @param {number} period - duration of the full oscillation
 * @param {number} [min=0] - starting value at `t=0`
 * @param {number} [max=1] - peak value at `t=period/2`
 * @returns {waveGenerator} 'bump' generator function
 */
const bump = (period, min = 0, max = 1) => {
  const f = sin(period, 0.5, 0.5, Math.PI * 3 / 2);
  return (time) => f(time) * (max-min) + min;
};

/**
 * Create a waveform that looks like a valley, starting at `max`, falling to
 * to `min`, and rising back to `max` in the duration of `period`.
 * @param {number} period - duration of the full oscillation
 * @param {number} [min=0] - starting value at `t=0`
 * @param {number} [max=1] - peak value at `t=period/2`
 * @returns {waveGenerator} 'scoop' generator function
 */
const scoop = (period, min = 0, max = 1) => {
  const f = sin(period, 0.5, 0.5, Math.PI / 2);
  return (time) => f(time) * (max-min) + min;
};

const random = {
  /**
   * Randomly get one item from an array
   * @param {any} array[] - array of anything
   * @returns {any} an item from the array, or undefined if array is empty.
   */
  choice(array) { return array.length ? array[_.random(array.length-1)] : undefined; },

  /**
   * Get a random floating point value between `min` and `max`. Inclusive of
   * `min` and exclusive of `max`
   * @param {number} min
   * @param {number} max
   * @returns {number} min <= value < max
   */
  range(min, max) { return Math.random() * (max-min) + min; },
};

/**
 * Create an array of note numbers, repeating the input note in many octaves.
 * The result may not very low notes below c2 (midi note 36).
 *
 * @param {any} note - any value that can be handled by
 *        fluid.converters.valueToMidiNoteNumber. Ex: `c#4'`, `61` or `'c4+1'`.
 * @returns {number[]} An array of note numbers
 */
const allOctaves = (note) => {
  const noteNum = valueToMidiNoteNumber(note) % 12;
  const octaves = noteNum <= 7 ? 11 : 10;
  return _.range(noteNum, octaves * 12  + noteNum, 12).slice(3, -1);
};

/**
 * @typedef {Object} cloudOptions
 * @property {number} [durationInWholeNotes=8] - Duration of the cloud
 * @property {number} [shortestDelta=1/32] - At the peak of the cloud, notes be
 *    close together. The distance between each node will be a random number
 *    between 0 and `shortestDelta`.
 * @property {number} [longestDelta=1/4] - At the start and end of the ramp,
 *    notes will be farther apart. The distance between each note will be a
 *    random number between 0 and `longestDelta`.
 */

/**
 * Generate a stochastic 'cloud' of note objects. These will start sparsely,
 * ramp up to many high velocity notes, and ramp back to low velocity sparse,
 * notes.
 * @param {number[]} availableNotes - an array of note objects
 * @param {cloudOptions} [opts] - cloud configuration parameters
 */
const create = (availableNotes, opts={}) => {

  opts = Object.assign({
    durationInWholeNotes: 8,
    shortestDelta: 1/32,
    longestDelta: 1/4
  }, opts);

  if (opts.shortestDelta > opts.longestDelta) {
    const temp = opts.shortestDelta;
    opts.shortestDelta = opts.longestDelta;
    opts.longestDelta = temp;
  }

  const duration = opts.durationInWholeNotes;
  const notes = [];
  const getDeltaTime = scoop(duration, opts.shortestDelta, opts.longestDelta);
  const getVelocity = bump(duration, 20, 127);
  const getLength = scoop(duration, 1/20, 1/2);

  let t = 0;
  while (t < duration) {
    let dt = random.range(0, getDeltaTime(t));
    t += dt;
    notes.push({
      n: random.choice(availableNotes),
      s: t,
      l: getLength(t),
      d: Math.round(getVelocity(t)),
    });
  }
  return notes;
}

module.exports = { saw, sin, cos, bump, scoop, allOctaves, create, random };
