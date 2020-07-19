const R       = require('ramda');
const tab     = require('./tab');
const fluid   = require('./fluid/index');
const mappers = require('./event-mappers');

const parseTab     = tab.parseTab;
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

  if (scoreObject.hasOwnProperty('eventMappers')) config.eventMappers = scoreObject.eventMappers
  if (scoreObject.hasOwnProperty('nLibrary'))     config.nLibrary = scoreObject.nLibrary;
  if (scoreObject.hasOwnProperty('dLibrary'))     config.dLibrary = scoreObject.dLibrary;
  if (scoreObject.hasOwnProperty('r'))            config.r = scoreObject.r;
  if (scoreObject.hasOwnProperty('d'))            config.d = scoreObject.d;
  // Note that we cannot specify a .startTime in a score like we can for rhythms
  if (typeof config.startTime !== 'number') config.startTime = 0;

  // Internally, there are three handlers for (1)arrays (2)strings (3)objects
  //
  // All three handlers must:
  // - return an object that has a .duration property. Duration are interpreted
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

  let returnValue = {
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
  } else if (typeof scoreObject === 'string') {
    // We have a string that can be parsed with parseTab
    if (config.r === undefined)
      throw new Error(`score.parse encountered a pattern (${scoreObject}), but could not find a rhythm`);
    if (config.nLibrary === undefined)
      throw new Error(`score.parse encountered a pattern (${scoreObject}), but could not find a nLibrary`);

    const resultClip = parseTab(config.r, scoreObject, config.nLibrary, config.d, config.dLibrary);
    resultClip.startTime = config.startTime;
    if (config.eventMappers) resultClip.eventMappers = config.eventMappers;

    const trackKey = config.trackKey;
    if (!tracks[trackKey]) tracks[trackKey] = {clips: [], name: trackKey};
    tracks[trackKey].clips.push(resultClip);

    returnValue = resultClip;
  } else {
    // Assume we have a JavaScript Object
    for (let [key, val] of Object.entries(scoreObject)) {
      if (reservedKeys.hasOwnProperty(key) && key !== 'clips') continue;
      if (key !== 'clips') config.trackKey = key; // if key='clips' use parent key
      let result = parse(val, config, session, tracks);
      if (result.duration > returnValue.duration) returnValue.duration = result.duration;
      returnValue[config.trackKey] = result;
    }
  }

  if (isOutermost) applyEventMappers(returnValue)
  return returnValue;
};

/**
 * @param {Session} session
 * @param {eventMapper[]} [ubiquitousMappers] fluid supplies a default
 *    collection of mappers that are needed for proper parsing. To override
 *    the default mappers, specify null or an empty array.
 */
function applyEventMappers(session, ubiquitousMappers=mappers.default) {

  for (const [trackName, track] of Object.entries(session.tracks)) {
    if (tab.reservedKeys.hasOwnProperty(trackName)) {
      continue;
    }

    if (!track.clips || !track.clips.length) {
      console.log(`skipping ${trackName}, because it has no .clips`);
      continue;
    }

    track.clips.forEach((clip, clipIndex) => {
      const context = {
        track,
        tracks: session.tracks,
        clip,
        clipIndex,
        data: {},
      };

      ubiquitousMappers = ubiquitousMappers || []; // null overrides default
      let customMappers = [];
      if (clip.hasOwnProperty('eventMappers')) {
        customMappers = clip.eventMappers;
        delete clip.eventMappers;
      }
      const eventMappers = customMappers.concat(ubiquitousMappers);
      // The code below shows what data are available inside eventMapper
      // callbacks. The contents of context.clip.events can look different to
      // each round of callbacks. Note the order of the loops: In the first
      // round, the first callback will be called on each event, potentially
      // removing that event from clip.events. Then, the second callback in the
      // eventMappers array will be called on each event. During the second
      // round of callbacks, clip.events may have a different length than during
      // the first round. This will happen if, for example, the callbacks in the
      // first round returned falsy values (removing events from clip.events in
      // subsequent rounds) or arrays (adding events to clip.events). Note that
      // changes to the contents of context.clip.events only take effect between
      // rounds. The exception would be if a callback explicitly modifies
      // context.clip.events -- however this would be a very poor design choice.
      // Callbacks should never need to do this and it could cause subtle bugs.
      //
      // A callback that needs access to the original list of events can access
      // it via the clip.unmappedEvents array. Note that even though events in
      // the unmappedEvents array will not be added or removed by eventMappers,
      // they will still be mutated by event mappers, so the event.n members
      // will likely not look the same as the objects in the .nLibrary objects.
      clip.unmappedEvents = clip.events;
      clip.events = clip.events.flat();
      for (const eventMapper of eventMappers) {
        clip.events = clip.events.flatMap((event, i) => {
          context.eventIndex = i;
          return eventMapper(event, context);
        }).filter(event => !!event);
      }; // iterate over eventMappers
    });  // iterate over clips
  }      // iterate over tracks
}

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
 * @returns {FluidMessage}
 */
