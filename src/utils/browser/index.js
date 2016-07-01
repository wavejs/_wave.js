'use strict';

/**
 * Common Utils - Browse
 * 
 * @module utils/browse
 * @description
 * * Browser 기반 Utility
 * * utils/browser 폴더 내에 위치한 파일 기준
 * 
 */

var Core = require('../../core');
var indexObj = {
    browse: {}
};

// vv.method 형식으로 진행
Core.moduleExtend(
  indexObj,
  require('./cookie')
);

// vv.browse.method 형식으로 진행
Core.moduleExtend(
    indexObj.browse, 
    require('./info'),
    require('./ua')
);

// module.exports에서 취합
Core.moduleExtend(
    module.exports,
    indexObj
);