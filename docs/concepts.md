# Fluid Music Concepts

These concepts underpin the Fluid Music API.

1. [Rhythm String](#rhythm-strings)
1. [Pattern String](#pattern-strings)
1. [Technique (Library)](#technique-library)
1. [Score](#score)
1. [Session](#session)

### Rhythm String

A **Rhythm String** represents a sequence of discrete musical durations. They are best understood with some examples:
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
- `'h34'` represents a half note and two quarter notes. `'h'` always represents a half note, and `'w'` always represents a whole note. Notice that this works a little differently than quarter notes: the duration of a `'1'` symbol may be shortened by the character that follows it (`'1+'` represents two eighth notes, not a quarter *and* an eighth note). While `'w'` and `'h'` my be divided into subdivisions like any other value (`'w...'`), the total duration incurred by `'w'` and `'h'` is never affected by subsequent characters.

### Pattern String

A **Pattern String** represents a sequence of music events. When coupled with a **Rhythm String**, a **Pattern String** describes a sequence of musical events. For example, when coupled with a `'1234'` quarter-note **Rhythm String**:

- `'Ds s'` Describes three quarter-note events: a `D` on the downbeat, and `s` events on beats 2 and 4
- `'Ds.s'` Is identical to the pattern above (`'.'` and `' '` are interchangeable)
- `'a-b-'` Describes two half-note events: an `a` event on the downbeat, and a `b` event on beat 3

There are two things to understand about **Pattern String**
1. Each character in a **Pattern String** invokes a user-defined **Technique** function
2. A **Technique Library** (see below) create a mapping between characters and **Techniques**

### Technique (Libraries)

A **Technique** is any JavaScript object with a `.use` function. For example:

```javascript
const logTechnique = {
  use: (context) => console.log(context)
}
const logTimeTechnique = {
  use: (context) => console.log(context.startTime, context.duration)
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

### Score

A **Score** is a JavaScript object that combines **Rhythm Strings**, **Pattern Strings**, and **Technique Libraries** to describe a portion of a DAW **Session**. A simple example:

```javascript
const score = {
  tLibrary: { a: logTechnique, b: logTimeTechnique },
  r: '1234',
  l: '..b.',
  t: 'a...',
}
```

Some of the keys in a **Score** object have a special meaning. In the example above:

- `tLibrary` tells the score parser to expect a **Technique Library**
- `p` tells the score parser to expect a **Pattern String**

However, the other keys in the score object (`l` and `t`) map to the names of tracks in a DAW **Session**.

### Session

TODO