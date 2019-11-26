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
    address: '/test',
    args: [
      { type: 'string', value: "sup, cuz?" },
      { type: 'float', value: 123.45 },
      { type: 'integer', value: result.integer },
    ]
  },
  {
    address: '/test',
    args: [
      { type: 'string', value: 'second argument' },
    ]
  }
]
const msg = osc.toBuffer({
  oscType: 'bundle',
  timetag: 10,
  elements
});

client.send(msg, 9999, (err) => { err && console.log('send error:', err); });

console.log('basics:', result);

