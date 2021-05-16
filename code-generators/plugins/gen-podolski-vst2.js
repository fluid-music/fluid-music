const tCompReport = require('./reports/podolski-vst2')
const fluid = require('../..')

for (const paramInfo of tCompReport.params) {
  if (paramInfo.name === 'VCC: Active #LFO1') paramInfo.choices = { off: 0, on: 1 }
}

// The Mac plugin name is "Podolski", while the Linux name is "Podolski.64". If
// we use the short name, cybr will still find it on Mac, because it checks the
// start of the string.
tCompReport.pluginName = 'Podolski'

const moduleString = fluid.gen.generatePluginModule(tCompReport, { className: 'PodolskiVst2', internal: true })

const fs = require('fs')
const path = require('path')
const filename = path.join(__dirname, '..', '..', 'src', 'plugin-adapters', 'podolski-vst2.ts')
fs.createWriteStream(filename).write(moduleString)

