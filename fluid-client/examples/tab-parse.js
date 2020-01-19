#!/usr/bin/env node

const tab = require('../src/tab');
const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');

const drums909 = require('../recipes/track-drums909');
const drumTrackName = '909';
const drumsMsg = drums909(drumTrackName);
const repeat = (v, times) => [].concat(...new Array(times).fill((!Array.isArray(v)) ? [v] : v));

// General MIDI Percussion map defines note 36=bass-drum, 38=snare
// See: http://www.onicos.com/staff/iz/formats/midi-drummap.html
const noteLibrary = { k: 36, h: 42, s: 38, S: 40, c: 49, '🔥': [36, 49] };

const r   = '1 + 2 + 3 + 4 + '; // main rhythm
const h   = '  h   h   h   h '; // hi-hat only

const ks0 = 'k . s . . . s k '; // kick/snare patterns
const ks1 = 'k . s . . .k. k ';
const ks2 = 'k . sk. . . . k ';
const ks3 = 'k . s . . . . . ';

const p0 = { h, ks0 };          // kick/snare/hat patterns
const p1 = { h, ks1 };
const p2 = { h, ks2 };
const p3 = { h, ks3 };
const cr = { r: 'h', p: '🔥'};  // kick/crash on down beat ('h' rhythm is a half note)

const notes = tab.parse({
  noteLibrary, r,
  p: [
    {p0, cr}, p0,
    p1, p1,
    p2, p2,
    p3, p3,
    { r:'1234..', p: '...sss',   b: { r, h: 'h h h h h h h . ', ks3 } }, // triplet snare on beat 4
    { r: 'h3e+a4e+a', p: '...ssssss', cr }, // drum roll of six 16th notes
  ],
});

const durationInQuarterNotes = notes.duration * 4;
const client = new FluidClient(9999);
client.send([...drumsMsg,
            fluid.midiclip.create('drums', 0, durationInQuarterNotes, notes),
            fluid.transport.loop(0, durationInQuarterNotes),
            fluid.transport.play(),
]);

