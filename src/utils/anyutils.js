var log = require('../core/logger');
var utils = require('./');

var anyUtils = {
    testFunc: function(){
        log('[testFunc]util : ', utils.stringlength());
    },

    trim: function(){
        log('strUtils',util);
        log('trim');
    }, 

    watchList: function(){
        log('watchList');
    },

    //duplicate test
    /*stringsum: function(){
        console.log('중복됨!!!!!!');
    }*/
}

// 시점 테스트 require('./')를 위한.
/*console.log('[src/utils/anyutils.js]testInterval1',utils.stringlength);
var testInterval = setInterval(function(){
    console.log('[src/utils/anyutils.js]testInterval2',utils.stringlength);
    if ( utils.stringlength ) {
        clearInterval(testInterval);
    }
}, 0)*/

log('[src/utils/anyutils.js]');
module.exports = anyUtils;