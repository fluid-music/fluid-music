#!/usr/bin/env node
const path = require('path');
const fluid = require('fluid-music');
const cloud = require('./cloud');

const availableNote = [
  ...cloud.allOctaves('b4'),
  ...cloud.allOctaves('c#4'),
  // ...cloud.allOctaves('e5'),
  // ...cloud.allOctaves('g4'),
  // ...cloud.allOctaves('eb4'),
  // ...cloud.allOctaves('e4'),
  ...cloud.allOctaves('f4'),
];

const config = {
  durationInWholeNotes: 6,
  shortestDelta: 1/64,
  longestDelta: 1/1,
};

const notes = cloud.create(availableNote, config);
const client = new fluid.Client(9999);
const durationInQuarterNotes = config.durationInWholeNotes * 4
client.send([
  fluid.audiotrack.select('cloud'),
  fluid.midiclip.create('cloud1', 0, durationInQuarterNotes, notes),
  fluid.transport.loop(0, durationInQuarterNotes),
  fluid.audiotrack.gain(-10),
  fluid.audiotrack.unmute(),
  fluid.transport.play(),
  fluid.global.save(path.join(__dirname, 'sessions', 'demo.tracktionedit')),
]);
