var wave = require('../core/index');

var utils = require('./anyutils');
var strings = require('./string');
var classTest = require('./ClassTest', true);

wave.log('[src/utils/index.js]');
//core.extend(module.exports, utils, strings, {ClassTest: classTest});

// wave module 추가
/*core.moduler('utils', utils);
core.moduler('strings', strings);
core.moduler('ClassTest', classTest, true);*/

// 모듈 단위 테스트 (wave.method 가 아닌 utils.method 형태)
wave.extend(module.exports, utils, strings, classTest);