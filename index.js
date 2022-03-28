
const functions = require('./functions.js');
const readline = require('readline');

let answer = '';
let arrayMD = [];

let interfazCaptura = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interfazCaptura.question('Ingrese la ruta: ', function (respuesta) {
  answer = `${respuesta}`;
  console.log(`La ruta ingresada es: ${answer}`);
  //   interfazCaptura.close();
  // })

  if (answer != '') {
    functions.existPath(answer).then(() => {
      if (!functions.pathAbsolute(answer)) {
        console.log('la ruta ingresada es RELATIVA. . . se transformatá en absoluta');
        answer = functions.pathTransformationAbsolute(answer);
        console.log('absoluta: ', answer);
      }
      return answer;


    }).then((answer) => {

      if (!functions.isFile(answer)) throw new TypeError();

      console.log('lo ingresado es un archivo');
      if (functions.verifyExtensionMD(answer)) {
        arrayMD = functions.read(answer);
      }

      return arrayMD;
    })
      .then((arrayMD) => {
        console.log('El arrayMD del then es:', arrayMD);
      }).catch((err) => {
        console.log('La ruta  no existe');
        console.log(err);
      })
  }


  interfazCaptura.close();
})