# wave.js

### Standard of Prototype 
---
	1. Build - 각각의 파일을 어떻게 연결하는 지
	2. 어떤 방식으로 사용되는 지,
	3. 2번의 사용방식을 위해 어떤 방식으로 만들었는 지
	4. 각각의 스캐폴딩 구성을 어떻게 하는 지
	5. UMD 패턴에 기초하여 만들었는 지
	6. 업데이트 시 어떤 방식으로 진행하는 지
	7. 각각의 파일들 테스트 방식( string 에서 array 를 사용하고 싶을때 )
	8. 좀 더 강한 타입 체크
	9. Core단에서 어떤 역할을 하는지
	

### Scaffolding
---
	-- src 		-- utils 		-- utils.js	     // Factory Pattern
	                			-- ClassTest.js  // Prototype Pattern
           		-- core.js
           		-- wave.prefix.js
           		-- wave.suffix.js
           
<br />

### Base Build (Merge)
---
wave.prefix.js + core.js + **Contents** + wave.suffix.js
<br /><br />

### Standard of Prototype - 어떤 방식으로 사용하는지
---
**Base Function**
	
	Prototype형 함수 및 Factory형 함수에 대한 모듈 등록이 원활하게 진행
	
	/**
	* @param  {String}   name           [모듈 이름]  
	* @param  {Function} moduleFunction [모듈 Function] 
	* @param  {Boolean}  classPattern   [생성자형태로 모듈에 등록할 것인지에 대한 여부]
	*/
	
	wave.module = function(name, moduleFunction, classPattern){}
<br />
**Factory Pattern**
	
	src/utils/utils.js
	
	wave.module('utils', function(){
    	return{
        	trim: function(){
      	      console.log('trim');
     	   }, 

       	 watchList: function(){
            console.log('watchList');
          }
    	}
	})
	
	// 사용
	1) wave.trim();
	2) wave.$$modile.utils.trim();
	
	
<br />
**Prototype Pattern**
	
	src/utils/ClassTest.js
	
	function ClassTest(a, b, c){
    	this.test = 'abc';
    	this.getScope = function(){
        	console.log(this);
        	return this;
    	}
    	this.trace = function(){
        	console.log(a, b, c);
    	}
	}
	ClassTest.prototype = {
    	view: function(){
        	console.log('ClassTest');
   		}
	}

	wave.module('ClassTest', ClassTest, true);
	
	// 사용
	1) var classtest = new wave.ClassTest(a,b,c);
	2) var classtest = new wave.$$module.ClassTest(a,b,c); 
	
<br />

### Standard of Prototype - Core단에서 어떤 역할을 하는지
---
**wave 기반의 모든 오브젝트에 반영 할 수 있는 함수들**

	// Common Utils
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;
	var join = Array.prototype.join;

	// Check type
	function isObject(value) {return value !== null && typeof value === 'object';}
	function isString(value) {return typeof value === 'string';}
	function isNumber(value) {return typeof value === 'number';}
	function isFunction(value) {return typeof value === 'function';}
	function isRegExp(value) {return toString.call(value) === '[object RegExp]';}
	function isArray(value) {return toString.call(value) === '[object Array]';}
	function isUndefined(value) {return value === undefined;}
	function isNull(value) {return value === null;}
	
	// 사용
	wave.isObject()
	wave.isString()
		
<br />
**module 관리**
	
	- moduleList 라는 private variables 생성
	- wave.$$module 에서 리스트 관리
	- 해당 리스트에 같은 namespace가 들어올 경우 리스트 추가 안됨(throw new error)
	
<br />
**Others Core`s spec**
	
	wave.VERSION // wave JS Version
	wave.config = {	// wave common config
		debug: true	// wave debug mode
	}
	- 현재 debug 모드로 실행할 경우 wave.module로 추가된 부분은 window(전역)로 접근이 가능하다.
	
	wave.extend()
	- wave 확장의 핵심소스
	- 기본 Object 확장과 유사한 구조를 가지고 있으나 wave로 확장할 경우 기존의 wave내의 레퍼런스를 체크하여 없을 경우 확장한다.
	
	* @example
    1.  wave.extend({a:1,b:2}, {a:2,b:3,c:4}, {d:3}) --> Object {a: 2, b: 3, c: 4, d: 3}
    2.  wave.extend(wave, function(){
            var method1 = function(){};
            return{
                method1: method1,
                method2: function(){}
            }
        })
    3.  var ClassType = function(){};
        ClassType.prototype = {}; 
        wave.extend(wave, {classname:ClassType})

    ** 2, 3 같은 경우는 extend를 직접사용하지 않고 module method를 사용
    
    
<br />

### Standard of Prototype - 고려했던 사항
---
		
* 각각의 파일들 테스트 방식( string 에서 array 를 사용하고 싶을때 )
	* 가장 첫 필수적인 include list는 core.js 를 기반으로 진행
		* ex ) utils.js를 테스트하고 싶을 때, core.js를 가장 상단으로 위치시킨다.
		* string-utils.js 와 array-utils.js 가 각각의 파일에 dependensy가 있다면 각각 include 한다.
<br /><br />
		
* 기본적으로 들어가는 wave 함수뿐만 아니라 커스텀 함수를 고려 하여 wave.module function 제작
	* module의 namespace만 겹치지 않는 다면 동적으로 등록가능
	* 차후 wave.method 형태가 아닌 wave.fn.method 형태도 예상할 수 있음
	
	