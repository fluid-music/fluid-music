const fs  = require('fs');
const YAML = require('yaml');
const fluidObjToOsc = require('./converters');


const file = fs.readFileSync('basics.yaml', 'utf8');
const result = YAML.parse(file);

const oscMsg = fluidObjToOsc('CharlesTrack', 'CharlesClip', 1, 8, result.pattern);
console.log(JSON.stringify(oscMsg, null, 2));
console.log('\n\n\n');

const FluidClient = require('./FluidClient');

// https://www.npmjs.com/package/osc-min
const elements = [
  {
    address: '/audiotrack/select',
    args: [
      { type: 'string', value: "Charles' Track!!" },
    ]
  },
  {
    address: '/midiclip/select',
    args: [
      { type: 'string', value: 'This is my MIDI clip :)' },
      { type: 'float', value: 2 },
      { type: 'float', value: 4 },
    ]
  },
  {
    address: '/midiclip/clear',
  },
  {
    address: '/midiclip/n',
    args: [
      {type: 'integer', value: 48 },
      {type: 'float', value: 0 },
      {type: 'float', value: 1 },
    ]
  },
  {
    address: '/midiclip/n',
    args: [
      {type: 'integer', value: 50 },
      {type: 'float', value: 1 },
      {type: 'float', value: 1 },
    ]
  },
  {
    address: '/midiclip/n',
    args: [
      {type: 'integer', value: 55 },
      {type: 'float', value: 2 },
      {type: 'float', value: 1 },
    ]
  },
]
const newClipMsg = {
  oscType: 'bundle',
  timetag: 0,
  elements
};

const saveMsg = {
  address: '/save',
  args: {type: 'string', value: 'out.tracktionedit'},
};

const client = new FluidClient(9999);
client.send(oscMsg);
client.send(saveMsg);


console.log('basics:', result);

