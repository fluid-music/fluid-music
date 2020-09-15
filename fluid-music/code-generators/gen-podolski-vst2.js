const tCompReport = require('./reports/podolski-vst2')
const fluid = require('..')

for (const paramInfo of tCompReport.params) {
  if (paramInfo.name === 'VCC: Active #LFO1') paramInfo.choices = { off: 0, on: 1 }
}

const moduleString = fluid.gen.generatePluginModule(tCompReport, { className: 'PodolskiVst2' })
process.stdout.write(moduleString)
