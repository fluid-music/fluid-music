const should = require('should');
const mocha = require('mocha');

const tools = require('../code-generators/tools');

describe('camelCaseFromParamName', () => {
  const correctExamples = {
    'Wet Level': 'wetLevel',
  
    // don't mangle acronyms (LFO into lFO)
    'LFO': 'LFO', 
    'LFO1': 'LFO1', 
    'AnLFO': 'anLFO',
    'An LFO': 'anLFO',
    'OSC1Pan': 'OSC1Pan',
    'A OSC1Pan': 'aOSC1Pan',
    'a OSC1Pan': 'aOSC1Pan',
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
    'main: Active #LFOG2': 'mainActiveLFOG2',
    'PCore: X1': 'pCoreX1',
    'OSC2: Pan': 'OSC2Pan',
    'LFOG: Phase': 'LFOGPhase',
    'LFOG2: Sync': 'LFOG2Sync',
  
    // examples from Dexed
    'OP1 OUTPUT LEVEL': 'op1OutputLevel',
    'OP1 MODE': 'op1Mode',
    'LFO DELAY': 'LFODelay',
    'lfo DELAY': 'lfoDelay', // comparison
  };

  it('should convert names according to test examples', () => {
    for (let [paramName, camelCaseName] of Object.entries(correctExamples)) {
      tools.camelCaseFromParamName(paramName).should.equal(camelCaseName);
    }
  });
});

describe('starsWithUpperAcronym', () => {
  const answers = {
    'VCA': true,
    'OSC': true,
    'LFO': true,
    'EQ':  true,
    'ENV': true,
    'VCA_blabla': true,
    'OSC_blabla': true,
    'LFO_blabla': true,
    'EQ_blabla':  true,
    'ENV_blabla': true,
    'NOVCA': false,
    'NOOSC': false,
    'NOLFO': false,
    'NOEQ':  false,
    'NOENV': false,
  };

  it('should idenfity if input starts with a common upper-case audio acronym', () => {
    for (let [str, bool] of Object.entries(answers)) {
      tools.startsWithUpperAcronym(str).should.equal(bool);
    };
  });
});
