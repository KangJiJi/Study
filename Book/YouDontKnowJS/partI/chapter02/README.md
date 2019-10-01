CHAPTER 2 값
==============

&nbsp;자바스크립트의 배열, 문자열, 숫자는 독특한 특성르 갖고 있다.

## 1. 배열
&nbsp;자바스크립트의 배열은 어떠한 값이라도 담을 수 있는 그릇이다.

```javascript
var a = [1, "2", [3]];

a.length; // 3
a[0] === 1; // true
a[2][0] === 3; // true
```

또한 배열 크기를 정하지 않고 선언이 가능하며 원하는 값을 추가할 수 있다.

```javascript
var a = [];
a.length; // 0

a[0] = 1;
a[1] = "2";
a[2] = [ 3 ];
a.length; // 3
```

> `delete` 연산자를 통해 배열의 슬롯(slot)을 제거할 수 있지만, `length`프로퍼티 값까지 바뀌지 않는다.

'구멍 난(sparse)' 배열을 다룰 때는 조심해야 한다.

```javascript
var a = [];

a[0] = 1;
a[2] = [ 3 ];

a[1]; // undefined

a.length; // 3
```

실행은 되지만 '빈 슬롯'은 혼란을 야기한다. 위 코드에서 `a[1]`는 `undefined`지만, 명식적으로 `a[1] = undefined`와는 다르다.

배열 자체도 하나의 객체이기 때문에 키/프로퍼티 문자열을 추가할 수 있다. 하지만 `length`프로퍼티는 증가하지 않는다.

```javascript
var a = [];

a[0] = 1;
a["foobar"] = 2;

a.length; // 1
a["foobar"]; // 2
a.foobar; // 2
```

또한 키 문자열이 숫자면 표준 10진수 숫자로 타입이 변해 마치 숫자 키를 사용한 것 같은 결과가 초래된다.

```javascript
var a = [];

a["13"] = 42;

a.length; // 14
```

### 유사 배열
&nbsp;유사 배열 값을 진짜 배열로 바꾸고 싶을 때는 배열 유틸리티 함수(`indexOf()`, `concat()`, `forEach()` 등) 를 사용하여 해결하는 것이 일반적이다.

> 유사 배열은 키가 숫자고, `length`라는 속성을 가지고 있으며, '[] (대괄호)'로 감싸져 있다. 유사배열의 경우 배열의 메서드를 사용할 수 없으며 대표적인 예로 function의 `arguments`가 있다.

진짜 배열로의 변환은 `slice()` 함수의 기능을 차용하는 방법을 가장 많이 사용한다.

```javascript
function foo() {
    var arr = Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
}

foo("bar", "baz"); // ["bar", "baz", "bam"]
```

`slice()` 함수에 인자가 없으면 기본 인자 값으로 구선된 배열을 복사한다.

> `Array.prototype.slice.call(arguments)`는 `Array.prototype.slice.call(arguments, 0)`와 같다.

ES6 부터는 `Array.from()`이 이 일을 대신한다.

```javascript
var arr = Array.from(arguments);
```

## 2. 문자열
&nbsp;자바스크립트의 문자열은 생김새만 비슷할 뿐 문자 배열과는 다르다.

```javascript
var a = "foo";
var b =["f", "o", "o"];

a.length; // 3
b.length; // 3

a.indexOf("o"); // 1
b.indexOf("o"); // 1

var c = a.concat("bar"); // "foobar"
var d = b.concat(["b", "a", "r"]); // ["f", "o", "o", "b", "a", "r"]

a === c; // false
b === d; // false

a; // "foo"
b; // ["f", "o", "o"]
```

위와 같이 문자열과 배열은 겉모습이 닮았다. 하지만 둘 다 '문자의 배열'은 아니다.

```javascript
a[1] = "O";
b[1] = "O";

a; // "foo"
b; // ["f", "O", "o"]
```

문자열은 불변 값(Immutable)이지만 배열은 가변 값(Mutable)이다.

```javascript
c = a.toUpperCase();
a === b; // false

a; // "foo"
c; // "FOO"
```

문자열은 불변 배열 메서드를 빌려 쓸 수는 있다.

