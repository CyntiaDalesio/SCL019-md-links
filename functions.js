const fs = require('fs/promises');
const {
  constants, readdirSync, statSync, createReadStream,
} = require('fs');
const path = require('path');
const readline = require('readline');
const http = require('http');
const url = require('url');

let arrayLink = [];

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
  console.log('estoy dentro de read');
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
const pathTransformationAbsolute = (resp) => path.resolve(resp);

// verifico si la ruta o archivo existe en la computadora

function existPath(resp) {
  return fs.access(resp, constants.R_OK);
}
// listFile me lista los archivos de una carpeta
function listFile(resp) {
  const array = readdirSync(resp);
  return array;
}
// verifico si el path es un archivo
function isFile(resp) {
  const stats = statSync(resp); // metadata
  console.log('Es archivo: ', stats.isFile());
  return stats.isFile();
}

// exporto las funciones que necesito
exports.verifyExtensionMD = verifyExtensionMD;
exports.pathAbsolute = pathAbsolute;
exports.pathTransformationAbsolute = pathTransformationAbsolute;
exports.existPath = existPath;
exports.listFile = listFile;
exports.isFile = isFile;
exports.read = read;
exports.verifityLink = verifityLink;
