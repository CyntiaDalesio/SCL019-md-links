const functions = require('../functions.js');
const st2 = 'hola.txt';
const st = 'README.md';
describe('La función readExtension ', () => {

  it('Devuelve true si la extension del archivo es .md', () => {
    console.log(st);
    expect(functions.verifyExtensionMD(st)).toBe(true);
  });
 
  it('Devuelve false si la extension del archivo no es .md', () => {
    console.log(st2);

    expect(functions.verifyExtensionMD(st2)).toBe(false);
  });



});