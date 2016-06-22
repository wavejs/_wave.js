'use strict';

var name = 'lee';

exports.name = name;
exports.lower = function(input) {
    return input.toLowerCase();
}
exports.get_name = function() {
    return name;
}



var wave = {
    a:1, 
    b:2,
    c:3,
    d:4,
    mix: function(){
        return this.a+this.b+this.c+this.d;
    }
}

module.exports = wave;