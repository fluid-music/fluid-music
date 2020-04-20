#!/usr/bin/env node

const fluid = require('../src/index');
const FluidClient = require('../src/FluidClient');
const path = require('path');

const sessionPath = path.join(__dirname, 'sessions/out.tracktionedit')

const client = new FluidClient(9999);
client.send([fluid.plugin.addpath('~/Library/Application Support/Tracktion/Waveform/Presets'),
            fluid.global.activate(sessionPath),
            fluid.audiotrack.select('chorus'),
            fluid.plugin.load('4OSC Default Lead')])