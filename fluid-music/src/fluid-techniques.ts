import { ClipEventContext, AudioFileInfo, Technique, MidiNoteEvent, AudioFileEvent } from './fluid-interfaces'
import { FluidTrack } from './FluidTrack'
import { AutomationPoint } from './plugin'
import * as random from './random'

export interface TechniqueClass {
  new(...options: any[]): Technique
}
export interface PluginAutoTechniqueClass extends TechniqueClass {
  new(options: PluginAutoOptions) : Technique
}


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
 * Insert an audio sample into a track
 */
export class AudioFile implements Technique {
  static Modes = AudioFileMode

  /** Filepath of the audio file */
  path : string

  /**
   * When true, the inserted audio file will play to its end instead of obeying
   * event length (default=false)
   */
  oneShot : boolean = false
  fadeOutSeconds : number = 0
  fadeInSeconds : number = 0
  info : AudioFileInfo = {}
  startInSourceSeconds : number = 0
  mode = AudioFile.Modes.Event

  /**
   * Adjust the sample playback level. Unlike gainDb, trimDb is always applied,
   * and will not be overridden when a dynamic object specifies a gain.
   */
  trimDb : number = 0

  /**
   * If present, this overrides any gain value in the Dynamic Object
   */
  gainDb? : number

  constructor (options : AudioFileOptions) {

    if (typeof options.path !== 'string')
      throw new Error('AudioFile Technique constructor did not find an options.path string')

    this.path = options.path
    if (typeof options.gainDb === 'number') this.gainDb = options.gainDb
    if (typeof options.fadeInSeconds === 'number') this.fadeInSeconds = options.fadeInSeconds
    if (typeof options.fadeOutSeconds === 'number') this.fadeOutSeconds = options.fadeOutSeconds
    if (typeof options.startInSourceSeconds === 'number') this.startInSourceSeconds = options.startInSourceSeconds
    if (typeof options.trimDb === 'number') this.trimDb = options.trimDb
    if (options.info) this.info = options.info
    if (options.mode) this.mode = options.mode

    if (this.mode === AudioFileMode.OneShot && typeof this.info.duration !== 'number') {
      throw new Error('AudioFile techniques cannot have .mode=OneShot without specifying an info.duration')
    }
  }

  use (startTime: number, duration : number, context : ClipEventContext) {
    let durationSeconds = duration * 4 * 60 / context.session.bpm
    let startTimeSeconds = (context.clip.startTime + startTime) * 4 * 60 / context.session.bpm
    const fileEvent = this.insertIntoTrack(context.track, startTimeSeconds, durationSeconds)

    if (typeof this.gainDb === 'number') {
      // just use the default
    } else if (typeof context.d.gainDb === 'number') {
      fileEvent.gainDb = this.trimDb + context.d.gainDb
    } else if (typeof context.d.gain === 'number') { // backwards compatibility
      fileEvent.gainDb = this.trimDb + context.d.gain
    }

    return null;
  }

