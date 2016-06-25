'use strict';

var protoArray = Array.prototype,
    protoObject = Object.prototype;

var push = protoArray.push,
    slice = protoArray.slice,
    toStr = protoObject.toString;

/**
 * isFunction
 */
exports.isFunction = function (obj) {
    return typeof obj === 'function';
};

exports.isObject = function (obj) {
    return typeof obj === 'object' && !!obj;
};

exports.isLiteralObject = function(obj) {
    return obj && obj.constructor && obj.constructor.name === 'Object'; 
}

exports.isString = function (obj) {
    return typeof obj === 'string';
};

exports.isNumber = function (obj) {
    return typeof obj === 'number';
};

exports.isBoolean = function (obj) {
    return toStr.call(obj) === '[object Boolean]';
};

exports.isArray = function (obj) {
    return (Array.isArray)?Array.isArray(obj):toStr.call(obj) === '[object Array]';
};

exports.isRegExp = function (obj) {
    return toStr.call(obj) === '[object RegExp]';
};

exports.isUndefined = function (obj) {
    return obj === void 0;
};

exports.isNull = function (obj) {
    return obj === null;
};