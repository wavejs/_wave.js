'use strict';

var Core = require('../../core');

Core.moduleExtend(
    module.exports,
    require('./array'),
    require('./string')
);