const fluid = require('../');

const client = new fluid.Client(9999);
const m1 = [
  fluid.audiotrack.select('hi'),
  fluid.plugin.select('delay'),
];

client.send(m1);
