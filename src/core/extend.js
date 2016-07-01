'use strict';

var helper = require('./helpers');

var protoArray = Array.prototype,
    protoObject = Object.prototype;

var slice = protoArray.slice,
    hasOwn = protoObject.hasOwnProperty;

/**
 * 객체를 복사
 * @memberOf module:base
 * 
 * @param  {object} src Original-Source
 * @return {object} 복사된 Original-Source
 */
function clone(src) {
    if (helper.isUndefined(src) || helper.isNull(src) || !helper.isObject(src)) { return src; }
    var copy = src.constructor();

    for (var prop in src) {
        if (!hasOwn.call(src, prop)) { continue; }
        copy[prop] = clone(src[prop]);
    }

    return copy;
}

/**
 * A wrapper around jsdoc cli.
 *
 * This function collects all filenames. Then runs:
 * ```jsdoc -c config -t node_modules/ink-docstrap/template gulpFile1 gulpFile2```
 *
 * @memberOf module:base
 * 
 * @param  {object} dst Destination
 * @param  {...object} src Source
 * @param  {...boolean} deep copy
 * @return {object} dst reference
 * 
 * @see 참조 문서 및 메서드
 * * {@link http://www.wemakeprice.com}
 * * [Wmp]{@link http://www.wemakeprice.com}
 * * {@link unique}
 * * {@link http://naver.com naver}
 * * {@link http://naver.com|naver}
 * 
 * @example 
 * WmpAdminUtils.arrayUtils.unique([2,3,3,4,1,2,1]) --> [2, 3, 4, 1]
 *
 * @todo Write the documentation.
 */
function extend(dst /* src, deep */) {
  var argsLen = arguments.length;
  var deep = helper.isBoolean(arguments[argsLen - 1]) ? arguments[argsLen - 1] : false;
  return coreExtend(dst, slice.call(arguments, 1, 2), deep);
}

function coreExtend(dst, src, deep) {
  var i, iLen, j, jLen,
      obj, keys, key, src;

  for (i = 0, iLen = src.length; i < iLen; ++i) {
    obj = src[i];
    if (!helper.isObject(obj) && !helper.isFunction(obj)) { continue; }

    keys = helper.keys(obj);
    for (j = 0, jLen = keys.length; j < jLen; j++) {
      key = keys[j];
      src = obj[key];

      if (deep && helper.isObject(src)) {
        (!helper.isObject(dst[key])) && (dst[key] = helper.isArray(src) ? [] : {});
        coreExtend(dst[key], [src], true);
      } else {
        dst[key] = src;
      }
    }
  }

  return dst;
}

exports.clone = clone;
exports.extend = extend;