const fluid = require('./fluidOsc');

module.exports.tab = require('./tab');
module.exports.converters = require('./converters');
module.exports.Client = require('./FluidClient');
module.exports.recipes = {
  drumTrack909: require('../recipes/drumTrack909'),
};

Object.assign(module.exports, fluid);
