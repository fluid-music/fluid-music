const fs      = require('fs');
const path    = require('path');
const R       = require('ramda');
const YAML    = require('yaml');
const fluid   = require('fluid-music');
const recipes = require('fluid-recipes');

const kickPath = recipes.fromMars909.kit.k2.path

const yamlFilename = path.join(__dirname, 'content.yaml');
const content = YAML.parse(fs.readFileSync(yamlFilename, 'utf-8'));
const score = content.score;

const wiggle = R.pipe(
  R.repeat,
  R.addIndex(R.map)((s, i) => {
    if (R.contains(s[i], '._- ')) return null;
    return R.insert(i+1, '-', s);
  }),
  R.filter(v => v !== null),
  R.map(R.join('')),
);

score.noteLibrary = recipes.library.createMinorScale()
score.noteLibrary = recipes.library.rotate(content.score.noteLibrary, -1);
score.noteLibrary.k = { type: 'file', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/BD D SP 909 09.wav' };
score.noteLibrary.h = { type: 'file', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/CH A SP 909 09.wav' };
score.noteLibrary.H = { type: 'file', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/OH A SP 909 09.wav' };

const melody = score.p[0].melody;
score.p[0].bass = wiggle(melody, 9);
score.p[0].mallet = R.clone(score.p[0].bass);
score.p[0].mallet.noteLibrary = recipes.library.transposeNoteLibrary(score.noteLibrary, 24);
score.p[0].kick = R.repeat(score.p[0].kick, 8);

console.log(score.p[0]);

const msg = fluid.score.parse(score);

const client = new fluid.Client(9999);
client.send(msg);
