const tCompReport = require('./reports/vst2-t-compressor')
const fluid = require('..')

const moduleString = fluid.gen.generatePluginModule(tCompReport)
process.stdout.write(moduleString)
