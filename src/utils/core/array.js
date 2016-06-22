'use strict';

var Core = require('../../core');
var utils = require('./');

var protoArray = Array.prototype,
    protoObject = Object.prototype;

var hasOwn = protoObject.hasOwnProperty,
    toString = protoObject.toString;

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
 * @param  {[array]} duplicateArr [description] 중복배열 array
 * @return {[array]}      [description]
 *
 * ex : WmpAdminUtils.arrayUtils.unique([2,3,3,4,1,2,1]) --> [2, 3, 4, 1]
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

