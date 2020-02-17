const path = require('path');
const fluid = require('fluid-music');
const _ = require('underscore');

const sessionFilename = path.join(__dirname, 'sessions/prior-to-2013.tracktionedit');
const baseDir = '/Users/charles/projects/reaper/sounds/';

async function run() {
  const subDirs = await fluid.fs.getDirsIn(baseDir);
  console.log(subDirs);
  let wavCollections = await Promise.all(subDirs.map(fluid.fs.getWavFilesIn));
  wavCollections = wavCollections.filter((collection, i) => {
    if (collection && collection.length) return true;
    console.log('No wav files found:', subDirs[i]);
    return false;
  });

  const files = _.range(60).map(i => {
    let collection = wavCollections[i % wavCollections.length];
    return fluid.random.choice(collection);
  });

  let t = 0;
  const client = new fluid.Client(9999);
  client.send(fluid.global.activate(sessionFilename, true));
  files.forEach((filename) => {
    const shortName = path.basename(filename);
    console.log('send:', t, shortName);
    client.send([
      fluid.audiotrack.select('Track 1'),
      fluid.audiotrack.insertWav(shortName, t/3, filename),
      fluid.clip.length(1),
      fluid.audioclip.fadeInOutSeconds(0.01, 0.01),
    ]);
    t += 1;
  });

  client.send(fluid.global.save());
}

run().then(result => {
  console.log('Done!');
});
