const R       = require('ramda');
const fluid   = require('../fluid-music');
const helpers = require('./helpers');
const cleanup = helpers.cleanup;

const nLibrary = { F: 53, c: 60, f: 65, d: 62, e: 64, H: 58, R: [53, 65, 77] };
const vLibrary = { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, 5: 60, 6: 70, 7: 80, 8: 90, 9: 100, a: 110, b: 120, c: 127 };

let v      =  '78655775856556658765657676656765';
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
              '   H   d d H       H   d d H    ',
];

const score = {
  organ1: R.repeat(organ1, 16),
  organ2: ['', '', organ2],
};

const session = fluid.score.parse(score, {nLibrary, r, vLibrary, v, startTime: 1});
const message = [
  cleanup(session),
  fluid.score.tracksToFluidMessage(session.tracks),
  fluid.transport.loop(1, session.duration),
];

const client = new fluid. Client();
client.send(message);
