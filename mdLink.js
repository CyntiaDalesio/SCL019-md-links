const colors = require('colors/safe');
const functions = require('./functions.js');

const mdLink = (path, options) => {
  console.log();
  return new Promise((resolve) => {
    let answer = '';
    let arrayMD = [];
    if (path !== undefined) {
      functions.existPath(path).then(() => {
        !functions.pathAbsolute(path) ? answer = functions.pathTransformationAbsolute(path) : answer = path;
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
        }).then((arrayLink) => {
          const promiseArr = arrayLink.map((url) => functions.verifityLink(url));
          return Promise.all(promiseArr);
        })
        .then((arrayJson) => {
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
          console.log(err);
          if (err.code === 'ENOENT') {
            console.log('Path no encontrada');
          } else {
            console.log(err.message);
          }
        });
    } else {
      console.log('no ingresó ruta');
    }
  });
};

module.exports = { mdLink };
