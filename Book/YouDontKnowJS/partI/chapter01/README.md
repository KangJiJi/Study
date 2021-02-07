# CHAPTER 1 타입

&nbsp;자바스크립트에는 타입의 개념이 있다. 다음은 ECMA 표준 명세서 5.1이다.

_ECMAScript 프로그래머가 ECMAScript 언어를 이용하여 직접 조작하는 값들의 타입이 바로 ECMAScript 언어 타입이다. ECMAScript 언어 타입에는 Undefined, Null, Boolean, String, Number, Object가 있다._

'타입'이란 자바스크립트 엔진, 개발자 모두에게 값을 구분할 수 있는 고유한 내부 특성의 집합이다. 42와 "42"는 타입이 다른다. 각각은 숫자와 문자열의 타입으로 취급된다.

## 1. 타입, 그 실체를 이해하자

&nbsp;거의 모든 자바스크립트 프로그램에서 강제변화(Coercion)이 일어난다. 1 + "123"은 124가 아닌 "1123"이 된다. 이렇게 강제변환은 다양한 방식으로 일어난다.

## 2. 내장 타입

&nbsp;자바스크립트에는 7가지 내장 타입이 있다.

- null
- undefined
- boolean
- number
- string
- object
- symbol

> object를 제외한 이들을 '원시 타입(Primitives)'이라 한다.

값 타입은 `typeof`연산자로 알 수 있다.

```javascript
typeof undefined === "undefined"; // true
typeof ture ==== "boolean"; // true
typeof 42 === "number"; // true
typeof "42" === "string"; // true
typeof { life: 42 } === "object"; // true
typeof Symbol() === "symbol"; // true

typeof null === "object"; //true
```

`null`에 대한 `typeof`연산 결과는 버그 같이 보인다. 따라서 타입을 `null`값을 정확하게 확인하려면 조건이 필요하다.

```javascript
var a = null;
!a && typeof a === "object"; // true
```

`null`은 'falsy'한(false와 다름없는) 유일한 원시 값이지만, 타입은 'object'인 특별한 존재다.

`typeof`는 fucntion을 반환하기도 한다.

```javascript
typeof function a() {} === "function"; // ture
```

function은 `object`의 '하위 타입'이다. 함수는 '호출 가능한 객체' 라고 명시되어 있다.

함수는 객체이기 때문에 유용한다. 다음과 같이 `length`프로퍼티로 인자 개수를 알 수 있다.

```javascript
function a(b, c) {}

a.length; // 2
```

배열은 `length`프로퍼티가 자동으로 관리되는 등의 추가 특성을 지닌, 객체의 '하위 타입'이다.

```javascript
typeof [1, 2, 3] === "object"; // true
```

## 3. 값은 타입을 가진다.

&nbsp;값은 타입이 있지만, 변수는 어떤 형태의 값이라도 가질 수 있다. 이는 자바스크립트는 '타입 강제(Type Enforcement)'를 하지 않기 때문이다. 변수에 `typeof`연산을 하는 것은 "이 변수에 들어있는 값의 타입은 무었인가?" 라고 묻는 것이다.

### 값이 없는 vs 선언되지 않은

&nbsp;값이 없는 변수의 값은 `undefined`이며, `typeof`의 결과는 `undefined`다.

```javascript
var b = 42;
var c;

b = c;

typeof b; // undefined
typeof c; // undefined
```

"undefined"(값이 없는) 와 "undeclared"(선언되지 않은)는 완전히 다른 개념이다. "undefined"는 변수가 선언되었으나 아무런 값도 할당되지 않은 상태를 가리키는 반면, "undeclared"는 접근 가능한 스코프에 변수 자체가 선언조차 되지 않은 상태를 의미한다.

```javascript
var a;

a; // undefined
b; // Uncaught ReferenceError: b is not defined
```

위 코드에서 `b is not defined`는 `undefined`와 다르며 a는 `undefined`이고, b는 `undeclared`이다.

```javascript
var a;

typeof a; // "undefined"
typeof b; // "undefined"
```

`typeof`연산결과는 `undefined`와 `undeclared`변수 모두 `undefined`로 나온다. 이는 `typeof`만의 독특한 안전 가드(safety guard)로 `undeclared`변수를 오류 처리 하지 않는다.

### 선언되지 않은 변수

&nbsp;여러 스크립트 파일의 변수들이 전역 네임스페이스(namespace)를 공유할 떄, `typeof`의 안전 가드는 의외로 쓸모 있다.

> ES6부터는 모듈을 일급 개념으로 지원하기 떄문에 작성한 코드의 모든 변수가 전용(Private) 또는 별도의 네임스페이스에만 있을 수 있다.

최상위 전역 스코프에 `var DEBUG = ture` 라고 'debug.js' 파일에 선언한다. 이때 `typeof`안전 가드가 좋은 역할을 한다.

```javascript
// 이렇게 하면 에러가 난다.
if (DEBUG) console.log("Start Debug");

// 이렇게 해야 안전하게 존재 여부를 체크할 수 있다.
if (typeof DEBUG !== "undefined") console.log("Start Debug");
```

내장 API기능을 체크할 떄에도 에러가 나지 않게 도와준다.

```javascript
if (typeof atob === "undefined") atob = function () {};
```

> if문 블록에 `var`키워드로 선언하면 실행을 건너뛰더라도 최상위 스코프로 호이스팅(Hoisting)된다. 따라서 명시적으로 `var`를 뺴야 선언문이 호이스팅되지 않는다.

`typeof`안전 가드 없이 전역 변수 체크하는 방법은 전역 변수가 모두 전역 객체의 프로퍼티라는 점을 이용하는 것이다. 하지만 Node.js환경에서는 `window`객체로 전역 변수를 참조하지 않는다.

또한 가져다 쓰는 프로그램에 유틸리티의 특정 변수의 값을 검사해야 한다면 다음과 같이 할 수 있다.

```javascript
function doSomethingCool() {
  var helper = typeof FeatureXYZ !== "undfined" ? FeatureXYZ : function () {};

  var val = helper();
}
```

## 4. 정리하기

- 자바스크립트에는 7가지 내장 타입이 있으며, `typeof`연산자로 타입명을 알아낸다.
- 변수는 타입이 없지만 값은 타입이 있고, 타입은 값의 내재된 특성을 정의한다.
- `undefined`와 `undeclared`는 다르다.
- `undeclared`의 `typeof`반환 값은 `undefined`다.
- `typeof`안전 가드 덕분에 선언되지 않는 변수에 사용하면 유용하다.
