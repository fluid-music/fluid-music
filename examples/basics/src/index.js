const fs  = require('fs');
const YAML = require('yaml');
const converters = require('./converters');
const fluidObjToOsc = converters.fluidObjToOsc;


const file = fs.readFileSync('basics.yaml', 'utf8');
const result = YAML.parse(file);

const oscMsg = fluidObjToOsc('CharlesTrack', 'CharlesClip', 1, 8, result.pattern);

const FluidClient = require('./FluidClient');

const saveMsg = {
  address: '/save',
  args: {type: 'string', value: 'out.tracktionedit'},
};

const client = new FluidClient(9999);
client.send(oscMsg);
client.send(saveMsg);

console.log('basics:', result);

