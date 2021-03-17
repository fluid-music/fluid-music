const path  = require('path');
const fluid = require('..');
const cybr  = fluid.cybr;

const file   = path.join(__dirname, 'example.tracktionedit');
const file2  = path.join(__dirname, 'example2.tracktionedit');
const client = new cybr.Client(9999);

const notes = [
  { n: 60, s: 0.00, l: 0.25 },
  { n: 62, s: 1.00, l: 0.25 },
  { n: 63, s: 2.00, l: 0.25 },
  { n: 65, s: 3.00, l: 0.25 },
];

const m1 = [
  cybr.global.activate(file, true),
  cybr.audiotrack.select('plugin automation'),
  cybr.pluginTStereoDelay.select(),
  cybr.pluginTStereoDelay.zero(),
  cybr.pluginTStereoDelay.setLowPassFreqLeft(1000),
  cybr.pluginTStereoDelay.setLowPassFreqRight(1000),
  cybr.pluginTStereoDelay.setLowPassFreqRight(2000, 2),
  cybr.pluginTStereoDelay.setLowPassFreqRight(3000, 3),
  cybr.pluginTStereoDelay.setLowPassFreqRight(4000, 4),
  cybr.pluginTStereoDelay.setFeedbackLeft(-0.5, 0),
  cybr.pluginTStereoDelay.setFeedbackLeft(-0.75, 1),
  cybr.pluginTStereoDelay.setFeedbackLeft(0.75, 2),
  cybr.pluginTStereoDelay.setFeedbackRight(0.76),
  cybr.pluginTStereoDelay.setDryDbfs(10),
  cybr.pluginTStereoDelay.setPanWidth(-1),
  cybr.plugin.select('volume'),
  cybr.plugin.setParamExplicit('volume', 0.1),
  cybr.plugin.setParamExplicitAt('volume', 0.5, 1),
  

  cybr.audiotrack.select('midi clips'),
  cybr.midiclip.create('alpha', 0, 4, notes),
  cybr.midiclip.create('beta',  8, 4, notes),
  cybr.global.save(),
  cybr.content.clear(),
  cybr.global.save(file2),
];

client.send(m1)
.then((data) => {
  console.dir(data, {depth:null})
});
