const path   = require('path');
const R      = require('ramda');
const fluid  = require('../fluid-music');
const cybr   = fluid.cybr;
const drums  = require('@fluid-music/kit');
const chords = require('./chords');
const { DragonflyRoom } = require('../fluid-music');

// experimental automation point
const f = {
  type: fluid.noteTypes.pluginAuto,
  plugin: { name: 'Podolski' },
  param: fluid.pluginPodolski.params.vcf0Cutoff,
  value: 0.5,
};

const p = DragonflyRoom.makeAutomation.sizeMeters(9);
const q = DragonflyRoom.makeAutomation.sizeMeters(30);

const r = { type: 'trackAuto', paramKey: 'pan', value: -.5, curve: -0.5 };
const s = { type: 'trackAuto', paramKey: 'pan', value:  .5 };
const t = { type: 'trackAuto', paramKey: 'gain', value: -6, curve: 0.8 };
const u = { type: 'trackAuto', paramKey: 'gain', value: -32.9 };

const x = { type: 'trackAuto', paramKey: 'width', value: 0 };
const y = { type: 'trackAuto', paramKey: 'width', value: 1 };

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
  p: { dbfs: -6, intensity: 1/2 },
  f: { dbfs: 0, intensity: 1.0 },
  m: { dbfs: -2.6, intensity: 3/4 },
};

let session = new fluid.FluidSession({
  bpm: 96,
  r: '1 + 2 + 3 + 4 + ',
  dLibrary, // default for kick and snare
  nLibrary, // default for kick and snare
}, {
  kick:  { d: '.   . mf      ', gain: -6 },
  snare: { d: 'm   f   m   f ' },
  chrd:  { nLibrary: chords.nLibrary, pan: -.75 },
  bass:  { nLibrary: { a: {type: 'midiNote', n: 36}, b: {type: 'midiNote', n: 39}, f, p } },
  tamb:  { pan: .25 },
  revb:  { plugins: [ new fluid.DragonflyRoom({decaySeconds: 2.4, predelayMs: 49 })], nLibrary: {p, q, r, s, t, u, x, y } },
});

session.insertScore({
  kick: ['.   . dd dD .D  ', 'd   d   d   d   '],
  snare:['r---k-  .   k-  ', '              '],
  tamb: ['c s c s c s c s ', {r: '1....234..', tamb: 'scscs..sss', d: 'p'} ],
  bass:  '       ab-      ',
  chrd:  'a-  .  ab---    ',
  revb:  'p      qx  ytrsu',
}, {eventMappers: drums.eventMappers});

const templateMessage = fluid.sessionToTemplateFluidMessage(session);
const contentMessage = fluid.tracksToFluidMessage(session.tracks);
const client = new cybr.Client();
client.send([
  cybr.global.activate(path.join(__dirname, 'session.tracktionedit'), true),
  cybr.transport.loop(0, session.duration),
  templateMessage,
  contentMessage,
  cybr.global.save(null, 'd'),
]);

// const rpp = fluid.tracksToReaperProject(session.tracks, 96);
// console.log(rpp.dump())
