// OSC Message Helpers
const plugin = require('./fluid/plugin');
const sampler = require('./fluid/sampler');
const audiotrack = require('./fluid/audiotrack');
const midiclip = require('./fluid/midiclip');
const transport = require('./fluid/transport');
const global = require('./fluid/global');

// Other Stuff
const tab = require('./tab');
const Client = require('./FluidClient');
const converters = require('./converters');

const recipes = {
  drumTrack909: require('../recipes/drumTrack909'),
  cloud: require('../recipes/cloud'),
};

module.exports = {
  audiotrack,
  Client,
  converters,
  global,
  midiclip,
  plugin,
  sampler,
  tab,
  transport,
  recipes,
};
