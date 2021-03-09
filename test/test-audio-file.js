require('mocha')
const should = require('should')

const { FluidAudioFile } = require('../built/FluidAudioFile')
const { AudioFile : AudioFileTechnique } = require('../built/techniques/')


describe('test AudioFile', function () {
  const audioFileOptions = {
    path: 'some/file.wav',
    info: { duration: 5 },
    startInSourceSeconds: 1,
    durationSeconds: 0.5,
    fadeInSeconds: 0.2,
    fadeOutSeconds: 0.8,
  }
  describe('maxDurationSeconds', function () {
    const audioFile = new FluidAudioFile(audioFileOptions)

    it('should calculate the max duration for forward playing files', function () {
      audioFile.getMaxDurationSeconds().should.equal(4)
    })
    it('should calculate the max duration for reversed files', function () {
      audioFile.reverse()
      audioFile.getMaxDurationSeconds().should.equal(1.5)
    })
  })

  describe('getTailLeftSeconds', function () {
    const audioFile = new FluidAudioFile(audioFileOptions)

    it('should work on a non-reversed item', function () {
      audioFile.getTailLeftSeconds().should.equal(audioFileOptions.startInSourceSeconds)
    })

    it('should work on a reversed item', function () {
      audioFile.reverse()
      audioFile.getTailLeftSeconds().should.equal(3.5)
    })
  })

  describe('getTailRightSeconds', function () {
    const audioFile = new FluidAudioFile(audioFileOptions)
    it('should work on a non-reversed item', function () {
      audioFile.getTailRightSeconds().should.equal(3.5)
    })
    it('should work on a reversed item', function () {
      audioFile.reverse()
      audioFile.getTailRightSeconds().should.equal(1)
    })
  })

  describe('getEndInSourceSeconds', function () {
    const audioFile = new FluidAudioFile(audioFileOptions)
    it ('should calculate the end time within the audio sample based on the plabyack rate', function () {
      audioFile.getEndInSourceSeconds().should.equal(1.5)
    })
    it('should work even when the AudioFile has been reversed', function () {
      audioFile.reverse()
      audioFile.getEndInSourceSeconds().should.equal(1)
    })
  })

  describe('reverse method', function () {
    const audioFile = new FluidAudioFile(audioFileOptions)
  })

  describe('growLeftEdgeBySeconds', function () {
    const audioFile = new FluidAudioFile(audioFileOptions)
    audioFile.startTimeSeconds = 4

    audioFile.startInSourceSeconds.should.equal(1)
    audioFile.durationSeconds.should.equal(0.5)
    audioFile.growLeftEdgeBySeconds(0.25)

    it('should move the left ege of the simple item', function () {
      audioFile.should.containDeep({
        startInSourceSeconds: 0.75,
        startTimeSeconds: 3.75,
        durationSeconds: 0.75
      })
    })
  })

  describe('AudioFile technique\'s copyTechnique() method', function () {
    const technique = new AudioFileTechnique({
      path: '/hi/there/you.wav',
      info: { duration: 5 },
      fadeInSeconds: 1,
      fadeOutSeconds: 3,
      durationSeconds: 2,
      gainDb: -5,
      startTimeSeconds: 10,
      startInSourceSeconds: 0.2,
      mode: FluidAudioFile.Modes.OneVoice,
    })

    technique.markers.set('onset', 0.2)

    it('should create a copy of the technique object', function () {
      const copy = AudioFileTechnique.copy(technique)
      technique.should.deepEqual(copy)
      technique.should.not.equal(copy)
    })
  })
})
