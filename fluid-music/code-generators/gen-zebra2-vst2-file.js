const path  = require('path');
const fs    = require('fs');
const tools = require('./tools');

let paramNames = require('./data/zebra2-vst2.js');
let stream     = fs.createWriteStream(path.join(__dirname, '..', 'src/fluid/plugin-zebra2-vst2.js'));

tools.writePluginHelperFile('Zebra2', paramNames, stream);
