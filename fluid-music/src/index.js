const fluid = require('./fluidOsc');
const drumTrack909 = require('../recipes/drumTrack909');

module.exports = fluid;
module.exports.tab = require('./tab');
module.exports.converters = require('./converters');
module.exports.Client = require('./FluidClient');
module.exports.recipes = { drumTrack909 } ;
