# Data Types

## Rhythm

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

## Advances

`advances` is an array of numbers, with each element representing a single character in a `rhythm` string. It an intermediary form used internally. Consumers probably want to use `deltas` instead.
- `[.5, 0, .5, .0]` is an `advances` array derived from `'h h '`

## Deltas

`deltas` is an array of numbers, each representing the contribution of a single character in a `rhythm` string.
- `[0.25, 0.25, 0.25 0.25]` is an `deltas` array derived from `'h h '`

## Totals

`totals` is an array of durations elapsed at the end of each segment
- `[.25, .5,  .75, 1]` is a sequence of quarter notes derived from `'h h '`

## Rhythm Object

`parseRhythm(rhythm)` returns a rhythm object for a given `rhythm` string. A rhythm object has `.deltas` and `.totals` members.

```javascript
const rObj = parseRhythm('h h ');
rObj.should.deepEqual({
  deltas: [.25, .25, .25, .25],
  totals: [.25, .50, .75, 1.0],
});
```

## Note Objects
Note objects have a the following members:
- `.n`ote number (midi note number)
- `.l`ength in whole notes
- `.s`tart time in whole notes
- `.v`elocity (optional midi velocity)

## Rhythmic Data Type Equivalency
The following are all equivalent:
- A `'h h '` rhythm
- A `[.50, .00, .50, .00]` advances array
- A `[.25, .25, .25, .25]` deltas array
- A `[.25, .50, .75, 1.0]` totals array

# Durations measured in Whole Notes (except in OSC messages)

Where possible, I measure durations in whole notes. This means that an eighth note is `1/8` === `0.125`, which I find easier than measuring in quarter notes or seconds.

The exception is in OSC messages. In OSC messages, durations are measure in quarter notes.

- Most OSC libraries do not support double precision, and this allows for higher accuracy timing
- Tracktion tends to measure things in seconds, but Midi notes are saved in `beats`, which typically means quarter notes.
