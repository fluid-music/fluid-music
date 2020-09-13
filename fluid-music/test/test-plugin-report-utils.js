require('mocha')
require('should')

const dragonflyRoomReport = require('./plugin-report-dragonfly-room')
const { guessParamRange, guessParamUnits, guessIsLinear, guessIsContinuous } = require('../built/cybr/plugin-report-utils')

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

const tCompLookahead = {"name":"Lookahead","tracktionIndex":12,"defaultValue":0,"currentExplicitValue":0,"currentNormalizedValue":0,"currentValue":0,"currentValueAsStringWithLabel":"0.00 ms","currentValueAsString":"0.00 ms","currentBaseValue":0,"isDiscrete":false,"isAutomationActive":false,"isActive":true,"hasAutomationPoints":false,"hasLabels":false,"currentLabel":"ms","inputValueRange":[0,1],
  "outputValueStepsAsStrings":["0.00 ms","0.71 ms","1.43 ms","2.14 ms","2.86 ms","3.57 ms","4.29 ms","5.00 ms","5.71 ms","6.43 ms","7.14 ms","7.86 ms","8.57 ms","9.29 ms","10.00 ms"],
  "outputValueRangeAsStrings":["0.00 ms","10.00 ms"],
  "outputValueRangeAsStringsWithLabels":["0.00 ms","10.00 ms"]
}
const tCompRatio = {"name":"Ratio","tracktionIndex":5,"defaultValue":0,"currentExplicitValue":0.3989081978797913,"currentNormalizedValue":0.3989081978797913,"currentValue":0.3989081978797913,"currentValueAsStringWithLabel":"2.00:1","currentValueAsString":"2.00:1","currentBaseValue":0.3989081978797913,"isDiscrete":false,"isAutomationActive":false,"isActive":true,"hasAutomationPoints":false,"hasLabels":false,"currentLabel":"","inputValueRange":[0,1],
  "outputValueStepsAsStrings":["1.00:1","1.00:1","1.01:1","1.04:1","1.19:1","1.58:1","2.43:1","4.09:1","7.03:1","11.87:1","19.41:1","30.65:1","46.80:1","69.35:1","100.00:1"],
  "outputValueRangeAsStrings":["1.00:1","100.00:1"],
  "outputValueRangeAsStringsWithLabels":["1.00:1","100.00:1"]
}

const tCompType = {"name":"Type","tracktionIndex":22,"defaultValue":0,"currentExplicitValue":0,"currentNormalizedValue":0,"currentValue":0,"currentValueAsStringWithLabel":"0","currentValueAsString":"0","currentBaseValue":0,"isDiscrete":false,"isAutomationActive":false,"isActive":true,"hasAutomationPoints":false,"hasLabels":false,"currentLabel":"","inputValueRange":[0,1],
"outputValueStepsAsStrings":["0","1","1","2","2","3","3","4","4","5","5","6","6","7","7"],
"outputValueRangeAsStrings":["0","7"],
"outputValueRangeAsStringsWithLabels":["0","7"]
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
      guessParamUnits(podolskiPercent).should.equal('percent')
    })

    it('should handle when there is no current label', function () {
      guessParamUnits(negativeDbRange).should.equal('db')
    })
  })

  describe('guessIsContinuous', function () {
    it('should identify parameters ranges with -Infinity as continuous', function () {
      guessIsContinuous(negativeDbRange).should.be.true()
    })

    it('should identify discrete numeric parameters as NOT continuous', function () {
      guessIsContinuous(tCompType).should.be.false()
    })
  })

  describe('guessIsLinear', function () {
    it('should identify the #TCompressor Lookahead parameter as linear', function () {
      guessIsLinear(tCompLookahead).should.be.true()
    })
    it('should identify the #TCompressor Ratio parameter as non-linear', function () {
      guessIsLinear(tCompRatio).should.be.false()
    })
  })

  describe('DragonflyRoomReverb', function () {
    // This plugin is unusual insofar as all parameters are linear
    it('should identify all parameters as linear', function () {
      // exclude the "Dry Level" and "Wet Level" params added by tracktion
      const params = dragonflyRoomReport.params.slice(2)
      for (const paramInfo of params) {
        guessIsLinear(paramInfo).should.be.true(`"${paramInfo.name}" was not identified as linear: \n${JSON.stringify(paramInfo, null, 2)}`)
      }
    })
  })
})
