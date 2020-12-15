import { PluginType, FluidPlugin } from '../FluidPlugin';
import { PluginAutomation } from '../techniques';
const pluginName = '#TStereo Delay'
const pluginType = PluginType.VST2

export interface TStereoDelayVst2Parameters {
  enable? : number;
  /** db value from -36 to 36 */
  inputDb? : number;
  sync? : number;
  lSource? : number;
  /** percent value from -99 to 99 */
  lFeedbackPercent? : number;
  /** percent value from -99 to 99 */
  lCrossFbPercent? : number;
  lNoteDelay? : number;
  /** value from -50 to 100 */
  lNoteOffset? : number;
  /** ms value from 0 to 5000 */
  lDelayMs? : number;
  /** value from -1 to 1 */
  lPan? : number;
  /** hz value from 20 to 20000 */
  lLowCutHz? : number;
  /** hz value from 20 to 20000 */
  lHighCutHz? : number;
  rSource? : number;
  /** percent value from -99 to 99 */
  rFeedbackPercent? : number;
  /** percent value from -99 to 99 */
  rCrossFbPercent? : number;
  rNoteDelay? : number;
  /** value from -50 to 100 */
  rNoteOffset? : number;
  /** ms value from 0 to 5000 */
  rDelayMs? : number;
  /** value from -1 to 1 */
  rPan? : number;
  /** hz value from 20 to 20000 */
  rLowCutHz? : number;
  /** hz value from 20 to 20000 */
  rHighCutHz? : number;
  /** db value from -50 to 18 */
  wetDb? : number;
  /** db value from -50 to 18 */
  dryDb? : number;
}
const parameterLibrary = {
  enable: { name: 'Enable', index: 0, isLinear: false, choices: {"0":0,"1":1} },
  inputDb: { name: 'Input', index: 1, isLinear: true, range: [-36, 36] as [number, number], units: 'db' },
  sync: { name: 'Sync', index: 2, isLinear: false, choices: {"none":0,"tempo":1} },
  lSource: { name: 'L Source', index: 3, isLinear: false, choices: {"off":0.1071428656578064,"left":0.3571428656578064,"right":0.6071428656578064,"l + r":0.8571429252624512,"l - r":1} },
  lFeedbackPercent: { name: 'L Feedback', index: 4, isLinear: true, range: [-99, 99] as [number, number], units: 'percent' },
  lCrossFbPercent: { name: 'L Cross FB', index: 5, isLinear: true, range: [-99, 99] as [number, number], units: 'percent' },
  lNoteDelay: { name: 'L Note Delay', index: 6, isLinear: false, choices: {"half":0.1428571492433548,"quarter":0.4642857313156128,"eight":0.8214285969734192,"sixteenth":1} },
  lNoteOffset: { name: 'L Note Offset', index: 7, isLinear: true, range: [-50, 100] as [number, number] },
  lDelayMs: { name: 'L Delay', index: 8, isLinear: true, range: [0, 5000] as [number, number], units: 'ms' },
  lPan: { name: 'L Pan', index: 9, isLinear: true, range: [-1, 1] as [number, number] },
  lLowCutHz: { name: 'L Low Cut', index: 10, isLinear: false, range: [20, 20000] as [number, number], units: 'hz', powerFuncB: 2 },
  lHighCutHz: { name: 'L High Cut', index: 11, isLinear: false, range: [20, 20000] as [number, number], units: 'hz', powerFuncB: 2 },
  rSource: { name: 'R Source', index: 12, isLinear: false, choices: {"off":0.1071428656578064,"left":0.3571428656578064,"right":0.6071428656578064,"l + r":0.8571429252624512,"l - r":1} },
  rFeedbackPercent: { name: 'R Feedback', index: 13, isLinear: true, range: [-99, 99] as [number, number], units: 'percent' },
  rCrossFbPercent: { name: 'R Cross FB', index: 14, isLinear: true, range: [-99, 99] as [number, number], units: 'percent' },
  rNoteDelay: { name: 'R Note Delay', index: 15, isLinear: false, choices: {"half":0.1428571492433548,"quarter":0.4642857313156128,"eight":0.8214285969734192,"sixteenth":1} },
  rNoteOffset: { name: 'R Note Offset', index: 16, isLinear: true, range: [-50, 100] as [number, number] },
  rDelayMs: { name: 'R Delay', index: 17, isLinear: true, range: [0, 5000] as [number, number], units: 'ms' },
  rPan: { name: 'R Pan', index: 18, isLinear: true, range: [-1, 1] as [number, number] },
  rLowCutHz: { name: 'R Low Cut', index: 19, isLinear: false, range: [20, 20000] as [number, number], units: 'hz', powerFuncB: 2 },
  rHighCutHz: { name: 'R High Cut', index: 20, isLinear: false, range: [20, 20000] as [number, number], units: 'hz', powerFuncB: 2 },
  wetDb: { name: 'Wet', index: 21, isLinear: true, range: [-50, 18] as [number, number], units: 'db' },
  dryDb: { name: 'Dry', index: 22, isLinear: true, range: [-50, 18] as [number, number], units: 'db' }
}
const makeAutomation = {
  enable (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'enable',
    });
  },
  inputDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'inputDb',
    });
  },
  sync (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'sync',
    });
  },
  lSource (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lSource',
    });
  },
  lFeedbackPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lFeedbackPercent',
    });
  },
  lCrossFbPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lCrossFbPercent',
    });
  },
  lNoteDelay (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lNoteDelay',
    });
  },
  lNoteOffset (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lNoteOffset',
    });
  },
  lDelayMs (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lDelayMs',
    });
  },
  lPan (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lPan',
    });
  },
  lLowCutHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lLowCutHz',
    });
  },
  lHighCutHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lHighCutHz',
    });
  },
  rSource (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'rSource',
    });
  },
  rFeedbackPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'rFeedbackPercent',
    });
  },
  rCrossFbPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'rCrossFbPercent',
    });
  },
  rNoteDelay (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'rNoteDelay',
    });
  },
  rNoteOffset (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'rNoteOffset',
    });
  },
  rDelayMs (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'rDelayMs',
    });
  },
  rPan (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'rPan',
    });
  },
  rLowCutHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'rLowCutHz',
    });
  },
  rHighCutHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'rHighCutHz',
    });
  },
  wetDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'wetDb',
    });
  },
  dryDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'dryDb',
    });
  }
}
export class TStereoDelayVst2 extends FluidPlugin {
  constructor(
    public readonly parameters : TStereoDelayVst2Parameters = {},
  ) { super(pluginName, pluginType) }

  readonly parameterLibrary = parameterLibrary;
  readonly makeAutomation = makeAutomation;

  // Static members
  static readonly parameterLibrary = parameterLibrary;
  static readonly makeAutomation = makeAutomation;
}
