const path = require('path');
const fluid = require('../src/fluidOsc');
const Client = require('../src/FluidClient');

const client = new Client(9999);

client.send([
  fluid.global.activate(path.join(__dirname, 'sessions/out.tracktionedit'), true),
  fluid.bus.selectReturnTrack('r1'),
  fluid.bus.selectReturnTrack('r2'),
  fluid.plugin.select('delay'),
  fluid.audiotrack.select('Track 1'),
  fluid.bus.sendLevel('delay', -20),
  fluid.global.save(),
]);
