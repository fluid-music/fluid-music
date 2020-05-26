const path  = require('path');
const fluid = require('../');

const file   = path.join(__dirname, 'example.tracktionedit');
const file2  = path.join(__dirname, 'example2.tracktionedit');
const client = new fluid.Client(9999);

const notes = [
  { n: 60, s: 0.00, l: 0.25 },
  { n: 62, s: 1.00, l: 0.25 },
  { n: 63, s: 2.00, l: 0.25 },
  { n: 65, s: 3.00, l: 0.25 },
];

const m1 = [
  fluid.global.activate(file, true),
  fluid.audiotrack.select('plugin automation'),
  fluid.pluginTStereoDelay.select(),
  fluid.pluginTStereoDelay.zero(),
  fluid.pluginTStereoDelay.setLowPassFreqLeft(1000),
  fluid.pluginTStereoDelay.setLowPassFreqRight(1000),
  fluid.pluginTStereoDelay.setLowPassFreqRight(2000, 2),
  fluid.pluginTStereoDelay.setLowPassFreqRight(3000, 3),
  fluid.pluginTStereoDelay.setLowPassFreqRight(4000, 4),
  fluid.pluginTStereoDelay.setFeedbackLeft(-0.5, 0),
  fluid.pluginTStereoDelay.setFeedbackLeft(-0.75, 1),
  fluid.pluginTStereoDelay.setFeedbackLeft(0.75, 2),
  fluid.pluginTStereoDelay.setFeedbackRight(0.76),
  fluid.pluginTStereoDelay.setDryDbfs(10),
  fluid.pluginTStereoDelay.setPanWidth(-1),
  fluid.plugin.select('volume'),
  fluid.plugin.setParamExplicit('volume', 0.1),
  fluid.plugin.setParamExplicitAt('volume', 0.5, 1),
  

  fluid.audiotrack.select('midi clips'),
  fluid.midiclip.create('alpha', 0, 4, notes),
  fluid.midiclip.create('beta',  8, 4, notes),
  fluid.global.save(),
  fluid.content.clear(),
  fluid.global.save(file2),
];

client.send(m1)
.then((data) => {
  console.dir(data, {depth:null})
});
