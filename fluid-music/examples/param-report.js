const fluid = require('../');

const client = new fluid.Client(9999);

const m1 = [
  fluid.global.activate("deleteme.tracktionedit", true),
  fluid.audiotrack.select('hi'),
  fluid.pluginTStereoDelay.select(),
  {
    address: '/plugin/param/report',
  }
]

client.send(m1)
.then((data) => {
  console.dir(data, {depth:null})
  const lastElement = data.elements[data.elements.length -1];
  for (const arg of lastElement.args) {
    if (arg.type === 'blob') {
      const str = arg.value.toString();
      console.log(str);
      console.log(JSON.parse(str));
    }
  }
});
