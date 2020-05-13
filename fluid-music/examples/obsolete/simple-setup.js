const path = require('path');
const fluid = require('../src/index');
const Client = require('../src/FluidClient');
const tabEx = require('./tab-examples');

const client = new Client(9999);

client.send([
  fluid.global.activate(path.join(__dirname, 'sessions/out.tracktionedit'), true),
  fluid.audiotrack.select('main'),
  fluid.midiclip.create('beatNotes', 0, 8, tabEx.beatNotes),
  fluid.plugin.select('zebra2', 'VST'),
  
  fluid.audiotrack.select('wet'),
  fluid.plugin.select('zebra2', 'vst'),
  fluid.plugin.select('eos', 'VST'),
  ...fluid.midiclip.create('noTearsVerseNotes', 8, 8, tabEx.noTearsVerseNotes),
  fluid.global.save(),
]);
