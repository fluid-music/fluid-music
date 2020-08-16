const path    = require('path');
const fluid   = require('../fluid-music');
const recipes = require('../fluid-recipes');

const file    = path.join(process.cwd(), 'session.tracktionedit');
const dragonflyRoom = fluid.pluginDragonflyRoomReverb;

const msg = [
  fluid.global.activate(file, true),
  fluid.tempo.set(96),

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
];

const client = new fluid.Client();
client.send(msg);
