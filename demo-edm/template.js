const path = require('path');
const fluid = require('fluid-music');

const wd           = process.cwd();
const editFilename = path.join(wd, 'edm.tracktionedit');
const bassFilename = path.join(__dirname, 'zebra2.bass2osc.trkpreset');

console.log('session:', editFilename);
const bpm = 128;
const oneBeatInMs = 60000 / 128;

const msg = [
  fluid.global.activate(editFilename, true),
  fluid.tempo.set(bpm),
  fluid.audiotrack.select('kick'),
  fluid.audiotrack.select('bass'),
  fluid.plugin.loadTrkpreset(bassFilename),
  fluid.audiotrack.select('mallet'),
  fluid.plugin.select('zebra2', 'vst'),
  fluid.plugin.setParamNormalized('Delay1: Mix', 0),
  fluid.audiotrack.send('delayQuarterNote', -6),
  // create delays
  fluid.audiotrack.selectReturnTrack('delayQuarterNote'),
  fluid.pluginTStereoDelay.select(),
  fluid.pluginTStereoDelay.zero(),
  fluid.pluginTStereoDelay.setDelayMs(oneBeatInMs),
];

const client = new fluid.Client(9999);
client.send(msg);
