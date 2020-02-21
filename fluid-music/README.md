# fluid-music

A node.js client for the Fluid Engine.

```JavaScript
const path  = require('path');
const fluid = require('fluid-music');

// Setup some IO filenames
const document = path.join(__dirname, 'test.tracktionedit');
const vox      = path.join(__dirname, 'vox.wav'); // replace with your input file
const voxVerb  = path.join(__dirname, 'vox-verb.wav');

const client = new Client(9999);
client.send([
  fluid.global.activate(document, true),
  fluid.audiotrack.select('vox'),                   // Create and select a track named 'vox'
  fluid.audiotrack.insertWav('vox-sample', 0, vox), // Insert and select audio clip in selected track
  fluid.audioclip.fadeInOutSeconds(0.01, 0.5),      // 10ms fade in, 500ms fade out
  fluid.clip.length(1),                             // Trim the audio clip to one second
  fluid.plugin.select('eos', 'vst'),                // Insert the eos vst reverb plugin
  fluid.clip.render(voxVerb, 4),                    // Render the selected clip with 4 second "tail"
  fluid.audiotrack.select('reversed'),              // Create and select a track named "reversed"
  fluid.audiotrack.insertWav('r1', 0, voxVerb),     // Insert and select the newly rendered audio
  fluid.audioclip.reverse(),                        // reverse the selected clip
  fluid.global.save(),                              // Save document (session) file
  fluid.transport.play(),
]);
```

More examples...

```JavaScript
// Render a .wav file
client.send(fluid.global.save('~/demo-song.wav'));

// Start Playback from the beginning
client.send([
  fluid.transport.to(0),
  fluid.transport.play(),
]);
```

## Fluid Client Methods

See [docs/fluid.md](./docs/fluid.md) for detailed info.

Many client methods are available, including the ones below:

```JavaScript
// audiotrack:
fluid.audiotrack.select(...)
fluid.audiotrack.insertWav(...)
fluid.audiotrack.selectReturnTrack(...)
fluid.audiotrack.send(...)
fluid.audiotrack.mute(...)
fluid.audiotrack.unmute(...)
fluid.audiotrack.gain(...)
fluid.audiotrack.renderRegion(...)
fluid.audiotrack.removeClips(...)

// clip:
fluid.clip.render(...)
fluid.clip.select(...)
fluid.clip.length(...)
fluid.clip.trimSeconds(...)
fluid.clip.setSourceOffsetSeconds(...)

// audioclip:
fluid.audioclip.reverse(...)
fluid.audioclip.fadeInOutSeconds(...)
fluid.audioclip.fadeIn(...)
fluid.audioclip.fadeOut(...)
fluid.audioclip.gain(...)

// midiclip:
fluid.midiclip.clear(...)
fluid.midiclip.select(...)
fluid.midiclip.note(...)
fluid.midiclip.create(...)

// global:
fluid.global.save(...)
fluid.global.cd(...)
fluid.global.activate(...)

// plugin:
fluid.plugin.select(...)
fluid.plugin.setParamNormalized(...)
fluid.plugin.setParamExplicit(...)
fluid.plugin.setParamNormalizedAt(...)
fluid.plugin.setParamExplicitAt(...)
fluid.plugin.setSideChainInput(...)
fluid.plugin.save(...)
fluid.plugin.load(...)
fluid.plugin.loadTrkpreset(...)
fluid.plugin.addpath(...)

// sampler:
fluid.sampler.add(...)
fluid.sampler.clearAll(...)

// transport:
fluid.transport.play(...)
fluid.transport.stop(...)
fluid.transport.loop(...)
fluid.transport.to(...)

// groove:
fluid.groove.applyGroove(...)
```

## Fluid Music Tablature

Fluid music comes with a simple but powerful music notation system built on JSON style objects.

JavaScript objects containing strings, arrays, and numbers represent musical sequences like melodies, rhythmic patterns, and chord progressions.

```javascript
const fluid = require('fluid-music');

// Define a rhythm.
// The sixteen characters in the `r` string represent one measure of 16th notes
const r   = '1 + 2 + 3 + 4 + '; // main rhythm

// Define some simple beat patterns that use the rhythm string above
const h   = '  h   h   h   h '; // hi-hat only
const ks0 = 'k . s . . . s k '; // kick/snare patterns
const ks1 = 'k . s . . .k. k ';
const ks2 = 'k . sk. . . . k ';
const ks3 = 'k . s . . . . . ';

// Define a mapping of single character strings to MIDI notes.
// This maps the characters in the beat strings above to midi notes.
// General MIDI Percussion map: 36=bass-drum, 38=snare, 49=crash
const noteLibrary = { k: 36, h: 42, s: 38, S: 40, c: 49, '🔥': [36, 49] };

// Parse a *rhythm*, *pattern*, and *noteLibrary* to create an array of *Note Objects*.
const hhNotes = fluid.tab.parseTab(r, h,   noteLibrary);
const ksNotes = fluid.tab.parseTab(r, ks0, noteLibrary);
```

