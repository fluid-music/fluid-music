import { AudioFileMode, AudioFileConfig, FluidAudioFile, AudioFileOptions } from '../FluidAudioFile'
import { Technique, UseContext } from '../fluid-interfaces'

/**
 * Insert an audio sample into a track.
 *
 * Note that base class [[`FluidAudioFile`]] has many useful methods and
 * properties for trimming, fading, reversing, etc.
 */
export class AudioFile extends FluidAudioFile implements Technique {

  use ({ track, startTimeSeconds, durationSeconds, d } : UseContext)  {
    const newAudioFile = new FluidAudioFile(this)
    newAudioFile.startTimeSeconds = startTimeSeconds

    if (typeof d.gainDb === 'number' || typeof d.gain === 'number') {
      console.warn(`AudioFile technique's .use encountered obsolete gain(Db) dynamic. Dynamic libraries should .trimDb instead of .gainDb`, d)
    }

    if (typeof d.trimDb === 'number') {
      newAudioFile.gainDb = this.gainDb + d.trimDb
    }

    if (newAudioFile.mode === AudioFileMode.Event) {
      if (newAudioFile.info.duration) {
        newAudioFile.durationSeconds = Math.min(durationSeconds, newAudioFile.getMaxDurationSeconds())
      } else {
        newAudioFile.durationSeconds = durationSeconds
      }
    } else if (newAudioFile.mode === AudioFileMode.OneShot) {
      if (!newAudioFile.info.duration) throw new Error('Cannot use OneShot Audio File that does not specify a file length in info.duration:' + JSON.stringify(newAudioFile))
      newAudioFile.durationSeconds = newAudioFile.getMaxDurationSeconds()
    } else if (newAudioFile.mode === AudioFileMode.OneVoice) {
      newAudioFile.durationSeconds = newAudioFile.getMaxDurationSeconds() // May be trimmed in the finalizer
    }

    track.audioFiles.push(newAudioFile)
    return newAudioFile
  }

  /**
   * Create a copy of an `AudioFile` technique, optionally applying changes to
   * the copy before returning it. This is useful in situations when you want
   * variations of an audioFile with different properties.
   *
   * Note that the value returned will be an `AudioFile` even if the first
   * argument is an instance of a class derived from `AudioFile`. As a result,
   * the output object will not be an exact copy if `audioFileTechnique` is
   * derived from `techniques.AudioFile`.
   *
   * `const newAudioFile = AudioFile.copy(someAudioFile)`
   *
   * @param audioFileTechnique The input `AudioFile` technique to copy
   * @param change The resulting `AudioFile` will
   * @returns A copied version of the input audio file technique
   */
  static copy (audioFileTechnique : AudioFile | AudioFileOptions, change : AudioFileConfig = {}) {
    // Why is this a static method? Wouldn't it be cleaner to make the `copy`
    // method accessible on the `AudioFile` technique instances so users can
    // simply write `something.copy()`? This is problematic in JavaScript, because
    // when `something` is an instance of a class derived from `AudioFile`, the
    // copy method will return an `AudioFile` instance, as opposed to to an
    // instance of whatever type `something` has. This leads to subtle, hard-to
    // -find bugs. Making `copy` a static method provides a syntactic reminder
    // of the type that will be returned. In the example in the docs, it is
    // clear that newAudioFile will be an instance of `AudioFile` even if
    // `someAudioFile` is an instance of a derived class.

    // Merge the markers (as opposed to replacing them)
    change = Object.assign({}, change)
    const newMarkers = change.markers
    if (change.markers) delete change.markers

    const newTechnique = new AudioFile(Object.assign({}, audioFileTechnique, change))
    if (newMarkers) newTechnique.setMarkers(newMarkers)

    return newTechnique
  }
}

/**
 * AFOnset (Audio File Onset) encapsulates a `techniques.AudioFile` instance,
 * dividing the underlying source audio file into three regions delimited by
 * `onsetSeconds` and `releaseSeconds`.
 *
 * ```
 *       onsetSeconds
 * ├──────────┘         releaseSeconds
 * ├───────────────────────────┘
 * ├──attack──┼──────body──────┼─────────decay─────────┤
 * ```
 *
 * Using this technique in a score shifts the resulting audio item to the left
 * on the timeline such that the audio file onset coincides with the the start
 * of the event. This is useful for audio samples that have an "appoggiatura"
 * that "leads in" to the musical onset of the sample.
 */
export class AFOnset {
  audioFile : AudioFile

  /**
   * Note that `.fadeInSeconds` and `.fadeOutSeconds`, on the input file will be
   * swapped when the audio file is reversed.swapped when the audio file is
   * reversed.
   *
   * @param {AudioFile} audioFileTechnique
   * @param {number} [onsetSeconds] The time at which the 'onset' portion of the
   *    sound begins, measured from the start of the source audio file. If not
   *    provided, use the underlying `onset` marker in the source audio file. If
   *    there is no `onset` marker, use 0 (the start of the file)
   * @param {number} [releaseSeconds] The time at which the 'release' portion of
   *    the sound begins, measured from the start of the source audio file. If
   *    not provided, use the `release` marker in the source audio file. If
   *    there is no `release` marker, use the end of the underlying audio file.
   */
  constructor(audioFileTechnique : AudioFile, onsetSeconds? : number, releaseSeconds? : number) {
    this.audioFile = audioFileTechnique
    if (onsetSeconds !== undefined) {
      if (typeof onsetSeconds !== 'number') {
        throw new Error('invalid `onsetSeconds` parameter: ' + onsetSeconds)
      }
      this.onsetSeconds = onsetSeconds
    }
    if(releaseSeconds !== undefined) {
      if (typeof releaseSeconds !== 'number') {
        throw new Error('invalid `releaseSeconds` parameter: ' + releaseSeconds)
      }
      this.releaseSeconds = releaseSeconds
    }
  }

