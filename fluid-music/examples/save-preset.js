#!/usr/bin/env node

const path  = require('path');
const fluid = require('../');
const cybr  = fluid.cybr;
const file  = path.join(__dirname, 'example.tracktionedit');

const client = new cybr.Client(9999);
client.send([
  cybr.global.activate(file, true),

  cybr.audiotrack.select('bass'),
  cybr.plugin.select('Zebra2'),
  cybr.plugin.save('zebra2.bass2osc'),

  cybr.audiotrack.select('chords'),
  cybr.plugin.select('4osc'),
  cybr.plugin.save('4osc.supersaw'),
]);
