const path = require('path');
const fluid = require('../src/index');
const Client = require('../src/FluidClient');

const client = new Client(9999);

client.send([
  fluid.global.activate(path.join(__dirname, 'sessions/out.tracktionedit'), true),
  fluid.audiotrack.selectReturnTrack('unused1'),
  fluid.audiotrack.selectReturnTrack('delay'),
  fluid.plugin.select('delay'),
  fluid.audiotrack.selectReturnTrack('unused2'),

  fluid.audiotrack.select('Track 1'),
  fluid.audiotrack.send('delay', -20),
  fluid.global.save(),
]);
