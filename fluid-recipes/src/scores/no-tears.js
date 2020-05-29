const fluid    = require('fluid-music');
const fromMars = require('../fromMars909');

const verseChords = fluid.eventLibrary.stringsToNoteNumbers([
  ['e4', 'a4', 'b4', 'c#5'],
  ['f4', 'g4', 'a4', 'c5' ],
  ['g4', 'a4', 'b4', 'd5' ],
]);

const verse = {
  nLibrary: verseChords,
  r:        '1e+a2e+a3e+a4e+a',
  chords:   '0-......1-....2.',
  drums : {
    nLibrary: fromMars.nLibrary,
    kick:  ['k   .   .   .   ', 'k   .   .   . kk'],
  },
  // An alternative way to do drums
  // drums: [
  //   { kick: 'k               '},
  //   { kick: 'k             kk'},
  // ],
};

module.exports = {
  verse,
}
