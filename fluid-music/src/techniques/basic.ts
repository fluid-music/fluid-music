import { Technique, MidiNoteEvent, UseContext } from '../fluid-interfaces'
import { AutomationPoint } from '../FluidPlugin'
import * as random from '../random'

export interface TechniqueClass {
  new(...options: any[]): Technique
}
export interface PluginAutoTechniqueClass extends TechniqueClass {
  new(options: PluginAutoOptions) : Technique
}

/**
 * A midi note within a midi clip.
 */
export class MidiNote implements Technique {

  constructor(options : MidiNoteOptions) {
    // For backwards compatibility
    if (typeof options.n === 'number' && typeof options.note !== 'number') options.note = options.n
    if (typeof options.v === 'number' && typeof options.velocity !== 'number') options.velocity = options.v

    this.note = options.note
    if (typeof options.velocity === 'number') this.velocity = options.velocity
  }

  /**
   * Midi note number: 60 == C4 == Middle C
   */
  note : number

  /**
   * If present, velocity overrides a velocity found in a .d object
   */
  velocity? : number

  use (context : UseContext) {
    if (!context.clip) throw new Error('Cannot .use MidiNote without a clip: ' + JSON.stringify({ note: this, context }))

    const { d, startTime, clip, duration } = context
    const midiNoteEvent : MidiNoteEvent = {
      startTime: startTime - clip.startTime,
      duration,
      note: this.note,
      velocity : 64
    }
    if (typeof this.velocity === 'number') midiNoteEvent.velocity = this.velocity
    else if (typeof d.velocity === 'number') midiNoteEvent.velocity = d.velocity
    else if (typeof d.v === 'number') midiNoteEvent.velocity = d.v

    clip.midiEvents.push(midiNoteEvent)

    return null
  }
}
export interface MidiNoteOptions {
  note : number
  velocity? : number
  n? : number
  v? : number
}

/**
 * Inserts an automation point for a specific plugin on an arbitrary track
 */
export class PluginAutomation implements Technique {

  constructor (options : PluginAutoOptions) {
    if (!options.pluginSelector)
      throw new Error('Cannot create PluginAuto technique without .pluginSelector')

    this.pluginSelector = Object.assign({}, options.pluginSelector)
    this.paramKey = options.paramKey // ex: 'sizeMeters'
    if (typeof options.value === 'number') this.value = options.value
    if (typeof options.curve === 'number') this.curve = options.curve
  }

  // Mandatory members
  pluginSelector : PluginSelector
  paramKey : string

  // members with default values
  value : number = 0
  curve : number = 0

  use ({ track, startTime } : UseContext) {

    const point : AutomationPoint = {
      startTime,
      value: this.value,
      curve: this.curve,
    }

    const nth     = this.pluginSelector.nth || 0
    const matches = track.plugins.filter(plugin =>
      plugin.pluginName === this.pluginSelector.pluginName &&
      plugin.pluginType === this.pluginSelector.pluginType);

    if (nth >= matches.length) {
      const needed = nth - matches.length + 1
      if (needed > 0) throw new Error(`${needed} missing ${this.pluginSelector.pluginName} plugins of on ${track.name} track`)
    }

    const plugin = matches[nth]
    const automation = plugin.automation

    if (!automation.hasOwnProperty(this.paramKey))
      automation[this.paramKey] = { points: [] }

    automation[this.paramKey].points.push(point)

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
export class TrackAutomation implements Technique {
  paramKey : string
  value : number = 0
  curve : number = 0

  constructor (options : AutoOptions) {
    this.paramKey = options.paramKey
    if (typeof options.paramKey !== 'string') throw new Error('TrackAutomation constructor missing paramKey:'+JSON.stringify(options))
    if (typeof options.value === 'number') this.value = options.value
    if (typeof options.curve === 'number') this.curve = options.curve
  }

  use ({ startTime, track } : UseContext) {
    const point : AutomationPoint = {
      startTime,
      value: (this.value as number),
      curve: 0,
    }

    if (typeof this.curve === 'number') point.curve = this.curve

    const automation = track.automation

    if (!automation.hasOwnProperty(this.paramKey))
      automation[this.paramKey] = { points: [] }

    automation[this.paramKey].points.push(point)

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

  use (context : UseContext) {
    for (const note of this.notes) {
      const midiNote = new MidiNote({ note })
      midiNote.use(context)
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

  use (context : UseContext) {
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
    technique.use(context)
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

  use (context : UseContext) {
    const technique = random.choice(this.choices)
    return technique.use(context)
  }
}
export interface RandomOptions {
  choices : Technique[]
}