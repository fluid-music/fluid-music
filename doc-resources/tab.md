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
  r: 'h h ',
});
```

### Rhythmic Data Type Equivalency
The following are all equivalent:
- A `'h h '` rhythm string
- A `[.50, .00, .50, .00]` advances array
- A `[.25, .25, .25, .25]` deltas array
- A `[.25, .50, .75, 1.0]` totals array

### Durations measured in Whole Notes

Where possible, I measure durations in whole notes. This means that an eighth note is `1/8` === `0.125`, which I find easier than measuring in quarter notes or seconds.