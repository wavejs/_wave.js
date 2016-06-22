var core = require('./core.js');
var array = require('./array.js');
// console.log('index array', array);
/*console.log('core : ',core);
console.log(array);*/
//var wave = {};
//module.exports = exports = wave;
core.extend(module.exports, core, array);

exports = module.exports;
// core.extend(wave, core);

//console.log('index wave', wave);

// module.exports = wave;