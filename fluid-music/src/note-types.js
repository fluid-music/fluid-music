module.exports = {
  midiNote: 'midiNote',
  file: 'file',
  iLayers: 'iLayers',
  auto: 'auto',

  examples: {
    /**
     * The `auto` note type represents an an automation point for a specific
     * plugin on an arbitrary (selected) audio track.
     */
    auto: {
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
    }
  }
};
