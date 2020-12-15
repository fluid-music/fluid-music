import { PluginType, FluidPlugin } from '../FluidPlugin';
import { PluginAutomation } from '../techniques';
const pluginName = 'TyrellN6'
const pluginType = PluginType.VST2

export interface TyrellN6Vst2Parameters {
  /** value from 0 to 200 */
  mainOutput? : number;
  pcoreMatrix1Source? : number;
  /** value from -100 to 100 */
  pcoreMatrix1Depth? : number;
  pcoreMatrix1ViaSrc? : number;
  /** value from -100 to 100 */
  pcoreMatrix1Via? : number;
  pcoreMatrix2Source? : number;
  /** value from -100 to 100 */
  pcoreMatrix2Depth? : number;
  pcoreMatrix2ViaSrc? : number;
  /** value from -100 to 100 */
  pcoreMatrix2Via? : number;
  vccVoiceStack? : number;
  vccMode? : number;
  vccGlideMode? : number;
  /** value from 0 to 100 */
  vccGlide? : number;
  /** value from -100 to 100 */
  vccGlide2? : number;
  /** value from 0 to 100 */
  vccPortaRange? : number;
  vccPitchBendUp? : number;
  vccPitchBendDown? : number;
  /** value from -24 to 24 */
  vccTranspose? : number;
  /** value from 0 to 100 */
  env1Attack? : number;
  /** value from 0 to 100 */
  env1Decay? : number;
  /** value from 0 to 100 */
  env1Sustain? : number;
  /** value from -100 to 100 */
  env1FallRise? : number;
  /** value from 0 to 100 */
  env1Release? : number;
  /** value from 0 to 100 */
  env1Velocity? : number;
  /** value from -100 to 100 */
  env1KeyTrack? : number;
  env1Trigger? : number;
  /** value from 0 to 100 */
  env2Attack? : number;
  /** value from 0 to 100 */
  env2Decay? : number;
  /** value from 0 to 100 */
  env2Sustain? : number;
  /** value from -100 to 100 */
  env2FallRise? : number;
  /** value from 0 to 100 */
  env2Release? : number;
  /** value from 0 to 100 */
  env2Velocity? : number;
  /** value from -100 to 100 */
  env2KeyTrack? : number;
  env2Trigger? : number;
  /** value from 0.1 to 8 */
  lfo1Sync? : number;
  /** value from 0 to 100 */
  lfo1Delay? : number;
  /** value from 0.1 to 8 */
  lfo2Sync? : number;
  /** value from 0 to 100 */
  lfo2Delay? : number;
  /** value from 1 to 4 */
  tyrellShape1? : number;
  tyrellTuneModSrc1? : number;
  /** value from -24 to 24 */
  tyrellTuneModDepth1? : number;
  /** value from 1 to 2 */
  tyrellShape2? : number;
  /** value from 0 to 24 */
  tyrellTune2? : number;
  /** value from -50 to 50 */
  tyrellFineTune2? : number;
  tyrellTuneModSrc2? : number;
  /** value from -24 to 24 */
  tyrellTuneModDepth2? : number;
  /** value from 0 to 50 */
  tyrellPwdepth? : number;
  tyrellPwsrc? : number;
  /** value from -50 to 50 */
  tyrellDetune? : number;
  /** value from 0 to 100 */
  tyrellSoftSync? : number;
  /** value from 0 to 100 */
  tyrellVibrato? : number;
  tyrellRingModIn1? : number;
  tyrellRingModIn2? : number;
  /** value from 1 to 3 */
  tyrellNoiseColour? : number;
  /** value from -100 to 25 */
  tyrellOscVolume1? : number;
  /** value from -100 to 25 */
  tyrellOscVolume2? : number;
  /** value from -100 to 25 */
  tyrellSubVolume? : number;
  /** value from -100 to 25 */
  tyrellNoiseVolume? : number;
  /** value from -100 to 25 */
  tyrellRingModulator? : number;
  /** value from -100 to 25 */
  tyrellFeedback? : number;
  tyrellVcfmode? : number;
  tyrellVcfpoles? : number;
  /** value from 30 to 150 */
  tyrellCutoff? : number;
  tyrellFreqModSrc1? : number;
  /** value from -120 to 120 */
  tyrellFreqModDepth1? : number;
  tyrellFreqModSrc2? : number;
  /** value from -120 to 120 */
  tyrellFreqModDepth2? : number;
  /** value from 0 to 100 */
  tyrellKeyFollow? : number;
  /** value from 0 to 100 */
  tyrellResonance? : number;
  /** value from 0 to 100 */
  tyrellMixSpread? : number;
  tyrellAudioRateSrc? : number;
  tyrellAudioRateDest? : number;
  /** value from 0 to 100 */
  tyrellXmoddepth? : number;
  tyrellAudioRateModSrc? : number;
  chrs1Type? : number;
  /** value from 0 to 100 */
  chrs1Rate? : number;
  /** value from 0 to 100 */
  chrs1Depth? : number;
  /** value from 0 to 100 */
  chrs1Wet? : number;
  lfo1Restart? : number;
  lfo1Waveform? : number;
  /** value from 0 to 100 */
  lfo1Phase? : number;
  lfo1Polarity? : number;
  /** value from 0 to 100 */
  lfo1DepthModDpt1? : number;
  /** value from -5 to 5 */
  lfo1Rate? : number;
  /** value from -5 to 5 */
  lfo1FreqModDpt? : number;
  lfo2Restart? : number;
  lfo2Waveform? : number;
  /** value from 0 to 100 */
  lfo2Phase? : number;
  lfo2Polarity? : number;
  /** value from 0 to 100 */
  lfo2DepthModDpt1? : number;
  /** value from -5 to 5 */
  lfo2Rate? : number;
  /** value from -5 to 5 */
  lfo2FreqModDpt? : number;
}
const parameterLibrary = {
  mainOutput: { name: 'main: Output', index: 0, isLinear: true, range: [0, 200] as [number, number] },
  pcoreMatrix1Source: { name: 'PCore: Matrix1 Source', index: 1, isLinear: false, choices: {"none":0,"modwhl":0.0714285746216774,"pitchw":0.1428571492433548,"breath":0.2142857313156128,"xpress":0.25,"gate":0.3214285969734192,"velocity":0.392857164144516,"pressure":0.4642857313156128,"keyfollow":0.5,"keyfollow2":0.5714285969734192,"alternate":0.6428571939468384,"random":0.7142857313156128,"stackvoice":0.7500000596046448,"adsr1":0.8214285969734192,"adsr2":0.8928571939468384,"lfo1":0.9642857313156128,"lfo2":1} },
  pcoreMatrix1Depth: { name: 'PCore: Matrix1 Depth', index: 2, isLinear: true, range: [-100, 100] as [number, number] },
  pcoreMatrix1ViaSrc: { name: 'PCore: Matrix1 ViaSrc', index: 3, isLinear: false, choices: {"none":0,"modwhl":0.0714285746216774,"pitchw":0.1428571492433548,"breath":0.2142857313156128,"xpress":0.25,"gate":0.3214285969734192,"velocity":0.392857164144516,"pressure":0.4642857313156128,"keyfollow":0.5,"keyfollow2":0.5714285969734192,"alternate":0.6428571939468384,"random":0.7142857313156128,"stackvoice":0.7500000596046448,"adsr1":0.8214285969734192,"adsr2":0.8928571939468384,"lfo1":0.9642857313156128,"lfo2":1} },
  pcoreMatrix1Via: { name: 'PCore: Matrix1 Via', index: 4, isLinear: true, range: [-100, 100] as [number, number] },
  pcoreMatrix2Source: { name: 'PCore: Matrix2 Source', index: 5, isLinear: false, choices: {"none":0,"modwhl":0.0714285746216774,"pitchw":0.1428571492433548,"breath":0.2142857313156128,"xpress":0.25,"gate":0.3214285969734192,"velocity":0.392857164144516,"pressure":0.4642857313156128,"keyfollow":0.5,"keyfollow2":0.5714285969734192,"alternate":0.6428571939468384,"random":0.7142857313156128,"stackvoice":0.7500000596046448,"adsr1":0.8214285969734192,"adsr2":0.8928571939468384,"lfo1":0.9642857313156128,"lfo2":1} },
  pcoreMatrix2Depth: { name: 'PCore: Matrix2 Depth', index: 6, isLinear: true, range: [-100, 100] as [number, number] },
  pcoreMatrix2ViaSrc: { name: 'PCore: Matrix2 ViaSrc', index: 7, isLinear: false, choices: {"none":0,"modwhl":0.0714285746216774,"pitchw":0.1428571492433548,"breath":0.2142857313156128,"xpress":0.25,"gate":0.3214285969734192,"velocity":0.392857164144516,"pressure":0.4642857313156128,"keyfollow":0.5,"keyfollow2":0.5714285969734192,"alternate":0.6428571939468384,"random":0.7142857313156128,"stackvoice":0.7500000596046448,"adsr1":0.8214285969734192,"adsr2":0.8928571939468384,"lfo1":0.9642857313156128,"lfo2":1} },
  pcoreMatrix2Via: { name: 'PCore: Matrix2 Via', index: 8, isLinear: true, range: [-100, 100] as [number, number] },
  vccVoiceStack: { name: 'VCC: Voice Stack', index: 9, isLinear: false, choices: {"1.00":0.0357142873108387,"2.00":0.1785714328289032,"3.00":0.3214285969734192,"4.00":0.4642857313156128,"5.00":0.6071428656578064,"6.00":0.7500000596046448,"7.00":0.8928571939468384,"8.00":1} },
  vccMode: { name: 'VCC: Mode', index: 10, isLinear: false, choices: {"poly":0.1428571492433548,"mono":0.4642857313156128,"legato":0.8214285969734192,"duo":1} },
  vccGlideMode: { name: 'VCC: GlideMode', index: 11, isLinear: false, choices: {"time":0,"rate":1} },
  vccGlide: { name: 'VCC: Glide', index: 12, isLinear: true, range: [0, 100] as [number, number] },
  vccGlide2: { name: 'VCC: Glide2', index: 13, isLinear: true, range: [-100, 100] as [number, number] },
  vccPortaRange: { name: 'VCC: PortaRange', index: 14, isLinear: true, range: [0, 100] as [number, number] },
  vccPitchBendUp: { name: 'VCC: PitchBend Up', index: 15, isLinear: false, choices: {"0.00":0,"1.00":0.0357142873108387,"2.00":0.0714285746216774,"3.00":0.1428571492433548,"4.00":0.1785714328289032,"5.00":0.2142857313156128,"6.00":0.25,"7.00":0.2857142984867096,"8.00":0.3214285969734192,"9.00":0.392857164144516,"10.00":0.4285714626312256,"11.00":0.4642857313156128,"12.00":0.5,"13.00":0.535714328289032,"14.00":0.5714285969734192,"15.00":0.6428571939468384,"16.00":0.6785714626312256,"17.00":0.7142857313156128,"18.00":0.7500000596046448,"19.00":0.785714328289032,"20.00":0.8214285969734192,"21.00":0.8928571939468384,"22.00":0.9285714626312256,"23.00":0.9642857313156128,"24.00":1} },
  vccPitchBendDown: { name: 'VCC: PitchBend Down', index: 16, isLinear: false, choices: {"0.00":0,"1.00":0.0357142873108387,"2.00":0.0714285746216774,"3.00":0.1428571492433548,"4.00":0.1785714328289032,"5.00":0.2142857313156128,"6.00":0.25,"7.00":0.2857142984867096,"8.00":0.3214285969734192,"9.00":0.392857164144516,"10.00":0.4285714626312256,"11.00":0.4642857313156128,"12.00":0.5,"13.00":0.535714328289032,"14.00":0.5714285969734192,"15.00":0.6428571939468384,"16.00":0.6785714626312256,"17.00":0.7142857313156128,"18.00":0.7500000596046448,"19.00":0.785714328289032,"20.00":0.8214285969734192,"21.00":0.8928571939468384,"22.00":0.9285714626312256,"23.00":0.9642857313156128,"24.00":1} },
  vccTranspose: { name: 'VCC: Transpose', index: 17, isLinear: true, range: [-24, 24] as [number, number] },
  env1Attack: { name: 'ENV1: Attack', index: 18, isLinear: true, range: [0, 100] as [number, number] },
  env1Decay: { name: 'ENV1: Decay', index: 19, isLinear: true, range: [0, 100] as [number, number] },
  env1Sustain: { name: 'ENV1: Sustain', index: 20, isLinear: true, range: [0, 100] as [number, number] },
  env1FallRise: { name: 'ENV1: Fall-Rise', index: 21, isLinear: true, range: [-100, 100] as [number, number] },
  env1Release: { name: 'ENV1: Release', index: 22, isLinear: true, range: [0, 100] as [number, number] },
  env1Velocity: { name: 'ENV1: Velocity', index: 23, isLinear: true, range: [0, 100] as [number, number] },
  env1KeyTrack: { name: 'ENV1: KeyTrack', index: 24, isLinear: true, range: [-100, 100] as [number, number] },
  env1Trigger: { name: 'ENV1: Trigger', index: 25, isLinear: false, choices: {"gate":0.1428571492433548,"loop":0.4642857313156128,"lfo1":0.8214285969734192,"lfo2":1} },
  env2Attack: { name: 'ENV2: Attack', index: 26, isLinear: true, range: [0, 100] as [number, number] },
  env2Decay: { name: 'ENV2: Decay', index: 27, isLinear: true, range: [0, 100] as [number, number] },
  env2Sustain: { name: 'ENV2: Sustain', index: 28, isLinear: true, range: [0, 100] as [number, number] },
  env2FallRise: { name: 'ENV2: Fall-Rise', index: 29, isLinear: true, range: [-100, 100] as [number, number] },
  env2Release: { name: 'ENV2: Release', index: 30, isLinear: true, range: [0, 100] as [number, number] },
  env2Velocity: { name: 'ENV2: Velocity', index: 31, isLinear: true, range: [0, 100] as [number, number] },
  env2KeyTrack: { name: 'ENV2: KeyTrack', index: 32, isLinear: true, range: [-100, 100] as [number, number] },
  env2Trigger: { name: 'ENV2: Trigger', index: 33, isLinear: false, choices: {"gate":0.1071428656578064,"single":0.3571428656578064,"loop":0.6071428656578064,"lfo1":0.8571429252624512,"lfo2":1} },
  lfo1Sync: { name: 'LFO1: Sync', index: 34, isLinear: false, range: [0.1, 8] as [number, number] },
  lfo1Delay: { name: 'LFO1: Delay', index: 35, isLinear: true, range: [0, 100] as [number, number] },
  lfo2Sync: { name: 'LFO2: Sync', index: 36, isLinear: false, range: [0.1, 8] as [number, number] },
  lfo2Delay: { name: 'LFO2: Delay', index: 37, isLinear: true, range: [0, 100] as [number, number] },
  tyrellShape1: { name: 'Tyrell: Shape1', index: 38, isLinear: true, range: [1, 4] as [number, number] },
  tyrellTuneModSrc1: { name: 'Tyrell: TuneModSrc1', index: 39, isLinear: false, choices: {"none":0,"modwhl":0.0714285746216774,"pitchw":0.1428571492433548,"breath":0.2142857313156128,"xpress":0.25,"gate":0.3214285969734192,"velocity":0.392857164144516,"pressure":0.4642857313156128,"keyfollow":0.5,"keyfollow2":0.5714285969734192,"alternate":0.6428571939468384,"random":0.7142857313156128,"stackvoice":0.7500000596046448,"adsr1":0.8214285969734192,"adsr2":0.8928571939468384,"lfo1":0.9642857313156128,"lfo2":1} },
  tyrellTuneModDepth1: { name: 'Tyrell: TuneModDepth1', index: 40, isLinear: true, range: [-24, 24] as [number, number] },
  tyrellShape2: { name: 'Tyrell: Shape2', index: 41, isLinear: true, range: [1, 2] as [number, number] },
  tyrellTune2: { name: 'Tyrell: Tune2', index: 42, isLinear: true, range: [0, 24] as [number, number] },
  tyrellFineTune2: { name: 'Tyrell: FineTune2', index: 43, isLinear: true, range: [-50, 50] as [number, number] },
  tyrellTuneModSrc2: { name: 'Tyrell: TuneModSrc2', index: 44, isLinear: false, choices: {"none":0,"modwhl":0.0714285746216774,"pitchw":0.1428571492433548,"breath":0.2142857313156128,"xpress":0.25,"gate":0.3214285969734192,"velocity":0.392857164144516,"pressure":0.4642857313156128,"keyfollow":0.5,"keyfollow2":0.5714285969734192,"alternate":0.6428571939468384,"random":0.7142857313156128,"stackvoice":0.7500000596046448,"adsr1":0.8214285969734192,"adsr2":0.8928571939468384,"lfo1":0.9642857313156128,"lfo2":1} },
  tyrellTuneModDepth2: { name: 'Tyrell: TuneModDepth2', index: 45, isLinear: true, range: [-24, 24] as [number, number] },
  tyrellPwdepth: { name: 'Tyrell: PWDepth', index: 46, isLinear: true, range: [0, 50] as [number, number] },
  tyrellPwsrc: { name: 'Tyrell: PWSrc', index: 47, isLinear: false, choices: {"none":0,"modwhl":0.0714285746216774,"pitchw":0.1428571492433548,"breath":0.2142857313156128,"xpress":0.25,"gate":0.3214285969734192,"velocity":0.392857164144516,"pressure":0.4642857313156128,"keyfollow":0.5,"keyfollow2":0.5714285969734192,"alternate":0.6428571939468384,"random":0.7142857313156128,"stackvoice":0.7500000596046448,"adsr1":0.8214285969734192,"adsr2":0.8928571939468384,"lfo1":0.9642857313156128,"lfo2":1} },
  tyrellDetune: { name: 'Tyrell: Detune', index: 48, isLinear: true, range: [-50, 50] as [number, number] },
  tyrellSoftSync: { name: 'Tyrell: SoftSync', index: 49, isLinear: true, range: [0, 100] as [number, number] },
  tyrellVibrato: { name: 'Tyrell: Vibrato', index: 50, isLinear: true, range: [0, 100] as [number, number] },
  tyrellRingModIn1: { name: 'Tyrell: RingModIn1', index: 51, isLinear: false, choices: {"osc1":0.0714285746216774,"osc2":0.2857142984867096,"subosc":0.4642857313156128,"osc1+2":0.6785714626312256,"osc1+sub":0.8928571939468384,"vcf":1} },
  tyrellRingModIn2: { name: 'Tyrell: RingModIn2', index: 52, isLinear: false, choices: {"osc1":0.2142857313156128,"osc2":0.7142857313156128,"subosc":1} },
  tyrellNoiseColour: { name: 'Tyrell: NoiseColour', index: 53, isLinear: true, range: [1, 3] as [number, number] },
  tyrellOscVolume1: { name: 'Tyrell: OscVolume1', index: 54, isLinear: true, range: [-100, 25] as [number, number] },
  tyrellOscVolume2: { name: 'Tyrell: OscVolume2', index: 55, isLinear: true, range: [-100, 25] as [number, number] },
  tyrellSubVolume: { name: 'Tyrell: SubVolume', index: 56, isLinear: true, range: [-100, 25] as [number, number] },
  tyrellNoiseVolume: { name: 'Tyrell: NoiseVolume', index: 57, isLinear: true, range: [-100, 25] as [number, number] },
  tyrellRingModulator: { name: 'Tyrell: RingModulator', index: 58, isLinear: true, range: [-100, 25] as [number, number] },
  tyrellFeedback: { name: 'Tyrell: Feedback', index: 59, isLinear: true, range: [-100, 25] as [number, number] },
  tyrellVcfmode: { name: 'Tyrell: VCFMode', index: 60, isLinear: false, choices: {"lp / hp":0,"bp":1} },
  tyrellVcfpoles: { name: 'Tyrell: VCFPoles', index: 61, isLinear: false, choices: {"12 db/oct":0.2142857313156128,"24 db/oct":0.7142857313156128,"36 db/oct":1} },
  tyrellCutoff: { name: 'Tyrell: Cutoff', index: 62, isLinear: true, range: [30, 150] as [number, number] },
  tyrellFreqModSrc1: { name: 'Tyrell: FreqModSrc1', index: 63, isLinear: false, choices: {"none":0,"modwhl":0.0714285746216774,"pitchw":0.1428571492433548,"breath":0.2142857313156128,"xpress":0.25,"gate":0.3214285969734192,"velocity":0.392857164144516,"pressure":0.4642857313156128,"keyfollow":0.5,"keyfollow2":0.5714285969734192,"alternate":0.6428571939468384,"random":0.7142857313156128,"stackvoice":0.7500000596046448,"adsr1":0.8214285969734192,"adsr2":0.8928571939468384,"lfo1":0.9642857313156128,"lfo2":1} },
  tyrellFreqModDepth1: { name: 'Tyrell: FreqModDepth1', index: 64, isLinear: true, range: [-120, 120] as [number, number] },
  tyrellFreqModSrc2: { name: 'Tyrell: FreqModSrc2', index: 65, isLinear: false, choices: {"none":0,"modwhl":0.0714285746216774,"pitchw":0.1428571492433548,"breath":0.2142857313156128,"xpress":0.25,"gate":0.3214285969734192,"velocity":0.392857164144516,"pressure":0.4642857313156128,"keyfollow":0.5,"keyfollow2":0.5714285969734192,"alternate":0.6428571939468384,"random":0.7142857313156128,"stackvoice":0.7500000596046448,"adsr1":0.8214285969734192,"adsr2":0.8928571939468384,"lfo1":0.9642857313156128,"lfo2":1} },
  tyrellFreqModDepth2: { name: 'Tyrell: FreqModDepth2', index: 66, isLinear: true, range: [-120, 120] as [number, number] },
  tyrellKeyFollow: { name: 'Tyrell: KeyFollow', index: 67, isLinear: true, range: [0, 100] as [number, number] },
  tyrellResonance: { name: 'Tyrell: Resonance', index: 68, isLinear: true, range: [0, 100] as [number, number] },
  tyrellMixSpread: { name: 'Tyrell: MixSpread', index: 69, isLinear: true, range: [0, 100] as [number, number] },
  tyrellAudioRateSrc: { name: 'Tyrell: AudioRateSrc', index: 70, isLinear: false, choices: {"osc1":1} },
  tyrellAudioRateDest: { name: 'Tyrell: AudioRateDest', index: 71, isLinear: false, choices: {"osc2 fm":0.2142857313156128,"osc2 pwm":0.7142857313156128,"filterfm":1} },
  tyrellXmoddepth: { name: 'Tyrell: XModDepth', index: 72, isLinear: true, range: [0, 100] as [number, number] },
  tyrellAudioRateModSrc: { name: 'Tyrell: AudioRateModSrc', index: 73, isLinear: false, choices: {"none":0,"modwhl":0.0714285746216774,"pitchw":0.1428571492433548,"breath":0.2142857313156128,"xpress":0.25,"gate":0.3214285969734192,"velocity":0.392857164144516,"pressure":0.4642857313156128,"keyfollow":0.5,"keyfollow2":0.5714285969734192,"alternate":0.6428571939468384,"random":0.7142857313156128,"stackvoice":0.7500000596046448,"adsr1":0.8214285969734192,"adsr2":0.8928571939468384,"lfo1":0.9642857313156128,"lfo2":1} },
  chrs1Type: { name: 'Chrs1: Type', index: 74, isLinear: false, choices: {"classic":0.2142857313156128,"dramatic":0.7142857313156128,"ensemble":1} },
  chrs1Rate: { name: 'Chrs1: Rate', index: 75, isLinear: true, range: [0, 100] as [number, number] },
  chrs1Depth: { name: 'Chrs1: Depth', index: 76, isLinear: true, range: [0, 100] as [number, number] },
  chrs1Wet: { name: 'Chrs1: Wet', index: 77, isLinear: true, range: [0, 100] as [number, number] },
  lfo1Restart: { name: 'LFO1: Restart', index: 78, isLinear: false, choices: {"sync":0.1428571492433548,"gate":0.4642857313156128,"single":0.8214285969734192,"random":1} },
  lfo1Waveform: { name: 'LFO1: Waveform', index: 79, isLinear: false, choices: {"sine":0.0357142873108387,"triangle":0.1785714328289032,"saw up":0.3214285969734192,"saw down":0.4642857313156128,"sqr hi-lo":0.6071428656578064,"sqr lo-hi":0.7500000596046448,"rand hold":0.8928571939468384,"rand glide":1} },
  lfo1Phase: { name: 'LFO1: Phase', index: 80, isLinear: true, range: [0, 100] as [number, number] },
  lfo1Polarity: { name: 'LFO1: Polarity', index: 81, isLinear: false, choices: {"bipolar":0,"positive":1} },
  lfo1DepthModDpt1: { name: 'LFO1: DepthMod Dpt1', index: 82, isLinear: true, range: [0, 100] as [number, number] },
  lfo1Rate: { name: 'LFO1: Rate', index: 83, isLinear: true, range: [-5, 5] as [number, number] },
  lfo1FreqModDpt: { name: 'LFO1: FreqMod Dpt', index: 84, isLinear: true, range: [-5, 5] as [number, number] },
  lfo2Restart: { name: 'LFO2: Restart', index: 85, isLinear: false, choices: {"sync":0.1428571492433548,"gate":0.4642857313156128,"single":0.8214285969734192,"random":1} },
  lfo2Waveform: { name: 'LFO2: Waveform', index: 86, isLinear: false, choices: {"sine":0.0357142873108387,"triangle":0.1785714328289032,"saw up":0.3214285969734192,"saw down":0.4642857313156128,"sqr hi-lo":0.6071428656578064,"sqr lo-hi":0.7500000596046448,"rand hold":0.8928571939468384,"rand glide":1} },
  lfo2Phase: { name: 'LFO2: Phase', index: 87, isLinear: true, range: [0, 100] as [number, number] },
  lfo2Polarity: { name: 'LFO2: Polarity', index: 88, isLinear: false, choices: {"bipolar":0,"positive":1} },
  lfo2DepthModDpt1: { name: 'LFO2: DepthMod Dpt1', index: 89, isLinear: true, range: [0, 100] as [number, number] },
  lfo2Rate: { name: 'LFO2: Rate', index: 90, isLinear: true, range: [-5, 5] as [number, number] },
  lfo2FreqModDpt: { name: 'LFO2: FreqMod Dpt', index: 91, isLinear: true, range: [-5, 5] as [number, number] }
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
  pcoreMatrix1Source (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'pcoreMatrix1Source',
    });
  },
  pcoreMatrix1Depth (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'pcoreMatrix1Depth',
    });
  },
  pcoreMatrix1ViaSrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'pcoreMatrix1ViaSrc',
    });
  },
  pcoreMatrix1Via (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'pcoreMatrix1Via',
    });
  },
  pcoreMatrix2Source (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'pcoreMatrix2Source',
    });
  },
  pcoreMatrix2Depth (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'pcoreMatrix2Depth',
    });
  },
  pcoreMatrix2ViaSrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'pcoreMatrix2ViaSrc',
    });
  },
  pcoreMatrix2Via (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'pcoreMatrix2Via',
    });
  },
  vccVoiceStack (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccVoiceStack',
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
  vccGlide (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccGlide',
    });
  },
  vccGlide2 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccGlide2',
    });
  },
  vccPortaRange (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccPortaRange',
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
  env1Attack (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1Attack',
    });
  },
  env1Decay (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1Decay',
    });
  },
  env1Sustain (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1Sustain',
    });
  },
  env1FallRise (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1FallRise',
    });
  },
  env1Release (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1Release',
    });
  },
  env1Velocity (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1Velocity',
    });
  },
  env1KeyTrack (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1KeyTrack',
    });
  },
  env1Trigger (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1Trigger',
    });
  },
  env2Attack (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env2Attack',
    });
  },
  env2Decay (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env2Decay',
    });
  },
  env2Sustain (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env2Sustain',
    });
  },
  env2FallRise (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env2FallRise',
    });
  },
  env2Release (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env2Release',
    });
  },
  env2Velocity (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env2Velocity',
    });
  },
  env2KeyTrack (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env2KeyTrack',
    });
  },
  env2Trigger (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env2Trigger',
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
  lfo1Delay (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Delay',
    });
  },
  lfo2Sync (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo2Sync',
    });
  },
  lfo2Delay (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo2Delay',
    });
  },
  tyrellShape1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellShape1',
    });
  },
  tyrellTuneModSrc1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellTuneModSrc1',
    });
  },
  tyrellTuneModDepth1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellTuneModDepth1',
    });
  },
  tyrellShape2 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellShape2',
    });
  },
  tyrellTune2 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellTune2',
    });
  },
  tyrellFineTune2 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellFineTune2',
    });
  },
  tyrellTuneModSrc2 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellTuneModSrc2',
    });
  },
  tyrellTuneModDepth2 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellTuneModDepth2',
    });
  },
  tyrellPwdepth (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellPwdepth',
    });
  },
  tyrellPwsrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellPwsrc',
    });
  },
  tyrellDetune (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellDetune',
    });
  },
  tyrellSoftSync (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellSoftSync',
    });
  },
  tyrellVibrato (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellVibrato',
    });
  },
  tyrellRingModIn1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellRingModIn1',
    });
  },
  tyrellRingModIn2 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellRingModIn2',
    });
  },
  tyrellNoiseColour (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellNoiseColour',
    });
  },
  tyrellOscVolume1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellOscVolume1',
    });
  },
  tyrellOscVolume2 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellOscVolume2',
    });
  },
  tyrellSubVolume (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellSubVolume',
    });
  },
  tyrellNoiseVolume (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellNoiseVolume',
    });
  },
  tyrellRingModulator (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellRingModulator',
    });
  },
  tyrellFeedback (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellFeedback',
    });
  },
  tyrellVcfmode (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellVcfmode',
    });
  },
  tyrellVcfpoles (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellVcfpoles',
    });
  },
  tyrellCutoff (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellCutoff',
    });
  },
  tyrellFreqModSrc1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellFreqModSrc1',
    });
  },
  tyrellFreqModDepth1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellFreqModDepth1',
    });
  },
  tyrellFreqModSrc2 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellFreqModSrc2',
    });
  },
  tyrellFreqModDepth2 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellFreqModDepth2',
    });
  },
  tyrellKeyFollow (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellKeyFollow',
    });
  },
  tyrellResonance (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellResonance',
    });
  },
  tyrellMixSpread (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellMixSpread',
    });
  },
  tyrellAudioRateSrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellAudioRateSrc',
    });
  },
  tyrellAudioRateDest (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellAudioRateDest',
    });
  },
  tyrellXmoddepth (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellXmoddepth',
    });
  },
  tyrellAudioRateModSrc (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'tyrellAudioRateModSrc',
    });
  },
  chrs1Type (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'chrs1Type',
    });
  },
  chrs1Rate (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'chrs1Rate',
    });
  },
  chrs1Depth (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'chrs1Depth',
    });
  },
  chrs1Wet (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'chrs1Wet',
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
  lfo1Phase (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Phase',
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
  lfo1DepthModDpt1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1DepthModDpt1',
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
  },
  lfo2Restart (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo2Restart',
    });
  },
  lfo2Waveform (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo2Waveform',
    });
  },
  lfo2Phase (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo2Phase',
    });
  },
  lfo2Polarity (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo2Polarity',
    });
  },
  lfo2DepthModDpt1 (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo2DepthModDpt1',
    });
  },
  lfo2Rate (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo2Rate',
    });
  },
  lfo2FreqModDpt (value? : number, curve = 0) {
    return new PluginAutomation({
      value,
      curve,
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo2FreqModDpt',
    });
  }
}
export class TyrellN6Vst2 extends FluidPlugin {
  constructor(
    public readonly parameters : TyrellN6Vst2Parameters = {},
  ) { super(pluginName, pluginType) }

  readonly parameterLibrary = parameterLibrary;
  readonly makeAutomation = makeAutomation;

  // Static members
  static readonly parameterLibrary = parameterLibrary;
  static readonly makeAutomation = makeAutomation;
}