  /**
   * Instantiate an AudioFileEvent, and insert it into `track`.
   * @param track
   * @param startTimeSeconds
   * @param durationSeconds Set the duration (including fades) of the sample.
   *    this value may be overridden depending on the value of .mode property
   *    and the contends of the .info object. For example, objects in OneShot
   *    mode will ignore durationSeconds, and set the length of the audio file
   *    to the length of the underlying audio sample. Objects in OneVoice mode
   *    will fade out at the onset of the next sample on the track.
   */
  insertIntoTrack(track : FluidTrack, startTimeSeconds : number, durationSeconds? : number) {

    if (typeof durationSeconds !== 'number' && this.info.duration) {
      durationSeconds = this.info.duration - this.startInSourceSeconds
    }

    if (this.mode === AudioFile.Modes.Event) {
      // Just use the default
    } else if (this.mode === AudioFile.Modes.OneShot) {
      // in OneShot mode, always use the info.duration
      if (typeof this.info.duration === 'number') {
        durationSeconds = this.info.duration - this.startInSourceSeconds
      } else {
        console.warn('Warning: sample in OneShot mode has unknown length:', this)
      }
    } else if (this.mode === AudioFile.Modes.OneVoice) {
      // The rest of this is handled in the finalizer. As of Nov 6, 2020, the
      // finalizer is hardCoded in Session.processEvents. but I may eventually
      // support custom finalizers, which would be added to the technique
      // (similar to .use method)
    }

    if (typeof durationSeconds !== 'number') {
      throw new Error('AudioFile technique could not figure out a how long this sample should be: ' + JSON.stringify(this))
    }

    if (this.info?.duration) {
      const maxDuration = this.info.duration - this.startInSourceSeconds
      durationSeconds = Math.min(durationSeconds, maxDuration)
    }

    const fileEvent : AudioFileEvent = {
      startTimeSeconds,
      durationSeconds,
      gainDb: this.trimDb,
      path: this.path,
      fadeInSeconds: this.fadeInSeconds,
      fadeOutSeconds: this.fadeOutSeconds,
      startInSourceSeconds: this.startInSourceSeconds,
      mode: this.mode,
      info: this.info,
    }

    if (typeof this.gainDb === 'number') fileEvent.gainDb += this.gainDb

    track.fileEvents.push(fileEvent)
    return fileEvent;
  }
}

export interface AudioFileOptions {
  path : string
  fadeOutSeconds? : number
  fadeInSeconds? : number
  startInSourceSeconds? : number
  info? : AudioFileInfo
  gainDb? : number
  trimDb? : number
  mode? : AudioFileMode
}


/**
 * A midi note within a midi clip.
 */
export class MidiNote implements Technique {
  /**
   * Midi note number - 60 = C4 = Middle C
   */
  note : number

  /**
   * If present, velocity overrides a velocity found in a .d object
   */
  velocity? : number

  constructor(options : MidiNoteOptions) {
    // For backwards compatibility
    if (typeof options.n === 'number' && typeof options.note !== 'number') options.note = options.n
    if (typeof options.v === 'number' && typeof options.velocity !== 'number') options.velocity = options.v

    this.note = options.note
    if (typeof options.velocity === 'number') this.velocity = options.velocity
  }

  use (startTime : number, duration : number, context : ClipEventContext) {
    const midiNoteEvent : MidiNoteEvent = {
      startTime,
      duration,
      note: this.note,
      velocity : 64
    }
    if (typeof this.velocity === 'number') midiNoteEvent.velocity = this.velocity
    else if (typeof context.d.velocity === 'number') midiNoteEvent.velocity = context.d.velocity
    else if (typeof context.d.v === 'number') midiNoteEvent.velocity = context.d.v

    context.clip.midiEvents.push(midiNoteEvent)

    return null;
  }
}
export interface MidiNoteOptions {
  note : number
  velocity? : number
  n? : number
  v? : number
}


/**
 *  Inserts an automation point for a specific plugin on an arbitrary track
 */
export class PluginAuto implements Technique {
  // Mandatory members
  pluginSelector : PluginSelector
  paramKey : string

  // members with default values
  value : number = 0
  curve : number = 0

  constructor (options : PluginAutoOptions) {
    if (!options.pluginSelector)
      throw new Error('Cannot create PluginAuto technique without .pluginSelector')

    this.pluginSelector = Object.assign({}, options.pluginSelector)
    this.paramKey = options.paramKey // ex: 'sizeMeters'
    if (typeof options.value === 'number') this.value = options.value
    if (typeof options.curve === 'number') this.curve = options.curve
  }

  use (startTime : number, duration : number, context : ClipEventContext) {
    startTime = (context.clip.startTime as number) + startTime;
    const point : AutomationPoint = {
      startTime,
      value: this.value,
      curve: this.curve,
    };

    const nth     = this.pluginSelector.nth || 0;
    const matches = context.track.plugins.filter(plugin =>
      plugin.pluginName === this.pluginSelector.pluginName &&
      plugin.pluginType === this.pluginSelector.pluginType);

    if (nth >= matches.length) {
      const needed = nth - matches.length + 1;
      if (needed > 0) throw new Error(`${needed} missing ${this.pluginSelector.pluginName} plugins of on ${context.track.name} track`);
    }

    const plugin = matches[nth];
    const automation = plugin.automation;

    if (!automation.hasOwnProperty(this.paramKey))
      automation[this.paramKey] = { points: [] };

    automation[this.paramKey].points.push(point);

    return null
  }
}
export interface PluginAutoOptions extends AutoOptions {
  pluginSelector : PluginSelector
}

