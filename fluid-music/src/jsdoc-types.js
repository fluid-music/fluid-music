
/**
 * A structured musical score encoded with `fluid.tab` notation
 * @typedef {Object.<string,ScoreObject>|Array<ScoreObject>} ScoreObject
 */

 /**
  * Session encapsulates the structure of a DAW Session.
  * @typedef {Object,<string, Session>}} Session
  * @property {number} startTime
  * @property {number} duration
  * @property {Session[]} [regions] (Only on sessions created from an array)
  * @property {TrackObject} [tracks] (Only on top level/outermost sessions)
  */

/**
 * Represents a collection of audio tracks, and clips on those tracks.
 *
 * Example of a `TracksObject` containing a single `bass` track which has a
 * single MIDI clip and three MIDI notes.
 * ```javascript
 * {
 *   bass: {
 *     clips: [
 *       [
 *         { s: 0,     l: 0.0833, n: 33, v: 100 },
 *         { s: 0.25,  l: 0.0833, n: 35, v: 90 },
 *         { s: 0.33,  l: 0.0833, n: 38, v: 60 },
 *         startTime: 2,
 *         duration:  1,
 *       ]
 *     ]
 *   }
 * }
 * ```
 * @typedef {Object} TracksObject
 * @param {TracksObject} <trackName> TracksObjects can be deeply nested
 * @param {Array} <trackName>
 * @param {string} <trackName>
 */

/**
 * Represents an event in a score, often a MIDI note within midi clip
 * @typedef {Object} NoteObject
 * @property {number|Object} n probably a MIDI note number - however,
 *  noteLibrary objects might also put other JavaScipt Objects in this field
 * @property {number} l length in whole notes
 * @property {number} s start time in whole notes
 * @property {number} [v=64] optional midi velocity
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
 *     { type: 'integer', value: 127 }
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
