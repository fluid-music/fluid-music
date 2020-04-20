#!/usr/bin/env node

const fluid = require('fluid-music');

const client = new fluid.Client(9999);
client.send([
  fluid.audiotrack.select('bass'),
  fluid.plugin.select('Zebra2'),
  fluid.plugin.save('zebra2.bass2osc'),

  fluid.audiotrack.select('chords'),
  fluid.plugin.select('4osc'),
  fluid.plugin.save('4osc.supersaw'),
]);
