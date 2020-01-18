#!/usr/bin/env node

const fluid = require('../src/fluidOsc');
const tab = require('../src/tab');
const FluidClient = require('../src/FluidClient');
const path = require('path');

const sessionPath = path.join(__dirname, 'sessions/out.tracktionedit');

const drums909 = require('../recipes/track-drums909');
const drumTrackName = '909';
const drumsMsg = drums909(drumTrackName);

// General MIDI Percussion map defines note 36=bass-drum, 38=snare
// See: http://www.onicos.com/staff/iz/formats/midi-drummap.html
const noteLibrary = { k: 36, h: 42, s: 38, S: 40, c: 49, '🔥': [36, 49], '!': [36, 49]};
const velLibrary = [65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115];
const chordLibrary = [
  ['e4', 'a4', 'b4', 'c#5'],
  ['f4', 'g4', 'a4', 'c5'],
  ['g4', 'a4', 'b4', 'd5'],
];

const rest = {r: 'w', p: '.'};

const r0 = '1+2+3+4+';
const h0 = 'k h h h ';
const c0 = '0 1 2   ';
const p0 = {r: r0, p: h0};

const r1 = '1+2+3+4..';
const h1 = 'k h h hhh';
const c1 = '1 2 0  0 '
const p1 = {r: r1, p: h1};

const r2 = '1+2+3+4....';
const h2 = 'k hhh hhhhh';

const c2 = '1 2 0  0 1 ';
const p2 = {r: r2, p: h2};

const drums = [p0, p1, p2, rest];
const chords = [{ c0, r: r0 }, { c1, r: r1 }, { c2, r:r2 }];

const drumNotes = tab.parse({ noteLibrary, r: r0, drums });
const chordNotes = tab.parse({ noteLibrary: chordLibrary, r: r0, chords });
const durationInQuarterNotes = drumNotes.duration * 4;
const client = new FluidClient(9999);
client.send(drumsMsg);
client.send(fluid.midiclip.create(drumTrackName, 'drums', 0, durationInQuarterNotes, drumNotes));
client.send(fluid.midiclip.create('chords', 'c1', 0, durationInQuarterNotes, chordNotes));
client.send(fluid.audiotrack.select('chords'));
client.send(fluid.plugin.load('4OSC Clinics Unison WMF'));
client.send(fluid.transport.loop(0, durationInQuarterNotes));
client.send(fluid.transport.play());
client.send(fluid.global.save(sessionPath));
