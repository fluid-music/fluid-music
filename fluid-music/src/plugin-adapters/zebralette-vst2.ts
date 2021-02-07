import { PluginType, FluidPlugin } from '../FluidPlugin';
import { PluginAutomation } from '../techniques';
const pluginName = 'Zebralette'
const pluginType = PluginType.VST2

export interface ZebraletteVst2Parameters {
  /** value from 0 to 200 */
  mainOutput? : number;
  mainActiveLfog? : number;
  mainActiveModFX1? : number;
  mainActiveDelay1? : number;
  /** value from 0.1 to 8 */
  lfogSync? : number;
  /** percent value from 0 to 100 */
  lfogPhasePercent? : number;
  vccActiveLfo1? : number;
  vccActiveOsc1? : number;
  vccVoices? : number;
  vccMode? : number;
  vccGlideMode? : number;
  /** percent value from 0 to 100 */
  vccGlidePercent? : number;
  /** percent value from -100 to 100 */
  vccGlide2Percent? : number;
  /** percent value from 0 to 100 */
  vccPortaRangePercent? : number;
  vccPitchBendUp? : number;
  vccPitchBendDown? : number;
  /** An integer value from -24 to 24 */
  vccTranspose? : number;
  /** percent value from -100 to 100 */
  vccFineTuneCentsPercent? : number;
  /** percent value from 0 to 100 */
  env1InitPercent? : number;
  /** percent value from 0 to 100 */
  env1AttackPercent? : number;
  /** percent value from 0 to 100 */
  env1DecayPercent? : number;
  /** percent value from 0 to 100 */
  env1SustainPercent? : number;
  /** percent value from -100 to 100 */
  env1FallRisePercent? : number;
  /** percent value from 0 to 100 */
  env1Sustain2Percent? : number;
  /** percent value from 0 to 100 */
  env1ReleasePercent? : number;
  /** percent value from -100 to 100 */
  env1VelocityPercent? : number;
  /** percent value from -100 to 100 */
  env1SlopePercent? : number;
  /** percent value from -100 to 100 */
  mseg1VelocityPercent? : number;
  /** value from -4 to 4 */
  mseg1Attack? : number;
  /** value from -4 to 4 */
  mseg1Loop? : number;
  /** value from -4 to 4 */
  mseg1Release? : number;
  /** value from 0.1 to 8 */
  lfo1Sync? : number;
  /** percent value from 0 to 100 */
  lfo1DelayPercent? : number;
  /** value from -48 to 48 */
  osc1Tune? : number;
  osc1TuneModSrc? : number;
  /** value from -48 to 48 */
  osc1TuneModDepth? : number;
  /** percent value from 0 to 100 */
  osc1PhasePercent? : number;
  osc1PhaseModSrc? : number;
  /** value from -50 to 50 */
  osc1PhaseModDepth? : number;
  /** value from 1 to 16 */
  osc1WaveWarp? : number;
  osc1WarpModSrc? : number;
  /** value from -16 to 16 */
  osc1WarpModDepth? : number;
  /** percent value from 0 to 100 */
  osc1VibratoPercent? : number;
  /** percent value from -100 to 100 */
  osc1SpectraFX1ValPercent? : number;
  osc1Sfx1modsrc? : number;
  /** percent value from -100 to 100 */
  osc1Sfx1moddepthPercent? : number;
  /** percent value from -100 to 100 */
  osc1SpectraFX2ValPercent? : number;
  osc1Sfx2modsrc? : number;
  /** percent value from -100 to 100 */
  osc1Sfx2moddepthPercent? : number;
  /** value from -50 to 50 */
  osc1Detune? : number;
  /** value from 0 to 200 */
  osc1Volume? : number;
  osc1VolumeModSrc? : number;
  /** percent value from -100 to 100 */
  osc1VolumeModDepthPercent? : number;
  /** percent value from -100 to 100 */
  osc1PanPercent? : number;
  osc1PanModSrc? : number;
  /** percent value from -100 to 100 */
  osc1PanModDepthPercent? : number;
  /** value from 0 to 36 */
  osc1SyncTune? : number;
  osc1SyncModSrc? : number;
  /** value from -36 to 36 */
  osc1SyncModDepth? : number;
  /** percent value from 0 to 100 */
  osc1PolyWidthPercent? : number;
  /** percent value from 0 to 100 */
  osc1NormalizePercent? : number;
  /** percent value from -100 to 100 */
  vmixPanPercent? : number;
  /** percent value from 0 to 100 */
  vmixVolumePercent? : number;
  /** percent value from -100 to 100 */
  vmixModDepthPercent? : number;
  /** percent value from -100 to 100 */
  vmixPanModDepthPercent? : number;
  /** percent value from 0 to 100 */
  modFX1CenterPercent? : number;
  /** percent value from 0 to 100 */
  modFX1SpeedPercent? : number;
  /** percent value from 0 to 100 */
  modFX1StereoPercent? : number;
  /** percent value from 0 to 100 */
  modFX1DepthPercent? : number;
  /** percent value from -100 to 100 */
  modFX1FeedbackPercent? : number;
  /** percent value from 0 to 100 */
  modFX1MixPercent? : number;
  /** percent value from 0 to 100 */
  modFX1LowCutFreqPercent? : number;
  /** percent value from 0 to 100 */
  modFX1HiCutFreqPercent? : number;
  /** percent value from 0 to 100 */
  modFX1QuadPercent? : number;
  /** percent value from 0 to 100 */
  modFX1QuadPhasePercent? : number;
  /** value from -12 to 12 */
  modFX1LowBoostDb? : number;
  /** value from -12 to 12 */
  modFX1HighBoostDb? : number;
  /** percent value from 0 to 100 */
  delay1MixPercent? : number;
  /** percent value from 0 to 100 */
  delay1FeedbackPercent? : number;
  /** percent value from 0 to 100 */
  delay1XBackPercent? : number;
  /** percent value from 0 to 100 */
  delay1LowpassPercent? : number;
  /** percent value from 0 to 100 */
  delay1HipassPercent? : number;
  lfogWaveform? : number;
  lfogPolarity? : number;
  lfo1Restart? : number;
  lfo1Waveform? : number;
  /** percent value from 0 to 100 */
  lfo1PhasePercent? : number;
  lfo1Polarity? : number;
  /** percent value from 0 to 100 */
  lfo1DepthModDpt1Percent? : number;
  /** value from -5 to 5 */
  lfo1Rate? : number;
  /** value from -5 to 5 */
  lfo1FreqModDpt? : number;
}
const parameterLibrary = {
  mainOutput: { name: 'main: Output', index: 0, isLinear: true, range: [0, 200] as [number, number] },
  mainActiveLfog: { name: 'main: Active #LFOG', index: 1, isLinear: false, choices: {"off":0,"on":1} },
  mainActiveModFX1: { name: 'main: Active #ModFX1', index: 2, isLinear: false, choices: {"off":0,"on":1} },
  mainActiveDelay1: { name: 'main: Active #Delay1', index: 3, isLinear: false, choices: {"off":0,"on":1} },
  lfogSync: { name: 'LFOG: Sync', index: 4, isLinear: false, range: [0.1, 8] as [number, number], choices: {"0.1s":0,"1s":0.0357142873108387,"10s":0.0714285746216774,"1/64":0.1071428656578064,"1/32":0.1428571492433548,"1/16":0.1785714328289032,"1/8":0.2142857313156128,"1/4":0.2857142984867096,"1/2":0.3214285969734192,"1/1":0.3571428656578064,"1/32 dot":0.392857164144516,"1/16 dot":0.4285714626312256,"1/8 dot":0.4642857313156128,"1/4 dot":0.5,"1/2 dot":0.535714328289032,"1/16 trip":0.5714285969734192,"1/8 trip":0.6071428656578064,"1/4 trip":0.6428571939468384,"1/2 trip":0.6785714626312256,"1/1 trip":0.7142857313156128,"2/1":0.785714328289032,"3/1":0.8214285969734192,"4/1":0.8571429252624512,"5/1":0.8928571939468384,"6/1":0.9285714626312256,"7/1":0.9642857313156128,"8/1":1} },
  lfogPhasePercent: { name: 'LFOG: Phase', index: 5, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vccActiveLfo1: { name: 'VCC: Active #LFO1', index: 6, isLinear: false, choices: {"0.00":0,"1.00":1} },
  vccActiveOsc1: { name: 'VCC: Active #OSC1', index: 7, isLinear: false, choices: {"0.00":0,"1.00":1} },
  vccVoices: { name: 'VCC: Voices', index: 8, isLinear: false, choices: {"few":0.2142857313156128,"medium":0.7142857313156128,"many":1} },
  vccMode: { name: 'VCC: Mode', index: 10, isLinear: false, choices: {"poly":0.2142857313156128,"mono":0.7142857313156128,"legato":1} },
  vccGlideMode: { name: 'VCC: GlideMode', index: 11, isLinear: false, choices: {"time":0,"rate":1} },
  vccGlidePercent: { name: 'VCC: Glide', index: 12, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vccGlide2Percent: { name: 'VCC: Glide2', index: 13, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccPortaRangePercent: { name: 'VCC: PortaRange', index: 14, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vccPitchBendUp: { name: 'VCC: PitchBend Up', index: 15, isLinear: false, choices: {"0.00":0,"1.00":0.0357142873108387,"2.00":0.0714285746216774,"3.00":0.1428571492433548,"4.00":0.1785714328289032,"5.00":0.2142857313156128,"6.00":0.25,"7.00":0.2857142984867096,"8.00":0.3214285969734192,"9.00":0.392857164144516,"10.00":0.4285714626312256,"11.00":0.4642857313156128,"12.00":0.5,"13.00":0.535714328289032,"14.00":0.5714285969734192,"15.00":0.6428571939468384,"16.00":0.6785714626312256,"17.00":0.7142857313156128,"18.00":0.7500000596046448,"19.00":0.785714328289032,"20.00":0.8214285969734192,"21.00":0.8928571939468384,"22.00":0.9285714626312256,"23.00":0.9642857313156128,"24.00":1} },
  vccPitchBendDown: { name: 'VCC: PitchBend Down', index: 16, isLinear: false, choices: {"0.00":0,"1.00":0.0357142873108387,"2.00":0.0714285746216774,"3.00":0.1428571492433548,"4.00":0.1785714328289032,"5.00":0.2142857313156128,"6.00":0.25,"7.00":0.2857142984867096,"8.00":0.3214285969734192,"9.00":0.392857164144516,"10.00":0.4285714626312256,"11.00":0.4642857313156128,"12.00":0.5,"13.00":0.535714328289032,"14.00":0.5714285969734192,"15.00":0.6428571939468384,"16.00":0.6785714626312256,"17.00":0.7142857313156128,"18.00":0.7500000596046448,"19.00":0.785714328289032,"20.00":0.8214285969734192,"21.00":0.8928571939468384,"22.00":0.9285714626312256,"23.00":0.9642857313156128,"24.00":1} },
  vccTranspose: { name: 'VCC: Transpose', index: 17, isLinear: true, range: [-24, 24] as [number, number] },
  vccFineTuneCentsPercent: { name: 'VCC: FineTuneCents', index: 18, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  env1InitPercent: { name: 'ENV1: Init', index: 19, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  env1AttackPercent: { name: 'ENV1: Attack', index: 20, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  env1DecayPercent: { name: 'ENV1: Decay', index: 21, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  env1SustainPercent: { name: 'ENV1: Sustain', index: 22, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  env1FallRisePercent: { name: 'ENV1: Fall/Rise', index: 23, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  env1Sustain2Percent: { name: 'ENV1: Sustain2', index: 24, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  env1ReleasePercent: { name: 'ENV1: Release', index: 25, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  env1VelocityPercent: { name: 'ENV1: Velocity', index: 26, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  env1SlopePercent: { name: 'ENV1: Slope', index: 27, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  mseg1VelocityPercent: { name: 'MSEG1: Velocity', index: 28, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  mseg1Attack: { name: 'MSEG1: Attack', index: 29, isLinear: true, range: [-4, 4] as [number, number] },
  mseg1Loop: { name: 'MSEG1: Loop', index: 30, isLinear: true, range: [-4, 4] as [number, number] },
  mseg1Release: { name: 'MSEG1: Release', index: 31, isLinear: true, range: [-4, 4] as [number, number] },
  lfo1Sync: { name: 'LFO1: Sync', index: 32, isLinear: false, range: [0.1, 8] as [number, number], choices: {"0.1s":0,"1s":0.0357142873108387,"10s":0.0714285746216774,"1/64":0.1071428656578064,"1/32":0.1428571492433548,"1/16":0.1785714328289032,"1/8":0.2142857313156128,"1/4":0.2857142984867096,"1/2":0.3214285969734192,"1/1":0.3571428656578064,"1/32 dot":0.392857164144516,"1/16 dot":0.4285714626312256,"1/8 dot":0.4642857313156128,"1/4 dot":0.5,"1/2 dot":0.535714328289032,"1/16 trip":0.5714285969734192,"1/8 trip":0.6071428656578064,"1/4 trip":0.6428571939468384,"1/2 trip":0.6785714626312256,"1/1 trip":0.7142857313156128,"2/1":0.785714328289032,"3/1":0.8214285969734192,"4/1":0.8571429252624512,"5/1":0.8928571939468384,"6/1":0.9285714626312256,"7/1":0.9642857313156128,"8/1":1} },
  lfo1DelayPercent: { name: 'LFO1: Delay', index: 33, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  osc1Tune: { name: 'OSC1: Tune', index: 34, isLinear: true, range: [-48, 48] as [number, number] },
  osc1TuneModSrc: { name: 'OSC1: TuneModSrc', index: 35, isLinear: false, choices: {"none":0.0357142873108387,"modwhl":0.1071428656578064,"pitchw":0.1785714328289032,"ctrla":0.2857142984867096,"ctrlb":0.3571428656578064,"lfog1":0.4285714626312256,"gate":0.535714328289032,"velocity":0.6071428656578064,"pressure":0.6785714626312256,"keyfollow":0.785714328289032,"env1":0.8571429252624512,"mseg1":0.9285714626312256,"lfo1":1} },
  osc1TuneModDepth: { name: 'OSC1: TuneModDepth', index: 36, isLinear: true, range: [-48, 48] as [number, number] },
  osc1PhasePercent: { name: 'OSC1: Phase', index: 37, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  osc1PhaseModSrc: { name: 'OSC1: PhaseModSrc', index: 38, isLinear: false, choices: {"none":0.0357142873108387,"modwhl":0.1071428656578064,"pitchw":0.1785714328289032,"ctrla":0.2857142984867096,"ctrlb":0.3571428656578064,"lfog1":0.4285714626312256,"gate":0.535714328289032,"velocity":0.6071428656578064,"pressure":0.6785714626312256,"keyfollow":0.785714328289032,"env1":0.8571429252624512,"mseg1":0.9285714626312256,"lfo1":1} },
  osc1PhaseModDepth: { name: 'OSC1: PhaseModDepth', index: 39, isLinear: true, range: [-50, 50] as [number, number] },
  osc1WaveWarp: { name: 'OSC1: WaveWarp', index: 40, isLinear: true, range: [1, 16] as [number, number] },
  osc1WarpModSrc: { name: 'OSC1: WarpModSrc', index: 41, isLinear: false, choices: {"none":0.0357142873108387,"modwhl":0.1071428656578064,"pitchw":0.1785714328289032,"ctrla":0.2857142984867096,"ctrlb":0.3571428656578064,"lfog1":0.4285714626312256,"gate":0.535714328289032,"velocity":0.6071428656578064,"pressure":0.6785714626312256,"keyfollow":0.785714328289032,"env1":0.8571429252624512,"mseg1":0.9285714626312256,"lfo1":1} },
  osc1WarpModDepth: { name: 'OSC1: WarpModDepth', index: 42, isLinear: true, range: [-16, 16] as [number, number] },
  osc1VibratoPercent: { name: 'OSC1: Vibrato', index: 43, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  osc1SpectraFX1ValPercent: { name: 'OSC1: SpectraFX1 Val', index: 44, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  osc1Sfx1modsrc: { name: 'OSC1: SFX1ModSrc', index: 45, isLinear: false, choices: {"none":0.0357142873108387,"modwhl":0.1071428656578064,"pitchw":0.1785714328289032,"ctrla":0.2857142984867096,"ctrlb":0.3571428656578064,"lfog1":0.4285714626312256,"gate":0.535714328289032,"velocity":0.6071428656578064,"pressure":0.6785714626312256,"keyfollow":0.785714328289032,"env1":0.8571429252624512,"mseg1":0.9285714626312256,"lfo1":1} },
  osc1Sfx1moddepthPercent: { name: 'OSC1: SFX1ModDepth', index: 46, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  osc1SpectraFX2ValPercent: { name: 'OSC1: SpectraFX2 Val', index: 47, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  osc1Sfx2modsrc: { name: 'OSC1: SFX2ModSrc', index: 48, isLinear: false, choices: {"none":0.0357142873108387,"modwhl":0.1071428656578064,"pitchw":0.1785714328289032,"ctrla":0.2857142984867096,"ctrlb":0.3571428656578064,"lfog1":0.4285714626312256,"gate":0.535714328289032,"velocity":0.6071428656578064,"pressure":0.6785714626312256,"keyfollow":0.785714328289032,"env1":0.8571429252624512,"mseg1":0.9285714626312256,"lfo1":1} },
  osc1Sfx2moddepthPercent: { name: 'OSC1: SFX2ModDepth', index: 49, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  osc1Detune: { name: 'OSC1: Detune', index: 50, isLinear: true, range: [-50, 50] as [number, number] },
  osc1Volume: { name: 'OSC1: Volume', index: 51, isLinear: true, range: [0, 200] as [number, number] },
  osc1VolumeModSrc: { name: 'OSC1: VolumeModSrc', index: 52, isLinear: false, choices: {"none":0.0357142873108387,"modwhl":0.1071428656578064,"pitchw":0.1785714328289032,"ctrla":0.2857142984867096,"ctrlb":0.3571428656578064,"lfog1":0.4285714626312256,"gate":0.535714328289032,"velocity":0.6071428656578064,"pressure":0.6785714626312256,"keyfollow":0.785714328289032,"env1":0.8571429252624512,"mseg1":0.9285714626312256,"lfo1":1} },
  osc1VolumeModDepthPercent: { name: 'OSC1: VolumeModDepth', index: 53, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  osc1PanPercent: { name: 'OSC1: Pan', index: 54, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  osc1PanModSrc: { name: 'OSC1: PanModSrc', index: 55, isLinear: false, choices: {"none":0.0357142873108387,"modwhl":0.1071428656578064,"pitchw":0.1785714328289032,"ctrla":0.2857142984867096,"ctrlb":0.3571428656578064,"lfog1":0.4285714626312256,"gate":0.535714328289032,"velocity":0.6071428656578064,"pressure":0.6785714626312256,"keyfollow":0.785714328289032,"env1":0.8571429252624512,"mseg1":0.9285714626312256,"lfo1":1} },
  osc1PanModDepthPercent: { name: 'OSC1: PanModDepth', index: 56, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  osc1SyncTune: { name: 'OSC1: SyncTune', index: 57, isLinear: true, range: [0, 36] as [number, number] },
  osc1SyncModSrc: { name: 'OSC1: SyncModSrc', index: 58, isLinear: false, choices: {"none":0.0357142873108387,"modwhl":0.1071428656578064,"pitchw":0.1785714328289032,"ctrla":0.2857142984867096,"ctrlb":0.3571428656578064,"lfog1":0.4285714626312256,"gate":0.535714328289032,"velocity":0.6071428656578064,"pressure":0.6785714626312256,"keyfollow":0.785714328289032,"env1":0.8571429252624512,"mseg1":0.9285714626312256,"lfo1":1} },
  osc1SyncModDepth: { name: 'OSC1: SyncModDepth', index: 59, isLinear: true, range: [-36, 36] as [number, number] },
  osc1PolyWidthPercent: { name: 'OSC1: Poly Width', index: 60, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  osc1NormalizePercent: { name: 'OSC1: Normalize', index: 61, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vmixPanPercent: { name: 'VMix: Pan', index: 62, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vmixVolumePercent: { name: 'VMix: Volume', index: 63, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vmixModDepthPercent: { name: 'VMix: ModDepth', index: 64, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vmixPanModDepthPercent: { name: 'VMix: PanModDepth', index: 65, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  modFX1CenterPercent: { name: 'ModFX1: Center', index: 66, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  modFX1SpeedPercent: { name: 'ModFX1: Speed', index: 67, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  modFX1StereoPercent: { name: 'ModFX1: Stereo', index: 68, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  modFX1DepthPercent: { name: 'ModFX1: Depth', index: 69, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  modFX1FeedbackPercent: { name: 'ModFX1: Feedback', index: 70, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  modFX1MixPercent: { name: 'ModFX1: Mix', index: 71, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  modFX1LowCutFreqPercent: { name: 'ModFX1: LowCut Freq', index: 72, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  modFX1HiCutFreqPercent: { name: 'ModFX1: HiCut Freq', index: 73, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  modFX1QuadPercent: { name: 'ModFX1: Quad', index: 74, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  modFX1QuadPhasePercent: { name: 'ModFX1: QuadPhase', index: 75, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  modFX1LowBoostDb: { name: 'ModFX1: Low Boost dB', index: 76, isLinear: true, range: [-12, 12] as [number, number] },
  modFX1HighBoostDb: { name: 'ModFX1: High Boost dB', index: 77, isLinear: true, range: [-12, 12] as [number, number] },
  delay1MixPercent: { name: 'Delay1: Mix', index: 78, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  delay1FeedbackPercent: { name: 'Delay1: Feedback', index: 79, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  delay1XBackPercent: { name: 'Delay1: X-back', index: 80, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  delay1LowpassPercent: { name: 'Delay1: Lowpass', index: 81, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  delay1HipassPercent: { name: 'Delay1: Hipass', index: 82, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  lfogWaveform: { name: 'LFOG: Waveform', index: 83, isLinear: false, choices: {"sine":0.0357142873108387,"triangle":0.1785714328289032,"saw up":0.3214285969734192,"saw down":0.4642857313156128,"sqr hi-lo":0.6071428656578064,"sqr lo-hi":0.7500000596046448,"rand hold":0.8928571939468384,"rand glide":1} },
  lfogPolarity: { name: 'LFOG: Polarity', index: 84, isLinear: false, choices: {"bipolar":0,"positive":1} },
  lfo1Restart: { name: 'LFO1: Restart', index: 85, isLinear: false, choices: {"sync":0.1428571492433548,"gate":0.4642857313156128,"single":0.8214285969734192,"random":1} },
  lfo1Waveform: { name: 'LFO1: Waveform', index: 86, isLinear: false, choices: {"sine":0.0357142873108387,"triangle":0.1785714328289032,"saw up":0.3214285969734192,"saw down":0.4642857313156128,"sqr hi-lo":0.6071428656578064,"sqr lo-hi":0.7500000596046448,"rand hold":0.8928571939468384,"rand glide":1} },
  lfo1PhasePercent: { name: 'LFO1: Phase', index: 87, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  lfo1Polarity: { name: 'LFO1: Polarity', index: 88, isLinear: false, choices: {"bipolar":0,"positive":1} },
  lfo1DepthModDpt1Percent: { name: 'LFO1: DepthMod Dpt1', index: 89, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  lfo1Rate: { name: 'LFO1: Rate', index: 90, isLinear: true, range: [-5, 5] as [number, number] },
  lfo1FreqModDpt: { name: 'LFO1: FreqMod Dpt', index: 91, isLinear: true, range: [-5, 5] as [number, number] }
}
const makeAutomation = {
  mainOutput (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mainOutput',
    });
  },
  mainActiveLfog (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mainActiveLfog',
    });
  },
  mainActiveModFX1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mainActiveModFX1',
    });
  },
  mainActiveDelay1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mainActiveDelay1',
    });
  },
  lfogSync (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfogSync',
    });
  },
  lfogPhasePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfogPhasePercent',
    });
  },
  vccActiveLfo1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccActiveLfo1',
    });
  },
  vccActiveOsc1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccActiveOsc1',
    });
  },
  vccVoices (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccVoices',
    });
  },
  vccMode (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccMode',
    });
  },
  vccGlideMode (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccGlideMode',
    });
  },
  vccGlidePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccGlidePercent',
    });
  },
  vccGlide2Percent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccGlide2Percent',
    });
  },
  vccPortaRangePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccPortaRangePercent',
    });
  },
  vccPitchBendUp (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccPitchBendUp',
    });
  },
  vccPitchBendDown (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccPitchBendDown',
    });
  },
  vccTranspose (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccTranspose',
    });
  },
  vccFineTuneCentsPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccFineTuneCentsPercent',
    });
  },
  env1InitPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1InitPercent',
    });
  },
  env1AttackPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1AttackPercent',
    });
  },
  env1DecayPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1DecayPercent',
    });
  },
  env1SustainPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1SustainPercent',
    });
  },
  env1FallRisePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1FallRisePercent',
    });
  },
  env1Sustain2Percent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1Sustain2Percent',
    });
  },
  env1ReleasePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1ReleasePercent',
    });
  },
  env1VelocityPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1VelocityPercent',
    });
  },
  env1SlopePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1SlopePercent',
    });
  },
  mseg1VelocityPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mseg1VelocityPercent',
    });
  },
  mseg1Attack (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mseg1Attack',
    });
  },
  mseg1Loop (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mseg1Loop',
    });
  },
  mseg1Release (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mseg1Release',
    });
  },
  lfo1Sync (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Sync',
    });
  },
  lfo1DelayPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1DelayPercent',
    });
  },
  osc1Tune (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1Tune',
    });
  },
  osc1TuneModSrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1TuneModSrc',
    });
  },
  osc1TuneModDepth (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1TuneModDepth',
    });
  },
  osc1PhasePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1PhasePercent',
    });
  },
  osc1PhaseModSrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1PhaseModSrc',
    });
  },
  osc1PhaseModDepth (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1PhaseModDepth',
    });
  },
  osc1WaveWarp (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1WaveWarp',
    });
  },
  osc1WarpModSrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1WarpModSrc',
    });
  },
  osc1WarpModDepth (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1WarpModDepth',
    });
  },
  osc1VibratoPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1VibratoPercent',
    });
  },
  osc1SpectraFX1ValPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1SpectraFX1ValPercent',
    });
  },
  osc1Sfx1modsrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1Sfx1modsrc',
    });
  },
  osc1Sfx1moddepthPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1Sfx1moddepthPercent',
    });
  },
  osc1SpectraFX2ValPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1SpectraFX2ValPercent',
    });
  },
  osc1Sfx2modsrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1Sfx2modsrc',
    });
  },
  osc1Sfx2moddepthPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1Sfx2moddepthPercent',
    });
  },
  osc1Detune (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1Detune',
    });
  },
  osc1Volume (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1Volume',
    });
  },
  osc1VolumeModSrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1VolumeModSrc',
    });
  },
  osc1VolumeModDepthPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1VolumeModDepthPercent',
    });
  },
  osc1PanPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1PanPercent',
    });
  },
  osc1PanModSrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1PanModSrc',
    });
  },
  osc1PanModDepthPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1PanModDepthPercent',
    });
  },
  osc1SyncTune (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1SyncTune',
    });
  },
  osc1SyncModSrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1SyncModSrc',
    });
  },
  osc1SyncModDepth (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1SyncModDepth',
    });
  },
  osc1PolyWidthPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1PolyWidthPercent',
    });
  },
  osc1NormalizePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1NormalizePercent',
    });
  },
  vmixPanPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vmixPanPercent',
    });
  },
  vmixVolumePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vmixVolumePercent',
    });
  },
  vmixModDepthPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vmixModDepthPercent',
    });
  },
  vmixPanModDepthPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vmixPanModDepthPercent',
    });
  },
  modFX1CenterPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1CenterPercent',
    });
  },
  modFX1SpeedPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1SpeedPercent',
    });
  },
  modFX1StereoPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1StereoPercent',
    });
  },
  modFX1DepthPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1DepthPercent',
    });
  },
  modFX1FeedbackPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1FeedbackPercent',
    });
  },
  modFX1MixPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1MixPercent',
    });
  },
  modFX1LowCutFreqPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1LowCutFreqPercent',
    });
  },
  modFX1HiCutFreqPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1HiCutFreqPercent',
    });
  },
  modFX1QuadPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1QuadPercent',
    });
  },
  modFX1QuadPhasePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1QuadPhasePercent',
    });
  },
  modFX1LowBoostDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1LowBoostDb',
    });
  },
  modFX1HighBoostDb (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'modFX1HighBoostDb',
    });
  },
  delay1MixPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'delay1MixPercent',
    });
  },
  delay1FeedbackPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'delay1FeedbackPercent',
    });
  },
  delay1XBackPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'delay1XBackPercent',
    });
  },
  delay1LowpassPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'delay1LowpassPercent',
    });
  },
  delay1HipassPercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'delay1HipassPercent',
    });
  },
  lfogWaveform (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfogWaveform',
    });
  },
  lfogPolarity (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfogPolarity',
    });
  },
  lfo1Restart (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Restart',
    });
  },
  lfo1Waveform (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Waveform',
    });
  },
  lfo1PhasePercent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1PhasePercent',
    });
  },
  lfo1Polarity (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Polarity',
    });
  },
  lfo1DepthModDpt1Percent (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1DepthModDpt1Percent',
    });
  },
  lfo1Rate (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Rate',
    });
  },
  lfo1FreqModDpt (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1FreqModDpt',
    });
  }
}
export class ZebraletteVst2 extends FluidPlugin {
  constructor(
    public readonly parameters : ZebraletteVst2Parameters = {},
  ) {
    super(pluginName, pluginType)
    this.vst2.uid = 1397572659
    this.vst2.vendor = 'u-he'
    this.numAudioInputChannels = 0
    this.numAudioOutputChannels = 2
    this.isSynth = true
  }

  readonly parameterLibrary = parameterLibrary;
  readonly makeAutomation = makeAutomation;

  // Static members
  static readonly parameterLibrary = parameterLibrary;
  static readonly makeAutomation = makeAutomation;
}