The power of the tablature system comes from `fluid.parse(...)` which processes deeply nested JavaScript objects containing complex combinations and sequences of **pattern**, **rhythm**, and **notelibrary** objects.

```JavaScript
const p0 = { h, ks0 }; // kick/snare/hat patterns
const p1 = { h, ks1 };
const p2 = { h, ks2 };
const p3 = { h, ks3 };
const cr = { r: 'h', p: '🔥'};  // kick/crash on down beat ('h' rhythm is a half note)

const notes = fluid.tab.parse({
  noteLibrary, r,
  p: [            // Use Arrays to create sequences
    {p0, cr}, p0, // Use Objects to create layers
    p1, p1,
    p2, p2,
    p3, p3,
    { r:'1234..', p: '...sss',   b: { r, h: 'h h h h h h h . ', ks3 } }, // triplet snare on beat 4
    { r: 'h3e+a4e+a', p: '...ssssss', cr }, // drum roll of six 16th notes
  ],

// Create a midi in the currently active edit
client.send([
  // select 'drums' track, creating it if necessary
  fluid.audiotrack.select('drums'),
  // create a midi clip named 'dp1' 16 quarter notes long.
  // Insert the clip at the beginning of the selected track.
  fluid.midiclip.create('dp1', 0, 16, notes),
});
```

For details, see the the [tests](./test/test-tab.js) and the `fluid.tab` data types below:

### Rhythm

A `rhythm` is a string that encodes a sequence of durations. Examples:
- `'1234'` has four characters, and represents a sequence of four quarter notes
- `'w'` is one character, and represents a single `w`hole note
- `'hh'` has two characters, and represents a sequency of two `h`alf notes
- `'h h '` represents a sequence of four quarter notes (spaces may subdivide beats)
- `'h.h.'` is equivalent to `'h h '` (dots may subdivide beats)
- `'1..2..'` has 6 characters, and represents six eighth note triplets
- `'1+2+3+4+'` is eight characters, and represents eight consecutive 8th notes
- `'1 2 3 4 '`is identical to `'1+2+3+4+'`
- `'1 + 2 + '` is eight characters and represents eight consecutive 16th notes
- `'1e+a2e+a'` is identical to `'1 + 2 + '`
- `'1....'` represents five quintuplets (any number of subdivision are possible)
- `'h34'` represents a half note and two quarter notes. `'h'` always represents a half note, and `'w'` always represents a whole note. Notice that this works a little differently than quarter notes: the duration of a `'1'` symbol may be diminished by a character that follows it (`'1+'` represents two eighth notes, not a quarter *and* an eighth note). While `'w'` and `'h'` my be divided into subdivisions like any other value (`'w...'`), the total duration incurred by `'w'` and `'h'` is never affected by subsequent characters.

### Advances

`advances` is an array of numbers, with each element representing a single character in a `rhythm` string. It an intermediary form used internally. Consumers probably want to use `deltas` instead.
- `[.5, 0, .5, .0]` is an `advances` array derived from `'h h '`

### Deltas

`deltas` is an array of numbers, each representing the contribution of a single character in a `rhythm` string.
- `[0.25, 0.25, 0.25 0.25]` is an `deltas` array derived from `'h h '`

### Totals

`totals` is an array of durations elapsed at the end of each segment
- `[.25, .5,  .75, 1]` is a sequence of quarter notes derived from `'h h '`

### Rhythm Object

`parseRhythm(rhythm)` returns a rhythm object for a given `rhythm` string. A rhythm object has `.deltas` and `.totals` members.

```javascript
const rObj = parseRhythm('h h ');
rObj.should.deepEqual({
  deltas: [.25, .25, .25, .25],
  totals: [.25, .50, .75, 1.0],
});
```

### Note Objects
Note objects have a the following members:
- `.n`ote number (midi note number)
- `.l`ength in whole notes
- `.s`tart time in whole notes
- `.v`elocity (optional midi velocity)

### Rhythmic Data Type Equivalency
The following are all equivalent:
- A `'h h '` rhythm
- A `[.50, .00, .50, .00]` advances array
- A `[.25, .25, .25, .25]` deltas array
- A `[.25, .50, .75, 1.0]` totals array

### Durations measured in Whole Notes (except in OSC messages)

Where possible, I measure durations in whole notes. This means that an eighth note is `1/8` === `0.125`, which I find easier than measuring in quarter notes or seconds.

The exception is in OSC messages. In OSC messages, durations are measure in quarter notes.

- Most OSC libraries do not support double precision, and this allows for higher accuracy timing
- Tracktion tends to measure things in seconds, but Midi notes are saved in `beats`, which typically means quarter notes.
