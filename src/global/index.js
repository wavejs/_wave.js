'use strict';

/**
 * Wemakeprice Global Function
 * 
 * @module global
 * @description
 * * Wemakeprice 사이트 전용 Global Function
 * 
 */

var Core = require('../core');

Core.moduleExtend(
    module.exports,
    require('./gvars'),              //Global Variables
    require('./logger')              //Global Variables
);