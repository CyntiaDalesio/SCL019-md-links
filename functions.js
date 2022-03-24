// importo con un require lo que necesito
let fs = require('fs/promises');
let { constants, readdir, readdirSync, stat, Dirent, Stats, statSync } = require('fs');
const path = require('path');
//function para leer la ruta que ingreso

// function readFiles(resp){
//     fs.readFile(resp,function(err,data){

//         if(err){
//             console.log('el error es:', err);
//         }
//         console.log('El archivo contenia las siguientes lineas');
//         console.log(data.toString());

//         });
// }
// verifico la extension del archivo
const readExtension = (resp) => path.extname(resp) === '.md';

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
// const isFile = (resp)  => Dirent(new Dirent(resp)).isFile();
function isFile(resp) {
var stats =statSync(resp); // metadata
console.log("Es archivo: ",stats.isFile());
return stats.isFile();
}

//exporto las funciones que necesito
exports.readExtension = readExtension;
exports.pathAbsolute = pathAbsolute;
exports.pathTransformationAbsolute = pathTransformationAbsolute;
exports.existPath = existPath;
exports.listFile = listFile;
exports.isFile = isFile;