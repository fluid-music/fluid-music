#!/usr/bin/env node

const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');

const client = new FluidClient(9999);
client.send([fluid.plugin.addpath('/Users/zhiweigan/Library/Application Support/Tracktion/Waveform/Presets'),
            fluid.plugin.addpath('/Users/zhiweigan/Documents/cybr/fluid-client/examples'),
            fluid.global.activate('out.tracktionedit'),
            fluid.audiotrack.select('chorus'),
            fluid.plugin.load('4OSC Modified Default Lead')])