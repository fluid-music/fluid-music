const FluidClient = require('../src/FluidClient');
const fluid = require('../src/index');
const path = require('path');

const sessionsDir = path.join(__dirname, 'sessions/')
const sessionPath = path.join(sessionsDir, 'out.tracktionedit')

const elements = [
  fluid.global.cd(sessionsDir),

  // create preset for vst2
  fluid.audiotrack.select('Track 1'),
  fluid.plugin.select('zebra2', 'vst'),
  fluid.plugin.setParamNormalized('ENV1: Attack', 1.0),
  fluid.plugin.setParamNormalized('VCF1: Cutoff', 0.0),
  fluid.plugin.setParamNormalized('VCF2: Cutoff', 1.0),
  fluid.plugin.save('zebra2.vst'),
  // load the zebra2 vst
  fluid.audiotrack.select('loadpreset'),
  fluid.plugin.load('zebra2.vst'),

  // create a preset for tracktion's delay plugin
  fluid.audiotrack.select('Track 1'),
  fluid.plugin.select('delay'),
  fluid.plugin.setParamNormalized('feedback', .10),
  fluid.plugin.setParamNormalized('feedback', 0.9),
  fluid.plugin.setParamNormalized('mix proportion', 0.75),
  fluid.plugin.save('delay-preset'),
  // load that preset on a new track
  fluid.audiotrack.select('loadpreset'),
  fluid.plugin.load('delay-preset'),

  // save a preset for tracktion's compressor plugin
  fluid.audiotrack.select('track 1'),
  fluid.plugin.select('compressor'),
  fluid.plugin.setParamNormalized('ratio', 0.33),
  fluid.plugin.setParamNormalized('attack', 0.33),
  fluid.plugin.save('comp-preset-1'),

  // save the edit file
  fluid.global.save(sessionPath, false),
];

const client = new FluidClient(9999);
client.send(elements);
