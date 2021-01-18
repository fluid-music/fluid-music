# Getting Started

In this practical guide, we'll create a brief composition using the `fluid-music` npm library.

**NOTE:** This "Getting Started" guide aims to be concise. It also obscures the power and flexibility of Fluid Music. For a deeper understanding, read [Fluid Music Concepts](https://github.com/CharlesHolbrow/fluid-music/blob/main/docs/concepts.md) first.

**NOTE:** This guide shows Fluid Music working with external (free) audio software. You can install these as-needed, or you can install them all upfront:

- **Reaper:** (digital audio workstation). You can [download and install Reaper](https://reaper.fm) for free. If you use Reaper in the long term, I recommend purchasing a $60 personal license. Don't be fooled by the low price tag – in many ways, Reaper is more powerful than other DAWs that are more expensive by an order of magnitude. **You don't need Reaper to use `fluid-music` but it is very helpful for inspecting your sessions.**
- The **`fluid`** CLI program: Install this via NPM using this command: `npm install -g fluid-music`
- The excellent free **Podolski** VST Synthesizer. You can [download and install Podolski](https://u-he.com/products/podolski/) from the U-He website.

## 1. A Simple Session

To get started, we'll create a simple rhythm pattern, import some drum samples, and open the resulting session in Reaper.

Create a new directory with the `mkdir` terminal command, and initialize a `package.json` file, which identifies the directory as an `npm` package. I named the package `fluid-experiment` (you can choose any name you like).

```bash
mkdir fluid-experiment
cd fluid-experiment
npm init # (answer the prompts to create package.json)
```

After initializing package.json (above), install the `fluid-music` and `@fluid-music/kit` npm libraries (below).

```
npm i fluid-music @fluid-music/kit
```

Download or copy [`beat.js`](https://raw.githubusercontent.com/CharlesHolbrow/fluid-music/main/demo-getting-started/beat.js) into the new directory. It looks like this:

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

Run `beat.js`. From the terminal, enter:

```bash
node beat.js
```

Open `beat.RPP` in Reaper. It should look like this:

<img width="1081" alt="Reaper GUI containing beat.RPP" src="https://user-images.githubusercontent.com/1512520/104825156-32402c00-5826-11eb-81b4-d8a15653f7a1.png">

Congratulations, you just created your first Fluid Music project.

## 2. The Fluid Music Server (`cybr`)

So far, Fluid Music is only manipulating audio metadata. You haven't used any of the audio features. The Fluid Music framework can play audio, render audio files, and host and configure VST plugins. However, to take advantage of these features you need to run an instance of the Fluid Music server on your machine. This server is named `cybr`. Unlike the node library, which is written in TypeScript, `cybr` is written in C++, and it handles all the audio processing for Fluid Music.

- The `cybr` server is not bundled with the `fluid-music` npm package. You need to install and run it independently.
- You can compile the Fluid Music server using the code in the [fluid-music/server directory](https://github.com/CharlesHolbrow/fluid-music/tree/main/server)
- This guide assumes you added the `cybr` executable to your `PATH` so you can run it from the command like with with `$ cybr -f`. [What is the `PATH` variable?](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them)
    - The **MacOS** `.pkg` installer puts `cybr` in `/usr/local/bin/`.
    - On most **Linux** systems, `/usr/local/bin/` is also a good place to put the `cybr` executable.
    - On **Windows** there are several options. I used a technique from [this StackOverflow answer](https://stackoverflow.com/a/44593425/702912).
- To compile with VST support, you need to have access to the VST2 SDK. *Steinberg Media Technologies GmbH*, the company that created the VST2 SDK, is making it increasingly difficult to access the VST2 SDK. If you do not have access to the VST2 SDK, you can compile without VST2 support.
- VST3 plugins are not yet supported. Most of the work for supporting VST3s is complete. It will not be fully supported until after I graduate (Summer 2021).

To verify that `cybr` is installed, run the following help command in your terminal:

```bash
cybr -h
```

This should output a list of possible cybr command line arguments. If you get a `command not found` error, make sure that the `cybr` executable is the correct file for your operating system, and that it can be found in one of the directories in your `PATH`.

Let's setup `cybr` to play our session directly so we don't have to open it in a DAW. First, let's identify available audio hardware on our system with the `--list-io` flag.

```bash
cybr --list-io
```

This will output all the available audio, midi, and virtual interfaces. On my MacOS system, I am looking for `CoreAudio` devices, which look like this:

```
Devices By Type (juce::AudioIODeviceType):
...
CoreAudio
  - External Headphones
  - MacBook Pro Speakers
  - ZoomAudioDevice
  - samson/headphones
...
```

Note that `--list-io` output will look different depending on your OS version and connected audio hardware. I want `cybr` to play audio from the headphone jack on my MacBook laptop, so I'll run the server like this:

```bash
cybr --device-out="External Headphones" -f
```

Notice the `-f` flag, which is shorthand for `--fluid-server`. This flag tells `cybr` to listen for connections and requests from the `fluid-music` npm package. With the server running, let's send our session from the previous example to the server and then ask the server to play it.

Replace the last three lines of `beat.js` with the following:

```javascript
session.sendToServer()
  .catch(e => console.error('Error:', e))
  .then(() => console.warn('Sent session to cybr'))
```

Leave the server running, and open a new terminal tab. Run the session script again (`$ node beat.js`). This will load the session in the server, but does not begin playback. We will use the `fluid` command line utility to play back audio. First, use `npm` to install `fluid-music` globally, which adds the `fluid` command to your `PATH`. If you ever want to uninstall, replace `install` with `uninstall` in the command below.

```bash
npm install -g fluid-music
```

Now you can use the following `fluid` commands in your terminal to start and stop playback or render a `.wav` file.

```bash
fluid play  # Start playback
fluid to 0  # Restart playback from the beginning
fluid stop  # Stop (Pause)
fluid render beat.wav # render a .wav file (offline)
```

## 3. VST Plugins

Let's create a session with a VST plugin. In this example, we'll use the excellent (free) Podolski VST2 plugin. [Download and install Podolski](https://u-he.com/products/podolski/) before proceeding. It's best to install plugins in the default location so that `cybr` knows where to find them.

The `cybr` server needs to scan for plugins before it can load them. Switch back to your terminal tab that is running the server, and use `ctrl+c` to stop the server. Use the `cybr --scan-plugins` command to search your machine for plugins. If one of your plugins crashes, it will be skipped on subsequent scans, so you may need to scan more than once if `cybr` encounters unstable plugins.

Once you have finished scanning, use the `cybr --list-plugins` to verify the `Podolski` plugin was found.

```bash
# Some useful cybr commands
cybr --scan-plugins          # Scan for plugins, adding them to the settings file
cybr --list-plugins          # List available plugins
cybr --print-config-filename # Print the complete settings filename.
```

Re-open reaper (when Reaper opens, it will scan for new plugins, finding the newly installed Podolski plugin in the process). Go back to your terminal, and restart `cybr -f`, specifying `--device-out="Some Device"` if needed. If you do not specify a `--device-out`, `cybr` will pick one for you.

Create a new file in the same directory that contains `beat.js`. Name the new file `session.js`, and copy in the contents below:

Create download or copy [`session.js`](https://raw.githubusercontent.com/CharlesHolbrow/fluid-music/main/demo-getting-started/session.js) into the new directory adjacent to `beat.js`. The new `session.js` file will look like this:

```javascript
const { FluidSession, plugins, techniques } = require('fluid-music')
const kit = require('@fluid-music/kit')

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
// padSynthB.parameters.vcf0Cutoff = 0

const tracks = [
  // In the first example, we specified a tLibrary in the score object. In this
  // example, tLibrary objects are specified in the tracks object.
  { name: 'drums', gainDb: -6, tLibrary: kit.tLibrary, children: [
    { name: 'snare', gainDb: -3 },
    { name: 'kick' },
    { name: 'tamb', pan: 0.1 },
  ]},

  // Notice the pad tracks have a .plugins array containing the synthesizer
  // preset. It also has a dedicated tLibrary containing MIDI chords.
  { name: 'padA', tLibrary: chordLibrary, plugins: [ padSynthA ] },
  { name: 'padB', tLibrary: chordLibrary, plugins: [ padSynthB ] },
]

const score = {
  r:      '1 + 2 + 3 + 4 + ', // describe the score rhythm (16th notes)
  snare: ['    s       s   ', '    s       s   '],
  kick:  ['D               ', '          D  D  ', 'D               ', 'd         d  d  '],
  tamb:  ['t t t t t t t t ', 't t t t t t t t ', 't t t t t t t t ', 't t t t t t t t '],
  padA:  ['a-  b---        ', '            c-  ', 'd---            ', '                '],
  padB:  ['                ', '                ', '                ', 'e---------------'],
}

// Create a Session, specifying beats-per-minute and track configuration
const session = new FluidSession({ bpm: 96, loopDuration: 4 }, tracks)

// Insert the score object.
session.insertScore(score)
session.finalize()
session.saveAsReaperFile('session.RPP')
  .catch(e => console.error('Error:', e))
  .then(() => console.warn('Saved session.RPP'))
```

This version of `session.js` includes some features we haven't seen before. The first is the `MidiChord` technique:

```javascript
// Create a tLibrary filled with MIDI Chords
const chordLibrary = {
  a: new techniques.MidiChord({ notes: [64, 67, 71] }), // e minor
  b: new techniques.MidiChord({ notes: [64, 67, 69] }),
  c: new techniques.MidiChord({ notes: [59, 66, 69] }),
  d: new techniques.MidiChord({ notes: [59, 64, 67] }),
  e: new techniques.MidiChord({ notes: [59, 62, 64] }),
}
```

Many `fluid-music` techniques are implemented as classes with a `.use(context)` method (see the [MidiChord source code](https://github.com/CharlesHolbrow/fluid-music/blob/ec73a3fc40c1c751f866e9322a37d269091935dd/fluid-music/src/techniques/basic.ts#L178-L193)). This means that we can use the familiar `new` keyword to create objects that have a `.use` function. As we described in [Fluid Music Concepts](https://github.com/CharlesHolbrow/fluid-music/blob/main/docs/concepts.md#technique-library), objects with a `.use` method are valid techniques, and may be used in a `tLibrary` object.

Notice how the `chordLibrary` object is specified as the default `tLibrary` for the `padA` track on line 28. When you call `.insertScore`, and the score parser encounters a character (like `a` or `b`) it will first look in the `score` object for a matching technique, before searching the track `tLibrary`. Finally it checks if the underlying `session` has a tLibrary containing the character. The score parser will throw an error if it cannot find a technique with the specified character, so make sure that your score objects only include characters that you have in your technique libraries.

Another new feature in the score above is the Podolski VST plugin instance. Take a quick look at the
[Podolski preset source code](https://github.com/CharlesHolbrow/fluid-music/blob/main/fluid-music/src/plugin-adapters/podolski-vst2-presets.ts) to see how these plugins are instantiated. You can create your own presets the same way, but for now, let's just modify the `padB` plugin preset. We will decrease the filter cutoff frequency to create a "dark" pad sound. Uncomment line 16 (`padSynthB.parameters.vcf0Cutoff = 0`) so that lines 13-16 look like this:

```javascript
// Instantiate a Podolski VST2 plugin from a preset
const padSynthA = plugins.podolskiVst2Presets.brightPad()
const padSynthB = plugins.podolskiVst2Presets.brightPad()
padSynthB.parameters.vcf0Cutoff = 0
```

If you are using a code editor with TypeScript integration (like [VS Code](https://code.visualstudio.com/)) and you have installed `fluid-music` correctly, when you begin typing `padSynthB.parameters.cutoff` you will see a list of suggested parameter values:

<img width="971" alt="VS Code syntax completion support" src="https://user-images.githubusercontent.com/1512520/104821154-f4340f80-5807-11eb-80a3-134b4585ffc2.png">

The image above shows that somehow our code editor knows the `vcf0Cutoff` parameter has a value between `0` and `150`. This is because the Fluid Music tooling generates TypeScript definitions from VST plugins. What are the units of this `vcf0Cutoff` value? The units are determined by the Podolski VST plugin. While many VST plugins would describe a cutoff frequency in Hertz, Podolski uses arbitrary units. Note that the preset that we are using modulates the cutoff frequency with an envelope. Even though the filter is set to `0` the actual cutoff frequency will be well above `0`.

Let's listen to the results. Run the updated session with `$ node session.js`, and open up the resulting `session.RPP` file in Reaper. If `session.RPP` is already open in Reaper, you will need to close and re-open it.

## 4. Routing Sends and Sidechains

**To do**
