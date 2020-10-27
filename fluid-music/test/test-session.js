require('should');
require('mocha');

const fluid = require('..')
const { MidiChord } = require('../built/fluid-techniques')
const { DragonflyRoomPlugin } = require('../built/plugin-dradonfly-room')
const FluidSession = fluid.FluidSession;


// Charles: merge in the most useful tests from ../test-obsolete/test-score.js
describe('FluidSession', () => {
  it('should construct a simple score object', () => {
    const tLibrary = [60, 63, 67].map(note => new fluid.techniques.MidiNote({ note }))
    const r = '1 2 3 4 ';
    const session = new FluidSession({}, {
      bass: {tLibrary, r, gain: -6},
    });

    const bassTrack = session.tracks[0]
    bassTrack.name.should.equal('bass')
    bassTrack.gain.should.equal(-6)

    session.insertScore({bass: '0 1 2 0'})
    const clip = bassTrack.clips[0]
    clip.midiEvents.length.should.equal(4)
  });

  describe('insertScore method', function () {
    describe('with EventMidiChord events', function () {
      const tLibrary = {
        a: new MidiChord({notes: [60, 64, 67, 72]}),
        b: new MidiChord({notes: [67, 70, 74, 79]}),
      }
      const r = '1 2 3 4 '
      const session = new FluidSession({ tLibrary, r }, { chords: {} })

      session.insertScore({ chords: 'a-..b-..' })

      let clip, track
      before(function () {
        track = session.tracks[0]
        clip = track.clips[0]
      })

      it('should have a single track', function () {
        track.clips.length.should.equal(1)
        track.name.should.equal('chords')
      })
      it('should have a single clip with 8 midi notes', function () {
        clip.duration.should.equal(1)
        clip.midiEvents.length.should.equal(8)
      })
      it('should have 4 midi notes on the down beat', function () {
        const chord1 = clip.midiEvents.filter(e => e.startTime === 0)
        chord1.should.containDeep([{note: 60}, {note: 64}, {note: 67}, {note: 72}])
      })
      it('should have 4 midi notes on beat 3', function () {
        const chord2 = clip.midiEvents.filter(e => e.startTime === 0.5)
        chord2.should.containDeep([{note: 67}, {note: 70}, {note: 74}, {note: 79}])
      })
    }) // describe EventMidiChord

    describe('with EventPluginAuto events', function () {
      const roomVerb = new fluid.DragonflyRoom()
      const tLibrary = {
        a: new fluid.techniques.PluginAuto(roomVerb.makeAutomation.decaySeconds(2.4)),
        b: new fluid.techniques.PluginAuto(roomVerb.makeAutomation.decaySeconds(4)),
      }

      const r = '1 2 3 4 '
      const session = new FluidSession({ tLibrary, r }, { reverb: { plugins: [roomVerb] } })
      session.insertScore({reverb: 'a...b...'})

      it ('should create automation points', function () {
        const automation = session.tracks[0].plugins[0].automation
        should(automation.decaySeconds).be.a.Object()
        automation.decaySeconds.points.length.should.equal(2)

        const [point1, point2] = automation.decaySeconds.points
        point1.startTime.should.equal(0)
        point2.startTime.should.equal(0.5)

        point1.value.should.equal(2.4)
        point2.value.should.equal(4)
      })

    })
  }) // insertScore method

  describe('send resolution', function () {
    it('should add sends even when the sending track precedes the receiving track', function () {
      const session = new FluidSession({}, [
        { name: 'send track', sends : [{to: 'receive track', gainDb: -6 }] },
        { name: 'unused track' },
        { name: 'receive track' },
      ])

      for (const track of session.tracks) {
        track.unresolvedSends.length.should.equal(0, `"${track.name} erroneously contains unresolved sends: ${JSON.stringify(track.unresolvedSends)}`)
      }

      const receiveTrack = session.getTrackByName('receive track')
      const sendTrack = session.getTrackByName('send track')
      should.exist(sendTrack)
      should.exist(receiveTrack)
      receiveTrack.receives[0].gainDb.should.equal(-6)
      receiveTrack.receives[0].from.should.equal(sendTrack)
    })
  })
});

