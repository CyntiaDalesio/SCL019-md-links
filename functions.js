// importo con un require lo que necesito
let fs = require('fs/promises');
let { constants, readdir, readdirSync, stat, Dirent, Stats, statSync, createReadStream } = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const readline = require('readline')
let arrayLink = [];

function read(file) {
  
  console.log('estoy dentro de read');
  let promise = new Promise((resolve, reject) =>{
    let array = [];
    let lector = readline.createInterface({
      input: createReadStream(file)
    });
    let regular = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

    lector.on("line", linea => {
  
      if (regular.test(linea)) {
        arrayLink = linea.match(regular);
        array.push(arrayLink[0]);// el array tiende a tener 4 posiciones, 1 del linmk completo y las otras del link desmenuzado
  
      }
    }
  
    ).on('close', function(){
      resolve(array);
  });
  
  });
  return promise;
}


// verifico la extension del archivo
const verifyExtensionMD = (resp) => path.extname(resp) === '.md';

// verifico que la ruta sea absoluta
const pathAbsolute = (resp) => path.isAbsolute(resp);

//transformo la ruta relativa en absoluta
const pathTransformationAbsolute = (resp) => path.resolve(resp);

//verifico si la ruta o archivo existe en la computadora

function existPath(resp) {
  return fs.access(resp, constants.R_OK);
}
// listFile me lista los archivos de una carpeta
function listFile(resp) {
  let array = readdirSync(resp);
  return array;
}
// verifico si el path es un archivo
function isFile(resp) {
  var stats = statSync(resp); // metadata
  console.log("Es archivo: ", stats.isFile());
  return stats.isFile();
}

//exporto las funciones que necesito
exports.verifyExtensionMD = verifyExtensionMD;
exports.pathAbsolute = pathAbsolute;
exports.pathTransformationAbsolute = pathTransformationAbsolute;
exports.existPath = existPath;
exports.listFile = listFile;
exports.isFile = isFile;
exports.read = read;