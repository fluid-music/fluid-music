require('mocha')
require('should')

const { guessParamRange, guessParamUnits } = require('../built/src/cybr/plugin-report-utils')

// Note that some plugins (like Podolski) correctly report
// outputValueRangeAsString and outputValueRangeAsStringWithLabel
const podolskiPercent = {
  hasLabels: false, // seems to always be false
  currentLabel: '%',
  inputValueRange: [ 0, 1 ],
  outputValueRangeAsStrings: [ '0.00', '100.00' ],
  outputValueRangeAsStringsWithLabels: [ '0.00 %', '100.00 %' ]
}

// While other plugins (like #TStereo Delay) always report the unit label:
const tStereoDelayHz = {
  currentLabel: 'Hz',
  inputValueRange: [ 0, 1 ],
  outputValueRangeAsStrings: [ '20 Hz', '20000 Hz' ],
  outputValueRangeAsStringsWithLabels: [ '20 Hz', '20000 Hz' ]
}

// Another thing to look out for is parameters that may represent a
// continuous function, but look like this:
const negativeDbRange = {
  currentLabel: '',
  outputValueRangeAsStrings: [ '-INF dB', '+18.00 dB' ],
  outputValueRangeAsStringsWithLabels: [ '-INF dB', '+18.00 dB' ],
}

// currentLabel is sometimes empty like the podolski example below
const podolskiLfoExample = {
  name: 'LFO1: FreqMod Dpt',
  currentLabel: '',
  inputValueRange: [ 0, 1 ],
  outputValueRangeAsStrings: [ '-5.00', '5.00' ],
  outputValueRangeAsStringsWithLabels: [ '-5.00', '5.00' ]
}

describe('test-plugin-report-utilities', function () {
  describe('guessParamRange', function () {
    it('should handle a very simple case: ["-5.00", "5.00"]', function () {
      const [min, max] = guessParamRange(podolskiLfoExample)
      min.should.equal(-5)
      max.should.equal(5)
    })

    it(`should handle postfix unit symbols [ '20 Hz', '20000 Hz' ]`, function () {
      const [min, max] = guessParamRange(tStereoDelayHz)
      min.should.equal(20)
      max.should.equal(20000)
    })

    it(`should handle inf [ '-INF dB', 'Infinity dB' ]`, function () {
      const [min, max] = guessParamRange({ outputValueRangeAsStrings: ['-INF dB', 'Infinity dB'] })
      min.should.equal(-Infinity)
      max.should.equal(Infinity)
    })
  })

  describe('guessParamUnits', function () {
    it('should handle the case when all the units are accurate', function () {
      guessParamUnits(podolskiPercent).should.equal('%')
    })

    it('should handle when there is no current label', function () {
      guessParamUnits(negativeDbRange).should.equal('dB')
    })
  })
})