function tracksToFluidMessage(tracksObject) {
  const sessionMessages = [];
  let i = 0;

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
      // a single "Midi Clip", a collection of audio file events, or both.
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

      if (clip.midiEvents && clip.midiEvents.length) {
        clipMessages.push(midiEventsToFluidMessage(clip.midiEvents, context));
      }

      if (clip.fileEvents && clip.fileEvents.length) {
        clipMessages.push(fileEventsToFluidMessage(clip.fileEvents, context));
      }

    }); // track.clips.forEach
  } // for (track of tracks)

  return sessionMessages;
};

/**
 * @param {ClipEvent[]} midiEvents
 * @param {ClipEventContext} context This will not have a .eventIndex
 */
function midiEventsToFluidMessage(midiEvents, context) {
  if (typeof context.clip.startTime !== 'number')
    throw new Error('Clip is missing startTime');

  const msg = [];
  const clipName  = `${context.track.name} ${context.clipIndex}`
  const startTime = context.clip.startTime;
  const duration  = context.clip.duration;
  const clipMsg   = fluid.midiclip.select(clipName, startTime, duration)
  msg.push(clipMsg);

  for (const event of midiEvents) {
    if (event.n.type === 'midiNote')
      msg.push(fluid.midiclip.note(event.n.n, event.s, event.l, event.v));
  }

  return msg;
};

/**
 * @param {ClipEvent[]} fileEvents
 * @param {ClipEventContext} context This will not have a .eventIndex
 */
function fileEventsToFluidMessage(fileEvents, context) {
  if (typeof context.clip.startTime !== 'number')
    throw new Error('Clip is missing startTime');

  // exampleClipEvent = {
  //   s: 0.50, // start
  //   l: 0.25, // length
  //   n: { type: 'file', path: 'media/kick.wav' },
  //   d: { v: 70, dbfs: -10 }, // If .v is present here...
  //   v: 70,                   // ...it will also be here...
  //                            // (but vice versa is not guaranteed)
  // };

  return fileEvents.map((event, eventIndex) => {
    const startTime = context.clip.startTime + event.s;

    if (typeof event.n.path !== 'string') {
      console.error(event.n);
      throw new Error('tracksToFluidMessage: A file object found in the note library does not have a .path string');
    };

    const clipName = `s${context.clipIndex}.${eventIndex}`;
    const msg = [fluid.audiotrack.insertWav(clipName, startTime, event.n.path)];

    // adjust the clip length, unless the event is a .oneShot
    if (!event.n.oneShot)
      msg.push(fluid.clip.length(event.l));

    // apply fade in/out times (if specified)
    if (typeof event.n.fadeOut === 'number' || typeof event.n.fadeIn === 'number')
      msg.push(fluid.audioclip.fadeInOutSeconds(event.n.fadeIn, event.n.fadeOut));

    // If there is a dynamics object, look for a dbfs property and apply gain.
    if (event.d && typeof(event.d.dbfs) === 'number')
      msg.push(fluid.audioclip.gain(event.d.dbfs));

    return msg;
  });
}

module.exports = {
  tracksToFluidMessage,
  applyEventMappers,
  parse,
}
