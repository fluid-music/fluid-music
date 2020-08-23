const should = require('should');
const mocha = require('mocha');
const fluid = require('..');
const FluidSession = fluid.FluidSession;


// Charles: merge in the most useful tests from ../test-obsolete/test-score.js
describe('FluidSession', () => {
  it('should construct a simple score object', () => {
    const nLibrary = [60, 63, 67].map(fluid.converters.numberToMidiNote);
    const r = '1 2 3 4 ';
    const session = new FluidSession({}, {
      bass: {nLibrary, r, gain: -6},
    });

    const bassTrack = session.tracks[0];
    bassTrack.name.should.equal('bass');
    bassTrack.gain.should.equal(-6);

    session.insertScore({bass: '0 1 2 0'});
    const clip = bassTrack.clips[0];
    clip.midiEvents.length.should.equal(4);
  });
});

