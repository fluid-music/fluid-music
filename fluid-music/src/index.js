// OSC Message Helpers
const plugin = require('./fluid/plugin');
const pluginDragonflyRoomReverb = require('./fluid/plugin-dragonfly-room');
const pluginPodolski = require('./fluid/plugin-podolski');
const pluginTCompressor = require('./fluid/plugin-tcompressor-vst');
const pluginTEqualiser = require('./fluid/plugin-tequaliser');
const pluginTReverber8 = require('./fluid/plugin-treverber8');
const pluginTStereoDelay = require('./fluid/plugin-tstereodelay');
const pluginZebra2Vst2 = require('./fluid/plugin-zebra2-vst2');
const pluginHelm = require('./fluid/plugin-helm');
const pluginDexedVst = require('./fluid/plugin-dexed-vst');
const sampler = require('./fluid/sampler');
const audiotrack = require('./fluid/audiotrack');
const midiclip = require('./fluid/midiclip');
const transport = require('./fluid/transport');
const global = require('./fluid/global');
const audioclip = require('./fluid/audioclip');
const clip = require('./fluid/clip');
const content = require('./fluid/content');
const tempo = require('./fluid/tempo');

// Other Stuff
const eventLibrary = require('./event-library');
const score = require('./score');
const tab = require('./tab');
const groove = require('./groove')
const UdpClient = require('./FluidUdpClient');
const IpcClient = require('./FluidIpcClient');
const converters = require('./converters');
const m = require('./m');
const random = require('./random');

// JSDoc
const jsDocTypes = require('./jsdoc-types');

module.exports = {
  audioclip,
  audiotrack,
  UdpClient,
  IpcClient,
  Client: IpcClient,
  clip,
  converters,
  content,
  eventLibrary,
  global,
  m,
  midiclip,
  plugin,
  pluginDragonflyRoomReverb,
  pluginHelm,
  pluginPodolski,
  pluginTCompressor,
  pluginTEqualiser,
  pluginTReverber8,
  pluginTStereoDelay,
  pluginZebra2Vst2,
  pluginDexedVst,
  random,
  sampler,
  score,
  tab,
  tempo,
  transport,
  groove,
};
