module.exports = {
  trackAuto:  'trackAuto',
  pluginAuto: 'pluginAuto',
  file:       'file',
  iLayers:    'iLayers',
  midiChord:  'midiChord',
  midiNote:   'midiNote',
  random:     'random',

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

      info: {           // info provided by music-metadata npm package - info
                        // is not currently guaranteed to be present on every
                        // `file` event
        duration: 2.99, // source audio file duration in seconds
        bitsPerSample: 16,
        sampleRate: 44100,
        numberOfChannels: 1,
      }
    },

    /**
     * The `pluginAuto` note type represents an an automation point for a specific
     * plugin on an arbitrary (selected) audio track.
     */
    {
      type: 'pluginAuto',
      pluginSelector: { // identifies a plugin on an arbitrary track
        name: 'DragonflyRoomReverb-vst',
        type: 'VST2',   // 'VST2', 'VST3', 'AudioUnit'
        nth: 0,         // The selected track may have multiple plugins with the
                        // same name. Index from within those plugins.
                        // Most of the time this isn't needed, because it is
                        // unusual to have more than one plugin with a given
                        // name on a particular track.
      },
      paramKey: 'sizeMeters',
      value: 80, // param.units indicates value's unit type
      curve: 0,  // optional curvature from this point to the next. 0=linear.
    },

    /**
     * `trackAuto` represents an automation point for a track parameter such as
     * `'gain'` or `'pan'`.
     *
     * Unlike `pluginAuto`, it does not specify a `.plugin`.
     * Like   `pluginAuto`, it specifies a `.param.name` string and a value.
     */
    { type: 'trackAuto', paramKey: 'gain', value: -6, curve: 0 },
    { type: 'trackAuto', paramKey: 'pan',  value:  1, curve: 0 },

    /**
     * The `random` type notes get are replaced with one of the types in the
     * .choices array. The implementer must ensure that the .choices array
     * exists, and all of its contents are valid `Note` objects.
     */
    {
      type: 'random',
      choices: [
        { type: 'file', path: 'snare.wav' },
        { type: 'midiNote', n: 64 },
      ],
    },


    /**
     * A midi chord
     */
    {
      type: 'midiChord',
      name: "Cm6",
      notes: [ 60, 63, 67, 69 ],
    }
  ] // examples
};
