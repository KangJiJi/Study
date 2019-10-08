CHAPTER 4 강제변환
==============

&nbsp;강제변환(Coercive type conversion)의 좋고 나쁨을 충분히 이해해야 한다.

## 1. 값 변환
&nbsp;어떤 값의 타입이 변하는 과정이 명시적이면 '타입 캐스팅(Type casting)' 암시적이면 '강제변환(Coercion)'이다. 여기서는 '암시적 강제변환(Explicit Coercion)'과 '명시적 강제변환(Implicit Corecion)'으로 구별하겠다.

```javascript
var a = 42;
var b = a + ""; // 암시적 강제변환
var c = String(a); // 명시적 강제변환
```

## 2. 추상 연산
&nbsp;ES5 9의 변환 규칙의 '추상 연산(Abstract Operation)'을 알아본다. ToString, ToNumber, ToBoolean, ToPrimitive에 대해서 알아본다.

### ToString
&nbsp;ToString 추상 연산은 문자열이 아닌 값을 문자열로 변환한다. 너무 작거나 큰 숫자는 지수 형태로 변환한다.

```javascript
var a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;

a.toString(); // "1.07e21"
```

일반 객체는 기본적으로 `toString()` 메서드가 내부 `[[Class]]`를 반환한다. 또한 배열은 재정의된 `toString()`메서드로 모든 원소가 콤마(,)로 분리된 형태로 나온다.

```javascript
var a = [1, 2, 3];
a.toString(); // "1,2,3"
```

#### JSON 문자열화
&nbsp;JSON 안전 값(JSON-Safe Value, JSON 표현형으로 확실히 나타낼 수 있는 값)은 모두 다음과 같이 문자열화할 수 있다.

```javascript
JSON.stringify(42); // "42"
JSON.stringify("42"); // ""42""
JSON.stringify(null); // "null"
JSON.stringify(true); // "true"
```

JSON 안전 값이 아닌 것들(`undefined`, `function`, `symbol`, Circular references)은 표준 JSON 규격을 벗어난 값이다. 따라서 다음과 같이 변한다

```javascript
JSON.stringify(undefined); // undefined
JSON.stringify(function() {}); // undefined

JSON.stringify([1, undefined, function(){}, 4]); // "[1,null,null,4]"

JSON.stringify({ a: 2, b: function(){} }); // "{"a":2}"
```

`undefined`, `function`, `symbol` 같은 값은 인자로 넘어오면 `undefined`로 변환하거나 배열의 인자일 경우 `null`로 바꾸고 객체 프로퍼티에 있으면 지워버린다. 만약 환영 참조 객체(Circular references)를 넘기면 에러가 난다. 이러한 문제는 `toJSON()`메서드를 직접 정의해서 해결할 수 있다.

```javascript
var o = {};
var a = { b: 42, c: o, d: function(){} };

// 'a'를 환형 참조 객체로 만든다.
o.e = a;

// 환형 참조 객체를 JSON.stringify() 하면 에러가 난다.
// 따라서 toJSON()을 만들어서 해결해야 한다.

a.toJSON = function() {
  // 직렬화에 프로퍼티 'b'만 포함시킨다.
  return {b: this.b};
};

JSON.stringify(a); // "{"b":42}"
```

`toJSON()`은 문자열화 할 객체를 반환하고 실제 문자열화 처리는 `JSON.stringify()`이 담당한다. 결국 `toJSON()`은 적당한 JSON 안전 값으로 바꾸는 것이다.

`JSON.stringify()`의 두 번째 인자는 배열 아니면 함수 형태의 대체자(Replacer)가 들어올 수 있다.

```javascript
var a = {b: 42, c: "42", d: [1, 2, 3]};

JSON.stringify(a, ["b", "c"]); // "{"b":42,"c":"42"}"
JSON.stringify(a, function(k, v) {
  if(k !== "c") return v;
}); // "{"b":42,"d":[1,2,3]}"
```

세 번째 인자는 스페이스(Space)라고 하며 들여쓰기를 할 수 있다.

```javascript
var a = {b: 42, c: "42", d: [1,2,3]};
JSON.stringify(a, null, 3);
// "{
//    "b": 42,
//    "c": "42",
//    "d": [
//       1,
//       2,
//       3
//    ]
// }"

JSON.stringify(a, null, "-----");
// "{
// -----"b": 42,
// -----"c": "42",
// -----"d": [
// ----------1,
// ----------2,
// ----------3
// -----]
// }"
```

### ToNumber
&nbsp;`ToNumber` 추상 연산은 숫자 아닌 값을 수식 연산이 가능한 숫자로 변환한다. `true`는 1, `false`는 0, `undefined`는 `NaN`, `null`은 0으로 변한다. 문자열에 ToNumber를 적용하면 숫자가 아닌 값은 `NaN`으로 변환하지만, 0이 앞에 붙은 8진수는 10진수로 처리한다. 객체 혹은 배열은 `valueOf()`를 사용할 수 있고 반환 값이 원시 값이면 강제 변환하되, 그렇지 않을 경우 `toString()`을 이용해 강제변환하고 `ToNumber`를 실행한다. 원시 값으로 바꿀 수 없으면 `TypeError`오류다.

