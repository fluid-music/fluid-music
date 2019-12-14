const fs  = require('fs');
const YAML = require('yaml');
const converters = require('./converters');
const tab = require('./tab');
const fluidObjToOsc = converters.fluidObjToOsc;

const chords = [
  ["e4", "a4", "b4", "c#5"],
  ["f4", "g4", "a4", "c5"],
  ["g4", "a4", "b4", "d5"],
]
const rhythm  = '1e+a2e+a3e+a4e+a';
const pattern = '0-......1-....2.';
const noteObjects = tab.parseTab(rhythm, pattern, chords);
const createClipMsg = fluidObjToOsc('CharlesTrack', 'CharlesClip', 1, 8, noteObjects);

const FluidClient = require('./FluidClient');

const selectTrackMsg = {
  address: '/audiotrack/select',
  args: [{ type: 'string', value: 'CharlesTrack' }],
};

const createPluginMsg = {
  address: '/plugin/select',
  args: [{ type: 'string', value: 'zebra2'}],
};

const createRevMsg = {
  address: '/plugin/select',
  args: [{ type: 'string', value: 'zrev'}],
};

const saveMsg = {
  address: '/save',
  args: {type: 'string', value: 'out.tracktionedit'},
};

const bundle = {
  oscType: 'bundle',
  timetag: 0,
  elements: [ selectTrackMsg, createPluginMsg, createRevMsg, createClipMsg, saveMsg ],
};

const client = new FluidClient(9999);
client.send(bundle);

