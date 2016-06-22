// var core = require('./core.js');
var utils = require('./');

var arrayUtils = {

    len: function() {
        return util.len();
        console.log('len');
    }, 

    sum: function(a, b) {
        console.log(a+b);
    }
}

module.exports = {
    len: arrayUtils.len
};

/*exports.len2 = function(n){
    console.log(len2);
}
*/

//exports = arrayUtils;
// wave.extend(exports, arrayUtils);
//console.log('array wave', wave);
//utils.extend(exports, arrayUtils);

// module.exports = wave;

console.log('wave array', wave);

exports.len = function() {
    console.log('wave', wave);
    console.log('len');
};




// module.exports = {
//     len: function() {
//         console.log('len');
//     }
// };