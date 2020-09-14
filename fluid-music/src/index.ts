import { FluidPlugin, PluginType } from './plugin';
import { tracksToFluidMessage, sessionToTemplateFluidMessage } from './tracksToFluidMessage';
import { FluidSession } from './FluidSession';
import * as gen from './plugin-generator';
import * as converters from './converters';
import m from './m'

// New Style Plugins
import { DragonflyRoom } from './plugin-dradonfly-room';
import { TCompressor } from './plugin-adapters/vst2-t-compressor'

// OSC Message Helpers
import * as cybr from './cybr/index';
import * as audioclip from './cybr/audioclip';
import * as audiofile from './cybr/audiofile';
import * as audiotrack from './cybr/audiotrack';
import * as clip from './cybr/clip';
import * as content  from './cybr/content';
import * as global from './cybr/global';
import * as midiclip from './cybr/midiclip';
import * as plugin from './cybr/plugin';
import * as sampler from './cybr/sampler';
import * as tempo from './cybr/tempo';
import * as transport from './cybr/transport';


const pluginDragonflyRoomReverb = require('./cybr/plugin-dragonfly-room');
const pluginPodolski = require('./cybr/plugin-podolski');
const pluginTCompressor = require('./cybr/plugin-tcompressor-vst');
const pluginTEqualiser = require('./cybr/plugin-tequaliser');
const pluginTReverber8 = require('./cybr/plugin-treverber8');
const pluginTStereoDelay = require('./cybr/plugin-tstereodelay');
const pluginZebra2Vst2 = require('./cybr/plugin-zebra2-vst2');
const pluginHelm = require('./cybr/plugin-helm');
const pluginDexedVst = require('./cybr/plugin-dexed-vst');

const UdpClient = require('./cybr/UdpClient');
const IpcClient = require('./cybr/IpcClient');

// Other Stuff
const noteLibrary = require('./note-library');
const noteTypes = require('./note-types');
const eventMappers = require('./event-mappers');
const tab = require('./tab');

const random = require('./random');
const tracksToReaperProject = require('./tracksToReaperProject');

// JSDoc
const jsDocTypes = require('./jsdoc-types');

export = {
  cybr,
  audioclip,
  audiofile,
  audiotrack,
  Client: IpcClient,
  IpcClient,
  UdpClient,
  clip,
  content,
  converters,
  noteLibrary,
  eventMappers,
  noteTypes,
  gen,
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
  FluidPlugin,
  PluginType,
  DragonflyRoom,
  TCompressor,
  FluidSession,
};
