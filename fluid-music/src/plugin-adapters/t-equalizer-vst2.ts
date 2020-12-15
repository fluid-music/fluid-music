import { PluginType, FluidPlugin } from '../FluidPlugin';
import { PluginAutomation } from '../techniques';
const pluginName = '#TEqualiser'
const pluginType = PluginType.VST2

export interface TEqualizerVst2Parameters {
  band1State? : number;
  /** hz value from 10 to 30000 */
  band1FrequencyHz? : number;
  /** db value from -30 to 30 */
  band1GainDb? : number;
  /** value from 0.025 to 40 */
  band1Q? : number;
  band1Shape? : number;
  band2State? : number;
  /** hz value from 10 to 30000 */
  band2FrequencyHz? : number;
  /** db value from -30 to 30 */
  band2GainDb? : number;
  /** value from 0.025 to 40 */
  band2Q? : number;
  band2Shape? : number;
  band3State? : number;
  /** hz value from 10 to 30000 */
  band3FrequencyHz? : number;
  /** db value from -30 to 30 */
  band3GainDb? : number;
  /** value from 0.025 to 40 */
  band3Q? : number;
  band3Shape? : number;
  band4State? : number;
  /** hz value from 10 to 30000 */
  band4FrequencyHz? : number;
  /** db value from -30 to 30 */
  band4GainDb? : number;
  /** value from 0.025 to 40 */
  band4Q? : number;
  band4Shape? : number;
  band5State? : number;
  /** hz value from 10 to 30000 */
  band5FrequencyHz? : number;
  /** db value from -30 to 30 */
  band5GainDb? : number;
  /** value from 0.025 to 40 */
  band5Q? : number;
  band5Shape? : number;
  band6State? : number;
  /** hz value from 10 to 30000 */
  band6FrequencyHz? : number;
  /** db value from -30 to 30 */
  band6GainDb? : number;
  /** value from 0.025 to 40 */
  band6Q? : number;
  band6Shape? : number;
  band7State? : number;
  /** hz value from 10 to 30000 */
  band7FrequencyHz? : number;
  /** db value from -30 to 30 */
  band7GainDb? : number;
  /** value from 0.025 to 40 */
  band7Q? : number;
  band7Shape? : number;
  band8State? : number;
  /** hz value from 10 to 30000 */
  band8FrequencyHz? : number;
  /** db value from -30 to 30 */
  band8GainDb? : number;
  /** value from 0.025 to 40 */
  band8Q? : number;
  band8Shape? : number;
  enable? : number;
  /** db value from -48 to 6 */
  outputGainDb? : number;
  soloBand? : number;
  /** db value from -48 to 12 */
  soloGainDb? : number;
  analyserMode? : number;
}
const parameterLibrary = {
  band1State: { name: 'Band 1 State', index: 0, isLinear: false, choices: {"0":0.2142857313156128,"1":0.7142857313156128,"2":1} },
  band1FrequencyHz: { name: 'Band 1 Frequency', index: 1, isLinear: false, range: [10, 30000] as [number, number], units: 'hz', powerFuncB: 5 },
  band1GainDb: { name: 'Band 1 Gain', index: 2, isLinear: true, range: [-30, 30] as [number, number], units: 'db' },
  band1Q: { name: 'Band 1 Q', index: 3, isLinear: false, range: [0.025, 40] as [number, number], powerFuncB: 5 },
  band1Shape: { name: 'Band 1 Shape', index: 4, isLinear: false, choices: {"lowPass":0,"lowShelf":0.16666666666666666,"peakNotch":0.3333333333333333,"bandPass":0.5,"bandStop":0.6666666666666666,"highShelf":0.8333333333333334,"highPass":1} },
  band2State: { name: 'Band 2 State', index: 5, isLinear: false, choices: {"0":0.2142857313156128,"1":0.7142857313156128,"2":1} },
  band2FrequencyHz: { name: 'Band 2 Frequency', index: 6, isLinear: false, range: [10, 30000] as [number, number], units: 'hz', powerFuncB: 5 },
  band2GainDb: { name: 'Band 2 Gain', index: 7, isLinear: true, range: [-30, 30] as [number, number], units: 'db' },
  band2Q: { name: 'Band 2 Q', index: 8, isLinear: false, range: [0.025, 40] as [number, number], powerFuncB: 5 },
  band2Shape: { name: 'Band 2 Shape', index: 9, isLinear: false, choices: {"lowPass":0,"lowShelf":0.16666666666666666,"peakNotch":0.3333333333333333,"bandPass":0.5,"bandStop":0.6666666666666666,"highShelf":0.8333333333333334,"highPass":1} },
  band3State: { name: 'Band 3 State', index: 10, isLinear: false, choices: {"0":0.2142857313156128,"1":0.7142857313156128,"2":1} },
  band3FrequencyHz: { name: 'Band 3 Frequency', index: 11, isLinear: false, range: [10, 30000] as [number, number], units: 'hz', powerFuncB: 5 },
  band3GainDb: { name: 'Band 3 Gain', index: 12, isLinear: true, range: [-30, 30] as [number, number], units: 'db' },
  band3Q: { name: 'Band 3 Q', index: 13, isLinear: false, range: [0.025, 40] as [number, number], powerFuncB: 5 },
  band3Shape: { name: 'Band 3 Shape', index: 14, isLinear: false, choices: {"lowPass":0,"lowShelf":0.16666666666666666,"peakNotch":0.3333333333333333,"bandPass":0.5,"bandStop":0.6666666666666666,"highShelf":0.8333333333333334,"highPass":1} },
  band4State: { name: 'Band 4 State', index: 15, isLinear: false, choices: {"0":0.2142857313156128,"1":0.7142857313156128,"2":1} },
  band4FrequencyHz: { name: 'Band 4 Frequency', index: 16, isLinear: false, range: [10, 30000] as [number, number], units: 'hz', powerFuncB: 5 },
  band4GainDb: { name: 'Band 4 Gain', index: 17, isLinear: true, range: [-30, 30] as [number, number], units: 'db' },
  band4Q: { name: 'Band 4 Q', index: 18, isLinear: false, range: [0.025, 40] as [number, number], powerFuncB: 5 },
  band4Shape: { name: 'Band 4 Shape', index: 19, isLinear: false, choices: {"lowPass":0,"lowShelf":0.16666666666666666,"peakNotch":0.3333333333333333,"bandPass":0.5,"bandStop":0.6666666666666666,"highShelf":0.8333333333333334,"highPass":1} },
  band5State: { name: 'Band 5 State', index: 20, isLinear: false, choices: {"0":0.2142857313156128,"1":0.7142857313156128,"2":1} },
  band5FrequencyHz: { name: 'Band 5 Frequency', index: 21, isLinear: false, range: [10, 30000] as [number, number], units: 'hz', powerFuncB: 5 },
  band5GainDb: { name: 'Band 5 Gain', index: 22, isLinear: true, range: [-30, 30] as [number, number], units: 'db' },
  band5Q: { name: 'Band 5 Q', index: 23, isLinear: false, range: [0.025, 40] as [number, number], powerFuncB: 5 },
  band5Shape: { name: 'Band 5 Shape', index: 24, isLinear: false, choices: {"lowPass":0,"lowShelf":0.16666666666666666,"peakNotch":0.3333333333333333,"bandPass":0.5,"bandStop":0.6666666666666666,"highShelf":0.8333333333333334,"highPass":1} },
  band6State: { name: 'Band 6 State', index: 25, isLinear: false, choices: {"0":0.2142857313156128,"1":0.7142857313156128,"2":1} },
  band6FrequencyHz: { name: 'Band 6 Frequency', index: 26, isLinear: false, range: [10, 30000] as [number, number], units: 'hz', powerFuncB: 5 },
  band6GainDb: { name: 'Band 6 Gain', index: 27, isLinear: true, range: [-30, 30] as [number, number], units: 'db' },
  band6Q: { name: 'Band 6 Q', index: 28, isLinear: false, range: [0.025, 40] as [number, number], powerFuncB: 5 },
  band6Shape: { name: 'Band 6 Shape', index: 29, isLinear: false, choices: {"lowPass":0,"lowShelf":0.16666666666666666,"peakNotch":0.3333333333333333,"bandPass":0.5,"bandStop":0.6666666666666666,"highShelf":0.8333333333333334,"highPass":1} },
  band7State: { name: 'Band 7 State', index: 30, isLinear: false, choices: {"0":0.2142857313156128,"1":0.7142857313156128,"2":1} },
  band7FrequencyHz: { name: 'Band 7 Frequency', index: 31, isLinear: false, range: [10, 30000] as [number, number], units: 'hz', powerFuncB: 5 },
  band7GainDb: { name: 'Band 7 Gain', index: 32, isLinear: true, range: [-30, 30] as [number, number], units: 'db' },
  band7Q: { name: 'Band 7 Q', index: 33, isLinear: false, range: [0.025, 40] as [number, number], powerFuncB: 5 },
  band7Shape: { name: 'Band 7 Shape', index: 34, isLinear: false, choices: {"lowPass":0,"lowShelf":0.16666666666666666,"peakNotch":0.3333333333333333,"bandPass":0.5,"bandStop":0.6666666666666666,"highShelf":0.8333333333333334,"highPass":1} },
  band8State: { name: 'Band 8 State', index: 35, isLinear: false, choices: {"0":0.2142857313156128,"1":0.7142857313156128,"2":1} },
  band8FrequencyHz: { name: 'Band 8 Frequency', index: 36, isLinear: false, range: [10, 30000] as [number, number], units: 'hz', powerFuncB: 5 },
  band8GainDb: { name: 'Band 8 Gain', index: 37, isLinear: true, range: [-30, 30] as [number, number], units: 'db' },
  band8Q: { name: 'Band 8 Q', index: 38, isLinear: false, range: [0.025, 40] as [number, number], powerFuncB: 5 },
  band8Shape: { name: 'Band 8 Shape', index: 39, isLinear: false, choices: {"lowPass":0,"lowShelf":0.16666666666666666,"peakNotch":0.3333333333333333,"bandPass":0.5,"bandStop":0.6666666666666666,"highShelf":0.8333333333333334,"highPass":1} },
  enable: { name: 'Enable', index: 40, isLinear: false, choices: {"0":0,"1":1} },
  outputGainDb: { name: 'Output Gain', index: 41, isLinear: true, range: [-48, 6] as [number, number], units: 'db' },
  soloBand: { name: 'Solo Band', index: 42, isLinear: false, choices: {"0":0.1428571492433548,"1":0.25,"2":0.3571428656578064,"3":0.4642857313156128,"4":0.6071428656578064,"5":0.7142857313156128,"6":0.8214285969734192,"7":0.9285714626312256,"8":1,"-1":0.0357142873108387} },
  soloGainDb: { name: 'Solo Gain', index: 43, isLinear: true, range: [-48, 12] as [number, number], units: 'db' },
  analyserMode: { name: 'Analyser Mode', index: 44, isLinear: false, choices: {"0":0.1428571492433548,"1":0.4642857313156128,"2":0.8214285969734192,"3":1} }
}
const makeAutomation = {
  band1State (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band1State',
    });
  },
  band1FrequencyHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band1FrequencyHz',
    });
  },
  band1GainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band1GainDb',
    });
  },
  band1Q (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band1Q',
    });
  },
  band1Shape (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band1Shape',
    });
  },
  band2State (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band2State',
    });
  },
  band2FrequencyHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band2FrequencyHz',
    });
  },
  band2GainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band2GainDb',
    });
  },
  band2Q (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band2Q',
    });
  },
  band2Shape (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band2Shape',
    });
  },
  band3State (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band3State',
    });
  },
  band3FrequencyHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band3FrequencyHz',
    });
  },
  band3GainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band3GainDb',
    });
  },
  band3Q (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band3Q',
    });
  },
  band3Shape (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band3Shape',
    });
  },
  band4State (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band4State',
    });
  },
  band4FrequencyHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band4FrequencyHz',
    });
  },
  band4GainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band4GainDb',
    });
  },
  band4Q (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band4Q',
    });
  },
  band4Shape (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band4Shape',
    });
  },
  band5State (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band5State',
    });
  },
  band5FrequencyHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band5FrequencyHz',
    });
  },
  band5GainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band5GainDb',
    });
  },
  band5Q (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band5Q',
    });
  },
  band5Shape (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band5Shape',
    });
  },
  band6State (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band6State',
    });
  },
  band6FrequencyHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band6FrequencyHz',
    });
  },
  band6GainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band6GainDb',
    });
  },
  band6Q (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band6Q',
    });
  },
  band6Shape (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band6Shape',
    });
  },
  band7State (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band7State',
    });
  },
  band7FrequencyHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band7FrequencyHz',
    });
  },
  band7GainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band7GainDb',
    });
  },
  band7Q (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band7Q',
    });
  },
  band7Shape (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band7Shape',
    });
  },
  band8State (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band8State',
    });
  },
  band8FrequencyHz (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band8FrequencyHz',
    });
  },
  band8GainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band8GainDb',
    });
  },
  band8Q (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band8Q',
    });
  },
  band8Shape (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'band8Shape',
    });
  },
  enable (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'enable',
    });
  },
  outputGainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'outputGainDb',
    });
  },
  soloBand (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'soloBand',
    });
  },
  soloGainDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'soloGainDb',
    });
  },
  analyserMode (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'analyserMode',
    });
  }
}
export class TEqualizerVst2 extends FluidPlugin {
  constructor(
    public readonly parameters : TEqualizerVst2Parameters = {},
  ) { super(pluginName, pluginType) }

