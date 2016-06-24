'use strict';

// Mixin methods
var mixin = require('./mixin'),
    helpers = require('./helpers'),
    extend = require('./extend'),
    polyfill = require('./polyfill');

/**
 * Core
 *
 * @class Core
 * @constructor Core
 * @param {object} obj Parameter
 * @return {object} return data
 * @example
 * test example
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
            delete this.info;
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
mixin._moduleExtendCore(Core, mixin);

// Mixin requires
Core.moduleExtend(Core, helpers);

// Mixin requires with prototype
Core.moduleExtendDeep(Core, extend);

// var obj1 = {a:function(){}, b:function(){}, c:{}};
// var obj2 = {a:function(){}, c:function(){}};

/*console.log('=====================1', Core.c)
Core.moduleExtendDeep(Core, obj1);
console.log('=====================2', Core.c)*/
// Core.moduleExtendDeep(Core, obj2);


// exports
module.exports = Core;