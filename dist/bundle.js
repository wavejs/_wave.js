(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Wave.js JavaScript Library
 * 
 * http://wavejs.io
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    console.log('test1');
    // AMD
    define('wave', [], factory);
  } else if (typeof exports === 'object') {
    console.log('test2');
    // CommonJS, CommonJS-like
    module.exports = factory();
  } else {
    console.log('test3');
    // Browser globals
    root.wave = root.wave || factory();
  }
}(typeof window !== 'undefined' ? window : this, function() {

  'use strict';

  var Wave = {};
  var Core = require('./core');
  var Utils = require('./utils');

  Wave.VERSION = '0.1.0';

  // ----------------------------
  // Wave.js Collection Functions
  // ----------------------------
  Core.extend(Wave, Core, Utils);

  return Wave;
}));
},{"./core":3,"./utils":5}],2:[function(require,module,exports){
'use strict';

// Common Utils
var hasOwnProperty = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
var join = Array.prototype.join;

// Check type
function isObject(value) {return value !== null && typeof value === 'object';}
function isString(value) {return typeof value === 'string';}
function isNumber(value) {return typeof value === 'number';}
function isFunction(value) {return typeof value === 'function';}
function isRegExp(value) {return toString.call(value) === '[object RegExp]';}
function isArray(value) {return toString.call(value) === '[object Array]';}
function isUndefined(value) {return value === undefined;}
function isNull(value) {return value === null;}

function extend() {
    var baseObj = arguments[0] || {},
        sourceObj, targetObj,
        len = arguments.length,
        opts = null,
        baseWaveCh = false;

    (!isObject(baseObj) && !isFunction(baseObj)) && (baseObj = {});
    baseWaveCh = (baseObj.__id && baseObj.__id == 'WaVe');

    for(var i = 1; i < len; i++) {
        opts = arguments[i];
        if (opts != null) {

            if (typeof opts == 'function' && opts.name) {
                var obj = {};
                obj[opts.name] = opts;
                opts = obj;
            }

            for (var prop in opts) {
                sourceObj = baseObj[ prop ];
                targetObj = opts[ prop ];

                // duplicate source stop
                /*console.log('sourceObj',sourceObj);
                console.log('sourceObj',prop);
                console.log('baseObj',baseObj === wave);*/

                // base가 wave일때는 모듈 중복을 불허한다.
                // console.log('sourceObj',sourceObj);
                if (baseObj === {} /*&& baseWaveCh*/ && !isUndefined(sourceObj) && !isNull(sourceObj)) {
                    throw new Error('already extend registerd');
                    continue;
                } else {
                    // 기존 소스값과 같은 경우 변경하지 않는다.
                    if (sourceObj === targetObj) {
                        continue;
                    }
                }

                if (!isUndefined(targetObj)) {
                    baseObj[ prop ] = targetObj;
                } else {
                    throw new Error('target object is undefined');
                }
            }
        }
    }

    return baseObj;
}

module.exports = extend;
},{}],3:[function(require,module,exports){
'use strict';

exports.extend = require('./extend');
},{"./extend":2}],4:[function(require,module,exports){
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
},{"./":5}],5:[function(require,module,exports){
var Core = require('../core');
var array = require('./array');
var string = require('./string');

Core.extend(module.exports, array, string);
},{"../core":3,"./array":4,"./string":6}],6:[function(require,module,exports){
'use strict';

var utils = require('./');

exports.isString = function(obj) {
  return typeof obj === 'string';
};

exports.len = function(str) {
  return str.length;
};
},{"./":5}]},{},[1]);
