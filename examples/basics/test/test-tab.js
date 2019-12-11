const should = require('should');
const mocha = require('mocha');
const tab = require('../src/tab');

const q = 1/4;  // quarter note
const e = 1/8;  // eighth note
const s = 1/16; // sixteenth note

describe('tab.parseRhythm', () => {
  it(`should parse '1 2 ' as four eighth notes`, () => {
    tab.parseRhythm('1 2 ').totals.should.deepEqual([1/8,2/8,3/8,4/8]);
  });
  it(`should parse '1   2 ' as four sixteenth and two eighths`, () => {
    tab.parseRhythm('1   2 ').totals.should.deepEqual([s,s*2,s*3,s*4,3/8,4/8]);
  });
  it(`should parse '1234' as four quarter notes`, () => {
    tab.parseRhythm('1234').totals.should.deepEqual([1/4,2/4,3/4,1]);
  });
  it(`should parse '1..2..' as triplets`, () => {
    const t = 1/4/3; // eighth note triplets
    tab.parseRhythm('1..2..').totals.should.deepEqual([1*t,2*t,3*t,4*t,5*t,6*t]);
  });
  it('should return an object with .deltas and .totals members', () => {
    const rObj = tab.parseRhythm('h h ');
    rObj.should.deepEqual({
      deltas: [.25, .25, .25, .25],
      totals: [.25, .50, .75, 1.0],
    });
  });
});

describe('tab.rhythmToAdvanceArray', () => {
  const eighthRhythm = '1+2+';
  it(`should interpret '${eighthRhythm}' as four eighth notes`, () => {
    tab.rhythmToAdvanceArray(eighthRhythm).should.deepEqual([e,e,e,e]);
  });

  it('should output zeros for spaces', () => {
    tab.rhythmToAdvanceArray('1 + ') .should.deepEqual([e, 0, e, 0]);
    tab.rhythmToAdvanceArray('1 + 2').should.deepEqual([e, 0, e, 0, q]);
  });

  const eighthsAndQuarter = '1 + 2 ';
  it(`should interpret '${eighthsAndQuarter}' as two two eighths and a quarter'`, () => {
    tab.rhythmToAdvanceArray(eighthsAndQuarter).should.deepEqual([e, 0, e, 0, q, 0]);
  });

  const sixteenthsRhythm = '1e+a2e+a';
  it(`should interpret '${sixteenthsRhythm}' as sixteenths`, () => {
    tab.rhythmToAdvanceArray(sixteenthsRhythm).should.deepEqual(new Array(8).fill(s));
  });

  const mixedRhythm = '1e+a2+'
  it(`should interpret '${mixedRhythm}' as four sixteenths and two quarters`, () => {
    tab.rhythmToAdvanceArray(mixedRhythm).should.deepEqual([s,s,s,s,e,e]);
  });
});

describe('tab.rhythmToElapsedArray', () => {
  let rhythm     = '1e+a2e+a';
  const desired1 = rhythm.split('').map((letter, i) => (i+1) * 1/16);
  const desired2 = [0.0625, 0.125, 0.1875, 0.25, 0.3125, 0.375, .4375, 0.5];

  it('manual calculations should match generated', () => {
    desired1.should.deepEqual(desired2);
  });

  it(`should handle ${rhythm}`, () => {
    tab.rhythmToElapsedArray(rhythm).should.deepEqual(desired1);
  });

  it('should handle 1+2+', () => {
    tab.rhythmToElapsedArray('1+2+').should.deepEqual([0.125, 0.25, 0.375, 0.5]);
  });
});

describe('tab.advanceArrayToSegments', () => {
  it('should split input into arrays based on position of zeros', () => {
    tab.advanceArrayToSegments([1,0,0,0,1,0]).should.deepEqual([[1,0,0,0],[1,0]]);
    tab.advanceArrayToSegments([.1,0,.2,0]).should.deepEqual([[.1,0],[.2,0]]);
  });
});

describe('tab.patternToSymbolsAndCounts', () => {
  it("should work on the example in the function's jsdoc comment", () => {
    const input = 'a-1-bb...';
    const output = [['a',2], ['1',2], ['b',1], ['b', 1], ['.', 3]];
    tab.patternToSymbolsAndCounts(input).should.deepEqual(output);
  });
  it('should work with "." and " " characters', () => {
    let patternDots   = '0-......a-....22'
    let patternSpaces = '0-      a-    22'
    let counts        = [2,6,    2,4,  1,1]
    let symbols       = '0.a.22'
    counts = symbols.split('').map((t, i) => [t, counts[i]]);

    tab.patternToSymbolsAndCounts(patternDots).should.deepEqual(counts);
    tab.patternToSymbolsAndCounts(patternSpaces).should.deepEqual(counts);

    patternDots   = '..0-......a-....22'
    patternSpaces = '  0-      a-    22'
    counts        = [2,2,6,    2,4,  1,1]
    symbols       = '.0.a.22'
    counts = symbols.split('').map((t, i) => [t, counts[i]]);
    tab.patternToSymbolsAndCounts(patternDots).should.deepEqual(counts);
    tab.patternToSymbolsAndCounts(patternSpaces).should.deepEqual(counts);
  });
  it('should throw when the pattern begins with a -', () => {
    should(() => tab.patternToSymbolsAndCounts('-a...')).throw();
  });
  it('should throw if a - follows a .', () => {
    should(() => tab.patternToSymbolsAndCounts('1.-')).throw();
  });
});