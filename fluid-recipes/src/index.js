const samplerFromMars909 = require('./samplerFromMars909');
const fromMars909 = require('./fromMars909');
const cloud = require('./cloud');
const fsHelpers = require('./fs-helpers');
const library = require('./library-recipes');
const mutators = require('./pattern-mutators');

module.exports = {
  cloud,
  samplerFromMars909,
  fsHelpers,
  fromMars909,
  library,
  mutators,
  scores: {
    grandeNoTears: require('./scores/no-tears'),
    mars24kMagic: require('./scores/24k-magic'),
  },
};
