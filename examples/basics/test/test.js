const fs = require('fs');
const YAML = require('yaml');
const should = require('should');
const mocha = require('mocha');

const converters = require('../src/converters');
const file = fs.readFileSync('./test/test-content.yaml', 'utf8');
const content = YAML.parse(file);

describe('valueToWholeNotes', () => {
  it('should handle strings in the format "1/4"', () => {
    converters.valueToWholeNotes('1/4').should.equal(1/4);
    converters.valueToWholeNotes('1/12').should.equal(1/12);
    converters.valueToWholeNotes('1/32').should.equal(1/32);
  });
  it('should handle strings in the format "sixteenth"', () => {
    converters.valueToWholeNotes('sixteenth').should.equal(1/16);
    converters.valueToWholeNotes('quarter').should.equal(1/4);
  });
  it('should handle Numbers', () => {
    converters.valueToWholeNotes(1/8).should.equal(1/8);
    converters.valueToWholeNotes(1/32).should.equal(1/32);
  });
  it('should throw on invalid values', () => {
    should(() => { converters.valueToWholeNotes('Hi!'); }).throw();
  });
});


describe('valueToMidiNoteNumber', () => {
  it('should convert "c4" string to 60', () => {
    converters.valueToMidiNoteNumber('c4').should.equal(60);
  });
  it('should convert "c##4" string to 62', () => {
    converters.valueToMidiNoteNumber('c##4').should.equal(62);
  });
  it('should leave numbers like 58 unchanged', () => {
    converters.valueToMidiNoteNumber(58).should.equal(58);
  });
  it('should throw on an invalid string', () => {
    should(() => { converters.valueToMidiNoteNumber('invalid'); }).throw();
    should(() => { converters.valueToMidiNoteNumber('##'); }).throw();
  })
});

describe('createMidiNoteMessage', () => {
  let noteNum = 60;
  let startTimeInQuarterNotes = 1.5;
  let durationInQuarterNotes = 0.5
  let velocity = 64;

  const desiredResult = {
    address: '/midiclip/n',
    args: [
      { type: 'integer', value: noteNum },
      { type: 'float', value: startTimeInQuarterNotes },
      { type: 'float', value: durationInQuarterNotes },
    ],
  };

  it('Should create an object designed for osc.toBuffer()', () => {
    converters.createMidiNoteMessage(noteNum, startTimeInQuarterNotes, durationInQuarterNotes)
      .should.deepEqual(desiredResult);
  });

  it('should include an extra argument if a velocity is supplied', () => {
    desiredResult.args.push({ type: 'integer', value: velocity });
    converters.createMidiNoteMessage(noteNum, startTimeInQuarterNotes, durationInQuarterNotes, velocity)
      .should.deepEqual(desiredResult);
  });
});


describe('fluidObjToOsc', () => {
  const arpMessage = converters.fluidObjToOsc('track1', 'clip1', 1, 2, content.cMajArp);

  it('should have /audiotrack/select', () => {
    const trackSelect = arpMessage.elements[0];
    trackSelect.should.deepEqual({
      address: '/audiotrack/select',
      args: [{ type: 'string', value: 'track1' }], // no way to know if its array or not
    });
  });

  it('should have /midiclip/select', () => {
    const clipSelect = arpMessage.elements[1];
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
    const clipClear = arpMessage.elements[2];
    clipClear.should.deepEqual({
      address: '/midiclip/clear',
    });
  });

  it('should have /midiclip/n messages (x3)', () => {
    const notes = arpMessage.elements.slice(3);
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

  it('Should handle arrays of notes as well as single notes', () => {
    const desiredNoteMessages = [
      converters.createMidiNoteMessage(converters.valueToMidiNoteNumber('e4'), 0, 0.5),
      converters.createMidiNoteMessage(converters.valueToMidiNoteNumber('a4'), 0, 0.5),
      converters.createMidiNoteMessage(converters.valueToMidiNoteNumber('b4'), 0, 0.5),
      converters.createMidiNoteMessage(converters.valueToMidiNoteNumber('c#5')  , 0, 0.5),
    ];

    const result = converters.fluidObjToOsc('supersaw', 'verse', 50, 8, content.noTearsLeftToCryVerse);
    const firstChordMessages = result.elements.slice(3, 7);
    firstChordMessages.should.deepEqual(desiredNoteMessages);
  });
});
