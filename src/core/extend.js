'use strict';

var wave = {id:'wavejs'};
var moduleList = {};
var config = {
    debug: true
}

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
  console.log('extend arguments', arguments);
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
        if (baseObj !== {} /*&& baseWaveCh*/ && !isUndefined(sourceObj) && !isNull(sourceObj)) {
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