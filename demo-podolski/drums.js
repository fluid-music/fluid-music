function pathToNoteObject(path, fadeOut) {
  const obj = { type: 'file', path };
  if (typeof fadeOut === 'number') obj.fadeOut = fadeOut;
  return obj;
}

/**
 * Performance intensity layers for an acoustic kick drum.
 */
// The number at the end of the filename is misleading: 01 is high intensity, 04
// is low intensity.
const acousticKickIntensityLayers = [
  "Sony.Drums.From.The.Big.Room/POP/Pop One Shots/Pop Kicks/Pop Kick 24'' 04 - Close.wav",
  "Sony.Drums.From.The.Big.Room/POP/Pop One Shots/Pop Kicks/Pop Kick 24'' 03 - Close.wav",
  "Sony.Drums.From.The.Big.Room/POP/Pop One Shots/Pop Kicks/Pop Kick 24'' 02 - Close.wav",
  "Sony.Drums.From.The.Big.Room/POP/Pop One Shots/Pop Kicks/Pop Kick 24'' 01 - Close.wav",
].map((path) => pathToNoteObject(path, 0.01));

const electronicKickPath = 'Deep trance/Drum Hits/Bds/DT_BD_houser.wav';

/**
 * Two snare drum objects. Note that these are not intensity layers; they are
 * different performances at the same intensity.
 */
const snarePaths = [
  'Session Drummer 2/Contents/Kits/2 - Snares/SL Tight Kit Dry Snares/Tight Kit Dry Snare 06.wav',
  'Session Drummer 2/Contents/Kits/2 - Snares/SL Tight Kit Dry Snares/Tight Kit Dry Snare 06a.wav',
];

const tambourineIntensityLayers = [
  'Session Drummer 2/Contents/Kits/9 - Percussion 1/Moon Tambourine/Moon Tambourine 01.wav',
  'Session Drummer 2/Contents/Kits/9 - Percussion 1/Moon Tambourine/Moon Tambourine 02.wav',
  'Session Drummer 2/Contents/Kits/9 - Percussion 1/Moon Tambourine/Moon Tambourine 03.wav',
  'Session Drummer 2/Contents/Kits/9 - Percussion 1/Moon Tambourine/Moon Tambourine 04.wav',
  'Session Drummer 2/Contents/Kits/9 - Percussion 1/Moon Tambourine/Moon Tambourine 05.wav',
  'Session Drummer 2/Contents/Kits/9 - Percussion 1/Moon Tambourine/Moon Tambourine 06.wav',
  'Session Drummer 2/Contents/Kits/9 - Percussion 1/Moon Tambourine/Moon Tambourine 07.wav',
].map((path) => pathToNoteObject(path));

/**
 * Simple drum pattern note library
 */
const nLibrary = {
  d: { type: 'iLayers', iLayers: acousticKickIntensityLayers },
  D: { type: 'file', path: electronicKickPath, oneShot: true },
  k: { type: 'file', path: snarePaths[0]  },
  c: { type: 'iLayers', iLayers: tambourineIntensityLayers },
};

module.exports = {
  acousticKickIntensityLayers,
  electronicKickPath,
  snarePaths,
  tambourineIntensityLayers,
  nLibrary,
};
