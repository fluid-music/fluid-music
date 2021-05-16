const tStereoDelayVst2 = require('./reports/t-stereo-delay-vst2')
const fluid = require('../..')

for (const paramInfo of tStereoDelayVst2.params) {
  if (paramInfo.name === 'L High Cut' ||
    paramInfo.name === 'R High Cut' ||
    paramInfo.name === 'L Low Cut' ||
    paramInfo.name === 'R Low Cut'
  ) {
    paramInfo.powerFuncB = 2
    paramInfo.range = [20, 20000]
  } else if (paramInfo.name === 'Wet' || paramInfo.name === 'Dry') {
    paramInfo.range = [-50, 18]
    paramInfo.isLinear = true
  }
}

const moduleString = fluid.gen.generatePluginModule(tStereoDelayVst2, { internal: true })

const fs = require('fs')
const path = require('path')
const filename = path.join(__dirname, '..', '..', 'src', 'plugin-adapters', 't-stereo-delay-vst2.ts')
fs.createWriteStream(filename).write(moduleString)


