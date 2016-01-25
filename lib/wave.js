'use strict';

// var Wave = require('./core/core');
var Wave = require('./utils');

// console.log(Wave);

var size = Wave.size([1,2]);
// var size = Wave.size('TEST');

console.log('size %d', size);

module.exports = Wave;