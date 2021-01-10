# Concepts

The following concepts underpin the Fluid Music framework. These concepts build on each other, so this document is most helpful when read start-to-finish.

1. [Rhythm String](#rhythm-strings)
1. [Pattern String](#pattern-strings)
1. [Technique (Library)](#technique-library)
1. [Score](#score)
1. [Session](#session)
1. [Next Steps](#next-steps)

## Rhythm String

A **Rhythm String** represents a sequence of discrete musical durations. They are best understood with some examples:
- `'1234'` has four characters, and represents a sequence of four quarter notes
- `'w'` is one character, and represents a single `w`hole note
- `'hh'` has two characters, and represents a sequence of two `h`alf notes
- `'h h '` represents a sequence of four quarter notes (spaces may subdivide beats)
- `'h.h.'` is equivalent to `'h h '` (dots may subdivide beats)
- `'1..2..'` has 6 characters, and represents six eighth-note triplets
- `'1+2+3+4+'` is eight characters, and represents eight consecutive 8th notes
- `'1 2 3 4 '`is identical to `'1+2+3+4+'`
- `'1 + 2 + '` is eight characters and represents eight consecutive 16th notes
- `'1e+a2e+a'` is identical to `'1 + 2 + '`
- `'1....'` represents five quintuplets (any number of subdivision are possible)
- `'h34'` represents a half note and two quarter notes. `'h'` always represents a half note, and `'w'` always represents a whole note. Notice that this works a little differently than quarter notes: the duration of a `'1'` symbol may be shortened by the character that follows it (`'1+'` represents two eighth notes, not a quarter *and* an eighth note). While `'w'` and `'h'` my be divided into subdivisions like any other value (`'w...'`), the total duration incurred by `'w'` and `'h'` is never affected by subsequent characters.

## Pattern String

A **Pattern String** represents a sequence of music events. When coupled with a **Rhythm String**, a **Pattern String** describes a sequence of musical events. For example, when coupled with a `'1234'` quarter-note **Rhythm String**:

- `'Ds s'` Describes three quarter-note events: a `D` on the downbeat, and `s` events on beats 2 and 4
- `'Ds.s'` Is identical to the pattern above (`'.'` and `' '` are interchangeable)
- `'a-b-'` Describes two half-note events: an `a` event on the downbeat, and a `b` event on beat 3

There are two things to understand about **Pattern String**
1. Each character in a **Pattern String** invokes a user-defined **Technique** function
2. A **Technique Library** (see below) creates a mapping between characters and **Techniques**

## Technique (Libraries)

A **Technique** is any JavaScript object with a `.use` function. For example:

```javascript
const logTechnique = {
  use: (context) => console.log(context)
}
const logTimeTechnique = {
  use: (context) => console.log(context.track.name, context.startTime, context.duration)
}
```

**Techniques** are typically bundled in a JavaScript object known as **Technique Library**. Notice how the object keys in the example below are single characters (`a` and `b`). A **Technique** identified by a single character can be invoked within a **Pattern String**.

```javascript
// An example Technique Library
const tLibrary = {
  a: logTechnique,
  b: logTimeTechnique,
}
```

Notice that the two techniques are passed a `context` argument, which will be a [`UseContext`](https://fluid-music.github.io/interfaces/usecontext.html) object. Read the **Score** section below for an explanation of the `context` argument.

## Score

A **Score** is a JavaScript object that combines **Rhythm Strings**, **Pattern Strings**, and **Technique Libraries** to describe a portion of a DAW **Session**. A simple example:

```javascript
const score = {
  tLibrary: { a: logTechnique, b: logTimeTechnique },
  r:     '1234',
  kick:  '..b.',
  snare: 'a...',
}
```

Some of the keys in a **Score** object have a special meaning. In the example above:

- `tLibrary` tells the score parser to expect a **Technique Library**
- `p` tells the score parser to expect a **Pattern String**

However, the other keys in the score object (`kick` and `snare`) map to the names of tracks in a DAW **Session**. Parsing the `score` object in the example above would invoke the `logTechnique.use(context)` method (`a`) once, and the `logTimeTechnique.use(context)` (`b`) once.

The `context` argument that is passed in to `.use` methods includes the information about the context in which the Technique was used. Some handy properties of the `context` argument include:

- `context.startTime` the time, measured in whole notes at which the **Technique** was invoked
- `context.startTimeSeconds` the time, measured in seconds at which the **Technique** was invoked
- `context.duration` the duration of technique, measured in whole notes. The durations of all technique invocations in the example above are quarter notes (indicated by the `1234` **Rhythm String**), meaning the value of `context.duration` will be `0.25`
- `context.durationSeconds` the duration of the technique measured in seconds, which depends on the underlying beats-per-minute.
- `context.track` the [`FluidTrack`](https://fluid-music.github.io/classes/fluidtrack.html) on which the context was invoked. Read the next section on **Sessions** for how more info about tracks. Tracks will be created automatically if the do not exist when a **Score** object is parsed.

In practice, **Technique** methods usually have side-effects - they usually do something more than just `console.log` the `context` argument. In the example below, we use the built-in [`techniques.AudioFile`] **Technique**, which inserts hi-hat audio samples into a track named `hat`.

```javascript
const drumTechniqueLibrary = {
  h: new fluid.techniques.AudioFile({ path: '/closed-hi-hat.wav' }),
  H: new fluid.techniques.AudioFile({ path: '/open-hi-hat.wav' }),
}
// Insert 4 measures of hi-hat samples on the off-beats.
const score = {
  tLibrary: drumTechniqueLibrary,
  r:    '1+2+3+4+',
  hat: [' h h h h', ' h h h h', ' h h h h', ' h h h H' ]
}
```

The example above illustrates a previously-unmentioned feature: When the score parser encounters an array, it treats it as a sequence. Each **Pattern String** in the sequence will be parsed with the parent's **Rhythm String**. **Score** objects can even contain deeply nested arrays and objects (arrays containing arrays containing objects containing arrays, etc), but that will be covered in another guide.

## Session

To parse, play, or export a **Score** object, you need to first create a [`FluidSession`](https://fluid-music.github.io/classes/fluidsession.html) instance. These objects are modeled after DAW session: They contains tracks, and those tracks contain MIDI, audio, routing, plugins, and automation.

```javascript
// main.js
const { FluidSession } = require('fluid-music')
const kit = require('@fluid-music/kit')

const session = new FluidSession({ bpm: 96 }, [
  { name: 'drums', gainDb: -6, children: [
    { name: 'snare', gainDb: -3 },
    { name: 'kick' },
    { name: 'tamb', pan: 0.1 },
  ]}
])

// A simple two-measure beat described in the fluid-music score notation
const score = {
  tLibrary: kit.tLibrary,     // describe the score vocabulary (s/D/t)
  r:      '1 + 2 + 3 + 4 + ', // describe the score rhythm (16th notes)
  snare: ['    s       s   ', '    s       s   '],
  kick:  ['D               ', '          D  D  '],
  tamb:  ['t t t t t t t t ', 't t t t t t t t '],
}

// Insert the score twice, one after another.
session.insertScore(score)
session.insertScore(score)

// Save the session as a .RPP (Reaper) file
session.saveAsReaperFile('beat.RPP')
    .catch(e => console.error('Error:', e))
    .then(() => console.warn('Exported: beat.RPP'))
```

The `new FluidSession` constructor accepts two arguments:

1. The first argument is a [SessionConfig](https://fluid-music.github.io/interfaces/sessionconfig.html) object which configures the new session. In the example above, `{ bpm: 96 }` sets the beats-per-minute of the `session` object. The score configuration object has some other useful properties. `.r` sets a default (**Rhythm String**) for the entire session. Similarly, `.tLibrary` sets  default **Technique Library**.
2. The second argument is an array of [TrackConfig](https://fluid-music.github.io/interfaces/trackconfig.html) objects, which defines the structure of tracks in the session. At minimum, each track config object must have a `.name` string. A track with a with a `.children` array is treated as a submix, with each child track nested underneath it. In the example above, the `snare`, `kick`, and `tamb` will be routed through the `drums` submix.

The code above calls `require('@fluid-music/kit')`, which imports an external **Technique Library**. The name `@fluid-music/kit` identifies an [`@fluid-music/kit` npm package](https://www.npmjs.com/package/@fluid-music/kit) which includes snare, kick and tambourine `AudioFile` techniques (`s`, `D`, and `t` respectively). The `t` **Technique** inserts a tambourine sound, but unlike the `D` and `s` **Techniques**, it does not simply use `techniques.AudioFile` to insert a single clip. Because the tambourine is often played very repetitively (on every 8th note in the example above), it will start to sound very rigid if the exact same sample is used over and over again. So `t` invokes the `techniques.Random` **Technique** to randomly select from a collection of different samples with different characteristics. The conventional way to handle this kind of sample and parameter randomization is to load a bunch of samples into a dedicated sampler, and program that sampler to randomize parameters when it receives a MIDI note. Fluid Music takes a different approach: Just invoke a **Technique**'s `.use` method for each `t` character. If you want basic randomization, use the built-in `techniques.Random` class. If you want more precise control, write your own custom **Technique**.

Fluid Music is designed to integrate with the Node Package Manager (`npm`). The `@fluid-music/kit` is a lightweight package that includes a few drum samples and specialized **Techniques** to insert those samples into a session. `npm` handles all the logistics of versioning packages and managing dependencies between packages. This means that you can write your own custom package that invokes **Techniques** defined in `@fluid-music/kit`, and then publish your package to the internet using `npm`. When you go to use your custom package, `npm` will know how to find, download, and install `@fluid-music/kit` in addition to any code or content that you have added.

If you are familiar with package managers like `pip` or `npm` the idea of "transitive" dependency management will be familiar. However, in the world of sound design, dependency management is still major challenge. Computational sound design programs like SuperCollider, Max, CSound, and even Splice are starting incorporate dependency management, but still leave a lot to be desired. Fluid Music designed around transitive dependencies from the start.

## Next Steps

The concepts described above are important for understanding Fluid Music. However, we only scratched the surface of what you can do with Fluid Music. Concepts and features that were not covered include:

- The Fluid Music server
- Using VST Plugins
- Adding support for new VST Plugins
- Playing audio directly from the Fluid Music server
- Watching `.js` files for changes for "live" playback
- Rendering session to audio files
- Track sends/receives
- Tracks with Sidechain inputs
- Writing and publishing your custom **Techniques** and packages
- Authoring MIDI and MIDI Chord Progression Libraries
- How to Fade/Trim/Edit/Reverse audio files
- Getting off the grid with advanced rhythms and micro-timing
- Long-form scores and deeply nested score objects
- Dynamic patterns for parameterizing score objects
- Authoring track automation
- Authoring plugin parameter automation

I will add guides for these topics as time allows. If you haven't already, I recommend following the [Getting Started](https://github.com/fluid-music/docs/getting-started.md) guide for a practical introduction to the Fluid Music framework.
