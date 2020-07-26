# The Architecture of `fluid-music`

How does the `fluid-music` library transform `Note` objects to a full DAW session?

## `Note`, `NoteLibrary`, and `Score` objects
A `Note` object is a representation of an item or items that can be placed on
a timeline in a DAW. The following `Note` examples show an **audio file**, a
**midi chord**, and an **automation point**.

```javascript
// Example `Note` object, which contains an audio sample file
const audioFile = {
    type: 'file', // All Note objects have a .type string
    path: 'a/file.wav',
    fadeInSeconds: 0.01,
    fadeOutSeconds: 0.01,
};

// This is a single `Note` object, describing three-note midi chord
const chord = {
    type: "midiChord", // All Note objects have a .type string
    name: "Cm",
    notes: [ 60, 63, 67 ],
};

// This `Note` object describes a plugin automation point
const automationPoint =  {
    type: 'auto', // All note objects have a .type string
    plugin: {     // identifies a plugin on an arbitrary track
        name: 'DragonflyRoomReverb-vst',
        type: 'VST', // 'VST', 'VST3', 'AudioUnit'
    },
    param: {
        name: 'Early Send',    // Parameter's name as reported by the plugin
        units: 'percent',
        normalize: (v)=>v/100, // The plugin GUI measures this parameter in
                               // percent. The normalize function transforms
                               // a percent into a value between 0 and 1.
    },
    value: 80, // param.units indicates value's unit type
};

```

`Note` objects usually start out in a `NoteLibrary`, which is just an object in which all keys have only one character like `"a"`,  `"b"`, `"0"`, or `"1"`.

```javascript
const nLibrary = {
    "a": audioFile,
    "c": chord,
    "p": automationPoint,
};
```

We'll now follow the transformation of a `Note` object as it passes through a
typical workflow. Starting from the `nLibrary` and ending with a `fluidMessage`.

## `Score` Objects and Score Parsing

This score object below describes a single clip of with a length of 4 quarter notes. It references two distinct `Note` events, which will eventually be inserted onto a track named `"rev"`:
1. A three note MIDI chord, `c` on the down beat, which single quarter note duration.
1. An automation point, `p`, on the third quarter note.

```javascript
const score = {
    r:   '1234', // Quarter note rhythm string represents four quarter notes
    rev: 'c p ', // Pattern string creates a clip on the 'rev' track, inserting:
                 //   - A chord on beat one
                 //   - An automation point on beat three
};
```

Create a `Session` object by passing the `score` object `fluid.score.parse`.

```javascript
const session = fluid.score.parse(score, {nLibrary});
```


### 1. Create `ClipEvent` objects from `Note` objects.

Internally, the `fluid.score.parse` method calls `parseTab` on our rhythm and pattern strings which creates `ClipEvent` objects.

```javascript
const events = [
    {
        s: 0,    // start time within the clip, measured in whole notes
        l: 0.25, // length of the event in the clip, measured in whole notes
        n: { type: 'midiChord', name: 'Cm', notes: [60, 63, 67] },
    },
    {
        s: 0.5,  // start time within the clip, measured in whole notes
        l: 0.25, // length of the event in the clip, measured in whole notes
        n: { type: 'auto', /* contents omitted for brevity */ },
    },
];
```

Notice that `Note` Objects do not have a timing information -- they do not describe *where* notes should be positioned on the timeline in our DAW. `ClipEvents`, wrap around `Note` objects, adding the timing information extracted from the `Score`.

### 2. Create intermediary `Clip` objects

For each pattern string in the score (ex. `'c p '`), `fluid.score.parse` creates a `Clip` object. Initially, the clips look like this:

```javascript
const intermediaryClip = {
    startTime: 0, // start time within the session, measured in whole notes
    duration: 1,  // length of the clip, measured in whole notes
    events: [ /* contains the events objects shown above */ ],
}
```

The parser recurses over the score, and creates intermediary `Clip` objects (like the one above) for each `Note` pattern string.

### 3. `eventMapper` mutators

After creating intermediary clips for each note pattern string, `fluid.score.parse` passes all `ClipEvents` through a series of `eventMapper` functions that mutate the contents of the clip.

It is not necessary to memorize the structure of the object below, but it will be helpful to study how the `Clip` object in the `.clips` array in the example below was mutated from the `intermediaryClip` above. For example, an `eventMapper` function was responsible for converting the `midiChord` to `midiNote` objects, and moving those `midiNote` objects to the from the `.events` array to the `.midiEvents` array.

```javascript
const session = {
    tracks: {
        rev: {
            name: 'rev',
            clips: [
                // eventMappers mutated the intermediaryClip to create this one
                {
                    startTime: 0, // clip start time, measured in whole notes
                    duration: 1,  // clip length, measured in whole notes

                    // eventMapper functions converted the midiChord to midiNotes
                    midiEvents: [
                        { s: 0, l: 0.25, n: {n: 60, type: 'midiNote'} },
                        { s: 0, l: 0.25, n: {n: 63, type: 'midiNote'} },
                        { s: 0, l: 0.25, n: {n: 67, type: 'midiNote'} },
                    ],

                    // eventMapper functions handled all events from the
                    // intermediary clip, leaving the .events array empty
                    events: [],
                },
            ],
            // eventMapper functions moved the automation points below
            plugins: [{
                name: 'DragonflyRoomReverb-vst',
                type: 'VST',
                automation: {
                    "Early Send": {
                        points: [ { startTime: 0.5, normalizedValue:0.8 } ],
                    },
                },
            }],
        },
    },
};
```

The power of `fluid-music` comes from designing custom types of `Note` objects, and creating custom `eventMapper` functions to handle those `Note` objects. You can see in the example above, that `eventMapper` functions are very powerful. A single `Note` object in a script can have impact on the entire session.

## Convert the `tracks` to a fluid message

Finally, the `tracksToFluidMessage` function converts the `tracks` object above to a `FluidMessage` object that can be sent to the `cybr` server.

`tracksToFluidMessage` is relatively simple. It just iterates over all the tracks, clips, and plugins, creating messages for all of them.

```javascript
const client = new fluid.Client();
const msg    = fluid.score.tracksToFluidMessage(session.tracks);
client.send(msg);
```
