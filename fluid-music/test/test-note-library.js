const should = require('should');
const mocha = require('mocha');
const noteLibrary = require('../src/note-library');

describe('eventLibrary.merge', () => {
  const a1 = [0, 1];
  const a2 = [2, 3];
  const a3 = [4, 5];

  const o1 = {a: 'a'};
  const o2 = {b: 'b'};
  const o3 = {b: 'b', c: 'c', 0: 'zero'};

  it('should be able to merge two objects', () => {
    const result = {a: 'a', b: 'b'};
    noteLibrary.merge(o1, o2).should.deepEqual(result);
  });

  it('should merge an array and two objects', () => {
    const result = {'0':0, '1':1, a:'a', b:'b'};
    noteLibrary.merge(a1, o1, o2).should.deepEqual(result);
  });

  it('should throw when there is an overlap', () => {
    should.throws(() => {noteLibrary.merge(a1, a2)}, `merged ${a1} and ${a2} without an error}`)
    should.throws(() => {noteLibrary.merge(a2, a3)}, `merged ${a2} and ${a3} without an error}`);
    should.throws(() => {noteLibrary.merge(o2, o3)}, `merged ${o2} and ${o3} without an error}`);
    should.throws(() => {noteLibrary.merge(a3, o3)}, `merged ${o3} and ${a3} without an error}`);
  });
});
