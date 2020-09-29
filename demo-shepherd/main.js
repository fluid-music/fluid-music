const fluid = require('fluid-music')
const cybr = fluid.cybr
const nLibrary = require('./n-library')

const tyrellN6 = new fluid.TyrellN6Vst2({
  env1Attack: 0,
  env1Decay: 50,
  env1Sustain: 9.5,
  env1Release: 18,

  env2Attack: 0,
  env2Decay: 23.6,
  env2Sustain: 6,
  env2Release: 20,

  env1Velocity: 0,
  env2Velocity: 80,

  // LP/HP filter
  tyrellCutoff: 75,
  tyrellResonance: 34,
  tyrellKeyFollow: 100,
  tyrellFreqModDepth1: 120,
  tyrellFreqModSrc2: fluid.TyrellN6Vst2.parameterLibrary.tyrellFreqModSrc2.choices.velocity,
  tyrellFreqModDepth2: 18,

  // Oscillators
  tyrellOscVolume1: -30,
  tyrellOscVolume2: -78.5,
  tyrellSubVolume: -91,

  tyrellShape1: 2.35,
  tyrellShape2: 1,

  // Osc Mod
  tyrellPwdepth: 50
})

/**
 * @param {Type} event
 * @param  {fluid.ClipEventContext} context
 */
const arp = function (event, context) {
  if (event.type !== 'midiChord') return event
  console.warn('chord duration:', event.duration)
  const stepSize = 1 / 4 / 2 / event.notes.length
  const numSteps = Math.floor(event.duration / stepSize) // 16th notes
  const result = []

  for (let i = 0; i < numSteps; i++) {
    const n = event.notes[i % event.notes.length]
    const v = 80 - Math.round(60 * i / numSteps)
    const startTime = stepSize * i + event.startTime
    const duration = stepSize
    result.push({ type: 'midiNote', startTime, duration, n, v })
  }
  return result
}

const session = new fluid.FluidSession({
  bpm: 92,
  r: '12345',
  nLibrary
}, {
  chords1: { plugins: [tyrellN6], eventMappers: [arp] },
  chords2: { plugins: [tyrellN6] },
  chords3: { plugins: [tyrellN6] }
})

session.insertScore({
  chords1: {
    clips: ['abcba', 'aabbc'],
    eventMappers: [arp]
  },
  chords2: ['abcba']
})

const client = new cybr.Client()
client.connect(true)

const run = async () => {
  const rpp = await fluid.tracksToReaperProject(session.tracks, 92, client)
  console.log(rpp.dump())
}

run().finally(() => {
  client.close()
})
