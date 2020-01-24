#!/usr/bin/env node
const path = require('path');
const fluid = require('fluid-music');
const cloud = require('./cloud');

const availableNote = [
  ...cloud.allOctaves('b4'),
  ...cloud.allOctaves('f4'),
  ...cloud.allOctaves('a5'),
  ...cloud.allOctaves('d#3'),
  ...cloud.allOctaves('e'),
];
const measures = 2;
const notes = cloud.cloud(availableNote, measures);

const client = new fluid.Client(9999);
client.send([
  fluid.audiotrack.select('cloud'),
  fluid.midiclip.create('cloud1', 0, measures * 4, notes),
  fluid.transport.loop(0, measures * 4),
  fluid.transport.play(),
  fluid.global.save(path.join(__dirname, 'sessions', 'demo.tracktionedit')),
]);
