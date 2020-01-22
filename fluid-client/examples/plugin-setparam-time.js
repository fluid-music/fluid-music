const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');
const tabs = require('./tab-examples');
const path = require('path');

const sessionPath = path.join(__dirname, 'sessions/out.tracktionedit')

const client = new FluidClient(9999);
client.send([
  fluid.global.activate(sessionPath, true),
  fluid.audiotrack.select('stabs'),
  fluid.plugin.select('4osc'),
  fluid.plugin.setParam('Amp Attack', 0.1, 1), 
  ...fluid.midiclip.create('v1.1', 0, 8, tabs.noTearsVerseNotes),
  fluid.global.save(sessionPath),
]);