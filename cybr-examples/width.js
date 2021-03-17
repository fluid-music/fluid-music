const path  = require('path');
const fluid = require('../');
const cybr  = fluid.cybr;

const sessionFilename = path.join(__dirname, 'width.tracktionedit');

const msg = [
  cybr.global.activate(sessionFilename, true),
  cybr.audiotrack.select('boomchick'),
  cybr.audiotrack.width(1),
  cybr.audiotrack.select('hithere'),
  cybr.audiotrack.width(-1),
  cybr.audiotrack.select('boomchick'),
  cybr.audiotrack.width(-1, 1, -0.5),
  cybr.audiotrack.width(0, 2),
  cybr.audiotrack.select('neutral'),
  cybr.global.save(),
];


const client = new cybr.Client();
client.send(msg).then(r => {
  console.dir(r, {depth: null});
});