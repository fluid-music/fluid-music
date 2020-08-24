/* Recipes cannot import the root level index file, because it would cause a
circular dependency. This internal file just aggregates OSC message helpers.

This file is not imported by the root level index file, because that interferes
with VS Code's type inference. VS Code type inference struggles with objects
defined in one file, and extended in another file.

TLDR: When adding a new module to the fluid folder, it should be imported
in this file, AND the root level index.js file. */

import * as audioclip from './audioclip';
import * as audiofile from './audiofile';
import * as clip from './clip';
import * as content from './content';
import * as plugin from './plugin';
import * as tempo from './tempo';
import * as sampler from './sampler';

const audiotrack = require('./audiotrack');
const midiclip = require('./midiclip');
const transport = require('./transport');
const global = require('./global');
const tempo = require('./tempo');
const pluginPodolski = require('./plugin-podolski');
const pluginTCompressor = require('./plugin-tcompressor-vst');
const pluginTStereoDelay = require('./plugin-tstereodelay');
const pluginTReverber8 = require('./plugin-treverber8');
const pluginTEqualiser = require('./plugin-tequaliser');
const pluginZebra2Vst2 = require('./plugin-zebra2-vst2');
const pluginHelm = require('./plugin-helm');
const content = require('./content');
const pluginDexedVst = require('./plugin-dexed-vst');
const pluginDragonflyRoomReverb = require('./plugin-dragonfly-room');

/**
 * @module fluid
 */
module.exports = {
  audioclip,
  audiofile,
  audiotrack,
  clip,
  content,
  global,
  midiclip,
  plugin,
  pluginDragonflyRoomReverb,
  pluginHelm,
  pluginPodolski,
  pluginTCompressor,
  pluginTReverber8,
  pluginTStereoDelay,
  pluginTEqualiser,
  pluginZebra2Vst2,
  pluginDexedVst,
  sampler,
  tempo,
  transport,
};
