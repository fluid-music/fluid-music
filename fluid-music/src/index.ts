import { FluidPlugin, PluginType } from './plugin';
import { sessionToContentFluidMessage, sessionToTemplateFluidMessage } from './sessionToFluidMessage';
import { sessionToReaperProject } from './sessionToReaperProject'
import { FluidSession } from './FluidSession';
import * as gen from './plugin-generator';
import * as converters from './converters';
import m from './m'
import * as random from './random';
import * as techniques from './fluid-techniques';
import * as tLibrary from './t-library';
import * as tab from './tab';

// New Style Plugins
import { DragonflyRoom } from './plugin-dradonfly-room';
import { TCompressorVst2 } from './plugin-adapters/t-compressor-vst2'
import { TEqualizerVst2 } from './plugin-adapters/t-equalizer-vst2'
import { TStereoDelayVst2 } from './plugin-adapters/t-stereo-delay-vst2'
import { PodolskiVst2 } from './plugin-adapters/podolski-vst2'
import { TyrellN6Vst2 } from './plugin-adapters/tyrell-n6-vst2'


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
const pluginDexedVst = require('./cybr/plugin-dexed-vst');

const UdpClient = require('./cybr/UdpClient');
import { IpcClient } from './cybr/IpcClient';

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
  tLibrary,
  techniques,
  gen,
  global,
  m,
  midiclip,
  plugin,
  pluginDragonflyRoomReverb,
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
  sessionToContentFluidMessage,
  sessionToReaperProject,
  transport,
  FluidSession,
  FluidPlugin,
  PluginType,
  DragonflyRoom,
  PodolskiVst2,
  TCompressorVst2,
  TEqualizerVst2,
  TStereoDelayVst2,
  TyrellN6Vst2,
};
