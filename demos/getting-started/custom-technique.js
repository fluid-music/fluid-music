const { FluidSession } = require('fluid-music')
const kit = require('@fluid-music/kit')

// Simplest possible technique just logs the event startTime and duration
const logTechnique = {
  use: (context) => {
    console.log(`${context.track.name} - time: ${context.startTime}, duration: ${context.duration}`)
  }
}

// Techniques with parameters are often defined as a class. The example below
// is a good place to copypasta when creating new techniques.
//
// Notice the @param syntax used in the JSDoc comment. If you are using VS Code,
// this will give you deep syntax completion for the members of the context.
// because 
//
// This illustrates a two common patterns:
// 1. Technique that delegates to another technique
// 2. Modifying a UseContext, and passing it on to other
//
// MidiNote is an example of a pattern that mutates the session:
// https://github.com/CharlesHolbrow/fluid-music/blob/78f48f/fluid-music/src/techniques/basic.ts#L36-L52

/**
 * Trigger the input event with a slight delay
 */
class MillisecondsLateTechnique {
  constructor (otherTechnique, millisecondsLate) {
    this.lateSeconds = millisecondsLate * 0.001
    this.otherTechnique = otherTechnique
  }

  /** @param {import('fluid-music').UseContext} context */
  use(context) {
    context.startTimeSeconds += this.lateSeconds
    context.startTime += context.session.timeSecondsToWholeNotes(this.lateSeconds)
    this.otherTechnique.use(context)
  }
}

// extend the "kit" tLibrary, adding our custom techniques
const tLibrary = { ...kit.tLibrary }
tLibrary.L = logTechnique
tLibrary.T = new MillisecondsLateTechnique(kit.tLibrary.t, 40)

// Define a "drums" bus with 3 child-tracks: kick, snare, tambourine
const tracks = [
  { name: 'drums', gainDb: -6, children: [
    { name: 'snare', gainDb: -3 },
    { name: 'kick' },
    { name: 'tamb' },
  ]}
]

// Each character (s/D/t) in the score below invokes a function which
// inserts an audio sample into the session. These functions and samples
// are bundled within the '@fluid-music/kit' npm package.
const score = {
  tLibrary, // Use our extended technique library
  r:      '1 + 2 + 3 + 4 + ',//1 + 2 + 3 + 4 + '
  snare: ['    s       s   ', '    s       s   '],
  kick:  ['D   L       L   ', '    L     D LD  '],
  tamb:  ['t t t t t t t t ', 't t t t t t t t '],
}

// Create a Session, specifying the beats-per-minute and audio/midi tracks
const session = new FluidSession({ bpm: 96, loopDuration: 2 }, tracks)

// Insert the score object into our session
session.insertScore(score)

// Save the session as a Reaper file
session.finalize()
session.saveAsReaperFile('custom.RPP')
  .catch(e => console.error('Error:', e))
  .then(() => console.warn('Exported: custom.RPP'))
