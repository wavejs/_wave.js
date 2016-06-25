'use strict';

/**
 * Global Variables
 * @module global/gvars
 */

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
     * @function gvars
     * @param  {object} param1 [description]
     * @param  {object} param2 [description]
     * @return {Boolean}        [description]
     */
    return function(param1, param2) {
        // 인자가 없을 시 Variable List
        if (Core.isUndefined(param1) && Core.isUndefined(param2)) {
            return getList();
        } 

        // 첫번째 인자가 형식에 맞지 않을때 오류 메시지
        if (!Core.isObject(param1) && !Core.isString(param1) || Core.isArray(param1)) {
            throw 'Invalid Type Param'; 
        }

        // 첫번째 인자가 string 경우
        if (Core.isString(param1)) {
            if (Core.isUndefined(param2)) {
                // get
                return gvarsObj[param1];
            } else {
                // set
                setList(param1, param2);
            }
        } else {
            for (var prop in param1) {
                (param1.hasOwnProperty(prop)) && setList(prop, param1[prop]);
            }
        }
    }
})();


exports.gvars = gvars;