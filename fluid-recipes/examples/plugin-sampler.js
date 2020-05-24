#!/usr/bin/env node

const path = require('path');
const fluid = require('fluid-music');
const recipes = require('../');

const sessionPath = path.join(__dirname, 'sessions/out.tracktionedit')

// A minimal drum beat in 4/4
const beat = {
  noteLibrary: { k: 36, h: 42, s: 38 }, // general midi drum convention
  r:  '1 + 2 + 3 + 4 + ',
  ks: 'k . s . . . s k ',
  hh: 'h h h h h h h h ',
};

beatNotes = [
  ...fluid.tab.parseTab(beat.r, beat.ks, beat.noteLibrary).notes,
  ...fluid.tab.parseTab(beat.r, beat.hh, beat.noteLibrary).notes,
];

const client = new fluid.Client(9999);
client.send([
  fluid.global.activate(sessionPath, true),
  fluid.audiotrack.select('drums'),
  fluid.midiclip.create('beat1', 0, 4, beatNotes),
  ...recipes.drumTrack909(),
  fluid.global.save(),
  fluid.transport.loop(0, 1),
  fluid.transport.play(),
]);
