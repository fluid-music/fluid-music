const R      = require('ramda');
const fluid  = require('../fluid-music');
const drums  = require('@fluid-music/kit');
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

const dLibrary = {
  f: { dbfs: 0, intensity: 1.0 },
  m: { dbfs: -2.6, intensity: 3/4 },
};

let session = new fluid.FluidSession({
  r: '1 + 2 + 3 + 4 + ',
  dLibrary, // default for kick and snare
  nLibrary, // default for kick and snare
}, {
  kick:   { d: '.   . mf      ' },
  snare:  { d: 'm   f   m   f ' },
  chrd:   { nLibrary: chords.nLibrary },
  bass:   { nLibrary: { a: {type: 'midiNote', n: 36}, b: {type: 'midiNote', n: 39}, f, p } },
  tamb:   {},
})

console.warn(session);

const score = {
  kick:  ['.   . dd dD .D  ', 'd   d   d   d  '],
  snare: 'r---k-  .   k-  ',
  tamb:  'c s c s c s c s ',
  bass:  '       ab-      ',
  chrd:  'a-  .  ab---    ',
};

fluid.score.parse(score, {eventMappers: drums.eventMappers}, session);
const msg = fluid.score.tracksToFluidMessage(session.tracks);
const rpp = fluid.tracksToReaperProject(session.tracks, 96);

const client = new fluid.Client();
client.send([
  fluid.content.clear(),
  fluid.transport.loop(0, session.duration),
  msg,
]);

console.log(rpp.dump())
