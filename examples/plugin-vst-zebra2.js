const path   = require('path')
const fluid  = require('../')
const cybr   = fluid.cybr
const file   = path.join(__dirname, 'example.tracktionedit')

const client = new cybr.Client(9999)

const elements = [
  cybr.global.activate(file, true),
  cybr.audiotrack.select('supersaw'),
  cybr.plugin.select('zebra2', 'vst'),
  cybr.plugin.setParamNormalized('ENV1: Attack', 1.0),
  cybr.plugin.setParamNormalized('VCF1: Cutoff', 1.0),
  cybr.plugin.setParamNormalized('VCF2: Cutoff', 1.0),
  cybr.global.save(),
]
client.send(elements);
