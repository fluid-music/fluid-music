const path = require('path');
const fluid = require('fluid-music');

const wd           = process.cwd();
const editFilename = path.join(wd, 'edm.tracktionedit');
const bassFilename = path.join(__dirname, 'Helm Bass One.trkpreset');

console.log('session:', editFilename);
const bpm = 128;
const oneBeatInMs = 60000 / 128;

const msg = [
  fluid.global.activate(editFilename, true),
  fluid.tempo.set(bpm),
  fluid.audiotrack.select('kick'),
  fluid.audiotrack.gain(-10),
  fluid.audiotrack.select('snare'),
  fluid.audiotrack.gain(-10),
  fluid.audiotrack.select('hat'),
  fluid.audiotrack.gain(-16),
  fluid.audiotrack.select('crash'),
  fluid.audiotrack.gain(-9),
  fluid.audiotrack.select('bass'),
  fluid.audiotrack.gain(-3),
  fluid.plugin.loadTrkpreset(bassFilename),
  fluid.audiotrack.select('mallet'),
  fluid.pluginDexedVst.select(),
  fluid.audiotrack.send('delayQuarterNote', -6),
  // create delays
  fluid.audiotrack.selectReturnTrack('delayQuarterNote'),
  fluid.pluginDexedVst.select(),
  fluid.pluginDexedVst.setLfoDelay(0),
  fluid.pluginDexedVst.setFeedback(0.3),
  fluid.global.save(editFilename),
];

const client = new fluid.Client(9999);
client.send(msg).then()
.catch((err) => {
  console.log(err)
});
