#!/usr/bin/env node

const fluid = require('../src/index');
const recipes = require('../');
const path = require('path');

const drumTrackName = '909';
const drumsMsg = recipes.drumTrack909(drumTrackName);
const sessionPath = path.join(__dirname, 'sessions/out.tracktionedit')

const noteLibrary = { h: 42 };

const r   = '1+2+3+4+'; // main rhythm
const notes = fluid.tab.parse({
  noteLibrary, r,
  p: [
    { r:'1+2+3+4+', p: 'hhhhhhhh',} 
  ],
});

const groovyNotes = fluid.groove.applyGroove(notes, "Heavy Swing", {v:2,o:2,l:2});

const client = new FluidClient(9999);
client.send([
  fluid.global.activate(sessionPath, true),
  drumsMsg,
  fluid.audiotrack.select("909"),
  fluid.midiclip.create('909', 0, 4, groovyNotes), 
  fluid.global.save(sessionPath),
]);
