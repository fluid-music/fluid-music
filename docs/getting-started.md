# Getting Started

In this practical guide, we'll create a brief composition using the `fluid-music` npm library.

**NOTE:** This guide will be easier to understand if you read [Fluid Music Concepts](https://github.com/CharlesHolbrow/fluid-music/blob/main/docs/concepts.md) first!

**NOTE:** To follow this guide, you will need to install [Reaper](https://reaper.fm) (digital audio workstation). You can download and install Reaper for free. If you use it in the long term, I recommend purchasing a $60 personal license. Don't be fooled by the low price tag – in many ways, Reaper is more powerful than other audio software that is more expensive by an order of magnitude. **You don't need Reaper to use `fluid-music` but it does make things easier.**

First, we'll create a new directory and initialize a `package.json` file, which identifies the directory as an `npm` package. I named the package `fluid-experiment` (you can choose any name you like). Then install the `fluid-music` and `@fluid-music/kit` npm libraries.

```bash
$ mkdir fluid-experiment
$ cd fluid-experiment
$ npm init # (answer the questions to create package.json)
$ npm i fluid-music @fluid-music/kit
```

Create a `./session.js` file containing the code below:

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

// Insert the score object into our session
session.insertScore(score)

// Save the session as a Reaper file
session.finalize()
session.saveAsReaperFile('beat.RPP')
    .catch(e => console.error('Error:', e))
    .then(() => console.warn('Exported: beat.RPP'))
```

Run `session.js`

```bash
$ node session.js
```

Open `beat.RPP` in Reaper. It should look like this:

<img width="1035" alt="Reaper UI containing beat.RPP" src="https://user-images.githubusercontent.com/1512520/104135377-fc9acf00-535d-11eb-8125-beb7c1b77cb1.png">

Congratulations, you just created your first Fluid Music project.

## The Fluid Music Server (`cybr`)

So far, Fluid Music is only manipulating audio meta data. You haven't used any of the audio features. The Fluid Music framework can host and configure VST plugins, play audio, and render audio files. However, to take advantage of these features you need to run an instance of the Fluid Music server on your machine. This server is named `cybr`. Unlike the node library, which is written in TypeScript, `cybr` is written in C++, and it handles all the audio processing for Fluid Music.

- The `cybr` server is not bundled with the `fluid-music` npm package. You need to install and run it independently.
- You can compile the Fluid Music server using the code in the [fluid-music/server directory](https://github.com/CharlesHolbrow/fluid-music/tree/main/server)
- This guide assumes you added the `cybr` executable to your `PATH` so you can run it from the command like with with `$ cybr -f`. [What is the `PATH` variable?](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them)
    - On most MacOS and Linux systems `/usr/local/bin/` is a reasonable place to put the `cybr` executable
- To compile with VST support, you need to have access to the VST2 SDK. *Steinberg Media Technologies GmbH*, the company that created the VST2 SDK, is making it increasingly difficult to access the VST2 SDK. If you do not have access to the VST2 SDK, you can compile without VST2 support.
- VST3 is not yet supported. Most of the work for supporting VST3 is done. It will not be fully supported until after I graduate (Summer 2021).

To verify that `cybr` is installed, run the following help command.

```bash
$ cybr -h
```

This should output a list of possible cybr command line arguments. If you get a `command not found` error, make sure that the `cybr` executable is the correct file for your operating system, and that it can be found in one of the directories in your `PATH`.

Let's setup `cybr` to play our session directly so we don't have to open it in a DAW. First, let's identify available audio hardware on our system with the `--list-io` flag. This will output all the available audio, midi, and virtual interfaces. On my MacOS system, the I'm looking for `CoreAudio` devices, which look like this:

```bash
$ cybr --list-io
Devices By Type (juce::AudioIODeviceType):
...
CoreAudio
  - External Headphones
  - MacBook Pro Speakers
  - ZoomAudioDevice
  - samson/headphones
...
```

I want `cybr` to play audio from the headphone jack on my MacBook laptop, so I'll run the server like this:

```bash
$ ./cybr --device-out="External Headphones" -f
...
Using Input Device:  <none>
Using Output Device: "External Headphones"
Listening for IPC Connections
Listening for UDP Connections
```

Notice the `-f` flag, which is shorthand for `--fluid-server`. This flag tells `cybr` to listen for connections and requests from the `fluid-music` npm package. With the server running, let's send our session from the previous example to the server and then ask the server to play it.

Replace the last three lines of `session.js` with the the following:

```javascript
session.sendToServer()
  .catch(e => console.error('Error:', e))
  .then(() => console.warn('Sent session to cybr'))
```

Leave the server running, and open a new terminal tab. Run the session script again (`$ node session.js`). This will load the session in the server, but does not begin playback. We will use the `fluid` command line utility to play back audio. First, use `npm` to install `fluid-music` globally, which adds the `fluid` command to your `PATH`.

```bash
$ npm install -g fluid-music
```

Now you can use the `fluid` command to start playback

```bash
$ fluid play  # Start playback
$ fluid to 0  # Restart playback from the beginning
$ fluid stop  # Stop (Pause)
```

## VST Plugins

Let's try create a session with a VST plugin. In this example, we'll use the excellent free Podolski VST2 plugin. [Download and install Podolski](https://u-he.com/products/podolski/) before proceeding. It's best to install plugins in the default location so that `cybr` knows where to find them.

The `cybr` server needs to scan for plugins before it can load them. Switch back to your terminal tab that is running the server, and use `ctrl+c` to stop the server. Use the `cybr --scan-plugins` command to search your machine for plugins. If one of your plugins crashes, it will be skipped on subsequent scans, so you may need to scan more than once if `cybr` encounters unstable plugins.

Once you have finished scanning, use the `cybr --list-plugins` to verify the `Podolski` plugin was found.

```bash
# Some useful cybr commands
cybr --scan-plugins          # Scan for plugins, adding them to the settings file
cybr --list-plugins          # List available plugins
cybr --print-config-filename # Print the complete settings filename.
```

Restart `cybr -f`, specifying a `--device-out` if needed (if you do not specify a `--device-out="Some Device"`, `cybr` will pick one for you).

```javascript
const { FluidSession, plugins, techniques } = require('fluid-music')
const kit = require('@fluid-music/kit')

// Create a tLibrary filled with Midi Chords
const chordLibrary = {
  a: new techniques.MidiChord({ notes: [60, 63, 67] }),
  b: new techniques.MidiChord({ notes: [60, 63, 65] }),
  c: new techniques.MidiChord({ notes: [55, 62, 65] }),
  d: new techniques.MidiChord({ notes: [55, 60, 63] }),
  e: new techniques.MidiChord({ notes: [55, 58, 60] }),
}

// Instantiate a Podolski VST2 plugin from a preset
const padSynth = plugins.podolskiVst2Presets.brightPad()

const tracks = [
  // In the first example, we specified a tLibrary in the score object. In this
  // example, tLibraries are specified in the tracks object.
  { name: 'drums', gainDb: -6, tLibrary: kit.tLibrary, children: [
    { name: 'snare', gainDb: -3 },
    { name: 'kick' },
    { name: 'tamb', pan: 0.1 },
  ]},

  // Notice the 'chords' track has a .plugins array and a .tLibrary
  { name: 'chords', tLibrary: chordLibrary, plugins: [ padSynth ] },
]

const score = {
  r:      '1 + 2 + 3 + 4 + ', // describe the score rhythm (16th notes)
  snare: ['    s       s   ', '    s       s   '],
  kick:  ['D               ', '          D  D  ', 'D               ', 'd         d  d  '],
  tamb:  ['t t t t t t t t ', 't t t t t t t t ', 't t t t t t t t ', 't t t t t t t t '],
  chords:['a-  b---        ', '            c-  ', 'd---            ', 'e---------------'],
}

// Create a Session, specifying beats-per-minute and track configuration
const session = new FluidSession({ bpm: 96, loopDuration: 4 }, tracks)

// Insert the score object, and export to Reaper
session.insertScore(score)
session.finalize()
session.saveAsReaperFile('beat.RPP')
  .catch(e => console.error('Error:', e))
  .then(() => console.warn('Saved beat.RPP'))
```
