const freqEchoReport = require('./reports/dragonfly-hall-vst2')
const fluid = require('../..')

for (const paramInfo of freqEchoReport.params) {
  if (paramInfo.name === 'Size') {
    paramInfo.units = 'meters'
  }
}

const moduleString = fluid.gen.generatePluginModule(freqEchoReport, { className: 'DragonflyHallVst2' })

const fs = require('fs')
const path = require('path')
const filename = path.join(__dirname, '..', '..', 'src', 'plugin-adapters', 'dragonfly-hall-vst2.ts')
fs.createWriteStream(filename).write(moduleString)