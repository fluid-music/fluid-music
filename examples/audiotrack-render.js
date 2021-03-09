const path = require('path');
const fluid = require('..');
const cybr  = fluid.cybr;
const tabEx = require('./tab-examples');

// first run simple-setup.js
// second use this to save

const client = new cybr.Client(9999);

client.send([
  cybr.audiotrack.select('main'),
  cybr.midiclip.create('beatNotes', 1, 8, tabEx.beatNotes),
  cybr.audiotrack.renderRegion('media/p3.wav', 1, 8),

  cybr.audiotrack.select('wet'),
  ...cybr.midiclip.create('no-tears', 8, 8, tabEx.noTearsVerseNotes),
  cybr.clip.render('media/noTearsVerseNotes.wav', 10),
]);