```javascript
a.join; // undefined
a.map; // undefined

var c = Array.prototype.join.call(a, "-");
var d = Array.prototype.map.call(a, function(v) {
    return v.toUpperCase() + ".";
}).join("");

c; // "f-o-o"
d; // "F.O.O."
```

배열에는 `reverse()`라는 가변 메서드가 있지만, 문자열은 없다. 또한 문자열은 불변 값이라 배열의 가변 메서드를 '빌려 쓰는 것'도 안 된다. 그래서 문자열을 배열로 바꾸고 원하는 작업을 수행한 후 다시 문자열로 되돌리는 꼼수(Hack)을 사용한다.

```javascript
var c = a.split("").reverse().join("");

c; // "oof"
```

> 유니코드와 같은 복잡한 문자가 섞여 있는 경우 이 방법은 통하지 않는다. 정교한 라이브러리가 필요하다.

## 3. 숫자
&nbsp;자바스크립트의 숫자 타입은 `number`가 유일하며 '정수(Integer)', '부동 소수점 숫자(Fractional Decimal Number)'를 모두 아우른다. '정수'는 부동 소수점 값이 없는 값이다. 자바스크립트 `number`도 IEEE 754 표준을 따르고 있다.

### 숫자 구문
&nbsp; 자바스크립트 숫자 리터럴은 10진수 리터럴로 표시하고, 소수점 앞 정수가 0이면 생략이 가능하며, 소수점 이하가 0일 때도 생략이 가능하다. 그리고 소수점 이하 0은 뗀다.

```javascript
var a = 42;

var b = .42; // === 0.42

var c = 42.; // === 42.0 === 42

var d = 42.300; // === 42.3
```

아주 크거나 작은 값은 지수형(Exponent Form)으로 표시한다. 숫자 값은 `Number` 객체 래퍼(Wrapper)로 박싱(Boxing)할 수 있기 때문에 `Number.prototype` 메서드로 접근할 수도 있다. 예를 들어 `toFixed()`, `toPrecision()`와 같은 메서드를 사용할 수 있다.

```javascript
var a = 5E10;
a; // 50000000000
a.toExponential(); // "5e+10"

var b = 42.59;

b.toFixed(3); // "42.590"
b.toPrecision(5); // "42.590"
```

`toFixed()`는 지정한 소수점 이하 자릿수까지 숫자를 나타내고, `toPrecision()`은 유효 숫자 개수를 지정할 수 있다.

```javascript
42.toFixed(3); // SyntaxError
```

`42.toFixed(3)`에서는 .이 42. 리터럴의 일부가 돼 .toFixed메서드에 접근할 방법이 사라진다.

0b, 0o, 0x를 이용해 2진수, 8진수, 16진수를 나타낼 수 있다.

### 작은 소수 값
&nbsp;다음은 IEEE 754 표준을 따르는 모든 언어에서 공통적인 문제이다.

```javascript
0.1 + 0.2 === 0.3; // false
```

가장 일반적으로는 미세한 '반올림 오차'를 허용 공차(Tolerance)로 처리하는 방법이 있다. 이런 미세한 오차를 '머신 입실론(Machine Epsilon)'이라 하며 자바스크립트에는 2^(-52)의 값이 `Number.EPSILON`으로 미리 정의되어 있다. `Number.EPSILON`으로 '동등함(Equality)'을 비교할 수 있다.

```javascript
function numberCloseEnoughToEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numberCloseEnoughToEqual(a, b); // true
```

### 안전한 정수 범위
&nbsp;정수는 `Number.MAX_VALUE`보다 훨씬 작은 수준에서 안전 값의 범위가 정해져 있다. ES6이후 '안전하게' 표현할 수 있는 정수 최댓값은 `Number.MAX_SAFE_INTEGER`(2^53 - 1)로 정의한다. 최솟값은 `Number.MIN_SAFE_INTEGER`(-(2^53 - 1))이다.

64비트 숫자는 `Number`타입으로 정확하게 표시할 수 없기 때문에 `String`타입으로 저장해야 한다.

### 정수인지 확인
&nbsp;ES6부터는 `Number.isInteger()`로 정수 여부를 확인한다.

```javascript
Number.isInteger(42); // ture
Number.isInteger(42.000); // true
Number.isInteger(42.3); // false
```

