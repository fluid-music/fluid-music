import { FluidPlugin, PluginType } from './plugin';
import { sessionToContentFluidMessage, sessionToTemplateFluidMessage } from './sessionToFluidMessage';
import { sessionToReaperProject } from './sessionToReaperProject'
import { FluidSession } from './FluidSession';
import { FluidAudioFile } from './FluidAudioFile'
import * as gen from './plugin-generator';
import * as converters from './converters';
import m from './m'
import * as random from './random';
import * as techniques from './fluid-techniques';
import * as tLibrary from './t-library';
import * as tab from './tab';

// New Style Plugins
import { DragonflyRoom } from './plugin-dragonfly-room'
import { TCompressorVst2 } from './plugin-adapters/t-compressor-vst2'
import { TEqualizerVst2 } from './plugin-adapters/t-equalizer-vst2'
import { TStereoDelayVst2 } from './plugin-adapters/t-stereo-delay-vst2'
import { PodolskiVst2 } from './plugin-adapters/podolski-vst2'
import { TyrellN6Vst2 } from './plugin-adapters/tyrell-n6-vst2'
import { RoughRider3Vst2 } from './plugin-adapters/rough-rider-3-vst2'

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

const UdpClient = require('./cybr/UdpClient');
import { IpcClient } from './cybr/IpcClient';

export = {
  cybr,
  Client: IpcClient,
  IpcClient,
  UdpClient,
  converters,
  tLibrary,
  techniques,
  gen,
  m,
  random,
  tab,
  sessionToTemplateFluidMessage,
  sessionToContentFluidMessage,
  sessionToReaperProject,
  FluidAudioFile,
  FluidSession,
  FluidPlugin,
  PluginType,
  RoughRider3Vst2,
  DragonflyRoom,
  PodolskiVst2,
  TCompressorVst2,
  TEqualizerVst2,
  TStereoDelayVst2,
  TyrellN6Vst2,
};
