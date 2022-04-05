const functions = require('../functions.js');

const st2 = 'hola.txt';
const st3 = 'C:\\Users\\Cyntia\\Desktop\\LABORATORIA\\Md-Link\\SCL019-md-links\\hola\\otraCarpeta.md';
const st = 'README.md';
const path = 'C:\\Users\\Cyntia\\Desktop\\LABORATORIA\\Md-Link\\SCL019-md-links\\README.md';
const pathLink = 'C:\\Users\\Cyntia\\Desktop\\LABORATORIA\\Md-Link\\SCL019-md-links\\hola\\readmeExample.md';
const arrayMD = ['https://lineadecodigo.com/javascript/extraer-partes-una-url-javascript/',
  'https://parzibyte.me/blog/2018/12/27/leer-archivo-node-js-fs-readline/',
  'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/concat',
  'https://www.geeksforgeeks.org/javascript-match-function/',
  'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/then'];
// Test de readExtension
describe('La función verifyExtensionMD ', () => {
  it('Devuelve true si la extension del archivo es .md', () => {
    expect(functions.verifyExtensionMD(st)).toBe(true);
  });

  it('Devuelve false si la extension del archivo no es .md', () => {
    expect(functions.verifyExtensionMD(st2)).toBe(false);
  });
});
// Test de pathTransformationAbsolute
describe('La función pathTransformationAbsolute ', () => {
  it(`Transforma la ruta relativa ${st} en absoluta`, () => {
    expect(functions.pathTransformationAbsolute(st)).toBe('C:\\Users\\Cyntia\\Desktop\\LABORATORIA\\Md-Link\\SCL019-md-links\\README.md');
  });

  it(`Transforma la ruta relativa ${st2} en absoluta`, () => {
    console.log(st2);

    expect(functions.pathTransformationAbsolute(st2)).toBe('C:\\Users\\Cyntia\\Desktop\\LABORATORIA\\Md-Link\\SCL019-md-links\\hola.txt');
  });
});
// Test de pathAbsolute
describe('La función pathAbsolute ', () => {
  it(`Verifica si la ruta ${st} en absoluta`, () => {
    expect(functions.pathAbsolute(st)).toBe(false);
  });

  it(`Verifica si la ruta ${path} en absoluta`, () => {
    expect(functions.pathAbsolute(path)).toBe(true);
  });
});
// test de read version  con then
test('Debe devolver un array de 5 link', () => functions.read(pathLink).then((pathLink) => {
  expect(pathLink).toStrictEqual(arrayMD);
}));

// test de read version con asyn await
test('debe devolver array de 5 link', async () => {
  const data = await functions.read(pathLink);
  expect(data).toStrictEqual(arrayMD);
});
// test de read version con asyn await

test('debe devolver array vacio ', async () => {
  const data = await functions.read(st3);
  expect(data).toStrictEqual([]);
});
// test para verificar la existencia de la ruta

describe('La función existPath ', () => {
  it('deberia indicar que no existe', () => {
    const result = functions.existPath('sdf/asedf');
    expect(result).toBeTruthy();
  });

  it('deberia indicar que existe', () => {
    const result = functions.existPath(path);
    expect(result).toBeTruthy();
  });
});
