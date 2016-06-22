'use strict';

var Core = require('../../core');

var info = null;

function getHost() {return location.host.split('.')[0];}
function getDocumentDomain() {return document.domain;}
function getHash() {return location.hash;}
function getParam() {return location.search;}
function getUrl() {return location.href;}
function isSSL() {return 'https:' == document.location.protocol;}
function getServerName() {return location.hostname;}

/*exports.browserInfo = {
    getHost: getHost,
    getDocumentDomain: getDocumentDomain,
    getHash: getHash,
    getParam: getParam,
    getUrl: getUrl,
    isSSL: isSSL,
    getServerName: getServerName,
    getInfo: function(updateCh) {
        if (updateCh || Core.isNull(info)) {
            info = {
                host: getHost(),
                documentDomain: getDocumentDomain(),
                hash: getHash(),
                param: getParam(),
                url: getUrl(),
                isSSL: isSSL(),
                serverName: getServerName()
            }
        }
        return info;
    }
}*/

exports.getHash = function(){};