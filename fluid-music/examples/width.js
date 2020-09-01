const path  = require('path');
const fluid = require('../');
const cybr  = fluid.cybr;

const sessionFilename = path.join(__dirname, 'width.tracktionedit');

const msg = [
  cybr.global.activate(sessionFilename, true),
  cybr.audiotrack.select('boomchick'),
  { address: '/audiotrack/set/width', args: [{type: 'float', value: 0}]},
  cybr.audiotrack.select('hithere'),
  { address: '/audiotrack/set/width', args: [{type: 'float', value: -1}]},
  cybr.audiotrack.select('boomchick'),
  cybr.plugin.select('width', 'tracktion'),
  cybr.plugin.setParamExplicitAt('width', 0.25, 1),
  cybr.plugin.setParamExplicitAt('width', 0.75, 2),
  cybr.global.save(),
];


const client = new cybr.Client();
client.send(msg).then(r => {
  console.dir(r, {depth: null});
});