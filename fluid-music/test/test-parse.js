const should = require('should');
const mocha = require('mocha');
const tab = require('../src/tab');


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

  describe('mismatched lengths between patterns and rhythms', () => {
    describe('pattern string is shorter than the rhythm string', () => {
      it('should use the length from the pattern string', () => {
        const obj = {
          noteLibrary,
          r: '1234',
          p: ['01', '23'],
        };
        const result = tab.parse(obj);
        result.should.containDeep([
          { n: 0, s: 0.00, l: 0.25 },
          { n: 1, s: 0.25, l: 0.25 },
          { n: 2, s: 1.00, l: 0.25 },
          { n: 3, s: 1.25, l: 0.25 },
        ]);
      });
    });

    describe('rhythm string is shorter than the pattern string', () => {
      it('should throw', () => {
        const obj = {
          noteLibrary,
          r: '12',
          p: '1234',
        };
        should(() => {
          const result = tab.parse(obj);
        }).throw();
  
      })
    });
  });
});
  