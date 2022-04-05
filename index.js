const readline = require('readline');
const colors = require('colors/safe');
const functions = require('./functions.js');

let array1 = [];
const urlOk = [];
const urlNotOk = [];
const interfazCaptura = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interfazCaptura.question('Ingrese la ruta: ', (respuesta) => {
  let answer = '';
  let arrayMD = [];
  answer = `${respuesta}`;
  // console.log(`La ruta ingresada es: ${answer}`);
  process.stdout.write(colors.blue(`La ruta ingresada es: ${answer}\n`));
  if (answer !== '') {
    functions.existPath(answer).then(() => {
      if (!functions.pathAbsolute(answer)) {
        console.log('la ruta ingresada es RELATIVA. . . se transformatá en absoluta');
        answer = functions.pathTransformationAbsolute(answer);
        console.log('absoluta: ', answer);
      }
      return answer;
    })
      .then(() => {
        if (!functions.isFile(answer)) throw new TypeError(console.log('No puede ingresar una carpeta'));

        console.log('lo ingresado es un archivo');
        if (functions.verifyExtensionMD(answer)) {
          arrayMD = functions.read(answer);
        }

        return arrayMD;
      })
      .then((array2) => {
        console.log('El array1 tiene que el valor:', array2);
      })
      .catch((err) => {
        console.log('La ruta  no existe');
        console.log(err);
      });
  } else {
    console.log('No ha ingresado ninguna ruta');
  }

  interfazCaptura.close();
});
