require('mocha')
require('should')

const dragonflyRoomReport = require('./plugin-report-dragonfly-room')
const { guessParamRange, guessParamUnits, guessIsLinear, guessIsContinuous, guessDiscreteChoices } = require('../built/cybr/plugin-report-utils')

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
  outputValueRangeAsStringsWithLabels: [ '-5.00', '5.00' ],
  outputValueStepsAsStrings:["-5.00","-4.29","-3.57","-2.86","-2.14","-1.43","-0.71","0.00","0.71","1.43","2.14","2.86","3.57","4.29","5.00"]
}

const tAuto = {"name":"Auto","tracktionIndex":20,"defaultValue":0,"currentExplicitValue":0,"currentNormalizedValue":0,"currentValue":0,"currentValueAsStringWithLabel":"Off","currentValueAsString":"Off","currentBaseValue":0,"isDiscrete":false,"isAutomationActive":false,"isActive":true,"hasAutomationPoints":false,"hasLabels":false,"currentLabel":"","inputValueRange":[0,1],
"inputSteps":[0,0.0714285746216774,0.1428571492433548,0.2142857313156128,0.2857142984867096,0.3571428656578064,0.4285714626312256,0.5,0.5714285969734192,0.6428571939468384,0.7142857313156128,0.785714328289032,0.8571429252624512,0.9285714626312256,1],
"outputValueStepsAsStrings":["Off","Off","Off","Off","Off","Off","Off","On","On","On","On","On","On","On","On"],
"outputValueRangeAsStrings":["Off","On"],
"outputValueRangeAsStringsWithLabels":["Off","On"]}

const tCompLookahead = {"name":"Lookahead","tracktionIndex":12,"defaultValue":0,"currentExplicitValue":0,"currentNormalizedValue":0,"currentValue":0,"currentValueAsStringWithLabel":"0.00 ms","currentValueAsString":"0.00 ms","currentBaseValue":0,"isDiscrete":false,"isAutomationActive":false,"isActive":true,"hasAutomationPoints":false,"hasLabels":false,"currentLabel":"ms","inputValueRange":[0,1],
  "inputSteps":[0,0.0714285746216774,0.1428571492433548,0.2142857313156128,0.2857142984867096,0.3571428656578064,0.4285714626312256,0.5,0.5714285969734192,0.6428571939468384,0.7142857313156128,0.785714328289032,0.8571429252624512,0.9285714626312256,1],
  "outputValueStepsAsStrings":["0.00 ms","0.71 ms","1.43 ms","2.14 ms","2.86 ms","3.57 ms","4.29 ms","5.00 ms","5.71 ms","6.43 ms","7.14 ms","7.86 ms","8.57 ms","9.29 ms","10.00 ms"],
  "outputValueRangeAsStrings":["0.00 ms","10.00 ms"],
  "outputValueRangeAsStringsWithLabels":["0.00 ms","10.00 ms"]
}
const tCompRatio = {"name":"Ratio","tracktionIndex":5,"defaultValue":0,"currentExplicitValue":0.3989081978797913,"currentNormalizedValue":0.3989081978797913,"currentValue":0.3989081978797913,"currentValueAsStringWithLabel":"2.00:1","currentValueAsString":"2.00:1","currentBaseValue":0.3989081978797913,"isDiscrete":false,"isAutomationActive":false,"isActive":true,"hasAutomationPoints":false,"hasLabels":false,"currentLabel":"","inputValueRange":[0,1],
  "inputSteps":[0,0.0714285746216774,0.1428571492433548,0.2142857313156128,0.2857142984867096,0.3571428656578064,0.4285714626312256,0.5,0.5714285969734192,0.6428571939468384,0.7142857313156128,0.785714328289032,0.8571429252624512,0.9285714626312256,1],
  "outputValueStepsAsStrings":["1.00:1","1.00:1","1.01:1","1.04:1","1.19:1","1.58:1","2.43:1","4.09:1","7.03:1","11.87:1","19.41:1","30.65:1","46.80:1","69.35:1","100.00:1"],
  "outputValueRangeAsStrings":["1.00:1","100.00:1"],
  "outputValueRangeAsStringsWithLabels":["1.00:1","100.00:1"]
}
const tCompFilterType = {"name":"Type","tracktionIndex":22,"defaultValue":0,"currentExplicitValue":0,"currentNormalizedValue":0,"currentValue":0,"currentValueAsStringWithLabel":"0","currentValueAsString":"0","currentBaseValue":0,"isDiscrete":false,"isAutomationActive":false,"isActive":true,"hasAutomationPoints":false,"hasLabels":false,"currentLabel":"","inputValueRange":[0,1],
  "inputSteps":[0,0.0714285746216774,0.1428571492433548,0.2142857313156128,0.2857142984867096,0.3571428656578064,0.4285714626312256,0.5,0.5714285969734192,0.6428571939468384,0.7142857313156128,0.785714328289032,0.8571429252624512,0.9285714626312256,1],
  "outputValueStepsAsStrings":["0","1","1","2","2","3","3","4","4","5","5","6","6","7","7"],
  "outputValueRangeAsStrings":["0","7"],
  "outputValueRangeAsStringsWithLabels":["0","7"]
}

