module.exports = {
  bail: true, // se um teste falhar ele para na falha
  coverageProvider: 'v8',

  testMatch: ['<rootDir>/src/**/*.spec.js'], // ele vai ignorar outros arquivos e vai nos files que estão com spec.js
  // ainda podemos melhorar colocando: <rootDir>/src, ele desconsidera o node modules,  deixando mais rapido o teste!
}
