'use strict';

var Core = require('../core');

function log(){
    try {
        if(typeof(window.console)!='undefined' && window.console && window.console.log){
            console.log.apply(console, arguments);
        }
    } catch(e) {
      alert(Array.prototype.join.call(arguments, ' '));
    }
}

