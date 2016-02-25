'use strict';

var helpers = require('./helpers');

var protoArray = Array.prototype,
    protoObject = Object.prototype;

var push = protoArray.push,
    slice = protoArray.slice,
    hasOwn = protoObject.hasOwnProperty;

/**
 * 객체를 확장합니다.
 * 
 * @param {boolean} [proto] is optional, 체이닝을 위한 프로토타입 할당 여부입니다.
 * @param {function|object} destination 확장 대상이 될 객체입니다.
 * @param {object} sources 확장할 함수 집합의 객체, n개의 매개변수를 가질 수 있습니다.
 * @return {function|object} 확장된 destination 객체를 반환합니다.
 */
exports.wind = function (/* [proto], destination, sources */) {
    var args = slice.call(arguments, 0),
        dest = args.shift(),
        proto = false;

    var i,
        l,
        source,
        prop;

    // proto 매개변수 존재 여부에 따른 재할당
    if (helpers.isBoolean(dest)) {
        proto = dest;
        dest = args.shift();
    }

    // function 또는 object 타입 체크
    if (!helpers.isFunction(dest) && !helpers.isObject(dest)) {
        throw new TypeError('type of target is invalid. {function|object}');
    }

    // prototype 확장이 활성화된 경우 대상 객체가 함수 타입인지 체크
    if (proto && !helpers.isFunction(dest)) {
        throw new TypeError('type of target is invalid. {function}');
    }

    // dest에 할당할 sources 루프
    for (i = 0, l = args.length; i < l; i++) {
        source = args[i];

        for (prop in source) {
            // source의 프로퍼티만 적용
            if (!hasOwn.call(source, prop)) { continue; }

            // function만 허용
            if (!helpers.isFunction(source[prop])) { continue; }

            // dest에 이미 포함된 프로퍼티인 경우 제외
            // @todo 오류를 출력할지? 제외만 할지?
            // if (hasOwn.call(dest, prop)) { continue; }
            if (hasOwn.call(dest, prop)) { throw new Error('already defined - ' + prop); }

            var func = dest[prop] = source[prop];

            // 프로토타입 할당 제외인 경우
            if (!proto) { continue; }

            // 체이닝을 위한 dest의 프로퍼티를 호출하는 프로토타입 할당
            dest.prototype[prop] = (function (fn, dst) {
                return function () {
                    var args = [this._obj];

                    push.apply(args, arguments);

                    return dst(fn.apply(dst, args));
                };
            }(func, dest));
        }
    }

    return dest;
};

/**
 * 객체의 프로퍼티를 확장합니다.
 * 실제 역할은 wind()에 proto 옵션을 비활성하여 호출하는 형태입니다.
 * 
 * @param {function|object} destination 확장 대상이 될 객체입니다.
 * @param {object} sources 확장할 함수 집합의 객체, n개의 매개변수를 가질 수 있습니다.
 * @return {function|object} 확장된 destination 객체를 반환합니다.
 */
exports.breeze = function (/* destination, sources */) {
    var args = [false];

    push.apply(args, arguments);

    return this.wind.apply(null, args);
};

/**
 * 객체의 프로퍼티 및 프로토타입을 확장합니다.
 * 실제 역할은 wind()에 proto 옵션을 활성하여 호출하는 형태입니다.
 * 
 * @param {function|object} destination 확장 대상이 될 객체입니다.
 * @param {object} sources 확장할 함수 집합의 객체, n개의 매개변수를 가질 수 있습니다.
 * @return {function|object} 확장된 destination 객체를 반환합니다.
 */
exports.gust = function (/* destination, sources */) {
    var args = [true];

    push.apply(args, arguments);

    return this.wind.apply(null, args);
};