require('mocha')
const should = require('should')

const { Technique, AudioFile, copyEvent }= require('..').techniques

describe('test-techniques.js', function () {
  describe('EventBase.deepCopy', function () {
    it('should deep copy EventBase', function () {
      const baseEvent = new Technique({d: {v: 127}})
      const copyEvent = baseEvent.deepCopy()
      copyEvent.should.deepEqual(baseEvent)
      copyEvent.should.not.equal(baseEvent)
    })

    it('should create an instance of the child class', function () {
      const fileEvent = new AudioFile({ path: 'some/file.wav', fadeInSeconds: 0.001 })
      const copyEvent = fileEvent.deepCopy()
      copyEvent.should.deepEqual(fileEvent)
      copyEvent.should.be.a.instanceOf(AudioFile)
    })
  })

  describe('copyEvent (standalone function)', function () {
    it('should deep copy an EventAudioFile instance', function () {
      const fileEvent = new AudioFile({ path: 'some/file.wav', fadeOutSeconds: 0.5, info: {sampleRate: 44100} })
      const copy = copyEvent(fileEvent, {startTime: 500})
      fileEvent.startTime = 500
      copy.should.deepEqual(fileEvent)
      copy.should.be.a.instanceOf(AudioFile)
    })

    it('should shallow copy objects', function () {
      const event = { type: 'trackAuto', startTime: 500, duration: 1, paramKey: 'gain' }
      const copy = copyEvent(event)
      copy.should.deepEqual(event)
      copy.should.not.equal(event)
    })

    it('should copy an array', function () {
      const fileEvent = new AudioFile({ path: 'some/file.wav', fadeOutSeconds: 0.5, info: {sampleRate: 44100} })
      const fileEvent2 = fileEvent.deepCopy({ startTime: 100, duration: 5 })
      const events = [fileEvent, fileEvent2, {hi:'helloworld'}]
      const copies = copyEvent(events)
      events.should.deepEqual(copies)
      copies[0].should.not.equal(events[0])
      copies[1].should.not.equal(events[1])
      copies[2].should.not.equal(events[2])
    })
  })
})
