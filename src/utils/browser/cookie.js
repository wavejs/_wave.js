'use strict';


function getHost() {
  var _host = document.location.host.split('.');
  return '.' + _host[_host.length-2] + '.' + _host[_host.length-1];
};


/**
 * 
 * 저장된 쿠키 내용을 읽는다.
 * @function getCookie
 * @memberOf module:utils
 * 
 * @param  {string} cname 읽어야 하는 cookie name
 * @return {string} 
 * 
 */
exports.getCookie = function(cname) {
 if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(cname + "=");
    if (c_start != -1) {
      c_start = c_start + cname.length+1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return decodeURIComponent(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
};

/**
 * 쿠키를 저장한다.
 * @function setCookie
 * @memberOf module:utils
 * 
 * @param {string} cname
 * @param {object} cvalue
 * @param {object} exdays
 * @return {}
 * 
 */
exports.setCookie = function(cname, cvalue, exdays) {
  var d = new Date();
  if(exdays == 0) d = 0;
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires='+d.toGMTString();
  var path = 'path=/';
  var domain = 'domain=' + getHost() + ';';
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + path + '; ' + domain;
};

/**
 * 쿠키를 삭제한다.
 * @function deleteCookie
 * @memberOf module:utils
 * 
 * @param {string} cname
 * @return {}
 * 
 */
exports.deleteCookie = function(cname) {
  // document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  this.setCookie(cname, '', 'Thu, 01 Jan 1970 00:00:01 GMT');
};