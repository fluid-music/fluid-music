const fs      = require('fs');
const path    = require('path');
const _       = require('underscore');
const R       = require('ramda');
const YAML    = require('yaml');
const fluid   = require('fluid-music');
const recipes = require('fluid-recipes');

const kickPath = recipes.fromMars909.kit.k2.path

const yamlFilename = path.join(__dirname, 'content.yaml');
const content = YAML.parse(fs.readFileSync(yamlFilename, 'utf-8'));

const wiggle = R.pipe(
  R.repeat,
  R.addIndex(R.map)((s, i) => {
    if (R.contains(s[i], '._- ')) return null;
    return R.insert(i+1, '-', s);
  }),
  R.filter(v => v !== null),
  R.map(R.join('')),
);


const bassContent = R.clone(content.root);
bassContent.p = wiggle(content.p, 9);
console.log(bassContent);

const bass = fluid.tab.parse(bassContent);
const octaveUp = R.map(n => {n.n += 36; return n});

const msg = [
  // Bass
  fluid.audiotrack.select('kick'),
  fluid.audiotrack.removeClips(),
  _.range(7*4).map((i) => fluid.audiotrack.insertWav('k'+i, i, kickPath)),
  fluid.audiotrack.select('bass'),
  fluid.midiclip.create('bass', 0, bass.duration * 4, bass),

  // Mids
  fluid.audiotrack.select('mallet'),
  fluid.midiclip.create('mallet', 0, bass.duration * 4, octaveUp(bass)),
  fluid.pluginZebra2Vst2.select(),
  fluid.pluginZebra2Vst2.setVCF1Cutoff(0.1),
  fluid.audiotrack.gain(0),
  fluid.plugin.select('volume'),
  fluid.plugin.setParamExplicit('pan', 0),

  // Delay
  fluid.audiotrack.select('delayQuarterNote'),
  fluid.pluginTStereoDelay.select(),
  fluid.pluginTStereoDelay.setDelayMs(60000 / 128),
  fluid.pluginTStereoDelay.setFeedback(.3),

  // Setup Looping
  fluid.transport.loop(0, bass.duration * 4),

  // Mid automation
  fluid.audiotrack.select('mallet'),
  fluid.audiotrack.removeAutomation(),
  fluid.plugin.select('zebra2', 'vst'),
  fluid.pluginZebra2Vst2.setVCF1Cutoff(0.01, 0),
  fluid.pluginZebra2Vst2.setVCF1Cutoff(0.18, bass.duration * 4),
];


const client = new fluid.Client(9999);
client.send(msg);
