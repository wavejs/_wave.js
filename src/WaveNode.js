'use strict';

var Wave = {};
var WaveCore = require('./core');
var WaveUtils = require('./utils');
var WaveVersion = require('../package').version;

WaveCore.Poseidon(Wave)
  .assign({version: WaveVersion})
  .assign(WaveCore)
  .assign(WaveUtils)
  .regist('utils', WaveUtils);

module.exports = Wave;