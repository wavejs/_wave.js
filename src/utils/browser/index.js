'use strict';

var Core = require('../../core');



/*Core.moduleExtend(
    module.exports,
    require('./info')
);*/

var browserInfo = {};
browserInfo.bb = {};

Core._moduleExtendCore(
    browserInfo.bb, 
    require('./info')
)

Core._moduleExtendCore(
    module.exports,
    browserInfo
)




console.log('browserInfo = = = = = :',browserInfo);