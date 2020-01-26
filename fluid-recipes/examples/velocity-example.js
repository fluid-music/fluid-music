#!/usr/bin/env node
const path = require('path');

const fluid = require('fluid-music');
const recipes = require('../');

const sessionPath = path.join(__dirname, 'sessions/velocity.tracktionedit')
const drumTrackName = 'house';
const drumsMsg = recipes.drumTrack909(drumTrackName);

const rhythm='1e+a2e+a3e+a4e+a'
const noteLibrary = {k: 36, h: 42, s: 38, S: 40, c: 49, t: 41, o:46, p:44, C: 39}
const kick = 'k...k...k...k...'
const misc = '..o.C.o...o.C.o.'
const hihat='hhhhhhhhhhhhhhhh'

const vLibrary = [60,70,80,90]
const vhihat='0123012301230123'
const hhwv = {hihat, v:vhihat}
const house={hhwv, kick, misc} 

const drums_notes = {
    noteLibrary,
    vLibrary,
    r: rhythm,
    p: [house]
}
const drums_parsed = fluid.tab.parse(drums_notes);

const client = new fluid.Client(9999);
client.send([
    fluid.global.activate(sessionPath),
    fluid.audiotrack.select('house'),
    ...drumsMsg,
    fluid.midiclip.create('house', 0, 4, drums_parsed),
    fluid.global.save(sessionPath)
]);
