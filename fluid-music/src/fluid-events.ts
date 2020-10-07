import { ClipEventContext } from './fluid-interfaces'
import { AutomationPoint } from './plugin'
import * as random from './random'

/**
* @typedef {Object} FluidEvent
* @member type String indicating the type of event
* @member startTime
* @member duration
* @member d
*/
export interface FluidEvent {
  readonly type : string;
  startTime? : number;
  duration? : number;
  [key: string] : any;

  d? : any; // Dynamic object
  process? : {(context : ClipEventContext) : null|FluidEvent|EventBase|any[]}
}

export interface EventClass { new(...options: any[]): EventBase }
export type ProcessResult = null|FluidEvent|EventBase|(FluidEvent|EventBase)[]
/**
 * Helper for copying events.
 * - Arrays will be copied at any depth
 * - EventBase instances will be copied with '.deepCopy'
 * - Simple object will be shallow copied
 *
 * @param event
 * @param changes
 */
export function copyEvent(event : EventBase|{[key:string]:any}, changes : {[key: string] : any}) {
  if (Array.isArray(event)) return event.map(e => copyEvent(e, changes))
  if (event instanceof EventBase) return event.deepCopy(changes)
  if (typeof event === 'object') return Object.assign(Object.assign({}, event), changes)
  return event
}

/**
 * Base class for internal event types.
 */
export class EventBase implements FluidEvent {
  startTime : number = 0
  duration : number = 0
  d : any = {}

  constructor (options : EventBaseOptions) {
    if (typeof options.startTime === 'number') this.startTime = options.startTime
    if (typeof options.duration === 'number') this.duration = options.duration
    if (options.d) this.d = Object.assign({}, options.d)
  }

  get type() : string {
    return this.constructor.name
  }

  deepCopy<E extends EventBase> (updates : object = {}, ...rest) : E {
    const args = Object.assign({}, this)
    return new (this.constructor as any)(Object.assign(args, updates), ...rest) as E
  }

  process (context : ClipEventContext) : ProcessResult {
    if (this.type === 'EventBase')
      console.warn(`WARNING: Unhandled EventBase Event`)
    else
      console.warn(`WARNING: Custom event type (${this.type}) is missing an event.process(context) method`)
    return null
  }
}

export interface EventBaseOptions {
  startTime? : number
  duration? : number
  d? : any
}


/**
 * An audio sample on a track
 * @member info file detailes provided by the music-metadata npm package - info
 * is not currently guaranteed to be present on every `file` event. It includes
 *      duration: 2.99, // source audio file duration in seconds
 *      bitsPerSample: 16,
 *      sampleRate: 44100,
 *      numberOfChannels: 1,
 */
export class EventAudioFile extends EventBase {
  // mandatory members
  path : string

  // members with default values
  fadeOutSeconds : number = 0
  fadeInSeconds : number = 0
  /**
   * When true, the inserted audio file will play to its end instead of obeying
   * event length (default=false)
   */
  oneShot : boolean = false
  info : {
    [key: string] : any
    duration? : number
    bitsPerSample? : number
    sampleRate? : number
    numberOfChannels? : number
  } = {}

  constructor (options : EventAudioFileOptions) {
    super(options)
    this.path = options.path
    if (typeof options.fadeInSeconds === 'number') this.fadeInSeconds = options.fadeInSeconds
    if (typeof options.fadeOutSeconds === 'number') this.fadeOutSeconds = options.fadeOutSeconds
    if (typeof options.oneShot === 'boolean') this.oneShot = options.oneShot
    if (options.info) this.info = options.info
  }

  process (context : ClipEventContext) : ProcessResult {
    if (!context.clip.fileEvents) context.clip.fileEvents = [];
    context.clip.fileEvents.push(this);
    return null;
  }
}
export interface EventAudioFileOptions extends EventBaseOptions {
  path : string
  fadeOutSeconds? : number
  fadeInSeconds? : number
  oneShot? : boolean
  info? : { [key: string] : any }
}


/**
 * A midi note within a midi clip.
 */
export class EventMidiNote extends EventBase {
  /**
   * Midi note number - 60 = C4 = Middle C
   */
  note : number

  /**
   * If present, velocity overrides any velocity found in a .d object
   */
  velocity? : number

  constructor(options : EventMidiNoteOptions) {
    super(options)
    // For backwards compatibility
    if (typeof options.n === 'number' && typeof options.note !== 'number') options.note = options.n
    if (typeof options.v === 'number' && typeof options.velocity !== 'number') options.velocity = options.v

    this.note = options.note
    if (typeof options.velocity === 'number') this.velocity = options.velocity
  }

