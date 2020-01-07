const FluidClient = require('../src/FluidClient');
const fluid = require('../src/fluidOsc');

const elements = [
  // create a preset for tracktion's delay plugin
  fluid.plugin.select('delay'),
  fluid.plugin.setParam('feedback', .10),
  fluid.plugin.save('delay-preset-1'),
  // load that preset on a new track
  fluid.audiotrack.select('loadpreset'),
  fluid.plugin.load('delay-preset-1'),

  // save a preset for tracktion's compressor plugin
  fluid.audiotrack.select('track 1'),
  fluid.plugin.select('compressor'),
  fluid.plugin.setParam('ratio', 0.33),
  fluid.plugin.setParam('attack', 0.33),
  fluid.plugin.save('comp-preset-1'),

  // save the edit file
  fluid.global.save('out.tracktionedit', false),
];

const client = new FluidClient(9999);
client.send(elements);
