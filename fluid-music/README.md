# Fluid Music

Extensible Music Composition and Music Production Framework for [Node](https://nodejs.org).

```javascript
// Two measures of snare, kick, and tambourine transcribed with 'fluid-music'
const score = {
  r:      '1 + 2 + 3 + 4 + ',
  snare: ['    s       s   ', '    s       s   '],
  kick:  ['D               ', '          D  D  '],
  tamb:  ['t t t t t t t t ', 't t t t t t t t '],
}
```

Fluid music converts JavaScript score objects (above) to:

- realtime audio
- `.wav` audio files
- `.tracktionedit` files for [Tracktion Waveform](https://www.tracktion.com/products/waveform-pro)
- `.rpp` files for [Reaper](https://reaper.fm) (below)

![Reaper DAW Example](https://user-images.githubusercontent.com/1512520/102311683-4baa3b80-3f3b-11eb-87d1-85f4909afb0a.png)

Fluid Music is:
- **Extensible:** Author reusable sound design techniques in JavaScript, and use them in your scores
- **Open:** Publish and reuse sound design techniques with [npm](https://npmjs.com)

Fluid Music scores can:
- Sequence and edit audio files (trim, fade, move, reverse)
- Insert MIDI notes and clips
- Support unusual time signatures and rhythms (go beyond 4/4!)
- Set and automate VST plugin parameters
- Set and automate track parameters (ex. volume, panning)
- Modify the underlying session (add tracks, routing, grouping, side chaining, etc)
- Insert random or procedurally generated content
- Do anything you can code

## Stability

The Fluid Music API is **not yet stable**. However, it has been through several
iterations, and there will **not be major changes** prior to version `1.0`.

## Learn More

- **[Closed Beta Test](https://web.media.mit.edu/~holbrow/project/fluid-music-beta/)**
- [Getting Started Guide](https://github.com/CharlesHolbrow/fluid-music/blob/main/docs/getting-started.md)
- [Fluid Music Concepts](https://github.com/CharlesHolbrow/fluid-music/blob/main/docs/concepts.md)
- [API Documentation](https://fluid-music.github.io/modules.html)
- [About](https://github.com/CharlesHolbrow/fluid-music/blob/main/docs/about.md)

## Goals

Fluid Music aims to be:
- *Useful* for creating music that people care about
- *Welcoming* to developers with a wide variety of backgrounds

However, the `fluid-music` library is currently in beta. While the core is well tested and reasonably robust, it still has some sharp edges. See [About Fluid Music](https://github.com/CharlesHolbrow/fluid-music/blob/main/docs/about.md) and [Useful, Welcoming Software](https://web.media.mit.edu/~holbrow/post/useful-welcoming-software/) for more details.
