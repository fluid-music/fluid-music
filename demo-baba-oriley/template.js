const path       = require('path');
const fluid      = require('../fluid-music');
const editFile   = path.join(__dirname, 'baba-oriley.tracktionedit');
const presetFile = path.join(__dirname, 'Zebra2BabaOriley.trkpreset');


const bpm      = 118.6;       // Beats-per-minute in the intro
const ms4note  = 60000 / bpm; // Millisec per quarter note
const ms16note = ms4note / 4; // Millisec per sixteenth note

const message = [
  fluid.global.activate(editFile, true),
  fluid.tempo.set(bpm),

  // Create a reverb send
  fluid.audiotrack.selectReturnTrack('reverb'),
  fluid.plugin.select('#TReverber8'),
  fluid.plugin.setParamNormalized('Mix', 1),
  fluid.plugin.setParamNormalized('Early/Late Mix', 0.6),
  fluid.plugin.setParamNormalized('Size', 0.46),
  fluid.plugin.setParamNormalized('Predelay', 0.5),
  fluid.plugin.setParamNormalized('Density', 0.5),
  fluid.plugin.setParamNormalized('Bandwidth', 1.0),

  // Create a delay send
  fluid.audiotrack.selectReturnTrack('16th delay'),
  fluid.pluginTStereoDelay.select(),
  fluid.pluginTStereoDelay.zero(),               // unity gain, 100% wet
  fluid.pluginTStereoDelay.setDelayMs(ms16note), // sixteenth note delay
  fluid.pluginTStereoDelay.setFeedback(.2),      // ...with 20% feedback
  fluid.pluginTStereoDelay.setLowPassFreq(2800), // low pass filter 2.8khz
  fluid.audiotrack.send('reverb', -20),          // reverb send @ -20 dBFS
  
  // Organ 1
  fluid.audiotrack.select('organ1'),
  fluid.plugin.loadTrkpreset(presetFile),
  fluid.audiotrack.gain(-6),
  fluid.audiotrack.send('16th delay', -2.3),
  fluid.audiotrack.send('reverb', -12),
  // Organ 2
  fluid.audiotrack.select('organ2'),
  fluid.plugin.loadTrkpreset(presetFile),
  fluid.audiotrack.gain(-9),
  fluid.audiotrack.send('16th delay', -6),
  fluid.audiotrack.send('reverb', -12),
];

const client = new fluid.Client();
client.send(message)
  .then(result => console.log('OK'))
  .catch(error => console.log('ERROR:', error));
