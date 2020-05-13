const Client = require('../src/FluidClient');
const fluid  = require('../src/fluid/index');

// Setup some IO filenames
const path = require('path');
const document = path.join(__dirname, '/test.tracktionedit');
const vox      = path.join(__dirname, 'vox.wav'); // replace with your input file
const voxVerb  = path.join(__dirname, '/vox-verb.wav');

const client = new Client(9999);
client.send([
  fluid.global.activate(document, true),
  fluid.audiotrack.select('vox'),                   // Create and select a track named 'vox'
  fluid.audiotrack.insertWav('vox-sample', 0, vox), // Insert and select audio clip in selected track
  fluid.audioclip.fadeInOutSeconds(0.01, 0.5),      // 10ms fade in, 500ms fade out
  fluid.clip.length(1),                             // Trim the audio clip to one second
  fluid.plugin.select('eos', 'vst'),                // Insert the eos vst reverb plugin
  fluid.clip.render(voxVerb, 4),                    // Render the selected clip with 4 second "tail"
  fluid.audiotrack.select('reverse-reverb'),        // Create and select a track named "new track"
  fluid.audiotrack.insertWav('r1', 0, voxVerb),     // Insert the newly render audio
  fluid.audioclip.reverse(),                        // reverse the selected clip
  fluid.global.save(),                              // Save document (session) file
]);
