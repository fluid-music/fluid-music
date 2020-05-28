/* Recipes cannot import the root level index file, because it would cause a
circular dependency. This internal file just aggregates OSC message helpers.

This file is not imported by the root level index file, because that interferes
with VS Code's type inference. VS Code type inference struggles with objects
defined in one file, and extended in another file.

TLDR: When adding a new module to the fluid folder, it should be imported
in this file, AND the root level index.js file. */

const plugin = require('./plugin');
const sampler = require('./sampler');
const audioclip = require('./audioclip');
const audiotrack = require('./audiotrack');
const midiclip = require('./midiclip');
const transport = require('./transport');
const global = require('./global');
const clip = require('./clip');
const tempo = require('./tempo');
const pluginTCompressor = require('./plugin-tcompressor-vst');
const pluginTStereoDelay = require('./plugin-tstereodelay');
const pluginTEqualiser = require('./plugin-tequaliser');
const pluginZebra2Vst2 = require('./plugin-zebra2-vst2');
const pluginHelm = require('./plugin-helm');
const content = require('./content');
const pluginDexedVst = require('./plugin-dexed-vst');

/**
 * @module fluid
 */
module.exports = {
  audioclip,
  audiotrack,
  clip,
  content,
  global,
  midiclip,
  plugin,
  pluginHelm,
  pluginTCompressor,
  pluginTStereoDelay,
  pluginTEqualiser,
  pluginZebra2Vst2,
  pluginDexedVst,
  sampler,
  tempo,
  transport,
};
