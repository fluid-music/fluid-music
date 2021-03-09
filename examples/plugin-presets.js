const fluid = require('..');
const cybr  = fluid.cybr;
const path = require('path');

const sessionsDir = path.join(__dirname, 'sessions/')
const sessionPath = path.join(sessionsDir, 'out.tracktionedit')

const elements = [
  cybr.global.cd(sessionsDir),

  // create preset for vst2
  cybr.audiotrack.select('Track 1'),
  cybr.plugin.select('zebra2', 'vst'),
  cybr.plugin.setParamNormalized('ENV1: Attack', 1.0),
  cybr.plugin.setParamNormalized('VCF1: Cutoff', 0.0),
  cybr.plugin.setParamNormalized('VCF2: Cutoff', 1.0),
  cybr.plugin.save('zebra2.vst'),
  // load the zebra2 vst
  cybr.audiotrack.select('loadpreset'),
  cybr.plugin.load('zebra2.vst'),

  // create a preset for tracktion's delay plugin
  cybr.audiotrack.select('Track 1'),
  cybr.plugin.select('delay'),
  cybr.plugin.setParamNormalized('feedback', .10),
  cybr.plugin.setParamNormalized('feedback', 0.9),
  cybr.plugin.setParamNormalized('mix proportion', 0.75),
  cybr.plugin.save('delay-preset'),
  // load that preset on a new track
  cybr.audiotrack.select('loadpreset'),
  cybr.plugin.load('delay-preset'),

  // save a preset for tracktion's compressor plugin
  cybr.audiotrack.select('track 1'),
  cybr.plugin.select('compressor'),
  cybr.plugin.setParamNormalized('ratio', 0.33),
  cybr.plugin.setParamNormalized('attack', 0.33),
  cybr.plugin.save('comp-preset-1'),

  // save the edit file
  cybr.global.save(sessionPath, false),
];

const client = new cybr.Client(9999);
client.send(elements);
