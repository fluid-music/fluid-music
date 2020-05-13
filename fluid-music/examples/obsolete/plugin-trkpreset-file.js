#!/usr/bin/env node

const fluid = require('../src/index');
const FluidClient = require('../src/FluidClient');

const fs = require('fs');
const path = require('path');
const presetsPath = '/Users/charles/Library/Application Support/Tracktion/Waveform/Presets/';
const presetFilename = path.join(presetsPath, '4OSC AIpad.trkpreset');
const presetBlob = fs.readFileSync(presetFilename);

if (!presetBlob) console.log("Failed to load preset blob");

const client = new FluidClient(9999);
client.send([
  fluid.audiotrack.select('synth'),
  fluid.plugin.loadTrkpreset(presetFilename),
]);
