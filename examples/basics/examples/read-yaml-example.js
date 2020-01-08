const util = require('util');
const fs  = require('fs');
const YAML = require('yaml');

const file = fs.readFileSync('basics.yaml', 'utf8');
const result = YAML.parse(file);

console.log(util.inspect(result, {showHidden: false, depth: null, colors: true}));
