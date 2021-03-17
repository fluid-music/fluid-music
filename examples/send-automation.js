const path = require('path')
const fluid = require('../');
const cybr  = fluid.cybr
const file  = path.join(__dirname, 'example.tracktionedit');

// This amplification conversion is hard-coded in Tracktion
const normalizeTracktionGain = (db) => {
  const normalized = Math.exp((db-6) * (1/20))
  return Math.max(Math.min(normalized, 1), 0)
}

const client = new cybr.Client(9999);
const m1 = [
  cybr.global.activate(file, true),
  cybr.audiotrack.select('receive track'),
  cybr.audiotrack.select('sending track'),
  cybr.audiotrack.send('receive track'),
  cybr.plugin.setParamNormalizedAt('Send level', normalizeTracktionGain(5), 1, 0.5),
  cybr.plugin.setParamNormalizedAt('Send level', normalizeTracktionGain(0), 3),
  cybr.plugin.setParamNormalizedAt('Send level', normalizeTracktionGain(-60), 15),
  cybr.plugin.select('delay'),
  cybr.global.save(),
];

client.send(m1).then(r => console.log(r)).catch(e => {throw e})
