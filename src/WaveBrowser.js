'use strict';

var Wave = {};
var WaveCore = require('./core');
var WaveUtils = require('./utils');

WaveCore.Poseidon(Wave)
  .assign({version: '@@VERSION'})
  .assign(WaveCore)
  .assign(WaveUtils)
  .regist('utils', WaveUtils);

module.exports = Wave;