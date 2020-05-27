const path   = require('path');
const fluid  = require('../');
const file   = path.join(__dirname, 'example.tracktionedit');
const client = new fluid.Client(9999);

const elements = [
  fluid.global.activate(file, true),
  fluid.audiotrack.select('supersaw'),
  fluid.plugin.select('zebra2', 'vst'),
  fluid.plugin.setParamNormalized('ENV1: Attack', 1.0),
  fluid.plugin.setParamNormalized('VCF1: Cutoff', 1.0),
  fluid.plugin.setParamNormalized('VCF2: Cutoff', 1.0),
  fluid.global.save(),
];
client.send(elements);
