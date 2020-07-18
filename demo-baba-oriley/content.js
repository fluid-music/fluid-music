const R       = require('ramda');
const fluid   = require('../fluid-music');
const helpers = require('./helpers');
const k       = { type: 'file', path: '909k.wav' };

let nLibrary = { F: 53, c: 60, f: 65, d: 62, e: 64, H: 58, k };
let dLibrary = { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, 5: 60, 6: 70, 7: 80, 8: 90, 9: 100, a: 110, b: 120, c: 127 };

let r      =  '1 e + a 2 e + a 3 e + a 4 e + a ';
let organ1 =  'F F c c f f c c F F c c f f c c ';
let organ2 = [' d d d d e               d d e e',
              '         d d e e         d d e e',
              '           d e e         d d e e',
  ...R.repeat('         d d e e         d d e e', 2),
              '         d d e e           d d d',
  ...R.repeat('           d d d           d d d', 2),
              '       e e           e e e      ',
              '     e e e           e e e      ',
  ...R.repeat('   d d e e         d d e e      ', 2),
              '   H   d d         H   d d      ',
              '   H   d d H       H   d d H    '];
let d      =  '78655775856556658765657676656765'; // velocities

const score = {
  organ1: R.repeat(organ1, 16),
  organ2: ['', '', organ2],
};

// nLibrary = { F: [41, 53], c: [34, 46], f: [41, 29], d: [44], e: [46], H: [48], k };
const session = fluid.score.parse(score, {nLibrary, r, dLibrary, d, startTime: 1});
fluid.score.applyEventMappers(session);

helpers.humanize(session.tracks.organ1, 0.008);
const message = [
  fluid.content.clear(),
  fluid.score.tracksToFluidMessage(session.tracks),
  fluid.audiotrack.select('organ1'),
  fluid.pluginZebra2Vst2.select(),
  fluid.audiotrack.select('organ2'),
  fluid.pluginZebra2Vst2.select(),
  fluid.transport.loop(1, session.duration),
];

const client = new fluid. Client();
client.send(message);
