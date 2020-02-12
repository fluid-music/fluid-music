// OSC Message Helpers
const plugin = require('./fluid/plugin');
const sampler = require('./fluid/sampler');
const audiotrack = require('./fluid/audiotrack');
const midiclip = require('./fluid/midiclip');
const transport = require('./fluid/transport');
const global = require('./fluid/global');
const audioclip = require('./fluid/audioclip');
const clip = require('./fluid/clip');

// Other Stuff
const tab = require('./tab');
const groove = require('./groove')
const Client = require('./FluidClient');
const converters = require('./converters');

module.exports = {
  audioclip,
  audiotrack,
  Client,
  clip,
  converters,
  global,
  midiclip,
  plugin,
  sampler,
  tab,
  transport,
  groove,
};
