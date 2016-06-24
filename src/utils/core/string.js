'use strict';

var utils = require('./');

exports.trim = function (obj) {
    var natTrim = String.prototype.trim;
    if (natTrim) { return natTrim.call(obj); }
    return obj.replace(/^\s+|\s+$/gm, '');
};

exports.formatToAmount = function(value){
    var value = String(Number(value));
    var reg = /(^[+-]?\d+)(\d{3})/;
    value += '';

    while(reg.test(value)){
        value = value.replace(reg, '$1'+','+'$2');
    }
    return value;
}

exports.formatToNumber = function(value){
    var isMinus = (String(value).indexOf('-')==0)?true:false;
    var value = String(value).replace(/[^0-9]/g, '');
    (isMinus) && (value = '-' + value);
    return Number(value);
}

/**
 * trim default config
 * @method trim
 * @example
 * trim: {
 *  fitToWidthRightMargin: 10,
 *  fitToWidth: false,
 *  pageSize: 10,
 *  pageHeight: 400,
 *  keyResult: "result",
 *  keyTree: "tree",
 *  keyList: "list",
 *  emptyListMSG: "목록이 없습니다."
 * }
 */
exports.memberfunc = function(a, b) {

}