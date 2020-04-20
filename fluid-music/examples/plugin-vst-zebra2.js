const FluidClient = require('../src/FluidClient');
const fluid = require('../src/index');
const tabs = require('./tab-examples');

const elements = [
  fluid.audiotrack.select('supersaw'),
  fluid.plugin.select('zebra2', 'vst'),

  fluid.plugin.setParamNormalized('ENV1: Attack', 1.0),
  fluid.plugin.setParamNormalized('VCF1: Cutoff', 1.0),
  fluid.plugin.setParamNormalized('VCF2: Cutoff', 1.0),

  ...fluid.midiclip.create('p1', 0, 8, tabs.noTearsVerseNotes),
  ...fluid.midiclip.create('p2', 8, 8, tabs.noTearsVerseNotes),
  fluid.transport.loop(0, 16),
  fluid.transport.play(),
];

const client = new FluidClient(9999);
client.send(elements);
