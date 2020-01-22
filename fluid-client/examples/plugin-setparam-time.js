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
  fluid.plugin.setParam('Amp Attack', 50, 1), //debug to see if i need to make it work with beats
  fluid.plugin.setParam('Amp Attack', 3, 1), //same point reappears 
  fluid.plugin.setParam('Amp Attack', 25, 1), //same point reappears 
  fluid.plugin.setParam('Width', 0.75, 4),
  ...fluid.midiclip.create('v1.1', 0, 8, tabs.noTearsVerseNotes),
  fluid.global.save(sessionPath),
]);