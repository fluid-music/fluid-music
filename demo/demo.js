#!/usr/bin/env node

const path = require('path');
const fluid = require('fluid-music');

// General MIDI Percussion map defines note 36=bass-drum, 38=snare
// See: http://www.onicos.com/staff/iz/formats/midi-drummap.html
const noteLibrary = { k: 36, h: 42, s: 38, S: 40, c: 49, '🔥': [36, 49], '!': [36, 49]};
const velLibrary = [65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115];
const e4 = 64, f4=65, g4=67;
let chordLibrary = [
  ['e4', 'a4', 'b4', 'c#5'],
  ['f4', 'g4', 'a4', 'c5'],
  ['g4', 'a4', 'b4', 'd5'],
];
chordLibrary1 = [
  ['e4', 'a4', 'c#5'],
  ['f4', 'a4', 'c5'],
  ['g4', 'b4', 'd5'],
];

const bassLibrary = chordLibrary.map( a => fluid.converters.valueToMidiNoteNumber(a[0]) - 36);

const rest = {r: 'w', p: '.'};

const r0 = '1+2+3+4+1+2+3+4+';
const h0 = 'k s k h k s k h ';
const c0 = '0 1 22   21';
const p0 = { r: r0, p: h0 };

const r1 = '1+2+3+4..';
const h1 = 'k h h hhh';
const c1 = '         ';
const p1 = {r: r1, p: h1};

const r2 = '1+2+3+4....w';
const h2 = 'k hhh khshkk';

const c2 = '1 2 0 021021';
const p2 = {r: r2, p: h2};

const drums = [p0, p1, p2, rest];
const chords = [{ c0, r: r0 }, { c1, r: r1 }, { c2, r:r2 }];

const drumNotes = fluid.tab.parse({ noteLibrary, r: r0, drums });
const chordNotes = fluid.tab.parse({ noteLibrary: chordLibrary, r: r0, chords });
const bassNotes = fluid.tab.parse({ noteLibrary: bassLibrary, r: r0, chords});
const durationInQuarterNotes = drumNotes.duration * 4;

const client = new fluid.Client(9999);

client.send([
  fluid.audiotrack.select('drums'),
  fluid.midiclip.create('d1', 0, durationInQuarterNotes, drumNotes),
]);

client.send([
  fluid.audiotrack.select('chords'),
  fluid.midiclip.create('c1', 0, durationInQuarterNotes, chordNotes),
  fluid.audiotrack.send('delay', -15),
]);

client.send([
  fluid.audiotrack.select('bass'),
  fluid.midiclip.create('b1', 0, durationInQuarterNotes, bassNotes),
]);

client.send(fluid.transport.loop(0, durationInQuarterNotes));
client.send(fluid.transport.play());
