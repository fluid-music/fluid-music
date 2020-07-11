#!/usr/bin/env node
const path    = require('path');
const fluid   = require('fluid-music');
const recipes = require('../src');

// General MIDI Percussion map defines note 36=bass-drum, 38=snare
// See: http://www.onicos.com/staff/iz/formats/midi-drummap.html
const nLibrary    = { k: 36, h: 42, s: 38, S: 40, c: 49, '🔥': [36, 49] };
const dLibrary    = [10,40,80,120];
const sessionPath = path.join(__dirname, 'sessions/simple-beat.tracktionedit')

const r     = '1 + 2 + 3 + 4 + '; // main rhythm
const v     = '0123012301230123';
const h1 = {h:'  h   h   h   h ', v}; // hi-hat with velocity
const h2 = {h:'h h h h h h h . ', v};
const h3 = {h:'hhhhhhhhhhhhhhhh', v};

const ks0   = 'k . s . . . s k '; // kick/snare patterns
const ks1   = 'k . s . . .k. k ';
const ks2   = 'k . sk. . . . k ';
const ks3   = 'k . s . . . . . ';

const score = [
  {
    hat:   [h1, h1, h1, h3],
    ks:    [ks0, ks1, ks2, ks3],
    crash: 'c',
  },
  { r:'1234..', ks: '...sss',   b: { r, hat: h2, ks: ks3 } }, // triplet snare on beat 4
  { r: 'h3e+a4e+a', ks: 'k..ssssss', crash: 'c' }, // drum roll of six 16th notes
];

const session = fluid.score.parse(score, {
  nLibrary: recipes.fromMars909.nLibrary,
  dLibrary, r});

const client  = new fluid.Client(9999);
client.send([
  fluid.global.activate(sessionPath, true),
  fluid.score.tracksToFluidMessage(session.tracks),
  fluid.transport.loop(0, session.duration),
  fluid.transport.play(),
]);
