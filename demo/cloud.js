const _ = require('underscore');
const fluid = require('fluid-music');
const valueToMidiNoteNumber = fluid.converters.valueToMidiNoteNumber;

/** output a 0-1 sawtooth generator for the given period */
const saw = (period) => (time) => ((time % period) / period);

/** output a sine generator */
const sin = (period, gain = 1, offset = 0, phaseOffset = 0) =>
  (time) => Math.sin((time * 2 * Math.PI / period) + phaseOffset) * gain + offset;

/** output a cosine generator */
const cos = (period, gain = 1, offset = 0, phaseOffset = 0) =>
  (time) => Math.cos((time * 2 * Math.PI / period) + phaseOffset) * gain + offset;

/** Start at 0, go up to one, back to zero */
const bump = (period, min = 0, max = 1) => {
  const f = sin(period, 0.5, 0.5, Math.PI * 3 / 2);
  return (time) => f(time) * (max-min) + min;
};

/** start at 1, go to zero, back to one */
const scoop = (period, min = 0, max = 1) => {
  const f = sin(period, 0.5, 0.5, Math.PI / 2);
  return (time) => f(time) * (max-min) + min;
};

const random = {
  choice(array) { return array[_.random(array.length-1)]; },
  range(min, max) { return Math.random() * (max-min) + min; },
}

const allOctaves = (note) => {
  const noteNum = valueToMidiNoteNumber(note) % 12;
  const octaves = noteNum <= 7 ? 11 : 10;
  return _.range(noteNum, octaves * 12  + noteNum, 12).slice(3, -1);
};

const create = (availableNotes, opts) => {

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
      v: Math.round(getVelocity(t)),
    });
  }
  return notes;
}

module.exports = { saw, sin, cos, bump, scoop, allOctaves, create, random };
