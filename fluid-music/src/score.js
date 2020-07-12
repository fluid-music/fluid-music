const R       = require('ramda');
const tab     = require('./tab');
const fluid   = require('./fluid/index');
const mappers = require('./event-mappers');

const parseTab     = tab.parseTab;
const parseRhythm  = tab.parseRhythm;
const reservedKeys = tab.reservedKeys;

/**
 * score.parse is somewhat similar to tab.parse, except that it expects a
 * different input format, and outputs a `Session` instead of an array of notes.
 *
 * Typically called with two arguments (other args are for internal use only)
 * - A ScoreObject array
 * - A config object with (at minimum) a `.nLibrary` and `.r`hythm
 *
 * @param {ScoreObject|String} scoreObject The Score Object to parse
 * @param {Object} [config]
 * @param {number} [config.startTime=0]
 * @param {string} [config.r] default rhythm string, which may be
 *    overridden by values in `scoreObject`. If not specified, `scoreObject` must have a
 *   `.r` property.
 * @param {string} [config.trackKey] name of the track being parsed
 * @param {string} [config.d] optional dynamicLibrary
 * @param {NoteLibrary} [config.dLibrary]
 * @param {NoteLibrary} [config.nLibrary] (see tab.parseTab for details about
 *   `NoteLibrary`). If not specified, `scoreObject` must have a `.nLibrary` property.
 * @param {Session} [session] Only used in recursion. Consuming code should not
 *    supply this argument.
 * @returns {Session} representation of the score.
 */
function parse(scoreObject, config, session, tracks={}) {
  const isOutermost = (session === undefined);
  if (isOutermost) session = {};

  if (!config) config = {};
  else config = Object.assign({}, config); // Shallow copy should be ok

  if (scoreObject.hasOwnProperty('nLibrary')) config.nLibrary = scoreObject.nLibrary;
  if (scoreObject.hasOwnProperty('dLibrary')) config.dLibrary = scoreObject.dLibrary;
  if (scoreObject.hasOwnProperty('r'))        config.r = scoreObject.r;
  if (scoreObject.hasOwnProperty('d'))        config.d = scoreObject.d;
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
  // - call score.parse on each child
  //
  // The string handler must:
  // - create clips with a .startTime and .duration
  // - add those clips to the sessions[trackKey].clips array
  //
  // The object handler must:
  // - return a TracksObject representation of the ScoreObject input

  const returnValue = {
    startTime: config.startTime,
    duration: 0,
  };
  if (isOutermost) returnValue.tracks = tracks;

  if (Array.isArray(scoreObject)) {
    let arrayStartTime = config.startTime;
    returnValue.regions = [];
    for (let o of scoreObject) {
      config.startTime = arrayStartTime + returnValue.duration;
      let result = parse(o, config, session, tracks);
      returnValue.regions.push(result);
      returnValue.duration += result.duration;
    }
    return returnValue;
  } else if (typeof scoreObject === 'string') {
    // We have a string that can be parsed with parseTab
    if (config.r === undefined)
      throw new Error(`score.parse encountered a pattern (${scoreObject}), but could not find a rhythm`);
    if (config.nLibrary === undefined)
      throw new Error(`score.parse encountered a pattern (${scoreObject}), but could not find a nLibrary`);

    const duration = R.last(parseRhythm(config.r).totals);
    const result = parseTab(config.r, scoreObject, config.nLibrary, config.d, config.dLibrary);
    result.startTime = config.startTime;
    result.duration = duration;

    const trackKey = config.trackKey;
    if (!tracks[trackKey]) tracks[trackKey] = {clips: [], name: trackKey};
    tracks[trackKey].clips.push(result);

    return result;
  } else {
    // Assume we have a JavaScript Object
    for (let [key, val] of Object.entries(scoreObject)) {
      if (reservedKeys.hasOwnProperty(key) && key !== 'clips') continue;
      if (key !== 'clips') config.trackKey = key; // if key='clips' use parent key
      let result = parse(val, config, session, tracks);
      if (result.duration > returnValue.duration) returnValue.duration = result.duration;
      returnValue[config.trackKey] = result;
    }
    return returnValue;
  }
};

/**
 * Create a `FluidMessage` from a `TracksObject`
 *
 * ```javascript
 * const session = fluid.score.parse(myScore, myConfig);
 * const message = fluid.score.tracksToFluidMessage(session.tracks);
 * const client = new fluid.Client();
 * client.send(message);
 * ```
 *
 * @param {TracksObject} tracksObject A tracks object generated by score.parse
 * @param {eventMapper[]} customEventMappers tracksToFluidMessage will call each
 *    function in this array on each NoteObject that is being parsed. Put
 *    custom functions in here to override or augment the default NoteObject
 *    handlers.
 * @returns {FluidMessage}
 */
function tracksToFluidMessage(tracksObject, customEventMappers=[]) {
  const sessionMessages = [];
  let i = 0;

  // Ensuring that eventMappers it is an array
  if (typeof customEventMappers === 'function') customEventMappers = [customEventMappers];
  if (!Array.isArray(customEventMappers))
    throw new Error('tracksToFluidMessage: received invalid eventMappers arg');

  // Add the the default eventMappers
  customEventMappers = customEventMappers.concat(mappers.default);

  // // example tracks object
  // const tracks = {
  //   bass: { clips: [ clip1, clip2... ] },
  //   kick: { clips: [ clip1, clip2... ] },
  // };
  for (const [trackName, track] of Object.entries(tracksObject)) {
    if (tab.reservedKeys.hasOwnProperty(trackName)) {
      continue;
    }

    if (!track.clips || !track.clips.length) {
      console.log(`skipping ${trackName}, because it has no .clips`);
      continue;
    }

    // Create a sub-message for each track
    let trackMessages = [];
    trackMessages.push(fluid.audiotrack.select(trackName));
    sessionMessages.push(trackMessages);

    track.clips.forEach((clip, clipIndex) => {

      // Create a sub-message for each clip. Note that the naming convention
      // gets a little confusing, because we do not yet know if "clip" contains
      // a single "Midi Clip", a collection of audio clips/events, or both.
      const clipMessages = [];
      trackMessages.push(clipMessages);

      // Create one EventContext object for each clip.
      const context = {
        track,
        clip,
        clipIndex,
        messages: clipMessages,
        tracks: tracksObject,
        data: {},
      };

      let events = clip.events.flat();
      for (const eventMapper of customEventMappers) {
        events = events.flatMap((noteEvent, i) => {
          context.eventIndex = i;
          return eventMapper(noteEvent, context);
        }).filter(noteEvent => !!noteEvent);
      };
    }); // track.clips.forEach
  } // for (track of tracks)

  return sessionMessages;
};

module.exports = {
  tracksToFluidMessage,
  parse,
}
