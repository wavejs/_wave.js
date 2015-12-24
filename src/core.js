'use strict';

var wave = window.wave || (window.wave = {});
var moduleList = {};

// Common Utils
var hasOwnProperty = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

// Check type
function isObject(value) {return value !== null && typeof value === 'object';}
function isString(value) {return typeof value === 'string';}
function isNumber(value) {return typeof value === 'number';}
function isFunction(value) {return typeof value === 'function';}
function isRegExp(value) {return toString.call(value) === '[object RegExp]';}
function isArray(value) {return toString.call(value) === '[object Array]';}
function isUndefined(value) {return value === undefined;}
function isNull(value) {return value === null;}


wave.VERSION = '0.1.0';
wave.config = {
    debug: true
}

wave.extend = function() {
    var baseObj = arguments[0] || {},
        sourceObj, targetObj,
        len = arguments.length,
        opts = null;

    (!isObject(baseObj) && !isFunction(baseObj)) && (baseObj = {});

    for(var i = 1; i < len; i++) {
        opts = arguments[i];
        if (opts != null) {
            for (var prop in opts) {
                sourceObj = baseObj[ prop ];
                targetObj = opts[ prop ];

                // duplicate source stop
                //console.log('sourceObj',sourceObj);
                if (!isUndefined(sourceObj) && !isNull(sourceObj)) {
                    throw new Error('already extend registerd');
                    continue;
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

/**
 * 기본 유틸이 아닌 모듈형으로 등록시 사용
 * @param  {String}   name           [모듈 이름]  
 * @param  {Function} moduleFunction [모듈 Function] 
 * @param  {Boolean}  classPattern   [생성자형태로 모듈에 등록할 것인지에 대한 여부]
 * @return {object | undefined}      [name만 넣는다면 모듈에 대한 해당 name에 대한 참조값]
 */
wave.module = function(name, moduleFunction, classPattern){
    if (isUndefined(name)) {
        throw new Error('not found name parameter');
    }

    // getter 
    if (isUndefined(moduleFunction)) {
        return moduleList[name];
    }

    // setter
    if (isUndefined(moduleList[name])) {
        moduleList[name] = (classPattern)?moduleFunction:moduleFunction();
        if (classPattern) {
            wave.extend(wave, {[name]:moduleList[name]})
        } else {
            wave.extend(wave, moduleList[name]);    // wave.method();
        }
    }

    // debug mode
    if (wave.config.debug && !isUndefined(moduleFunction)) {
        wave.extend(window, (classPattern)?{[name]:moduleFunction}:moduleFunction());
    }
}

wave.extend(wave, {
    $$module: moduleList,
    isObject: isObject
});