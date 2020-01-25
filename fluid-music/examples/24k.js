#!/usr/bin/env node

const fluid = require('../src/index');
const FluidClient = require('../src/FluidClient');
const tab = require('../src/tab');
const path = require('path');
const drums909 = require('../recipes/track-drums909');
const drumTrackName = '909';
const drumsMsg = drums909(drumTrackName);

const sessionPath = path.join(__dirname, 'sessions/24kmagic.tracktionedit')

const build =   '0-..1-..2-......'
const BbChord = '0-.0............'
const FmChord = '3-.3............'
const Bb_extended_Chord='0-.0....4-..5-..'
const chorus_notes = {
    noteLibrary: [
        ['Bb4', 'Db5', 'F5', 'Bb5'], //Bbm
        ['Ab4', 'C5', 'Eb5', 'G5'], //Cm
        ['Db5', 'F5', 'Ab5'], //Db
        ['F5', 'Ab5', 'C6'], //Fm
        ['Gb5', 'Bb5', 'Db6'], //Gb
        ['Eb5', 'Gb5', 'Bb5'], //Ebm
    ],
    r: '1e+a2e+a3e+a4e+a',
    p: [build, FmChord, 
        BbChord, FmChord,
        BbChord, FmChord,
        Bb_extended_Chord, FmChord]
}

const rhythm =         '1e+a2e+a3e+a4e+a'
const drum_build_hihat='hhhhhhhhhhhh....'
const drum_build_bass ='k---k---k---....'
const drum_build_sna  ='............s---'
const drum_build_tom  ='............t---'
const drum_build = {drum_build_hihat, drum_build_bass, drum_build_sna, drum_build_tom}

const drum_rep_hihat  ='o---h-h-h-hhh-h-'
const drum_rep_snare  ='....s-......s-..'
const drum_rep_basshp ='k---p-k-kk--....'
const drum_rep = {drum_rep_hihat, drum_rep_snare, drum_rep_basshp}

const drum_mid1_hihat  ='h-h-h-hhh-hhh-h-'
const drum_mid1_snare  ='....s-.....ss-..'
const drum_mid1_basshp ='k---...kk---....'
const drum_mid1 = {drum_mid1_hihat, drum_mid1_snare, drum_mid1_basshp}

const drum_mid2_hihat  ='h-h-h-hhh-hhh-h-'
const drum_mid2_snare  ='....s-......s-..'
const drum_mid2_basshp ='k---...kk---....'
const drum_mid2 = {drum_mid2_hihat, drum_mid2_snare, drum_mid2_basshp}

const drum_end_hihat  ='o---....o---o---'
const drum_end_basshp ='k-p-....k-p-k-p-'
const drum_end = {drum_end_hihat, drum_end_basshp}

const drums_notes = {
    noteLibrary: {k: 36, h: 42, s: 38, S: 40, c: 49, t: 41, o:46, p:44},
    r: rhythm,
    p: [drum_build, drum_rep, 
        drum_mid2, drum_rep,
        drum_mid1, drum_rep,
        drum_mid2, drum_rep,
        drum_end]
}

const chorus_parsed = tab.parse(chorus_notes);
const drums_parsed = tab.parse(drums_notes);

const client = new FluidClient(9999);
client.send([
    fluid.global.activate(sessionPath),
    fluid.audiotrack.select('chorus'),
    fluid.global.cd('~/Library/Application Support/Tracktion/Waveform/Presets/'),
    fluid.plugin.load('4OSC Saw Lead'),
    fluid.midiclip.create('v1.1', 0, 8*4, chorus_parsed)
]);
client.send([
    ...drumsMsg,
    fluid.midiclip.create('drums', 0, 4*9, drums_parsed),
    fluid.global.save(sessionPath)
]);
