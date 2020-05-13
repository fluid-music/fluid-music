const path = require('path');
const fluid = require('../src/index');
const Client = require('../src/FluidClient');

const client = new Client(9999);

client.send([
  fluid.global.activate(path.join(__dirname, 'sessions/out.tracktionedit'), true),
  fluid.audiotrack.select('compressed'),
  fluid.plugin.select('compressor'),
  fluid.plugin.setSideChainInput('sc-input'),
  fluid.global.save(),
]);
