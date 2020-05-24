#!/usr/bin/env node

const path = require('path');
const fluid = require('fluid-music');
const recipes = require('../');

const sessionPath = path.join(__dirname, 'sessions/groove.tracktionedit')

const nLibrary = { h: 42, k: [36, 42] };

const r   = '1+2+3+4+'; // main rhythm
const hat = 'khhhhhhh';

const session = fluid.score.parse({
  nLibrary, r, hat,
});

const hatClip = session.tracks.hat.clips[0];
hatClip.notes = fluid.groove.applyGroove(hatClip.notes, "Heavy Swing", {v:2,o:2,l:2});

const client = new fluid.Client(9999);
client.send([
  fluid.global.activate(sessionPath, true),
  fluid.audiotrack.select('hat'),
  recipes.samplerFromMars909,
  fluid.score.tracksToFluidMessage(session.tracks),
  fluid.transport.loop(0, session.duration),
  fluid.global.save(sessionPath),
]);
