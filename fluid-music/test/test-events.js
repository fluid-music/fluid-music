require('mocha')
require('should')

const { EventBase, EventAudioFile }= require('..').events

describe('test-events.js', function () {
  describe('deepCopy', function () {
    it('should deep copy EventBase', function () {
      const baseEvent = new EventBase({d: {v: 127}})
      const copyEvent = baseEvent.deepCopy()
      copyEvent.should.deepEqual(baseEvent)
      copyEvent.should.not.equal(baseEvent)
    })

    it('should create an instance of the child class', function () {
      const fileEvent = new EventAudioFile({ path: 'some/file.wav', fadeInSeconds: 0.001 })
      const copyEvent = fileEvent.deepCopy()
      copyEvent.should.deepEqual(fileEvent)
      copyEvent.should.be.a.instanceOf(EventAudioFile)
    })
  })
})

