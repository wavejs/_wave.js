/*var mod = require('./testmod.js');
console.log(mod);*/
//console.log(mod.lower('LEEYOONWOO'));*/

var mod = require('./testmod.js');
var assign = require('./object.assign.js');
var deprecated = require('./deprecated.js');
var utils = require('./testutil.js');
var strings = require('./teststring.js');

var wave = {};
assign(wave, mod);
/*assign(wave, {
    utils: deprecated(utils),
    strings: strings
})*/

// console.log(wave.strings.stringsum);
// console.log('====================');
console.log(wave);
/*console.log(typeof wave);
console.log(typeof utils);
console.log(wave.a);
console.log(wave.mix());
console.log(wave.utils.trim());*/