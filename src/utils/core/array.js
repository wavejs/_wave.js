'use strict';

var Core = require('../../core');
var utils = require('./');

var protoArray = Array.prototype,
    protoObject = Object.prototype;

var hasOwn = protoObject.hasOwnProperty,
    toString = protoObject.toString;