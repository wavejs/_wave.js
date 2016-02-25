'use strict';

// Mixin methods
var winds = require('./mix'),
    helpers = require('./helpers'),
    extend = require('./extend');

/**
 * Core
 * @constructor
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
            keys: keys
        };
    },
    _set: function (obj) {
        if (Core.isArray(obj)) {
            this.info = this._make(obj.length, Core.keys(obj));
        }
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
winds.wind(Core, winds);

// Mixin requires
Core.breeze(Core, helpers);

// Mixin requires with prototype
Core.gust(Core, extend);

// exports
module.exports = Core;