```javascript
var a = {
  valueOf: function() { return "42"; }
};

var b = {
  toString: function() { return "42"; }
};

var c = [4, 2];
c.toString = function() {
  return this.join(""); // "42"
}

Number(a); // 42
Number(b); // 42
Number(c); // 42
Number(""); // 0
Number([]); // 0
Number(["abc"]); // NaN
```

### ToBoolean
&nbsp;`ToBoolean` 추상 연산은 1을 `true`로, 0을 `false`로 (역방향도 마찬가지)강제변환할 수 있지만 두 값이 같지는 않다.

#### Falsy 값
&nbsp;불리언이 아닌 값을 강제변환했을 때 결과는 다음과 같다.

* `false`가 되는 값(falsy)
  * `undefined`
  * `null`
  * `false`
  * `+0`, `-0`, `NaN`
  * ""
* 나머지는 전부 `true`(truthy))

#### Falsy 객체
&nbsp;다음 코드를 보면 모든 변수가 `true`임을 알 수 있다.

```javascript
var a = new Boolean(false);
var b = new Number(0);
var c = new String("");

var d = Boolean(a && b && c);
d: // true
```

'falsy 객체'는 순수 자바스크립트의 일부가 아니다. 'falsy 객체'는 불리언으로 강제변환하면 `false`다. 시간이 지남에 따라 표준이 변하면서 폐기할 수 없는 객체를 `false`값으로 변환되게 끔 만드는 경우가 있다. 대표적으로 DOM에서 사용했던 `document.all`이 있다.

#### truthy 값
&nbsp;falsy 값 목록에 없으면 무조건 truthy 값이다. falsy 값 목록을 암기하고 있어야 한다.

## 3. 명시적 강제변환

### 명시적 강제변환: 문자열 <-> 숫자
&nbsp;'문자열 <-> 숫자' 강제변환은 `String()`과 `Number()`함수를 이용한다.

```javascript
var a = 42;
var b = String(a);
var c = "3.14";
var d = Number(c);

b; // "42"
d; // 3.14
```

`String()`과 `Number()`함수 이외에도 다른 명시적 타입 변환 방법이 있다.

```javascript
var a = 42;
var b = a.toString();

var c = "3.14";
var d = +c;

b; // "42"
d; // 3.14
```

`a.toString()`은 원시 값 42을 자동으로 '박싱'한다. 따라서 `toString()`메서드를 사용할 수 있다. 또한 `+c`의 `+`는 피연산자를 숫자로, 명시적 강제변환한다.

```javascript
var c = "3.14";
var d = 5+ +c;
d; // 8.14
```

두 연산자 사이에 공백을 넣어주면 "3.14"를 숫자로 강제변환한다. 다음과 같은 코드도 작성할 수 있다.

```javascript
1 + - + + + - + 1; // 2
```

#### 날짜 -> 숫자
&nbsp;+ 단항 연산자는 다음과 같은 용도로 사용된다.

```javascript
var d = new Date("Mon, 18 Aug 2014 08:53:06 CDT");
+d; // 1408369986000

// 관용적으로 다음과 같이 사용한다
var timestamp = +new Date();
```

하지만 ES5에 추가된 `Date.now()`를 사용하자.

```javascript
var timestamp = Date.now();
```

#### 이상한 나라의 틸드(~)
&nbsp;비트 연산을 하면 피연산자는 32비트 값으로 변하게 된다. `ToInt32`추상 연산이 강제변환을 한다.

```javascript
// 이 값들은 32비트로 나타내는 것이 불가능 하다. 64비트 IEEE754 표준에서 유래했기 때문이다.
0 | -0; // 0
0 | NaN; // 0
0 | Infinity; // 0
0 | -Infinity; // 0
```

`~`는 32비트 숫자로 변환 후 NOT연산을 한다. `~x`는 대략 `-(x+1)`과 같다. 따라서 `x`가 -1이면 falsy한 0이 나오고 -1 이외의 숫자는 truthy한 숫자 값이 나온다. 이런 -1과 같은 성질의 값을 '경계 값(Sentinel Value)'이라 한다. 틸트(~)를 이용해 `indexOf()`를 사용할 수 있다.

```javascript
// indexOf()는 어떤 문자열이 다른 문자열에 포함되어 있는지 조사하는 용도로 사용된다.
// 조사에 성공하면 index를, 조사에 실패하면 -1을 반환한다.

// 틸트(~)를 사용하지 않은 경우
var a = "Hello World";

if(a.indexOf("lo") >= 0) {} // true
if(a.indexOf("lo") != -1) {} // true
if(a.indexOf("ol") < 0) {} // true
if(a.indexOf("ol") == -1) {} // true

// 틸트(~)를 사용한 경우
if(~a.indexOf("lo")) {} // true
if(!~a.indexOf("ol")) {} // true
```

#### 비트 잘라내기