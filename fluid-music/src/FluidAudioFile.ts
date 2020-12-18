import { gainToDb, clamp } from './converters'

/** AudioFile playback modes */
export enum AudioFileMode {
  /**
   * In this default mode, a `'1234'` rhythm  string, combined with a `'s...'`
   * will trim the length of the inserted audio file to a quarter note. */
  Event = 1,
  // Even though ts docs imply otherwise, enums indices may start on 0 if we do
  // not specify = 1. This causes a bug when we check for the presence of an
  // optional AudioFileMode member with `if (event.mode)`

  /**
   * The OneShot mode plays the file to its conclusion, ignoring the event
   * length extracted from the pattern string */
  OneShot,

  /**
   * Play the audio file to its conclusion, OR fade it out at the onset of the
   * next AudioFile in the clip (whichever happens first) */
  OneVoice,
}

/**
 * Audio file details provided by the music-metadata npm package.
 */
export interface AudioFileInfo {
  [key: string] : any
  /** length in seconds */
  duration? : number
  bitsPerSample? : number
  sampleRate? : number
  numberOfChannels? : number
}

/** Named positions within the source file, described in seconds */
export interface AudioFileMarkers {
  [key: string] : number
}

export interface AudioFileOptions extends AudioFileConfig {
  path : string
}

export interface AudioFileConfig {
  path? : string
  fadeOutSeconds? : number
  fadeInSeconds? : number
  gainDb? : number
  mode? : AudioFileMode
  info? : AudioFileInfo
  startInSourceSeconds? : number
  startTimeSeconds? : number
  durationSeconds? : number
  playbackRate? : number
  markers? : {[key: string] : number}|Map<string, number>
}

/**
 * FluidAudioFile is a non-destructive reference to static audio asset. Think of
 * it like an "Item" in Reaper or an "Audio Clip" in Tracktion Waveform.
 *
 * It is unusual that you use `FluidAudioFile` directly. More often you will
 * create and interact with the [[`AudioFile | fluid.techniques.AudioFile`]]
 * derived class. Note that unlike the technique version, `FluidAudioFile` does
 * not have a `.use` method so a `FluidAudioFile` instance is not a `Technique`,
 * and cannot be used in a technique library.
 *
 * However, most of the methods for manipulating audio files on the timeline are
 * defined in this class, so the documentation here is likely to be informative.
 */
export class FluidAudioFile {
  constructor(options : AudioFileOptions) {
    if (typeof options.path !== 'string') {
      throw new Error('AudioFile Technique constructor did not find an options.path string: ' + JSON.stringify(options))
    }

    this.path = options.path
    if (typeof options.fadeInSeconds === 'number') this.fadeInSeconds = options.fadeInSeconds
    if (typeof options.fadeOutSeconds === 'number') this.fadeOutSeconds = options.fadeOutSeconds
    if (typeof options.gainDb === 'number') this.gainDb = options.gainDb
    if (typeof options.startInSourceSeconds === 'number') this.startInSourceSeconds = options.startInSourceSeconds
    if (typeof options.startTimeSeconds === 'number') this.startTimeSeconds = options.startTimeSeconds
    if (typeof options.durationSeconds === 'number') this.durationSeconds = options.durationSeconds
    if (typeof options.playbackRate === 'number') this.playbackRate = options.playbackRate
    if (options.mode) this.mode = options.mode
    if (options.info) this.info = options.info
    if (options.markers) this.setMarkers(options.markers)

    // If the user did not specify durationSeconds, assume the region of
    // interest ends at the end of the source file
    if (!options.durationSeconds && this.info.duration) {
      this.durationSeconds = this.info.duration - this.startInSourceSeconds
    }

    const errorMessage = this.check()
    if (errorMessage) {
      console.error(this)
      throw new Error(errorMessage)
    }
  }

  static Modes = AudioFileMode

  /** path to the underlying audio file */
  path : string = ''
  /** Fade out time in seconds */
  fadeOutSeconds : number = 0
  /** Fade in time in seconds */
  fadeInSeconds : number = 0
  /** Gain in dBFS applied to the sample. 0 is unity gain */
  gainDb : number = 0
  mode : AudioFileMode = AudioFileMode.Event
  /** Information and metadata pertaining to the source audio file */
  info : AudioFileInfo = {}
  /** Named events within the source file */
  markers = new Map<string, number>()

  /** The time within the parent (track) that this sample will be triggered */
  startTimeSeconds : number = 0

  /**
   * durationSeconds specifies the length of the playback event measured on the
   * main timeline. To calculate where in the source audio file playback ends,
   * use `.getEndInSourceSeconds()`.
   */
  durationSeconds : number = 1

