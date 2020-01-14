const path = require('path');
const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');
const tabs = require('./tab-examples');
const drums909 = require('../recipes/track-drums909');

const trackName = '909';
const sampleDir =  path.join(__dirname, '909kit');
const sessionPath = path.join(__dirname, 'sessions/out.tracktionedit')

console.log('sample dir:', sampleDir);

const client = new FluidClient(9999);
client.send([
  fluid.global.activate(sessionPath, true),
  fluid.midiclip.create(trackName, 'd909.1', 0, 4, tabs.beatNotes),
  drums909(sampleDir, trackName),
  fluid.global.save(),
  fluid.transport.loop(0, 8),
  fluid.transport.play(),
]);
