const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');

const client = new FluidClient(9999);

const kick = '/Users/charles/projects/juce/cybr/Builds/MacOSX/build/Debug/SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/BD D SP 909 09.wav';
const snare = '/Users/charles/projects/juce/cybr/Builds/MacOSX/build/Debug/SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/SD C SP 909 09.wav';

client.send([
  fluid.audiotrack.select('sampler'),
  fluid.plugin.select('sampler'),
  fluid.sampler.add('kick', kick, 35),
  fluid.sampler.add('snare', snare, 38, -5, -1),
  fluid.global.save('out.tracktionedit'),
]);