const podoDelaySync = {"name":"Dly1: Sync Right","tracktionIndex":68,"defaultValue":0,"currentExplicitValue":0.25,"currentNormalizedValue":0.25,"currentValue":0.25,"currentValueAsStringWithLabel":"1/4","currentValueAsString":"1/4","currentBaseValue":0.25,"isDiscrete":false,"isAutomationActive":false,"isActive":true,"hasAutomationPoints":false,"hasLabels":false,"currentLabel":"","inputValueRange":[0,1],"inputSteps":[0,0.0714285746216774,0.1428571492433548,0.2142857313156128,0.2857142984867096,0.3571428656578064,0.4285714626312256,0.5,0.5714285969734192,0.6428571939468384,0.7142857313156128,0.785714328289032,0.8571429252624512,0.9285714626312256,1],
  "outputValueStepsAsStrings":["1/64","1/32","1/16","1/8","1/2","1/1","1/32 dot","1/16 dot","1/8 dot","1/4 dot","1/2 dot","1/8 trip","1/4 trip","1/2 trip","1/1 trip"],
  "outputValueRangeAsStrings":["1/64","1/1 trip"],
  "outputValueRangeAsStringsWithLabels":["1/64","1/1 trip"]
}

const podoLfoPhasePercent = {"name":"LFOG: Phase","tracktionIndex":7,"defaultValue":0,"currentExplicitValue":0,"currentNormalizedValue":0,"currentValue":0,"currentValueAsStringWithLabel":"0.00 %","currentValueAsString":"0.00","currentBaseValue":0,"isDiscrete":false,"isAutomationActive":false,"isActive":true,"hasAutomationPoints":false,"hasLabels":false,"currentLabel":"%","inputValueRange":[0,1],"inputSteps":[0,0.0714285746216774,0.1428571492433548,0.2142857313156128,0.2857142984867096,0.3571428656578064,0.4285714626312256,0.5,0.5714285969734192,0.6428571939468384,0.7142857313156128,0.785714328289032,0.8571429252624512,0.9285714626312256,1],
  "outputValueStepsAsStrings":["0.00","7.14","14.29","21.43","28.57","35.71","42.86","50.00","57.14","64.29","71.43","78.57","85.71","92.86","100.00"],
  "outputValueRangeAsStrings":["0.00","100.00"],
  "outputValueRangeAsStringsWithLabels":["0.00 %","100.00 %"]
}

