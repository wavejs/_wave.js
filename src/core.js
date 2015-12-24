'use strict';

var wave = window.wave || (window.wave = {});
var moduleList = {};

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


wave.VERSION = '0.1.0';
wave.config = {
    debug: true
}

/**
 * Log Utils
 * * console를 지원하는 브라우저에서는 console, 아닌경우는 alert으로 활성화
 */
wave.log = function(){
    try {
      console.log.apply(console, arguments);
    } catch(e) {
      alert(join.call(arguments, ' '));
    }
}

/**
 * extend Utils
 * @return {object}
 * @example
    1.  wave.extend({a:1,b:2}, {a:2,b:3,c:4}, {d:3}) --> Object {a: 2, b: 3, c: 4, d: 3}
    2.  wave.extend(wave, function(){
            var method1 = function(){};
            return{
                method1: method1,
                method2: function(){}
            }
        })
    3.  var ClassType = function(){};
        ClassType.prototype = {}; 
        wave.extend(wave, {classname:ClassType})

    ** 2, 3 같은 경우는 extend를 직접사용하지 않고 module method를 사용
 */
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
                /*console.log('sourceObj',sourceObj);
                console.log('sourceObj',prop);
                console.log('baseObj',baseObj === wave);*/

                // base가 wave일때는 모듈 중복을 불허한다.
                if (baseObj === wave && !isUndefined(sourceObj) && !isNull(sourceObj)) {
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