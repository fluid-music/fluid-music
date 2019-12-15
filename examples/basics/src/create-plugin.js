const tab = require('./tab');
const fluid = require('./fluidOsc');

const chords = [
  ["e4", "a4", "b4", "c#5"],
  ["f4", "g4", "a4", "c5"],
  ["g4", "a4", "b4", "d5"],
]
const rhythm  = '1e+a2e+a3e+a4e+a';
const pattern = '0-......1-....2.';
const noteObjects = tab.parseTab(rhythm, pattern, chords);
const elements = [
  fluid.audiotrack.select('supersaw'),
  fluid.plugin.select('zebra2'),
  fluid.plugin.select('zrev'),
  fluid.midiclip.create('supersaw', 'CharlesClip', 0, 8, noteObjects),
  fluid.global.save('out.tracktionedit', false),
];

const FluidClient = require('./FluidClient');
const client = new FluidClient(9999);
client.send(elements);
