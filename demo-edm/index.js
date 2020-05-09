const R       = require('ramda');
const fluid   = require('fluid-music');
const recipes = require('fluid-recipes');

const vLibrary = { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, 5: 60, 6: 70, 7: 80, 8: 90, 9: 100, a: 110, b: 120, c: 127 };
const nLibrary = {  '0': 31,                                     // 'te'
  '1': 33, '2': 35, '3': 36, '4': 38, '5': 40, '6': 41, '7': 43, // C minor
  '8': 45, '9': 47, 'a': 48, 'b': 50, 'c': 52, 'd': 53, 'e': 55, // C minor 8va
  'f': 57,                                                       // 're'
  k: { type: 'file', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/BD D SP 909 09.wav' },
  h: { type: 'file', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/CH A SP 909 09.wav' },
  H: { type: 'file', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/OH A SP 909 09.wav' },
  s: { type: 'file', path: recipes.fromMars909.s3.path },
  c: { type: 'file', path: recipes.fromMars909.kit.crash.path },
};

let melody;
const score = [];
const config = {
  vLibrary,
  nLibrary,
  v:     '966855844655',
  r:     '1..2..3..4..'};
melody = '875a8'        ;
// melody = '875a864'      ;
// melody = '15426536876'  ;
// melody = '1342453-21'   ; // default;
// melody = R.reverse(melody);


melody = recipes.mutators.wiggle(melody, 8);
const intro = {
  name: 'intro',
  crash: {crash: 'c.', v: '6'},
  kick: [R.repeat('k..k..k..k..', 7), 'k........sss'],
  hat:   R.repeat('.hh.hh.hh.hh', 7),
  p: {
    r:              '1 2 3 4 ',
    v:              '89898989',
    // hat:   R.repeat(' h h h h', 6),
    // snare: R.repeat('  s   s ', 7),
  },
  mallet: melody,
  bass:  R.clone(melody),
};

// Transpose intro.mallet
if (intro.mallet) intro.mallet.nLibrary = recipes.library.transposeNoteLibrary(nLibrary, 36);
score.push(intro);

// Section A is a veriation on the intro
const sectionA = R.clone(intro);
delete sectionA.kick;
delete sectionA.hat;
score.push(sectionA);

const session = fluid.score.parse(score, config);
const msg = [
  // cleanup
  fluid.audiotrack.select('kick'),
  fluid.audiotrack.removeClips(),
  fluid.audiotrack.select('bass'),
  fluid.audiotrack.removeClips(),
  fluid.audiotrack.select('melody'),
  fluid.audiotrack.removeClips(),
  fluid.audiotrack.select('hat'),
  fluid.audiotrack.removeClips(),
  fluid.audiotrack.select('snare'),
  fluid.audiotrack.removeClips(),
  fluid.audiotrack.select('crash'),
  fluid.audiotrack.removeClips(),
  fluid.audiotrack.select('mallet'),
  fluid.audiotrack.removeClips(),
  // automation
  fluid.audiotrack.removeAutomation(),
  fluid.pluginZebra2Vst2.select(),
  fluid.pluginZebra2Vst2.setVCF1Cutoff(0.01, 0),
  fluid.pluginZebra2Vst2.setVCF1Cutoff(0.10, 8),
  fluid.pluginZebra2Vst2.setVCF1Cutoff(0.20, 8*2),
  fluid.pluginZebra2Vst2.setVCF1Resonance(0.01, 0),
  fluid.pluginZebra2Vst2.setVCF1Resonance(0.01, 8),
  fluid.pluginZebra2Vst2.setVCF1Resonance(0.10, 8*2),

  fluid.score.tracksToFluidMessage(session.tracks),
  fluid.transport.loop(0, session.duration),
];

const client = new fluid.Client(9999);
client.send(msg);
