import { error } from 'console'
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
   * next AudioFile in the clip */
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

export interface AudioFileOptions {
  path : string
  fadeOutSeconds? : number
  fadeInSeconds? : number
  gainDb? : number
  mode? : AudioFileMode
  info? : AudioFileInfo
  startInSourceSeconds? : number
  startTimeSeconds? : number
  durationSeconds? : number
  reversed? : boolean
}

export class FluidAudioFile {
  constructor(options : AudioFileOptions) {
    if (typeof options.path !== 'string') {
      throw new Error('AudioFile Technique constructor did not find an options.path string')
    }

    Object.assign(this, options)

    const errorMessage = this.check()
    if (errorMessage) {
      console.error(this)
      throw new Error(errorMessage)
    }
  }

  static Modes = AudioFileMode

  path : string = ''
  /** Fade out time in seconds. When `.reversed` this is the fade in time */
  fadeOutSeconds : number = 0
  /** Fade in time in seconds. When `.reversed` this is the fade out time */
  fadeInSeconds : number = 0
  gainDb : number = 0
  mode : AudioFileMode = AudioFileMode.Event
  info : AudioFileInfo = {}
  startInSourceSeconds : number = 0
  startTimeSeconds : number = 0
  durationSeconds : number = 1
  reversed : boolean = false

  /**
   * Check the AudioFile for potential problems. If problems are found, return
   * an error message string. Otherwise, return null
   */
  check() : string|null {
    if (typeof this.path !== 'string' || this.path === '') {
      return 'AudioFile technique is missing a path'
    }

    if (this.reversed && !this.info.duration) {
      return 'Audio file is reversed, but has no duration'
    }

    if (this.mode === AudioFileMode.OneShot && typeof this.info.duration !== 'number') {
      return 'AudioFile techniques cannot have .mode=OneShot without specifying an info.duration'
    }

    return null
  }
}

/**
 * resolveFades is used internally to account for the case when an audio file's
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