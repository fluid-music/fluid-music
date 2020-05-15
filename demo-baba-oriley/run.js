const R       = require('ramda');
const fluid   = require('../fluid-music');
const recipes = require('../fluid-recipes');

const nLibrary = {
  F: 41, c: 48, f: 53, d: 50, e: 52,
};

let r1     = '1 + 2 + ';
let organ1 = 'FFccffcc';

let r2     =  '1 e + a 2 e + a 3 e + a 4 e + a ';
let organ2 = [' d d d d e               d d e e',
              '   d d e e               d d e e',
];

const score = {
  1: {r: r1, organ1: R.repeat(organ1, 32)},
  2: {r: r2, organ2: organ2 },
};

const session = fluid.score.parse(score, {nLibrary});
const message = [
  fluid.score.tracksToFluidMessage(session.tracks),
  fluid.audiotrack.select('organ1'),
  fluid.pluginHelm.select(),
  fluid.pluginHelm.setOsc2Transpose(0.627417), // 8va
];

const client = new fluid. Client();
client.send(message);
