const should = require('should');
const mocha = require('mocha');
const tab = require('../src/tab');

describe('parseScore', () => {
  const noteLibrary = [0, 1, 2, 3, 4, 5, 6];
  it('should parse a very simple object', () => {
    const obj = {
      noteLibrary,
      r: '1234',
      p: '.0..',
    };

    tab.parseScore(obj).should.containDeep({
      p: {
        clips: [[{ n: 0, s: 0.25, l: 0.25 }]]
      },
    });
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
    tab.parseScore(obj).should.containDeep({
      p: {
        clips: [
          [{ n: 0, s: 0.25, l: 0.25 }],
          [{ n: 1, s: 0.00, l: 0.25 }],
        ]
      },
    });
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

    const a = {
      clips: [
        [{ n: 0, s: 0.00, l: 0.25 }]
      ],
    };
    a.clips[0].duration.should.equal(1);


    const b = {
      clips: [
        [{ n: 1, s: 0.25, l: 0.25}]
      ],
    }

    const result = tab.parseScore(obj);
    result.should.containDeep({
      p: { a, b }
    });
    result.p.a.clips[0].duration.should.equal(1);
  });

});
