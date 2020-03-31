const _ = require('underscore');
const path = require('path');
const fluid = require('fluid-music');
const recipes = require('fluid-recipes');

const wd           = process.cwd();
const editFilename = path.join(wd, 'edm.tracktionedit');
const bassFilename = path.join(__dirname, 'zebra2.bass2osc.trkpreset');
const kickPath     = recipes.fromMars909.kit.k2.path
console.log('kick path:', kickPath);
console.log('session:', editFilename);

const msg = [
  fluid.global.activate(editFilename, true),
  // fluid.audiotrack.select('kick hi ho it is off to work we go hahahaha'),
  // _.range(10).map((i) => fluid.audiotrack.insertWav('k'+i, i, kickPath)),
  // fluid.audiotrack.select('bass'),
  fluid.plugin.loadTrkpreset(bassFilename),
];


console.log(msg);
const client = new fluid.Client(9999);
client.send(msg);
