const fluid = require('../');
const file  = path.join(__dirname, 'example.tracktionedit');

const client = new fluid.Client(9999);
const m1 = [
  fluid.global.activate(file, true),
  fluid.audiotrack.select('hi'),
  fluid.plugin.select('delay'),
  fluid.global.save(),
];

client.send(m1);
