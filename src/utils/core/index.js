'use strict';

/**
 * Common Utils - Core
 * 
 * @module utils
 * @description
 * * 공통 유틸리티 모음
 * * utils/core 폴더 내에 위치한 파일 기준
 * 
 */

var Core = require('../../core');

Core.moduleExtend(
    module.exports,
    require('./array'),
    require('./string')
);