#!/usr/bin/env node

const fluid = require('../src/index');
const FluidClient = require('../src/FluidClient');
const path = require('path');
const args = process.argv.slice(2);

// input argument can be a .tracktionedit file OR a .wav file
const outFilename = path.join(__dirname, 'sessions/out.tracktionedit');
if (args.length) outFilename = args[0];
if (!path.isAbsolute(outFilename)) outFilename = path.join(process.cwd(), outFilename);

console.log("Save to:", outFilename);

const client = new FluidClient(9999);
client.send([
  fluid.transport.stop(),
  fluid.global.save(outFilename, false),
]);