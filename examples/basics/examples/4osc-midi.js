const tab = require('../src/tab');
const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');

const chords = [
  ["e4", "a4", "b4", "c#5"],
  ["f4", "g4", "a4", "c5"],
  ["g4", "a4", "b4", "d5"],
];
const rhythm  = '1e+a2e+a3e+a4e+a';
const pattern = '0-......1-....2.';
const noteObjects = tab.parseTab(rhythm, pattern, chords);

const client = new FluidClient(9999);

client.send([
  fluid.audiotrack.select('stabs'),
  fluid.plugin.select('4osc'),
  fluid.midiclip.create('stabs', 'v1.1', 0, 8, noteObjects),
  fluid.midiclip.create('stabs', 'v1.2', 8, 8, noteObjects),
  fluid.global.save('out.tracktionedit'),
]);
