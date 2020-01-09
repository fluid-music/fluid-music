const fluid = require('./fluidOsc');

module.exports.tab = require('./tab');
module.exports.converters = require('./converters');
module.exports.Client = require('./FluidClient');

Object.assign(module.exports, fluid);
