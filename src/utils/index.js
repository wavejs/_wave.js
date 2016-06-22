'use strict';

var Core = require('../core');

Core.moduleExtend(
    module.exports,
    require('./core'),       // utils core
    require('./browser')       // utils browser
);

// console.log('Core', module.exports.bb.getHash);