#!/usr/bin/env node

const path = require('path');
const fluid = require('fluid-music');

const sessionFilename = path.join(__dirname, 'sessions/demo.tracktionedit');

const client = new fluid.Client(9999);
client.send([
  // Drums Track
  fluid.global.activate(sessionFilename, true),
  fluid.audiotrack.select('drums'),
  fluid.recipes.drumTrack909('drums'),

  // Chord track
  fluid.audiotrack.select('chords'),
  fluid.plugin.load('4OSC Clinics Unison WMF'),
  fluid.plugin.select('volume'),
  fluid.plugin.setParam('Volume', 0.25),

  // Finalize
  fluid.global.save(),
]);
