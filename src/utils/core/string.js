'use strict';

var utils = require('./');

/**
 * String의 양옆의 공백을 삭제한다.
 * 
 * @memberOf module:utils
 * 
 * @param  {string} obj 양옆의 공백을 줄일 대상 String
 * @return {strung} trim result String
 * 
 */
exports.trim = function (obj) {
    var natTrim = String.prototype.trim;
    if (natTrim) { return natTrim.call(obj); }
    return obj.replace(/^\s+|\s+$/gm, '');
};

/**
 * 숫자의 3자리수마다 ,를 찍는다.
 * 
 * @memberOf module:utils
 * 
 * @param  {number} value 양옆의 공백을 줄일 대상 String
 * @return {string} 3자리 수마다 ,를 넣은 string
 * 
 */
exports.formatToAmount = function(value){
    var value = String(Number(value));
    var reg = /(^[+-]?\d+)(\d{3})/;
    value += '';

    while(reg.test(value)){
        value = value.replace(reg, '$1'+','+'$2');
    }
    return value;
};

/**
 * ,가 들어가 있는 String을 숫자로 바꾸어준다.
 * 
 * @memberOf module:utils
 * 
 * @param  {string} value ,가 들어가 있는 String
 * @return {number} 치환한 숫자
 * 
 */
exports.formatToNumber = function(value){
    var isMinus = (String(value).indexOf('-')==0)?true:false;
    var value = String(value).replace(/[^0-9]/g, '');
    (isMinus) && (value = '-' + value);
    return Number(value);
};

/**
 * \r, \n, \r\n, \n\r 등을 br 태그로 치환
 *
 * @memberOf module:utils
 * 
 * @param  {string} value 치환할 string
 * @return {string} <br>태그가 치환된 string
 */
exports.rn2br = function(value) {
  return value.replace(/\r|\n|\r\n|\n\r/gi, '<br/>');
};
