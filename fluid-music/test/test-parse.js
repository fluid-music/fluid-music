const should = require('should');
const mocha = require('mocha');
const tab = require('../src/tab');


describe('tab.parse', () => {
  const nLibrary = [0, 1, 2, 3, 4, 5, 6];
  it('should parse a very simple object', () => {
    const obj = {
      nLibrary,
      r: '1234',
      p: '.0..',
    };

    tab.parse(obj).events.should.containDeep([
      { n: 0, s: 0.25, l: 0.25 },
    ]);
  });

  it('should parse arrays sequentially', () => {
    const obj = {
      nLibrary,
      r: '1234',
      p: [
          '.0..',
          '1...',
      ]
    };
    tab.parse(obj).events.should.containDeep([
      { n: 0, s: 0.25, l: 0.25 },
      { n: 1, s: 1.00, l: 0.25 },
    ]);
  });

  it('should layer recursive objects', () => {
    const obj = {
      nLibrary,
      r: '1234',
      p: {
        a: '0...',
        b: '.1..',
      },
    };

    tab.parse(obj).events.should.containDeep([
      { n: 0, s: 0.00, l: 0.25 },
      { n: 1, s: 0.25, l: 0.25 },
    ]);
  });

  it('should mix and match recursive objects and arrays', () => {
    const obj = {
      nLibrary,
      r: '1234',
      p: [
        { a: '.0..', b: '.1..' },
        { a: '2...', b: '3...' },
      ],
      b: '...4',
    };

    tab.parse(obj).events.should.containDeep([
      { n: 0, s: 0.25, l: 0.25 },
      { n: 1, s: 0.25, l: 0.25 },
      { n: 2, s: 1.00, l: 0.25 },
      { n: 3, s: 1.00, l: 0.25 },
      { n: 4, s: 0.75, l: 0.25 },
    ]);
  });

  it('should be able to update rhythm for nested objects', () => {
    const obj = {
      nLibrary,
      r: '1234',
      p: [
        { a: '0.', b: '.1', r: 'hh' },
        { a: '2...', b: '3...', nLibrary: {'2': 20, '3': 30 } },
        { a: '4...'}
      ],
      b: '...5',
    };

    tab.parse(obj).events.should.containDeep([
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
      nLibrary,
      r: '12',
      p: [
        [{p: '0.'}, { p: '1.'}],
        [{p: '2.'}, { p: '3.'}],
        [{p: '4.'}, { p: '56'}],
      ],
    };

    const result = tab.parse(obj);
    result.events.should.containDeep([
      { n: 0, s: 0.0, l: 0.25 },
      { n: 1, s: 0.5, l: 0.25 },
    ]);
    result.events.should.containDeep([
      { n: 2, s: 1.0, l: 0.25 },
      { n: 3, s: 1.5, l: 0.25 },
    ]);
    result.events.should.containDeep([
      { n: 4, s: 2.0, l: 0.25 },
      { n: 5, s: 2.5, l: 0.25 },
      { n: 6, s: 2.75, l: 0.25 },
    ]);
  });

  it('should handle arrays of strings', () => {
    const obj = {
      nLibrary,
      r: '12',
      p: ['01', '23']
    };
    tab.parse(obj).events.should.containDeep([
      { n: 0, s: 0.00, l: 0.25 },
      { n: 1, s: 0.25, l: 0.25 },
      { n: 2, s: 0.50, l: 0.25 },
      { n: 3, s: 0.75, l: 0.25 },
    ]);
  });

  it('Nested children should use the longest child', () => {
    const obj = {
      nLibrary,
      r:'w',
      p: [
        { a1: {r: 'w', p: '0'}, a2: {r:'h', p:'1'} },
        '2' // Should start after the longest pattern in the previous element
      ]
    };
    tab.parse(obj).events.should.containDeep([
      { n: 0, s: 0.00, l: 1.0 },
      { n: 1, s: 0.00, l: 0.5 },
      { n: 2, s: 1.00, l: 1.0 },
    ]);
  });

  describe('with dPattern and dLibrary arguments', () => {
    const nLibrary = [0, 1, 2, 3, 4, 5, 6];
    const dLibrary    = [60, 70, 80, 90, 100, 110];
    it('should parse a very simple object', () => {
      const obj = {
        nLibrary,
        dLibrary,
        d: '.0..',
        r: '1234',
        p: '.0..',
      };

      tab.parse(obj).events.should.containDeep([
        { n: 0, s: 0.25, l: 0.25, d: 60},
      ]);
    });

    it('should parse arrays sequentially and work when velocities are not all given', () => {
      const obj = {
        nLibrary,
        r: '1234',
        dLibrary,
        p: [
            {p: '.0..', d:'.0..'},
            '1...',
        ]
      };
      tab.parse(obj).events.should.containDeep([
        { n: 0, s: 0.25, l: 0.25, d: 60 },
        { n: 1, s: 1.00, l: 0.25 },
      ]);
    });

    it('should layer recursive objects', () => {
      const obj = {
        nLibrary,
        dLibrary,
        r: '1234',
        p: {
          a: '0...',
          b: '.1..',
          d: '01..'
        },
      };

      tab.parse(obj).events.should.containDeep([
        { n: 0, s: 0.00, l: 0.25, d: 60 },
        { n: 1, s: 0.25, l: 0.25, d: 70 },
      ]);
    });

    it('should mix and match recursive objects and arrays', () => {
      const obj = {
        nLibrary,
        dLibrary,
        r: '1234',
        p: [
          { a: '.0..', b: '.1..', d: '.1..' },
          { a: '2...', b: '3...', d: '0...' },
        ],
        b: '...4',
      };

      tab.parse(obj).events.should.containDeep([
        { n: 0, s: 0.25, l: 0.25, d: 70 },
        { n: 1, s: 0.25, l: 0.25, d: 70 },
        { n: 2, s: 1.00, l: 0.25, d: 60 },
        { n: 3, s: 1.00, l: 0.25, d: 60 },
        { n: 4, s: 0.75, l: 0.25 },
      ]);
    });

    it('should be able to update rhythm for nested objects', () => {
      const obj = {
        nLibrary,
        dLibrary,
        r: '1234',
        p: [
          { a: '0.', b: '.1', r: 'hh', d: '01'},
          { a: '2...', b: '3...', d:'0...', dLibrary:[120], nLibrary: {'2': 20, '3': 30 } },
          { a: '4...', d: '0...'}
        ],
        b: '...5',
      };

      const result = tab.parse(obj);
      
      result.events.should.containDeep([
        { n: 0, s: 0.00, l: 0.50, d: 60 },
        { n: 1, s: 0.50, l: 0.50, d: 70 },
        { n: 20, s: 1.0, l: 0.25, d: 120 },
        { n: 30, s: 1.0, l: 0.25, d: 120 },
        { n: 4, s: 2.00, l: 0.25, d: 60 },
        { n: 5, s: 0.75, l: 0.25 },
      ]);
    });

    it('should handle nested arrays', () => {
      const obj = {
        nLibrary,
        dLibrary,
        r: '12',
        p: [
          [{p: '0.', d: '0.'}, { p: '1.', d: '1.'}],
          [{p: '2.', d: '2.'}, { p: '3.', d: '3.'}],
          [{p: '4.', d: '4.'}, { p: '56', d: '55'}],
        ],
      };

      const result = tab.parse(obj);
      result.events.should.containDeep([
        { n: 0, s: 0.0, l: 0.25, d: 60 },
        { n: 1, s: 0.5, l: 0.25, d: 70 },
      ]);
      result.events.should.containDeep([
        { n: 2, s: 1.0, l: 0.25, d: 80 },
        { n: 3, s: 1.5, l: 0.25, d: 90 },
      ]);
      result.events.should.containDeep([
        { n: 4, s: 2.0,  l: 0.25, d: 100 },
        { n: 5, s: 2.5,  l: 0.25, d: 110 },
        { n: 6, s: 2.75, l: 0.25, d: 110 },
      ]);
    });

    it('should handle arrays of strings and velocities', () => {
      const obj = {
        nLibrary,
        dLibrary,
        r: '12',
        p: ['01', {p:'23', d: '01'}]
      };
      tab.parse(obj).events.should.containDeep([
        { n: 0, s: 0.00, l: 0.25 },
        { n: 1, s: 0.25, l: 0.25 },
        { n: 2, s: 0.50, l: 0.25, d: 60 },
        { n: 3, s: 0.75, l: 0.25, d: 70 },
      ]);
    });

  });

  describe('mismatched lengths between patterns and rhythms', () => {
    describe('pattern string is shorter than the rhythm string', () => {
      it('should use the length from the pattern string', () => {
        const obj = {
          nLibrary,
          r: '1234',
          p: ['01', '23'],
        };
        const result = tab.parse(obj);
        result.events.should.containDeep([
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
          nLibrary,
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
