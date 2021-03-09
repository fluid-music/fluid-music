# Cybr Client

Fluid music is written in JavaScript. However, under the hood, `fluid-music` interacts with the [cybr server](../../../server), which is responsible for processing audio, hosting VST plugins, and other tasks.

This "`cybr`" client module is used to communicate with the server. It does this through collection of methods that can control the behavior of the server. It is easiest to understand with an example:

```JavaScript
const path  = require('path');
const fluid = require('fluid-music');
const cybr = fluid.cybr;

// Setup some IO filenames
const document = path.join(__dirname, 'test.tracktionedit');
const vox      = path.join(__dirname, 'vox.wav'); // replace with your input file
const voxVerb  = path.join(__dirname, 'vox-verb.wav');

const client = new fluid.Client(9999);
client.send([
  cybr.global.activate(document, true),            // Activate session, creating an empty document
  cybr.audiotrack.select('vox'),                   // Create and select a track named 'vox'
  cybr.audiotrack.insertWav('vox-sample', 0, vox), // Insert and select audio clip in selected track
  cybr.audioclip.fadeInOutSeconds(0.01, 0.5),      // 10ms fade in, 500ms fade out
  cybr.clip.length(1),                             // Trim the audio clip to one second
  cybr.plugin.select('eos', 'vst'),                // Insert the eos vst reverb plugin
  cybr.clip.render(voxVerb, 4),                    // Render the selected clip with 4 second "tail"
  cybr.audiotrack.select('reversed'),              // Create and select a track named "reversed"
  cybr.audiotrack.insertWav('r1', 0, voxVerb),     // Insert and select the newly rendered audio
  cybr.audioclip.reverse(),                        // reverse the selected clip
  cybr.global.save(),                              // Save document (session) file
  cybr.transport.play(),
]);
```

Effectively, each `cybr` method returns an OSC message. Each OSC message instructs the server to perform a task. JavaScript code can control audio processing/playback on the server by sending bundles of these messages to the server.

```JavaScript
// Render a .wav file
client.send(fluid.global.save('~/demo-song.wav'));

// Start Playback from the beginning
client.send([
  fluid.transport.to(0),
  fluid.transport.play(),
]);
```

See the cybr documentation for more details about the methods below.

```JavaScript
// audiotrack:
cybr.audiotrack.select(...)
cybr.audiotrack.insertWav(...)
cybr.audiotrack.selectReturnTrack(...)
cybr.audiotrack.send(...)
cybr.audiotrack.mute(...)
cybr.audiotrack.unmute(...)
cybr.audiotrack.gain(...)
cybr.audiotrack.renderRegion(...)
cybr.audiotrack.removeClips(...)

// clip:
cybr.clip.render(...)
cybr.clip.select(...)
cybr.clip.length(...)
cybr.clip.trimSeconds(...)
cybr.clip.setSourceOffsetSeconds(...)

// audioclip:
cybr.audioclip.reverse(...)
cybr.audioclip.fadeInOutSeconds(...)
cybr.audioclip.fadeIn(...)
cybr.audioclip.fadeOut(...)
cybr.audioclip.gain(...)

// midiclip:
cybr.midiclip.clear(...)
cybr.midiclip.select(...)
cybr.midiclip.note(...)
cybr.midiclip.create(...)

// global:
cybr.global.save(...)
cybr.global.cd(...)
cybr.global.activate(...)

// plugin:
cybr.plugin.select(...)
cybr.plugin.setParamNormalized(...)
cybr.plugin.setParamExplicit(...)
cybr.plugin.setParamNormalizedAt(...)
cybr.plugin.setParamExplicitAt(...)
cybr.plugin.setSideChainInput(...)
cybr.plugin.save(...)
cybr.plugin.load(...)
cybr.plugin.loadTrkpreset(...)
cybr.plugin.addpath(...)

// sampler:
cybr.sampler.add(...)
cybr.sampler.clearAll(...)

// transport:
cybr.transport.play(...)
cybr.transport.stop(...)
cybr.transport.loop(...)
cybr.transport.to(...)
```
