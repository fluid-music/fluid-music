const freqEchoReport = require('./reports/valhalla-freq-echo-vst2')
const fluid = require('../..')

for (const paramInfo of freqEchoReport.params) {
  if (paramInfo.name === 'lowCut') {
    paramInfo.isLinear = true
    paramInfo.range = [20, 3000]
  }
  if (paramInfo.name === 'highCut') {
    paramInfo.isLinear = true
    paramInfo.range = [50, 15000]
  }
  if (paramInfo.name === 'delay') {
    // Used this graph to get close
    // https://www.desmos.com/calculator/eltrko6ete
    // 
    // Then fine tune manually with .range = [0.01, 1000]
    // 3.321 is low
    // 3.322 is exact@100ms, low@300ms
    // 2.3225 is high@100ms and 300ms
    // 3.3222 is high
    paramInfo.powerFuncB = 3.3221
  }
  if (paramInfo.name === 'sync') {
    // Note that the choices array below is a little unusual. Usually we would
    // leave the .range at [0, 1]. In this case the guesser correctly identifies
    // that this parameter is linear from 0-23. To keep things simple we'll leave
    // that range intact.
    paramInfo.isContinuous = false
    paramInfo.choices = {
      'free':  1,
      '1/64':  2,
      '1/32':  3,
      '1/16':  4,
      '1/8':   5,
      '1/4':   6,
      // I think there is a rounding or floating point error, which is corrected
      // by adding a very small value.
      '2/4':   7.00001,
      '4/4':   8,
      '8/4':   9,
      '1/64.': 10,
      '1/32.': 11,
      '1/16.': 12,
      '1/8.':  13,
      '1/4.':  14.00001,
      '2/4.':  15,
      '4/4.':  16,
      '1/64T': 17,
      '1/32T': 18,
      '1/16T': 19,
      '1/8T':  20,
      '1/4T':  21,
      '2/4T':  22,
      '4/4T':  23
    }
  }
}

const moduleString = fluid.gen.generatePluginModule(freqEchoReport, { internal: true })

const fs = require('fs')
const path = require('path')
const filename = path.join(__dirname, '..', '..', 'src', 'plugin-adapters', 'valhalla-freq-echo-vst2.ts')
fs.createWriteStream(filename).write(moduleString)
