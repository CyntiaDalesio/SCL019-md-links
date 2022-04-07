const colors = require('colors/safe');
const functions = require('./functions.js');

const mdLink = (path, options) => {
  console.log('Iniciando');
  return new Promise((resolve, reject) => {
    let answer = '';
    const arrayJson = [];
    let arrayMD = [];
    if (path !== '') {
      functions.existPath(path).then(() => {
        if (!functions.pathAbsolute(path)) {
          console.log('la ruta ingresada es RELATIVA. . . se transformará en absoluta');
          answer = functions.pathTransformationAbsolute(path);
        } else {
          answer = path;
        }
        return answer;
      })
        .then((answer1) => {
          if (!functions.isFile(answer1)) throw new Error('No puede ingresar una carpeta');
          if (functions.verifyExtensionMD(answer1)) {
            arrayMD = functions.read(answer1);
          } else {
            throw new Error('El archivo no tiene extensión .md');
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
        })
        .catch((err) => {
          if (Error.code === 'ENOENT') {
            console.log('Path no encontrada');
          } else {
            console.log(err.message);
          }
        });
    }
  });
};

module.exports = { mdLink };
