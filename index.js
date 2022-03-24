
const functions = require('./functions.js');
const readline = require('readline');

let arrayMD = []

function extensionFile(file){
  if (functions.readExtension(file)) {
    console.log(`El archivo ${file} tiene extension .md`);
    //  functions.readFiles(file);
    arrayMD.push(file);
  } else {
    console.log(`El archivo ${file} NO tiene extension .md`);
  }
}


let interfazCaptura = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interfazCaptura.question('Ingrese la ruta: ', function (respuesta) {
  let answer = `${respuesta}`;
  console.log(`La ruta ingresada es: ${answer}`);


  functions.existPath(answer).then(() => {
    if (!functions.pathAbsolute(answer)) {
      console.log('la ruta ingresada es RELATIVA. . . se transformatá en absoluta');
      answer = functions.pathTransformationAbsolute(answer);
      console.log('absoluta: ', answer);
    }

    if (!functions.isFile(answer)) {
      console.log('lo ingresado es una CARPETA');
      console.log('Tiene los siguientes archivos');
      let array = functions.listFile(answer);
     
      if (array.length!=0) {
        console.log(array);
        array.forEach(file => {
          extensionFile(file);
        });
        console.log(arrayMD);
        // functions.read(arrayMD[1]);
        arrayMD.forEach(file => {
          functions.read(file);
       });
      // functions.readFiles(arrayMD[0]).then(file => {
      //   console.log(file);
      // })
      } else {
        console.log('El array no tiene archivos');
      }
    } else {

      console.log('lo ingresado es un archivo');
      extensionFile(answer);}
    
  }).catch((err) => {
    console.log('el archivo no existe');
    console.log(err);
  })

  interfazCaptura.close();
})