const path  = require('path');
const fluid = require('..');
const cybr  = fluid.cybr;

const file   = path.join(__dirname, 'example.tracktionedit');
const client1 = new cybr.Client(9999);
const client2 = new cybr.Client(9999);



const m1 = [
  cybr.global.activate(file, true),
  cybr.audiotrack.select('plugin-test'),
  cybr.pluginTStereoDelay.select(),
  cybr.pluginTStereoDelay.zero(),
];

const m2 = [
  cybr.audiotrack.select('plugin-test'),
  cybr.pluginTStereoDelay.select(),
  cybr.pluginTStereoDelay.setLowPassFreqLeft(3000),
  cybr.pluginTStereoDelay.setLowPassFreqRight(4000),
  cybr.pluginTStereoDelay.setFeedbackLeft(-0.51),
  cybr.pluginTStereoDelay.setDryDbfs(10),
  cybr.pluginTStereoDelay.setPanWidth(-1),
  cybr.global.save(),
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
