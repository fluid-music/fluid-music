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

export interface EventAudioFileOptions extends EventBaseOptions {
  path : string
  fadeOutSeconds? : number
  fadeInSeconds? : number
  oneShot? : boolean
  info? : object
}

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


export interface EventMidiNoteOptions extends EventBaseOptions {
  note : number
  velocity? : number
}

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