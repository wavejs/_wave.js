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