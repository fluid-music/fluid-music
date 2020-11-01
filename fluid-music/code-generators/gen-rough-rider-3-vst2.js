const tCompReport = require('./reports/rough-rider-3-vst2')
const fluid = require('..')

// RoughRider3 has a unusually complicated exponential 'Ratio' normalizer
// function. I calculated it with a little trial and error here:
// https://www.desmos.com/calculator/ymzzdnetik
// Note that the normalizer is the inverse of the graphed function in the link
// above.

for (const paramInfo of tCompReport.params) {
  if (paramInfo.name === 'Ratio') {
    paramInfo.range = [1, 1000]
    paramInfo.isContinuous = true
    paramInfo.isLinear = false
    paramInfo.units = null
    paramInfo.choices = null
    paramInfo.normalizeFunctionAsString = `(ratio: number) => {
      const a = 0.08
      const u = Math.log10((1000 - a) / a)
      return Math.log10((ratio + a - 1) / a) / u
    }`
  } else if (paramInfo.name === 'Attack') {
    paramInfo.isLinear = true
    paramInfo.isContinuous = true
    paramInfo.range = [0, 100]
  } else if (paramInfo.name === 'Release') {
    paramInfo.isLinear = true
    paramInfo.isContinuous = true
    paramInfo.range = [10, 1000]
  } else if (paramInfo.name === 'Mix') {
    paramInfo.isLinear = true
    paramInfo.isContinuous = true
    paramInfo.range = [0, 100]
  } else if (paramInfo.name === 'SC HPF') {
    paramInfo.key = 'sidechainHighpass'
  } else if (paramInfo.name === 'SC Active') {
    paramInfo.key = 'externalSidechainEnable'
  } else if (paramInfo.name === 'Makeup') {
    paramInfo.key = 'makeupGainDb'
  } else if (paramInfo.name === 'Input Lvl') {
    paramInfo.key = 'inputGainDb'
  }

}

const moduleString = fluid.gen.generatePluginModule(tCompReport)
process.stdout.write(moduleString)
