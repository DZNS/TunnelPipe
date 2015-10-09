#!/usr/bin/env node
'use strict';

var tunnelPipe = require('../lib/tunnelpipe');

console.log("Entering the tunnel");
tunnelPipe.parse(process.argv);
