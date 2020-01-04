const FluidClient = require('../src/FluidClient');
const fluid = require('../src/fluidOsc');

const elements = [
  fluid.audiotrack.select('track 1'),
  fluid.plugin.select('compressor'),
  fluid.plugin.setParam('ratio', 0.33),
  fluid.plugin.setParam('attack', 0.33),
  fluid.plugin.save('comp-preset-1'),

  fluid.plugin.select('delay'),
  fluid.plugin.setParam('feedback', .10),
  fluid.plugin.save('delay-preset-1'),

  fluid.audiotrack.select('loadpreset'),
  fluid.plugin.load('delay-preset-1'),

  fluid.global.save('out.tracktionedit', false),
];

const client = new FluidClient(9999);
client.send(elements);
