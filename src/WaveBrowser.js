'use strict';

var vv = require('./core');

vv.moduleExtend(vv, {
    version: '@@VERSION'
});
// console.log('vv',vv.a);
vv.moduleExtendDeep(vv, require('./utils'));
vv.moduleExtendDeep(vv, require('./global'));

console.log('utils = = = = = :',require('./utils'));
console.log(vv.version)

module.exports = vv;