const fs = require('fs');
const YAML = require('yaml');

const should = require('should');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it

const converters = require('../src/converters');

const file = fs.readFileSync('./test/test-content.yaml', 'utf8');
const basics = YAML.parse(file);

describe('fluidObjToOsc', () => {
  const result = converters.fluidObjToOsc('track1', 'clip1', 1, 2, basics.cMajArp);

  it('should have /audiotrack/select', () => {
    const trackSelect = result.elements[0];
    trackSelect.should.deepEqual({
      address: '/audiotrack/select',
      args: [{ type: 'string', value: 'track1' }], // no way to know if its array or not
    });
  });

  it('should have /midiclip/select', () => {
    const clipSelect = result.elements[1];
    clipSelect.should.deepEqual({
      address: '/midiclip/select',
      args: [
        { type: 'string', value: 'clip1' },
        { type: 'float',  value: 1 },
        { type: 'float',  value: 2 },
      ],
    });
  });

  it('should have /midiclip/clear', () => {
    const clipClear = result.elements[2];
    clipClear.should.deepEqual({
      address: '/midiclip/clear',
    });
  });

  it('should have /midiclip/n messages (x3)', () => {
    const notes = result.elements.slice(3);
    notes.should.deepEqual([{
      address: '/midiclip/n',
      args: [
        { type: 'integer', value: 60 },
        { type: 'float',   value: 0 },
        { type: 'float',   value: 1 },
      ],
    }, {
      address: '/midiclip/n',
      args: [
        { type: 'integer', value: 64 },
        { type: 'float',   value: 2 },
        { type: 'float',   value: 1 },
      ],
    }, {
      address: '/midiclip/n',
      args: [
        { type: 'integer', value: 67 },
        { type: 'float',   value: 4 },
        { type: 'float',   value: 1 },
      ],
    }])
  });
});


