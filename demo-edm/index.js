const fs      = require('fs');
const path    = require('path');
const R       = require('ramda');
const YAML    = require('yaml');
const fluid   = require('fluid-music');
const recipes = require('fluid-recipes');

const kickPath = recipes.fromMars909.kit.k2.path

const yamlFilename = path.join(__dirname, 'content.yaml');
const content = YAML.parse(fs.readFileSync(yamlFilename, 'utf-8'), {merge: true});
const intro = content.intro;

const melody = intro.melody;
intro.bass = recipes.mutators.wiggle(melody, 8);
intro.mallet = R.clone(intro.bass);
intro.mallet.noteLibrary = recipes.library.transposeNoteLibrary(intro.noteLibrary, 24);
intro.kick  = R.repeat(intro.kick, 7);
if(intro.hat) intro.hat   = R.repeat(intro.hat, 7);

const section1 = R.clone(intro);
delete section1.kick;
delete section1.hat;
content.score.push(section1);

const msg = [
  // cleanup
  fluid.audiotrack.select('kick'),
  fluid.audiotrack.removeClips(),
  fluid.audiotrack.select('bass'),
  fluid.audiotrack.removeClips(),
  fluid.audiotrack.select('mallet'),
  fluid.audiotrack.removeClips(),
  fluid.audiotrack.removeAutomation(),
  fluid.pluginZebra2Vst2.select(),
  fluid.pluginZebra2Vst2.setVCF1Cutoff(0.01, 0),
  fluid.pluginZebra2Vst2.setVCF1Cutoff(0.10, 8*4),
  fluid.pluginZebra2Vst2.setVCF1Cutoff(0.20, 8*4*2),
  fluid.pluginZebra2Vst2.setVCF1Resonance(0.01, 0),
  fluid.pluginZebra2Vst2.setVCF1Resonance(0.01, 8*4),
  fluid.pluginZebra2Vst2.setVCF1Resonance(0.10, 8*4*2),
  fluid.audiotrack.select('melody'),
  fluid.audiotrack.removeClips(),
  fluid.audiotrack.select('hat'),
  fluid.audiotrack.removeClips(),

  fluid.score.parse(content.score),
];

const client = new fluid.Client(9999);
client.send(msg);
client.send(fluid.transport.loop(0, 8 * 4 * 2));
