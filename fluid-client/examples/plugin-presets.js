const FluidClient = require('../src/FluidClient');
const fluid = require('../src/fluidOsc');

const elements = [
  // create preset for vst2
  fluid.audiotrack.select('Track 1'),
  fluid.plugin.select('zebra2', 'vst'),
  fluid.plugin.setParam('ENV1: Attack', 1.0),
  fluid.plugin.setParam('VCF1: Cutoff', 0.0),
  fluid.plugin.setParam('VCF2: Cutoff', 1.0),
  fluid.plugin.save('zebra2.vst'),
  // load the zebra2 vst
  fluid.audiotrack.select('loadpreset'),
  fluid.plugin.load('zebra2.vst'),

  // create a preset for tracktion's delay plugin
  fluid.audiotrack.select('Track 1'),
  fluid.plugin.select('delay'),
  fluid.plugin.setParam('feedback', .10),
  fluid.plugin.save('delay-preset-1'),
  fluid.plugin.setParam('feedback', 0.9),
  fluid.plugin.setParam('mix proportion', 0.75),
  fluid.plugin.save('delay-preset-2'),
  // load that preset on a new track
  fluid.audiotrack.select('loadpreset'),
  fluid.plugin.load('delay-preset-1'),

  // save a preset for tracktion's compressor plugin
  fluid.audiotrack.select('track 1'),
  fluid.plugin.select('compressor'),
  fluid.plugin.setParam('ratio', 0.33),
  fluid.plugin.setParam('attack', 0.33),
  fluid.plugin.save('comp-preset-1'),

  // save the edit file
  fluid.global.save('out.tracktionedit', false),
];

const client = new FluidClient(9999);
client.send(elements);