  process (context : ClipEventContext) : ProcessResult {
    if (typeof this.note !== 'number' ||
    typeof this.duration !== 'number' ||
    typeof this.startTime !== 'number')
      throw new Error('invalid midiNote event: ' + JSON.stringify(this))

    if (!context.clip.midiEvents) context.clip.midiEvents = []

    context.clip.midiEvents.push(this);
    return null;
  }
}
export interface EventMidiNoteOptions extends EventBaseOptions {
  note : number
  velocity? : number
  n? : number
  v? : number
}


/**
 * The `pluginAuto` note type represents an an automation point for a specific
 * plugin on an arbitrary audio track.
 */
export class EventPluginAuto extends EventBase {
  // Mandatory members
  pluginSelector : PluginSelector
  paramKey : string

  // members with default values
  value : number = 0
  curve : number = 0

  constructor (options : EventPluginAuto) {
    super(options)
    this.pluginSelector = Object.assign({}, options.pluginSelector)
    this.paramKey = options.paramKey // ex: 'sizeMeters'
    if (typeof options.value === 'number') this.value = options.value
    if (typeof options.curve === 'number') this.curve = options.curve
  }

  process (context : ClipEventContext) : ProcessResult {
    const startTime = (context.clip.startTime as number) + (this.startTime as number);
    const point : AutomationPoint = {
      startTime,
      value: (this.value as number),
      curve: 0,
    };

    if (typeof this.curve === 'number') point.curve = this.curve

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

export interface EventPluginAutoOptions extends EventBaseOptions {
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
export class EventTrackAuto extends EventBase {
  paramKey : string
  value : number = 0
  curve : number = 0

  constructor (options : EventTrackAutoOptions) {
    super(options)
    this.paramKey = options.paramKey
  }

  process (context : ClipEventContext) : ProcessResult {
    const startTime = (context.clip.startTime as number) + (this.startTime as number);
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

export interface EventTrackAutoOptions extends EventBaseOptions {
  paramKey : string
  value? : number
  curve? : number
}


export class EventChord extends EventBase {
  events : FluidEvent[]
  name : string = 'chord'
  constructor (options : EventChordOptions) {
    super(options)
    this.events = options.events
    if (typeof options.name === 'string') this.name = options.name
  }

  process (context : ClipEventContext) : ProcessResult {
    const changes : EventBaseOptions = {
      startTime: this.startTime,
      duration: this.duration,
    }
    if (this.d) changes.d = this.d

    return this.events.map(event => copyEvent(event, changes))
  }
}

export interface EventChordOptions extends EventBaseOptions {
  name? : string
  events : FluidEvent[]
}


export class EventMidiChord extends EventBase {
  notes : number[]
  name : string = 'midi chord'

  constructor (options : EventMidiChordOptions) {
    super(options)
    this.notes = options.notes
    if (typeof options.name === 'string') this.name = options.name
  }

  process (context : ClipEventContext) : ProcessResult {
    const changes : EventMidiNoteOptions = {
      note: -1,
      startTime: this.startTime,
      duration: this.duration,
    }
    if (this.d) changes.d = this.d
    return this.notes.map(n => new EventMidiNote(Object.assign(changes, { note: n })))
  }
}

export interface EventMidiChordOptions extends EventBaseOptions {
  name? : string
  notes : number[]
}


/**
 * For samples that have "Intensity Layers," meaning recordings that were
 * sampled at successive increasing performance intensities
 */
export class EventILayers extends EventBase {
  layers : FluidEvent[]

  constructor(options : EventILayersOptions) {
    super(options)
    this.layers = options.layers
  }

  process(context : ClipEventContext) : ProcessResult {
    const changes : any = {
      startTime: this.startTime,
      duration: this.duration,
    }
    if (this.d) changes.d = this.d

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

    let newEvent = this.layers[EventILayers.clamp(0, length-1, index)]
    if (newEvent instanceof EventBase) newEvent = newEvent.deepCopy(changes)
    else {
      newEvent = Object.assign({}, newEvent)
      Object.assign(newEvent, changes)
    }

    return newEvent
  }

  static clamp(min: number, max: number, value: number) {
    if (min > max) [min, max] = [max, min]
    return Math.max(Math.min(value, max), min)
  }
}
export interface EventILayersOptions extends EventBaseOptions {
  layers : FluidEvent[]
}

/**
 * Randomly chooses an Event from an array of choices
 */
export class EventRandom extends EventBase {
  choices : FluidEvent[]
  constructor (options : EventRandomOptions) {
    super(options)
    this.choices = options.choices
  }

  process(context : ClipEventContext) : ProcessResult {
    const changes : any = {
      startTime: this.startTime,
      duration: this.duration,
    }
    if (this.d) changes.d = this.d

    let newEvent = random.choice(this.choices)
    if (newEvent instanceof EventBase) return newEvent.deepCopy(changes)

    newEvent = Object.assign({}, newEvent)
    return Object.assign(newEvent, changes)
  }
}
export interface EventRandomOptions extends EventBaseOptions {
  choices : FluidEvent[]
}