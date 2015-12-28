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

wave.module('ClassTest', ClassTest, true);