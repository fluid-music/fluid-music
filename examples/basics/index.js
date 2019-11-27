const fs  = require('fs');
const dgram = require('dgram');
const YAML = require('yaml');
const osc = require('osc-min');

const file = fs.readFileSync('basics.yaml', 'utf8');
const result = YAML.parse(file);

const client = dgram.createSocket('udp4');

// https://www.npmjs.com/package/osc-min
const elements = [
  {
    address: '/select/audiotrack',
    args: [
      { type: 'string', value: "Charles' Track!!" },
    ]
  },
  {
    address: '/select/midiclip',
    args: [
      { type: 'string', value: 'This is my MIDI clip :)' },
    ]
  },
  {
    address: '/i/n',
    args: [
      {type: 'integer', value: 48 },
      {type: 'float', value: 0 },
      {type: 'float', value: 4 },
    ]
  },
  {
    address: '/i/n',
    args: [
      {type: 'integer', value: 50 },
      {type: 'float', value: 4 },
      {type: 'float', value: 4 },
    ]
  },
  {
    address: '/i/n',
    args: [
      {type: 'integer', value: 52 },
      {type: 'float', value: 8 },
      {type: 'float', value: 4 },
    ]
  },
]
const newClipMsg = osc.toBuffer({
  oscType: 'bundle',
  timetag: 10,
  elements
});

const saveMsg = osc.toBuffer({
  address: '/save',
  args: {type: 'string', value: 'out.tracktionedit'},
});

client.send(newClipMsg, 9999, (err) => { err && console.log('send error:', err); });

setTimeout(() => {
  client.send(saveMsg, 9999, (err) => {
    err && console.log('Error sending save message:' , err);
    process.exit();
  });
}, 200);

console.log('basics:', result);

