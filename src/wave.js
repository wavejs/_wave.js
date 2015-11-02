/**
 * wave.js JavaScript Library v0.1.0
 * 
 * http://wavejs.io
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('wave', [], factory);
    } else if (typeof exports === 'object') {
        // CommonJS, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals
        root.wave = root.wave || factory();
    }
}(typeof window !== 'undefined' ? window : this, function() {

    'use strict';

    var wave = {};

    wave.VERSION = '0.1.0';

    // ----------------------------
    // wave.js Collection Functions
    // ----------------------------

    return wave;
}));