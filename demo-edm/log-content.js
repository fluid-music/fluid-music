const fs      = require('fs');
const path    = require('path');
const YAML    = require('yaml');
const file    = path.join(__dirname, 'content.yaml');
const content = YAML.parse(fs.readFileSync(file, 'utf-8'));

console.log(content);
