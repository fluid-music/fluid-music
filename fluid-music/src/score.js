const tab = require('./tab');
const fluid = require('./fluid/index')
const R = require('ramda');

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
 * @param {string} [rhythm] rhythm string, if not specified, `object`
 *    must have a `.r` property.
 * @param {NoteLibrary} [noteLibrary] An object or array noteLibrary (see
 *    tab.parseTab for details). If not specified, `object` must have a
 *    `.noteLibrary` property.
 * @param {number} [startTime]
 * @param {string} [vPattern]
 * @param {NoteLibrary} [vLibrary]
 * @param {Object} [tracksObject] This is a container for all tracks. It is
 *    returned when at least one of the following is true:
 *    1. `object` is a JS Object (as opposed to a string or array).
 *    2. `object` is an array, and no `tracksObject` was passed in. 
 * @param {string} [trackKey] The name of the track that we are currently parsing.
 * @returns {TracksObject} representation of the score.
 */
const buildTracks = function(object, rhythm, noteLibrary, startTime, vPattern, vLibrary, tracksObject, trackKey) {
  if (typeof startTime !== 'number') startTime = 0;
  if (object.hasOwnProperty('noteLibrary')) noteLibrary = object.noteLibrary;
  if (object.hasOwnProperty('vLibrary')) vLibrary = object.vLibrary;
  if (object.hasOwnProperty('r')) rhythm = object.r;
  if (object.hasOwnProperty('v')) vPattern = object.v;

  const isOutermost = (tracksObject === undefined);
  if (isOutermost) tracksObject = { };
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
  // - call score.buildTracks on children
  // - pass the appropriate tracksObject/trackKey to each score.buildTracks call
  //
  // The string handler must:
  // - create clips with a .startTime and .duration
  // - add those clips to the tracksObjects[trackKey].clips array
  //
  // The object handler must:
  // - return a TracksObject representation of the ScoreObject input
  if (Array.isArray(object)) {
    let duration = 0;
    const results = [];
    for (let o of object) {
      if (o === undefined) debugger;
      let result = buildTracks(o, rhythm, noteLibrary, startTime + duration, vPattern, vLibrary, tracksObject, trackKey);
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
    if (rhythm === undefined || noteLibrary === undefined)
    throw new Error(`score.buildTracks encountered a pattern (${object}), but could not find rhythm AND a noteLibrary`);

    const a = parseRhythm(rhythm);
    const duration = a.totals[a.totals.length-1];
    const result = parseTab(rhythm, object, noteLibrary, vPattern, vLibrary);
    result.startTime = startTime;
    result.duration = duration;

    if (!tracksObject[trackKey]) tracksObject[trackKey] = {clips:[]};
    tracksObject[trackKey].clips.push(result);

    return result;
  } else {
    // Assume we have a JavaScript Object
    let duration = 0;
    for (let [key, val] of Object.entries(object)) {
      if (reservedKeys.hasOwnProperty(key)) continue;

      // Ensure track and track.clips exists
      if (!tracksObject.hasOwnProperty(key)) {
        tracksObject[key] = { clips: [] };
      }

      let result = buildTracks(val, rhythm, noteLibrary, startTime, vPattern, vLibrary, tracksObject, key);
      if (result.duration > duration) duration = result.duration;
    }

    tracksObject.duration = duration;
    return tracksObject;
  }
};

const parse = function(scoreObject) {
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
        messages.push(fluid.audiotrack.insertWav(`s${i++}`, startTime, sample.n.path));
      }
    }
  }

  return messages;
};

module.exports = {
  buildTracks,
  parse,
}
