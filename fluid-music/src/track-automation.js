/**
 * trackAutomation is a helper for creating automation points for track
 * specific parameters like volume and panning.
 *
 * ```
 * // Example automation `Note` Object
 * const p = {
 *   type: fluid.noteTypes.auto,
 *   plugin: fluid.trackAutomation.plugin,
 *   param: fluid.trackAutomation.params.pan,
 *   value: -0.5,
 * };
 * ```
 */
module.exports = {

  params: {

    volume: {
      name: 'volume',
      units: 'db',
    },

    pan: {
      name: 'pan',
      units: '-1 to 1',
    },

  },
};