또한 안전한 정수 여부는 ES6부터 `Number.isSafeInteger()`로 체크한다.

```javascript
Number.isSafeInteger(Number.MAX_SAFE_INTEGER); // true
Number.isSafeInteger(Math.pow(2, 53)); // false
Number.isSafeInteger(Math.pow(2, 53) - 1); // true
```

### 32비트 (부호 있는) 정수
&nbsp;32비트 숫자에만 가능한 연산이 있기 때문에 실제 '안전 범위'는 훨씬 줄어든다. 따라서 정수의 안전 범위는 `Math.pow(-2, 31)`부터 `Math.pow(2, 31)`까지다.

`a | 0`과 같이 쓰면 숫자 값을 32비트 부호 있는 정수로 강제변환을 한다.

## 4. 특수 값

### 값 아닌 값
&nbsp;`Undefined`타입의 값은 `undefined`밖에 없다. `null`타입도 값은 `null`뿐이다. `undefined`와 `null`은 빈(Empty)혹은 값 아닌(Nonvalue)값을 나타낸다. 하지만 다음과 같이 다른 의미로 사용하는 개발자도 있다.

* `null`은 예전에 값이 있었지만 지금은 없는 상태다.
* `undefined`는 값을 아직 가지지 않은 것이다.

`null`은 식별자(Identifier)아닌 키워드이기 때문에 뭔가를 할당할 수는 없지만, `undefined`는 식별자로 쓸 수 있다.

### Undefined
&nbsp;느슨한 모드에서는 전역 스코프에 `undefined`란 식별자에 값을 할당할 수 있다(절대하면 안된다).

```javascript
function foo() {
    "use strict"
    undefined = 2; // 타입 에러 발생!
}

foo();
```

하지만 모드에 상관없이 `undefined`란 이름을 가진 지역 변수는 생성할 수 있다.

```javascript
function foo() {
    "use strict";
    var undefined = 2;
    console.log(undefined); // 2
}

foo();
```

`undefined`는 `void`연사자로도 얻을 수 있다. 표현식 `void`는 어떤 값이든 결과값을 `undefined`로 만든다. `void`연산자는 어떤 표현식의 결괏값이 없다는 걸 확실하게 밝혀야 할 때 유용하다.

```javascript
function doSomething() {
    if(!APP.ready) {
        // 나중에 다시 해보자!
        return void setTimeout(doSomething, 100);
    }

    var result;
    // 별도 처리 수행
    return result;
}

if(doSomething()) {
    // 다음 작업 실행
}
```

`setTimeout()`함수는 타이머의 고유 식별자를 반환하지만, void 연산자를 이용해 `undefined`를 반환했다. 따라서 긍정 오류를 막을 수 있다.

하지만 많은 개발자들이 다음과 같이 두 줄로 분리해 쓰는 것을 선호하고 `void`는 잘 사용하지 않는다.

```javascript
if(!APP.ready) {
    // 나중에 다시 해보자!
    setTimeout(doSomething, 100);
    return;
}
```

### 특수 숫자
&nbsp; 숫자 타입에는 몇가지 특수한 값이 있다.

`NaN`은 Not A Number이다. 하지만 '숫자 아님' 보다는 '유효하지 않은 숫자', '실패한 숫자' 또는 '몹쓸 숫자'라고 하는게 더 정확하다.

```javascript
var  a = 2 / "foo" // NaN

typeof a === "number"; // true
```

`NaN`의 타입은 숫자 타입이다. `NaN`은 경계 값(Sentinel Value)의 일종이다. 또한 `NaN`은 다른 어떤 `NaN`과도 동등하지 않다. 반사성(Reflexive)이 없는 유일무이한 값이다.

```javascript
var a = 2 / "foo";
isNaN(a); // true
```

내장 전역 유틸리티 `isNaN()` 함수를 사용해 `NaN`여부를 검사할 수 있다. 하지만 "foo"를 인자로 넣어도 `true`가 반환되는 버그가 있다.

```javascript
var b = "foo";

window.isNaN(b); // true
```

ES6이후 부터는 `Number.isNaN()`이 등장한다.

```javascript
var b = "foo";

Number.isNaN(b); // false
```

