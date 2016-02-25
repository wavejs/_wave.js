'use strict';

var Wave = require('./core');

Wave.breeze(Wave, {
    version: require('../package').version
});

Wave.gust(Wave, require('./utils'));

module.exports = Wave;