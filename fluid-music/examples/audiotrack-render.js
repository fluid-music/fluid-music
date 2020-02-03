const path = require('path');
const fluid = require('../src/index');
const Client = require('../src/FluidClient');
const tabEx = require('./tab-examples');

const client = new Client(9999);

client.send([
  fluid.global.activate(path.join(__dirname, 'sessions/out.tracktionedit'), true),
  fluid.audiotrack.select('main'),
  fluid.midiclip.create('p2', 1, 8, tabEx.beatNotes),
  fluid.plugin.select('zebra2', 'VST'),
  fluid.audiotrack.renderRegion('media/p3.wav', 1, 8),

  fluid.audiotrack.select('wet'),
  fluid.plugin.select('zebra2', 'vst'),
  fluid.plugin.select('eos', 'VST'),
  ...fluid.midiclip.create('no-tears', 8, 8, tabEx.noTearsVerseNotes),
  fluid.clip.render('media/chords1.wav', 10),
  fluid.global.save(),
]);
