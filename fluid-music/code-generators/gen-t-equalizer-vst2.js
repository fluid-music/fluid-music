const tEqualizerVst2 = require('./reports/t-equalizer-vst2')
const fluid = require('..');

for (const paramInfo of tEqualizerVst2.params) {
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

function makeBandMethod (band) {
  return `
  /**
   * Configure EQ band ${band} frequency, gain, and Q
   * @param hz frequency in hertz (10 to 30000)
   * @param gain band gain in dB (-30 to 30, 0 is unity gain)
   * @param q band width (0.025 to 40, higher is narrower)
   * @param active
   */
  setBand${band}(hz?: number, gain?: number, q?: number, active = true) {
    if (typeof hz === 'number')      this.parameters.band${band}FrequencyHz = hz
    if (typeof gain === 'number')    this.parameters.band${band}GainDb = gain
    if (typeof q === 'number')       this.parameters.band${band}Q = q
    if (typeof active === 'boolean') this.parameters.band${band}State = active ? 0.5 : 0
  }`}

const extraMethods = [1, 2, 3, 4, 5, 6, 7, 8].map(makeBandMethod).join('\n') + '\n'
const className = 'TEqualizerVst2' // I'm going to spell the class name correctly (even though they don't)
const moduleString = fluid.gen.generatePluginModule(tEqualizerVst2, { className, extraMethods })
process.stdout.write(moduleString)
