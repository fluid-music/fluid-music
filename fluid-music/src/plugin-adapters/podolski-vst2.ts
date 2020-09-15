import { PluginType, FluidPlugin, PluginAutomationEvent } from '../plugin';
const pluginName = 'Podolski'
const pluginType = PluginType.VST2

export interface PodolskiVst2Parameters {
  /** value from 0 to 200 */
  mainOutput? : number;
  mainActiveLfog? : number;
  mainActiveChrs? : number;
  mainActiveDly1? : number;
  /** value from 0.1 to 8 */
  lfogSync? : number;
  /** percent value from 0 to 100 */
  lfogPhasePercent? : number;
  vccActiveLfo1? : number;
  vccVoices? : number;
  vccVoiceStack? : number;
  vccMode? : number;
  /** percent value from 0 to 100 */
  vccGlidePercent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod1Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod2Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod3Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod4Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod5Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod6Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod7Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod8Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod9Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod10Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod11Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod12Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod13Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod14Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod15Percent? : number;
  /** percent value from -100 to 100 */
  vccArpStepMod16Percent? : number;
  /** percent value from 0 to 100 */
  env1AttackPercent? : number;
  /** percent value from 0 to 100 */
  env1DecayPercent? : number;
  /** percent value from 0 to 100 */
  env1SustainPercent? : number;
  /** percent value from -100 to 100 */
  env1FallRisePercent? : number;
  /** percent value from 0 to 100 */
  env1ReleasePercent? : number;
  /** percent value from 0 to 100 */
  env1VelocityPercent? : number;
  /** value from 0.1 to 8 */
  lfo1Sync? : number;
  /** percent value from 0 to 100 */
  lfo1DelayPercent? : number;
  /** value from -24 to 24 */
  osc1Tune? : number;
  osc1TuneModSrc? : number;
  /** value from -24 to 24 */
  osc1TuneModDepth? : number;
  /** percent value from 0 to 100 */
  osc1PhasePercent? : number;
  osc1PhaseModSrc? : number;
  /** value from -50 to 50 */
  osc1PhaseModDepth? : number;
  /** percent value from -100 to 100 */
  osc1InverseVolumePercent? : number;
  /** percent value from 0 to 100 */
  osc1WaveWarpPercent? : number;
  osc1WarpModSrc? : number;
  /** percent value from -100 to 100 */
  osc1WarpModDepthPercent? : number;
  /** percent value from 0 to 100 */
  osc1VibratoPercent? : number;
  vcf0Type? : number;
  /** value from 0 to 150 */
  vcf0Cutoff? : number;
  /** percent value from 0 to 100 */
  vcf0ResonancePercent? : number;
  /** percent value from 0 to 100 */
  vcf0DrivePercent? : number;
  /** value from -150 to 150 */
  vcf0CutoffMod1? : number;
  vcf0Modsource1? : number;
  /** value from -150 to 150 */
  vcf0CutoffMod2? : number;
  vcf0Modsource2? : number;
  /** percent value from -100 to 100 */
  vcf0KeyFollowPercent? : number;
  /** percent value from -100 to 100 */
  vcf0AutoFMPercent? : number;
  /** percent value from 0 to 100 */
  vcf0ClickPercent? : number;
  /** percent value from -100 to 100 */
  vca1PanPercent? : number;
  /** percent value from 0 to 100 */
  vca1VolumePercent? : number;
  /** percent value from -100 to 100 */
  vca1ModDepthPercent? : number;
  /** percent value from 0 to 100 */
  chrsCenterPercent? : number;
  /** percent value from 0 to 100 */
  chrsSpeedPercent? : number;
  /** percent value from 0 to 100 */
  chrsDepthPercent? : number;
  /** percent value from -100 to 100 */
  chrsFeedbackPercent? : number;
  /** percent value from 0 to 100 */
  chrsMixPercent? : number;
  dly1SyncLeft? : number;
  dly1SyncRight? : number;
  /** percent value from 0 to 100 */
  dly1FeedbackPercent? : number;
  /** percent value from 0 to 100 */
  dly1CrossfeedPercent? : number;
  /** percent value from 0 to 100 */
  dly1MixPercent? : number;
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
  mainActiveChrs: { name: 'main: Active #Chrs', index: 2, isLinear: false, choices: {"off":0,"on":1} },
  mainActiveDly1: { name: 'main: Active #Dly1', index: 3, isLinear: false, choices: {"off":0,"on":1} },
  lfogSync: { name: 'LFOG: Sync', index: 4, isLinear: false, range: [0.1, 8] as [number, number] },
  lfogPhasePercent: { name: 'LFOG: Phase', index: 5, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vccActiveLfo1: { name: 'VCC: Active #LFO1', index: 6, isLinear: false, choices: {"off":0,"on":1} },
  vccVoices: { name: 'VCC: Voices', index: 7, isLinear: false, choices: {"few":0.2142857313156128,"medium":0.7142857313156128,"many":1} },
  vccVoiceStack: { name: 'VCC: Voice Stack', index: 8, isLinear: false, units: '1.00', choices: {"1.00":1} },
  vccMode: { name: 'VCC: Mode', index: 9, isLinear: false, choices: {"poly":0.1428571492433548,"mono":0.4642857313156128,"legato":0.8214285969734192,"arpeggiator":1} },
  vccGlidePercent: { name: 'VCC: Glide', index: 10, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vccArpStepMod1Percent: { name: 'VCC: Arp Step Mod1', index: 11, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod2Percent: { name: 'VCC: Arp Step Mod2', index: 12, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod3Percent: { name: 'VCC: Arp Step Mod3', index: 13, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod4Percent: { name: 'VCC: Arp Step Mod4', index: 14, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod5Percent: { name: 'VCC: Arp Step Mod5', index: 15, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod6Percent: { name: 'VCC: Arp Step Mod6', index: 16, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod7Percent: { name: 'VCC: Arp Step Mod7', index: 17, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod8Percent: { name: 'VCC: Arp Step Mod8', index: 18, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod9Percent: { name: 'VCC: Arp Step Mod9', index: 19, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod10Percent: { name: 'VCC: Arp Step Mod10', index: 20, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod11Percent: { name: 'VCC: Arp Step Mod11', index: 21, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod12Percent: { name: 'VCC: Arp Step Mod12', index: 22, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod13Percent: { name: 'VCC: Arp Step Mod13', index: 23, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod14Percent: { name: 'VCC: Arp Step Mod14', index: 24, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod15Percent: { name: 'VCC: Arp Step Mod15', index: 25, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vccArpStepMod16Percent: { name: 'VCC: Arp Step Mod16', index: 26, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  env1AttackPercent: { name: 'ENV1: Attack', index: 27, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  env1DecayPercent: { name: 'ENV1: Decay', index: 28, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  env1SustainPercent: { name: 'ENV1: Sustain', index: 29, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  env1FallRisePercent: { name: 'ENV1: Fall - Rise', index: 30, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  env1ReleasePercent: { name: 'ENV1: Release', index: 31, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  env1VelocityPercent: { name: 'ENV1: Velocity', index: 32, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  lfo1Sync: { name: 'LFO1: Sync', index: 33, isLinear: false, range: [0.1, 8] as [number, number] },
  lfo1DelayPercent: { name: 'LFO1: Delay', index: 34, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  osc1Tune: { name: 'OSC1: Tune', index: 35, isLinear: true, range: [-24, 24] as [number, number] },
  osc1TuneModSrc: { name: 'OSC1: TuneModSrc', index: 36, isLinear: false, choices: {"none":0,"modwheel":0.0714285746216774,"pitchwheel":0.1428571492433548,"control a":0.2142857313156128,"control b":0.25,"lfoglobal":0.3214285969734192,"gate":0.392857164144516,"velocity":0.4642857313156128,"pressure":0.5,"keyfollow":0.5714285969734192,"keyfollow2":0.6428571939468384,"alternate":0.7142857313156128,"random":0.7500000596046448,"constant":0.8214285969734192,"arpmodulator":0.8928571939468384,"envelope1":0.9642857313156128,"lfo1":1} },
  osc1TuneModDepth: { name: 'OSC1: TuneModDepth', index: 37, isLinear: true, range: [-24, 24] as [number, number] },
  osc1PhasePercent: { name: 'OSC1: Phase', index: 38, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  osc1PhaseModSrc: { name: 'OSC1: PhaseModSrc', index: 39, isLinear: false, choices: {"none":0,"modwheel":0.0714285746216774,"pitchwheel":0.1428571492433548,"control a":0.2142857313156128,"control b":0.25,"lfoglobal":0.3214285969734192,"gate":0.392857164144516,"velocity":0.4642857313156128,"pressure":0.5,"keyfollow":0.5714285969734192,"keyfollow2":0.6428571939468384,"alternate":0.7142857313156128,"random":0.7500000596046448,"constant":0.8214285969734192,"arpmodulator":0.8928571939468384,"envelope1":0.9642857313156128,"lfo1":1} },
  osc1PhaseModDepth: { name: 'OSC1: PhaseModDepth', index: 40, isLinear: true, range: [-50, 50] as [number, number] },
  osc1InverseVolumePercent: { name: 'OSC1: Inverse Volume', index: 41, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  osc1WaveWarpPercent: { name: 'OSC1: WaveWarp', index: 42, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  osc1WarpModSrc: { name: 'OSC1: WarpModSrc', index: 43, isLinear: false, choices: {"none":0,"modwheel":0.0714285746216774,"pitchwheel":0.1428571492433548,"control a":0.2142857313156128,"control b":0.25,"lfoglobal":0.3214285969734192,"gate":0.392857164144516,"velocity":0.4642857313156128,"pressure":0.5,"keyfollow":0.5714285969734192,"keyfollow2":0.6428571939468384,"alternate":0.7142857313156128,"random":0.7500000596046448,"constant":0.8214285969734192,"arpmodulator":0.8928571939468384,"envelope1":0.9642857313156128,"lfo1":1} },
  osc1WarpModDepthPercent: { name: 'OSC1: WarpModDepth', index: 44, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  osc1VibratoPercent: { name: 'OSC1: Vibrato', index: 45, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vcf0Type: { name: 'VCF0: Type', index: 46, isLinear: false, choices: {"lowpass":0.2142857313156128,"bandpass":0.7142857313156128,"highpass":1} },
  vcf0Cutoff: { name: 'VCF0: Cutoff', index: 47, isLinear: true, range: [0, 150] as [number, number] },
  vcf0ResonancePercent: { name: 'VCF0: Resonance', index: 48, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vcf0DrivePercent: { name: 'VCF0: Drive', index: 49, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vcf0CutoffMod1: { name: 'VCF0: CutoffMod 1', index: 50, isLinear: true, range: [-150, 150] as [number, number] },
  vcf0Modsource1: { name: 'VCF0: Modsource1', index: 51, isLinear: false, choices: {"none":0,"modwheel":0.0714285746216774,"pitchwheel":0.1428571492433548,"control a":0.2142857313156128,"control b":0.25,"lfoglobal":0.3214285969734192,"gate":0.392857164144516,"velocity":0.4642857313156128,"pressure":0.5,"keyfollow":0.5714285969734192,"keyfollow2":0.6428571939468384,"alternate":0.7142857313156128,"random":0.7500000596046448,"constant":0.8214285969734192,"arpmodulator":0.8928571939468384,"envelope1":0.9642857313156128,"lfo1":1} },
  vcf0CutoffMod2: { name: 'VCF0: CutoffMod 2', index: 52, isLinear: true, range: [-150, 150] as [number, number] },
  vcf0Modsource2: { name: 'VCF0: Modsource2', index: 53, isLinear: false, choices: {"none":0,"modwheel":0.0714285746216774,"pitchwheel":0.1428571492433548,"control a":0.2142857313156128,"control b":0.25,"lfoglobal":0.3214285969734192,"gate":0.392857164144516,"velocity":0.4642857313156128,"pressure":0.5,"keyfollow":0.5714285969734192,"keyfollow2":0.6428571939468384,"alternate":0.7142857313156128,"random":0.7500000596046448,"constant":0.8214285969734192,"arpmodulator":0.8928571939468384,"envelope1":0.9642857313156128,"lfo1":1} },
  vcf0KeyFollowPercent: { name: 'VCF0: KeyFollow', index: 54, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vcf0AutoFMPercent: { name: 'VCF0: AutoFM', index: 55, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vcf0ClickPercent: { name: 'VCF0: Click', index: 56, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vca1PanPercent: { name: 'VCA1: Pan', index: 57, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  vca1VolumePercent: { name: 'VCA1: Volume', index: 58, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  vca1ModDepthPercent: { name: 'VCA1: ModDepth', index: 59, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  chrsCenterPercent: { name: 'Chrs: Center', index: 60, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  chrsSpeedPercent: { name: 'Chrs: Speed', index: 61, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  chrsDepthPercent: { name: 'Chrs: Depth', index: 62, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  chrsFeedbackPercent: { name: 'Chrs: Feedback', index: 63, isLinear: true, range: [-100, 100] as [number, number], units: 'percent' },
  chrsMixPercent: { name: 'Chrs: Mix', index: 64, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  dly1SyncLeft: { name: 'Dly1: Sync Left', index: 65, isLinear: false, choices: {"1/64":0,"1/32":0.0714285746216774,"1/16":0.1428571492433548,"1/8":0.2142857313156128,"1/4":0.25,"1/2":0.3214285969734192,"1/1":0.392857164144516,"1/32 dot":0.4642857313156128,"1/16 dot":0.5,"1/8 dot":0.5714285969734192,"1/4 dot":0.6428571939468384,"1/2 dot":0.7142857313156128,"1/16 trip":0.7500000596046448,"1/8 trip":0.8214285969734192,"1/4 trip":0.8928571939468384,"1/2 trip":0.9642857313156128,"1/1 trip":1} },
  dly1SyncRight: { name: 'Dly1: Sync Right', index: 66, isLinear: false, choices: {"1/64":0,"1/32":0.0714285746216774,"1/16":0.1428571492433548,"1/8":0.2142857313156128,"1/4":0.25,"1/2":0.3214285969734192,"1/1":0.392857164144516,"1/32 dot":0.4642857313156128,"1/16 dot":0.5,"1/8 dot":0.5714285969734192,"1/4 dot":0.6428571939468384,"1/2 dot":0.7142857313156128,"1/16 trip":0.7500000596046448,"1/8 trip":0.8214285969734192,"1/4 trip":0.8928571939468384,"1/2 trip":0.9642857313156128,"1/1 trip":1} },
  dly1FeedbackPercent: { name: 'Dly1: Feedback', index: 67, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  dly1CrossfeedPercent: { name: 'Dly1: Crossfeed', index: 68, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  dly1MixPercent: { name: 'Dly1: Mix', index: 69, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  lfogWaveform: { name: 'LFOG: Waveform', index: 70, isLinear: false, choices: {"sine":0.0357142873108387,"triangle":0.1785714328289032,"saw up":0.3214285969734192,"saw down":0.4642857313156128,"sqr hi-lo":0.6071428656578064,"sqr lo-hi":0.7500000596046448,"rand hold":0.8928571939468384,"rand glide":1} },
  lfogPolarity: { name: 'LFOG: Polarity', index: 71, isLinear: false, choices: {"bipolar":0,"positive":1} },
  lfo1Restart: { name: 'LFO1: Restart', index: 72, isLinear: false, choices: {"sync":0.1428571492433548,"gate":0.4642857313156128,"single":0.8214285969734192,"random":1} },
  lfo1Waveform: { name: 'LFO1: Waveform', index: 73, isLinear: false, choices: {"sine":0.0357142873108387,"triangle":0.1785714328289032,"saw up":0.3214285969734192,"saw down":0.4642857313156128,"sqr hi-lo":0.6071428656578064,"sqr lo-hi":0.7500000596046448,"rand hold":0.8928571939468384,"rand glide":1} },
  lfo1PhasePercent: { name: 'LFO1: Phase', index: 74, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  lfo1Polarity: { name: 'LFO1: Polarity', index: 75, isLinear: false, choices: {"bipolar":0,"positive":1} },
  lfo1DepthModDpt1Percent: { name: 'LFO1: DepthMod Dpt1', index: 76, isLinear: true, range: [0, 100] as [number, number], units: 'percent' },
  lfo1Rate: { name: 'LFO1: Rate', index: 77, isLinear: true, range: [-5, 5] as [number, number] },
  lfo1FreqModDpt: { name: 'LFO1: FreqMod Dpt', index: 78, isLinear: true, range: [-5, 5] as [number, number] }
}
const makeAutomation = {
  mainOutput (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mainOutput',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  mainActiveLfog (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mainActiveLfog',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  mainActiveChrs (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mainActiveChrs',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  mainActiveDly1 (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'mainActiveDly1',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfogSync (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfogSync',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfogPhasePercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfogPhasePercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccActiveLfo1 (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccActiveLfo1',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccVoices (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccVoices',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccVoiceStack (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccVoiceStack',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccMode (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccMode',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccGlidePercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccGlidePercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod1Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod1Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod2Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod2Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod3Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod3Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod4Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod4Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod5Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod5Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod6Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod6Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod7Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod7Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod8Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod8Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod9Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod9Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod10Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod10Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod11Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod11Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod12Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod12Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod13Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod13Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod14Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod14Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod15Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod15Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vccArpStepMod16Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vccArpStepMod16Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  env1AttackPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1AttackPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  env1DecayPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1DecayPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  env1SustainPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1SustainPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  env1FallRisePercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1FallRisePercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  env1ReleasePercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1ReleasePercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  env1VelocityPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'env1VelocityPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfo1Sync (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Sync',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfo1DelayPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1DelayPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  osc1Tune (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1Tune',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  osc1TuneModSrc (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1TuneModSrc',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  osc1TuneModDepth (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1TuneModDepth',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  osc1PhasePercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1PhasePercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  osc1PhaseModSrc (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1PhaseModSrc',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  osc1PhaseModDepth (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1PhaseModDepth',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  osc1InverseVolumePercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1InverseVolumePercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  osc1WaveWarpPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1WaveWarpPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  osc1WarpModSrc (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1WarpModSrc',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  osc1WarpModDepthPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1WarpModDepthPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  osc1VibratoPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'osc1VibratoPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vcf0Type (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vcf0Type',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vcf0Cutoff (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vcf0Cutoff',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vcf0ResonancePercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vcf0ResonancePercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vcf0DrivePercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vcf0DrivePercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vcf0CutoffMod1 (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vcf0CutoffMod1',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vcf0Modsource1 (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vcf0Modsource1',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vcf0CutoffMod2 (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vcf0CutoffMod2',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vcf0Modsource2 (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vcf0Modsource2',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vcf0KeyFollowPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vcf0KeyFollowPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vcf0AutoFMPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vcf0AutoFMPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vcf0ClickPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vcf0ClickPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vca1PanPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vca1PanPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vca1VolumePercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vca1VolumePercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  vca1ModDepthPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'vca1ModDepthPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  chrsCenterPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'chrsCenterPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  chrsSpeedPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'chrsSpeedPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  chrsDepthPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'chrsDepthPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  chrsFeedbackPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'chrsFeedbackPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  chrsMixPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'chrsMixPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  dly1SyncLeft (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'dly1SyncLeft',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  dly1SyncRight (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'dly1SyncRight',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  dly1FeedbackPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'dly1FeedbackPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  dly1CrossfeedPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'dly1CrossfeedPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  dly1MixPercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'dly1MixPercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfogWaveform (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfogWaveform',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfogPolarity (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfogPolarity',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfo1Restart (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Restart',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfo1Waveform (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Waveform',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfo1PhasePercent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1PhasePercent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfo1Polarity (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Polarity',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfo1DepthModDpt1Percent (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1DepthModDpt1Percent',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfo1Rate (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1Rate',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  },
  lfo1FreqModDpt (value? : number) : PluginAutomationEvent {
    const event : PluginAutomationEvent = {
      type: 'pluginAuto',
      pluginSelector: { pluginName, pluginType },
      paramKey: 'lfo1FreqModDpt',
      startTime: 0,
      duration: 0,
      curve: 0,
    };
    if (typeof value === 'number') event.value = value;
    return event;
  }
}
export class PodolskiVst2 extends FluidPlugin {
  constructor(
    public readonly parameters : PodolskiVst2Parameters = {},
  ) { super(pluginName, pluginType) }

  readonly parameterLibrary = parameterLibrary;
  readonly makeAutomation = makeAutomation;

  // Static members
  static readonly parameterLibrary = parameterLibrary;
  static readonly makeAutomation = makeAutomation;
}
