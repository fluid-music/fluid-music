const kit = {
  'k1':      { n: '35', type: 'file', name: 'k1',      path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/BD C SP 909 09.wav' },
  'k2':      { n: '36', type: 'file', name: 'k2',      path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/BD D SP 909 09.wav' },
  'rimshot': { n: '37', type: 'file', name: 'rimshot', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Rimshot SP 909 09.wav' },
  's2':      { n: '38', type: 'file', name: 's2',      path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/SD B SP 909 09.wav' },
  'clap':    { n: '39', type: 'file', name: 'clap',    path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Clap SP 909 09.wav' },
  's3':      { n: '40', type: 'file', name: 's3',      path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/SD B SP 909 09.wav' },
  'tomLow':  { n: '41', type: 'file', name: 'tomLow',  path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Tom Lo SP 909 09.wav' },
  'hat1':    { n: '42', type: 'file', name: 'hat1',    path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/CH A SP 909 09.wav' },
  'tomMid':  { n: '43', type: 'file', name: 'tomMid',  path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Tom Mid SP 909 09.wav' },
  'hat2':    { n: '44', type: 'file', name: 'hat2',    path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/CH B SP 909 09.wav' },
  'tomHi':   { n: '45', type: 'file', name: 'tomHi',   path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Tom Hi SP 909 09.wav' },
  'openHat': { n: '46', type: 'file', name: 'openHat', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/OH A SP 909 09.wav' },
  'crash':   { n: '49', type: 'file', name: 'crash',   path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Crash SP 909 09.wav' },
  'ride':    { n: '51', type: 'file', name: 'ride',    path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/Ride SP 909 09.wav' },
};

kit.snare = kit.s = kit.s2;
kit.kick  = kit.k = kit.k2;

module.exports.kit = kit;
module.exports.s1 = { name: 's1', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/SD A SP 909 09.wav' };
module.exports.s2 = { name: 's2', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/SD B SP 909 09.wav' };
module.exports.s3 = { name: 's3', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/SD B SP 909 09.wav' };
module.exports.s4 = { name: 's4', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/SD B SP 909 09.wav' };
module.exports.nLibrary = {
  k: kit.kick,
  h: kit.hat1,
  H: kit.hat2,
  o: kit.openHat,
  s: kit.snare,
  S: kit.s3,
  c: kit.crash,
  i: kit.tomHi,
  t: kit.tomMid,
  T: kit.tomLow,
  r: kit.ride,
  R: kit.rimshot,
};
