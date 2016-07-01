'use strict';

var Core = require('../core');
var config = require('../core/config');
var browser = require('../utils/browser/info');


function getLogAvailHost() {
    var isAvail = false;
    var getHost = browser.getHost();

    if (!Core.isUndefined(config.log.includeHost) && config.log.includeHost.length > 0) {
        for (var i = 0, len = config.log.includeHost.length; i < len; i++) {
            if (getHost == config.log.includeHost[i]) {
                isAvail = true;
                break;
            }
        }
    }
    return isAvail;
}

/**
 * 공통 Console Tool
 * console.log가 실행되지 않는 브라우저는 alert 처리
 *
 * @memberOf module:global
 * 
 */
function log(){
    if (!config.log.isForce && !getLogAvailHost() ) {return;}
    try {
        if(typeof(window.console)!='undefined' && window.console && window.console.log){
            console.log.apply(console, arguments);
        }
    } catch(e) {
      alert(Array.prototype.join.call(arguments, ' '));
    }
}

exports.log = log;