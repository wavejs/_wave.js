'use strict';

var helper = require('./helpers');

var protoArray = Array.prototype,
    protoObject = Object.prototype;

var slice = protoArray.slice,
    hasOwn = protoObject.hasOwnProperty;


// @todo shallow copy & deep copy 구현
exports.extend = function (/* [deep], target, sources */) {
    var args = slice.call(arguments, 0),
        target = args.shift(),
        deep = false;

    var i,
        l,
        source,
        prop;

    if (helper.isBoolean(target)) {
        deep = target;
        target = args.shift();
    }

    if (!helper.isObject(target) && !helper.isFunction(target)) {
        target = {};
    }

    for (i = 0, l = args.length; i < l; i++) {
        source = args[i];

        for (prop in source) {
            // source의 프로퍼티만 적용
            if (!hasOwn.call(source, prop)) { continue; }

            target[prop] = source[prop];
        }
    }

    return target;
};