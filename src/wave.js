var wave = require('./core/index');
var utils = require('./utils');
var log = require('./core/logger');

wave.moduler('utils',utils);
module.exports = wave;

log('[src/wave.js]');
// wave.log('[wave]', wave);
// wave.log('[wave]', wave['$$module']);
// wave.log('[utils]', utils);
// utils.testFunc();
// console.log('[wave]', wave.ClassTest);
//wave.testFunc();
// console.log(root);

