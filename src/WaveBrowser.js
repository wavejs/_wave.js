'use strict';

var Wave = require('./core');

Wave.breeze(Wave, {
    version: '@@VERSION'
});

Wave.gust(Wave, require('./utils'));

module.exports = Wave;