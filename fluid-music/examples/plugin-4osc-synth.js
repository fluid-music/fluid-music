
const fluid = require('../src/index');
const FluidClient = require('../src/FluidClient');
const tabs = require('./tab-examples');
const path = require('path');

const sessionPath = path.join(__dirname, 'sessions/out.tracktionedit')

const client = new FluidClient(9999);
client.send([
  fluid.audiotrack.select('stabs'),
  fluid.plugin.select('4osc'),
  fluid.midiclip.create('v1.1', 0, 8, tabs.noTearsVerseNotes),
  fluid.midiclip.create('v1.2', 8, 8, tabs.noTearsVerseNotes),
  fluid.global.save(sessionPath),
]);
