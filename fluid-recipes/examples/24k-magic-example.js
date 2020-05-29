#!/usr/bin/env node

const path    = require('path');
const fluid   = require('fluid-music');
const recipes = require('../');

const chorus  = recipes.scores.mars24kMagic.chorus;

const sessionPath = path.join(__dirname, 'sessions', '24kmagic.tracktionedit');
const session = fluid.score.parse(chorus);

const client = new fluid.Client();
client.send([
  fluid.global.activate(sessionPath, true),
  fluid.audiotrack.select('synth'),
  fluid.plugin.select('zebra2'),
  fluid.score.tracksToFluidMessage(session.tracks),
  fluid.transport.loop(0, session.duration),
  fluid.global.save(),
]);
