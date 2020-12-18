# Getting Started

In this guide, we'll create a short composition with the `fluid-music` npm library. I'll describe each line of code, and by the end you should understand the fundamentals of Fluid Music, and be able to create your own compositions.

**Note:** To follow this guide, you'll to install [Reaper](https://reaper.fm) (digital audio workstation). You can download and install Reaper for free. If you use it in the long term, I recommend purchasing a $60 personal license. Don't be fooled by the low price tag - in many ways, Reaper is more powerful than other audio software that is an-order-of-magnitude more expensive. You don't need Reaper to use `fluid-music` but it does make things easier.

From your terminal of choice:

```bash
$ mkdir fluid-experiment
$ cd fluid-experiment
$ npm init # (answer the questions)
$ npm i fluid-music @fluid-music/kit
```

Create `./run.js` file. Copy the following code block into the file:

```javascript
const { FluidSession } = require('fluid-music')
const kit = require('@fluid-music/kit')

// Define a "drums" bus with 3 child-tracks: kick, snare, tambourine
const tracks = [
  { name: 'drums', gainDb: -6, children: [
    { name: 'snare' gainDb: -3 },
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

// Create a session using the tracks and score (above). Export to Reaper.
const session = new FluidSession({ bpm: 96 }, tracks)
  .insertScore(score)
  .saveAsReaperFile('beat.RPP')
    .catch(e => console.error('Error:', e))
    .then(() => console.warn('Exported: beat.RPP'))
```

Let's think through each line of code

**TODO**
