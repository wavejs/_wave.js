'use strict';

var utils = require('./');

exports.isString = function(obj) {
  return typeof obj === 'string';
};

exports.len = function(str) {
  return str.length;
};