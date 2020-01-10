const path = require('path');
const fs = require('fs');
const fluid = require('../src/fluidOsc');

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

/**
 * Add a 909 drum track to the session.
 * @param {String} sampleDir - directory where samples are located. This dir
 *        should contain a folder named `SP 909 From Mars`
 * @param {String} [trackName='909 kit'] - The name of the track to insert the
 */
const drumTrack909 = function(sampleDir, trackName) {
  if (!path.isAbsolute(sampleDir)) {
    sampleDir = path.join(process.cwd(), sampleDir);
  }

  // Setup working directory
  const subDir = path.join(sampleDir, 'SP 909 From Mars');
  if (!fs.lstatSync(subDir).isDirectory()) {
    console.error('ERROR: ensure that the sample directory exists:', subDir);
    throw new Error('drumTrack recipe requires valid path to drum samples')
  }

  if (typeof trackName !== 'string') trackName = '909 kit';

  const drumSamplerConfig = Object.entries(kit).map(v => {
    const noteNum = parseInt(v[0]);
    const name = v[1].name;
    const filename = v[1].path;
    return fluid.sampler.add(name, path.join(sampleDir, filename), noteNum, null, null, true);
  });

  return [
    fluid.audiotrack.select(trackName),
    fluid.plugin.select('sampler'),
    fluid.sampler.clearAll(),
    ...drumSamplerConfig,
  ];
}

module.exports = drumTrack909;
