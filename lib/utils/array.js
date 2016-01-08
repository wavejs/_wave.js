var utils = require('./');

exports.isArray = function() {
    console.log('isArray');
    utils.isString();
    console.log('isArray utils', utils);
    return 'is Array OK';
};