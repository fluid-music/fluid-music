import { FluidPlugin, PluginType } from './FluidPlugin';
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
import * as plugins from './plugin-adapters/index'

// OSC Message Helpers
import * as cybr from './cybr/index';

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
  plugins,
  random,
  tab,
  sessionToTemplateFluidMessage,
  sessionToContentFluidMessage,
  sessionToReaperProject,

  FluidAudioFile,
  FluidSession,
  FluidPlugin,
  PluginType,
};
