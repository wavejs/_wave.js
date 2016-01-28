// 'use strict';

// var Wave = {};
// var WaveCore = require('./core');
// var WaveUtils = require('./utils');
// var WaveVersion = require('./WaveVersion');

// WaveCore.Modular(Wave)
//   .assign(WaveCore)
//   .assign(WaveUtils)
//   .assign(WaveVersion)
//   .regist('utils', WaveUtils);

// // WaveCore.Modular(Wave)
// //   .assign(WaveCore, WaveUtils, WaveVersion)
// //   .regist('utils', WaveUtils);

// module.exports = Wave;


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

  var Wave = {};
  var WaveCore = require('./core');
  var WaveUtils = require('./utils');
  var WaveVersion = require('./WaveVersion');

  WaveCore.Modular(Wave)
    .assign(WaveCore)
    .assign(WaveUtils)
    .assign(WaveVersion)
    .regist('utils', WaveUtils);

  // WaveCore.Modular(Wave)
  //   .assign(WaveCore, WaveUtils, WaveVersion)
  //   .regist('utils', WaveUtils);

  if (typeof window !== 'undefined') {
    window.wave = Wave;
  }

  return Wave;
}));