const path        = require('path');
const fluid       = require('../fluid-music');
const sessionFile = path.join(__dirname, 'baba-oriley.tracktionedit');
const presetFile  = path.join(__dirname, 'Zebra2BabaOriley.trkpreset');

const BPM     = 118.6; // Beats-per-minute
const message = [
  fluid.global.activate(sessionFile, true),
  fluid.tempo.set(BPM),

  // Create a 16th note delay send
  fluid.audiotrack.selectReturnTrack('16th delay'),
  fluid.pluginTStereoDelay.select(),
  fluid.pluginTStereoDelay.zero(),                // unity gain, 100% wet
  fluid.pluginTStereoDelay.setDelayMs(15000/BPM), // 16th note delay in ms
  fluid.pluginTStereoDelay.setFeedback(.2),       // ...with 20% feedback
  fluid.pluginTStereoDelay.setLowPassFreq(2800),  // low pass filter 2.8khz
  fluid.audiotrack.send('reverb', -20),           // reverb send @ -20 dBFS

  // Create a short, bright reverb send
  fluid.audiotrack.selectReturnTrack('reverb'),
  fluid.pluginTReverber8.select(),
  fluid.pluginTReverber8.setMixPercent(100),
  fluid.pluginTReverber8.setEarlyLateMixPercent(60),
  fluid.pluginTReverber8.setSizePercent(46),
  fluid.pluginTReverber8.setPredelayMs(100),
  fluid.pluginTReverber8.setDensity(0.45),

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

  // Kick drum
  fluid.audiotrack.select('kick'),
  fluid.audiotrack.gain(-10),
  // Tighten the kick drum by cutting some low mids...
  fluid.pluginTEqualiser.setBand1(230, -4.4, 1.8),
  // ..and boosting the highs with a shelf
  fluid.pluginTEqualiser.setBand8(3000, 1.5, 1),
  fluid.pluginTEqualiser.setBand8Shape(fluid.pluginTEqualiser.shape.highShelf),
];

const client = new fluid.Client();
client.send(message)
  .then(result => console.log('OK'))
  .catch(error => console.log('ERROR:', error));
