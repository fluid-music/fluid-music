const fs      = require('fs');
const path    = require('path');
const _       = require('underscore');
const YAML    = require('yaml');
const fluid   = require('fluid-music');
const recipes = require('fluid-recipes');

const yamlFilename = path.join(__dirname, 'content.yaml');
const content = YAML.parse(fs.readFileSync(yamlFilename, 'utf-8'));
console.log(content);

const kickPath     = recipes.fromMars909.kit.k2.path
console.log('kick path:', kickPath);


const bass = fluid.tab.parse(content);

const msg = [
  fluid.audiotrack.select('kick'),
  fluid.audiotrack.removeClips(),
  _.range(10).map((i) => fluid.audiotrack.insertWav('k'+i, i, kickPath)),
  fluid.audiotrack.select('bass'),
  fluid.midiclip.create('bass', 0, 8, bass),
  fluid.transport.loop(0, 8),
];

const client = new fluid.Client(9999);
client.send(msg);
