'use strict';

var Core = require('../../core');



/*Core.moduleExtend(
    module.exports,
    require('./info')
);*/

var indexObj = {
    browserInfo: {}
};

Core.moduleExtend(
    indexObj.browserInfo, 
    require('./info')
)

Core.moduleExtend(
    module.exports,
    indexObj
)

// console.log('browserInfo = = = = = :',browserInfo);