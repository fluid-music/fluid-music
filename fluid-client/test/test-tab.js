const should = require('should');
const mocha = require('mocha');
const tab = require('../src/tab');

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
    ["e4", "a4", "b4", "c#5"],
    ["f4", "g4", "a4", "c5"],
    ["g4", "a4", "b4", "d5"],
  ]
  const rhythm  = '1e+a2e+a3e+a4e+a';
  const pattern = '0-......1-....2.';
  const notes = [60, 64, 67];

  it('should create the correct note objects', () => {
    const result = tab.parseTab(rhythm, pattern, notes);
    result.should.deepEqual([
      { n: 60, s: 0.0,   l: 0.125 },
      { n: 64, s: 0.5,   l: 0.125 },
      { n: 67, s: 0.875, l: 0.0625 },
    ]);
  });

  it('should also work with arrays of notes', ()=>{
    const result = tab.parseTab(rhythm, pattern, chords);
    result.should.deepEqual([
      { n: 64, s: 0.0, l: 0.125 },
      { n: 69, s: 0.0, l: 0.125 },
      { n: 71, s: 0.0, l: 0.125 },
      { n: 73, s: 0.0, l: 0.125 },

      { n: 65, s: 0.5,   l: 0.125 },
      { n: 67, s: 0.5,   l: 0.125 },
      { n: 69, s: 0.5,   l: 0.125 },
      { n: 72, s: 0.5,   l: 0.125 },

      { n: 67, s: 0.875, l: 0.0625 },
      { n: 69, s: 0.875, l: 0.0625 },
      { n: 71, s: 0.875, l: 0.0625 },
      { n: 74, s: 0.875, l: 0.0625 },
    ]);
  });

  it('should throw if the pattern contains a symbol with no corresponding note/chord', () => {
    should(() => {
      padPattern = '0-......1-....9.';
      tab.parseTab(rhythm, padPattern, chords);
    }).throw();
  });

  describe('with vPattern and vLibrary arguments', () => {

    const rhythm   = '1+2+3+4+';
    const pattern  = '0.1.2...';
    const vPattern = '0.1.2...';
    const vLibrary    = [60, 70, 80];
    const noteLibrary = [0, 1, 2];
    const vNotes = tab.parseTab(rhythm, pattern, noteLibrary, vPattern, vLibrary);
    
    it('should output notes with .v values if passed a vPattern and vLibrary', ()=>{
      vNotes.length.should.equal(3);
      vNotes.forEach((note) => should.exist(note.v));
    });
    
    it('should add correct .v values when passed a vPattern and a vLibrary', ()=> {
      vNotes.should.deepEqual([
        { n: 0, s: 0.00, l: 0.125, v: 60 },
        { n: 1, s: 0.25, l: 0.125, v: 70 },
        { n: 2, s: 0.50, l: 0.125, v: 80 },
      ]);
    });
  }); // velocities

});

