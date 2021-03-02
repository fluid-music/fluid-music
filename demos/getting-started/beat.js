const { FluidSession } = require('fluid-music')
const kit = require('@fluid-music/kit')

// Define a "drums" bus with 3 child-tracks: kick, snare, tambourine
const tracks = [
  { name: 'drums', gainDb: -6, children: [
    { name: 'snare', gainDb: -3 },
    { name: 'kick' },
    { name: 'tamb', pan: 0.2 },
  ]}
]

// Each character (s/D/t) in the score below invokes a function which
// inserts an audio sample into the session. These functions and samples
// are bundled within the '@fluid-music/kit' npm package.
const score = {
  tLibrary: kit.tLibrary,     // describe the score vocabulary (s/D/t)
  r:      '1 + 2 + 3 + 4 + ', // describe the score rhythm (16th notes)
  snare: ['    s       s   ', '    s       s   '],
  kick:  ['D               ', '          D  D  '],
  tamb:  ['t t t t t t t t ', 't t t t t t t t '],
}

// Create a Session, specifying the beats-per-minute and audio/midi tracks
const session = new FluidSession({ bpm: 96 }, tracks)

// Insert the score object into our session
session.insertScore(score)

// Save the session as a Reaper file
session.finalize()
session.saveAsReaperFile('beat.RPP')
  .catch(e => console.error('Error:', e))
  .then(() => console.warn('Exported: beat.RPP'))
