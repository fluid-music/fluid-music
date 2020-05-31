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
  fluid.audiotrack.selectReturnTrack('short reverb'),
  recipes.presets.tReverber8.shortReverb(),

  fluid.audiotrack.select('synth'),
  fluid.pluginZebra2Vst2.select(),
  fluid.pluginZebra2Vst2.setDelay1Mix(0),
  fluid.audiotrack.send('short reverb', -13),

  fluid.audiotrack.select('kick'),
  fluid.pluginTEqualiser.select(),

  // Tighten the kick drum by cutting some low mids...
  fluid.pluginTEqualiser.setBand1(230, -4.4, 1.8),
  // ..and boosting the highs with a shelf
  fluid.pluginTEqualiser.setBand8(3000, 1.5, 1),
  fluid.pluginTEqualiser.setBand8Shape(fluid.pluginTEqualiser.shape.highShelf),

  fluid.score.tracksToFluidMessage(session.tracks),
  fluid.transport.loop(0, session.duration),
  fluid.global.save(),
]);
