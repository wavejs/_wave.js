function ClassTest(a, b, c){
    this.test = 'abc';
    this.getScope = function(){
        console.log(this);
        return this;
    }
    this.trace = function(){
        console.log(a, b, c);
    }
}
ClassTest.prototype = {
    view: function(){
        console.log('ClassTest');
    }
}

// 시점 테스트 require('./')를 위한.
/*console.log('[src/utils/ClassTest.js]testInterval1',utils.stringlength);
var testInterval = setInterval(function(){
    console.log('[src/utils/ClassTest.js]testInterval2',utils.stringlength);
    if ( utils.stringlength ) {
        clearInterval(testInterval);
    }
}, 0)*/

console.log('[src/utils/ClassTest.js]');

module.exports = ClassTest;