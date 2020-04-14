const fs      = require('fs');
const path    = require('path');
const R       = require('ramda');
const YAML    = require('yaml');
const fluid   = require('fluid-music');
const recipes = require('fluid-recipes');

const kickPath = recipes.fromMars909.kit.k2.path

const yamlFilename = path.join(__dirname, 'content.yaml');
const content = YAML.parse(fs.readFileSync(yamlFilename, 'utf-8'), {merge: true});
const intro = content.intro;

const melody = intro.melody;
intro.bass = recipes.mutators.wiggle(melody, 8);
intro.mallet = R.clone(intro.bass);
intro.mallet.noteLibrary = recipes.library.transposeNoteLibrary(intro.noteLibrary, 24);
intro.kick  = R.repeat(intro.kick, 7);

const section1 = R.clone(intro);
delete section1.kick;
content.score.p.push(section1);

const msg = fluid.score.parse(content.score);

const client = new fluid.Client(9999);
client.send(msg);
client.send(fluid.transport.loop(0, 8 * 4 * 2));
