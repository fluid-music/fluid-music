
/**
 * Represents a musical score. Often written in YAML.
 * @typedef {Object} ScoreObject
 */

/**
 * Represents a collection of audio tracks, and clips on those tracks
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
  * Represents any type of message that can be sent to from a client such as
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
  * bundles, so FluidMessage Objects can also be arrays of JS objects that
  * follow the `osc-min` spec.
  * 
  * It is also possible to pass a node.js Buffer to clients' send method. Of
  * course, that buffer must contain a valid OSC message.
  * @typedef {Object|Array|Buffer} FluidMessage
  */

  /**
   * `NoteLibrary` objects are used in fluid music tablature. A `NoteLibrary`
   * maps single character strings (`.length === 1`) to music events (such as
   * notes, chords, values, or annotations) in a music score or MIDI clip.
   * @typedef {Object|Array} NoteLibrary
   */
  