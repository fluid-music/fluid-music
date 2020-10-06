import { ClipEventContext } from './ts-types'
import { AutomationPoint } from './plugin'

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

  d : any; // Dynamic object
  process? : {(context : ClipEventContext) : null|FluidEvent|EventBase|any[]}
}

export interface EventClass { new(...options: any[]): EventBase }

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

  deepCopy<E extends EventBase> (updates : object = {}, ...rest) {
    const args = Object.assign({}, this)
    return new (this.constructor as any)(Object.assign(args, updates), ...rest) as E
  }

  process (context : ClipEventContext) : null|FluidEvent|EventBase|any[] {
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
 */
export class EventAudioFile extends EventBase {
  // mandatory members
  path : string

  // members with default values
  fadeOutSeconds : number = 0
  fadeInSeconds : number = 0
  oneShot : boolean = false
  info : object = {}

  constructor (options : EventAudioFileOptions) {
    super(options)
    this.path = options.path
    if (typeof options.fadeInSeconds === 'number') this.fadeInSeconds = options.fadeInSeconds
    if (typeof options.fadeOutSeconds === 'number') this.fadeOutSeconds = options.fadeOutSeconds
    if (typeof options.oneShot === 'boolean') this.oneShot = options.oneShot
    if (options.info) this.info = options.info
  }

  process (context : ClipEventContext) {
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
  info? : object
}


/**
 * A midi note within a midi clip.
 */
export class EventMidiNote extends EventBase {
  // mandatory members
  note : number

  // members with default values
  velocity : number = 64

  constructor(options : EventMidiNoteOptions) {
    super(options)
    // For backwards compatibility
    if (typeof options.n === 'number' && typeof options.note !== 'number') options.note = options.n
    if (typeof options.v === 'number' && typeof options.velocity !== 'number') options.velocity = options.v

    this.note = options.note
    if (typeof options.velocity === 'number') this.velocity = options.velocity
  }

  process (context : ClipEventContext) {
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

  process (context : ClipEventContext) {
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

  process (context : ClipEventContext) {
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

  process (context : ClipEventContext) {
    const changes : EventBaseOptions = {
      startTime: this.startTime,
      duration: this.duration,
    }
    if (this.d) changes.d = this.d

    return this.events.map((event) : any => {
      if (event instanceof EventBase) return event.deepCopy(changes)
      return event
    })
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

  process(context : ClipEventContext) {
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