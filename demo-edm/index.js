const _ = require('underscore');
const fluid = require('fluid-music');
const recipes = require('fluid-recipes');

const kickPath = recipes.fromMars909.kit.k2.path
console.log('kickpath', kickPath);

const msg = [
  fluid.audiotrack.select('kick hi ho it is off to work we go hahahaha'),
  _.range(10).map((i) => fluid.audiotrack.insertWav('k'+i, i, kickPath)),
];


console.log(msg);
const client = new fluid.UdpClient(9999);
client.send(msg);
