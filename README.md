# wave.js

## Install

clone 및 checkout
```
git clone https://github.com/wavejs/wave.js.git
git checkout feature-prototype-review1
```

package 설치 및 실행
```
npm install

gulp watch
```

## Build

```
# watch 이후 저장시마다 lint, test, build 등이 진행됩니다.
gulp watch
# build
gulp build
# build minify
gulp build-min
# lint
gulp lint
# test
gulp test
```

## Scaffolding

```
-- dist        #배포 파일
-- doc         #문서 파일
-- examples    #샘플 모음
-- src         #소스 파일
  -- core      #코어
  -- utils     #유틸리티
-- test
.foreverignore #forever 데몬 환경설정
.gitignore     #git 환경설정
.jshintrc      #js-hint 환경설정
gulpfile.js    #gulp 환경설정
index.js       #node 기반 main js
LICENSE        #라이센스
package.json   #패키지 환경설정
README.md      #README markdown 문서
```

### Core - src/core/index.js
* Core 구성을 위한 index 입니다.
* `프로토타입 멤버변수 확장 형태`는 인스턴스 생성시 부가적인 환경 구성안입니다.
* `프로토타입 기본 형태`는 반드시 필요한 멤버변수와 프로토타입만 확장안입니다.
```
/*********************
 * 프로토타입 멤버변수 확장 형태 - begin
 *********************/
var protoCore = {
    constructor: Core,
    _init: function (obj) {
        this._obj = obj;
        this.info = {};
        this._set(obj);
    },
    _make: function (length, keys) {
        return {
            count: length,
            keys: keys
        };
    },
    _set: function (obj) {
        if (Core.isArray(obj)) {
            this.info = this._make(obj.length, Core.keys(obj));
        }
    },
    val: function () {
        return this._obj;
    }
};

Core.prototype = protoCore;
/*********************
 * 프로토타입 멤버변수 확장 - end
 *********************/
```

```
/*********************
 * 프로토타입 기본 형태 - begin
 *********************/
/**
 * Returns an object (chained object)
 * @return {Mixed}
 */
// Core.prototype.val = function () {
//     return this._obj;
// };
/*********************
 * 프로토타입 기본 형태 - end
 *********************/
```

### 객체 확장 - src/core/mix.js
* `wind` 메서드가 base이며 property할당과 property를 호출하는 prototype 확장기능이 있습니다.
* `wind`는 파도를 만드는 매개체 역할을 합니다.
* `breeze`는 property만 확장합니다. (미풍의 뜻을 갖고 있습니다;;)
* `gust`는 property와 prototype을 확장합니다. (돌풍의 뜻을 갖고 있습니다;;)
```
// 예시)
wind(Core, {
  method1: function () {}, method2: function () {}
}, {
  func1: function () {}, func2: function () {}
});

breeze(Core, {
  method1: function () {}, method2: function () {}
}, {
  func1: function () {}, func2: function () {}
});

gust(Core, {
  method1: function () {}, method2: function () {}
}, {
  func1: function () {}, func2: function () {}
});

// 예시) 현재 core/index.js에 정의된 형태
// Mixin Core
winds.wind(Core, winds);

// Mixin requires
Core.breeze(Core, helpers);

// Mixin requires with prototype
Core.gust(Core, extend);
```
