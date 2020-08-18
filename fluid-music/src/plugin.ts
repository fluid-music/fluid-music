const linear = (min, max) => (v) => (v - min) / (max - min);
const map = (v, min, max) => linear(min, max)(v);
const percent = linear(0, 100);

enum PluginType {
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
interface PluginSelector {
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
interface PluginParameter {
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
interface PluginParameterLibrary {
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
interface PluginAutomationEvent {
  readonly type : string;
  plugin: PluginSelector;
  param: PluginParameter;
  startTime: number;
  duration: number;
  curve: number;
  value?: number;
}

/**
 * Found in plugin instances
 */
interface PluginParameterState {
  normalizedValue? : number;
  explicitValue? : number;
}

/**
 * A partial set storing the state of plugin parameters
 */
interface PluginParameterState {
  [key : string]: any;
}

/**
 * @param
 */
interface PluginInstance {
  readonly pluginName: string,
  readonly pluginType: PluginType,
  readonly parameters: PluginParameterState,
}
