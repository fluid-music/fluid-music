import { PluginType, FluidPlugin } from '../FluidPlugin';
import { PluginAutomation } from '../techniques';
const pluginName = 'RoughRider3'
const pluginType = PluginType.VST2

export interface RoughRider3Vst2Parameters {
  /** hz value from 20 to 250 */
  sidechainHighpass? : number;
  /** db value from -60 to 5 */
  inputGainDb? : number;
  /** db value from -60 to 0 */
  sensitivityDb? : number;
  /** value from 1 to 1000 */
  ratio? : number;
  /** ms value from 0 to 100 */
  attackMs? : number;
  /** ms value from 10 to 1000 */
  releaseMs? : number;
  /** db value from 0 to 30 */
  makeupGainDb? : number;
  /** percent value from 0 to 100 */
  mixPercent? : number;
  /** db value from -60 to 5 */
  outputLvlDb? : number;
  externalSidechainEnable? : number;
  fullBandwidth? : number;
}
const parameterLibrary = {
  sidechainHighpass: { name: 'SC HPF', index: 0, isLinear: true, range: [20, 250] as [number, number], units: 'hz' },
  inputGainDb: { name: 'Input Lvl', index: 1, isLinear: true, range: [-60, 5] as [number, number], units: 'db' },
  sensitivityDb: { name: 'Sensitivity', index: 2, isLinear: true, range: [-60, 0] as [number, number], units: 'db' },
  ratio: { name: 'Ratio', index: 3, isLinear: false, range: [1, 1000] as [number, number],
    normalize: (ratio: number) => {
      const a = 0.08
      const u = Math.log10((1000 - a) / a)
      return Math.log10((ratio + a - 1) / a) / u
    } },
  attackMs: { name: 'Attack', index: 4, isLinear: true, range: [0, 100] as [number, number], units: 'ms' },
  releaseMs: { name: 'Release', index: 5, isLinear: true, range: [10, 1000] as [number, number], units: 'ms' },
  makeupGainDb: { name: 'Makeup', index: 6, isLinear: true, range: [0, 30] as [number, number], units: 'db' },
  mixPercent: { name: 'Mix', index: 7, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  outputLvlDb: { name: 'Output Lvl', index: 8, isLinear: true, range: [-60, 5] as [number, number], units: 'db' },
  externalSidechainEnable: { name: 'SC Active', index: 9, isLinear: false, choices: {"off":0,"on":1} },
  fullBandwidth: { name: 'Full Bandwidth', index: 10, isLinear: false, choices: {"off":0,"on":1} }
}
const makeAutomation = {
  sidechainHighpass (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'sidechainHighpass',
    });
  },
  inputGainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'inputGainDb',
    });
  },
  sensitivityDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'sensitivityDb',
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
  releaseMs (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'releaseMs',
    });
  },
  makeupGainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'makeupGainDb',
    });
  },
  mixPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mixPercent',
    });
  },
  outputLvlDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'outputLvlDb',
    });
  },
  externalSidechainEnable (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'externalSidechainEnable',
    });
  },
  fullBandwidth (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'fullBandwidth',
    });
  }
}
export class RoughRider3Vst2 extends FluidPlugin {
  constructor(
    public readonly parameters : RoughRider3Vst2Parameters = {},
  ) { super(pluginName, pluginType) }

  readonly parameterLibrary = parameterLibrary;
  readonly makeAutomation = makeAutomation;

  // Static members
  static readonly parameterLibrary = parameterLibrary;
  static readonly makeAutomation = makeAutomation;
}
