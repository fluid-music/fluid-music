export interface DragonflyRoomState {
  dryLevelPercent? : number;
  wetLevelPercent? : number;
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
class DragonflyRoomStateRangeChecks implements DragonflyRoomState {
  _data : any = {};

  set dryLevelPercent(value : number) {
    if (parameterLibrary.dryLevelPercent.normalize) {
      if (parameterLibrary.dryLevelPercent.normalize(value) < 0) throw new Error(`dryLevelPercent too low`);
      if (parameterLibrary.dryLevelPercent.normalize(value) > 1) throw new Error(`dryLevelPercent too high`);
    }
    this._data.dryLevelPercent = value;
  }
  get dryLevelPercent() { return this._data.dryLevelPercent; }
}

const parameterLibrary : PluginParameterLibrary = {
  dryLevelPercent: {
    name: 'Dry Level',
    units: 'percent',
    normalize: percent,
  },
  wetLevelPercent: {
    name: 'Wet Level',
    units: 'percent',
    normalize: percent,
  },
  earlyLevelPercent: {
    name: 'Early Level',
    units: 'percent',
    normalize: percent,
  },
  earlySendPercent: {
    name: 'Early Send',
    units: 'percent',
    normalize: percent,
  },
  lateLevelPercent: {
    name: 'Late Level',
    units: 'percent',
    normalize: percent,
  },
  sizeMeters: {
    name: 'Size',
    units: 'meters',
    normalize: linear(8, 32),
  },
  widthPercent: {
    name: 'Width',
    units: 'percent',
    normalize: linear(50, 150),
  },
  predelayMs: {
    name: 'Predelay',
    units: 'milliseconds',
    normalize: linear(0, 100),
  },
  decaySeconds: {
    name: 'Decay',
    units: 'seconds',
    normalize: linear(0.1, 10),
  },
  diffusePercent: {
    name: 'Diffuse',
    units: 'percent',
    normalize: percent,
  },
  spinHz: {
    name: 'Spin',
    units: 'hz',
    normalize: linear(0, 5),
  },
  wanderPercent: {
    name: 'Wander',
    units: 'percent',
    normalize: percent,
  },
  highCutHz: {
    name: 'High Cut',
    units: 'hz',
    normalize: linear(1000, 16000),
  },
  earlyDampHz: {
    name: 'Early Damp',
    units: 'hz',
    normalize: linear(1000, 16000),
  },
  lateDampHz: {
    name: 'Late Damp',
    units: 'hz',
    normalize: linear(1000, 16000),
  },
  lowBoostPercent: {
    name: 'Low Boost',
    units: 'percent',
    normalize: percent,
  },
  lowBoostHz: { // renamed from boostFreq
    name: 'Boost Freq',
    units: 'hz',
    normalize: linear(50, 1050),
  },
  lowCutHz: {
    name: 'Low Cut',
    units: 'hz',
    normalize: linear(50, 200),
  },
};

const auto : AutoMakerLibrary = {
  dryLevelPercent(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.dryLevelPercent,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  wetLevelPercent(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.wetLevelPercent,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  earlyLevelPercent(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.earlyLevelPercent,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  earlySendPercent(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.earlySendPercent,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lateLevelPercent(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.lateLevelPercent,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  sizeMeters(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.sizeMeters,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  widthPercent(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.widthPercent,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  predelayMs(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.predelayMs,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  decaySeconds(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.decaySeconds,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  diffusePercent(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.diffusePercent,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  spinHz(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.spinHz,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  wanderPercent(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.wanderPercent,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  highCutHz(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.highCutHz,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  earlyDampHz(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.earlyDampHz,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lateDampHz(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.lateDampHz,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lowBoostPercent(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.lowBoostPercent,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lowBoostHz(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.lowBoostHz,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lowCutHz(value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      plugin: { pluginName: 'Podolski',  pluginType: PluginType.VST2 },
      param: parameterLibrary.lowCutHz,
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
};

export class DragonflyRoom extends FluidPlugin {
  constructor(
    public readonly parameter : DragonflyRoomState = {},
  ) { super() }

  readonly pluginName = 'DragonflyRoomReverb-vst';
  readonly pluginType = PluginType.VST2;
  readonly parameterLibrary = DragonflyRoom.parameterLibrary;

  static readonly parameterLibrary = parameterLibrary;
  static readonly auto = auto;
}
