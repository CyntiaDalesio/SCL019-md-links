const colors = require('colors/safe');
const fs = require('fs/promises');
const {
  constants, statSync, createReadStream,
} = require('fs');
const path = require('path');
const readline = require('readline');
const http = require('http');
const url = require('url');

let arrayLink = [];
function stats(array) {
  let countValid = 0;
  let countInvalid = 0;
  array.forEach((e) => {
    if (e.status) {
      countValid += 1;
    } else {
      countInvalid += 1;
    }
  });
  console.log(colors.yellow('link encontrados:', array.length));
  console.log(colors.green('link validos:', countValid));
  console.log(colors.red('link rotos:', countInvalid));
}
function validate(array) {
  array.forEach((e) => {
    if (e.status) {
      console.log(colors.green(`Link: ${e.linkname} Status: ${e.status}`));
    } else {
      console.log(colors.red(`Link: ${e.linkname} Status: ${e.status}`));
    }
  });
}
function verifityLink(link) {
  return new Promise((resolve) => {
    const options = {
      method: 'HEAD',
      host: url.parse(link).host,
      port: 80,
      path: url.parse(link).pathname,
    };

    const req = http.request(options, (res) => {
      const nuevaData = {
        linkname: link,
        Code: res.statusCode,
        status: res.statusCode <= 399,
      };
      resolve(nuevaData);
    });

    req.on('error', (error) => {
      // console.error(error);
      const newData = {
        linkname: link,
        status: false,
      };
      resolve(newData);
    });

    req.end();
  });
}

function read(file) {
  const promise = new Promise((resolve) => {
    const array = [];
    const lector = readline.createInterface({
      input: createReadStream(file),
    });
    const regular = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

    lector.on('line', (linea) => {
      if (regular.test(linea)) {
        arrayLink = linea.match(regular);
        array.push(arrayLink[0]);
      }
    }).on('close', () => {
      resolve(array);
    });
  });
  return promise;
}

// verifico la extension del archivo
const verifyExtensionMD = (resp) => path.extname(resp) === '.md';

// verifico que la ruta sea absoluta
const pathAbsolute = (resp) => path.isAbsolute(resp);

// transformo la ruta relativa en absoluta
const pathTranfAbsolute = (resp) => path.resolve(resp);

// verifico si la ruta o archivo existe en la computadora

function existPath(resp) {
  return fs.access(resp, constants.R_OK);
}
// verifico si el path es un archivo
function isFile(resp) {
  const stat = statSync(resp); // metadata
  return stat.isFile();
}

// exporto las funciones que necesito
exports.verifyExtensionMD = verifyExtensionMD;
exports.pathAbsolute = pathAbsolute;
exports.pathTranfAbsolute = pathTranfAbsolute;
exports.existPath = existPath;
exports.isFile = isFile;
exports.read = read;
exports.verifityLink = verifityLink;
exports.validate = validate;
exports.stats = stats;
