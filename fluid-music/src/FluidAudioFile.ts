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
  trimDb? : number
  mode? : AudioFileMode
  info? : AudioFileInfo
  startInSourceSeconds? : number
  startTimeSeconds? : number
  durationSeconds? : number
}

export class FluidAudioFile {
  constructor(options : AudioFileOptions) {
    if (typeof options.path !== 'string') {
      throw new Error('AudioFile Technique constructor did not find an options.path string')
    }

    if (this.mode === AudioFileMode.OneShot && typeof this.info.duration !== 'number') {
      throw new Error('AudioFile techniques cannot have .mode=OneShot without specifying an info.duration')
    }

    Object.assign(this, options)
  }

  static Modes = AudioFileMode

  path : string = ''
  fadeOutSeconds : number = 0
  fadeInSeconds : number = 0
  gainDb? : number
  trimDb : number = 0
  mode : AudioFileMode = AudioFileMode.Event
  info : AudioFileInfo = {}
  startInSourceSeconds : number = 0
  startTimeSeconds : number = 0
  durationSeconds : number = 1
}