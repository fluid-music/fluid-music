#!/usr/bin/env node

const path = require('path');
const fluid = require('fluid-music');

const filename = path.join(__dirname, 'sessions/demo.tracktionedit');
const client = new fluid.Client(9999);

client.send(fluid.global.save(filename, false));
