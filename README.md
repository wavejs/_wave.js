# wave.js

### Standard of Prototype 
---
	1. Build - 각각의 파일을 어떻게 연결하는 지
	2. 어떤 방식으로 사용되는 지,
	3. 2번의 사용방식을 위해 어떤 방식으로 만들었는 지
	4. 각각의 스캐폴딩 구성을 어떻게 하는 지
	5. UMD 패턴에 기초하여 만들었는 지(x, build단에서 해결)
	6. 업데이트 시 어떤 방식으로 진행하는 지
	7. 각각의 파일들 테스트 방식( string 에서 array 를 사용하고 싶을때 )
	8. 좀 더 강한 타입 체크(x)
	9. Core단에서 어떤 역할을 하는지
	10. [2016.01.15 추가] Node 기반으로 재작업
	

### Scaffolding
---
	-- src 		-- utils 		-- anyutils.js	 // Function in Object Pattern
								-- string.js     // Function in Object Pattern
	                			-- ClassTest.js  // Prototype Pattern
	                			-- index.js		 // 앞의 3개의 파일을 묶어주는 파일
	                			
	            -- core 		-- index.js	     // WaveJS Core
								-- logger.js     // WaveJS Log Function

           		-- wave.js		// WaveJS 의 Build의 시작점 

           
<br />

### Base Build (Merge)
---
진행하지 않음.
<br /><br />

### Standard of Prototype - 어떤 방식으로 사용하는지
---
**Step 1 : 기본적인 wave의 index 설명**
	
	전역으로 사용하는 wave의 모체는 Core애서 만들어진다.
	기본적인 함수는 core에서 바로 extend 한다.
	
	/** wave.js (Build의 기준이 되는 파일) */
	
	var wave = require('./core/index');
	var utils = require('./utils');
	var log = require('./core/logger');
	
	// 실제 wave에 모듈을 등록한다.
	실제 wave는 moduleList를 가지고 있다.
	기본적인 wave.extend 를 통해, 확장할 수 있지만,
	moduler 함수는 moduleList 안에 명명한 이름으로 추가하고, wave.$$module 안에서 해당 모듈 확인이 가능하다.
	
	wave.moduler('utils',utils);
	
	--> 이경우에 utils 안의 함수들을 wave.method 형태로 사용가능하며, 
		또한 wave.$$module.utils.method 형태로 확인이 가능하다. 
	
	/** 모듈 등록시 사용되는 moduler function 설명 */
	Prototype형 함수 및 Factory형 함수에 대한 모듈 등록이 원활하게 진행
	
	/**
	* @param  {String}   name           [모듈 이름]  
	* @param  {Function} moduleFunction [모듈 Function] 
	* @param  {Boolean}  classPattern   [생성자형태로 모듈에 등록할 것인지에 대한 여부]
	*/
	
	moduler = function(name, moduleFunction, classPattern){}
<br />
**Step 2 : 각 폴더의 index.js **
	
	utils 에서 확인한 바와 같이 각 src/folder 안에는 해당 파일들을 묶어주는 index.js가 존재한다.
	(core는 제외)
	
	/** src/utils/index.js */
	var wave = require('../core/index');
	var utils = require('./anyutils');
	var strings = require('./string');
	var classTest = require('./ClassTest', true);
	
	/** 주의 */
	여기서 확장하는 부분은 Step.1의 wave처럼 wave를 확장시키는 것이 기준이 아니라, 
	해당 모듈(module.exports)을 확장하는 것이다.
	utils 폴더 안의 각각의 유틸 모듈들을 기존 모듈에서 확장(extend)시킨다.(통합)

	wave.extend(module.exports, utils, strings, classTest);
	
	Step 1에서 
	var utils = require('./utils'); 로 통합된 utils모듈을 가져오고,
	이 부분을 wave.moduler()을 통해서 wave에 등록한다.
	(wave에 등록하는 건 wave.js에서만 진행)
	
<br />
**Module 등록 : Basic Function Pattern**
	
	/** src/utils/anyutil.js */
	var log = require('../core/logger');
	
	- 동일폴더의 index.js(src/utils/index.js)를 참고하여 해당 모듈을 가져온다.
	- utils 의 모든 유틸이 합쳐진 형태
	- 해당 로드 되는 시점은 src/utils/index.js 에서 require 시점이 아닌,
	  util들이 module.exports 안으로 들어가는 시점 이후로 반영됨
	
	var utils = require('./');

	var anyUtils = {
    	testFunc: function(){
        	log('[testFunc]util : ', utils.stringlength());
    	},

   	 	trim: function(){
   	     	log('strUtils',util);
    	    	log('trim');
   	 	}, 

   	 	watchList: function(){
        	log('watchList');
     	},

  	  	//duplicate test
  	  	- string.js 에 있는 함수명과 동일한 이름
  	  	- core단에서 해당 부분 감지하고 등록시키지 않음(throw new error)
  	  	/*stringsum: function(){
  	      	console.log('중복됨!!!!!!');
  	  	}*/
	}
	
	module.exports = anyUtils;
	
<br />
**Module 등록 : Prototype Pattern**
	
	/** src/utils/ClassTest.js */
	
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

	module.exports = ClassTest;
	
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
	
	- wave.$$module 에서 리스트 관리
	- 해당 리스트에 같은 namespace가 들어올 경우 리스트 추가 안됨(throw new error)
	
<br />
**Others Core`s spec**
	
	wave.config = {	// wave common config
		debug: true	// wave debug mode
	}
	
	extend()
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
	* 상단에 var utils = require('./'); 구문을 추가하여 사용
<br /><br />
		
* 기본적으로 들어가는 wave 함수뿐만 아니라 커스텀 함수를 고려 하여 wave.module function 제작
	* module의 namespace만 겹치지 않는 다면 동적으로 등록가능
	* 차후 wave.method 형태가 아닌 wave.fn.method 형태도 예상할 수 있음
	
	