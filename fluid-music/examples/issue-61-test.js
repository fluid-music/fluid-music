const path  = require('path');
const fluid = require('../');

const file   = path.join(__dirname, 'example.tracktionedit');
const client1 = new fluid.Client(9999);
const client2 = new fluid.Client(9999);



const m1 = [
  fluid.global.activate(file, true),
  fluid.audiotrack.select('plugin-test'),
  fluid.pluginTStereoDelay.select(),
  fluid.pluginTStereoDelay.zero(),
];

const m2 = [
  fluid.audiotrack.select('plugin-test'),
  fluid.pluginTStereoDelay.select(),
  fluid.pluginTStereoDelay.setLowPassFreqLeft(3000),
  fluid.pluginTStereoDelay.setLowPassFreqRight(4000),
  fluid.pluginTStereoDelay.setFeedbackLeft(-0.51),
  fluid.pluginTStereoDelay.setDryDbfs(10),
  fluid.pluginTStereoDelay.setPanWidth(-1),
  fluid.global.save(),
];

const wait = (timeMs) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('done'), timeMs);
  });
};

const send = async () => {
  const r1 = await client1.send(m1);
  console.log('waiting...');
  await wait(5);
  console.log('...done!');
  const r2 = await client2.send(m2);
};

send().then( r => { console.log('done: ', r); });
