const R     = require('ramda');
const tab   = require('./tab');
const fluid = require('./fluid/index')

const parseTab     = tab.parseTab;
const parseRhythm  = tab.parseRhythm;
const reservedKeys = tab.reservedKeys;

/**
 * score.buildTracks recurses over a ScoreObject, often extracted from a YAML
 * file. It is somewhat similar to tab.parse, except that it expects a different
 * input format, and outputs a `ScoreObject` instead of an array of notes.
 *
 * - In the input (ScoreObject) arrays indicate a sequence
 * - In the output (TracksObject) arrays are a collection of clips (with
 *   `.duration` and `.startTime` properties)
 *
 * @param {ScoreObject|Array|String} object Typically, `buildTracks` will be
 *    called with a single `ScoreObject` as the sole argument. The other
 *    arguments are used internally when recursing over the properties of the
 *    ScoreObject input.
 * @param {Object} [config]
 * @param {string} [config.rhythm] default rhythm string, which may be
 *    overridden by values in `object`. If not specified, `object` must have a
 *   `.r` property.
 * @param {string} [config.trackKey] name of the track being parsed
 * @param {string} [config.vPattern] optional velocity library
 * @param {NoteLibrary} [config.vLibrary]
 * @param {NoteLibrary} [config.noteLibrary] An object or array noteLibrary (see
 *    tab.parseTab for details). If not specified, `object` must have a
 *    `.noteLibrary` property.
 * @param {number} [config.startTime]
 * @param {Object} [tracksObject] This is a container for all tracks. It is
 *    returned when at least one of the following is true:
 *    1. `object` is a JS Object (as opposed to a string or array).
 *    2. `object` is an array, and no `tracksObject` was passed in. 
 * @returns {TracksObject} representation of the score.
 */
const buildTracks = function(object, config, tracksObject) {
  const isOutermost = (tracksObject === undefined);
  if (isOutermost) tracksObject = {};

  if (!config) config = {};
  else config = Object.assign({}, config); // Shallow copy should be ok

  if (object.hasOwnProperty('noteLibrary')) config.noteLibrary = object.noteLibrary;
  if (object.hasOwnProperty('vLibrary'))    config.vLibrary = object.vLibrary;
  if (object.hasOwnProperty('r'))           config.r = object.r;
  if (object.hasOwnProperty('v'))           config.v = object.v;
  // Note that we cannot specify a .startTime in a score like we can for rhythms
  if (typeof config.startTime !== 'number') config.startTime = 0;

  // Internally, there are three handlers for (1)arrays (2)strings (3)objects
  //
  // All three handlers must:
  // - return an object that has a .duration property. Duration are interperated
  //   differently for Arrays, Objects, and Strings found in the input object.
  //   - Array:  sum of the duration of the array's elements
  //   - Object: duration of the longest child
  //   - string: duration of the associated rhythm string
  //
  // The array and object handlers must:
  // - create an appropriate `config` object for each child
  // - call score.buildTracks on each child
  //
  // The string handler must:
  // - create clips with a .startTime and .duration
  // - add those clips to the tracksObjects[trackKey].clips array
  //
  // The object handler must:
  // - return a TracksObject representation of the ScoreObject input
  if (Array.isArray(object)) {
    const results = [];
    let duration = 0;
    let startTime = config.startTime;
    for (let o of object) {
      config.startTime = startTime + duration;
      let result = buildTracks(o, config, tracksObject);
      results.push(result);
      duration += result.duration;
    }
    results.duration = duration;
    if (isOutermost) {
      tracksObject.duration = duration;
      return tracksObject;
    }
    return results;
  } else if (typeof object === 'string') {
    // We have a string that can be parsed with parseTab
    if (config.r === undefined || config.noteLibrary === undefined)
    throw new Error(`score.buildTracks encountered a pattern (${object}), but could not find rhythm AND a noteLibrary`);

    const a = parseRhythm(config.r);
    const duration = a.totals[a.totals.length-1];
    const result = parseTab(config.r, object, config.noteLibrary, config.v, config.vLibrary);
    result.startTime = config.startTime;
    result.duration = duration;

    const trackKey = config.trackKey;
    if (!tracksObject[trackKey]) tracksObject[trackKey] = {clips:[]};
    tracksObject[trackKey].clips.push(result);

    return result;
  } else {
    // Assume we have a JavaScript Object
    let duration = 0;
    for (let [key, val] of Object.entries(object)) {
      if (reservedKeys.hasOwnProperty(key)) continue;
      config.trackKey = key;
      let result = buildTracks(val, config, tracksObject);
      if (result.duration > duration) duration = result.duration;
    }

    tracksObject.duration = duration;
    return tracksObject;
  }
};

function midiVelocityToDbfs(v, min = -60, max = 6) {
  const range = max - min;
  return R.clamp(min, max, v / 127 * range + min);
}

function parse(scoreObject) {
  const tracksObject = buildTracks(scoreObject);
  const messages = [];
  let i = 0;
  for (let [trackName, track] of Object.entries(tracksObject)) {
    if (tab.reservedKeys.hasOwnProperty(trackName)) {
      continue;
    }

    if (!track.clips) {
      console.log(`skipping ${trackName}, because it has no .clips`);
      continue;
    }

    messages.push(fluid.audiotrack.select(trackName));
    for (let clip of track.clips) {
      let midiNotes = clip.filter(event => typeof event.n === 'number');
      let samples   = clip.filter(event => event.n && event.n.type === 'file');
      if (midiNotes.length) {
        messages.push(fluid.midiclip.create(`clip${i++}`, clip.startTime * 4, clip.duration * 4, midiNotes));
      }
      for (let sample of samples) {
        let startTime = (clip.startTime + sample.s) * 4;
        messages.push(
          fluid.audiotrack.insertWav(`s${i++}`, startTime, sample.n.path),
          fluid.audioclip.gain(midiVelocityToDbfs(sample.v, -10, 10)),
        )
      }
    }
  }

  return messages;
};

function getDuration(score) {
  return buildTracks(score).duration;
};

module.exports = {
  buildTracks,
  getDuration,
  midiVelocityToDbfs,
  parse,
}
