/**
<<<<<<< HEAD
 * wave.js JavaScript Library v0.1.0
=======
 * wave.js JavaScript Library v0.0.1
>>>>>>> master
 * 
 * http://wavejs.io
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('wave', [], factory);
    } else if (typeof exports === 'object') {
        // CommonJS, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals
        root.wave = root.wave || factory();
    }
}(typeof window !== 'undefined' ? window : this, function() {

    'use strict';

    var wave = {};


    wave.VERSION = '0.0.1';


    // ----------------------------
    // wave.js Collection Functions
    // ----------------------------

    

    // ----------------------------
    // wave.js UserAgent Function
    // ----------------------------
    wave.ua = (function() {

    /**
     * [UserAgent]
     * @return {[Object]} [Get Browser's UserAgent value.]
     */
    wave.ua = (function() {

        var ua = window.navigator.userAgent.toString().toLowerCase();

        function checkUserAgent(ua) {
            var browser = {};
            var match = /(dolfin)[ \/]([\w.]+)/.exec(ua) ||
                /(edge)[ \/]([\w.]+)/.exec(ua) ||
                /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
                /(webkit)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) ||
                ["", "unknown"];
            if (match[1] === "webkit") {
                match = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(ua) ||
                    /(android)[ \/]([\w._\-]+);/.exec(ua) || [match[0], "safari", match[2]];
            } else if (match[1] === "mozilla") {
                if (/trident/.test(ua)) {
                    match[1] = "msie";
                } else {
                    match[1] = "firefox";
                }
            } else if (match[1] === "edge") {
                match[1] = "spartan";
            } else if (/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(ua)) {
                match[1] = "polaris";
            }

            browser[match[1]] = true;
            browser.name = match[1];
            browser.version = setVersion(match[2]);

            return browser;
        }

        function setVersion(versionString) {
            var version = {};

            var versions = versionString ? versionString.split(/\.|-|_/) : ["0", "0", "0"];
            version.info = versions.join(".");
            version.major = versions[0] || "0";
            version.minor = versions[1] || "0";
            version.patch = versions[2] || "0";

            return version;
        }

        function checkPlatform(ua) {
            if (isPc(ua)) {
                return "pc";
            } else if (isTablet(ua)) {
                return "tablet";
            } else if (isMobile(ua)) {
                return "mobile";
            } else {
                return "";
            }
        }

        function isPc(ua) {
            if (ua.match(/linux|windows (nt|98)|macintosh/) && !ua.match(/android|mobile|polaris|lgtelecom|uzard|natebrowser|ktf;|skt;/)) {
                return true;
            }
            return false;
        }

        function isTablet(ua) {
            if (ua.match(/ipad/) || (ua.match(/android/) && !ua.match(/mobi|mini|fennec/))) {
                return true;
            }
            return false;
        }

        function isMobile(ua) {
            if (!!ua.match(/ip(hone|od)|android.+mobile|windows (ce|phone)|blackberry|bb10|symbian|webos|firefox.+fennec|opera m(ob|in)i|polaris|iemobile|lgtelecom|nokia|sonyericsson|dolfin|uzard|natebrowser|ktf;|skt;/)) {
                return true;
            } else {
                return false;
            }
        }

        function checkOs(ua) {
            var os = {},
                match = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(ua) ||
                /(android)[ \/]([\w._\-]+);/.exec(ua) ||
                (/android/.test(ua) ? ["", "android", "0.0.0"] : false) ||
                (/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(ua) ? ["", "polaris", "0.0.0"] : false) ||
                /(windows)(?: nt | phone(?: os){0,1} | )([\w._\-]+)/.exec(ua) ||
                (/(windows)/.test(ua) ? ["", "windows", "0.0.0"] : false) ||
                /(mac) os x ([\w._\-]+)/.exec(ua) ||
                (/(linux)/.test(ua) ? ["", "linux", "0.0.0"] : false) ||
                (/webos/.test(ua) ? ["", "webos", "0.0.0"] : false) ||
                /(bada)[ \/]([\w._\-]+)/.exec(ua) ||
                (/bada/.test(ua) ? ["", "bada", "0.0.0"] : false) ||
                (/(rim|blackberry|bb10)/.test(ua) ? ["", "blackberry", "0.0.0"] : false) ||
                ["", "unknown", "0.0.0"];

            if (match[1] === "iphone" || match[1] === "ipad" || match[1] === "ipod") {
                match[1] = "ios";
            } else if (match[1] === "windows" && match[2] === "98") {
                match[2] = "0.98.0";
            }
            os[match[1]] = true;
            os.name = match[1];
            os.version = setVersion(match[2]);
            return os;
        }

        function checkApp(ua) {
            var app = {},
                match = /(crios)[ \/]([\w.]+)/.exec(ua) ||
                /(daumapps)[ \/]([\w.]+)/.exec(ua) ||
                ["", ""];

            if (match[1]) {
                app.isApp = true;
                app.name = match[1];
                app.version = setVersion(match[2]);
            } else {
                app.isApp = false;
            }

            return app;
        }

        return {
            ua: ua,
            browser: checkUserAgent(ua),
            platform: checkPlatform(ua),
            os: checkOs(ua),
            app: checkApp(ua)
        };
    }());

    return wave;
}));