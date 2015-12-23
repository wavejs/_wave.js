;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.wave = factory();
  }
}(this, function() {


var wave = window.wave || (window.wave = {});

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

var moduleList = {};

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
                console.log('sourceObj',sourceObj);
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
    isObject: isObject,
    $$module: moduleList
});


function ClassTest(a, b, c){
    this.test = 'abc';
    this.getScope = function(){
        console.log(this);
        return this;
    }
    this.trace = function(){
        console.log(a, b, c);
    }
}
ClassTest.prototype = {
    view: function(){
        console.log('ClassTest');
    }
}

wave.module('Classtest', ClassTest, true);

/*function classTest2(){
    return{
        trim: function(){
            console.log('trim');
        }, 

        watchList: function(){
            console.log('watchList');
        }
    }
}*/

//wave.module('classtest', classTest);


wave.module('utils', function(){
    return{
        trim: function(){
            console.log('trim');
        }, 

        watchList: function(){
            console.log('watchList');
        }
    }
})




return wave;


}));