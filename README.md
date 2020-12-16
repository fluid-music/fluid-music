# Fluid Music

Extensible Music Composition and Music Production Framework for [Node](https://nodejs.org).

```javascript
// Insert two measures of snare, kick, and tambourine samples
const score = {
  r:      '1 + 2 + 3 + 4 + ',
  snare: ['    s       s   ', '    s       s   '],
  kick:  ['D               ', '          D  D  '],
  tamb:  ['t t t t t t t t ', 't t t t t t t t '],
}
```

Fluid music converts score objects (above) to:

- `.wav` audio files
- `.tracktionedit` files ([Tracktion Waveform](https://www.tracktion.com/products/waveform-pro))
- `.rpp` files (shown below in [Reaper](https://reaper.fm))

![Screen Shot 2020-12-16 at 1 02 37 AM](https://user-images.githubusercontent.com/1512520/102311683-4baa3b80-3f3b-11eb-87d1-85f4909afb0a.png)

In the example above, characters in the score (`s`, `D`, `t`) insert audio samples into the session. However, the meaning of each character in a score is customizable. 

The power of the fluid music system comes from writing custom techniques in JavaScript that can be triggered by characters in a score. 

## Getting Started

**Charles: link to a getting started guide**

## Score Format

- Insert and edit audio files (trim, fade, move, reverse)
- Insert MIDI notes
- Automate track parameters like volume and pan
- Automate VST parameters
- Modify the underlying session (add tracks, routing, side chaining, etc)
- Randomize behaviors
- Invoke combinations of techniques
- Do anything you can code

TODO: Explain
- Rhythm Strings
- Invoking functions


## A Simple Example

```javascript
const { FluidSession } = require('fluid-music')
const kit = require('@fluid-music/kit')

// Define a "drums" bus with 3 child-tracks: kick, snare, tambourine
const tracks = [
  { name: 'drums', gainDb: -6, children: [
    { name: 'snare' },
    { name: 'kick' },
    { name: 'tamb', pan: 0.2 },
  ]}
]

// Each character (D, s, t) in the score below invokes a function which
// inserts an audio sample into the session. These functions and samples
// are bundled within the '@fluid-music/kit' npm package.
const score = {
  tLibrary: kit.tLibrary,
  r:      '1 + 2 + 3 + 4 + ',
  snare: ['    s       s   ', '    s       s   '],
  kick:  ['D               ', '          D  D  '],
  tamb:  ['t t t t t t t t ', 't t t t t t t t '],
}

// Create a session using the tracks and score (above)
const session = new FluidSession({ bpm: 96 }, tracks)
  .insertScore(score)
  .saveAsReaperFile('beat.RPP') // export to Reaper
    .catch(e => console.error('Error:', e))
    .then(() => console.warn('Exported: beat.RPP'))
```

## Comparison with other tools

The Fluid Engine aims to bridge the gap between DAWs and existing procedural audio languages by integrating computational code-based techniques directly into a conventional audio workstation. The following design choices show a balance between timeline-centric, GUI-based DAWs, and other systems for imperative computational sound design.

**The Fluid Engine can:**
- Describe sound design documents in a format that is human readable and machine readable, allowing:
  - an ecosystem of recipe sharing, akin to a package manager AND
  - integration with procedural and ML workflows
- Integrate with a conventional DAW GUI, which is necessary for:
  - precision timeline based editing
  - carefully inspecting the output of computational content and recipes
  - creating content that is competitive with music created professionally using the conventional DAW based workflow
- Host and configure VST2 plugins (if you have access to the VST2 sdk), which is important for:
  - Inspecting and modifying output material in a DAW
- Render results in realtime, which is necessary for:
  - playing the engine like an instrument
  - exploring recipe parameter space as a sound designer
  - mixing/matching/tweaking input recipes as a musician/composer
  - running in an dynamic audio streaming server
- Render offline. Necessary for:
  - offline personalized content systems
  - deploying in machine learning projects such as a GANs and reinforcement learning systems
  - efficient machine listening based recipes
- Run headless, which is necessary for:
  - deploying to a web server

**Traditional DAWs**
- Useful if you want:
  - precise timeline-based editing. No other tool works as well for common timeline based sound design like precise parameter automation, audio editing, and mixing, arranging
  - great for both realtime editing and offline audio rendering
  - professional plugin ecosystem
- Not helpful if you need to:
  - insert any kind of computation or procedural content into the the production pipeline
  - deploy dynamic content to a web server or mobile devices

**Graphical programming languages like Max and PureData**
- Useful when you want to:
  - prototype realtime interactive systems
- Not useful if you need:
  - precise timeline-based editing
  - design systems that are too complex to manage in a graphical programming environment

**Code based languages like SuperCollider and ChucK, and CSound**
- Useful when you want to:
  - design complex interactive audio graphs
  - deploy on a server or in mobile app
  - do experimental sound design
- Not useful if you need:
  - precise timeline-based editing/composing on a timeline (while Csound is built on the concept of a text based "score," it is very clumsy to work with when compared with a DAW)
  - support for pro quality plugins
  - precise audio editing support
  - DAW integration

**Music21 (symbolic music notation library)**
- Useful for computational score analysis
- Not useful for
  - computational composition
  - daw integration
