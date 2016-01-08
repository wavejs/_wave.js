var _ = require('underscore');
var wArray = require('./array');
var wString = require('./string');

_.extend(module.exports, wArray, wString);

exports = module.exports;