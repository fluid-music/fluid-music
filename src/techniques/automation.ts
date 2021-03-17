import { Technique, TrackReceive, UseContext } from '../fluid-interfaces'
import { AutomationPoint } from '../FluidPlugin'
import { FluidTrack, FluidReceive } from '../FluidTrack'
import { TechniqueClass } from './basic'

export interface PluginAutoTechniqueClass extends TechniqueClass {
  new(options: PluginAutoOptions) : Technique
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

  use ({ startTimeSeconds, track } : UseContext) {
    const point : AutomationPoint = {
      startTimeSeconds,
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

  use ({ track, startTimeSeconds } : UseContext) {

    const point : AutomationPoint = {
      startTimeSeconds,
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

export class SendAutomation implements Technique {
  /** The destination track */
  private destinationTrack? : FluidTrack
  private unresolvedTrackName? : string

  /** gain in dB */
  value : number = 0
  curve : number = 0

  constructor(options : SendAutoOptions) {
    if (options.to instanceof FluidTrack) this.destinationTrack = options.to
    else if (typeof options.to === 'string') this.unresolvedTrackName = options.to
    else throw new Error('send automation options.to must be a FluidTrack OR a track name string')

    if (typeof options.value === 'number') this.value = options.value
    if (typeof options.curve === 'number') this.curve = options.curve
  }

  use(context : UseContext) {
    if (!this.destinationTrack) {
      if (!this.unresolvedTrackName) throw new Error('Cannot use SendAutomation technique with unspecified track')
      const track = context.session.getTrackByName(this.unresolvedTrackName)
      if (!track) throw new Error(`SendAutomation used, but '${this.unresolvedTrackName}' track not found in session`)
      this.destinationTrack = track
    }

    const destinationTrack = this.destinationTrack
    const sourceTrack = context.track
    // check if a send is already setup
    let receive : FluidReceive|undefined
    for (const existingReceive of destinationTrack.receives) {
      if (existingReceive.from === sourceTrack) {
        receive = existingReceive
        break
      }
    }

    if (!receive) {
      receive = new FluidReceive({ from: sourceTrack })
      destinationTrack.receives.push(receive)
    }
    // At this point, we have everything we need: sourceTrack, destinationTrack, and receive
    receive.automation.gainDb.points.push({
      startTimeSeconds: context.startTimeSeconds,
      value: this.value,
      curve: this.curve
    })
  }
}
export interface SendAutoOptions extends AutoOptions {
  to: string|FluidTrack
}