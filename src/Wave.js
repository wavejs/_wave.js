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

module.exports = Wave;