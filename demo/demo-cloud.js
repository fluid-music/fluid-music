#!/usr/bin/env node
const path = require('path');
const fluid = require('fluid-music');
const cloud = require('./cloud');

const availableNote = [
  ...cloud.allOctaves('bb4'),
  ...cloud.allOctaves('c4'),
  ...cloud.allOctaves('eb5'),
  // ...cloud.allOctaves('eb4'),
  // ...cloud.allOctaves('e'),
  // ...cloud.allOctaves('f'),
  // ...cloud.allOctaves('g'),
];

const config = {
  durationInWholeNotes: 4,
  shortestDelta: 1/4,
  longestDelta: 1/1,
};

const notes = cloud.create(availableNote, config);
const client = new fluid.Client(9999);
const durationInQuarterNotes = config.durationInWholeNotes * 4
client.send([
  fluid.audiotrack.select('cloud'),
  fluid.midiclip.create('cloud1', 0, durationInQuarterNotes, notes),
  fluid.transport.loop(0, durationInQuarterNotes),
  fluid.transport.play(),
  fluid.global.save(path.join(__dirname, 'sessions', 'demo.tracktionedit')),
]);