  /**
   * startInSourceSeconds specifies the beginning of the region of interest
   * within the audio source file. Set this to zero to play from the beginning.
   * This measures the start point within the source material, assuming a 1x
   * `.playbackRate` (even when `this.playbackRate != 1`). Notice that you
   * cannot use `startInSourceSeconds + durationSeconds` to calculate the
   * "endInSourceSeconds".
   *
   * To calculate the position in the source audio file that playback ends, use
   * `.getEndInSourceSeconds()`, which correctly accounts for the value of
   * `.playbackRate`.
   */
  startInSourceSeconds : number = 0

  playbackRate : number = 1

  /**
   * Check the AudioFile for potential problems. If problems are found, return
   * an error message string. Otherwise, return null
   */
  check() : string|null {
    if (typeof this.path !== 'string' || this.path === '') {
      return 'AudioFile technique is missing a path'
    }

    if (this.mode === AudioFileMode.OneShot && typeof this.info.duration !== 'number') {
      return 'AudioFile techniques cannot have .mode=OneShot without specifying an info.duration'
    }

    if (this.durationSeconds < 0) {
      return 'AudioFile has negative duration'
    }

    return null
  }

  /**
   * Convenience method for setting audio file markers
   * @param markers
   */
  setMarkers(markers : {[key: string] : number} | Map<string, number>) {
    if (markers instanceof Map) {
      for (const [key, value] of markers.entries()) this.markers.set(key, value)
    } else if (markers) {
      for (const [key, value] of Object.entries(markers)) this.markers.set(key, value)
    }
  }

  /**
   * Reverse the audio file playback, swapping the in/out fades.
   * @param reverse If true, play audio file in reverse. If false, play forwards
   */
  reverse(bool : boolean = true) {
    if (bool !== this.isReversed()) {
      this.startInSourceSeconds = this.getEndInSourceSeconds()
      this.playbackRate *= -1

      // swap fadeIn/Out seconds
      const fadeInSeconds = this.fadeInSeconds
      this.fadeInSeconds = this.fadeOutSeconds
      this.fadeOutSeconds = fadeInSeconds
    }
    return this.playbackRate
  }

  /**
   * Identify where within the source file playback will end, given the values
   * of `.startInSourceSeconds`, `.durationSeconds`, and `.playbackRate`.
   */
  getEndInSourceSeconds() {
    return this.startInSourceSeconds + (this.durationSeconds * this.playbackRate)
  }

  isReversed() {
    return this.playbackRate < 0
  }

  /**
   * Calculate and return the maximum valid value for `.durationSeconds`.
   *
   * Setting the `.durationSeconds` value to the value returned by this function
   * will result in the underlying audio file being played to the end of the
   * underlying audio source object (or to the beginning, if `.playbackRate` is
   * negative.
   *
   * ```
   * audioFile.durationSeconds = audioFile.getMaxDurationSeconds()
   * ```
   *
   * When the file is NOT reversed, the source file length is used, so make sure
   * that `audioFile.info.duration` exists.
   */
  getMaxDurationSeconds() {
    if (this.isReversed()) return this.startInSourceSeconds / this.playbackRate * -1
    return (this.getSourceDurationSeconds() - this.startInSourceSeconds) / this.playbackRate
  }

  /**
   * Return the length of the source audio file in seconds. If the length is not
   * included in .info, print a WARNING message, and return an arbitrary value.
   */
  getSourceDurationSeconds() {
    if (!this.info.duration) {
      console.warn('WARNING: AudioFile is missing source length. Make sure that .info.duration is a value in seconds: ', this)
      return 4 // 4 is arbitrary
    }
    return this.info.duration
  }

  /**
   * Return the length of the source audio file given the current .playbackRate.
   * This will be the maximum length of the event, assuming the value of
   * .startInSource does not trim the fileEvent.
   */
  getSourcePlaybackSeconds() {
    return this.getSourceDurationSeconds() / Math.abs(this.playbackRate)
  }

  /**
   * The "right tail" is the source content that gets truncated during playback
   * when (for example), the `.durationSeconds` ends playback before the end
   * of the underlying source audio file.
   *
   * If source audio file duration is 5 seconds, and the `.durationSeconds`
   * property is 4 seconds, then the "right tail" will be 1 second (assuming
   * `.playbackRate == 1` and `.startInSourceSeconds == 0`).
   *
   * This method will calculate the duration of the trailing tail even when
   * audio is playing in reverse (because of a negative `.playbackRate` or when
   * `.startInSourceSeconds != 0`).
   *
   * Note that there is an inverse relationship between the absolute value of
   * `.playbackRate` and the tail length, because slowing the playback rate of
   * the source file effectively increases the length of the underlying sample.
   *
   * @returns A duration (measured in seconds on the timeline) of the trailing
   * tail of this audio item.
   */
  getTailRightSeconds() {
    if (this.isReversed()) return this.getEndInSourceSeconds() / this.playbackRate * -1
    return (this.getSourceDurationSeconds() - this.getEndInSourceSeconds()) / this.playbackRate
  }

