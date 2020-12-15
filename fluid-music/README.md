# fluid-music


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
const nLibrary = { k: 36, h: 42, s: 38, S: 40, c: 49, '🔥': [36, 49] };

// Parse a *rhythm*, *pattern*, and *nLibrary* to create an array of *Note Objects*.
const hhNotes = fluid.tab.parseTab(r, h,   nLibrary);
const ksNotes = fluid.tab.parseTab(r, ks0, nLibrary);
```

The power of the tablature system comes from `FluidSession.insertScore(...)` which processes deeply nested JavaScript objects containing complex combinations and sequences of **pattern**, **rhythm**, and **nLibrary** objects.

```JavaScript
const p0 = { h, ks0 }; // kick/snare/hat patterns
const p1 = { h, ks1 };
const p2 = { h, ks2 };
const p3 = { h, ks3 };
const cr = { r: 'h', p: '🔥'};  // kick/crash on down beat ('h' rhythm is a half note)

const notes = fluid.tab.parse({
  nLibrary, r,
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
- `'1..2..'` has 6 characters, and represents six eighth-note triplets
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

### Rhythmic Data Type Equivalency
The following are all equivalent:
- A `'h h '` rhythm
- A `[.50, .00, .50, .00]` advances array
- A `[.25, .25, .25, .25]` deltas array
- A `[.25, .50, .75, 1.0]` totals array

### Durations measured in Whole Notes

Where possible, I measure durations in whole notes. This means that an eighth note is `1/8` === `0.125`, which I find easier than measuring in quarter notes or seconds.
