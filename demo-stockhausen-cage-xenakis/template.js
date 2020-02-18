const path = require('path');
const fluid = require('fluid-music');

const sessionFilename = path.join(__dirname, 'sessions/template.tracktionedit');
const client = new fluid.Client(9999);

client.send([
  fluid.global.activate(sessionFilename, true),
  fluid.audiotrack.selectReturnTrack('reverb'),
  fluid.audiotrack.select('T1'),
  fluid.audiotrack.send('reverb', -70),
  fluid.global.save(),
]);
