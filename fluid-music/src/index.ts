// New Style Plugins
import { DragonflyRoom } from './plugin-dradonfly-room';
import { FluidPlugin, PluginType } from './plugin';
import { tracksToFluidMessage, sessionToTemplateFluidMessage } from './tracksToFluidMessage';
import { FluidSession } from './FluidSession';

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
const audiofile = require('./fluid/audiofile');
const audiotrack = require('./fluid/audiotrack');
const midiclip = require('./fluid/midiclip');
const transport = require('./fluid/transport');
const global = require('./fluid/global');
const audioclip = require('./fluid/audioclip');
const clip = require('./fluid/clip');
const content = require('./fluid/content');
const tempo = require('./fluid/tempo');


// Other Stuff
const noteLibrary = require('./note-library');
const noteTypes = require('./note-types');
const eventMappers = require('./event-mappers');
const tab = require('./tab');
const groove = require('./groove')
const UdpClient = require('./FluidUdpClient');
const IpcClient = require('./FluidIpcClient');
const converters = require('./converters');
const m = require('./m');
const random = require('./random');
const tracksToReaperProject = require('./tracksToReaperProject');

// JSDoc
const jsDocTypes = require('./jsdoc-types');

export = {
  audioclip,
  audiofile,
  audiotrack,
  UdpClient,
  IpcClient,
  Client: IpcClient,
  clip,
  converters,
  content,
  noteLibrary,
  eventMappers,
  noteTypes,
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
  tab,
  tempo,
  sessionToTemplateFluidMessage,
  tracksToFluidMessage,
  tracksToReaperProject,
  transport,
  groove,
  FluidPlugin,
  PluginType,
  DragonflyRoom,

  FluidSession,
};
