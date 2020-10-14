import { ClipEventContext, DynamicObject, ClipEvent, AudioFileInfo } from './fluid-interfaces'
import { AutomationPoint } from './plugin'
import * as random from './random'

export interface FluidEvent {
  readonly type : string;
  startTime? : number;
  duration? : number;
  [key: string] : any;

  d? : DynamicObject; // Dynamic object
}

export interface TechniqueClass { new(...options: any[]): TechniqueBase }
export type UseResult = ClipEvent|ClipEvent[]|null

/**
 * Helper for copying Technique instances.
 * - Arrays will be copied at any depth
 * - EventBase instances will be copied with '.deepCopy'
 * - Simple objects will be shallow copied
 *
 * @param technique
 * @param changes
 */
export function copyTechnique(technique : TechniqueBase|{[key:string]:any}, changes : {[key: string] : any}) {
  if (Array.isArray(technique)) return technique.map(e => copyTechnique(e, changes))
  if (technique instanceof TechniqueBase) return technique.deepCopy(changes)
  if (typeof technique === 'object') return Object.assign(Object.assign({}, technique), changes)
  return technique
}

/**
 * Base class for internal event types.
 */
export class TechniqueBase implements FluidEvent {
  startTime : number = 0
  duration : number = 0
  d : any = {}

  constructor (options : TechniqueOptions) {
    if (typeof options.startTime === 'number') this.startTime = options.startTime
    if (typeof options.duration === 'number') this.duration = options.duration
    if (options.d) this.d = Object.assign({}, options.d)
  }

  get type() : string {
    return this.constructor.name
  }

  deepCopy<E extends TechniqueBase> (updates : object = {}, ...rest) : E {
    const args = Object.assign({}, this)
    return new (this.constructor as any)(Object.assign(args, updates), ...rest) as E
  }

  use (startTime : number, duration: number, context : ClipEventContext) : UseResult {
    if (this.type === TechniqueBase.name)
      console.warn(`WARNING: Unused ${TechniqueBase.name} Technique`)
    else
      console.warn(`WARNING: Custom Technique type (${this.constructor.name}) is missing an event.use(startTime, duration, context) method`)
    return null
  }
}

export interface TechniqueOptions {
  startTime? : number
  duration? : number
  d? : any
}


/**
 * An audio sample on a track
 * @member info file details provided by the music-metadata npm package - info
 * is not currently guaranteed to be present on every `file` event. It includes
 *      duration: 2.99, // source audio file duration in seconds
 *      bitsPerSample: 16,
 *      sampleRate: 44100,
 *      numberOfChannels: 1,
 */
export class AudioFile extends TechniqueBase {
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

  constructor (options : AudioFileOptions) {
    super(options)

    if (typeof options.path !== 'string')
      throw new Error('AudioFile Technique constructor did not find an options.path string')

    this.path = options.path
    if (typeof options.fadeInSeconds === 'number') this.fadeInSeconds = options.fadeInSeconds
    if (typeof options.fadeOutSeconds === 'number') this.fadeOutSeconds = options.fadeOutSeconds
    if (typeof options.oneShot === 'boolean') this.oneShot = options.oneShot
    if (typeof options.startInSourceSeconds === 'number') this.startInSourceSeconds = options.startInSourceSeconds
    if (options.info) this.info = options.info
  }

  use (startTime: number, duration : number, context : ClipEventContext) {
    const fileEvent = {
      startTime,
      duration,
      d: Object.assign({}, context.d),
      path: this.path,
      fadeInSeconds: this.fadeInSeconds,
      fadeOutSeconds: this.fadeOutSeconds,
      startInSourceSeconds: this.startInSourceSeconds,
      oneShot: this.oneShot,
      info: this.info,
    }

    context.clip.fileEvents.push(fileEvent)
    return null;
  }
}
export interface AudioFileOptions extends TechniqueOptions {
  path : string
  fadeOutSeconds? : number
  fadeInSeconds? : number
  startInSourceSeconds? : number
  oneShot? : boolean
  info? : AudioFileInfo
}


/**
 * A midi note within a midi clip.
 */
export class MidiNote extends TechniqueBase {
  /**
   * Midi note number - 60 = C4 = Middle C
   */
  note : number

  /**
   * If present, velocity overrides a velocity found in a .d object
   */
  velocity? : number

  constructor(options : MidiNoteOptions) {
    super(options)
    // For backwards compatibility
    if (typeof options.n === 'number' && typeof options.note !== 'number') options.note = options.n
    if (typeof options.v === 'number' && typeof options.velocity !== 'number') options.velocity = options.v

    this.note = options.note
    if (typeof options.velocity === 'number') this.velocity = options.velocity
  }

