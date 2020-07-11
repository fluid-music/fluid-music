const should = require('should');
const mocha = require('mocha');
const tab = require('../src/tab');
const eventTypes = require('../src/event-types');

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

describe('tab.parseTab', () => {

  const chords = [
    [64, 69, 71, 73],
    [65, 67, 69, 72],
    [67, 69, 71, 74],
  ];
  const rhythm  = '1e+a2e+a3e+a4e+a';
  const pattern = '0-......1-....2.';
  const notes = [60, 64, 67];

  it('should create the correct note objects', () => {
    const result = tab.parseTab(rhythm, pattern, notes);
    result.notes.should.deepEqual([
      { n: 60, s: 0.0,   l: 0.125 },
      { n: 64, s: 0.5,   l: 0.125 },
      { n: 67, s: 0.875, l: 0.0625 },
    ]);
  });

  it('should parse arrays in the NoteLibrary as chords', ()=>{
    const result = tab.parseTab(rhythm, pattern, chords);
    result.notes.should.deepEqual([
      { n: 64, s: 0.0, l: 0.125 },
      { n: 69, s: 0.0, l: 0.125 },
      { n: 71, s: 0.0, l: 0.125 },
      { n: 73, s: 0.0, l: 0.125 },

      { n: 65, s: 0.5, l: 0.125 },
      { n: 67, s: 0.5, l: 0.125 },
      { n: 69, s: 0.5, l: 0.125 },
      { n: 72, s: 0.5, l: 0.125 },

      { n: 67, s: 0.875, l: 0.0625 },
      { n: 69, s: 0.875, l: 0.0625 },
      { n: 71, s: 0.875, l: 0.0625 },
      { n: 74, s: 0.875, l: 0.0625 },
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

  describe('with dPattern and dLibrary arguments', () => {

    const rhythm   = '1+2+3+4+';
    const pattern  = '0.1.2...';
    const dPattern = '0.1.2...';
    const dLibrary = [60, 70, 80];
    const nLibrary = [0, 1, 2];
    const clip = tab.parseTab(rhythm, pattern, nLibrary, dPattern, dLibrary);


    it('should output notes with .d values if passed a dPattern and dLibrary', ()=>{
      clip.notes.length.should.equal(3);
      clip.notes.forEach((note) => should.exist(note.d));
    });

    it('should add correct .v values when passed a dPattern and a dLibrary', ()=> {
      clip.notes.should.deepEqual([
        { n: 0, s: 0.00, l: 0.125, v: 60, d: { v: 60 } },
        { n: 1, s: 0.25, l: 0.125, v: 70, d: { v: 70 } },
        { n: 2, s: 0.50, l: 0.125, v: 80, d: { v: 80 } },
      ]);
    });

    const dynamicsObject = { v: 70, dbfs: 1 };
    const clipWithDynamics = tab.parseTab(rhythm, pattern, nLibrary, dPattern,
      [60, dynamicsObject, 80]);

    it('should put dynamicsObjects into the .d field of the note object', () => {
      clipWithDynamics.notes[1].d.should.deepEqual(dynamicsObject);
    });

    it('should add .v to the noteObject when the dynamics obj has a .v number', () => {
      clipWithDynamics.notes[1].should.deepEqual(
        { n: 1, s: 0.25, l: 0.125, v: 70, d: dynamicsObject }
      );
      clipWithDynamics.notes[1].v.should.equal(70);
    });

  }); // describe velocities (dPattern/dLibrary)

  describe('note objects', () => {
    const rhythm      = '1+2+3+4+';
    const pattern     = '0.1.2...';
    const noteObject0 = { arbitrary: 0 };
    const noteObject1 = { arbitrary: 1 };
    const noteObject2 = { arbitrary: 2 };
    const nLibrary = {
      0: noteObject0,
      1: noteObject1,
      2: noteObject2,
    };

    const clip = tab.parseTab(rhythm, pattern, nLibrary);
    it('should set the .e property for objects in the nLibrary', () => {
      clip.notes.should.deepEqual([
        { n: noteObject0, s: 0.00, l: 0.125 },
        { n: noteObject1, s: 0.25, l: 0.125 },
        { n: noteObject2, s: 0.50, l: 0.125 },
      ]);
    });

  }); // describe note objects

}); // describe tab.parseTab
