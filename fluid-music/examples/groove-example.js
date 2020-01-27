#!/usr/bin/env node

const path = require('path');
const tab = require('../src/tab');
const fluid = require('../src/fluid');
const FluidClient = require('../src/FluidClient');
const groove = require('../src/groove');

const sessionPath = path.join(__dirname, 'sessions/swing.tracktionedit')
const drums909 = require('../../fluid-recipes/src/drumTrack909');
const drumTrackName = '909';
const drumsMsg = drums909(drumTrackName);

const noteLibrary = { h: 42 };

const r   = '1+2+3+4+'; // main rhythm
const notes = tab.parse({
  noteLibrary, r,
  p: [
    { r:'1+2+3+4+', p: 'hhhhhhhh',} 
  ],
});

const groovyNotes = groove.applyGroove(notes, "Heavy Swing", {v: 1.3, o: 1.5}, 0.2)

const client = new FluidClient(9999);
client.send([
  fluid.global.activate(sessionPath, true),
  drumsMsg,
  fluid.audiotrack.select("909"),
  fluid.midiclip.create('909', 0, 4, groovyNotes), 
  fluid.global.save(sessionPath),
]);
