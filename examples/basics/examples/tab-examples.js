const tab = require('../src/tab');

// Transcription of the main synth in the verse of Ariana Grande's No Tears Left
// To Cry. This is described in more detail in my dissertation proposal.
const verse = {
  chords: [
    ['e4', 'a4', 'b4', 'c#5'],
    ['f4', 'g4', 'a4', 'c5'],
    ['g4', 'a4', 'b4', 'd5'],
  ],
  rhythm:  '1e+a2e+a3e+a4e+a',
  pattern: '0-......1-....2.',
};
noTearsVerseNotes = tab.parseTab(verse.rhythm, verse.pattern, verse.chords);

// A minimal drum beat in 4/4
const beat = {
  notes: { k: 36, h: 42, s: 38 }, // general midi drum convention
  r:  '1 + 2 + 3 + 4 + ',
  ks: 'k   s       s k ',
  hh: 'h h h h h h h h ',
};
beatNotes = [
  ...tab.parseTab(beat.r, beat.ks, beat.notes),
  ...tab.parseTab(beat.r, beat.hh, beat.notes),
];

module.exports = {
  noTearsVerseNotes,
  beatNotes,
};
