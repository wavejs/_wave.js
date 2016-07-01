'use strict';

// Mixin methods
var mixin = require('./mixin'),
    helpers = require('./helpers'),
    extend = require('./extend'),
    config = require('./config'),
    polyfill = require('./polyfill');

/**
 * Wemakeprice Common
 * 
 * @module base
 * @description
 * * Creates a deep copy of `source`, which should be an object or an array1.
 *   Creates a deep copy of `source`, which should be an object or an array2.
 * * Description 2
 * 
 */

var Core = function (obj) {
  if (!(this instanceof Core)) {
      return new Core(obj);
  }

  this._init(obj);
};

/*********************
 * 프로토타입 멤버변수 확장 형태 - begin
 *********************/
var protoCore = {
  constructor: Core,
  _init: function (obj) {
      this._obj = obj;
      this.info = {};
      this._set(obj);
  },
  _make: function (length, keys) {
      return {
          count: length,
          keys: keys || null
      };
  },
  _set: function (obj) {
      if (Core.isArray(obj)) {
          this.info = this._make(obj.length, Core.keys(obj));
      } else if (Core.isString(obj)) {
          this.info = this._make(obj.length);
      } else {
          this._removeInfo();
      }
  },
  _removeObj: function() {
      delete this._obj;
  },
  _removeInfo: function () {
      delete this.info;
  },
  val: function () {
      return this._obj;
  }
};



Core.prototype = protoCore;
/*********************
 * 프로토타입 멤버변수 확장 - end
 *********************/

/*********************
 * 프로토타입 기본 형태 - begin
 *********************/
/**
 * Returns an object (chained object)
 * @return {Mixed}
 */
// Core.prototype.val = function () {
//     return this._obj;
// };
/*********************
 * 프로토타입 기본 형태 - end
 *********************/

// Mixin Core
mixin._moduleExtendCore(Core, mixin);

// Mixin setConfig
Core.moduleExtend(Core, {
  configure: config.configure
});

// Mixin requires
Core.moduleExtend(Core, helpers);

// Mixin requires with prototype
Core.moduleExtendDeep(Core, extend);

// exports
module.exports = Core;