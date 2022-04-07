const colors = require('colors/safe');
const functions = require('./functions.js');

const mdLink = function (path, options = {}) {
  return new Promise((resolve) => {
    let answer = '';
    const arrayJson = [];
    let arrayMD = [];
    if (path !== '') {
      functions.existPath(path).then(() => {
        console.log('path linea 1', path);
        if (!functions.pathAbsolute(path)) {
          console.log('la ruta ingresada es RELATIVA. . . se transformará en absoluta');
          answer = functions.pathTransformationAbsolute(path);
        } else {
          answer = path;
        }
        return answer;
      })
        .then((answer1) => {
          if (!functions.isFile(answer1)) throw new TypeError(console.log('No puede ingresar una carpeta'));
          if (functions.verifyExtensionMD(answer1)) {
            arrayMD = functions.read(answer1);
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
          if (options.validate && options.stats) {
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
            if (options.stats) {
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
            }
            if (options.validate) {
              arrayJson.forEach((e) => {
                if (e.status) {
                  console.log(colors.green(`Link: ${e.linkname} Status: ${e.status}`));
                } else {
                  console.log(colors.red(`Link: ${e.linkname} Status: ${e.status}`));
                }
              });
            }
          }
          resolve(arrayJson);
        });
    }
  });
};
module.exports = { mdLink };
