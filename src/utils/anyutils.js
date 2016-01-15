var wave = require('../core/index');
var utils = require('./');

var anyUtils = {
    testFunc: function(){
        console.log('[testFunc]util : ', utils.stringlength());
    },

    trim: function(){
        console.log('strUtils',util);
        console.log('trim');
    }, 

    watchList: function(){
        console.log('watchList');
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

console.log('[src/utils/anyutils.js]');
module.exports = anyUtils;