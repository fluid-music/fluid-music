const path  = require('path');
const fs    = require('fs');
const tools = require('./tools.js');

let paramNames = require('./data/dragonfly-reverb/room.js');
let stream     = fs.createWriteStream(path.join(__dirname, '..', 'src', 'fluid', 'plugin-dragonfly-room.js'));
// stream = process.stdout; // If we wanted to send to stdout

tools.writePluginHelperFile('DragonflyRoomReverb-vst', paramNames, stream);
