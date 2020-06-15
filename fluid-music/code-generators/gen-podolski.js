const path  = require('path');
const fs    = require('fs');
const tools = require('./tools.js');

let paramNames = require('./data/podolski.js');
let stream     = fs.createWriteStream(path.join(__dirname, '..', 'src/fluid/plugin-podolski.js'));
// stream = process.stdout; // If we wanted to send to stdout

tools.writePluginHelperFile('podolski.64', paramNames, stream);
