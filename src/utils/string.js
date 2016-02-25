'use strict';

var utils = require('./');

exports.trim = function (obj) {
    var natTrim = String.prototype.trim;

    if (natTrim) { return natTrim(obj); }

    return obj.replace(/^\s+|\s+$/gm, '');
};

exports.len = function (str) {
    return str.length;
};