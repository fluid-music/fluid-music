const tab = require('./tab');
const fluid = require('./fluidOsc');

const chords = [
  ["e4", "a4", "b4", "c#5"],
  ["f4", "g4", "a4", "c5"],
  ["g4", "a4", "b4", "d5"],
];
const rhythm  = '1e+a2e+a3e+a4e+a';
const pattern = '0-......1-....2.';
const noteObjects = tab.parseTab(rhythm, pattern, chords);

const elements = [
  fluid.audiotrack.select('supersaw'),
  fluid.plugin.select('zebra2', 'vst'),

  fluid.plugin.setParam('ENV1: Attack', 1.0),
  fluid.plugin.setParam('VCF1: Cutoff', 0.0),
  fluid.plugin.setParam('VCF2: Cutoff', 1.0),

  fluid.midiclip.create('supersaw', 'p1', 0, 8, noteObjects),
  fluid.midiclip.create('supersaw', 'p2', 8, 8, noteObjects),
  fluid.transport.loop(0, 16),
  fluid.transport.play(),
];

const FluidClient = require('./FluidClient');
const client = new FluidClient(9999);
client.send(elements);
