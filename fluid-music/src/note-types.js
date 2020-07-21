module.exports = {
  midiNote: 'midiNote',
  file: 'file',
  iLayers: 'iLayers',
  auto: 'auto',

  examples: {
    auto: {
      type: 'auto',
      plugin: {      // identifies a plugin on an arbitrary track
        name: 'DragonflyRoomReverb-vst',
        type: 'VST', // 'VST', 'VST3', 'AudioUnit'
        nth: 0,      // The selected track may have multiple plugins with the
                     // same name. Index from within those plugins.
                     // Most of the time this isn't needed, because it is
                     // unusual to have more than one plugin with a given
                     // name on a particular track. This is the index
      },
      param: {
        name: 'Early Send',        // Parameter's name as reported by the plugin
        units: 'percent',
        normalize: (v) => v / 100, // The plugin GUI measures this parameter in
                                   // percent. The normalize function transforms
                                   // a percent into a value between 0 and 1.
      }
    }
  }
};