  readonly parameterLibrary = parameterLibrary;
  readonly makeAutomation = makeAutomation;

  // Static members
  static readonly parameterLibrary = parameterLibrary;
  static readonly makeAutomation = makeAutomation;

  /**
   * Configure EQ band 1 frequency, gain, and Q
   * @param hz frequency in hertz (10 to 30000)
   * @param gain band gain in dB (-30 to 30, 0 is unity gain)
   * @param q band width (0.025 to 40, higher is narrower)
   * @param active
   */
  setBand1(hz?: number, gain?: number, q?: number, active = true) {
    if (typeof hz === 'number')      this.parameters.band1FrequencyHz = hz
    if (typeof gain === 'number')    this.parameters.band1GainDb = gain
    if (typeof q === 'number')       this.parameters.band1Q = q
    if (typeof active === 'boolean') this.parameters.band1State = active ? 0.5 : 0
  }

  /**
   * Configure EQ band 2 frequency, gain, and Q
   * @param hz frequency in hertz (10 to 30000)
   * @param gain band gain in dB (-30 to 30, 0 is unity gain)
   * @param q band width (0.025 to 40, higher is narrower)
   * @param active
   */
  setBand2(hz?: number, gain?: number, q?: number, active = true) {
    if (typeof hz === 'number')      this.parameters.band2FrequencyHz = hz
    if (typeof gain === 'number')    this.parameters.band2GainDb = gain
    if (typeof q === 'number')       this.parameters.band2Q = q
    if (typeof active === 'boolean') this.parameters.band2State = active ? 0.5 : 0
  }

