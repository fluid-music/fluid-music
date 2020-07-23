function pathToNoteObject(path, fadeOut, oneShot) {
  const obj = { type: 'file', path };
  if (oneShot) obj.oneShot = true;
  if (typeof fadeOut === 'number') obj.fadeOutSeconds = fadeOut;
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
].map((path) => pathToNoteObject(path, undefined, true));

/**
 * Simple drum pattern note library
 */
const nLibrary = {
  d: { type: 'iLayers', iLayers: acousticKickIntensityLayers },
  D: { type: 'file', path: electronicKickPath, oneShot: true },
  k: { type: 'file', path: snarePaths[0] },
  c: { type: 'random', choices: tambourineIntensityLayers },
  r: {
    type: 'ripple',
    path: snarePaths[0],
  }
};

const eventMappers = [
  /**
   * @param {ClipEvent} event
   * @param {ClipEventContext} context
   */
  (event, context) => {
    if (!event.n || event.n.type !== 'ripple') return event;
    // 1/24 and 0.020
    // 1/16 and 0.040 [or whatever yields 061]
    // How long to wait between re-triggers measured in whole notes
    const stepSize = 1/24;
    // StartOffsetIncrement Number of seconds adjust sample start time
    const soi = 0.040;

    const numSteps = Math.floor(event.l / stepSize);
    const result =  new Array(numSteps).fill(null).map((_, i) => {
      const newEvent = Object.assign({}, event);
      newEvent.n = {
        type: 'file',
        path: event.n.path,
        fadeOutSeconds: 0.1,
        startInSourceSeconds: (numSteps - i - 1) * soi,
      };
      newEvent.s = event.s + i*stepSize;
      return newEvent;
    });
    return result;
  }
];

module.exports = {
  acousticKickIntensityLayers,
  electronicKickPath,
  snarePaths,
  tambourineIntensityLayers,
  nLibrary,
  eventMappers,
};