  /**
   * The "left tail" is the source content that gets trimmed during playback
   * when (for example), the `.startInSourceSeconds` offsets the beginning
   * of the playback within the underlying source audio file.
   *
   * If the `.startInSourceSeconds` property is 1, then the "left tail" will
   * also be 1 (assuming `.playbackRate == 1` and `.startInSourceSeconds == 0`).
   *
   * This method will calculate the duration of the lead-in tail even when
   * audio is playing in reverse (because of a negative `.playbackRate`)
   *
   * Note that there is an inverse relationship between the absolute value of
   * `.playbackRate` and the tail length, because slowing the playback rate of
   * the source file effectively increases the length of the underlying sample.
   *
   * @returns A duration (measured in seconds on the timeline) of the lead-in
   * tail of this audio item.
   */
  getTailLeftSeconds () {
    if (this.isReversed()) return (this.startInSourceSeconds - this.getSourceDurationSeconds()) / this.playbackRate
    return this.startInSourceSeconds / this.playbackRate
  }


  /**
   * Move the right edge of the item without moving the contents of the item on
   * the timeline.
   *
   * @param seconds Positive values make the item longer by moving the right
   * edge to the right. Negative values make the item shorter by moving the
   * right edge to the left. This value is be measured on the timeline, and not
   * in the audiofile source (an important distinction when
   * `this.playbackRate != 1`).
   */
  growRightEdgeBySeconds(seconds : number) {
    this.durationSeconds += seconds
  }

  growRightEdgeBySecondsSafe(seconds : number) {
    seconds = Math.min(seconds, this.getTailRightSeconds())
    seconds = Math.max(seconds, -this.durationSeconds)
    this.growRightEdgeBySeconds(seconds)
  }

  /**
   * Move the left edge of the item without moving the contents of the item on
   * the timeline.
   *
   * @param seconds Positive values make the item longer by moving the left edge
   * to the left. Negative values make the item shorter by moving the left edge
   * to the right. This value is be measured on the timeline, and not in the
   * audiofile source (an important distinction when `this.playbackRate != 1`).
   */
  growLeftEdgeBySeconds(seconds : number) {
    this.startInSourceSeconds -= seconds / this.playbackRate
    this.startTimeSeconds -= seconds
    this.durationSeconds += seconds
  }

  growLeftEdgeBySecondsSafe(seconds : number) {
    seconds = Math.min(seconds, this.getTailLeftSeconds())
    seconds = Math.max(seconds, -this.durationSeconds)
    this.growLeftEdgeBySeconds(seconds)
  }

  /**
   * Set the event's `.durationSeconds` so that it plays right up to the end of
   * the source. This takes into account `.playbackRate`, `.isReversed()`, and
   * `.startInSourceSeconds`.
   */
  playToEnd() {
    this.growRightEdgeBySeconds(this.getTailRightSeconds())
    const warning = this.check()
    if (warning) console.warn('Warning:', warning, this)
  }
}

/**
 * `resolveFades` is used internally to account for the case when an audio file's
 * in and out fades are longer than the item containing the audio file itself.
 * You may set an audio file's `.fadeInSeconds` to a value that is longer than
 * the duration of the audio file instance on a track. Exporters use this method
 * to simulate a long fade in by artificially reducing the audioFile's gain.
 *
 * This prevents short clips with long gains from fading in faster than they
 * should. If you want to avoid this behavior, make sure that the total
 * `.fadeInSeconds` and `.fadeOutSeconds` in your audio files do not exceed the
 * `.durationSeconds`.
 */
export function resolveFades(audioFile : FluidAudioFile) {
  const fractionOfFadeInTime = clamp(0, 1, audioFile.durationSeconds / audioFile.fadeInSeconds)
  const fadeInGain = Math.sqrt(fractionOfFadeInTime) // Assume constant power fade
  const fadeInDb = gainToDb(fadeInGain)

  const fractionOfFadeOutTime = clamp(0, 1, audioFile.durationSeconds / audioFile.fadeOutSeconds)
  const fadeOutGain = Math.sqrt(fractionOfFadeOutTime) // Assume constant power fade
  const fadeOutDb = gainToDb(fadeOutGain)

  let fadeInSeconds = audioFile.fadeInSeconds
  let fadeOutSeconds = audioFile.fadeOutSeconds

  const denominator = fadeInSeconds + fadeOutSeconds
  if (denominator > audioFile.durationSeconds) {
    fadeInSeconds = audioFile.durationSeconds * fadeInSeconds / denominator
    fadeOutSeconds = audioFile.durationSeconds * fadeOutSeconds / denominator
  }

  return {
    fadeInSeconds,
    fadeOutSeconds,
    gainDb: audioFile.gainDb + fadeInDb + fadeOutDb
  }
}