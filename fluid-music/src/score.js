const R     = require('ramda');
const tab   = require('./tab');
const fluid = require('./fluid/index')

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

function midiVelocityToDbfs(v, min = -60, max = 6) {
  const range = max - min;
  return R.clamp(min, max, v / 127 * range + min);
};


/**
 * Score.parse pases EventContext objects as the third argument to event mapper
 * functions. Its fields specify the context of the NoteObject currently being
 * processed, including the track and clip that contain the note.
 * @typedef {Object} EventContext
 * @property {Clip} clip the Clip that contains the current event
 * @property {Track} track the Track that contains the current event
 * @property {TracksObject} tracks
 * @property {FluidMessage[]} messages
 * @property {number} clipIndex index of the clip within the track
 * @property {number} eventIndex index of the event within the clip.
 *    tracksToFluidMessage updates this automatically before each eventMapper
 *    callback.
 * @property {Object} data this is a convenient place for `eventMapper`
 *    callbacks to store data it, for example, the event mapper needs to
 *    preserve information between callbacks. Like the EventContext, it is
 *    replaced for each Clip.
 */

/**
 * @callback eventMapper
 * @param {ClipEvent} note
 * @param {EventContext} context
 */

/**
 * Parse a NoteObject with `type=iLayer`. Its job is to select an event from
 * `note.e.iLayers` based on the current dynamic marking, and replace `note.e`
 * with that event.
 *
 * In general, event mapper functions have 3 main actions:
 * 1) Return null or a falsy value - the event will be ignored
 * 2) Return a different note object, which replaces the input note object
 * 3) Add fluid messages to `context.messages`
 *
 * This is a simple example of an event mapper function which only replaces the
 * NoteObject's event (No. 2 on the list above).
 *
 * @param {ClipEvent} event
 * @param {EventContext} context Info on the track, clip that contain the note
 */
function mapIntensityLayers(event, context) {
  if (!event.n || event.n.type !== 'iLayers') return event;

  // example iLayer note Object
  // NOTE: .v is optional
  // NOTE: file1 example { type: 'file', path: 'media/kick.wav' }
  // {
  //   s: 0, l: 0.25, v: 64,
  //   e: { type: 'iLayers', iLayers: [file1, file2] },
  //   d: { dbfs: -2, intensity: 0.7, v: 64 }
  // }
  let length = event.n.iLayers.length; // number of layers
  let index = length - 1;             // default to last layer

  // Look for an intensity
  if (event.d && typeof(event.d.intensity) === 'number') {
    index = Math.floor(event.d.intensity * length);
  }
  // If no intensity was found, look for a velocity
  else if (typeof event.v === 'number') {
    index = Math.floor(event.v / (127 / event.n.iLayers.length));
  }

  event.n = event.n.iLayers[R.clamp(0, length-1, index)]
  return event;
}

/**
* @param {ClipEvent} event
* @param {EventContext} context Info on the track, clip that contain the note
*/
function mapMidiNotes(event, context) {
  if (Array.isArray(event.n)) {
    event.n.forEach(chordNote => {
      const innerEvent = Object.assign({}, event);
      innerEvent.n = chordNote;
      mapMidiNotes(innerEvent, context)
    });
  }

  if (typeof event.n !== 'number') return event; // Arrays will still get returned

  if (!context.data.createdMidiClip) {
    const clipName  = `${context.track.name} ${context.clipIndex}`
    const startTime = context.clip.startTime;
    const duration  = context.clip.duration;
    const clipMsg   = fluid.midiclip.select(clipName, startTime, duration)
    context.messages.push(clipMsg);
    context.data.createdMidiClip = true;
  }

  // example midi notes
  // NOTE: velocities are optional
  // NOTE: velocity objects can specify .v (midi velocity) and/or dbfs gain
  // { s: 0.0, l: 0.25, n: 60 v: 70 };
  // { s: 0.5, l: 0.25, n: 60 d: { v: 70, dbfs: -12 } };
  const noteMsg = fluid.midiclip.note(event.n, event.s, event.l, event.v);
  context.messages.push(noteMsg);
  return null;
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
 * @param {eventMapper[]} eventMappers tracksToFluidMessage will call each
 *    function in this array on each NoteObject that is being parsed. Put
 *    custom functions in here to override or augment the default NoteObject
 *    handlers.
 * @returns {FluidMessage}
 */
function tracksToFluidMessage(tracksObject, eventMappers=[]) {
  const sessionMessages = [];
  let i = 0;

  // Ensuring that eventMappers it is an array
  if (typeof eventMappers === 'function') eventMappers = [eventMappers];
  if (!Array.isArray(eventMappers))
    throw new Error('tracksToFluidMessage: received invalid eventMappers arg');

  // Add the the default eventMappers
  eventMappers.push(mapIntensityLayers);
  eventMappers.push(mapMidiNotes);

  // // example tracks object
  // const tracks = {
  //   bass: { clips: [ clip1, clip2... ] },
  //   kick: { clips: [ clip1, clip2... ] },
  // };
  for (let [trackName, track] of Object.entries(tracksObject)) {
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

      let events = clip.events;
      for (const eventMapper of eventMappers) {
        events = events.map((noteEvent, i) => {
          context.eventIndex = i;
          return eventMapper(noteEvent, context);
        }).filter(noteEvent => !!noteEvent);
      };

      // // example clip object
      // const clip = {
      //   events: [ note1, note2 ],
      //   duration: 4,
      //   startTime: 4,
      // };
      let samples = events.filter(note => note.n && note.n.type === 'file');

      // // example type=file note
      // {
      //   s: 0.50, // start
      //   l: 0.25, // length
      //   n: { type: 'file', path: 'media/kick.wav' },
      //   d: { v: 70, dbfs: -10 }, // If .v is present here...
      //   v: 70,                   // ...it will also be here...
      //                            // (but vice versa is not guaranteed)
      // };
      for (let event of samples) {
        let startTime = clip.startTime + event.s;

        if (typeof event.n !== 'object') {
          console.error(event);
          throw new Error('tracksToFluidMessage: a note object selected as a sample is missing its .e event');
        };

        if (typeof event.n.path !== 'string') {
          console.error(event.n);
          throw new Error('tracksToFluidMessage: A file object found in note library does not have a .path string');
        };

        let msg = [fluid.audiotrack.insertWav(`s${i++}`, startTime, event.n.path)];

        // adjust the clip length, unless the event is a .oneShot
        if (!event.n.oneShot) msg.push(fluid.clip.length(event.l));

        // apply fade in/out times (if specified)
        if (typeof event.n.fadeOut === 'number' || typeof event.n.fadeIn === 'number')
          msg.push(fluid.audioclip.fadeInOutSeconds(event.n.fadeIn, event.n.fadeOut));

        // Try to get sample gain
        let gain = null;
        // If there is a dynamics object, look for a dbfs property
        if (event.d && typeof(event.d.dbfs) === 'number') gain = event.d.dbfs;
        // Otherwise, look for a .v property, and use a hard-coded default
        // conversion from midi velocity to dbfs
        else if (typeof event.v === 'number') gain = midiVelocityToDbfs(event.v, -10, 10);
        // Iff gain was found add it to the result
        if (gain !== null) msg.push(fluid.audioclip.gain(gain));

        clipMessages.push(msg);
      }
    });
  }

  return sessionMessages;
};

module.exports = {
  tracksToFluidMessage,
  midiVelocityToDbfs,
  parse,
}
