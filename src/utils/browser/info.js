'use strict';

var Core = require('../../core');
var info = null;

var protoArray = Array.prototype,
    protoObject = Object.prototype;

var hasOwn = protoObject.hasOwnProperty;

/**
 * @function getHostDomain
 * @memberOf module:utils/browse
 * @readonly
 * @return {string} host domain
 */
exports.getHostDomain = function() {return location.host.split('.')[0];}

/**
 * @function getHost
 * @memberOf module:utils/browse
 * @readonly
 * @return {string} host
 */
exports.getHost = function() {return location.host;}

/**
 * @function getDocumentDomain
 * @memberOf module:utils/browse
 * @readonly
 * @return {string} document.domain
 */
exports.getDocumentDomain = function() {return document.domain;}

/**
 * @function getHash
 * @memberOf module:utils/browse
 * @readonly
 * @return {string} hash
 */
exports.getHash = function() {return location.hash;}

/**
 * @function getParam
 * @memberOf module:utils/browse
 * @readonly
 * @return {string} url param
 */
exports.getParam = function() {return location.search;}

/**
 * @function getUrl
 * @memberOf module:utils/browse
 * @readonly
 * @return {string} now Address
 */
exports.getUrl = function() {return location.href;}

/**
 * @function isSSL
 * @memberOf module:utils/browse
 * @readonly
 * @return {boolean} https == true, http == false
 */
exports.isSSL = function() {return 'https:' == document.location.protocol;}

/**
 * @function getServerName
 * @memberOf module:utils/browse
 * @readonly
 * @return {string} hostname
 */
exports.getServerName = function() {return location.hostname;}

/**
 * 
 * 현재 브라우져의 상태를 확인한다.
 * @function getInfo
 * @memberOf module:utils/browse
 * 
 * @param  {boolean} updateCh true == 새로 다시 정보를 부르는 경우
 * @return {object}
 * - hostDomain
 * - host
 * - documentDomain
 * - hash
 * - param
 * - url == location.href
 * - isSSL
 * - serverName == hostname
 */
exports.getInfo = function(updateCh) {
  if (updateCh || Core.isNull(info)) {
    info = {
      hostDomain: this.getHostDomain(),
      host: this.getHost(),
      documentDomain: this.getDocumentDomain(),
      hash: this.getHash(),
      param: this.getParam(),
      url: this.getUrl(),
      isSSL: this.isSSL(),
      serverName: this.getServerName()
    }
  }
  return info;
}

/**
 * url에서 Query-String 내의 요구한 Param의 대한 값 추출
 * @function isUrlParam
 * @memberOf module:utils/browse
 *
 * @param  {string} name Query String내에서 찾으려고 하는 parameter name
 * @return {string} value
 * @example 
 * url) http://www.wemakeprice.com/search?search_cate=top&search_keyword=강남&_service=5&_type=3
 * vv.getUrlParam('search_keyword') -> 강남
 */
exports.isUrlParam = function(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.href)||[,null])[1]
  );
}

/**
 *
 * 오브젝트를 Query-String로 바꾸어줌 
 * @function objToQueryString
 * @memberOf module:utils/browse
 *
 * @param  {object} obj Query String으로 변환할 object
 * @return {string}
 * @example 
 * vv.objToQueryString({a:1, b:2})  --> "a=1&b=2"
 */
exports.objToQueryString = function(obj){
  var str = [];
  for( var prop in obj ){
    if (hasOwn.call(obj, prop)) {
      str.push(prop + '=' + obj[prop]);
    }
  }
  return str.join('&');
};