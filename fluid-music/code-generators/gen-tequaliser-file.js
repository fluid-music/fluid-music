const path  = require('path');
const fs    = require('fs');
const tools = require('./tools');

let paramNames = require('./data/tequaliser.js');
let stream     = fs.createWriteStream(path.join(__dirname, '..', 'src/fluid/plugin-tequaliser.js'));

tools.writePluginHelperFile('#TEqualiser', paramNames, stream);
