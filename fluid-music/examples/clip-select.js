const path = require('path');
const fluid = require('../src/index');
const Client = require('../src/FluidClient');
const tabEx = require('./tab-examples');

const client = new Client(9999);
const sessionFilename = path.join(__dirname, 'sessions/out.tracktionedit');
const audioFilename = '/Users/charles/projects/juce/cybr/fluid-music/examples/sessions/media/noTearsVerseNotes-redo.wav'
console.log(sessionFilename);

client.send([
  fluid.global.activate(sessionFilename, true),
  fluid.audiotrack.select('Track 1'),
  fluid.audiotrack.insertWav('ntvn', 0, audioFilename),
  fluid.clip.trimSeconds(0, 6),
  fluid.audioclip.fadeInOutSeconds(1, 1),
  fluid.audioclip.reverse(true),
  fluid.audiotrack.insertWav('ntvn2', 16, audioFilename),
  fluid.clip.length(5, true),
  fluid.audioclip.gain(-5),
  fluid.audiotrack.select('Track 2'),
  fluid.midiclip.create('beatNotes', 16, 8, tabEx.beatNotes),
  fluid.global.save(),
]);
