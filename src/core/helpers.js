'use strict';

var protoArray = Array.prototype,
    protoObject = Object.prototype;

var push = protoArray.push,
    slice = protoArray.slice,
    toStr = protoObject.toString,
    hasOwn = protoObject.hasOwnProperty;

/** 
 * Typeof Function
 * @function
 * @param {object} obj 체크할 target object
 * @return {boolean}
 */
exports.isFunction = function (obj) {
  return typeof obj === 'function';
};

/** 
 * Typeof Object
 * @function
 * @param {object} obj 체크할 target object
 * @return {boolean}
 */
exports.isObject = function (obj) {
  return typeof obj === 'object' && !!obj;
};

/** 
 * Typeof LiteralObject, 순수 Object형 체크 
 * @function
 * @param {object} obj 체크할 target object
 * @return {boolean}
 */
exports.isLiteralObject = function(obj) {
  return obj && obj.constructor && obj.constructor.name === 'Object'; 
}

/** 
 * Typeof string
 * @function
 * @param {object} obj 체크할 target object
 * @return {boolean}
 */
exports.isString = function (obj) {
  return typeof obj === 'string';
};

/** 
 * Typeof number
 * @function
 * @param {object} obj 체크할 target object
 * @return {boolean}
 */
exports.isNumber = function (obj) {
  return typeof obj === 'number';
};

/** 
 * Typeof boolean
 * @function
 * @param {object} obj 체크할 target object
 * @return {boolean}
 */
exports.isBoolean = function (obj) {
  return toStr.call(obj) === '[object Boolean]';
};

/** 
 * Typeof array
 * @function
 * @param {object} obj 체크할 target object
 * @return {boolean}
 */
exports.isArray = function (obj) {
  return (Array.isArray)?Array.isArray(obj):toStr.call(obj) === '[object Array]';
};

/** 
 * Typeof RegExp
 * @function
 * @param {object} obj 체크할 target object
 * @return {boolean}
 */
exports.isRegExp = function (obj) {
  return toStr.call(obj) === '[object RegExp]';
};

/** 
 * Typeof undefined
 * @function
 * @param {object} obj 체크할 target object
 * @return {boolean}
 */
exports.isUndefined = function (obj) {
  return obj === void 0;
};

/** 
 * Typeof null
 * @function
 * @param {object} obj 체크할 target object
 * @return {boolean}
 */
exports.isNull = function (obj) {
  return obj === null;
};

/** 
 * Typeof Element
 * @function
 * @param {object} obj 체크할 target object
 * @return {boolean}
 */
exports.isElement = function(node) {
  return !!(node && (node.nodeName || (node.prop && node.attr && node.find)));
};

/**
 * 해당 object|array의 property(key)값을 배열로 저장
 * @function
 * @param  {object|array} obj 체크할 target object하
 * @return {array} property(key)값이 저장된 array
 *
 * @example
 * vv.keys({a:1, b:2, c:3, d:[1,2,3]}); // ["a", "b", "c", "d"]
 * vv.keys([1,2,3]); // ["0", "1", "2"]
 */
exports.keys = function (obj) {
  var natKeys = Object.prototype.keys;
  if (natKeys) { return natKeys(obj); }
  var result = [];
  for (var prop in obj) {
    if (hasOwn.call(obj, prop)) {
      result.push(prop);
    }
  }
  return result;
};