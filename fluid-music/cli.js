#!/usr/bin/env node

const fluid = require('./src/index.js');
const args = process.argv.slice(2);

console.log(args);
console.log(Object.keys(fluid));

