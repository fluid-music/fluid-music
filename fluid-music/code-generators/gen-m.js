const fs = require('fs');
const path = require('path');
const R = require('ramda');
const converters = require('../built/converters');

const octave = (o) => {
  const c = 12 + 12 * o;
  o = (o === -1) ? '' : o;
  return [
    { name: `c${o}`, hz: converters.m2f(c), midi: c },

    { name: `cs${o}`, hz: converters.m2f(c+1), midi: c+1 },
    { name: `df${o}`, hz: converters.m2f(c+1), midi: c+1 },

    { name: `d${o}`, hz: converters.m2f(c+2), midi: c+2 },

    { name: `ds${o}`, hz: converters.m2f(c+3), midi: c+3 },
    { name: `ef${o}`, hz: converters.m2f(c+3), midi: c+3 },

    { name: `e${o}`, hz: converters.m2f(c+4), midi: c+4 },

    { name: `f${o}`, hz: converters.m2f(c+5), midi: c+5 },

    { name: `fs${o}`, hz: converters.m2f(c+6), midi: c+6 },
    { name: `gf${o}`, hz: converters.m2f(c+6), midi: c+6 },

    { name: `g${o}`, hz: converters.m2f(c+7), midi: c+7 },

    { name: `gs${o}`, hz: converters.m2f(c+8), midi: c+8 },
    { name: `af${o}`, hz: converters.m2f(c+8), midi: c+8 },

    { name: `a${o}`, hz: converters.m2f(c+9), midi: c+9 },

    { name: `as${o}`, hz: converters.m2f(c+10), midi: c+10 },
    { name: `bf${o}`, hz: converters.m2f(c+10), midi: c+10 },

    { name: `b${o}`, hz: converters.m2f(c+11), midi: c+11 },
  ];
}

let all = R.range(-1, 10).map(i => octave(i));
all = R.flatten(all).filter((n) => n.midi < 128);

R.find((n) => n.name === 'a0', all).comment = 'Lowest note on piano';
R.find((n) => n.name === 'e1', all).comment = 'Lowest note on bass guitar';
R.find((n) => n.name === 'e2', all).comment = 'Lowest note on guitar';
R.find((n) => n.name === 'c2', all).comment = 'Lowest note on cello';
R.find((n) => n.name === 'g3', all).comment = 'Lowest note on violin';

const out = fs.createWriteStream(path.join(__dirname, '..', 'src', 'm.ts'));
out.write(
`/**
 * Map from note names with octaves to midi pitch numbers. Ex:
 * c: 0,
 * c1: 12,
 * c4: 60,
 * a4: 69,
 * ...etc...
 */
export const m = {
`);

all.forEach((n) => {
  const spaces = R.clamp(0, 4, 4 - n.name.length);
  const pad    = R.repeat(' ', spaces).join('');
  out.write(`  ${n.name}:${pad}${n.midi}, // ${n.hz.toFixed(3)} hz`);
  if (n.comment) out.write(' - ' + n.comment);

  out.write('\n');
});

out.write(`};

export default m;
`);
