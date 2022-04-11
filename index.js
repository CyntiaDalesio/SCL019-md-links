#!/usr/bin/env node
const { mdLink } = require('./mdLink');

const args = process.argv;

const options = {};
let path;

if (args.some((x) => x === '--validate')) {
  options.validate = true;
}
if (args.some((x) => x === '--stats')) {
  options.stats = true;
}
args[0] === 'mdLink' ? path = args[1] : path = args[2];

mdLink(path, options).then(() => {
  console.log();
}).catch((err) => {
  console.log(err.message);
});
