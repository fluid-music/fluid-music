const should = require('should');
const mocha = require('mocha');

const { camelCaseFromParamName } = require('../built/plugin-generator-name-helpers')

describe('camelCaseFromParamName', () => {
  const correctExamples = {
    'Wet Level': 'wetLevel',

    // don't mangle acronyms (LFO into lFO)
    'LFO': 'lfo',
    'LFO1': 'lfo1',
    'AnLFO': 'anLFO',
    'An LFO': 'anLfo',
    'OSC1Pan': 'osc1pan',
    'A OSC1Pan': 'aOsc1pan',
    'a OSC1Pan': 'aOsc1pan',
    'a Osc1Pan': 'aOsc1Pan',

    // weird, but acceptable
    'a b c': 'aBC',
    'A': 'a',
    'AB': 'ab',
    'ABC': 'abc',
    'AB CD': 'abCd',
    'ab cd': 'abCd',
    'ab': 'ab',
    'E1n': 'e1n',
    'E1N': 'e1n',

    // examples from helm
    'amp_attack': 'ampAttack',
    'amp_decay': 'ampDecay',
    'mono_lfo_1_frequency': 'monoLfo1Frequency',

    // examples from zebra2 vst2
    'main: Active #LFOG2': 'mainActiveLfog2',
    'PCore: X1': 'pcoreX1',
    'pCore: X1': 'pcoreX1', // comparison
    'OSC2: Pan': 'osc2Pan',
    'LFOG: Phase': 'lfogPhase',
    'LFOG2: Sync': 'lfog2Sync',

    // examples from Dexed
    'OP1 OUTPUT LEVEL': 'op1OutputLevel',
    'OP1 MODE': 'op1Mode',
    'LFO DELAY': 'lfoDelay',
    'lfo DELAY': 'lfoDelay', // comparison

    //TCompressor has two threshold parameters. The second shows up like this:
    'Threshold (2)': 'threshold2'
  };

  it('should convert names according to test examples', () => {
    for (let [paramName, camelCaseName] of Object.entries(correctExamples)) {
      let result = camelCaseFromParamName(paramName);
      result.should.equal(camelCaseName,
        `For "${paramName}": got "${result}" wanted "${camelCaseName}"`);
    }
  });
});
