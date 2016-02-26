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
* 아래 구성에서 적용하고자 하는 패턴이 추상화된 멤버를 구성하고자 하는 패턴이지만 구체화되지는 않은 상태입니다.
* 예를들면 UserAgent를 instance 생성시 initialize가 호출될때 멤버변수를 구성하는 방법입니다.
* `프로토타입 멤버변수 확장 형태`는 인스턴스 생성시 부가적인 환경구성을 위한 샘플링 형태입니다.
* `프로토타입 기본 형태`는 반드시 필요한 멤버변수와 프로토타입만 확장한 형태입니다.
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

### 고민거리들..

* 메모리 관리의 효율을 높이기 위한 패턴 적용
* 확장하고자하는 method들을 namespace를 가진 객체를 은닉화하여 관리하는 방안
* 은닉화된 메서드들을 호출하는 property 및 prototype 메서드 구현
* namespace를 가진 메서드들을 assign 및 merge하며, 중복된 메서드들에 대한 오버로딩 map 구현
* 은닉화된 메서드들에 대한 public 속성을 가지지만 내부함수처럼 사용되는 getter/setter factory 구현
* 은닉의 범위를 멤버변수도 포함할 것인가?
* 확장 메서드가 체이닝되지 않은 형태에서도 생성자 확장 및 chainning되는 형태 구현
* 확장하기 위한 기본 함수들..예를들면 유틸리티 성격의 함수들을 메서드 1개의 단위를 기준으로 js파일 생성하는 형태
* 사용할 만한 Class를 재사용가능한 객체단위로 구현하고, Core initialize에 포함하는 형태 구현
* Constructor의 정의
* Core에 확장을 위한 interface, 즉 Wave에 UI, DOM, ENV 등의 확장을 위한 interface 구현
* 주석에서 표현하고자 하는 범위 및 표현 방법, JSDoc 버전 기준일 수도 있으나 일반적으로 사용되지 않는 @chainable 등의 형태
* e.g. @param의 type이 {Object} ? {object} ? , {Mixed} ? 등등..
* minify된 js 주석 내용 체크
* extend 함수의 deep/shallow copy 처리
* Built-in native 객체에 대한 공통 처리 여부
* Core에 predefine될 요소들에 대한 고민
* 확장시 Chainning될 메서드와 Chainning을 마치는 메서드의 구분이 필요할 것인가?
