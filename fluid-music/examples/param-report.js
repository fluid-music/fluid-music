const fluid = require('../');
const cybr = fluid.cybr;

const client = new cybr.Client(9999);


const m1 = [
  cybr.global.activate("deleteme.tracktionedit", true),
  cybr.audiotrack.select('hi'),
  cybr.pluginTStereoDelay.select(),
  // cybr.plugin.select('Podolski'),
  cybr.plugin.getParamReport(true),
  // cybr.plugin.getReport(),
];

client.send(m1).then((data) => {
  console.dir(data, {depth:null})

  for (const oscMsg of data.elements) {
    console.log('Received:', oscMsg.address);
    if (oscMsg.address === '/plugin/param/report/reply'
    ||  oscMsg.address === '/plugin/report/reply') {

      const details = oscMsg.args[1];
      const jsonStr = oscMsg.args[2];

      console.log('details:', details && details.value);
      console.log('json:', jsonStr && jsonStr.value);

      if (jsonStr && jsonStr.type === 'string')
        console.log(JSON.parse(jsonStr.value));
    }
  }
});
