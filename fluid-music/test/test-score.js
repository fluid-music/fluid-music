const R = require('ramda');
const should = require('should');
const mocha = require('mocha');
const score = require('../src/score');

describe('score', () => {
  const noteLibrary = [0, 1, 2, 3, 4, 5, 6];
  const r = '1234'

  describe('score.buildTracks', () => {
    const p1 = '.0..'
    const clip1 = [{ n: 0, s: 0.25, l: 0.25 }];
    clip1.startTime = 0;
    clip1.duration = 1;

    const p2 = '01..';
    const clip2 = [{ n: 0, s: 0, l: 0.25 }, { n:1, s: 0.25, l: 0.25 }];
    clip2.duration = 1;


    it('should parse a very simple object', () => {
      const obj = { noteLibrary, r, p1 }

      score.buildTracks(obj).should.containDeep({
        tracks: {
          p1: {
            clips: [clip1],
          },
        },
      });
    });

    describe('arrays', () => {
      it('should handle arrays', () => {
        const s1 = { noteLibrary, r, drums: [
          '.0..',
          '.1..',
        ]};
        const result1 = score.buildTracks(s1);

        const clip1 = [{n: 0, s: 0.25, l: 0.25}];
        clip1.startTime = 0;
        clip1.duration  = 1;

        const clip2 = [{n: 1, s: 0.25, l: 0.25}];
        clip2.startTime = 1;
        clip2.duration  = 1;

        result1.tracks.should.containDeep({
          drums: {
            clips: [ clip1, clip2 ],
          }
        });
      });

      it('should handle nested arrays', () => {
        const s1 = { noteLibrary, r, drums: [
          ['0...', '1...'],
          '2...', '3...'
        ]};
        const clip0 = [{n: 0, s: 0, l: 0.25}]; clip0.startTime = 0;
        const clip1 = [{n: 1, s: 0, l: 0.25}]; clip1.startTime = 1;
        const clip2 = [{n: 2, s: 0, l: 0.25}]; clip2.startTime = 2;
        const clip3 = [{n: 3, s: 0, l: 0.25}]; clip3.startTime = 3;

        const result1 = score.buildTracks(s1);
        result1.tracks.should.containDeep({
          drums: {
            clips: [ clip0, clip1, clip2, clip3 ],
          }
        });
      });

      it('should handle arrays that contain objects', () => {
        const s1 = { noteLibrary, r, drums: [
          '1...',
          { k: '0.1.' },
          ['2...', '3...']
        ]};

        const clip0 = [{n: 1, s: 0, l: 0.25}]; clip0.startTime = 0;
        const clip1 = [{n: 0, s: 0, l: 0.25}, { n:1, s: 0.5, l: 0.25 }]; clip1.startTime = 1;
        const clip2 = [{n: 2, s: 0, l: 0.25}]; clip2.startTime = 2;
        const clip3 = [{n: 3, s: 0, l: 0.25}]; clip3.startTime = 3;

        const result1 = score.buildTracks(s1);
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
        const s1 = { noteLibrary, r, main: [
          '0...',
          { drum: '1...'},
          { drum: '2...'},
          '3...'
        ]};

        // expected
        const clip0 = [{n: 0, s: 0, l: 0.25}]; clip0.startTime = 0;
        const clip1 = [{n: 1, s: 0, l: 0.25}]; clip1.startTime = 1;
        const clip2 = [{n: 2, s: 0, l: 0.25}]; clip2.startTime = 2;
        const clip3 = [{n: 3, s: 0, l: 0.25}]; clip3.startTime = 3;
        const expectedResult = {
          main: {
            clips: [clip0, clip3],
          },
          drum: {
            clips: [clip1, clip2],
          },
        };

        const result1 = score.buildTracks(s1);
        result1.tracks.should.containDeep(expectedResult);
      });

      it('should accept arrays as input', () => {
        const trackKey = 'drums';
        const drums = [ ['0...', '1...'], '2...', '3...' ];
        const result = score.buildTracks(
          drums,
          {r, noteLibrary, trackKey});

        // expected result
        const clip0 = [{n: 0, s: 0, l: 0.25}]; clip0.startTime = 0; clip0.duration = 1;
        const clip1 = [{n: 1, s: 0, l: 0.25}]; clip1.startTime = 1; clip1.duration = 1;
        const clip2 = [{n: 2, s: 0, l: 0.25}]; clip2.startTime = 2; clip2.duration = 1;
        const clip3 = [{n: 3, s: 0, l: 0.25}]; clip3.startTime = 3; clip3.duration = 1;
        const expectedResult = {
          duration: 4,
          tracks: {
            drums: {
              clips: [ clip0, clip1, clip2, clip3 ],
            },
          },
        };
        console.dir(result, {depth: null});                                                  ///////console.dir
        result.should.containDeep(expectedResult); // eventually I want to get deepEqual here
      });
    }); // score.buildTracks with arrays

    describe('deeply nested objects', () => {
      const s1 = { noteLibrary, r, main: [
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
      const clip0 = [{n: 0, s: 0, l: 0.25}]; clip0.startTime = 0; clip0.duration = 1;
      const clip1 = [{n: 1, s: 0, l: 0.25}]; clip1.startTime = 0; clip1.duration = 2;
      const clip2 = [{n: 2, s: 0, l: 0.25}]; clip2.startTime = 0; clip2.duration = 1;
      const clip3 = [{n: 3, s: 0, l: 0.25}]; clip3.startTime = 2; clip3.duration = 1;
      const clip4 = [{n: 4, s: 0, l: 0.25}]; clip4.startTime = 3; clip4.duration = 1;

      const expectedResult = {
        main:  { clips: [clip4] },
        drums: { clips: [clip0, clip3] },
        p:     { clips: [clip1] },
        d2:    { clips: [clip2] },
        // duration: 4,
      };
      const result = score.buildTracks(s1);
      console.dir(result, {depth: null});                                                  ///////console.dir


      it('should handle deeply nested objects', () => {
        result.tracks.should.containDeep(expectedResult);
      });
      it('should not modify the input object', () => {
        s1.should.deepEqual(s1Copy);
      });
    }); // deeply nested objects

    describe('skip over keys named "clips"', () => {
      const s1 = { noteLibrary, r, main: [
        '0...',
        { drum: {
          clips: ['1...', '2...']
        }},
        '3...'
      ]};

      // expected
      const clip0 = [{n: 0, s: 0, l: 0.25}]; clip0.startTime = 0;
      const clip1 = [{n: 1, s: 0, l: 0.25}]; clip1.startTime = 1;
      const clip2 = [{n: 2, s: 0, l: 0.25}]; clip2.startTime = 2;
      const clip3 = [{n: 3, s: 0, l: 0.25}]; clip3.startTime = 3;
      const expectedResult = {
        main: {
          clips: [clip0, clip3],
        },
        drum: {
          clips: [clip1, clip2],
        },
      };

      const result1 = score.buildTracks(s1);
      result1.tracks.should.containDeep(expectedResult);
    });

  }); // describe score.buildTracks

  describe('score.midiVelocityToDbfs', () => {
    it('should work', () => {
      score.midiVelocityToDbfs(127, 0, 6).should.equal(6);
      score.midiVelocityToDbfs(0, 0, 6).should.equal(0);
      score.midiVelocityToDbfs(0, -60, 0).should.equal(-60);
      score.midiVelocityToDbfs(127, -60, 0).should.equal(0);
    });
  });
}); // describe score
