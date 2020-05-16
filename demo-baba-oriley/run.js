const R       = require('ramda');
const fluid   = require('../fluid-music');
const recipes = require('../fluid-recipes');

const nLibrary = {
  F: 53, c: 60, f: 65, d: 62, e: 64,
};

let r1     = '1 e + a 2 e + a ';
let organ  = 'F F c c f f c c ';

let r      =  '1 e + a 2 e + a 3 e + a 4 e + a ';
let organ1 =  'F F c c f f c c F F c c f f c c ';
let organ2 = [' d d d d e               d d e e',
              '         d dfefe         d d e e',
];

const score = {
  organ1: R.repeat(organ1, 16),
  organ2: ['', '', organ2],
};

const session = fluid.score.parse(score, {nLibrary, r});
const message = [
  fluid.score.tracksToFluidMessage(session.tracks),
  fluid.audiotrack.select('organ1'),
  fluid.transport.loop(0, session.duration),
];

const client = new fluid. Client();
client.send(message);