  /**
   * Configure EQ band 3 frequency, gain, and Q
   * @param hz frequency in hertz (10 to 30000)
   * @param gain band gain in dB (-30 to 30, 0 is unity gain)
   * @param q band width (0.025 to 40, higher is narrower)
   * @param active
   */
  setBand3(hz?: number, gain?: number, q?: number, active = true) {
    if (typeof hz === 'number')      this.parameters.band3FrequencyHz = hz
    if (typeof gain === 'number')    this.parameters.band3GainDb = gain
    if (typeof q === 'number')       this.parameters.band3Q = q
    if (typeof active === 'boolean') this.parameters.band3State = active ? 0.5 : 0
  }

  /**
   * Configure EQ band 4 frequency, gain, and Q
   * @param hz frequency in hertz (10 to 30000)
   * @param gain band gain in dB (-30 to 30, 0 is unity gain)
   * @param q band width (0.025 to 40, higher is narrower)
   * @param active
   */
  setBand4(hz?: number, gain?: number, q?: number, active = true) {
    if (typeof hz === 'number')      this.parameters.band4FrequencyHz = hz
    if (typeof gain === 'number')    this.parameters.band4GainDb = gain
    if (typeof q === 'number')       this.parameters.band4Q = q
    if (typeof active === 'boolean') this.parameters.band4State = active ? 0.5 : 0
  }

