const R = require('ramda');
const should = require('should');
const mocha = require('mocha');

const fluid = require('..');
const { FluidPlugin } = require('../built/src/plugin');
const score = fluid.score
const audiotrack = fluid.audiotrack;

converters = require('./../src/converters');
fluid.trackAutomation = require('../src/track-automation');

describe('score', () => {
  const nLibrary = [0, 1, 2, 3, 4, 5, 6].map(converters.numberToMidiNote);
  const r = '1234'

  describe('score.parse', () => {
    const p1 = '.0..'
    const clip1 = {
      midiEvents: [{ n: 0, startTime: 0.25, duration: 0.25 }],
      startTime: 0,
      duration: 1,
    };

    const p2 = '01..';
    const clip2 = {
      midiEvents: [{ n: 0, startTime: 0, duration: 0.25 }, { n: 1, startTime: 0.25, duration: 0.25 }],
      duration: 1,
    };

    const obj = {
      p1,
      nLibrary: [0, 1, 2, 3, 4, 5, 6].map(converters.numberToMidiNote),
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

    it('should populate an empty track even when the track has no clips. ', () => {
      const obj = {
        snare: {
          nLibrary: [0, 1, 2, 3, 4, 5, 6].map(converters.numberToMidiNote),
          r: '1234',
        },
      };

      score.parse(obj).should.containDeep({
        tracks: {
          snare: {
            clips: [],
            plugins: [],
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
          midiEvents: [{ startTime: 0.25, duration: 0.25, n: 0 }],
          duration: 1,
          startTime: 0,
        };

        const clip2 = {
          midiEvents: [{ startTime: 0.25, duration: 0.25, n: 1 }],
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
        const clip0 = { midiEvents: [{ n: 0, startTime: 0, duration: 0.25 }], startTime: 0, duration: 1 };
        const clip1 = { midiEvents: [{ n: 1, startTime: 0, duration: 0.25 }], startTime: 1, duration: 1 };
        const clip2 = { midiEvents: [{ n: 2, startTime: 0, duration: 0.25 }], startTime: 2, duration: 1 };
        const clip3 = { midiEvents: [{ n: 3, startTime: 0, duration: 0.25 }], startTime: 3, duration: 1 };

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

        const clip0 = { midiEvents: [{n: 1, startTime: 0, duration: 0.25}], startTime: 0 };
        const clip1 = { midiEvents: [{n: 0, startTime: 0, duration: 0.25}, { n: 1, startTime: 0.5, duration: 0.25 }], startTime: 1 };
        const clip2 = { midiEvents: [{n: 2, startTime: 0, duration: 0.25}], startTime: 2 };
        const clip3 = { midiEvents: [{n: 3, startTime: 0, duration: 0.25}], startTime: 3 };

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
        const clip0 = { midiEvents: [{ n: 0, startTime: 0, duration: 0.25 }], startTime: 0, duration: 1 };
        const clip1 = { midiEvents: [{ n: 1, startTime: 0, duration: 0.25 }], startTime: 1, duration: 1 };
        const clip2 = { midiEvents: [{ n: 2, startTime: 0, duration: 0.25 }], startTime: 2, duration: 1 };
        const clip3 = { midiEvents: [{ n: 3, startTime: 0, duration: 0.25 }], startTime: 3, duration: 1 };
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
        const clip0 = {  midiEvents: [{ n: 0, startTime: 0, duration: 0.25 }], startTime: 0, duration: 1 };
        const clip1 = {  midiEvents: [{ n: 1, startTime: 0, duration: 0.25 }], startTime: 1, duration: 1 };
        const clip2 = {  midiEvents: [{ n: 2, startTime: 0, duration: 0.25 }], startTime: 2, duration: 1 };
        const clip3 = {  midiEvents: [{ n: 3, startTime: 0, duration: 0.25 }], startTime: 3, duration: 1 };
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
      const clip0 = { midiEvents: [{ n: 0, startTime: 0, duration: 0.25 }], startTime: 0, duration: 1 };
      const clip1 = { midiEvents: [{ n: 1, startTime: 0, duration: 0.25 }], startTime: 0, duration: 2 };
      const clip2 = { midiEvents: [{ n: 2, startTime: 0, duration: 0.25 }], startTime: 0, duration: 1 };
      const clip3 = { midiEvents: [{ n: 3, startTime: 0, duration: 0.25 }], startTime: 2, duration: 1 };
      const clip4 = { midiEvents: [{ n: 4, startTime: 0, duration: 0.25 }], startTime: 3, duration: 1 };

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

      it('should skip over keys named "clips"', () => {
        const s1 = { nLibrary, r, main: [
          '0...',
          { drum: {
            clips: ['1...', '2...']
          }},
          '3...'
        ]};

        // expected
        const clip0 = { midiEvents: [{ n: 0, type: 'midiNote', startTime: 0, duration: 0.25 }], startTime: 0, duration: 1 };
        const clip1 = { midiEvents: [{ n: 1, type: 'midiNote', startTime: 0, duration: 0.25 }], startTime: 1, duration: 1 };
        const clip2 = { midiEvents: [{ n: 2, type: 'midiNote', startTime: 0, duration: 0.25 }], startTime: 2, duration: 1 };
        const clip3 = { midiEvents: [{ n: 3, type: 'midiNote', startTime: 0, duration: 0.25 }], startTime: 3, duration: 1 };
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
    }); // score.parse on deeply nested objects


    describe('score.parse with dPattern and dLibrary arguments', () => {

      const rhythm   = '1+2+3+4+';
      const pattern  = '0.1.2...';
      const dPattern = '0.1.2...';
      const dLibrary = [0, 10, 20].map(v=>({v:v}));
      const nLibrary = [0, 1, 2].map(converters.numberToMidiNote);
      const config   = { r: rhythm, d: dPattern, dLibrary, nLibrary };

      it('should output events with .d values if passed a dPattern and dLibrary', () => {
        const config   = { r: rhythm, d: dPattern, dLibrary, nLibrary };
        const session = score.parse({ harp: pattern }, config);
        const clip = session.tracks.harp.clips[0];
        clip.midiEvents.length.should.equal(3);
        clip.midiEvents.forEach((note) => should.exist(note.d));
      });

      it('should put dynamicsObjects into the .d field of the note object', () => {
        const config   = { r: rhythm, d: dPattern, dLibrary, nLibrary };
        const dynamicsObject = { v: 70, dbfs: 1 };
        const session = score.parse({
          harp: pattern,
          dLibrary: [60, dynamicsObject, 80],
          d: dPattern,
        }, config);

        session.tracks.harp.clips[0].midiEvents[1].d.should.containDeep(dynamicsObject);
      });

      it('should apply the most recent dynamic object', () => {
        const config = { r: rhythm, d: dPattern, dLibrary, nLibrary };
        const s = {
          harp: '0.1.2...',
          d:    '1.2.....',
        };

        const session = score.parse(s, config);
        session.tracks.harp.clips[0].midiEvents.should.containDeep([
          { type: 'midiNote', startTime: 0,    duration: 0.125, n: 0, d: {v: 10} },
          { type: 'midiNote', startTime: 0.25, duration: 0.125, n: 1, d: {v: 20} },
          { type: 'midiNote', startTime: 0.5,  duration: 0.125, n: 2, d: {v: 20} },
        ])
      });

      // it('should apply the most recent dynamic object even if the dPattern ends early', () => {
      //   const pattern  = '0.1.2...';
      //   const dPattern = '1.2';
      //   const clip = tab.parseTab(rhythm, pattern, nLibrary, dPattern, [0,1,2]);
      //   clip.events.should.deepEqual([
      //     {type: 'midiNote', startTime: 0,    duration: 0.125, n: 0, d: 1 },
      //     {type: 'midiNote', startTime: 0.25, duration: 0.125, n: 1, d: 2 },
      //     {type: 'midiNote', startTime: 0.5,  duration: 0.125, n: 2, d: 2 },
      //   ])
      // });

      // it('should omit a .d value on events when the dLibrary+dPattern specify null/undefined ', () => {
      //   const pattern  = '0.1.2...';
      //   const dPattern = '0.1.2';
      //   const clip = tab.parseTab(rhythm, pattern, nLibrary, dPattern, [0, null, undefined]);
      //   clip.events.should.deepEqual([
      //     {type: 'midiNote', startTime: 0,    duration: 0.125, n: 0, d: 0 },
      //     {type: 'midiNote', startTime: 0.25, duration: 0.125, n: 1 },
      //     {type: 'midiNote', startTime: 0.5,  duration: 0.125, n: 2 },
      //   ])
      // });

    }); // describe score.parse with dPattern/dLibrary

    describe('score.parse with eventMappers', () => {
      const nLibrary = [
        {type: 'test', v: 0},
        {type: 'test', v: 1},
        {type: 'test', v: 2},
      ];

      const eventMappers = [
        (event, context) => {
          if (event.type === 'test') {
            event.v *= 4;
          }
          return event;
        },
        (event, context) => (event.type === 'test' && event.v > 0) ? event : null,
      ];
      const r = '1234';

      it('should apply eventMappers in the config', () => {
        const config  = { r, nLibrary, eventMappers };
        const s       = { a: '.01.'};
        const session = score.parse(s, config);

        session.tracks.a.clips[0].events.length.should.equal(1);
        session.tracks.a.clips[0].events[0].should.containDeep({startTime: 0.5, duration: 0.25, v: 4, type: 'test'});
      });

      it('should apply eventMappers in the score', () => {
        const s       = { a: '.01.', eventMappers }
        const config  = { r, nLibrary };
        const session = score.parse(s, config);

        session.tracks.a.clips[0].events.length.should.equal(1);
        session.tracks.a.clips[0].events[0].should.containDeep({startTime: 0.5, duration: 0.25, v: 4, type: 'test'});
      });

      it('should handle scores with arrays', () => {
        const s       = { a: ['.01.', '.02.'], eventMappers }
        const config  = { r, nLibrary };
        const session = score.parse(s, config);

        session.tracks.a.clips.length.should.equal(2, 'Got incorrect number of clips');
        session.tracks.a.clips[0].events.length.should.equal(1);
        session.tracks.a.clips[1].events.length.should.equal(1);

        session.tracks.a.clips[0].events[0].should.containDeep({ startTime: 0.5, duration: 0.25, v: 4, type: 'test' });
        session.tracks.a.clips[1].events[0].should.containDeep({ startTime: 0.5, duration: 0.25, v: 8, type: 'test' });
      });
    }); // describe "with eventMappers"

    describe('score.parse with automation points', () => {
      const p1 = { name: 'cutoff'  };
      const p2 = { name: 'send lvl' };

      const nLibrary = {
        a: {
          type: 'pluginAuto',
          plugin: { pluginName: 'examplePlugin', pluginType: 'unknown'}, // pluginName only
          param: p1,
          value: 0.5
        },
        b: {
          type: 'pluginAuto',
          plugin: { pluginName: 'examplePlugin', pluginType: 'unknown' },
          param: p2,
          value: 50,
        },
        n: {
          type: 'pluginAuto',
          plugin: { pluginName: 'manyPlugin', pluginType: 'unknown', nth: 2 },
          param: p1,
          value: .25,
        },
        p: {
          type: 'trackAuto',
          param: fluid.trackAutomation.params.pan,
          value: -0.5,
        }
      }

      const config = { nLibrary, r: '1234' };
      const s1 = score.parse({bass: 'a.b.'}, config, undefined, {
        bass:{
          plugins: [
            new FluidPlugin('examplePlugin', 'unknown'),
            new FluidPlugin('manyPlugin', 'unknown'),
            new FluidPlugin('manyPlugin', 'unknown'),
            new FluidPlugin('manyPlugin', 'unknown'),
          ],
          clips: [],
          gain: 0, pan: 0, automation: {}, name: 'bass',
        }
      });

      it('should add a plugin to the data', () => {
        s1.tracks.bass.plugins[0].pluginName.should.equal('examplePlugin');
        s1.tracks.bass.plugins[0].automation.should.containDeep({
          'cutoff':   { points: [ { startTime: 0,   value: 0.5, curve: 0 } ] },
          'send lvl': { points: [ { startTime: 0.5, value: 50, curve: 0 } ] },
        });
      });

      it('should put automation points with type="trackAuto" in the correct place', () => {
        const s2 = score.parse({ bass: '..p.'}, config);
        s2.tracks.bass.plugins.should.be.empty();
        s2.tracks.bass.automation.should.deepEqual({
          'pan': { points: [{startTime: 0.5, value: -0.5, curve: 0}]},
        });
      });

    }); // automation points
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
      const plug1  = { pluginName: 'examplePlugin', type: 'unknown' }
      const nLibrary = {
        a: { plugin: plug1, param: param1, value: .5, type: 'pluginAuto' },
        b: { plugin: plug1, param: param2, value: 50, type: 'pluginAuto' },
      };

      it('should add fluid messages for automation points', () => {
        const s1   = score.parse({bass: '.a.b', r: '1234', nLibrary}, );
        const msg  = score.tracksToFluidMessage(s1.tracks);
        const flat = flatten(msg);
  
        const expected = [
          fluid.plugin.setParamExplicitAt('cutoff', 0.5, 0.25, 0),
          fluid.plugin.setParamNormalizedAt('send lvl', 0.5, 0.75, 0),
        ];
  
        const result = flat.filter(m => m.address === '/plugin/param/set/at');
        result.should.deepEqual(expected);
      });
    }); // describe tracksToFluidMessage with automation
  }); // describe tracksToFluidMessage
}); // describe score
