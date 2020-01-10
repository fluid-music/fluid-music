#!/usr/bin/env node

const process = require('process');
const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');

const client = new FluidClient(9999);
const cwd = process.cwd();
console.log('CWD:', cwd);
client.send(fluid.global.cd(cwd));
