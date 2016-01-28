(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* append */
},{}],2:[function(require,module,exports){
'use strict';

module.exports = require('./src/Wave');
},{"./src/Wave":4}],3:[function(require,module,exports){
/* prepend */
},{}],4:[function(require,module,exports){
'use strict';

var Wave = {};
var WaveCore = require('./core');
var WaveUtils = require('./utils');
var WaveVersion = require('./WaveVersion');

WaveCore.Modular(Wave)
  .assign(WaveCore)
  .assign(WaveUtils)
  .assign(WaveVersion)
  .regist('utils', WaveUtils);

// WaveCore.Modular(Wave)
//   .assign(WaveCore, WaveUtils, WaveVersion)
//   .regist('utils', WaveUtils);

module.exports = Wave;
},{"./WaveVersion":5,"./core":6,"./utils":9}],5:[function(require,module,exports){
'use strict';

exports.version = '0.1.0';
},{}],6:[function(require,module,exports){
'use strict';

var Modular = require('./modular');

// modular(module.exports).assign({modular: modular});

module.exports = {
  Modular: Modular
};
},{"./modular":7}],7:[function(require,module,exports){
'use strict';

var protoArray = Array.prototype;
var protoObject = Object.prototype;
var protoFunction = Function.prototype;

var hasOwn = protoObject.hasOwnProperty;

var PREFIX = '$$modules';

function Modular(target) {
  if (!(this instanceof Modular)) {
    console.log('this', this, target);
    return new Modular(target);
  }

  this.obj = target;
}

Modular.prototype.assign = function () {
  var to = Object(this.obj);

  for (var i = 0, len = arguments.length; i < len; i++) {
    var from = Object(arguments[i]);

    for (var key in from) {
      if (hasOwn.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return this;
};

Modular.prototype.regist = function (name, source) {
  var obj = this.obj;

  if (!hasOwn.call(obj, PREFIX)) {
    obj[PREFIX] = {};
  }

  obj[PREFIX][name] = source;

  return this;
};

Modular.prototype.getObject = function () {
  return this.obj;
};

module.exports = Modular;
},{}],8:[function(require,module,exports){
'use strict';

var utils = require('./');

exports.isArray = function(obj) {
  return typeof obj === 'array';
};

exports.size = function(arr) {
  if (Object.prototype.toString.call(arr) === '[object String]') {
    return utils.len(arr);
  } else {
    return arr.length;
  }
};
},{"./":9}],9:[function(require,module,exports){
'use strict';

var Core = require('../core');

Core.Modular(module.exports)
  .assign(require('./array'))
  .assign(require('./string'));

/*
Core.extend(
  module.exports,
  require('./array'),
  require('./string')
);

Core.modular(module.exports)
  .assign(require('./array'))
  .assign(require('./string'));

Core.modular(module.exports)
  .assign(require('./array'))
  .assign(require('./string'))
  .regist();

Core.modular(module.exports)
  .assign(require('./array'), require('./string'));


Core.modular(module.exports)
  .assign(require('./array'), require('./string'));
*/
},{"../core":6,"./array":8,"./string":10}],10:[function(require,module,exports){
'use strict';

var utils = require('./');

exports.isString = function(obj) {
  return typeof obj === 'string';
};

exports.len = function(str) {
  return str.length;
};
},{"./":9}]},{},[3,2,1]);
