const path  = require('path');
const fs    = require('fs');
const tools = require('./tools.js');

let paramNames = require('./data/helm-vst2.js');
let stream     = fs.createWriteStream(path.join(__dirname, '..', 'src/fluid/plugin-helm.js'));
// stream = process.stdout; // If we wanted to send to stdout

tools.writePluginHelperFile('helm', paramNames, stream);