  use (startTime : number, duration : number, context : ClipEventContext) {
    const midiNoteEvent = this.deepCopy({ startTime, duration, d: context.d })
    context.clip.midiEvents.push(midiNoteEvent)
    return null;
  }
}
export interface MidiNoteOptions extends TechniqueOptions {
  note : number
  velocity? : number
  n? : number
  v? : number
}


/**
 * The `pluginAuto` note type represents an an automation point for a specific
 * plugin on an arbitrary audio track.
 */
export class PluginAuto extends TechniqueBase {
  // Mandatory members
  pluginSelector : PluginSelector
  paramKey : string

  // members with default values
  value : number = 0
  curve : number = 0

  constructor (options : PluginAuto) {
    super(options)
    this.pluginSelector = Object.assign({}, options.pluginSelector)
    this.paramKey = options.paramKey // ex: 'sizeMeters'
    if (typeof options.value === 'number') this.value = options.value
    if (typeof options.curve === 'number') this.curve = options.curve
  }

  use (startTime : number, duration : number, context : ClipEventContext) {
    startTime = (context.clip.startTime as number) + startTime;
    const point : AutomationPoint = {
      startTime,
      value: (this.value as number),
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

export interface PluginAutoOptions extends TechniqueOptions {
  pluginSelector : PluginSelector
  paramKey : string
  value? : number
  curve? : number
}

/**
 * Identifies a plugin on an arbitrary track
 * @member name
 * @member type ex: 'VST2', 'VST3', 'AudioUnit'
 * @member nth The selected track may have multiple plugins with the same name.
 *    Index from within those plugins. Most of the time this isn't needed,
 *    because it is unusual to have more than one plugin with a given name on a
 *    particular track.
 */
export interface PluginSelector {
  pluginName : string
  pluginType : string
  nth? : number
}


/**
 * An automation event on a track
 */
export class TrackAuto extends TechniqueBase {
  paramKey : string
  value : number = 0
  curve : number = 0

  constructor (options : TrackAutoOptions) {
    super(options)
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
export interface TrackAutoOptions extends TechniqueOptions {
  paramKey : string
  value? : number
  curve? : number
}


export class MidiChord extends TechniqueBase {
  notes : number[]
  name : string = 'midi chord'

  constructor (options : MidiChordOptions) {
    super(options)
    this.notes = options.notes
    if (typeof options.name === 'string') this.name = options.name
  }

  use (startTime : number, duration : number, context : ClipEventContext) {
    const changes : MidiNoteOptions = {
      note: -1,
      d : context.d,
    }

    for (const note of this.notes) {
      const midiNote = new MidiNote({ note })
      midiNote.use(startTime, duration, context)
    }

    return null
  }
}
export interface MidiChordOptions extends TechniqueOptions {
  name? : string
  notes : number[]
}


/**
 * For samples that have "Intensity Layers," meaning recordings that were
 * sampled at successive increasing performance intensities
 */
export class ILayers extends TechniqueBase {
  layers : TechniqueBase[]

  constructor(options : ILayersOptions) {
    super(options)
    this.layers = options.layers
  }

  use (startTime : number, duration : number, context : ClipEventContext) {
    let length = this.layers.length // number of layers
    let index = length - 1          // default to last layer

    // Look for an intensity
    if (this.d && typeof(this.d.intensity) === 'number') {
      index = Math.floor(this.d.intensity * length)
    }
    // If no intensity was found, look for a velocity
    else if (this.d && typeof this.d.v === 'number') {
      index = Math.floor(this.d.v / (127 / this.layers.length))
    }

    const technique = this.layers[ILayers.clamp(0, length-1, index)]
    if (technique instanceof TechniqueBase) {
      return technique.use(startTime, duration, context)
    }

    return {
      startTime,
      duration,
      d : Object.assign({}, context.d),
      technique
    }
  }

  static clamp(min: number, max: number, value: number) {
    if (min > max) [min, max] = [max, min]
    return Math.max(Math.min(value, max), min)
  }
}
export interface ILayersOptions extends TechniqueOptions {
  layers : TechniqueBase[]
}

/**
 * Randomly chooses a technique from an array of choices
 */
export class Random extends TechniqueBase {
  choices : TechniqueBase[]

  constructor (options : RandomOptions) {
    if (options.choices.length < 1) {
      throw new Error('Random Technique needs at least one choice')
    }

    for (const choice of options.choices) {
      if (typeof choice.use !== 'function') {
        throw new Error('Random Technique got an invalid choice: ' + JSON.stringify(choice))
      }
    }

    super(options)
    this.choices = options.choices
  }

  use (startTime : number, duration : number, context : ClipEventContext) {
    const technique = random.choice(this.choices)
    if (technique instanceof TechniqueBase) {
      return technique.use(startTime, duration, context)
    }

    return {
      startTime,
      duration,
      d : Object.assign({}, context.d),
      technique
    }
  }
}
export interface RandomOptions extends TechniqueOptions {
  choices : TechniqueBase[]
}