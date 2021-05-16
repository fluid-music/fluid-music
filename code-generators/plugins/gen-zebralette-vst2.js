const zebraletteReport = require('./reports/zebralette-vst2')
const fluid = require('../..')

// Zebralette has some parameters that are not accessible from the UI, and do
// not appear to be user adjustable (they snap back to their original position
// when adjusted in reaper). Remove from the param list.
zebraletteReport.params = zebraletteReport.params.filter(paramInfo => {
  if (['VCC: Voice Stack'].indexOf(paramInfo.name) === -1) return true
  return false
})

for (const paramInfo of zebraletteReport.params) {
  if (paramInfo.name === 'VCC: Transpose') {
    paramInfo.comment = `  /** An integer value from -24 to 24 */\n`
    paramInfo.isLinear = true
    paramInfo.range = [-24, 24]
  } else if (paramInfo.name === 'LFOG: Sync' || paramInfo.name === 'LFO1: Sync') {
    paramInfo.isContinuous = false
  }
}

const moduleString = fluid.gen.generatePluginModule(zebraletteReport, { internal: true })

const fs = require('fs')
const path = require('path')
const filename = path.join(__dirname, '..', '..', 'src', 'plugin-adapters', 'zebralette-vst2.ts')
fs.createWriteStream(filename).write(moduleString)
