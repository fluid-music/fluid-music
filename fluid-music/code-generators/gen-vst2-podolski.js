const tCompReport = require('./reports/vst2-podolski')
const fluid = require('..')

for (const paramInfo of tCompReport.params) {
  if (paramInfo.name === 'VCC: Active #LFO1') paramInfo.choices = { off: 0, on: 1 }
}

const moduleString = fluid.gen.generatePluginModule(tCompReport, 'PodolskiVst2')
process.stdout.write(moduleString)
