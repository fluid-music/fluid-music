// Charles: Rather than write a plugin generator for this plugin, I wrote this
// one manually when I was designing the plugin API. As such, it does not have a
// generator.
//
// NOTE: All DragonflyRoom parameters are linear.

import { PluginType, FluidPlugin } from '../FluidPlugin';
import { PluginAutomation } from '../techniques';
const pluginName = 'DragonflyRoomReverb';
const pluginType = PluginType.VST2;

export interface DragonflyRoomVst2Parameters {
  dryLevelPercent? : number;
  earlyLevelPercent? : number;
  earlySendPercent? : number;
  lateLevelPercent? : number;
  sizeMeters? : number;
  widthPercent? : number;
  predelayMs? : number;
  decaySeconds? : number;
  diffusePercent? : number;
  spinHz? : number;
  wanderPercent? : number;
  highCutHz? : number;
  earlyDampHz? : number;
  lateDampHz? : number;
  lowBoostPercent? : number;
  lowBoostHz? : number;
  lowCutHz? : number;
}

/**
 * DragonflyRoomStateRangeChecks is an example stub that shows how range
 * checking could be implemented for parameter values.
 * @ignore
 */
class DragonflyRoomStateRangeChecks implements DragonflyRoomVst2Parameters {
  _data : any = {};

  set dryLevelPercent(value : number) {
    if (parameterLibrary.dryLevelPercent.range) {
      const r1 = parameterLibrary.dryLevelPercent.range[0]
      const r2 = parameterLibrary.dryLevelPercent.range[1]
      const min = Math.min(r1, r2)
      const max = Math.max(r1, r2)
      if (value < min) throw new Error(`dryLevelPercent too low`);
      if (value > max) throw new Error(`dryLevelPercent too high`);
    }
    this._data.dryLevelPercent = value;
  }
  get dryLevelPercent() { return this._data.dryLevelPercent; }
}

// Tracktion adds 'Dry Level' and 'Wet Level' parameters, both of which are not
// built into the actual plugin. Typically, this means that plugin adapters
// should not have 'Dry Level' and 'Wet Level' parameters with indexes. However,
// DragonFlyRoomReverb-vst has its own 'Dry Level' parameter with index=0, so
// the `dryLevelPercent` parameter below does have an index.
const parameterLibrary = {
  dryLevelPercent: {
    name: 'Dry Level',
    units: 'percent',
    isLinear: true,
    range: [0, 100] as [number, number],
    index: 0,
  },
  earlyLevelPercent: {
    name: 'Early Level',
    units: 'percent',
    isLinear: true,
    range: [0, 100] as [number, number],
    index: 1,
  },
  earlySendPercent: {
    name: 'Early Send',
    units: 'percent',
    isLinear: true,
    range: [0, 100] as [number, number],
    index: 2,
  },
  lateLevelPercent: {
    name: 'Late Level',
    units: 'percent',
    isLinear: true,
    range: [0, 100] as [number, number],
    index: 3,
  },
  sizeMeters: {
    name: 'Size',
    units: 'meters',
    isLinear: true,
    range: [8, 32] as [number, number],
    index: 4,
  },
  widthPercent: {
    name: 'Width',
    units: 'percent',
    isLinear: true,
    range: [50, 150] as [number, number],
    index: 5,
  },
  predelayMs: {
    name: 'Predelay',
    units: 'milliseconds',
    isLinear: true,
    range: [0, 100] as [number, number],
    index: 6,
  },
  decaySeconds: {
    name: 'Decay',
    units: 'seconds',
    isLinear: true,
    range: [0.1, 10] as [number, number],
    index: 7,
  },
  diffusePercent: {
    name: 'Diffuse',
    units: 'percent',
    isLinear: true,
    range: [0, 100] as [number, number],
    index: 8,
  },
  spinHz: {
    name: 'Spin',
    units: 'hz',
    isLinear: true,
    range: [0, 5] as [number, number],
    index: 9,
  },
  wanderPercent: {
    name: 'Wander',
    units: 'percent',
    isLinear: true,
    range: [0, 100] as [number, number],
    index: 10,
  },
  highCutHz: {
    name: 'High Cut',
    units: 'hz',
    isLinear: true,
    range: [1000, 16000] as [number, number],
    index: 11,
  },
  earlyDampHz: {
    name: 'Early Damp',
    units: 'hz',
    isLinear: true,
    range: [1000, 16000] as [number, number],
    index: 12,
  },
  lateDampHz: {
    name: 'Late Damp',
    units: 'hz',
    isLinear: true,
    range: [1000, 16000] as [number, number],
    index: 13,
  },
  lowBoostPercent: {
    name: 'Low Boost',
    units: 'percent',
    isLinear: true,
    range: [0, 100] as [number, number],
    index: 14,
  },
  lowBoostHz: { // renamed from boostFreq
    name: 'Boost Freq',
    units: 'hz',
    isLinear: true,
    range: [50, 1050] as [number, number],
    index: 15,
  },
  lowCutHz: {
    name: 'Low Cut',
    units: 'hz',
    isLinear: true,
    range: [50, 200] as [number, number],
    index: 16,
  },
};

const makeAutomation = {
  dryLevelPercent(value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      paramKey: 'dryLevelPercent',
      pluginSelector: { pluginName, pluginType }
    })
  },
  earlyLevelPercent(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'earlyLevelPercent',
    });
  },
  earlySendPercent(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'earlySendPercent',
    });
  },
  lateLevelPercent(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lateLevelPercent',
    });
  },
  sizeMeters(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'sizeMeters',
    });
  },
  widthPercent(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'widthPercent',
    });
  },
  predelayMs(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'predelayMs',
    });
  },
  decaySeconds(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'decaySeconds',
    });
  },
  diffusePercent(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'diffusePercent',
    });
  },
  spinHz(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName,  pluginType },
      paramKey: 'spinHz',
    });
  },
  wanderPercent(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName,  pluginType },
      paramKey: 'wanderPercent',
    });
  },
  highCutHz(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName,  pluginType },
      paramKey: 'highCutHz',
    });
  },
  earlyDampHz(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName,  pluginType },
      paramKey: 'earlyDampHz',
    });
  },
  lateDampHz(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName,  pluginType },
      paramKey: 'lateDampHz',
    });
  },
  lowBoostPercent(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName,  pluginType },
      paramKey: 'lowBoostPercent',
    });
  },
  lowBoostHz(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName,  pluginType },
      paramKey: 'lowBoostHz',
    });
  },
  lowCutHz(value? : number, curve = 0){
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lowCutHz',
    });
  },
};

export class DragonflyRoomVst2 extends FluidPlugin {
  constructor(
    public readonly parameters : DragonflyRoomVst2Parameters = {},
  ) { super(pluginName, PluginType.VST2) }

  readonly parameterLibrary = parameterLibrary;
  readonly makeAutomation = makeAutomation;

  // Static members
  static readonly parameterLibrary = parameterLibrary;
  static readonly makeAutomation = makeAutomation;
}
