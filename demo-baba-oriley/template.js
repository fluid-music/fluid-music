const path     = require('path');
const fluid    = require('../fluid-music');

const editFile   = path.join(__dirname, 'baba-oriley.tracktionedit');
const presetFile = path.join(__dirname, 'Zebra2BabaOriley.trkpreset');

const bpm      = 118.6;        // Tempo of the intro
const ms4note  = 60000 / bpm;  // Milliseconds in a quarter note
const ms16note =  ms4note / 4; // Milliseconds in a sixteenth note

const message = [
  fluid.global.activate(editFile, true),
  fluid.tempo.set(bpm),

  // Create a reverb send
  fluid.audiotrack.selectReturnTrack('verb'),
  fluid.plugin.select('#TReverber8'),
  fluid.plugin.setParamNormalized('Mix', 1),

  // Create a delay send
  fluid.audiotrack.selectReturnTrack('16th note delay'),
  fluid.pluginTStereoDelay.select(),
  fluid.pluginTStereoDelay.zero(),               // unity gain, 100% wet
  fluid.pluginTStereoDelay.setDelayMs(ms16note), // sixteenth note delay
  fluid.pluginTStereoDelay.setFeedback(.2),      // ...with 20% feedback
  fluid.pluginTStereoDelay.setLowPassFreq(2800), // low pass filter 2.8khz
  fluid.audiotrack.send('verb', -20),            // verb send @ -20 dBFS
  
  fluid.audiotrack.select('organ1'),
  fluid.plugin.loadTrkpreset(presetFile),
  fluid.audiotrack.send('16th note delay', -2.3),
  fluid.audiotrack.send('verb', -12),

  fluid.audiotrack.select('organ2'),
  fluid.pluginZebra2Vst2.select(),
  fluid.plugin.loadTrkpreset(presetFile),
  fluid.audiotrack.gain(-3),
  fluid.audiotrack.send('16th note delay', -6),
  fluid.audiotrack.send('verb', -12),
];

const client = new fluid.Client();
client.send(message)
  .then(result => console.log('OK'))
  .catch(error => console.log('ERROR:', error));
