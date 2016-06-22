'use strict';

var helpers = require('./helpers');

function _setPolyfill(nativeObj, method, polyfillMethod, forceUpdate) {
    (forceUpdate || helpers.isUndefined(nativeObj.prototype[method])) && (nativeObj.prototype[method] = polyfillMethod);
}

// Polyfill List
// _setPolyfill(String, 'test', function(){console.log('polyfill List')});