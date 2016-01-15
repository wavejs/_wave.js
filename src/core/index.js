var log = require('./logger');

var wave = {id:'wavejs'};
var moduleList = {};
var config = {
    debug: true
}
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
function extend() {
    var baseObj = arguments[0] || {},
        sourceObj, targetObj,
        len = arguments.length,
        opts = null,
        baseWaveCh = false;

    (!isObject(baseObj) && !isFunction(baseObj)) && (baseObj = {});
    baseWaveCh = (baseObj.__id && baseObj.__id == 'WaVe');

    for(var i = 1; i < len; i++) {
        opts = arguments[i];
        if (opts != null) {

            if (typeof opts == 'function' && opts.name) {
                var obj = {};
                obj[opts.name] = opts;
                opts = obj;
            }

            for (var prop in opts) {
                sourceObj = baseObj[ prop ];
                targetObj = opts[ prop ];

                // duplicate source stop
                /*console.log('sourceObj',sourceObj);
                console.log('sourceObj',prop);
                console.log('baseObj',baseObj === wave);*/

                // base가 wave일때는 모듈 중복을 불허한다.
                // console.log('sourceObj',sourceObj);
                if (baseObj === wave /*&& baseWaveCh*/ && !isUndefined(sourceObj) && !isNull(sourceObj)) {
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
function moduler(name, moduleFunction, classPattern){
    if (isUndefined(name)) {
        throw new Error('not found name parameter');
    }

    // getter 
    if (isUndefined(moduleFunction)) {
        return moduleList[name];
    }

    // setter
    if (isUndefined(moduleList[name])) {
        moduleList[name] = moduleFunction;//(classPattern)?moduleFunction:moduleFunction();
        if (classPattern) {
            var obj = {};
            obj[name] = moduleList[name];
            extend(wave, obj);
        } else {
            extend(wave, moduleList[name]);    // wave.method();
        }
    }
}

extend(wave, {
    hasOwn: hasOwnProperty,
    toStr: toString,
    join: join,

    isObject: isObject,
    isString: isString,
    isNumber: isNumber,
    isFunction: isFunction,
    isRegExp: isRegExp,
    isArray: isArray,
    isUndefined: isUndefined,
    isNull: isNull,

    log: log,
    extend: extend,
    moduler: moduler,

    $$module: moduleList,
    config: config
})

log('[src/core/index.js]');
module.exports = wave;