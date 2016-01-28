'use strict';

var utils = require('./');

exports.isArray = function(obj) {
  return typeof obj === 'array';
};

exports.size = function(arr) {
  if (Object.prototype.toString.call(arr) === '[object String]') {
    return utils.len(arr);
  } else {
    return arr.length;
  }
};