const path   = require('path');
const fluid  = require('fluid-music');
const cybr   = fluid.cybr;
const drums  = require('@fluid-music/kit');
const chords = require('./chords');

const { podolskiSine } = require('./presets')
const { MidiChord, MidiNote } = require('fluid-music/built/fluid-techniques');


////////////////////////////////////////////////////////////////
// Configure some VSTs using the auto-generated VST adapters

// Synth VSTs
const pwmSynth = new fluid.TyrellN6Vst2({ env1Attack: 2, env1Decay: 77, env1Sustain: 69 })
const bassSynth = podolskiSine()

// reverb
const verbPlugin = new fluid.DragonflyRoom({ decaySeconds: 2.4, predelayMs: 49, dryLevelPercent: 0, earlyLevelPercent: 40, lateLevelPercent: 100 })

// #TCompressor VST
const comp = new fluid.TCompressorVst2()
comp.parameters.thresholdDb = -8
comp.parameters.ratio = 2.5

// #TEqualiser VST
const eq = new fluid.TEqualizerVst2()
eq.setBand2(330, -3)

////////////////////////////////////////////////////////////////
// Create score events (automation/midi/samples/etc)

// Automation Point
const f = fluid.PodolskiVst2.makeAutomation.vcf0Cutoff(0.5)
const p = fluid.DragonflyRoom.makeAutomation.sizeMeters(9)
const q = fluid.DragonflyRoom.makeAutomation.sizeMeters(30)

const r = new fluid.techniques.TrackAuto({ paramKey: 'pan', value: -.5, curve: -0.5 })
const m = new fluid.techniques.TrackAuto({ paramKey: 'pan', value:  .5 })
const n = new fluid.techniques.TrackAuto({ paramKey: 'gain', value: -6, curve: 0.8 })
const u = new fluid.techniques.TrackAuto({ paramKey: 'gain', value: -32.9 })
const x = new fluid.techniques.TrackAuto({ paramKey: 'width', value: 0 })
const y = new fluid.techniques.TrackAuto({ paramKey: 'width', value: 1 })

const tLibrary = {
  f, p, q,
  r, m, n, u, x, y,
  ...drums.tLibrary
}

const chordLibrary = fluid.tLibrary.fromArray(chords.map(chord => new fluid.techniques.MidiChord(chord)))
const bassLibrary = {}
Object.entries(chordLibrary).forEach(([k, v]) => {
  if (v instanceof MidiChord) {
    const note = v.notes.sort((a, b) => a - b)[0] - 36
    bassLibrary[k] = new MidiNote({ note })
  }
})

const dLibrary = {
  p: { dbfs: -6, intensity: 1/2 },
  f: { dbfs: 0, intensity: 1.0 },
  m: { dbfs: -2.6, intensity: 3/4 },
};

let session = new fluid.FluidSession({
  bpm: 96,
  r: '1 + 2 + 3 + 4 + ',
  dLibrary, // default for kick and snare
  tLibrary, // default for kick and snare
}, {
  kick:  { d: '.   . mf      ', gain: -6, plugins: [comp, eq]},
  snare: { d: 'm   f   m   f ' },
  chrd:  { tLibrary: chordLibrary, pan: -.25, plugins: [pwmSynth], gain: -10 },
  bass:  { tLibrary: bassLibrary, plugins: [bassSynth] },
  tamb:  { pan: .25 },
  revb:  { plugins: [verbPlugin], tLibrary: { p, q, r, m, n, u, x, y } },
});

session.insertScore({
  kick: ['.   . dd-dD--D--', 'd-- d-- d-- d-- '],
  snare:['r---k-  .   k-  ', '              '],
  tamb: ['t t t t t t t t ', {r: '1....234..', tamb: 'Ttttt..ttt', d: 'p'} ],
  bass:  '        b-      ',
  chrd:  'a-  .  ab---    ',
  revb:  'p      qx  ynrmu',
});

// const templateMessage = fluid.sessionToTemplateFluidMessage(session);
// const contentMessage = fluid.sessionToFluidMessage(session);
// const client = new cybr.Client();
// client.send([
//   cybr.global.activate(path.join(__dirname, 'session.tracktionedit'), true),
//   cybr.transport.loop(0, session.duration),
//   templateMessage,
//   contentMessage,
//   cybr.global.save(null, 'd'),
// ]);

const client = new cybr.Client()

async function run() {
  await client.connect(true)
  const rpp = await fluid.sessionToReaperProject(session, client);
  console.log(rpp.dump())
}

run()
  .catch(e => { throw e })
  .finally(() => { client.close() })
