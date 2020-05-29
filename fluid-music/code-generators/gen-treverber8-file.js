const path  = require('path');
const fs    = require('fs');
const tools = require('./tools');

let paramNames = require('./data/treverber8.js');
let stream     = fs.createWriteStream(path.join(__dirname, '..', 'src/fluid/plugin-treverber8.js'));

tools.writePluginHelperFile('#TReverber8', paramNames, stream);
