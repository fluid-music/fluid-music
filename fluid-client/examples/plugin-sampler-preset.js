// Create a drum sampler preset that uses the "From Mars" SP 909 sample library.
//
// This requires that you have the "From Mars" 909 sample kit in the '909kit'
// directory.
//
// The script below create two files
// 1) a .trkpreset file that can be loaded by other edits
// 2) a .tracktionedit file that can be loaded with Tracktion Waveform
//
// The script will then play the edit file on the server.

const process = require('process');
const path = require('path');
const fs = require('fs');

const fluid = require('../src/fluidOsc');
const FluidClient = require('../src/FluidClient');
const tabs = require('./tab-examples');

// Setup working directory
const directory = path.join(__dirname, '909kit');
const sampleLibDir = path.join(directory, 'SP 909 From Mars');

if (!fs.lstatSync(sampleLibDir).isDirectory()) {
  console.error('ERROR: ensure that the sample directory exists:', sampleLibDir);
  process.exit();
}

console.log('Dir:', directory);
console.log('Samples Dir:', sampleLibDir);

const s1 = { name: 's1', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/SD A SP 909 09.wav' };
const s2 = { name: 's2', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/SD B SP 909 09.wav' };
const s3 = { name: 's3', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/SD B SP 909 09.wav' };
const s4 = { name: 's4', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/SD B SP 909 09.wav' };

const kit = {
  '35': { name: 'k1', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/BD C SP 909 09.wav' },
  '36': { name: 'k2', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/BD D SP 909 09.wav' },
  '37': { name: 'rimshot', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Rimshot SP 909 09.wav' },
  '38': s2,
  '39': { name: 'clap', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Clap SP 909 09.wav' },
  '40': s3,
  '41': { name: 'tomLow', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Tom Lo SP 909 09.wav' },
  '42': { name: 'hat1', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/CH A SP 909 09.wav' },
  '43': { name: 'tomMid', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Tom Mid SP 909 09.wav' },
  '44': { name: 'hat2', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/CH B SP 909 09.wav' },
  '45': { name: 'tomHi', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Tom Hi SP 909 09.wav' },
  '46': { name: 'openHat', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/OH A SP 909 09.wav' },
  '49': { name: 'crash', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Crash SP 909 09.wav' },
  '51': { name: 'ride', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Ride SP 909 09.wav' },
};

const drumSamplerConfig = Object.entries(kit).map(v => {
  const noteNum = parseInt(v[0]);
  const name = v[1].name;
  const path = v[1].path;
  return fluid.sampler.add(name, path, noteNum, null, null, true);
});

const client = new FluidClient(9999);
client.send([
  fluid.global.cd(directory),
  fluid.global.activate('demo.tracktionedit'),
  fluid.audiotrack.select('drums'),
  fluid.plugin.select('sampler'),
  fluid.sampler.clearAll(),
  ...drumSamplerConfig,
  fluid.plugin.save('sampler.909kit'),
  ...fluid.midiclip.create('simple', 0, 4, tabs.beatNotes),
  ...fluid.midiclip.create('simple', 4, 4, tabs.beatNotes),
  fluid.global.save(),
  fluid.transport.loop(0, 8),
  fluid.transport.play(),
]);
