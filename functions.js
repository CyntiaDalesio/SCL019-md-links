// importo con un require lo que necesito
let fs = require('fs/promises');
let { constants, readdir, readdirSync, stat, Dirent, Stats, statSync,createReadStream } = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const readline = require('readline')

// function readFiles(resp){
//   console.log('toy dentro de readfiles');
//     fs.readFile(resp,'UTF-8',(err,data)=>{
//       console.log('HOLA');
//         if(err){
//             console.log('el error es:', err);
//         }
//         console.log('El archivo contenia las siguientes lineas');
//         // console.log(data.toString());
//         console.log(data);
        //expresion regular para obtener link
        // let regular = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;
        // let arrayLink = [];
    
          // let lector = readline.createInterface({
          //   input: fs.createReadStream(NOMBRE_ARCHIVO)
          // });
          
          // lector.on("line", linea => {
          //   console.log("Tenemos una línea:", linea);
          //   if (linea.match().regular) {
          //     arrayLink.push(linea);
          //   } else {
              
          //   }
          // });
        
//         })
// }
function read(file){ 
let lector = readline.createInterface({
    input: createReadStream(file)
  });
  console.log('estoy dentro de read');
  lector.on("line", linea => {
    console.log("Tenemos una línea:", linea);
  let regular = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;

    if (regular.test(linea)) {
      arrayLink.push(linea);
      console.log('linea: ', linea);
    } else {
      console.log('entro en el else');
    }
  });
}
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
// exports.readFiles= readFiles;
exports.read= read;