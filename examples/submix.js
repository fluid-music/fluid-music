const path = require('path');
const fluid = require('..');
const cybr  = fluid.cybr;

const client = new cybr.Client(9999);

client.send([
  cybr.global.activate(path.join(__dirname, 'sessions/out.tracktionedit'), true),
  cybr.audiotrack.select('child1', 'parentA'),
  cybr.audiotrack.gain(-3),
  cybr.audiotrack.select('child2', 'parentA'),
  cybr.audiotrack.gain(-6),
  cybr.audiotrack.selectSubmixTrack('parentB'),
  cybr.audiotrack.gain(+4),
  cybr.audiotrack.pan(0.5),
  cybr.global.save(),
]);
