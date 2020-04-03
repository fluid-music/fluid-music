const fs      = require('fs');
const path    = require('path');
const _       = require('underscore');
const R       = require('ramda');
const YAML    = require('yaml');
const fluid   = require('fluid-music');
const recipes = require('fluid-recipes');

const yamlFilename = path.join(__dirname, 'content.yaml');
const content = YAML.parse(fs.readFileSync(yamlFilename, 'utf-8'));
console.log(content);

const kickPath     = recipes.fromMars909.kit.k2.path
console.log('kick path:', kickPath);


const bass = fluid.tab.parse(content);
const octaveUp = R.map(n => {n.n += 36; return n});

const msg = [
  // Bass
  fluid.audiotrack.select('kick'),
  fluid.audiotrack.removeClips(),
  _.range(10).map((i) => fluid.audiotrack.insertWav('k'+i, i, kickPath)),
  fluid.audiotrack.select('bass'),
  fluid.midiclip.create('bass', 0, 8, bass),

  // Mids
  fluid.audiotrack.select('mallet'),
  fluid.midiclip.create('mallet', 0, 8, octaveUp(bass)),
  fluid.plugin.select('zebra2', 'vst'),
  fluid.plugin.setParamNormalized('VCF1: Cutoff', 0.01),

  // Delay
  fluid.audiotrack.select('delayQuarterNote'),
  fluid.pluginTStereoDelay.select(),
  fluid.pluginTStereoDelay.setDelayMs(60000 / 128),

  // Setup Looping
  fluid.transport.loop(0, 7),
];


const client = new fluid.Client(9999);
client.send(msg);
