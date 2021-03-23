import { clamp } from '../converters'
import { Technique, MidiNoteEvent, UseContext } from '../fluid-interfaces'
import { FluidMidiClip } from '../FluidMidiClip'
import * as random from '../random'

export interface TechniqueClass {
  new(...options: any[]): Technique
}

/**
 * A midi note within a midi clip.
 */
export class MidiNote implements Technique {

  constructor(optionsOrNoteNumber : MidiNoteOptions|number) {
    const options = (typeof optionsOrNoteNumber === 'number') ? { note: optionsOrNoteNumber } : optionsOrNoteNumber

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

    const { d, startTime, clip, duration, data, session } = context
    const midiNoteEvent : MidiNoteEvent = {
      startTime: startTime - clip.startTime,
      duration,
      note: this.note,
      velocity : 64
    }

    if (typeof this.velocity === 'number') midiNoteEvent.velocity = this.velocity
    else if (typeof d.velocity === 'number') midiNoteEvent.velocity = d.velocity
    else if (typeof d.v === 'number') midiNoteEvent.velocity = d.v
    else if (typeof d.intensity === 'number') midiNoteEvent.velocity = clamp(1, 127, Math.round(d.intensity * 126) + 1)

    if (!data.midiClipsPerTrack) data.midiClipsPerTrack = new Map()

    let midiClip = data.midiClipsPerTrack.get(context.track)
    if (!midiClip) {
      midiClip = new FluidMidiClip()
      midiClip.startTimeSeconds = session.timeWholeNotesToSeconds(clip.startTime)
      midiClip.durationSeconds = session.timeWholeNotesToSeconds(clip.duration)
      data.midiClipsPerTrack.set(context.track, midiClip)
      context.track.midiClips.push(midiClip)
    }

    midiClip.events.push(midiNoteEvent)
    return null
  }
}
export interface MidiNoteOptions {
  note : number
  velocity? : number
  n? : number
  v? : number
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

/**
 * Nudge wraps around a child technique. When Nudge is "used" offset the child
 * technique on the timeline by adjusting the [[UseContext]] object's
 * `.startTime` and `.startTimeSeconds` properties.
 */
export class Nudge implements Technique {
  technique : Technique
  nudgeTimeSeconds : number

  constructor(nudgeTimeSeconds : number, technique : Technique) {
    this.technique = technique
    this.nudgeTimeSeconds = nudgeTimeSeconds
  }

  use(context : UseContext) {
    const newContext = {...context}
    newContext.startTimeSeconds = context.startTimeSeconds + this.nudgeTimeSeconds
    newContext.startTime = context.startTime + context.session.timeSecondsToWholeNotes(this.nudgeTimeSeconds)
    this.technique.use(newContext)
  }
}