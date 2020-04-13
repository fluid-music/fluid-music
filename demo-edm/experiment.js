const fs      = require('fs');
const path    = require('path');
const R       = require('ramda');
const YAML    = require('yaml');
const fluid   = require('fluid-music');
const recipes = require('fluid-recipes');

const kickPath = recipes.fromMars909.kit.k2.path

const yamlFilename = path.join(__dirname, 'content.yaml');
const content = YAML.parse(fs.readFileSync(yamlFilename, 'utf-8'));

const wiggle = R.pipe(
  R.repeat,
  R.addIndex(R.map)((s, i) => {
    if (R.contains(s[i], '._- ')) return null;
    return R.insert(i+1, '-', s);
  }),
  R.filter(v => v !== null),
  R.map(R.join('')),
);

content.score.noteLibrary = recipes.library.createMinorScale()
content.score.noteLibrary = recipes.library.rotate(content.score.noteLibrary, -1);
content.score.noteLibrary.k = { type: 'file', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/BD D SP 909 09.wav' };
content.score.noteLibrary.h = { type: 'file', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/CH A SP 909 09.wav' };
content.score.noteLibrary.H = { type: 'file', path: 'SP 909 From Mars/WAV/02. Kits/01. 909 Standard Kit/OH A SP 909 09.wav' };

const tracks = fluid.score.buildTracks(content.score);
const msg = fluid.score.parse(content.score);

const client = new fluid.Client(9999);
client.send(msg);
