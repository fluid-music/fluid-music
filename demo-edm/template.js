const path = require('path');
const fluid = require('fluid-music');

const wd           = process.cwd();
const editFilename = path.join(wd, 'edm.tracktionedit');
const bassFilename = path.join(__dirname, 'zebra2.bass2osc.trkpreset');

console.log('session:', editFilename);

const msg = [
  fluid.global.activate(editFilename, true),
  fluid.tempo.set(128),
  fluid.audiotrack.select('kick'),
  fluid.audiotrack.select('bass'),
  fluid.plugin.loadTrkpreset(bassFilename),
];

const client = new fluid.Client(9999);
client.send(msg);
