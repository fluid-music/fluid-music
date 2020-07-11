
/**
 * A structured musical score encoded with `fluid.tab` notation
 * @typedef {Object.<string,ScoreObject>|Array<ScoreObject>} ScoreObject
 */

/**
 * Session encapsulates the structure of a DAW Session.
 *
 * ```
 * const exampleSession = {
 *   startTime: 0,
 *   duration: 4,
 *   tracks: {
 *     drums: {
 *       clips: [
 *         {
 *           events: [ { s: 0, l: 0.25, n: 0 } ],
 *           duration: 1,
 *           startTime: 0
 *         },
 *         {
 *           events: [ { s: 0, l: 0.25, n: 1 } ],
 *           duration: 1,
 *           startTime: 1
 *         },
 *         {
 *           events: [ { s: 0, l: 0.25, n: 2 } ],
 *           duration: 1,
 *           startTime: 2
 *         },
 *         {
 *           events: [ { s: 0, l: 0.25, n: 3 } ],
 *           duration: 1,
 *           startTime: 3
 *         }
 *       ]
 *     }
 *   },
 *   regions: [
 *     {
 *       startTime: 0,
 *       duration: 2,
 *       regions: [
 *         {
 *           events: [ { s: 0, l: 0.25, n: 0 } ],
 *           duration: 1,
 *           startTime: 0
 *         },
 *         {
 *           events: [ { s: 0, l: 0.25, n: 1 } ],
 *           duration: 1,
 *           startTime: 1
 *         }
 *       ]
 *     },
 *     { events: [ { s: 0, l: 0.25, n: 2 } ], duration: 1, startTime: 2 },
 *     { events: [ { s: 0, l: 0.25, n: 3 } ], duration: 1, startTime: 3 },
 *   ]
 * }
 * ```
 *
 * @typedef {Object.<string, Session>} Session
 * @property {number} startTime
 * @property {number} duration
 * @property {Session[]} [regions] (Only on sessions created from an array)
 * @property {TracksObject} [tracks] (Only on top level/outermost sessions)
 */

/**
 * Represents a collection of audio tracks, and clips on those tracks.
 *
 * Example of a `TracksObject` containing a single `bass` track, which
 * containins two clips:
 * 1) a MIDI clip and three MIDI notes.
 * 2) a clip that contains an audio file
 * ```javascript
 * {
 *   bass: {
 *     clips: [
 *       {
 *         notes: [
 *           { s: 0,     l: 0.0833, n: 33, d: 100 },
 *           { s: 0.25,  l: 0.0833, n: 35, d: 90 },
 *           { s: 0.33,  l: 0.0833, n: 38, d: 60 },
 *         ],
 *         startTime: 2,
 *         duration:  1,
 *       },
 *       {
 *         notes: [
 *           { s: 0.5, l: 0.25, e: { type: 'file', path: 'media/kick.wav' } },
 *         ],
 *         startTime: 3,
 *         duration:  1,
 *       },
 *     ]
 *   }
 * }
 * ```
 * @typedef {Object.<string, Track>} TracksObject
 */

/**
 * @typedef {Object} Track
 * @param {Clip[]} clips
 * @param {string} name - The Track name
 * @param {number} [duration]  // Charles: do all Track objects have a duration?
 * @param {number} [startTime] // Charles: do all Track objects have a startTime?
 */

/**
 * @typedef {Object} Clip
 * @property {ClipEvent[]} events
 * @property {number} duration duration in whole notes
 * @property {number} [startTime] start time in whole notes
 */

/**
 * Represents a musical event such as a MIDI note within midi clip or an audio
 * sample on a track.
 * @typedef {Object} ClipEvent
 * @property {number} l length in whole notes
 * @property {number} s start time in whole notes
 * @property {Note} n a `Note` event. Somtimes these might be a number
 * @property {number} [v=64] optional midi velocity
 * @property {Dynamic} [d] Signifies a dynamic marking
 */

/**
 * Represents a performance marking such as "forte" or "piano". In practice,
 * this specifies a MIDI velocity, or a dBFS gain value.
 *
 * These can be found in a `dLibrary`, or in the `.d` field of a `ScoreEvent`.
 * @typedef {Object} Dynamic
 * @property {number} [v=64] optional midi velocity
 * @property {number} [dbfs] sample gain
 * @property {number} [intensity] performance intensity value between 0 and 1.
 *  intensity may be interperated several different ways by different note/event
 *  handlers.
 */

 /**
  * Represents a timeline event such as a MIDI note or an audio sample.
  *
  * These can be found in an `nLibrary`, or in the `.n` field of a `ScoreEvent`.
  * @typedef {Object} Note
  * @property {string} type String indicating the type of event:
  *   'file' indicates an audio sample, which should have a `.path`.
  *   'iLayers' indicates the presence of a `.iLayers` field, which contains an
  *    array of EventObjects with `.type === 'file'`. Files in the `.iLayers`
  *    array should be arranged in order of increasing performance intensity.
  * @property {string} [path] file objects must include a path string
  * @property {number} [fadeOut] file objects may specify a fade out in seconds
  * @property {number} [fadeIn] file objects may specify a fade in in seconds
  * @property {boolean} [oneShot] if true, file objects will play until the end,
  *   ignoring the note's length
  */

/**
 * Represents any type of message that can be sent from a client such as
 * `FluidClient` or `FluidUdpClient` to the Fluid Engine.
 *
 * A simple example looks like this:
 * ```javascript
 * const createNote = {
 * address: '/midiclip/insert/note',
 *   args: [
 *     { type: 'integer', value: 60 },
 *     { type: 'float', value: 0 },
 *     { type: 'float', value: 4 },
 *     { type: 'integer', value: 127 },
 *  ]
 * }
 * ```
 *
 * Internally, the `osc-min` npm package is used to convert JS Objects (like the
 * one above) to OSC buffers. See the `osc-min` spec here:
 * https://www.npmjs.com/package/osc-min#javascript-representations-of-the-osc-types
 *
 * `fluid-music` clients automatically convert JavaScript arrays to OSC
 * bundles, so FluidMessage Objects can also be nested arrays of JS objects
 * as long as all objects follow the `osc-min` spec.
 * @typedef {Object|Array} FluidMessage
 */

/**
 * `NoteLibrary` objects are used in fluid music tablature. A `NoteLibrary`
 * maps single character strings (`.length === 1`) to music events (such as
 * notes, chords, values, or annotations) in a music score or MIDI clip.
 * @typedef {Object|Array} NoteLibrary
 */
