const fluid = require('../');
const cybr  = fluid.cybr
const file  = path.join(__dirname, 'example.tracktionedit');

const client = new cybr.Client(9999);
const m1 = [
  cybr.global.activate(file, true),
  cybr.audiotrack.select('hi'),
  cybr.plugin.select('delay'),
  cybr.global.save(),
];

client.send(m1);
