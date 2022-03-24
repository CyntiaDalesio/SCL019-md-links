
const functions = require('./functions.js');
const readline = require('readline');

let interfazCaptura = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
interfazCaptura.question('Ingrese la ruta: ', function (respuesta) {
  let answer = `${respuesta}`;
  console.log(`La ruta ingresada es: ${answer}`);

  // functions.listFile(answer).then(() =>{
  //   console.log('El listado de los archivos es: ',array);
  // } ).catch((err)=>{
  //   console.log('El error es:', err);
  // })

let array = functions.listFile(answer);
console.log(array);
  functions.existFile(answer).then(() => {
    if (!functions.pathAbsolute(answer)) {
      console.log('la ruta ingresada es RELATIVA. . . se transformatá en absoluta');
      answer = functions.pathTransformationAbsolute(answer);
      console.log('absoluta: ', answer);
    }
   
    if (functions.readExtension(answer)) {
      // functions.readFiles(resp);
      console.log('la extension es .md!!');
    } else {
      console.log('el archivo no contiene extension .md');
    }
  }).catch(() => {
    console.log('el archivo no existe');
  })

  interfazCaptura.close();
})