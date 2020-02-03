const path = require('path');
const fluid = require('../src/index');
const Client = require('../src/FluidClient');
const tabEx = require('./tab-examples');

// first run simple-setup.js
// second use this to save

const client = new Client(9999);

client.send([
  fluid.audiotrack.select('main'),
  fluid.midiclip.create('beatNotes', 1, 8, tabEx.beatNotes),
  fluid.audiotrack.renderRegion('media/p3.wav', 1, 8),

  fluid.audiotrack.select('wet'),
  ...fluid.midiclip.create('no-tears', 8, 8, tabEx.noTearsVerseNotes),
  fluid.clip.render('media/noTearsVerseNotes.wav', 10),
]);
