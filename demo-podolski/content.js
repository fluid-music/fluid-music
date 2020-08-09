const R      = require('ramda');
const fluid  = require('../fluid-music')
const drums  = require('./drums');
const chords = require('./chords');

// experimental automation point
const f = {
  type: fluid.noteTypes.pluginAuto,
  plugin: { name: 'Podolski' },
  param: fluid.pluginPodolski.params.vcf0Cutoff,
  value: 0.5,
};

const p = {
  type: fluid.noteTypes.trackAuto,
  param: fluid.trackAutomation.params.pan,
  value: -0.5,
};

const nLibrary = Object.assign({}, drums.nLibrary);
nLibrary.c = {
  type: 'random',
  choices: R.dropLast(1, nLibrary.c.choices),
};

nLibrary.s = Object.assign({}, nLibrary.c);
nLibrary.s.choices = nLibrary.c.choices.map(choice => Object.assign({}, choice))
nLibrary.s.choices.forEach(f =>  { f.startInSourceSeconds=0.02; f.fadeInSeconds=0.003; });

// Here's what I want to be able to do:
const template = {
  r: '1 + 2 + 3 + 4 + ',
  nLibrary, // default for kick and Snare
  kick:   { d: '.   . mf      ' },
  snare:  { d: 'm   f   m   f ' },
  chrd:   { nLibrary: chords.nLibrary },
  bass:   { nLibrary: { a: 36, b: 39, f, p } },
};

const score = {
  kick:  {
  kick:  '.   . dd dD .D  ',
  d:     '.   . mf        '},
  snare: 'r---k-  .   k-  ',
  tamb:  'c s c s c s c s ',
  bass:  '       ab-      ',
  chrd:  'a-  .  ab---    ',
};

const dLibrary = {
  f: { dbfs: 0, intensity: 1.0 },
  m: { dbfs: -2.6, intensity: 3/4 },
};

const session = fluid.score.parse(score, {nLibrary, dLibrary, eventMappers: drums.eventMappers}, undefined, template);
const content = fluid.score.tracksToFluidMessage(session.tracks)

const client = new fluid.Client();
client.send([
  fluid.content.clear(),
  fluid.transport.loop(0, session.duration),
  content,
]);
