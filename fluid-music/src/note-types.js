module.exports = {
  auto: 'auto',
  file: 'file',
  iLayers: 'iLayers',
  midiNote: 'midiNote',
  random: 'random',

  examples: [
    /**
     * An audio file event placed on a particular track.
     */
    {
      type: 'file',
      path: 'a/file.wav',
      oneShot: false, // When true, the inserted audio file will play to its
                      // end instead of obeying event length (default=false)

      fadeInSeconds: 0.01,       // Fade in time in seconds (default=0)
      fadeOutSeconds: 0.01,      // Fade out time in seconds (default=0)
      startInSourceSeconds: 0.1, // Specify the source start time in seconds.
                                 // Does not affect time that the clip starts
                                 // in the session.
    },

    /**
     * The `auto` note type represents an an automation point for a specific
     * plugin on an arbitrary (selected) audio track.
     */
    {
      type: 'auto',
      plugin: {      // identifies a plugin on an arbitrary track
        name: 'DragonflyRoomReverb-vst',
        type: 'VST', // 'VST', 'VST3', 'AudioUnit'
        nth: 0,      // The selected track may have multiple plugins with the
                     // same name. Index from within those plugins.
                     // Most of the time this isn't needed, because it is
                     // unusual to have more than one plugin with a given
                     // name on a particular track.
      },
      param: {
        name: 'Early Send',        // Parameter's name as reported by the plugin
        units: 'percent',
        normalize: (v) => v / 100, // The plugin GUI measures this parameter in
                                   // percent. The normalize function transforms
                                   // a percent into a value between 0 and 1.
      },
      value: 80, // param.units indicates value's unit type
      curve: 0,  // optional curvature from this point to the next. 0=linear.
    },

    /**
     * The `random` type notes get are replaced with one of the types in the
     * .choices array. The implementer must ensure that the .choices array
     * exists, and all of its contents are valid `Note`s.
     */
    {
      type: 'random',
      choices: [
        { type: 'file', path: 'snare.wav' },
        { type: 'midiNote', n: 64 },
      ],
    }
  ] // examples
};
