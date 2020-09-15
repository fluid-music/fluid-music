const tCompReport = require('./reports/t-equalizer-vst2')
const fluid = require('..')

for (const paramInfo of tCompReport.params) {
  if (paramInfo.name.endsWith(' Frequency')) paramInfo.powerFuncB = 5; else
  if (paramInfo.name.endsWith(' Q')) paramInfo.powerFuncB = 5; else
  if (paramInfo.name.endsWith(' Shape')) paramInfo.choices = {
    lowPass: 0,
    lowShelf: 1/6,
    /**
     * peakNotch is the default parametric EQ type
     */
    peakNotch: 2/6,
    bandPass: 3/6,
    bandStop: 4/6,
    highShelf: 5/6,
    highPass: 1,
  }
}

const moduleString = fluid.gen.generatePluginModule(tCompReport)
process.stdout.write(moduleString)
