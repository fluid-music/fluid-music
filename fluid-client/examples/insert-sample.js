#!/usr/bin/env node

const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');

const client = new FluidClient(9999);
client.send([
        fluid.global.activate('~/Documents/out.tracktionedit'),
        fluid.audiotrack.select('sample-track'),
        fluid.sample.insertWAV('sample-track', 'sample', 0, '~/Documents/file.wav', 'Inserted Sample'),
        fluid.global.save('~/Documents/out.tracktionedit')
        ])