import { PluginType, FluidPlugin } from '../FluidPlugin';
import { PluginAutomation } from '../techniques';
const pluginName = 'DragonflyHallReverb'
const pluginType = PluginType.VST2

export interface DragonflyHallVst2Parameters {
  /** percent value from 0 to 100 */
  dryLevelPercent? : number;
  /** percent value from 0 to 100 */
  earlyLevelPercent? : number;
  /** percent value from 0 to 100 */
  lateLevelPercent? : number;
  /** meters value from 10 to 60 */
  sizeMeters? : number;
  /** percent value from 50 to 150 */
  widthPercent? : number;
  /** ms value from 0 to 100 */
  predelayMs? : number;
  /** percent value from 0 to 100 */
  diffusePercent? : number;
  /** hz value from 0 to 200 */
  lowCutHz? : number;
  /** hz value from 200 to 1200 */
  lowCrossHz? : number;
  /** x value from 0.5 to 2.5 */
  lowMultX? : number;
  /** hz value from 1000 to 16000 */
  highCutHz? : number;
  /** hz value from 1000 to 16000 */
  highCrossHz? : number;
  /** x value from 0.2 to 1.2 */
  highMultX? : number;
  /** hz value from 0 to 10 */
  spinHz? : number;
  /** ms value from 0 to 40 */
  wanderMs? : number;
  /** seconds value from 0.1 to 10 */
  decaySeconds? : number;
  /** percent value from 0 to 100 */
  earlySendPercent? : number;
  /** percent value from 0 to 100 */
  modulationPercent? : number;
}
const parameterLibrary = {
  dryLevelPercent: { name: 'Dry Level', index: 0, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  earlyLevelPercent: { name: 'Early Level', index: 1, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  lateLevelPercent: { name: 'Late Level', index: 2, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  sizeMeters: { name: 'Size', index: 3, isLinear: true, range: [10, 60] as [number, number], units: 'meters' },
  widthPercent: { name: 'Width', index: 4, isLinear: true, range: [50, 150] as [number, number], units: 'percent' },
  predelayMs: { name: 'Predelay', index: 5, isLinear: true, range: [0, 100] as [number, number], units: 'ms' },
  diffusePercent: { name: 'Diffuse', index: 6, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  lowCutHz: { name: 'Low Cut', index: 7, isLinear: true, range: [0, 200] as [number, number], units: 'hz' },
  lowCrossHz: { name: 'Low Cross', index: 8, isLinear: true, range: [200, 1200] as [number, number], units: 'hz' },
  lowMultX: { name: 'Low Mult', index: 9, isLinear: true, range: [0.5, 2.5] as [number, number], units: 'x' },
  highCutHz: { name: 'High Cut', index: 10, isLinear: true, range: [1000, 16000] as [number, number], units: 'hz' },
  highCrossHz: { name: 'High Cross', index: 11, isLinear: true, range: [1000, 16000] as [number, number], units: 'hz' },
  highMultX: { name: 'High Mult', index: 12, isLinear: true, range: [0.2, 1.2] as [number, number], units: 'x' },
  spinHz: { name: 'Spin', index: 13, isLinear: true, range: [0, 10] as [number, number], units: 'hz' },
  wanderMs: { name: 'Wander', index: 14, isLinear: true, range: [0, 40] as [number, number], units: 'ms' },
  decaySeconds: { name: 'Decay', index: 15, isLinear: true, range: [0.1, 10] as [number, number], units: 'seconds' },
  earlySendPercent: { name: 'Early Send', index: 16, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  modulationPercent: { name: 'Modulation', index: 17, isLinear: true, range: [0, 100] as [number, number], units: 'percent' }
}
const makeAutomation = {
  dryLevelPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'dryLevelPercent',
    });
  },
  earlyLevelPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'earlyLevelPercent',
    });
  },
  lateLevelPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'lateLevelPercent',
    });
  },
  sizeMeters (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'sizeMeters',
    });
  },
  widthPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'widthPercent',
    });
  },
  predelayMs (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'predelayMs',
    });
  },
  diffusePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'diffusePercent',
    });
  },
  lowCutHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'lowCutHz',
    });
  },
  lowCrossHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'lowCrossHz',
    });
  },
  lowMultX (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'lowMultX',
    });
  },
  highCutHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'highCutHz',
    });
  },
  highCrossHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'highCrossHz',
    });
  },
  highMultX (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'highMultX',
    });
  },
  spinHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'spinHz',
    });
  },
  wanderMs (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'wanderMs',
    });
  },
  decaySeconds (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'decaySeconds',
    });
  },
  earlySendPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'earlySendPercent',
    });
  },
  modulationPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      plugin: { pluginName, pluginType },
      paramKey: 'modulationPercent',
    });
  }
}
export class DragonflyHallVst2 extends FluidPlugin {
  constructor(
    public parameters : DragonflyHallVst2Parameters = {},
  ) {
    super(pluginName, pluginType)
    this.vst2.uid = 1684435505
    this.vst2.vendor = 'Michael Willis and Rob vd Berg'
    this.numAudioInputChannels = 2
    this.numAudioOutputChannels = 2
    this.isSynth = false
  }

  readonly parameterLibrary = parameterLibrary;
  readonly makeAutomation = makeAutomation;

  // Static members
  static readonly parameterLibrary = parameterLibrary;
  static readonly makeAutomation = makeAutomation;
}
