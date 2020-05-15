const path     = require('path');
const R        = require('ramda');
const fluid    = require('../fluid-music');
const recipes  = require('../fluid-recipes');

const filename = path.join(__dirname, 'baba-oriley.tracktionedit');

const calc = (v) => Math.sqrt(v/16);
const helmPreset = [
  fluid.pluginHelm.setOsc2Transpose(0.627417), // 8va
  fluid.plugin.setParamExplicitAt(fluid.pluginHelm.params.ampAttack, calc(8), 0),
];

const message = [
  fluid.global.activate(filename, true),
  //fluid.tempo.set(118.6),              // Tempo of the intro
  //fluid.audiotrack.select('organ1'),
  //fluid.plugin.select('helm', 'vst'),
  //helmPreset,
  
  fluid.audiotrack.select('organ2'),
  fluid.pluginHelm.select(),
  fluid.pluginHelm.setOsc2Transpose(0.627417, 0.1), // 8va
  fluid.plugin.setParamExplicitAt(fluid.pluginHelm.params.ampAttack, calc(8), 0),
  fluid.plugin.setParamExplicitAt(fluid.pluginHelm.params.ampAttack, calc(9), 1),

  // fluid.pluginTStereoDelay.select(),
  // fluid.pluginTStereoDelay.setDelayRightMs(1234),
];

const client = new fluid.Client();
client.send(message);
