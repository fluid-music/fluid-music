const R      = require('ramda');
const fluid  = require('../fluid-music')
const drums  = require('./drums');
const chords = require('./chords');

// Some experimental automation points. These are really just here to verify
// that automation is working correctly.
const a = {
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

// Create a derivative drum library, modified for this score.
const nLibrary = Object.assign({}, drums.nLibrary);
nLibrary.c = {
  type: 'random',
  // The high-intensity (aka velocity) sample is dramatically louder than the
  // earlier ones. Its too harsh, so I'm just going to remove it.
  choices: R.dropLast(1, nLibrary.c.choices),
};

// Tambourine sound with properties adjusted for a lower intensity sound
nLibrary.s = Object.assign({}, nLibrary.c);
nLibrary.s.choices = nLibrary.c.choices.map(choice => Object.assign({}, choice))
nLibrary.s.choices.forEach(f =>  { f.startInSourceSeconds=0.02; f.fadeInSeconds=0.003; });

const score = {
  r:     '1 + 2 + 3 + 4 + ',
  kick:  {
  kick:  '.   . dd dD .D  ',
  d:     '.   . mf        '},
  snare: 'r---k-  .   k-  ',
  tamb:  'c s c s c s c s ',
  bass:{
    bass:'       b-   abp ', nLibrary: { b: 40, c: 48, a, p },
  },
  chrd: {
  chrd:  'a-  .  ab---    ', nLibrary: chords.nLibrary,
  },
};

const dLibrary = {
  f: { dbfs: 0, intensity: 1.0 },
  m: { dbfs: -2.6, intensity: 3/4 },
};

const session = fluid.score.parse(score, {nLibrary, dLibrary, eventMappers: drums.eventMappers});
const content = fluid.score.tracksToFluidMessage(session.tracks)

const client = new fluid.Client();
client.send([
  fluid.content.clear(),
  fluid.transport.loop(0, session.duration),
  content,
]);
