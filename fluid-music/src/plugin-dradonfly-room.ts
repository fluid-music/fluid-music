function createSelector() : PluginSelector {
  return {
    pluginName: 'Podolski',
    pluginType: PluginType.VST2,
  };
};


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
}

export class DragonflyRoom implements PluginInstance {
  constructor(public readonly parameters : DragonflyRoomState = {}) {
    this.parameterLibrary = DragonflyRoom.parameterLibrary;
  }

  readonly pluginName = 'DragonflyRoomReverb-vst';
  readonly pluginType = PluginType.VST2;
  readonly parameterLibrary;
  static readonly parameterLibrary = parameterLibrary;
  static readonly auto = {
    dryLevelPercent(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.dryLevelPercent,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    wetLevelPercent(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.wetLevelPercent,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    earlyLevelPercent(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.earlyLevelPercent,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    earlySendPercent(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.earlySendPercent,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    lateLevelPercent(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.lateLevelPercent,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    sizeMeters(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.sizeMeters,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    widthPercent(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.widthPercent,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    predelayMs(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.predelayMs,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    decaySeconds(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.decaySeconds,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    diffusePercent(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.diffusePercent,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    spinHz(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.spinHz,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    wanderPercent(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.wanderPercent,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    highCutHz(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.highCutHz,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    earlyDampHz(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.earlyDampHz,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    lateDampHz(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.lateDampHz,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    lowBoostPercent(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.lowBoostPercent,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    lowBoostHz(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.lowBoostHz,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
    lowCutHz(value? : number) : PluginAutomationEvent {
      const point : PluginAutomationEvent = {
        type: 'pluginAuto',
        plugin: createSelector(),
        param: parameterLibrary.lowCutHz,
        startTime: 0,
        duration: 0,
        curve: 0,
      };
      if (typeof value === 'number') point.value = value;
      return point;
    },
  }
}
