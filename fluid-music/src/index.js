// OSC Message Helpers
const plugin = require('./fluid/plugin');
const pluginTStereoDelay = require('./fluid/plugin-tstereodelay');
const sampler = require('./fluid/sampler');
const audiotrack = require('./fluid/audiotrack');
const midiclip = require('./fluid/midiclip');
const transport = require('./fluid/transport');
const global = require('./fluid/global');
const audioclip = require('./fluid/audioclip');
const clip = require('./fluid/clip');
const tempo = require('./fluid/tempo');

// Other Stuff
const tab = require('./tab');
const groove = require('./groove')
const UdpClient = require('./FluidUdpClient');
const Client = require('./FluidClient');
const converters = require('./converters');
const random = require('./random');

module.exports = {
  audioclip,
  audiotrack,
  UdpClient,
  Client,
  clip,
  converters,
  global,
  midiclip,
  plugin,
  pluginTStereoDelay,
  random,
  sampler,
  tab,
  tempo,
  transport,
  groove,
};
