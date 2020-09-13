const should = require('should');
const mocha = require('mocha');
const tab = require('../src/tab');
const converters = require('../built/converters');

const q = 1/4;  // quarter note
const e = 1/8;  // eighth note
const s = 1/16; // sixteenth note
const h = 1/2;  // half note

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
      r: 'h h ',
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

  describe('Sequences with quarters vs. halves', () => {
    const quarterPlus = '12e+a';
    it(`should interpret '${quarterPlus} as a quarter and four 16th notes`, () => {
      tab.rhythmToAdvanceArray(quarterPlus).should.deepEqual([q,s,s,s,s]);
    });
    const halfPlus = 'h3e+a';
    it(`should interpret '${halfPlus} as a half and four 16th notes`, () => {
      tab.rhythmToAdvanceArray(halfPlus).should.deepEqual([h,s,s,s,s]);
    });
    const half34 = 'h34';
    it(`should interpret '${half34} as a half and two quarters`, () => {
      tab.rhythmToAdvanceArray(half34).should.deepEqual([h,q,q]);
    });
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

describe('tab.parseTab', () => {

  const chords = [
    [64, 69, 71, 73],
    [65, 67, 69, 72],
    [67, 69, 71, 74],
  ].map(a => a.map(converters.numberToMidiNote));
  const rhythm  = '1e+a2e+a3e+a4e+a';
  const pattern = '0-......1-....2.';
  const notes = [60, 64, 67].map(converters.numberToMidiNote);

  it('should create the correct note objects', () => {
    const result = tab.parseTab(rhythm, pattern, notes);
    result.events.should.deepEqual([
      { type: 'midiNote', n: 60, startTime: 0.0,   duration: 0.125 },
      { type: 'midiNote', n: 64, startTime: 0.5,   duration: 0.125 },
      { type: 'midiNote', n: 67, startTime: 0.875, duration: 0.0625 },
    ]);
  });

  it('should throw if the pattern string is longer than the rhythm string', () => {
    should(() => {
      tab.parseTab('12', '123', chords);
    }).throw();
  });

  it('should throw if the pattern contains a symbol with no corresponding note/chord', () => {
    should(() => {
      padPattern = '0-......1-....9.';
      tab.parseTab(rhythm, padPattern, chords);
    }).throw();
  });

}); // describe tab.parseTab

describe('tab.createDynamicGetter', () => {
  const a        = {a: 'a'};
  const b        = {b: 'b'};
  const dPattern = 'a b ';
  const dLibrary = {a, b, n: null, u: undefined};

  it('should work', () => {
    const result = tab.createDynamicGetter('1234', dPattern, dLibrary);
    const expectedA = { a: 'a', startTime: 0, duration: 0.25};
    const expectedB = { b: 'b', startTime: 0.5, duration: 0.25};
    result(0).should.deepEqual(expectedA);
    result(0.25).should.deepEqual(expectedA);
    result(0.45).should.deepEqual(expectedA);
    result(0.50).should.deepEqual(expectedB);
  });

  it ('should get the most recent dynamic', () => {
    // (even when the time is longer than the length of the dPattern)
    const getDynamic = tab.createDynamicGetter('1234', 'ab', dLibrary);
    const expected = { b: 'b', startTime: 0.25, duration: 0.25 };
    getDynamic(8).should.deepEqual(expected);
  })
});
