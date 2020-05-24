#!/usr/bin/env node
const path = require('path');
const fluid = require('../fluid-music');
const cloud = require('../fluid-recipes').cloud;

const availableNote = [
  ...cloud.allOctaves('b4'),
  ...cloud.allOctaves('c#4'),
  // ...cloud.allOctaves('e5'),
  // ...cloud.allOctaves('g4'),
  // ...cloud.allOctaves('eb4'),
  // ...cloud.allOctaves('e4'),
  // ...cloud.allOctaves('f4'),
];

const duration = 6;
const cloudConfig = {
  durationInWholeNotes: duration,
  shortestDelta: 1/8,
  longestDelta: 1/1,
};

const notes = cloud.create(availableNote, cloudConfig);


const client = new fluid.Client(9999);


client.send([
  fluid.audiotrack.select('cloud'),
  fluid.midiclip.create('cloud1', 0, duration, notes),
  fluid.transport.loop(0, duration),
  fluid.audiotrack.gain(0),
  fluid.transport.play(),
  fluid.global.save(),
]);
