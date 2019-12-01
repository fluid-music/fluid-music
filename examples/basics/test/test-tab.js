const should = require('should');
const mocha = require('mocha');

const tab = require('../src/tab');

describe('tab.rhythmToAdvanceArray', () => {
  const s = 1/16; // sixteenth note
  const e = 1/8;  // eighth note
  const q = 1/4;  // quarter note

  const eighthRhythm = '1+2+'; 
  const eighthAdvances = [e,e,e];
  it(`should handle ${eighthRhythm}`, () => {
    tab.rhythmToAdvanceArray(eighthRhythm).should.deepEqual(eighthAdvances);
  });

  it('should output zeros for spaces', () => {
    tab.rhythmToAdvanceArray('1 + ') .should.deepEqual([0.125, 0, 0.125]);
    tab.rhythmToAdvanceArray('1 + 2').should.deepEqual([0.125, 0, 0.125, 0]);

    // This next one is a bad practice, but it illustrates expected behavior
    tab.rhythmToAdvanceArray('1 + 2 ').should.deepEqual([e, 0, e, 0, q]);
    //                                                   1  _  +  _  2
  });

  const sixteenthsRhythm = '1e+a2e+a';
  const sixteenthsAdvances = new Array(7).fill(s);
  it(`should handle ${sixteenthsRhythm}`, () => {
    tab.rhythmToAdvanceArray(sixteenthsRhythm).should.deepEqual(sixteenthsAdvances);
  });

  const mixedRhythm = '1e+a2+'
  it(`should handle ${mixedRhythm}`, () => {

    tab.rhythmToAdvanceArray(mixedRhythm).should.deepEqual([s,s,s,s,e]);
  });
});

describe('tab.rhythmToElapsedArray', () => {
  return;
  let rhythm   = '1e+a2e+a'
  const desired1 = rhythm.split('').map((letter, i) => i * 1/16);
  const desired2 = [0, 0.0625, 0.125, 0.1875, 0.25, 0.3125, 0.375, .4375];

  it('manual calculations should match generated', () => {
    desired1.should.deepEqual(desired2);
  });

  it(`should handle ${rhythm}`, () => {
    tab.rhythmToElapsedArray(rhythm).should.deepEqual(desired1);
  });

  it('should handle 1+2+', () => {
    tab.rhythmToElapsedArray('1+2+').should.deepEqual([0, 0.125, 0.25, 0.375]);
  });
});