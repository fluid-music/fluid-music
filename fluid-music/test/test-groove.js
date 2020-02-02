const fs = require('fs');
const YAML = require('yaml');
const should = require('should');
const mocha = require('mocha');

const converters = require('../src/converters');
const fluid = require('../src/index');
const file = fs.readFileSync('./test/test-content.yaml', 'utf8');
const content = YAML.parse(file);

describe("groove", () => {
    const notes = [
        { n: 42, s: 0, l: 0.125 },
        { n: 42, s: 0.125, l: 0.125 },
        { n: 42, s: 0.25, l: 0.125 },
        { n: 42, s: 0.375, l: 0.125 },
        { n: 42, s: 0.5, l: 0.125 },
        { n: 42, s: 0.625, l: 0.125 },
        { n: 42, s: 0.75, l: 0.125 },
        { n: 42, s: 0.875, l: 0.125 },
    ]

    it('should work with a groove from the groove library', () => {
        const result = fluid.groove.applyGroove(notes, "Heavy Swing");
        result.should.deepEqual([
            { n: 42, s: 0, l: 0.125, v: 64 },
            { n: 42, s: 0.175, l: 0.125, v: 80 },
            { n: 42, s: 0.25, l: 0.125, v: 64 },
            { n: 42, s: 0.425, l: 0.125, v: 80 },
            { n: 42, s: 0.5, l: 0.125, v: 64 },
            { n: 42, s: 0.675, l: 0.125, v: 80 },
            { n: 42, s: 0.75, l: 0.125, v: 64 },
            { n: 42, s: 0.925, l: 0.125, v: 80 }
        ]);
    });

    it('should work with a groove from a groove object', () => {
        const heavy = {
            name: "Heavy Swing",
            oLibrary: {'a': 0, 'b': 0.05},
            vLibrary: {'a':64, 'b': 80}, 
            rhythm     : "1+",
            time       : "ab",
            velocity   : "ab", 
        }

        const result = fluid.groove.applyGroove(notes, heavy);
        result.should.deepEqual([
            { n: 42, s: 0, l: 0.125, v: 64 },
            { n: 42, s: 0.175, l: 0.125, v: 80 },
            { n: 42, s: 0.25, l: 0.125, v: 64 },
            { n: 42, s: 0.425, l: 0.125, v: 80 },
            { n: 42, s: 0.5, l: 0.125, v: 64 },
            { n: 42, s: 0.675, l: 0.125, v: 80 },
            { n: 42, s: 0.75, l: 0.125, v: 64 },
            { n: 42, s: 0.925, l: 0.125, v: 80 }
        ]);
    });

    it('should work when multipliers are provided', () => {
        const result = fluid.groove.applyGroove(notes, "Heavy Swing", {v:2, o: 2, l: 2})
        result.should.deepEqual([
            { n: 42, s: 0, l: 0.125, v: 256 },
            { n: 42, s: 0.325, l: 0.125, v: 320 },
            { n: 42, s: 0.25, l: 0.125, v: 256 },
            { n: 42, s: 0.575, l: 0.125, v: 320 },
            { n: 42, s: 0.5, l: 0.125, v: 256 },
            { n: 42, s: 0.825, l: 0.125, v: 320 },
            { n: 42, s: 0.75, l: 0.125, v: 256 },
            { n: 42, s: 1.075, l: 0.125, v: 320 }
          ]);
    });
    
});