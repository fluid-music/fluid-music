#!/usr/bin/env node

const path  = require('path');
const fluid = require('../');
const file  = path.join(__dirname, 'example.tracktionedit');

const client = new fluid.Client(9999);
client.send([
  fluid.global.activate(file, true),

  fluid.audiotrack.select('bass'),
  fluid.plugin.select('Zebra2'),
  fluid.plugin.save('zebra2.bass2osc'),

  fluid.audiotrack.select('chords'),
  fluid.plugin.select('4osc'),
  fluid.plugin.save('4osc.supersaw'),
]);
