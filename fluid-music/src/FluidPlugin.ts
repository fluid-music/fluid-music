export const linear = (min : number, max: number) => (v: number) => (v - min) / (max - min);
export const map = (v: number, min: number, max : number) => linear(min, max)(v);

import { Tap, UnresolvedReceive } from "./fluid-interfaces";
import { PluginAutomation } from "./techniques";
import { FluidReceive, FluidTrack } from "./FluidTrack";

export enum PluginType {
  unknown = 'unknown',
  VST2 = 'VST2',
  VST3 = 'VST3',
  tracktion = 'tracktion',
  AudioUnit = 'AudioUnit',
}

/**
 * Identifies a plugin on a particular audio track
 * @param nth If the track contains multiple instances of the same plugin, the
 *    subsequent versions can be indexed with this. Note that `nth` starts at 0,
 *    so the 1 will refer to the second instance of the plugin, and 2 will refer
 *    to the third instance.
 */
export interface PluginSelector {
  readonly pluginName : string;
  readonly pluginType : PluginType;
  nth? : number;
}

/**
 * PluginParameter helps us transition from user-friendly units like Hertz to
 * normalized values between 0 and 1. To create a VST plugin adapter, we need
 * one PluginParam for every automatable paramter in the plugin. We can write
 * them from scratch, but the fluid engine can also help us generate them
 * automatically.
 *
 * PluginParameter represents the parameter interface, but DOES NOT store the
 * parameter state.
 *
 * @param name The full parameter name as reported by JUCE
 * @param units Examples: 'hz', 'percent', or 'db'
 * @param normalize a function to convert a value in the specified units to (0-1)
 */
export interface PluginParameter {
  readonly name: string;
  readonly units?: string;
  readonly index?: number;
  readonly range?: [number, number];
  readonly isLinear?: boolean;
  // If powerFuncB is present, it indicates that the parameter is mapped with a
  // power function in the form  `ax^b` and this is the exponent. The range and
  // exponent are enough to define and invert the power function. For a generic,
  // parametric power function, see:
  // https://www.desmos.com/calculator/8tnpzmrrgg
  readonly powerFuncB? : number;

  // Non-continuous parameters should have a choices object
  readonly choices? : { [key:string] : number };
  normalize?(input : number) : number;
}

/**
 * PluginParameterLibrary stores the collection of parameters that a plugin
 * adapter knows how to talk to. It includes the available parameters, but never
 * their state.
 *
 * The key is a camelCase version of the parameter name designed to be a
 * javascript friendly way to identify the parameter
 *
 * ```javascript
 * const parameterLibrary = {
 *   dryLevelPercent: {
 *     name: 'Dry Level',
 *     units: 'percent',
 *     normalize: (v) => v * 0.01,
 *   },
 * }
 * ```
 */
export interface PluginParameterLibrary {
  [key : string]: PluginParameter;
}

/**
 * An collection of the plugin's explicit parameter values. It might only hold
 * a subset of the plugin's parameters.
 */
export interface PluginParameterValues {
  [key : string]: any;
}

/**
 * Plugins should have helpers for making automation events
 */
export interface AutoMakerLibrary {
  [key: string]: { (value: any): PluginAutomation };
}

/**
 * AutomationPoint object exist in an automation lane, Note that this is different
 * from an AutomationEvent, which can be found in NoteLibraries and Clips.
 */
export interface AutomationPoint {
  startTime : number;
  curve: number;
  value?: number;
}

export interface AutomationLane {
  points : AutomationPoint[];
}

export interface Automation {
  [key: string] : AutomationLane;
}

export class FluidPlugin {
  static readonly PluginType = PluginType;
  readonly parameters : PluginParameterValues = {};
  readonly parameterLibrary : PluginParameterLibrary = {};
  readonly automation : Automation = {};
  readonly makeAutomation : AutoMakerLibrary = {};

  sidechainReceive? : FluidReceive
  unresolvedSidechainReceive? : UnresolvedReceive

  constructor (
    public readonly pluginName : string,
    public readonly pluginType : PluginType,
  ) { }

  /**
   * If paramKey identifies a plugin parameter, and that parameter has a
   * normalizer, return the normalized value. Otherwise return null.
   */
  getNormalizedValue(paramKey : string, value: number) {
    if (this.parameterLibrary.hasOwnProperty(paramKey)) {
      const param = this.parameterLibrary[paramKey];

      if (param.isLinear && param.range) {
        return map(value, param.range[0], param.range[1])
      }

      if (typeof param.powerFuncB === 'number' && param.range) {
        const [start, end] = param.range
        return Math.pow((value - start)/(end - start), 1/param.powerFuncB)
      }

      // NOTE: when adding normalization options, remember to update the plugin
      // generator if needed. It can make better key names for parameters with
      // known normalizers by adding the units: For example, "attackMS" instead
      // "attack" or "gainDb" instead of "gain".

      if (param.normalize) {
        return param.normalize(value);
      }
    }

    return null;
  }

  /**
   * fluid-music has two ways of identifying a parameter with a string:
   * 1. The javascript friendly "key" (ex: `lfo1Speed`)
   * 2. JUCE's parameter name (ex: `LFO 1: Speed`)
   *
   * This function attempts to get JUCE's name from the key. If the key is not
   * registered on the plugin, just return the `key` argument directly. This
   * behavior is designed to make it possible to use and configure plugins with
   * the FludPlugin base class even when there is no adapter available.
   *
   * When there is no adapter available, you can just set a parameter directly:
   * `pluginInstance.parameters["Wet Level"] = 0.8;
   *
   * @param paramKey the JavaScript friendly parameter identifier
   */
  getParameterName(paramKey : string) : string {
    return (this.parameterLibrary.hasOwnProperty(paramKey))
      ? this.parameterLibrary[paramKey].name
      : paramKey;
  }

  /**
   * VST2 parameters can also be identified by an index. This method returns the
   * index, or returns null if the index is not available.
   *
   * @param paramKey the JavaScript friendly parameter identifier
   */
  getParameterIndex(paramKey : string) {
    if (this.parameterLibrary.hasOwnProperty(paramKey)) {
      const param = this.parameterLibrary[paramKey];
      if (typeof param.index === 'number') {
        return param.index;
      }
    }
    return null;
  }

  /**
   * Specify a sidechain input to the plugin.
   *
   * If the first argument is a name string (not a Track Object), the sidechain
   * routing will be unresolved. To resolve the routing, insert the plugin into
   * a track, and call `.resolveSidechainReceives` on the parent session.
   *
   * `sidechainWith` returns the plugin itself, so you can setup a sidechain
   * compressor like this:
   *
   * ```javascript
   * const session = new FluidSession({}, [
   *  { name: 'kick' },
   *  { name: 'bass', plugins: [compressor.sidechainFrom('kick')]}
   * ])
   * ```
   * Note that sidechains are resolved by the FluidSession constructor, so in
   * the example above, a call to `session.resolveSidechainReceives()` is not
   * necessary.
   *
   * @param track name of the track that will feed the sidechain
   */
  sidechainWith(track : string|FluidTrack) {
    if (typeof track === 'string') {
      this.unresolvedSidechainReceive = { from: track }
    } else if (track instanceof FluidTrack) {
      this.sidechainReceive = new FluidReceive({ from: track })
    } else {
      throw new Error(`sidechainWith received an invalid track: ${track}`)
    }

    return this
  }
}
