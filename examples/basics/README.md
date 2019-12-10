# Data Types

## Rhythm

A `rhythm` is a string that encodes a sequence of durations. Example:
- `'1234'` has 4 characters, and represents a sequence of four quarter notes
- `'h h '` is 4 characters, and represents a sequence of four quarter notes (`h` for half note)
- `'w'` is one character, and represents a `w`hole note ()
- `'1+2+3+4+'` is eight characters, and represents a sequence of eight 8th notes
- `'1 2 3 4 '`is identical to `'1+2+3+4+'`
- `'1 + 2 + '` is eight characters and represents eight 16th notes. 
- `'1e+a2e+a'` is identical to `'1 + 2 + '`
- `'1..2..'` has 6 characters, and represents six eighth note triplets
- `'1  2  '` spaces may be used instead of dots to subdivide beats
- `'1....'` represents five quintuplets (any number of subdivision are possible)

## Advances

`advances` is an array of numbers, with each element representing a single character in a `rhythm` string. It an intermediary form used internally. Consumers probably want to use `deltas` instead.
- `[.5, 0, .5, .0]` is an `advances` array derived from `'h h '`

## Deltas

`deltas` is an array of numbers, each representing the contribution of a single character in a `rhythm string.
- `[0.25, 0.25, 0.25 0.25]` is an `deltas` array derived from `'

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

## Data Type Equivalency
The following are all equivalent:
- A `'h h '` rhythm
- A `[.50, .00, .50, .00]` advances array 
- A `[.25, .25, .25, .25]` deltas array
- A `[.25, .50, .75, 1.0]` totals array