const tEqualizerFreq = {"name":"Band 1 Frequency","tracktionIndex":3,"defaultValue":0,"currentExplicitValue":0.4278567731380463,"currentNormalizedValue":0.4278567731380463,"currentValue":0.4278567731380463,"currentValueAsStringWithLabel":"440.000 Hz","currentValueAsString":"440.000 Hz","currentBaseValue":0.4278567731380463,"isDiscrete":false,"isAutomationActive":false,"isActive":true,"hasAutomationPoints":false,"hasLabels":false,"currentLabel":"Hz","inputValueRange":[0,1],"inputSteps":[0,0.0357142873108387,0.0714285746216774,0.1071428656578064,0.1428571492433548,0.1785714328289032,0.2142857313156128,0.25,0.2857142984867096,0.3214285969734192,0.3571428656578064,0.392857164144516,0.4285714626312256,0.4642857313156128,0.5,0.535714328289032,0.5714285969734192,0.6071428656578064,0.6428571939468384,0.6785714626312256,0.7142857313156128,0.7500000596046448,0.785714328289032,0.8214285969734192,0.8571429252624512,0.8928571939468384,0.9285714626312256,0.9642857313156128,1],
"outputValueStepsAsStrings":["10.000 Hz","10.002 Hz","10.056 Hz","10.423 Hz","11.784 Hz","15.445 Hz","23.550 Hz","39.287 Hz","67.100 Hz","112.896 Hz","184.256 Hz","290.640 Hz","443.603 Hz","656.998 Hz","947.187 Hz","1333.253 Hz","1837.201 Hz","2484.178 Hz","3302.678 Hz","4324.738 Hz","5586.175 Hz","7126.771 Hz","8990.486 Hz","11225.681 Hz","13885.311 Hz","17027.137 Hz","20713.945 Hz","25013.752 Hz","30000.000 Hz"],
"outputValueRangeAsStrings":["10.000 Hz","30000.000 Hz"],
"outputValueRangeAsStringsWithLabels":["10.000 Hz","30000.000 Hz"]}


describe('test-plugin-report-utilities', function () {
  describe('guessParamRange', function () {
    it('should handle a very simple case: ["-5.00", "5.00"]', function () {
      const range = guessParamRange(podolskiLfoExample)
      const [min, max] = range
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

    it('should identify discrete fractions as having no range', function () {
      should(guessParamRange(tCompFilterType)).equal(null, 'discrete tComp filter has a range')
    })
  })

  describe('guessParamUnits', function () {
    it('should handle the case when all the units are accurate', function () {
      guessParamUnits(podolskiPercent).should.equal('percent')
    })

    it('should identify labels even when steps are available', function () {
      guessParamUnits(podoLfoPhasePercent).should.equal('percent')
    })

    it('should handle when there is no current label', function () {
      guessParamUnits(negativeDbRange).should.equal('db')
    })

    it('should assume there are no units when outputs have different units', function () {
      should(guessParamUnits(podoDelaySync)).equal(null)
    })

    it('should get hz from #TEqualizer frequency param', function () {
      guessParamUnits(tEqualizerFreq).should.equal('hz')
    })
  })

  describe('guessIsContinuous', function () {
    it('should identify parameters ranges with -Infinity as continuous', function () {
      guessIsContinuous(negativeDbRange).should.be.true()
    })

    it('should identify continuous parameters with low-precision values', function () {
      guessIsContinuous(tCompRatio).should.be.true()
    })

    it('should identify discrete numeric parameters as NOT continuous', function () {
      guessIsContinuous(tCompFilterType).should.be.false()
    })

    it('should identify discrete fractions as non-continuous', function () {
      guessIsContinuous(podoDelaySync).should.be.false()
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

  describe('guessDiscreteChoices', function () {
    it('should identify the 8 filter types in #TCompressor', function () {
      const result = guessDiscreteChoices(tCompFilterType)
      Object.keys(result).length.should.equal(8)
      for (let i = 0; i <= 7; i++) (typeof result[i]).should.equal('number')
    })

    it('should identify binary parameters', function () {
      const result = guessDiscreteChoices(tAuto)
      result.should.deepEqual({ off: 0, on: 1 })
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
