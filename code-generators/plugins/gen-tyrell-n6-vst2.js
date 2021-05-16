const tCompReport = require('./reports/tyrell-n6-vst2')
const fluid = require('../..')

for (const paramInfo of tCompReport.params) {
    // technically, VCC Transpose is a discrete parameter with 49 steps
    if (paramInfo.name === 'VCC: Transpose') {
        paramInfo.isLinear = true
        paramInfo.range = [-24, 24]
    }
    // weirdly ever parameter unit is "unit" in this vst
    paramInfo.units = ''
}

const moduleString = fluid.gen.generatePluginModule(tCompReport, { internal: true })

const fs = require('fs')
const path = require('path')
const filename = path.join(__dirname, '..', '..', 'src', 'plugin-adapters', 'tyrell-n6-vst2.ts')
fs.createWriteStream(filename).write(moduleString)
