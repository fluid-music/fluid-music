const should = require('should');
const mocha = require('mocha');
const R = require('ramda');

const mutators        = require('../src/pattern-mutators');
const patternHelpers  = require('../src/pattern-helpers');
const countOnsetChars = patternHelpers.countOnsetChars;
const hasOnsetChar    = patternHelpers.hasOnsetChar;

describe('mutators', () => {
  describe('countOnsetChars', () => {
    it('should return the number of onset chars', () => {
      countOnsetChars('').should.equal(0);
      countOnsetChars('abc').should.equal(3);
      countOnsetChars('a.b-c').should.equal(3);
      countOnsetChars('  c').should.equal(1);
    });
  })

  describe('hasOnsetChar', () => {
    it('should return false if the input has no onset characters', () => {
      const results = R.map(hasOnsetChar, ['.', '-', '_', ' ', '_-. ', '. ', '']);
      R.all(R.identity, results).should.be.false();
    });
    it('should return true if the input has at least one Onset character', () => {
      const results = R.map(hasOnsetChar, ['a', '!.', '-_. a', '🔥']);
      R.all(R.identity, results).should.be.true();
    });
  });

  describe('wiggle', () => {
    it('should fail if the pattern contains no onset characters', () => {
      should(() => { mutators.wiggle('_ -.', 4); }).throw();
      should(() => { mutators.wiggle('.', 4); }).throw();
      should(() => { mutators.wiggle('_', 4); }).throw();
    });

    it('should work', () => {
      mutators.wiggle('abc', 3).should.deepEqual([ 'a-bc', 'ab-c', 'abc-' ]);
    });

    it('should skip over non-onset chars', () => {
      mutators.wiggle('a b. c- d', 4).should.deepEqual([ 'a- b. c- d', 'a b-. c- d', 'a b. c-- d', 'a b. c- d-'])
    });

    it(`should loop around to the beginning when 'n' exceeds number of onset chars`, () => {
      mutators.wiggle('ab-', 4).should.deepEqual([ 'a-b-', 'ab--', 'a-b-', 'ab--' ]);
    });

    it(`should return every possible mutation when no 'n' is supplied`, () => {
      mutators.wiggle('ab- c').should.deepEqual([ 'a-b- c', 'ab-- c', 'ab- c-']);
    });
  });
});

