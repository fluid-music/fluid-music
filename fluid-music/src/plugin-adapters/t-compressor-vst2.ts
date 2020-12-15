import { PluginType, FluidPlugin } from '../FluidPlugin';
import { PluginAutomation } from '../techniques';
const pluginName = '#TCompressor'
const pluginType = PluginType.VST2

export interface TCompressorVst2Parameters {
  enable? : number;
  mode? : number;
  /** db value from -60 to 0 */
  thresholdDb? : number;
  /** value from 1 to 100 */
  ratio? : number;
  /** ms value from 0.1 to 100 */
  attackMs? : number;
  /** ms value from 0 to 1000 */
  holdMs? : number;
  /** ms value from 1 to 1000 */
  releaseMs? : number;
  /** db value from -20 to 20 */
  inputDb? : number;
  /** db value from -20 to 20 */
  makeUpDb? : number;
  /** db value from 0 to 60 */
  softKneeDb? : number;
  /** ms value from 0 to 10 */
  lookaheadMs? : number;
  limit? : number;
  useSidechainTrigger? : number;
  monitorSidechain? : number;
  softClip? : number;
  /** db value from -60 to 0 */
  softClipThresholdDb? : number;
  peakDetection? : number;
  useSumDetection? : number;
  enableAutoMakeUpGain? : number;
  filter? : number;
  filterType? : number;
  /** hz value from 10 to 20000 */
  freqHz? : number;
  /** value from 0.025 to 40 */
  q? : number;
  /** db value from -30 to 30 */
  gainDb? : number;
}
const parameterLibrary = {
  enable: { name: 'Enable', index: 0, isLinear: false, choices: {"0":0,"1":1} },
  mode: { name: 'Mode', index: 1, isLinear: false, choices: {"0":0,"1":1} },
  thresholdDb: { name: 'Threshold', index: 2, isLinear: true, range: [-60, 0] as [number, number], units: 'db' },
  ratio: { name: 'Ratio', index: 3, isLinear: false, range: [1, 100] as [number, number], powerFuncB: 5 },
  attackMs: { name: 'Attack', index: 4, isLinear: true, range: [0.1, 100] as [number, number], units: 'ms' },
  holdMs: { name: 'Hold', index: 5, isLinear: true, range: [0, 1000] as [number, number], units: 'ms' },
  releaseMs: { name: 'Release', index: 6, isLinear: true, range: [1, 1000] as [number, number], units: 'ms' },
  inputDb: { name: 'Input', index: 7, isLinear: true, range: [-20, 20] as [number, number], units: 'db' },
  makeUpDb: { name: 'Make-up', index: 8, isLinear: true, range: [-20, 20] as [number, number], units: 'db' },
  softKneeDb: { name: 'Soft Knee', index: 9, isLinear: true, range: [0, 60] as [number, number], units: 'db' },
  lookaheadMs: { name: 'Lookahead', index: 10, isLinear: true, range: [0, 10] as [number, number], units: 'ms' },
  limit: { name: 'Limit', index: 11, isLinear: false, choices: {"0":0,"1":1} },
  useSidechainTrigger: { name: 'Use Sidechain Trigger', index: 12, isLinear: false, choices: {"0":0,"1":1} },
  monitorSidechain: { name: 'Monitor Sidechain', index: 13, isLinear: false, choices: {"0":0,"1":1} },
  softClip: { name: 'Soft Clip', index: 14, isLinear: false, choices: {"off":0,"on":1} },
  softClipThresholdDb: { name: 'Threshold (2)', index: 15, isLinear: true, range: [-60, 0] as [number, number], units: 'db' },
  peakDetection: { name: 'Peak Detection', index: 16, isLinear: false, choices: {"0":0,"1":1} },
  useSumDetection: { name: 'Use Sum Detection', index: 17, isLinear: false, choices: {"0":0,"1":1} },
  enableAutoMakeUpGain: { name: 'Auto', index: 18, isLinear: false, choices: {"off":0,"on":1} },
  filter: { name: 'Filter', index: 19, isLinear: false, choices: {"off":0,"on":1} },
  filterType: { name: 'Type', index: 20, isLinear: false, choices: {"0":0,"1":0.1428571492433548,"2":0.2857142984867096,"3":0.4285714626312256,"4":0.5714285969734192,"5":0.7142857313156128,"6":0.8571429252624512,"7":1} },
  freqHz: { name: 'Freq', index: 21, isLinear: false, range: [10, 20000] as [number, number], units: 'hz', powerFuncB: 5 },
  q: { name: 'Q', index: 22, isLinear: false, range: [0.025, 40] as [number, number], powerFuncB: 5 },
  gainDb: { name: 'Gain', index: 23, isLinear: true, range: [-30, 30] as [number, number], units: 'db' }
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
  mode (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mode',
    });
  },
  thresholdDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'thresholdDb',
    });
  },
  ratio (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'ratio',
    });
  },
  attackMs (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'attackMs',
    });
  },
  holdMs (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'holdMs',
    });
  },
  releaseMs (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'releaseMs',
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
  makeUpDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'makeUpDb',
    });
  },
  softKneeDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'softKneeDb',
    });
  },
  lookaheadMs (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lookaheadMs',
    });
  },
  limit (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'limit',
    });
  },
  useSidechainTrigger (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'useSidechainTrigger',
    });
  },
  monitorSidechain (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'monitorSidechain',
    });
  },
  softClip (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'softClip',
    });
  },
  softClipThresholdDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'softClipThresholdDb',
    });
  },
  peakDetection (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'peakDetection',
    });
  },
  useSumDetection (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'useSumDetection',
    });
  },
  enableAutoMakeUpGain (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'enableAutoMakeUpGain',
    });
  },
  filter (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'filter',
    });
  },
  filterType (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'filterType',
    });
  },
  freqHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'freqHz',
    });
  },
  q (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'q',
    });
  },
  gainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'gainDb',
    });
  }
}
export class TCompressorVst2 extends FluidPlugin {
  constructor(
    public readonly parameters : TCompressorVst2Parameters = {},
  ) { super(pluginName, pluginType) }

  readonly parameterLibrary = parameterLibrary;
  readonly makeAutomation = makeAutomation;

  // Static members
  static readonly parameterLibrary = parameterLibrary;
  static readonly makeAutomation = makeAutomation;
}
