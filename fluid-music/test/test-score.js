const R = require('ramda');
const should = require('should');
const mocha = require('mocha');
const score = require('../src/score');
const audiotrack = require('../src/fluid/audiotrack');

describe('score', () => {
  const nLibrary = [0, 1, 2, 3, 4, 5, 6];
  const r = '1234'

  describe('score.parse', () => {
    const p1 = '.0..'
    const clip1 = {
      notes: [{ n: 0, s: 0.25, l: 0.25 }],
      startTime: 0,
      duration: 1,
    };

    const p2 = '01..';
    const clip2 = {
      notes: [{ n: 0, s: 0, l: 0.25 }, { n:1, s: 0.25, l: 0.25 }],
      duration: 1,
    };

    const obj = {
      p1,
      nLibrary: [0, 1, 2, 3, 4, 5, 6],
      r: '1234',
    };

    it('should parse a very simple object', () => {
      score.parse(obj).should.containDeep({
        tracks: {
          p1: {
            clips: [clip1],
          },
        },
      });
    });


    describe('score.parse on arrays', () => {
      it('should handle arrays', () => {
        const s1 = { nLibrary, r, drums: [
          '.0..',
          '.1..',
        ]};
        const result = score.parse(s1);

        const clip1 = {
          notes: [{s: 0.25, l: 0.25, n: 0}],
          duration: 1,
          startTime: 0,
        };

        const clip2 = {
          notes: [{s: 0.25, l: 0.25, n: 1}],
          duration: 1,
          startTime: 1,
        }

        const expected = {
          drums: {
            clips: [ clip1, clip2 ],
          }
        };

        result.tracks.should.containDeep(expected);
      });


      it('should handle nested arrays', () => {
        const s1 = { nLibrary, r, drums: [
          ['0...', '1...'],
          '2...', '3...'
        ]};
        const clip0 = { notes: [{n: 0, s: 0, l: 0.25}], startTime: 0, duration: 1 };
        const clip1 = { notes: [{n: 1, s: 0, l: 0.25}], startTime: 1, duration: 1 };
        const clip2 = { notes: [{n: 2, s: 0, l: 0.25}], startTime: 2, duration: 1 };
        const clip3 = { notes: [{n: 3, s: 0, l: 0.25}], startTime: 3, duration: 1 };

        const result1 = score.parse(s1);
        result1.tracks.should.containDeep({
          drums: {
            clips: [ clip0, clip1, clip2, clip3 ],
          }
        });
      });

      it('should handle arrays that contain objects', () => {
        const s1 = { nLibrary, r, drums: [
          '1...',
          { k: '0.1.' },
          ['2...', '3...']
        ]};

        const clip0 = { notes: [{n: 1, s: 0, l: 0.25}], startTime: 0 };
        const clip1 = { notes: [{n: 0, s: 0, l: 0.25}, { n:1, s: 0.5, l: 0.25 }], startTime: 1 };
        const clip2 = { notes: [{n: 2, s: 0, l: 0.25}], startTime: 2 };
        const clip3 = { notes: [{n: 3, s: 0, l: 0.25}], startTime: 3 };

        const result1 = score.parse(s1);
        result1.tracks.should.containDeep({
          drums: {
            clips: [ clip0, clip2, clip3 ],
          },
          k: {
            clips: [ clip1 ]
          },
        });
      });

      it('should handle objects inside arrays', () => {
        const s1 = { nLibrary, r, main: [
          '0...',
          { drum: '1...'},
          { drum: '2...'},
          '3...'
        ]};

        // expected
        const clip0 = { notes: [{n: 0, s: 0, l: 0.25}], startTime: 0, duration: 1 };
        const clip1 = { notes: [{n: 1, s: 0, l: 0.25}], startTime: 1, duration: 1 };
        const clip2 = { notes: [{n: 2, s: 0, l: 0.25}], startTime: 2, duration: 1 };
        const clip3 = { notes: [{n: 3, s: 0, l: 0.25}], startTime: 3, duration: 1 };
        const expectedResult = {
          main: {
            clips: [clip0, clip3],
          },
          drum: {
            clips: [clip1, clip2],
          },
        };

        const result = score.parse(s1);
        result.tracks.should.containDeep(expectedResult);
      });


      it('should accept arrays as input', () => {
        const trackKey = 'drums';
        const drums = [ ['0...', '1...'], '2...', '3...' ];
        const result = score.parse(
          drums,
          {r, nLibrary, trackKey});

        // expected result
        const clip0 = { notes: [{n: 0, s: 0, l: 0.25}], startTime: 0, duration: 1 };
        const clip1 = { notes: [{n: 1, s: 0, l: 0.25}], startTime: 1, duration: 1 };
        const clip2 = { notes: [{n: 2, s: 0, l: 0.25}], startTime: 2, duration: 1 };
        const clip3 = { notes: [{n: 3, s: 0, l: 0.25}], startTime: 3, duration: 1 };
        const expectedResult = {
          duration: 4,
          tracks: {
            drums: {
              clips: [ clip0, clip1, clip2, clip3 ],
            },
          },
        };
        result.should.containDeep(expectedResult); // eventually I want to get deepEqual here
      });
    }); // score.parse with arrays

    describe('score.parse on deeply nested objects', () => {
      const s1 = { nLibrary, r, main: [
        {
          drums: '0...',
          other: {
            r: '12341234',
            p: '1'
          },
          d2: '2'
        },
        { drums: '3...'},
        '4...'
      ]};

      const s1Copy = R.clone(s1);
      const clip0 = { notes: [{n: 0, s: 0, l: 0.25}], startTime: 0, duration: 1 };
      const clip1 = { notes: [{n: 1, s: 0, l: 0.25}], startTime: 0, duration: 2 };
      const clip2 = { notes: [{n: 2, s: 0, l: 0.25}], startTime: 0, duration: 1 };
      const clip3 = { notes: [{n: 3, s: 0, l: 0.25}], startTime: 2, duration: 1 };
      const clip4 = { notes: [{n: 4, s: 0, l: 0.25}], startTime: 3, duration: 1 };

      const expectedResult = {
        main:  { clips: [clip4] },
        drums: { clips: [clip0, clip3] },
        p:     { clips: [clip1] },
        d2:    { clips: [clip2] },
        // duration: 4,
      };
      const result = score.parse(s1);

      it('should handle deeply nested objects', () => {
        result.tracks.should.containDeep(expectedResult);
      });
      it('should not modify the input object', () => {
        s1.should.deepEqual(s1Copy);
      });
    }); // deeply nested objects

    describe('skip over keys named "clips"', () => {
      const s1 = { nLibrary, r, main: [
        '0...',
        { drum: {
          clips: ['1...', '2...']
        }},
        '3...'
      ]};

      // expected
      const clip0 = { notes: [{n: 0, s: 0, l: 0.25}], startTime: 0, duration: 1 };
      const clip1 = { notes: [{n: 1, s: 0, l: 0.25}], startTime: 1, duration: 1 };
      const clip2 = { notes: [{n: 2, s: 0, l: 0.25}], startTime: 2, duration: 1 };
      const clip3 = { notes: [{n: 3, s: 0, l: 0.25}], startTime: 3, duration: 1 };
      const expectedResult = {
        main: {
          clips: [clip0, clip3],
        },
        drum: {
          clips: [clip1, clip2],
        },
      };

      const result1 = score.parse(s1);
      result1.tracks.should.containDeep(expectedResult);
    });
  }); // describe score.parse

  describe('score.midiVelocityToDbfs', () => {
    it('should work', () => {
      score.midiVelocityToDbfs(127, 0, 6).should.equal(6);
      score.midiVelocityToDbfs(0, 0, 6).should.equal(0);
      score.midiVelocityToDbfs(0, -60, 0).should.equal(-60);
      score.midiVelocityToDbfs(127, -60, 0).should.equal(0);
    });
  });


  describe('score.tracksToFluidMessage', () => {
    const flatten = v => {
      if (Array.isArray(v)) {
        let r = [];
        for (let i of v) {
          if (Array.isArray(i)) r.push(...flatten(i));
          else r.push(i);
        }
        return r;
      }
      return v;
    };

    const nLibrary = [
      60,
      {
        type: 'iLayers',
        iLayers: [
          { path: 'f1.wav', type: 'file' },
          { path: 'f2.wav', type: 'file' },
          { path: 'f3.wav', type: 'file' },
        ],
      },
    ];

    const vLibrary = {
      p: { v: 42 },
      m: { v: 43 },
      f: { v: 85 },
      P: { v: 100, intensity: 0 },
      M: { v: 100, intensity: 1/3 },
      F: { v: 100, intensity: 2/3 },
    };

    const r = '1234';

    const session1 = score.parse({f: '111', r, v: 'pmf'}, {vLibrary, nLibrary});
    const session2 = score.parse({f: '111', r, v: 'PMF'}, {vLibrary, nLibrary});

    const expectedResult = [
      audiotrack.insertWav('s0', 0,    'f1.wav'),
      audiotrack.insertWav('s1', 0.25, 'f2.wav'),
      audiotrack.insertWav('s2', 0.5,  'f3.wav'),
    ]

    it('performance intensity layers (.iLayers) with velocity', () => {
      let msg = score.tracksToFluidMessage(session1.tracks);
      msg = flatten(msg).filter( v => v.address === '/audiotrack/insert/wav');
      msg.should.containDeep(expectedResult)
    });

    it('performance intensity layers (.iLayers) with intensity', () => {
      let msg = score.tracksToFluidMessage(session2.tracks);
      msg = flatten(msg).filter( v => v.address === '/audiotrack/insert/wav');
      msg.should.containDeep(expectedResult)
    });
  });

}); // describe score