  use(context : UseContext) {
    const newAudioFile = this.audioFile.use(context)
    const shiftBySeconds = this.onsetSeconds / newAudioFile.playbackRate

    newAudioFile.reverse(false) // play forwards
    newAudioFile.startInSourceSeconds = 0
    newAudioFile.startTimeSeconds = context.startTimeSeconds - shiftBySeconds
    newAudioFile.growRightEdgeBySecondsSafe(shiftBySeconds)
    return this.audioFile
  }

  /**
   * Time at which the sample's "body" begins, relative to the start of the
   * source audio file.
   */
  get onsetSeconds () {
    const onset = this.audioFile.markers.get('onset')
    return (typeof onset === 'number') ? onset : 0
  }

  set onsetSeconds (seconds : number) {
    this.audioFile.markers.set('onset', seconds)
  }

  /**
   * Time at which the sample's "decay" begins, relative to the start of the
   * source audio file.
   */
  get releaseSeconds () {
    const release = this.audioFile.markers.get('release')
    return (typeof release === 'number') ? release : this.audioFile.getSourceDurationSeconds()
  }

  set releaseSeconds (seconds : number) {
    this.audioFile.markers.set('release', seconds)
  }
}


/**
 * AFReverse (Audio File Reverse) encapsulates the `techniques.AudioFile`
 * instance passed in to the constructor. Like AFOnset, AFReverse divides
 * the underlying source audio file into three regions delimited by
 * `onsetSeconds` and `releaseSeconds`.
 *
 * ```
 *       onsetSeconds
 * ├──────────┘         releaseSeconds
 * ├───────────────────────────┘
 * ├──attack──┼──────body──────┼─────────decay─────────┤
 * ```
 *
 * Using AFReverse as a technique will insert a reversed copy of the input audio
 * file into the session. The reversed copy will be aligned such that the onset
 * of the sound corresponds with the end of the triggering event, so in the
 * hypothetical example below, the "Onset" of the sound would alight with the
 * second beat in the measure. In practice, when you want to just insert a
 * reversed audio file you can ignore this detail. However, if you want to
 * precisely position the attack of a reversed sound, it can be helpful to
 * specify a non-zero `onsetSeconds` in the AFReverse constructor.
 *
 * ```
 * Example Rhythm:  '1 + 2 + '
 * AFReverse Event: '  a--   '
 * ```
 */
export class AFReverse extends AFOnset implements Technique {
  use(context : UseContext) {
    const rxFile = this.audioFile.use(context)
    rxFile.startInSourceSeconds = 0
    rxFile.playToEnd()
    rxFile.reverse(true)

    // distance between onset and event end
    const postOnsetDuration = (rxFile.getSourceDurationSeconds() - this.onsetSeconds) / Math.abs(rxFile.playbackRate)
    const startSecondsDelta = context.durationSeconds - postOnsetDuration
    rxFile.startTimeSeconds += startSecondsDelta

    const desiredDuration = context.durationSeconds + (this.onsetSeconds / Math.abs(rxFile.playbackRate))
    const trimDelta = desiredDuration - rxFile.durationSeconds
    if (trimDelta < 0) rxFile.growLeftEdgeBySecondsSafe(trimDelta)

    rxFile.mode = FluidAudioFile.Modes.Event
    rxFile.fadeInSeconds = Math.max(rxFile.fadeInSeconds, 3.5)

    return this.audioFile
  }
}

/**
 * Like AFReverse, AFReverseLeadIn inserts a reversed AudioFile into the
 * session. However the two techniques differ in how they align the input
 * audio file. AFReverseLeadIn insert the audio file starting BEFORE
 * the triggering event. The `releaseSeconds` identifies a point in the
 * sample where the "release" of the sound begins. This point will be aligned
 * at the onset of the triggering event.
 *
 * Use this when you have an audio sample with an interesting release portion,
 * and you want that release portion to "lead in" to the triggering event.
 *
 * The lead in time is capped so that no matter how long the release portion of
 * the input Audio File is, this audio sample will be inserted no more than
 * 3.5 seconds in advance of the triggering event.
 */
export class AFReverseLeadIn extends AFOnset implements Technique {
  use(context : UseContext) {
    const newFile = this.audioFile.use(context)

    newFile.playToEnd()
    newFile.reverse(true)
    const leadInSeconds = newFile.getSourcePlaybackSeconds() - this.releaseSeconds
    newFile.startTimeSeconds -= leadInSeconds

    // prevent lead in from being longer than x seconds
    const maxLeadInSeconds = 3.5
    const targetLeadInSeconds = Math.min(maxLeadInSeconds, leadInSeconds)
    if (targetLeadInSeconds !== leadInSeconds) {
      newFile.growLeftEdgeBySeconds(maxLeadInSeconds - leadInSeconds)
    }

    if (newFile.mode === FluidAudioFile.Modes.Event) {
      newFile.durationSeconds = targetLeadInSeconds + context.durationSeconds
    } else if (newFile.mode === FluidAudioFile.Modes.OneShot || newFile.mode === FluidAudioFile.Modes.OneVoice) {
      newFile.playToEnd()
    }

    return this.audioFile
  }
}
