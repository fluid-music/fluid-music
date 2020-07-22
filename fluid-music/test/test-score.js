const R = require('ramda');
const should = require('should');
const mocha = require('mocha');
const score = require('../src/score');
const audiotrack = require('../src/fluid/audiotrack');
const fluid = require('../src/fluid');

describe('score', () => {
  const nLibrary = [0, 1, 2, 3, 4, 5, 6];
  const r = '1234'

  describe('score.parse', () => {
    const p1 = '.0..'
    const clip1 = {
      midiEvents: [{ n: {n: 0}, s: 0.25, l: 0.25 }],
      startTime: 0,
      duration: 1,
    };

    const p2 = '01..';
    const clip2 = {
      midiEvents: [{ n: {n: 0}, s: 0, l: 0.25 }, { n: {n: 1}, s: 0.25, l: 0.25 }],
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
          midiEvents: [{s: 0.25, l: 0.25, n: {n: 0}}],
          duration: 1,
          startTime: 0,
        };

        const clip2 = {
          midiEvents: [{s: 0.25, l: 0.25, n: {n: 1}}],
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
        const clip0 = { midiEvents: [{n: {n: 0}, s: 0, l: 0.25}], startTime: 0, duration: 1 };
        const clip1 = { midiEvents: [{n: {n: 1}, s: 0, l: 0.25}], startTime: 1, duration: 1 };
        const clip2 = { midiEvents: [{n: {n: 2}, s: 0, l: 0.25}], startTime: 2, duration: 1 };
        const clip3 = { midiEvents: [{n: {n: 3}, s: 0, l: 0.25}], startTime: 3, duration: 1 };

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

        const clip0 = { midiEvents: [{n: {n: 1}, s: 0, l: 0.25}], startTime: 0 };
        const clip1 = { midiEvents: [{n: {n: 0}, s: 0, l: 0.25}, { n: {n: 1}, s: 0.5, l: 0.25 }], startTime: 1 };
        const clip2 = { midiEvents: [{n: {n: 2}, s: 0, l: 0.25}], startTime: 2 };
        const clip3 = { midiEvents: [{n: {n: 3}, s: 0, l: 0.25}], startTime: 3 };

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
        const clip0 = { midiEvents: [{n: {n: 0}, s: 0, l: 0.25}], startTime: 0, duration: 1 };
        const clip1 = { midiEvents: [{n: {n: 1}, s: 0, l: 0.25}], startTime: 1, duration: 1 };
        const clip2 = { midiEvents: [{n: {n: 2}, s: 0, l: 0.25}], startTime: 2, duration: 1 };
        const clip3 = { midiEvents: [{n: {n: 3}, s: 0, l: 0.25}], startTime: 3, duration: 1 };
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
        const clip0 = {  midiEvents: [{n: { n: 0 }, s: 0, l: 0.25}], startTime: 0, duration: 1 };
        const clip1 = {  midiEvents: [{n: { n: 1 }, s: 0, l: 0.25}], startTime: 1, duration: 1 };
        const clip2 = {  midiEvents: [{n: { n: 2 }, s: 0, l: 0.25}], startTime: 2, duration: 1 };
        const clip3 = {  midiEvents: [{n: { n: 3 }, s: 0, l: 0.25}], startTime: 3, duration: 1 };
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
      const clip0 = { midiEvents: [{n: { n: 0 }, s: 0, l: 0.25}], startTime: 0, duration: 1 };
      const clip1 = { midiEvents: [{n: { n: 1 }, s: 0, l: 0.25}], startTime: 0, duration: 2 };
      const clip2 = { midiEvents: [{n: { n: 2 }, s: 0, l: 0.25}], startTime: 0, duration: 1 };
      const clip3 = { midiEvents: [{n: { n: 3 }, s: 0, l: 0.25}], startTime: 2, duration: 1 };
      const clip4 = { midiEvents: [{n: { n: 4 }, s: 0, l: 0.25}], startTime: 3, duration: 1 };

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
    }); // score.parse on deeply nested objects

    describe('skip over keys named "clips"', () => {
      const s1 = { nLibrary, r, main: [
        '0...',
        { drum: {
          clips: ['1...', '2...']
        }},
        '3...'
      ]};

      // expected
      const clip0 = { midiEvents: [{n: { n: 0, type: 'midiNote'} , s: 0, l: 0.25}], startTime: 0, duration: 1 };
      const clip1 = { midiEvents: [{n: { n: 1, type: 'midiNote'} , s: 0, l: 0.25}], startTime: 1, duration: 1 };
      const clip2 = { midiEvents: [{n: { n: 2, type: 'midiNote'} , s: 0, l: 0.25}], startTime: 2, duration: 1 };
      const clip3 = { midiEvents: [{n: { n: 3, type: 'midiNote'} , s: 0, l: 0.25}], startTime: 3, duration: 1 };
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

    describe('score.parse with eventMappers', () => {
      const nLibrary = [
        {type: 'test', v: 0},
        {type: 'test', v: 1},
        {type: 'test', v: 2},
      ];

      const eventMappers = [
        (event, context) => {
          if (event.n.type === 'test') {
            event.n = Object.assign({}, event.n);
            event.n.v *= 4;
          }
          return event;
        },
        (event, context) => (event.n.type === 'test' && event.n.v > 0) ? event : null,
      ];
      const r = '1234';

      it('should apply eventMappers in the config', () => {
        const config  = { r, nLibrary, eventMappers };
        const s       = { a: '.01.'};
        const session = score.parse(s, config);

        session.tracks.a.clips[0].events.length.should.equal(1);
        session.tracks.a.clips[0].events[0].should.containDeep({s: 0.5, l: 0.25, n: {v: 4, type: 'test'}})
      });

      it('should apply eventMappers in the score', () => {
        const s       = { a: '.01.', eventMappers }
        const config  = { r, nLibrary };
        const session = score.parse(s, config);

        session.tracks.a.clips[0].events.length.should.equal(1);
        session.tracks.a.clips[0].events[0].should.containDeep({s: 0.5, l: 0.25, n: {v: 4, type: 'test'}})
      });

      it('should handle scores with arrays', () => {
        const s       = { a: ['.01.', '.02.'], eventMappers }
        const config  = { r, nLibrary };
        const session = score.parse(s, config);

        session.tracks.a.clips.length.should.equal(2, 'Got incorrect number of clips');
        session.tracks.a.clips[0].events.length.should.equal(1);
        session.tracks.a.clips[1].events.length.should.equal(1);

        session.tracks.a.clips[0].events[0].should.containDeep({s: 0.5, l: 0.25, n: {v: 4, type: 'test'}});
        session.tracks.a.clips[1].events[0].should.containDeep({s: 0.5, l: 0.25, n: {v: 8, type: 'test'}});
      })
    });

    describe('score.parse with automation points', () => {
      const p1 = { name: 'cutoff'  };
      const p2 = { name: 'send lvl', units: '%', normalize: v => v * 0.01 };

      const nLibrary = {
        a: {
          type: 'auto',
          plugin: { name: 'examplePlugin' }, // name only
          param: p1,
          value: 0.5
        },
        b: {
          type: 'auto',
          plugin: { name: 'examplePlugin' },
          param: p2,
          value: 50,
        },
        n: {
          type: 'auto',
          plugin: { name: 'manyPlugin', nth: 2 },
          param: p1,
          value: .25,
        },
      }

      const config = { nLibrary, r: '1234' };
      const s1 = score.parse({bass: 'a.b.'}, config);

      it('should add a plugin to the data', () => {
        s1.tracks.bass.plugins.length.should.equal(1);
        s1.tracks.bass.plugins[0].name.should.equal('examplePlugin');
        s1.tracks.bass.plugins[0].automation.should.containDeep({
          'cutoff':   { points: [ { startTime: 0,   explicitValue: 0.5 } ] },
          'send lvl': { points: [ { startTime: 0.5, normalizedValue: 0.5 } ] },
        });
      });

      it('should add many plugins if they are needed', () => {
        const s2 = score.parse({ bass: ['', 'n']}, config);
        s2.tracks.bass.plugins.length.should.equal(nLibrary.n.plugin.nth + 1);
        s2.tracks.bass.plugins[nLibrary.n.plugin.nth].automation.should.deepEqual({
          'cutoff': { points: [ {startTime: 1, explicitValue: .25 }] },
        });
      });

    });
  }); // describe score.parse

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

    const dLibrary = {
      p: { v: 42 },
      m: { v: 43 },
      f: { v: 85 },
      P: { v: 100, intensity: 0 },
      M: { v: 100, intensity: 1/3 },
      F: { v: 100, intensity: 2/3 },
    };

    const r = '1234';

    const session1 = score.parse({f: '111', r, d: 'pmf'}, {dLibrary, nLibrary});
    const session2 = score.parse({f: '111', r, d: 'PMF'}, {dLibrary, nLibrary});
    score.applyEventMappers(session1);
    score.applyEventMappers(session2);

    const expectedResult = [
      audiotrack.insertWav('s0.0', 0,    'f1.wav'),
      audiotrack.insertWav('s0.1', 0.25, 'f2.wav'),
      audiotrack.insertWav('s0.2', 0.5,  'f3.wav'),
    ];

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

    describe('tracksToFluidMessage with automation', () => {
      const param1 = { name: 'cutoff' };
      const param2 = { name: 'send lvl', units: '%', normalize: v => v * 0.01 };
      const plug1  = { name: 'examplePlugin' }
      const nLibrary = {
        a: { plugin: plug1, param: param1, value: .5, type: 'auto' },
        b: { plugin: plug1, param: param2, value: 50, type: 'auto' },
      };

      const s1   = score.parse({bass: '.a.b', r: '1234', nLibrary});
      const msg  = score.tracksToFluidMessage(s1.tracks);
      const flat = flatten(msg);

      const expected = [
        fluid.plugin.setParamExplicitAt('cutoff', 0.5, 0.25, 0),
        fluid.plugin.setParamNormalizedAt('send lvl', 0.5, 0.75, 0),
      ];

      it('should add fluid messages for automation points', () => {
        const result = flat.filter(m => m.address === '/plugin/param/set/at');
        result.should.deepEqual(expected);
      });
    }); // describe automation
  }); // describe tracksToFluidMessage
}); // describe score
