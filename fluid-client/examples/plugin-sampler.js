const path = require('path');
const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');
const tabs = require('./tab-examples');
const sampler909 = require('../recipes/track-drums909');

const sessionPath = path.join(__dirname, 'sessions/out.tracktionedit')

const client = new FluidClient(9999);
client.send([
  fluid.global.activate(sessionPath, true),
  fluid.midiclip.create('drums', 'beat1', 0, 4, tabs.beatNotes),
  sampler909(),
  fluid.global.save(),
]);
