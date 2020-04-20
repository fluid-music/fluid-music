const noteLibRecipes = require('../src/library-recipes');
const should = require('should');
const mocha = require('mocha');

describe('noteLibrary recipes', () => {
  describe('rotate', () => {
    it('should point each key to the subsequent key\'s value', () => {
      const noteLib = {b:2, c: 3, a: 1};
      const result = noteLibRecipes.rotate(noteLib);
      result.should.deepEqual({ a: 2, b:3, c:1 });
    });
    it('should work with negative step values', () => {
      const noteLib = {b:2, c: 3, a: 1};
      const result = noteLibRecipes.rotate(noteLib, -1);
      result.should.deepEqual({ a: 3, b: 1, c: 2 });
    });
    it('should leave the input unchanged when the 2nd arg is 0', () => {
      const noteLib = {b:2, c: 3, a: 1};
      const result = noteLibRecipes.rotate(noteLib, 0);
      result.should.deepEqual(noteLib);
    });
  });
});
