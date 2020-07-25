const path    = require('path');
const R       = require('ramda');
const fluid   = require('../fluid-music');
const recipes = require('../fluid-recipes');
const tr909   = require('@fluid-music/tr-909');
const drums   = require('./drums');
const chords  = require('./chords');
const file    = path.join(process.cwd(), 'session.tracktionedit');
const dragonflyRoom = fluid.pluginDragonflyRoomReverb;

// experimental automation point
const a = {
  type: fluid.noteTypes.auto,
  plugin: { name: 'Podolski.64' },
  param: fluid.pluginPodolski.params.vcf0Cutoff,
  value: 0.5,
};

const nLibrary = Object.assign({}, drums.nLibrary);
nLibrary.c = {
  type: 'random',
  choices: R.dropLast(1, nLibrary.c.choices),
};

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
    bass:'       b-   ab  ', nLibrary: { b: 40, c: 48, a },
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

const msg = [
  fluid.global.activate(file, true),
  fluid.tempo.set(96),
  fluid.transport.loop(0, session.duration),

  // reverb
  fluid.audiotrack.selectReturnTrack('verb room'),
  dragonflyRoom.select(),
  dragonflyRoom.presets.smallVocalRoom(),

  // bass
  fluid.audiotrack.select('bass'),
  recipes.presets.podolski.sineSlowDecay(),

  // kick
  fluid.audiotrack.select('kick'),
  fluid.pluginTCompressor.select(),
  fluid.pluginTCompressor.setThresholdDbfs(-13),
  fluid.pluginTCompressor.setRatio(2.23),
  fluid.pluginTCompressor.setAttackMs(42),
  fluid.pluginTCompressor.setReleaseMs(72.3),
  fluid.audiotrack.send('verb room', -35),

  // snare
  fluid.audiotrack.select('snare'),
  fluid.pluginTCompressor.select(),
  fluid.pluginTCompressor.setThresholdDbfs(-25.44),
  fluid.pluginTCompressor.setRatio(3.7),
  fluid.pluginTCompressor.setAttackMs(24.5),  // medium attack, lets the transient through
  fluid.pluginTCompressor.setReleaseMs(84.5), // mid-fast release exaggerates the body+decay
  fluid.pluginTCompressor.setMakeUpDbfs(10),  // yea
  fluid.audiotrack.send('verb room', -35),

  // hat/tambourine
  fluid.audiotrack.select('tamb'),
  fluid.audiotrack.send('verb room', -28),

  // chords
  fluid.audiotrack.select('chrd'),
  fluid.pluginPodolski.select(),
  fluid.pluginPodolski.setEnv1Attack(0.05),
  fluid.audiotrack.send('verb room', -20),

  content,
];

const client = new fluid.Client();
client.send(msg);
