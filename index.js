#!/usr/bin/env node
const process = require('process');
const { mdLink } = require('./main');

console.log('-------------------iniciando -------------------');
const args = process.argv;

const options = {};
let path = '';

if (args.some((x) => x === '--validate')) {
  options.validate = true;
}
if (args.some((x) => x === '--stats')) {
  options.stats = true;
}
if (args[0] === 'mdLink') {
  path = args[1];
} else {
  path = args[2];
}
mdLink(path, options);
