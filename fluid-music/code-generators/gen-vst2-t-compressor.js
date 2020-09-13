const tCompReport = require('./reports/vst2-t-compressor')
const fluid = require('..')

for (const paramInfo of tCompReport.params) {
  if (paramInfo.name === 'Threshold (2)') paramInfo.key = 'softClipThresholdDb'
  if (paramInfo.name === 'Auto') paramInfo.key = 'enableAutoMakeUpGain'
  if (paramInfo.name === 'Type') paramInfo.key = 'filterType'
}

const moduleString = fluid.gen.generatePluginModule(tCompReport)
process.stdout.write(moduleString)
