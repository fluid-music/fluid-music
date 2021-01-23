const { FluidSession, plugins, techniques } = require('fluid-music')
const kit = require('@fluid-music/kit')

const ducker = new plugins.RoughRider3Vst2({
  externalSidechainEnable: 1,
  ratio: 8,
  sensitivityDb: -25,
  attackMs: 3,
  releaseMs: 223,
}).sidechainWith('kick')

// Create a tLibrary filled with MIDI Chords
const chordLibrary = {
  a: new techniques.MidiChord({ notes: [64, 67, 71] }), // e minor
  b: new techniques.MidiChord({ notes: [64, 67, 69] }),
  c: new techniques.MidiChord({ notes: [59, 66, 69] }),
  d: new techniques.MidiChord({ notes: [59, 64, 67] }),
  e: new techniques.MidiChord({ notes: [59, 62, 64] }),
}

// Instantiate a Podolski VST2 plugin from a preset
const padSynthA = plugins.podolskiVst2Presets.brightPad()
const padSynthB = plugins.podolskiVst2Presets.brightPad()
padSynthA.parameters.vcf0Cutoff = 22
padSynthB.parameters.vcf0Cutoff = 2

const score = {
  r:      '1+2+3+4+', // describe the score rhythm (8th notes)
  snare: ['  s   s ', '  s   s '],
  kick:  ['D D D D ', 'D D D D ', 'D D D D ', 'D D D D '],
  tamb:  ['tttttttt', 'tttttttt', 'tttttttt', 'tttttttt'],
  padA:  ['a-b---- ', 'c--c----', 'd---    ', '        '],
  padB:  ['        ', '        ', '        ', 'e-------'],
}

// Create a Session, specifying beats-per-minute and track configuration
const session = new FluidSession({ bpm: 121, loopDuration: 4 }, [
  // In the first example, we specified a tLibrary in the score object. In this
  // example, tLibrary objects are specified in the track objects.
  { name: 'drums', gainDb: -6, tLibrary: kit.tLibrary, children: [
    { name: 'snare', gainDb: -3 },
    { name: 'kick' },
    { name: 'tamb', pan: 0.1 },
  ]},

  // Notice the pad tracks have a .plugins array containing the synthesizer
  // preset. It also has a dedicated tLibrary containing MIDI chords.
  { name: 'pads', tLibrary: chordLibrary, plugins: [ducker], children: [
    { name: 'padA', plugins: [padSynthA] },
    { name: 'padB', plugins: [padSynthB] },
  ]}
])

// Insert the score object.
session.insertScore(score)
session.finalize()
session.saveAsReaperFile('disco.RPP')
  .catch(e => console.error('Error:', e))
  .then(() => console.warn('Saved: disco.RPP'))