자바스크립트에서 0으로 숫자를 나누게 되면 `Infinity`(무한대)가 나온다. 분모가 음수면 결괏값은 `-Infinity`다.

```javascript
var a = 1 / 0; // Infinity
var b = -1 / 0; // -Infinity
```

무한대 / 무한대는 정의되지 않은 연산이며 `NaN`이다. 그리고 유한한 양수를 무한대로 나누면 `0`이지만 유한한 음수를 무한대로 나누면 `-0`이다.

```javascript
Infinity / Infinity; // NaN
1 / Infinity; // 0
-1 / Infinity; // -0
```

0에는 -0과 0이 있으며, 다음과 같은 특징이 있다.

```javascript
var a = 0;
var b = -0;

a === b // true
b.toString(); // "0"
b + ""; // "0"
JSON.stringify(b); // "0"
```

따라서 다음과 같이 -0과 0을 구분할 수 있다.

```javascript
function isNegZero(n) {
    n = Number(n);
    return (n === 0) && (1 / n === -Infinity);
}

isNegZero(-0); // true
isNegZero(0); // false
```

+0, -0 개념으로 변수가 0에 도달하는 순간 이동방향을 알 수 있다.

### 특이한 동등 비교
ES6부터는 `Object.is()`가 두 값이 절대적으로 동등한지를 확인할 수 있다.

```javascript
Object.is(NaN, NaN); // true
Object.is(0, -0); // false
```

## 5. 값 vs 레퍼런스
&nbsp;자바스크립트에는 포인터라는 개념이 없다. 또한 어떤 변수가 다른 변수를 참조할 수 없다. 그리고 값 또는 레퍼런스의 할당 및 전달을 제어하는 구문 암시가 없다.

```javascript
var a = [1, 2, 3];
var b = a; // a의 레퍼런스 값이 아닌 공유된 '[1, 2, 3]'값의 레퍼런스다.
a.push(4);
a; // [1, 2, 3, 4]
c; // [1, 2, 3, 4]

b = [5, 6, 7];
a; // [1, 2, 3, 4]
```

원시 값은 언제나 값-복사 방식으로 할당되며, 합성 값은 레퍼런스-복사 방식이다. 그래서 위와 같이 `b`에 [5, 6, 7]을 할당해도 `a`는 영향을 받지 않는다. 그리고 함수의 인자 값으로 넘길때도 사본이 할당된다.

```javascript
function foo(x) {
    x.push(4);
    x; // [1, 2, 3, 4]

    x = [4, 5, 6];
    x.push(7);
    x; // [4, 5, 6, 7]
}

var a = [1, 2, 3];
foo(a);
a; // [1, 2, 3, 4]
```

`a`의 레퍼런스 사본이 `x`에 할당된다. `a`와 `x`는 [1, 2, 3]을 가리키는 별도의 레퍼런스이다. `slice()`를 호출하면 전혀 새로운 배열(얕은 복사)을 만든다. 반대로 원시 값을 레퍼런스 처럼 만드려면 객체, 배열 등으로 한번 감싸줘야 한다.

```javascript
funciton foo(wrapper) wrapper.a = 42;

var obj = {a: 2};
foo(obj);
obj.a; // 42
```

## 6. 정리하기

* 배열, 문자, 숫자
    * 자바스크립트 배열은 모든 타입의 값들을 숫자로 인덱싱한 집합이다.
    * 문자열은 일종의 '유사 배열'이다.
    * 숫자는 '정수'와 '부동 소수점 숫자'모두 포함한다.
* 특수 값
    * `null`과 `undefined`의 타입은 각각 `null`과 `undefined`다.
    * `undefined`는 할당된 값이 없다면 트폴트 값이다.
    * `void`연산자는 어떤 값이던 `undefined`로 만든다.
    * 숫자에는 `NaN`, `Infinity`, `-Infinity`, `-0` 같은 특수 값이 있다.
* 값과 레퍼런스
    * 단순 스칼라 원시 값은 값-복사에 의해 할당/전달된다.
    * 합성 값은 레퍼런스-복사에 의해 할당/전달된다.
    * 자바스크립트에는 포인터가 없으며, 레퍼런스 또한 특이하다.