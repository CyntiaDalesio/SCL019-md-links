#!/usr/bin/env node
const { mdLink } = require('./mdLink');

const args = process.argv;

const options = {};

if (args.some((x) => x === '--validate')) {
  options.validate = true;
}
if (args.some((x) => x === '--stats')) {
  options.stats = true;
}
const path = args[0] === 'mdLink' ? args[1] : args[2];

mdLink(path, options).then(() => {
  console.log();
}).catch((err) => {
  console.log(err.message);
});
