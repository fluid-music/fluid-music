export const linear = (min : number, max: number) => (v: number) => (v - min) / (max - min);
export const map = (v: number, min: number, max : number) => linear(min, max)(v);
export const percent = linear(0, 100);

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
  nth? : bigint;
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
 * Found in NoteLibraries and EventLibraries. Plugin adapters should have static
 * helper methods for generating PluginAutomationEvents.
 *
 * @param value The exact type of this `value` depends on the `.param`. It is
 * assumed that value is an explicit value. If the `.param` contains specifies
 * a method for normalizing `value`, then the automation event will result in
 * a PluginParameterState with a `.normalizedValue` property.
 */
export interface PluginAutomationEvent extends AutomationPoint {
  readonly type : string;
  pluginSelector: PluginSelector;
  paramKey: string;
  startTime: number;
  duration: number;
  curve: number;
  value?: number;
}

/**
 * Found in plugin instances
 */
export interface PluginParameterState {
  normalizedValue? : number;
  explicitValue? : number;
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
export interface AutoMaker {
  (value: any): PluginAutomationEvent;
}
export interface AutoMakerLibrary {
  [key: string]: AutoMaker;
}

/**
 * AutomationPoint object exist in an automation lane, Note that this is different
 * from an AutomationEvent, which are can be found in NoteLibraries and Clips.
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

  constructor (
    public readonly pluginName : string,
    public readonly pluginType : PluginType,
  ) { }

  /**
   * Get as much information as possible about the state of a parameter.
   *
   * @param key the JavaScript friendly parameter identifier.
   */
  getParameterState(key : string) : PluginParameterState {
    const state : PluginParameterState = {};

    if (!this.parameters.hasOwnProperty(key))
      return state;

    state.explicitValue = this.parameters[key];

    if (this.parameterLibrary.hasOwnProperty(key)) {
      const param = this.parameterLibrary[key];
      if (param.normalize && typeof state.explicitValue === 'number') {
        state.normalizedValue = param.normalize(state.explicitValue);
      }
    }

    return state;
  }

  getNormalizedValue(paramKey : string, value: number) {
    if (this.parameterLibrary.hasOwnProperty(paramKey)) {
      const param = this.parameterLibrary[paramKey];
      if (param.normalize) {
        return param.normalize(value);
      }
    }
    return null;
  }

  /**
   * There are two ways to identify a plugin parameter
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
   * @param key the JavaScript friendly parameter identifier
   */
  getParameterName(key : string) : string {
    return (this.parameterLibrary.hasOwnProperty(key))
      ? this.parameterLibrary[key].name
      : key;
  }
}
