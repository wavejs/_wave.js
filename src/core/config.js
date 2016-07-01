'use strict';

var helpers = require('./helpers');
var extend = require('./extend');

var protoObject = Object.prototype;
var hasOwn = protoObject.hasOwnProperty;


var log = {
    isForce: false,
    includeHost: [
        '',
        'localhost',
        'test.wemakeprice.com',
        'test-pg.wemakeprice.com',
        'gagamel.com'
    ]
}


/**
 * vv Configure
 *
 * @memberOf module:base
 * @function configure
 * 
 * @param {string} feature   Config list name
 * @param {object} defineObj feature내에 있는 config
 *                           해당 인자가 없을 시 getter 형태로 보여줌
 * @return {object} 해당 Config list 객체
 * 
 * @example 
 * vv.configure('log'); // getter
 * vv.configure('log', {isForce:false}); // setter
 */
exports.configure = function(feature, defineObj) {
  if (!helpers.isUndefined(exports[feature])) {

    for (var prop in defineObj) {
      if (!hasOwn.call(defineObj, prop)) { throw new Error('[setConfig Error] Not found defineObj');}
      if (!helpers.isUndefined(exports[feature][prop])) {
        exports[feature][prop] = defineObj[prop];
      }
    }
    return exports[feature];
  } else {
    throw new Error('[setConfig Error] Not found feature');
  }
}

exports.log = log;