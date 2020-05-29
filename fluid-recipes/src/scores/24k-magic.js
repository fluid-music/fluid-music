#!/usr/bin/env node

const fluid    = require('fluid-music');
const fromMars = require('../fromMars909');

const Bbm = ['Bb4', 'Db5', 'F5', 'Bb5'].map(fluid.converters.valueToMidiNoteNumber);
const Cm  = ['Ab4', 'C5', 'Eb5', 'G5'].map(fluid.converters.valueToMidiNoteNumber);
const Db  = ['Db5', 'F5', 'Ab5'].map(fluid.converters.valueToMidiNoteNumber);
const Fm  = ['F5', 'Ab5', 'C6'].map(fluid.converters.valueToMidiNoteNumber);
const Gb  = ['Gb5', 'Bb5', 'Db6'].map(fluid.converters.valueToMidiNoteNumber);
const Ebm = ['Eb5', 'Gb5', 'Bb5'].map(fluid.converters.valueToMidiNoteNumber);

const rhythm     = '1e+a2e+a3e+a4e+a';
const ramp       = '0-..1-..2-......';
const BbChord    = '0-.0............';
const FmChord    = '3-.3............';
const BbExtChord = '0-.0....4-..5-..';

const build = {
  hat:   'hhhhhhhhhhhh....',
  kick:  'k---k---k---....',
  snare: '............s---',
  tom:   '............T---',
};

const rep = {
  hat:   'o---h-h-h-hhh-h-',
  snare: '....s-......s-..',
  kick:  'k---  k-kk--....',
};

const mid1 = {
  hat:   'h-h-h-hhh-hhh-h-',
  snare: '....s-.....ss-..',
  kick:  'k---...kk---....',
};

const mid2 = {
  hat:   'h-h-h-hhh-hhh-h-',
  snare: '....s-......s-..',
  kick:  'k---...kk---....',
};

const end = {
  hat:  'o-H-....o-H-o-H-',
  kick: 'k---....k-..k---',
};

const chordLibrary = [ Bbm, Cm, Db, Fm, Gb, Ebm ];

const chorus = {
  r: rhythm,
  synth: {
    nLibrary: chordLibrary,
    synth: [
      ramp, FmChord,
      BbChord, FmChord,
      BbChord, FmChord,
      BbExtChord, FmChord
    ],
  },
  drums: {
    nLibrary: fromMars.nLibrary,
    drums: [
      build, rep,
      mid2, rep,
      mid1, rep,
      mid2, rep,
      end
    ],
  }
};

module.exports = {
  chorus,
  chords: chordLibrary,
};
