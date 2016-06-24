'use strict';

var Core = require('../../core');
var utils = require('./');

var protoArray = Array.prototype,
    protoObject = Object.prototype;

var hasOwn = protoObject.hasOwnProperty,
    toString = protoObject.toString;
//@namespace {object} vv script
//

/**
 * @callback gulpDoneCallback
 */

/**
 * A wrapper around jsdoc cli.
 *
 * This function collects all filenames. Then runs:
 * ```jsdoc -c config -t node_modules/ink-docstrap/template gulpFile1 gulpFile2```
 * 
 * @param  {number} obj description
 * @return {array} return 입니다.
 * @see 참조 문서 및 메서드
 * {@link http://www.wemakeprice.com}
 * [Wmp]{@link http://www.wemakeprice.com}
 * {@link unique}
 * {@link http://naver.com naver}
 * {@link http://naver.com|naver}
 * @example 
 * WmpAdminUtils.arrayUtils.unique([2,3,3,4,1,2,1]) --> [2, 3, 4, 1]
 * @logs monolife, 16.06.23 #FRONTEND-001
 * monolife, 16.06.24 #FRONTEND-002
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

/**
 * [unique description] 중복배열 요소 제거
 * 
 * @param  {array} duplicateArr 중복배열 array
 * @return {array} 
 * @example
 * WmpAdminUtils.arrayUtils.unique([2,3,3,4,1,2,1]) --> [2, 3, 4, 1]
 * example2~
 * 
 */
exports.unique = function(duplicateArr){
    if (protoArray.reduce) {
        var uniq = duplicateArr.reduce(function(a,b){
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
          },[]);
        return duplicateArr.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
    } else {
        var obj = {};
        var arr = [];
        for(var prop in duplicateArr){
            var aname = duplicateArr[prop];
            if(Core.isUndefined(obj[aname])){
                obj[aname] = true;
                arr.push(aname);
            }
        }
        return arr;
    }
}

