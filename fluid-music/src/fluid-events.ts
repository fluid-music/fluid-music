/* Build in Event classes */

import { FluidEvent } from './ts-types'

/**
 * Base class for internal event types.
 */
export class EventBase implements FluidEvent {
  // readonly type : string = 'base'
  startTime : number = 0
  duration : number = 0
  d : object = {}
  constructor(options : EventBaseOptions) {
    if (typeof options.startTime === 'number') this.startTime = options.startTime
    if (typeof options.duration === 'number') this.duration = options.duration
    if (options.d) this.d = Object.assign({}, options.d)
  }

  get type() : string {
    return this.constructor.name
  }

  deepCopy<E extends EventBase>(updates : object = {}, ...rest) {
    const args = Object.assign({}, this)
    return new (this.constructor as any)(Object.assign(args, updates), ...rest) as E
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

  constructor(options : EventAudioFileOptions) {
    super(options)
    this.path = options.path
    if (typeof options.fadeInSeconds === 'number') this.fadeInSeconds = options.fadeInSeconds
    if (typeof options.fadeOutSeconds === 'number') this.fadeOutSeconds = options.fadeOutSeconds
    if (typeof options.oneShot === 'boolean') this.oneShot = options.oneShot
    if (options.info) this.info = options.info
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
    this.note = options.note
    if (typeof options.velocity === 'number') this.velocity = options.velocity
  }
}
export interface EventMidiNoteOptions extends EventBaseOptions {
  note : number
  velocity? : number
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
  name : string
  type? : string
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

  // Charles: here's how the .process method should work.
  // For each event, if it is:
  // 1) an Object, return the object, and the underlying session
  //    will try to convert it to an Event
  // 2) an EventBase, return a .deepCopy()
}

export interface EventChordOptions extends EventBaseOptions {
  name? : string
  events : FluidEvent[]
}