  /**
   * Configure EQ band 5 frequency, gain, and Q
   * @param hz frequency in hertz (10 to 30000)
   * @param gain band gain in dB (-30 to 30, 0 is unity gain)
   * @param q band width (0.025 to 40, higher is narrower)
   * @param active
   */
  setBand5(hz?: number, gain?: number, q?: number, active = true) {
    if (typeof hz === 'number')      this.parameters.band5FrequencyHz = hz
    if (typeof gain === 'number')    this.parameters.band5GainDb = gain
    if (typeof q === 'number')       this.parameters.band5Q = q
    if (typeof active === 'boolean') this.parameters.band5State = active ? 0.5 : 0
  }

  /**
   * Configure EQ band 6 frequency, gain, and Q
   * @param hz frequency in hertz (10 to 30000)
   * @param gain band gain in dB (-30 to 30, 0 is unity gain)
   * @param q band width (0.025 to 40, higher is narrower)
   * @param active
   */
  setBand6(hz?: number, gain?: number, q?: number, active = true) {
    if (typeof hz === 'number')      this.parameters.band6FrequencyHz = hz
    if (typeof gain === 'number')    this.parameters.band6GainDb = gain
    if (typeof q === 'number')       this.parameters.band6Q = q
    if (typeof active === 'boolean') this.parameters.band6State = active ? 0.5 : 0
  }

