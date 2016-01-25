var utils = require('./');

// console.log('array1', utils);

exports.isArray = function(obj) {
    return 'is Array OK';
};

// console.log('array2', utils);

exports.size = function(arr) {
    // console.log('arr is %s', Object.prototype.toString.call(arr));
    if (Object.prototype.toString.call(arr) === '[object String]') {
        return utils.len(arr);
    } else {
        console.log('is array size');
        return arr.length;
    }
};

// exports.len = function() {
//     return 100;
// };