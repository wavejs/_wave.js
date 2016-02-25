'use strict';

var utils = require('./');

var protoArray = Array.prototype,
    protoObject = Object.prototype;

var hasOwn = protoObject.hasOwnProperty,
    toString = protoObject.toString;

exports.keys = function (obj) {
    var natKeys = Object.prototype.keys;

    if (natKeys) { return natKeys(obj); }

    var result = [];

    for (var key in obj) {
        if (hasOwn.call(obj, key)) {
            result.push(key);
        }
    }

    return result;
};

exports.size = function (arr) {
    if (toString.call(arr) === '[object String]') {
        return utils.len(arr);
    } else {
        return arr.length;
    }
};