require('mocha')
const should = require('should')

const { FluidAudioFile } = require('../built/FluidAudioFile')

describe('test-techniques.js', function () {
  describe('AudioFile', function () {
    const audioFileOptions = {
      path: 'some/file.wav',
      info: { duration: 5 },
      startInSourceSeconds: 1,
      durationSeconds: 0.5
    }
    describe('maxDurationSeconds', function () {
      const audioFile = new FluidAudioFile(audioFileOptions)

      it('should calculate the max duration for forward playing files', function () {
        audioFile.getMaxDurationSeconds().should.equal(4)
      })
      it('should calculate the max duration for files with .reversed', function () {
        audioFile.reversed = true
        audioFile.getMaxDurationSeconds().should.equal(1.5)
      })
    })

    describe('getTailLeftSeconds', function () {
      const audioFile = new FluidAudioFile(audioFileOptions)

      it('should work on a non-reversed item', function () {
        audioFile.getTailLeftSeconds().should.equal(audioFileOptions.startInSourceSeconds)
      })

      it('should work on a reversed item', function () {
        audioFile.reversed = true;
        audioFile.getTailLeftSeconds().should.equal(3.5)
      })
    })
  })
})
