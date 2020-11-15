require('mocha')
const should = require('should')

const { FluidAudioFile } = require('../built/FluidAudioFile')

describe('test-techniques.js', function () {
  describe('AudioFile', function () {
    describe('maxDurationSeconds', function () {
      const audioFile = new FluidAudioFile({
        path: 'some/file.wav',
        info: { duration: 5 },
        startInSourceSeconds: 1,
        durationSeconds: 0.5
      })

      it('should calculate the max duration for forward playing files', function () {
        audioFile.getMaxDurationSeconds().should.equal(4)
      })
      it('should calculate the max duration for files with .reversed', function () {
        audioFile.reversed = true
        audioFile.getMaxDurationSeconds().should.equal(1.5)
      })
    })
  })
})
