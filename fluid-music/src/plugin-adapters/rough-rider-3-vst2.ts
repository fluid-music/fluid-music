import { PluginType, FluidPlugin } from '../plugin';
import { PluginAuto as PluginAutoTechnique } from '../fluid-techniques';
const pluginName = 'RoughRider3'
const pluginType = PluginType.VST2

export interface RoughRider3Vst2Parameters {
  /** hz value from 20 to 250 */
  scHpfHz? : number;
  /** db value from -60 to 5 */
  inputLvlDb? : number;
  /** db value from -60 to 0 */
  sensitivityDb? : number;
  /** value from 1 to 1000 */
  ratio? : number;
  /** ms value from 0 to 100 */
  attackMs? : number;
  /** ms value from 10 to 1000 */
  releaseMs? : number;
  /** db value from 0 to 30 */
  makeupDb? : number;
  /** percent value from 0 to 100 */
  mixPercent? : number;
  /** db value from -60 to 5 */
  outputLvlDb? : number;
  scActive? : number;
  fullBandwidth? : number;
}
const parameterLibrary = {
  scHpfHz: { name: 'SC HPF', index: 0, isLinear: true, range: [20, 250] as [number, number], units: 'hz' },
  inputLvlDb: { name: 'Input Lvl', index: 1, isLinear: true, range: [-60, 5] as [number, number], units: 'db' },
  sensitivityDb: { name: 'Sensitivity', index: 2, isLinear: true, range: [-60, 0] as [number, number], units: 'db' },
  ratio: { name: 'Ratio', index: 3, isLinear: false, range: [1, 1000] as [number, number], powerFuncB: 2, choices: {"1":0.1785714328289032,"2":0.2857142984867096,"3":0.3571428656578064,"4":0.392857164144516,"6":0.4285714626312256,"7":0.4642857313156128,"10":0.5,"14":0.535714328289032,"19":0.5714285969734192,"26":0.6071428656578064,"36":0.6428571939468384,"50":0.6785714626312256,"69":0.7142857313156128,"96":0.7500000596046448,"134":0.785714328289032,"187":0.8214285969734192,"262":0.8571429252624512,"366":0.8928571939468384,"511":0.9285714626312256,"715":0.9642857313156128,"1000":1} },
  attackMs: { name: 'Attack', index: 4, isLinear: true, range: [0, 100] as [number, number], units: 'ms' },
  releaseMs: { name: 'Release', index: 5, isLinear: true, range: [10, 1000] as [number, number], units: 'ms' },
  makeupDb: { name: 'Makeup', index: 6, isLinear: true, range: [0, 30] as [number, number], units: 'db' },
  mixPercent: { name: 'Mix', index: 7, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  outputLvlDb: { name: 'Output Lvl', index: 8, isLinear: true, range: [-60, 5] as [number, number], units: 'db' },
  scActive: { name: 'SC Active', index: 9, isLinear: false, choices: {"off":0,"on":1} },
  fullBandwidth: { name: 'Full Bandwidth', index: 10, isLinear: false, choices: {"off":0,"on":1} }
}
const makeAutomation = {
  scHpfHz (value? : number, curve = 0) {
    return new PluginAutoTechnique({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'scHpfHz',
    });
  },
  inputLvlDb (value? : number, curve = 0) {
    return new PluginAutoTechnique({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'inputLvlDb',
    });
  },
  sensitivityDb (value? : number, curve = 0) {
    return new PluginAutoTechnique({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'sensitivityDb',
    });
  },
  ratio (value? : number, curve = 0) {
    return new PluginAutoTechnique({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'ratio',
    });
  },
  attackMs (value? : number, curve = 0) {
    return new PluginAutoTechnique({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'attackMs',
    });
  },
  releaseMs (value? : number, curve = 0) {
    return new PluginAutoTechnique({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'releaseMs',
    });
  },
  makeupDb (value? : number, curve = 0) {
    return new PluginAutoTechnique({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'makeupDb',
    });
  },
  mixPercent (value? : number, curve = 0) {
    return new PluginAutoTechnique({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mixPercent',
    });
  },
  outputLvlDb (value? : number, curve = 0) {
    return new PluginAutoTechnique({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'outputLvlDb',
    });
  },
  scActive (value? : number, curve = 0) {
    return new PluginAutoTechnique({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'scActive',
    });
  },
  fullBandwidth (value? : number, curve = 0) {
    return new PluginAutoTechnique({
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
