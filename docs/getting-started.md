# Getting Started

In this practical guide, we'll create a brief composition using the `fluid-music` npm library.

**NOTE:** This guide will be easier to understand if you read [Fluid Music Concepts](https://github.com/CharlesHolbrow/fluid-music/blob/main/docs/concepts.md) first!

**NOTE:** To follow this guide, you will need to install [Reaper](https://reaper.fm) (digital audio workstation). You can download and install Reaper for free. If you use it in the long term, I recommend purchasing a $60 personal license. Don't be fooled by the low price tag – in many ways, Reaper is more powerful than other audio software that is more expensive by an order of magnitude. **You don't need Reaper to use `fluid-music` but it does make things easier.**

First, we'll create a new directory and initialize a `package.json` file, which identifies the directory as an npm package. I named the package `fluid-experiment` (you can choose any name you like). Then install the `fluid-music` and `@fluid-music/kit` npm libraries.

```bash
$ mkdir fluid-experiment
$ cd fluid-experiment
$ npm init # (answer the questions to create package.json)
$ npm i fluid-music @fluid-music/kit
```

Create a `./run.js` file containing the code below:

```javascript
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

// Insert the score object, and export to Reaper
session.insertScore(score)
session.saveAsReaperFile('beat.RPP')
    .catch(e => console.error('Error:', e))
    .then(() => console.warn('Exported: beat.RPP'))
```

Open `beat.RPP` in Reaper. It should look like this:

<img width="1035" alt="Reaper UI containing beat.RPP" src="https://user-images.githubusercontent.com/1512520/104135377-fc9acf00-535d-11eb-8125-beb7c1b77cb1.png">

Congratulations, you just created your first fluid music project.
