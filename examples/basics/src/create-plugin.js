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

const FluidClient = require('./FluidClient');

const saveMsg = {
  address: '/save',
  args: {type: 'string', value: 'out.tracktionedit'},
};

const bundle = {
  oscType: 'bundle',
  timetag: 0,
  elements: [
    fluid.audiotrack.select('Hahahaha'),
    fluid.plugin.select('zebra2'),
    fluid.plugin.select('zrev'),
    fluid.createMidiClip('CharlezTrack', 'CharlesClip', 1, 8, noteObjects),
    saveMsg
  ],
};

const client = new FluidClient(9999);
client.send(bundle);

