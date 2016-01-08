var utils = require('./');

console.log('string1', utils);

exports.isString = function(obj) {
    return 'is String OK';
};

console.log('string2', utils);

exports.len = function(str) {
    return str.length;
};