/**
 * Identifies a plugin on an arbitrary track
 */
export interface PluginSelector {
  pluginName : string

  /** ex: 'VST2', 'VST3', 'AudioUnit' */
  pluginType : string

  /**
   * The selected track may have multiple plugins with the same name. Index from
   * within those plugins. Most of the time this isn't needed, because it is
   * unusual to have more than one plugin with the same name on a particular
   * track.
   */
  nth? : number
}


/**
 * An automation event on a track
 */
export class TrackAuto implements Technique {
  paramKey : string
  value : number = 0
  curve : number = 0

  constructor (options : AutoOptions) {
    this.paramKey = options.paramKey
    if (typeof options.value === 'number') this.value = options.value
    if (typeof options.curve === 'number') this.curve = options.curve
  }

  use (startTime : number, duration : number, context : ClipEventContext) {
    startTime = (context.clip.startTime as number) + startTime;
    const point : AutomationPoint = {
      startTime,
      value: (this.value as number),
      curve: 0,
    };

    if (typeof this.curve === 'number') point.curve = this.curve

    const automation = context.track.automation

    if (!automation.hasOwnProperty(this.paramKey))
      automation[this.paramKey] = { points: [] };

    automation[this.paramKey].points.push(point);

    return null
  }
}
export interface AutoOptions {
  paramKey : string
  value? : number
  curve? : number
}


export class MidiChord implements Technique {
  notes : number[]
  name : string = 'midi chord'

  constructor (options : MidiChordOptions) {
    this.notes = options.notes
    if (typeof options.name === 'string') this.name = options.name
  }

  use (startTime : number, duration : number, context : ClipEventContext) {
    for (const note of this.notes) {
      const midiNote = new MidiNote({ note })
      midiNote.use(startTime, duration, context)
    }
  }
}
export interface MidiChordOptions {
  name? : string
  notes : number[]
}


/**
 * For samples that have "Intensity Layers," meaning recordings that were
 * sampled at successive increasing performance intensities
 */
export class ILayers implements Technique {
  layers : Technique[]

  constructor(options : ILayersOptions) {
    this.layers = options.layers
  }

  use (startTime : number, duration : number, context : ClipEventContext) {
    let length = this.layers.length // number of layers
    let index = length - 1          // default to last layer
    let d = Object.assign({}, context.d)

    // Look for an intensity
    if (typeof d.intensity === 'number') {
      index = Math.floor(d.intensity * length)
    }
    // If no intensity was found, look for a velocity
    else if (typeof d.velocity === 'number') {
      index = Math.floor(d.velocity / (127 / this.layers.length))
    } else if (typeof d.v === 'number') {
      index = Math.floor(d.v / (127 / this.layers.length))
    }

    const technique = this.layers[ILayers.clamp(0, length-1, index)]
    technique.use(startTime, duration, context)
  }

  static clamp(min: number, max: number, value: number) {
    if (min > max) [min, max] = [max, min]
    return Math.max(Math.min(value, max), min)
  }
}
export interface ILayersOptions {
  layers : Technique[]
}

/**
 * Randomly chooses a technique from an array of choices
 */
export class Random implements Technique {
  choices : Technique[]

  constructor (options : RandomOptions) {
    if (options.choices.length < 1) {
      throw new Error('Random Technique needs at least one choice')
    }

    for (const choice of options.choices) {
      if (typeof choice.use !== 'function') {
        throw new Error('Random Technique got an invalid choice: ' + JSON.stringify(choice))
      }
    }
    this.choices = options.choices
  }

  use (startTime : number, duration : number, context : ClipEventContext) {
    const technique = random.choice(this.choices)
    return technique.use(startTime, duration, context)
  }
}
export interface RandomOptions {
  choices : Technique[]
}