  /**
   * Configure EQ band 7 frequency, gain, and Q
   * @param hz frequency in hertz (10 to 30000)
   * @param gain band gain in dB (-30 to 30, 0 is unity gain)
   * @param q band width (0.025 to 40, higher is narrower)
   * @param active
   */
  setBand7(hz?: number, gain?: number, q?: number, active = true) {
    if (typeof hz === 'number')      this.parameters.band7FrequencyHz = hz
    if (typeof gain === 'number')    this.parameters.band7GainDb = gain
    if (typeof q === 'number')       this.parameters.band7Q = q
    if (typeof active === 'boolean') this.parameters.band7State = active ? 0.5 : 0
  }

  /**
   * Configure EQ band 8 frequency, gain, and Q
   * @param hz frequency in hertz (10 to 30000)
   * @param gain band gain in dB (-30 to 30, 0 is unity gain)
   * @param q band width (0.025 to 40, higher is narrower)
   * @param active
   */
  setBand8(hz?: number, gain?: number, q?: number, active = true) {
    if (typeof hz === 'number')      this.parameters.band8FrequencyHz = hz
    if (typeof gain === 'number')    this.parameters.band8GainDb = gain
    if (typeof q === 'number')       this.parameters.band8Q = q
    if (typeof active === 'boolean') this.parameters.band8State = active ? 0.5 : 0
  }
}
