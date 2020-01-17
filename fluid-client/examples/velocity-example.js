const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');
const tab = require('../src/tab');
const path = require('path');
const drums909 = require('../recipes/track-drums909');

const drumTrackName = 'house';
const drumsMsg = drums909(drumTrackName);

const sessionPath = path.join(__dirname, 'sessions/velocity.tracktionedit')

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
const drums_parsed = tab.parse(drums_notes);

const client = new FluidClient(9999);
client.send([
    fluid.global.activate(sessionPath),
    fluid.audiotrack.select('house'),
    ...drumsMsg,
    fluid.midiclip.create('house', 0, 4, drums_parsed),
    fluid.global.save(sessionPath)
]);
