const colors = require('colors/safe');
const functions = require('./functions.js');

function mdLink(path, args) {
  let answer = '';
  const arrayJson = [];
  let arrayMD = [];
  if (path !== '') {
    functions.existPath(path).then(() => {
      if (!functions.pathAbsolute(path)) {
        console.log('la ruta ingresada es RELATIVA. . . se transformará en absoluta');
        answer = functions.pathTransformationAbsolute(path);
      }
      return answer;
    })
      .then(() => {
        if (!functions.isFile(answer)) throw new TypeError(console.log('No puede ingresar una carpeta'));
        if (functions.verifyExtensionMD(answer)) {
          arrayMD = functions.read(answer);
        }

        return arrayMD;
      })
      .then((arrayLink) => {
        const promiseArr = arrayLink.map((url) => functions.verifityLink(url).then((status) => {
          arrayJson.push(status);
        })
          .catch((err) => {
            console.log('La ruta  no existe');
            console.log(err);
          }));
        return Promise.all(promiseArr);
      })
      .then(() => {
        let countValid = 0;
        let countInvalid = 0;
        if (args[3] === '--validate' && args[2] === '--stats') {
          arrayJson.forEach((e) => {
            if (e.status) {
              countValid += 1;
            } else {
              countInvalid += 1;
            }
          });
          console.log(colors.yellow('link encontrados:', arrayJson.length));
          console.log(colors.green('link validos:', countValid));
          console.log(colors.red('link rotos:', countInvalid));
          arrayJson.forEach((e) => {
            if (e.status) {
              console.log(colors.green(`Link: ${e.linkname} Status: ${e.status}`));
            } else {
              console.log(colors.red(`Link: ${e.linkname} Status: ${e.status}`));
            }
          });
        } else {
          switch (args[2]) {
            case '--stats':
              console.log(colors.yellow('link encontrados:', arrayJson.length));
              arrayJson.forEach((e) => {
                if (e.status) {
                  countValid += 1;
                } else {
                  countInvalid += 1;
                }
              });
              console.log(colors.green('link validos:', countValid));
              console.log(colors.red('link rotos:', countInvalid));

              break;
            case '--validate':
              arrayJson.forEach((e) => {
                if (e.status) {
                  console.log(colors.green(`Link: ${e.linkname} Status: ${e.status}`));
                } else {
                  console.log(colors.red(`Link: ${e.linkname} Status: ${e.status}`));
                }
              });
              break;
            default:
              break;
          }
        }
      });
  }
  console.log('No ha ingresado ninguna ruta');
}
module.exports = { mdLink };
