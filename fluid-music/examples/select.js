const fluid = require('../src/index');
const Client = require('../src/FluidClient');


const client = new Client(9999);
const m1 = [
  fluid.audiotrack.select('hi'),
  fluid.plugin.select('delay'),
]

client.send(m1);
