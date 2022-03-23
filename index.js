
const functions = require('./functions.js');
const readline = require('readline');

let interfazCaptura = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
interfazCaptura.question('Ingrese la ruta: ', function (respuesta) {
  let resp = `${respuesta}`;
  console.log(`La ruta ingresada es: ${resp}`);
  
  functions.existFile(resp).then(() => {
    if (!functions.pathAbsolute(resp)) {
      console.log('la ruta ingresada es RELATIVA. . . se transformatá en absoluta');
      resp = functions.pathTransformationAbsolute(resp);
      console.log('absoluta: ', resp);
    }

    if (functions.readExtension(resp)) {
      // functions.readFiles(resp);
      console.log('la extension es .md!!');
    } else {
      console.log('el archivo no contenia extension .md');
    }
  }).catch(() => {
    console.log('el archivo no existe');
  })

  interfazCaptura.close();
})