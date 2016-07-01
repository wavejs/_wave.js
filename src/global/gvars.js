'use strict';

var Core = require('../core');
var gvars = (function() {

  var gvarsObj = {};
  var getList = function() {
    var listArr = [];
    for(var prop in gvarsObj) {
        (gvarsObj.hasOwnProperty(prop)) && listArr.push(prop);
    } 
    return listArr;
  };
  var setList = function(prop, value) {gvarsObj[prop] = value;};

  /**
   * Global Variables
   * 페이지 내부적으로 사용되는 글로벌 변수에 대한 설정
   *
   * @function gvars
   * @memberOf module:global
   * 
   * @param  {string|object} param setter/getter 시, 사용/참조할 변수명
   *                               object로 적용시 setter만 가능 (이 경우, 2번째 인자는 무시됨)
   * @param  {object} val 해당 parameter에 대한 value
   *                 해당 인자가 들어가면 setter, 들어가지 않으면 getter
   *                 
   * @return {object}  
   * 1. param, val 둘 다 없는 경우:  array형태로 param명들을 보여줌
   * 2. param 만 있는 경우(param = {string}): getter 형태로 value값을 보여줌
   * 3. param 만 있는 경우(param = {object}): setter 형태로 저장, not return
   * 4. param, val 둘 다 있는 경우: setter 형태로 저장, not return
   * 
   * @example 
   * vv.gvars('testVar', '3'); // setter, return: undefined
   * vv.gvars('testVar'); // getter, return: 3
   * vv.gvars({a:1, b:2}); // setter, return: undefined
   * vv.gvars(); // return: ["testVar", "a", "b"]
   * 
   */
  return function(param, val) {
    // 인자가 없을 시 Variable List
    if (Core.isUndefined(param) && Core.isUndefined(val)) {
      return getList();
    } 

    // 첫번째 인자가 형식에 맞지 않을때 오류 메시지
    if (!Core.isObject(param) && !Core.isString(param) || Core.isArray(param)) {
      throw 'Invalid Type Param'; 
    }

    // 첫번째 인자가 string 경우
    if (Core.isString(param)) {
      if (Core.isUndefined(val)) {
        // get
        return gvarsObj[param];
      } else {
        // set
        setList(param, val);
      }
    } else {
      for (var prop in param) {
        (param.hasOwnProperty(prop)) && setList(prop, param[prop]);
      }
    }
  }
})();


exports.gvars = gvars;