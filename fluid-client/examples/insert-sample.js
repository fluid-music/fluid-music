#!/usr/bin/env node

const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');
const path = require('path');

const sessionPath = path.join(__dirname, 'sessions/out.tracktionedit')

const client = new FluidClient(9999);
client.send([
        fluid.global.activate(sessionPath),
        fluid.audiotrack.select('sample-track'),
        fluid.audiotrack.insertWav('sample-track', 'sample', 0, '~/Documents/file.wav'),
        fluid.global.save(sessionPath)
        ]);
