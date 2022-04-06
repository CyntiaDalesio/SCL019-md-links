const readline = require('readline');
const colors = require('colors/safe');
const functions = require('./functions.js');

const arrayJson = [];
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
  process.stdout.write(colors.blue(`La ruta ingresada es: ${answer}\n`));
  if (answer !== '') {
    functions.existPath(answer).then(() => {
      if (!functions.pathAbsolute(answer)) {
        console.log('la ruta ingresada es RELATIVA. . . se transformará en absoluta');
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
      .then((arrayLink) => {
        console.log('El array1 tiene que el valor:', arrayLink);
        const promiseArr = arrayLink.map((url) => functions.verifityLink(url).then((status) => {
          // if (status) {
          //   urlOk.push(url);
          // } else {
          //   urlNotOk.push(url);
          // }
          arrayJson.push(status);
        })
          .catch((err) => {
            console.log('La ruta  no existe');
            console.log(err);
          }));
        return promiseArr;
      })
      .then((promiseArr) => {
        Promise.all(promiseArr).then(() => {
          // console.log('URLs funcionando ', urlOk);
          // console.log('URLs caidas o sin acceso', urlNotOk);
          // const ArrayLinkWithCode = functions.readJson();
          console.log('El final es:', arrayJson);
        });
        return arrayJson;
      });
    // .then((arrayJson) => {
    //   console.log('El json final es:', arrayJson);
    // });
  } else {
    console.log('No ha ingresado ninguna ruta');
  }

  interfazCaptura.close();
});
