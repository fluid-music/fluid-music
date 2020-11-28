const path   = require('path');
const fluid  = require('fluid-music');
const cybr   = fluid.cybr;
const drums  = require('@fluid-music/kit');
const chords = require('./chords');

const { podolskiSine } = require('./presets')
const { MidiChord, MidiNote } = require('fluid-music/built/fluid-techniques');

////////////////////////////////////////////////////////////////
// Configure some VSTs

// Synthesizers
const pwmSynth = new fluid.plugins.TyrellN6Vst2({ env1Attack: 2, env1Decay: 77, env1Sustain: 69, tyrellCutoff: 84 })
const bassSynth = podolskiSine()

// Reverb
const verbPlugin = new fluid.plugins.DragonflyRoomVst2({
  decaySeconds: 1.5,
  predelayMs: 40,
  dryLevelPercent: 0,
  earlyLevelPercent: 40,
  lateLevelPercent: 100,
  highCutHz: 7800,
  earlyDampHz: 4600,
  lateDampHz: 3900,
})

const bassComp = new fluid.plugins.TCompressorVst2({
  attackMs: 12,
  releaseMs: 80,
  useSidechainTrigger: 1,
  thresholdDb: -11,
  ratio: 4,
})

const scComp = new fluid.plugins.RoughRider3Vst2({
  externalSidechainEnable: 1,
  sensitivityDb: -10,
  ratio: 7,
  makeupGainDb: 0,
  releaseMs: 310,
  attackMs: 10,
})

// TEqualiser VST
const eq = new fluid.plugins.TEqualizerVst2()
eq.setBand2(330, -3)

////////////////////////////////////////////////////////////////
// Create score events (automation/midi/samples/etc)

const automationLibrary = {
  a: new fluid.techniques.TrackAutomation({ paramKey: 'pan', value: -.5, curve: -0.5 }),
  b: new fluid.techniques.TrackAutomation({ paramKey: 'pan', value:  .5 }),
  c: new fluid.techniques.TrackAutomation({ paramKey: 'gain', value: -6, curve: 0.8 }),
  d: new fluid.techniques.TrackAutomation({ paramKey: 'gain', value: -32.9 }),
  e: new fluid.techniques.TrackAutomation({ paramKey: 'width', value: 0 }),
  f: new fluid.techniques.TrackAutomation({ paramKey: 'width', value: 1 }),

  u: fluid.plugins.PodolskiVst2.makeAutomation.vcf0Cutoff(0.5),
  v: fluid.plugins.DragonflyRoomVst2.makeAutomation.sizeMeters(9),
  w: fluid.plugins.DragonflyRoomVst2.makeAutomation.sizeMeters(30),
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
  p: { trimDb: -6, intensity: 1/2 },
  m: { trimDb: -2.6, intensity: 3/4 },
  f: { trimDb: 0, intensity: 1.0 },
};

let session = new fluid.FluidSession({
  bpm: 96,
  r: '1 + 2 + 3 + 4 + ',
  // default for kick and snare
  tLibrary: drums.tLibrary,
  dLibrary,
}, [
  { name: 'mute', gainDb: -Infinity, children: [
    { name: 'skik' },
  ]},
  { name: 'drums', gainDb: -6, children: [
    { name: 'kick',  gainDb: -6, sends: [{ to: 'revb', gainDb: -20 }], d: '.   . mf      ', plugins: [eq] },
    { name: 'snare', gainDb: -6, sends: [{ to: 'revb', gainDb: -22 }], d: 'm   f   m   f ' },
    { name: 'tamb',  gainDb: -2, sends: [{ to: 'revb', gainDb: -15 }] },
    { name: 'sub',   tLibrary: bassLibrary, plugins: [bassSynth, bassComp.sidechainWith('kick')] },
  ]},
  { name: 'chrd', gainDb: -10, tLibrary: chordLibrary, pan: -.25, plugins: [pwmSynth, scComp.sidechainWith('skik')] },
  { name: 'revb', gainDb: -10, plugins: [verbPlugin], tLibrary: automationLibrary },
])

session.insertScore({
  skik: ['d   d   d   d   ', 'd   d   d   d   '],
  kick: ['.   . dd-dD--D--', 'd-- d-- d-- d-- '],
  snare:['r---s       s   ', '              '],
  tamb: ['t t t t t t t t ', {r: '1....234..', tamb: 'Ttttt..ttt', d: 'p'} ],
  sub:   '       b-       ',
  chrd:  'a-  .  ab---    ',
});

const client = new cybr.Client()
async function run() {
  await client.connect(true)
  console.warn('Saving demo-typescript.RPP')
  await session.saveAsReaperFile('demo-typescript', client)
  console.warn('Saving demo-typescript.tracktionedit')
  await session.saveAsTracktionFile('demo-typescript', client)
  console.warn('Done!')
}

run()
  .catch(e => { throw e })
  .finally(() => { client.close() })
