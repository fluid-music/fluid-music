const path = require('path');
const fluid = require('fluid-music');
const recipes = require('fluid-recipes');
const _ = require('underscore');

const fsHelpers = recipes.fsHelpers;

// First, run ./template.js, which activates the base session. 
// Then run this, which assumes that a session was already activated.

const sessionFilename = path.join(__dirname, 'sessions/scx.tracktionedit');
const baseDir = '/Users/charles/projects/reaper/sounds/';

async function run() {
  const wavCollections = await fsHelpers.wavFilesInFolderGroups(baseDir);

  const files = _.range(160).map(i => {
    let collection = wavCollections[i % wavCollections.length];
    return fluid.random.choice(collection);
  });

  const client = new fluid.Client(9999);
  client.send([
    fluid.audiotrack.select('Track 1'),
    fluid.audiotrack.removeClips(),
  ]);

  let t = 0;
  files.forEach((filename, i) => {
    t = i / 3;
    const shortName = path.basename(filename);
    console.log('send:', t.toFixed(2), shortName);
    client.send([
      fluid.audiotrack.select('Track 1'),
      fluid.audiotrack.insertWav(shortName, t, filename),
      fluid.clip.length(1),
      fluid.audioclip.fadeInOutSeconds(0.01, 0.01),
    ]);
  });
  client.send([
    fluid.transport.loop(0, t),
    fluid.global.save(sessionFilename),
  ]);
}

run().then(result => {
  console.log('Done!');
});
