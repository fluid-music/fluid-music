const path = require('path')
const fluid = require('fluid-music')
const cybr = fluid.cybr
const nLibrary = require('./n-library')
const { clip, eventMappers } = require('fluid-music')

const tyrellN6 = new fluid.TyrellN6Vst2({
  // Osc Mod
  tyrellSoftSync: 100,

  // Envelope 1
  env1Attack: 0,
  env1Decay: 50,
  env1Sustain: 9.5,
  env1Release: 18,

  // Envelope 2
  env2Attack: 0,
  env2Decay: 23.6,
  env2Sustain: 6,
  env2Release: 20,

  env1Velocity: 0,
  env2Velocity: 80,

  // LP/HP filter
  tyrellCutoff: 60,
  tyrellResonance: 34,
  tyrellKeyFollow: 100,
  tyrellFreqModDepth1: 120,
  tyrellFreqModSrc2: fluid.TyrellN6Vst2.parameterLibrary.tyrellFreqModSrc2.choices.velocity,
  tyrellFreqModDepth2: 18,

  // Oscillators
  tyrellOscVolume1: -30,
  tyrellOscVolume2: -78.5,
  tyrellSubVolume: -91,
  tyrellTune2: 12,

  tyrellShape1: 2.35,
  tyrellShape2: 1.7,

  // Osc Mod
  tyrellPwdepth: 15
})
tyrellN6.automation.tyrellTune2 = { points: [tyrellN6.makeAutomation.tyrellTune2(tyrellN6.parameters.tyrellTune2)] }
tyrellN6.automation.tyrellCutoff = { points: [tyrellN6.makeAutomation.tyrellCutoff(tyrellN6.parameters.tyrellCutoff)] }

const v = tyrellN6.makeAutomation.tyrellTune2(1)
const V = tyrellN6.makeAutomation.tyrellCutoff(65)
const w = [v, V]

function fadeInOut (event, context) {
  const eventMapId = 'fadeInOutProcessed'
  if (context.data[eventMapId] || event.type !== 'midiChord') return event
  context.data[eventMapId] = true

  const startTime = 0 // startTime is relative to the Clip
  const endTime = startTime + context.clip.duration
  const midTime = startTime + ((endTime - startTime) / 2)

  const fadeIn = { type: 'trackAuto', paramKey: 'gain', startTime, value: -Infinity, curve: -0.5 }
  const fadeOut = { type: 'trackAuto', paramKey: 'gain', startTime: midTime, value: 0, curve: 0.5 }
  const end = { type: 'trackAuto', paramKey: 'gain', startTime: endTime, value: -Infinity }

  return [event, fadeIn, fadeOut, end]
}

/**
 * @param {Type} event
 * @param  {fluid.ClipEventContext} context
 */
const arp = function (event, context) {
  if (event.type !== 'midiChord') return event
  const stepSize = 1 / 4 / 8
  const numSteps = Math.floor(event.duration / stepSize)
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
  r: 'hhh',
  nLibrary: Object.assign({ v, V, w }, nLibrary)
}, {
  chords1: { plugins: [tyrellN6] },
  chords2: { plugins: [new fluid.TyrellN6Vst2(tyrellN6.parameters)] },
  chords3: { plugins: [new fluid.TyrellN6Vst2(tyrellN6.parameters)] }
})

const r3 = { r: '123', clips: ['...'] }
const rest6 = { r: 'hhh', clips: ['...'] }

session.insertScore({
  chords1: {
    clips: ['a--', 'a--', 'd--'],
    chords1: ['...', 'w'],
    eventMappers: [arp]
  },
  chords2: {
    clips: [r3, 'b--', 'w', 'e--'],
    eventMappers: [fadeInOut, arp]
  },
  chords3: {
    clips: [rest6, 'c--'],
    eventMappers: [fadeInOut, arp]
  }
})

// pseudo side-chain first track
const clips2and3 = [
  ...session.tracks.find(t => t.name === 'chords2').clips,
  ...session.tracks.find(t => t.name === 'chords3').clips]
  .filter(clip => clip.midiEvents && clip.midiEvents.length)
const timesAndAmounts = clips2and3.map(c => [
  { time: c.startTime, delta: 0 },
  { time: c.startTime + c.duration / 2, delta: -8 },
  { time: c.startTime + c.duration, delta: 8 }
]).flat()
let tds = []
timesAndAmounts.forEach(td => {
  const obj = tds.find(td2 => td2.time === td.time)
  if (obj) {
    obj.delta += td.delta
  } else {
    tds.push(td)
  }
})
tds = tds.sort((a, b) => a.time - b.time)
let sum = 0
const gainAutomation = tds.map((td, i) => {
  sum += td.delta
  return { type: 'trackAuto', paramKey: 'gain', startTime: td.time, value: sum, curve: -0.5 }
})
session.tracks.find(track => track.name === 'chords1').automation.gain = { points: gainAutomation }
console.warn(gainAutomation)

const client = new cybr.Client({ timeout: Math.pow(2, 31) - 1 })
client.connect(true)

const run = async () => {
  // create RPP
  const rpp = await fluid.tracksToReaperProject(session.tracks, 92, client)
  console.log(rpp.dump())

  // send to CYBR
  // const activateMsg = fluid.cybr.global.activate(path.join(__dirname, 'demo-shepherd.tracktionedit'), true)
  // const tracksMsg = fluid.tracksToFluidMessage(session.tracks)
  // const saveMsg = fluid.cybr.global.save()

  // await client.send([activateMsg, tracksMsg, saveMsg])
}

run().finally(() => {
  client.close()
})
