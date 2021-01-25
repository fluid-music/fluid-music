import { PluginType, FluidPlugin } from '../FluidPlugin';
import { PluginAutomation } from '../techniques';
const pluginName = 'ValhallaFreqEcho'
const pluginType = PluginType.VST2

export interface ValhallaFreqEchoVst2Parameters {
  /** percent value from 0 to 100 */
  wetDryPercent? : number;
  /** hz value from -1000 to 1000 */
  shiftHz? : number;
  /** ms value from 0.01 to 1000 */
  delayMs? : number;
  /** value from 0 to 23 */
  sync? : number;
  /** percent value from 0 to 100 */
  feedbackPercent? : number;
  /** hz value from 20 to 3000 */
  lowCutHz? : number;
  /** hz value from 50 to 15000 */
  highCutHz? : number;
  stereo? : number;
}
const parameterLibrary = {
  wetDryPercent: { name: 'wetDry', index: 0, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  shiftHz: { name: 'shift', index: 1, isLinear: true, range: [-1000, 1000] as [number, number], units: 'hz' },
  delayMs: { name: 'delay', index: 2, isLinear: false, range: [0.01, 1000] as [number, number], units: 'ms', powerFuncB: 3.3221 },
  sync: { name: 'sync', index: 3, isLinear: true, range: [0, 23] as [number, number], choices: {"free":1,"1/64":2,"1/32":3,"1/16":4,"1/8":5,"1/4":6,"2/4":7.00001,"4/4":8,"8/4":9,"1/64.":10,"1/32.":11,"1/16.":12,"1/8.":13,"1/4.":14.00001,"2/4.":15,"4/4.":16,"1/64T":17,"1/32T":18,"1/16T":19,"1/8T":20,"1/4T":21,"2/4T":22,"4/4T":23} },
  feedbackPercent: { name: 'feedback', index: 4, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  lowCutHz: { name: 'lowCut', index: 5, isLinear: true, range: [20, 3000] as [number, number], units: 'hz' },
  highCutHz: { name: 'highCut', index: 6, isLinear: true, range: [50, 15000] as [number, number], units: 'hz' },
  stereo: { name: 'stereo', index: 7, isLinear: false, choices: {"mono":0,"stereo":1} }
}
const makeAutomation = {
  wetDryPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'wetDryPercent',
    });
  },
  shiftHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'shiftHz',
    });
  },
  delayMs (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'delayMs',
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
  feedbackPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'feedbackPercent',
    });
  },
  lowCutHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lowCutHz',
    });
  },
  highCutHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'highCutHz',
    });
  },
  stereo (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'stereo',
    });
  }
}
export class ValhallaFreqEchoVst2 extends FluidPlugin {
  constructor(
    public readonly parameters : ValhallaFreqEchoVst2Parameters = {},
  ) { super(pluginName, pluginType) }

  readonly parameterLibrary = parameterLibrary;
  readonly makeAutomation = makeAutomation;

  // Static members
  static readonly parameterLibrary = parameterLibrary;
  static readonly makeAutomation = makeAutomation;
}
