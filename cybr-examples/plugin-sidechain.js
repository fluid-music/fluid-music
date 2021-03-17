const path = require('path');
const fluid = require('..');
const cybr  = fluid.cybr;

const client = new cybr.Client(9999);

client.send([
  cybr.global.activate(path.join(__dirname, 'sessions/out.tracktionedit'), true),
  cybr.audiotrack.select('compressed'),
  cybr.plugin.select('compressor'),
  cybr.plugin.setSideChainInput('sc-input'),
  cybr.global.save(),
]);
