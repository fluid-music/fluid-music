const fs   = require('fs');
const path = require('path');
const fluid = require('../../');
const cybr = fluid.cybr;

const presetFilename  = path.join(__dirname, 'CybrPan.trkpreset');
const sessionFilename = path.join(__dirname, 'session.tracktionedit');

const msg = [
  cybr.global.activate(sessionFilename, true),
  cybr.audiotrack.select('boomchick'),
  cybr.audiotrack.select('hithere'),
  cybr.audiotrack.select('boomchick'),
  cybr.global.save(),
];


const client = new cybr.Client();
client.send(msg).then(r => {
  console.dir(r, {depth: null});
});