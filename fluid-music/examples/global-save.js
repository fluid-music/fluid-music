#!/usr/bin/env node

const fluid = require('../src/index');
const FluidClient = require('../src/FluidClient');
const path = require('path');

const sessionPath = path.join(__dirname, 'sessions/out.tracktionedit')

const client = new FluidClient(9999);
client.send([
  fluid.global.save(sessionPath, false),
]);