describe('parse', () => {
  const noteLibrary = [0, 1, 2, 3, 4, 5, 6];
  it('should parse a very simple object', () => {
    const obj = {
      noteLibrary,
      r: '1234',
      p: '.0..',
    };

    tab.parse(obj).should.containDeep([
      { n: 0, s: 0.25, l: 0.25 },
    ]);
  });

  it('should parse arrays sequentially', () => {
    const obj = {
      noteLibrary,
      r: '1234',
      p: [
         '.0..',
         '1...',
      ]
    };
    tab.parse(obj).should.containDeep([
      { n: 0, s: 0.25, l: 0.25 },
      { n: 1, s: 1.00, l: 0.25 },
    ]);
  });

  it('should layer recursive objects', () => {
    const obj = {
      noteLibrary,
      r: '1234',
      p: {
        a: '0...',
        b: '.1..',
      },
    };

    tab.parse(obj).should.containDeep([
      { n: 0, s: 0.00, l: 0.25 },
      { n: 1, s: 0.25, l: 0.25 },
    ]);
  });

  it('should mix and match recursive objects and arrays', () => {
    const obj = {
      noteLibrary,
      r: '1234',
      p: [
        { a: '.0..', b: '.1..' },
        { a: '2...', b: '3...' },
      ],
      b: '...4',
    };

    tab.parse(obj).should.containDeep([
      { n: 0, s: 0.25, l: 0.25 },
      { n: 1, s: 0.25, l: 0.25 },
      { n: 2, s: 1.00, l: 0.25 },
      { n: 3, s: 1.00, l: 0.25 },
      { n: 4, s: 0.75, l: 0.25 },
    ]);
  });

  it('should be able to update rhythm for nested objects', () => {
    const obj = {
      noteLibrary,
      r: '1234',
      p: [
        { a: '0.', b: '.1', r: 'hh' },
        { a: '2...', b: '3...', noteLibrary: {'2': 20, '3': 30 } },
        { a: '4...'}
      ],
      b: '...5',
    };

    tab.parse(obj).should.containDeep([
      { n: 0, s: 0.00, l: 0.50 },
      { n: 1, s: 0.50, l: 0.50 },
      { n: 20, s: 1.0, l: 0.25 },
      { n: 30, s: 1.0, l: 0.25 },
      { n: 4, s: 2.00, l: 0.25 },
      { n: 5, s: 0.75, l: 0.25 },
    ]);
  });

  it('should handle nested arrays', () => {
    const obj = {
      noteLibrary,
      r: '12',
      p: [
        [{p: '0.'}, { p: '1.'}],
        [{p: '2.'}, { p: '3.'}],
        [{p: '4.'}, { p: '56'}],
      ],
    };

    const result = tab.parse(obj);
    result.should.containDeep([
      { n: 0, s: 0.0, l: 0.25 },
      { n: 1, s: 0.5, l: 0.25 },
    ]);
    result.should.containDeep([
      { n: 2, s: 1.0, l: 0.25 },
      { n: 3, s: 1.5, l: 0.25 },
    ]);
    result.should.containDeep([
      { n: 4, s: 2.0, l: 0.25 },
      { n: 5, s: 2.5, l: 0.25 },
      { n: 6, s: 2.75, l: 0.25 },
    ]);
  });

  it('should handle arrays of strings', () => {
    const obj = {
      noteLibrary,
      r: '12',
      p: ['01', '23']
    };
    tab.parse(obj).should.containDeep([
      { n: 0, s: 0.00, l: 0.25 },
      { n: 1, s: 0.25, l: 0.25 },
      { n: 2, s: 0.50, l: 0.25 },
      { n: 3, s: 0.75, l: 0.25 },
    ]);
  });

  it('Nested children should use the longest child', () => {
    const obj = {
      noteLibrary,
      r:'w',
      p: [
        { a1: {r: 'w', p: '0'}, a2: {r:'h', p:'1'} },
        '2' // Should start after the longest pattern in the previous element
      ]
    };
    tab.parse(obj).should.containDeep([
      { n: 0, s: 0.00, l: 1.0 },
      { n: 1, s: 0.00, l: 0.5 },
      { n: 2, s: 1.00, l: 1.0 },
    ]);
  });

  describe('with vPattern and vLibrary arguments', () => {
    const noteLibrary = [0, 1, 2, 3, 4, 5, 6];
    const vLibrary    = [60, 70, 80, 90, 100, 110];
    it('should parse a very simple object', () => {
      const obj = {
        noteLibrary,
        vLibrary,
        v: '.0..',
        r: '1234',
        p: '.0..',
      };
  
      tab.parse(obj).should.containDeep([
        { n: 0, s: 0.25, l: 0.25, v: 60},
      ]);
    });
   
    it('should parse arrays sequentially and work when velocities are not all given', () => {
      const obj = {
        noteLibrary,
        r: '1234',
        vLibrary,
        p: [
           {p: '.0..', v:'.0..'},
           '1...',
        ]
      };
      tab.parse(obj).should.containDeep([
        { n: 0, s: 0.25, l: 0.25, v: 60 },
        { n: 1, s: 1.00, l: 0.25 },
      ]);
    });
  
    it('should layer recursive objects', () => {
      const obj = {
        noteLibrary,
        vLibrary,
        r: '1234',
        p: {
          a: '0...',
          b: '.1..',
          v: '01..'
        },
      };
  
      tab.parse(obj).should.containDeep([
        { n: 0, s: 0.00, l: 0.25, v: 60 },
        { n: 1, s: 0.25, l: 0.25, v: 70 },
      ]);
    });
  
    it('should mix and match recursive objects and arrays', () => {
      const obj = {
        noteLibrary,
        vLibrary,
        r: '1234',
        p: [
          { a: '.0..', b: '.1..', v: '.1..' },
          { a: '2...', b: '3...', v: '0...' },
        ],
        b: '...4',
      };
  
      tab.parse(obj).should.containDeep([
        { n: 0, s: 0.25, l: 0.25, v: 70 },
        { n: 1, s: 0.25, l: 0.25, v: 70 },
        { n: 2, s: 1.00, l: 0.25, v: 60 },
        { n: 3, s: 1.00, l: 0.25, v: 60 },
        { n: 4, s: 0.75, l: 0.25 },
      ]);
    });
    
    it('should be able to update rhythm for nested objects', () => {
      const obj = {
        noteLibrary,
        vLibrary,
        r: '1234',
        p: [
          { a: '0.', b: '.1', r: 'hh', v: '01'},
          { a: '2...', b: '3...', v:'0...', vLibrary:[120], noteLibrary: {'2': 20, '3': 30 } },
          { a: '4...', v: '0...'}
        ],
        b: '...5',
      };
  
      tab.parse(obj).should.containDeep([
        { n: 0, s: 0.00, l: 0.50, v: 60 },
        { n: 1, s: 0.50, l: 0.50, v: 70 },
        { n: 20, s: 1.0, l: 0.25, v: 120 },
        { n: 30, s: 1.0, l: 0.25, v: 120 },
        { n: 4, s: 2.00, l: 0.25, v: 60 },
        { n: 5, s: 0.75, l: 0.25 },
      ]);
    });
  
    it('should handle nested arrays', () => {
      const obj = {
        noteLibrary,
        vLibrary,
        r: '12',
        p: [
          [{p: '0.', v: '0.'}, { p: '1.', v: '1.'}],
          [{p: '2.', v: '2.'}, { p: '3.', v: '3.'}],
          [{p: '4.', v: '4.'}, { p: '56', v: '55'}],
        ],
      };
  
      const result = tab.parse(obj);
      result.should.containDeep([
        { n: 0, s: 0.0, l: 0.25, v: 60 },
        { n: 1, s: 0.5, l: 0.25, v: 70 },
      ]);
      result.should.containDeep([
        { n: 2, s: 1.0, l: 0.25, v: 80 },
        { n: 3, s: 1.5, l: 0.25, v: 90 },
      ]);
      result.should.containDeep([
        { n: 4, s: 2.0, l: 0.25, v: 100 },
        { n: 5, s: 2.5, l: 0.25, v: 110 },
        { n: 6, s: 2.75, l: 0.25, v: 110 },
      ]);
    });
  
    it('should handle arrays of strings and velocities', () => {
      const obj = {
        noteLibrary,
        vLibrary,
        r: '12',
        p: ['01', {p:'23', v: '01'}]
      };
      tab.parse(obj).should.containDeep([
        { n: 0, s: 0.00, l: 0.25 },
        { n: 1, s: 0.25, l: 0.25 },
        { n: 2, s: 0.50, l: 0.25, v: 60 },
        { n: 3, s: 0.75, l: 0.25, v: 70 },
      ]);
    });
    
  });
  
});
