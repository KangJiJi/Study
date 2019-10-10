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
&nbsp;더블 틸드(`~~`) 연산자를 사용해 소수점 이상 부분을 잘나낼 수 있다. 하지만 `Math.floor()`와 같은 결과는 아니다. `~~`연산은 'ToInt32 강제변환'을 하는 연산이다.

```javascript
Math.floor(-49.6); // -50
~~-49.6; // -49
```

### 명시적 강제변환: 숫자 형태의 문자열 파싱
&nbsp;문자열로부터 숫자 값의 파싱은 비 숫자형 문자를 허용한다. 하지만 강제변환은 비 숫자형 문자는 `NaN`을 반환한다.

```javascript
var a = "42";
var b = "42px";

Number(a); // 42
parseInt(a); // 42

Number(b); // NaN (강제변환)
parseInt(b); // 42 (파싱)
```

`parseInt()`는 문자열에만 사용해야 한다. 비 문자열 값이면 문자열로 강제변환한다. ES5이후 `parseInt()`는 두 번째 인자로 기수(radix, 진법 종류)를 지정하지 않으면 무조건 10진수로 반환을 한다.

#### 비 문자열 파싱
&nbsp; 다음과 같은 사례가 있다.

```javascript
parseInt(1/0, 19); // 18
```

일단 비 문자열을 첫 번째 인자로 넘긴 것이 잘못됐다. 하지만 비 문자열이 인자로 넘어오면 문자열로 강제변환을 한다. 따라서 위와 같은 경우는 `1/0`는 `Infinity`로 변환되며 첫 번째 문자인 "I"는 19진법 18에 해당하기 때문에 이러한 결과가 나왔다.

```javascript
var a = {
  num: 21,
  toString: function() {return String(this.num * 2);}
};

parseInt(a); // 42
```

비 문자열 값은 `toString()`메서드를 이용해 강제변환을 시도한다. 따라서 다음과 같은 결과들이 나온다.

```javascript
parseInt(0.000008); // 0 ("0.000008" -> "0")
parseInt(0.0000008); // 8 ("8e-7" -> "8")
parseInt(false, 16); // 250 ("false" -> "fa")
parseInt(parseInt, 16); // 15 ("function..." -> "f")
parseInt("0x10"); // 16 (16진수 "0x10" -> 16)
parseInt("103", 2); // 2
```

### 명시적 강제변환: * -> 불리언
&nbsp; '비 불리언(Non boolean)' -> '불리언' 강제변환은 `Boolean()`에 의해 실행된다. 일반적으로 불리언 값으로 명시적 강제변환을 할 때는 `!!`(Double negate)연산자를 사용한다.

```javascript
var a = "0";
var b = [];
var c = {};

var d = "";
var e = 0;
var f = null;
var g;

!!a; // true
!!b; // true
!!c; // true

!!d; // false
!!e; // false
!!f; // false
!!g; // false
```

## 암시적 변환
&nbsp;무조건 나쁜 것이 아니라 자바스크립트 개발자라면 알아야 한다.

### '암시적'이란?
&nbsp;암시적 변환은 코드 가독성을 높이고 세세한 구현부를 추상화하고 감추는 데 도움이 된다. 따라서 암시적 강제변환은 도움이 될 수 있다.

### 암시적 강제변환: 문자열 <-> 숫자
&nbsp;`+`연산자는 '숫자의 덧셈, 문자열 접합' 두 가지 목적으로 '오버로드' 된다.

```javascript
var a = "42";
var b = "0";

var c = 42;
var d = 0;

a + b; // "420"
c + d; // 42
```

다음과 같은 코드도 문자열 접합 연산을 하게 된다.

```javascript
var a = [1, 2];
var b = [3, 4];

a + b; // "1,23,4"
```

`+`연산은 한쪽 피연산자가 문자열이거나 `ToNumber`추상 연산을 통해 문자열으로 나타낼 수 있으면 문자열 붙이기를 한다. 즉, 한쪽 피연산자가 문자열이면 문자열 붙이기 연산을 하고, 그 밖에는 언제나 숫자 덧셈을 한다. 다음과 같은 멋진 사례도 있다.

```javascript
var a = 42;
var b = a + "";
b; // "42"
```

만약 `valueOf()`, `toString()`메서드를 직접 구현하면 강제변환 과정에서 결과가 달라질 수 있으니 조심해야 한다.

```javascript
var a = "3.14";
var b = a - 0;
b; // 3.14
```

`-`연산자는 전부 숫자로 강제변환한다.

### 암시적 강제변환: 불리언 -> 숫자
&nbsp;특정 상황에서는 암시적 강제변환은 기발한 해법이 될 수 있다. 다음은 여러 인자를 받아 하나만 `true`인지 아닌지 검사하는 코드다.

```javascript
function onlyOne() {
  var sum = 0;
  for(var i = 0; i < arguments.length; i++) {
    // falsy 값은 건너뛴다.
    // 0으로 취급하는 셈이다. 그러나 NaN은 피해야 한다.
    if(arguments[i]) {
      sum += arguments[i];
    }
  }
  return sum == 1;
}

var a = true;
var b = false;

onlyOne(b, a); // true
onlyOne(b, a, b, b, b); // true
```

### 암시적 강제변환: * -> 불리언
&nbsp;다음은 불리언으로의 암시적 강제변환이 일어나는 표현식이다.

* if()문의 조건 표현식
* for( ; ; ) 에서 두 번째 조건 표현식
* while() 및 do while()루프의 조건 표현식
* ? : 삼한 연산 시 첫 번째 조건 표현식
* || 및 && 의 촤측 피연산자

### &&와 || 연산자
&nbsp;`&&`와 `||`의 결괏값은 두 피연산자 중 한쪽 값이다.

```javascript
var a = 42;
var b = "abc";
var c = null;

a || b; // 42
a && b; // "abc"

c || b; // "abc"
c && b; // null
```

피 연산자가 비 불리언 타입이면 ToBoolean로 강제변환 후 진행한다. 다음은 이 특성을 잘 활용한 코드다.

```javascript
function foo(a, b) {
  a = a || "hello";
  b = b || "world";

  console.log(a + " " + b);
}

foo(); // "hello world"

// 조심!
foo("hi", ""); // "hi world"
```

자바스크립트 압축기는 `&&`를 다음과 같이 이용한다.

```javascript
function foo() {
  console.log(a);
}
var a = 42;

// 좋은법
if(a) { foo(); }

// JS압축기
a && foo(); // 42
```

### 심벌의 강제변환
&nbsp;'심벌 -> 문자열'명시적 강제변환은 허용되나 암시적 강제변환은 금지된다.

```javascript
var s = Symbol("Good");
String(s); // "Symbol(Good)"
s + ""; // TypeError
```

## 5. 느슨한/엄격한 동등 비교
&nbsp;`==`(Loose Equals)와 `===`(Strict Equals)는 동등함의 판단 기준이 다르다. `==`는 동등함 비교 시 강제변환을 허용하지만, `===`는 강제변환을 허용하지 않는다.

### 비교 성능
&nbsp;`==`연산자가 `===`연산자에 비해 느리긴 하지만 느낄 수 있는 정도의 속도차이는 아니다. 따라서 강제변환이 필요하면 `==`연산자를 사용하고 필요하지 않다면 `===`연산자를 사용해야 한다.

### 추상 동등 비교
&nbsp;`==`연산자 로직은 '추상적 동등 비교 알고리즘'에 상술되어 있다. 같은 타입이라면 누구나 예상하듯이 동작한다. 하지만 -0, +0과 NaN과 같은 값은 예외다. `==`연산자에서의 객체 비교 알고리즘은 `===`의 알고리즘과 같다. 또한 `!=`연산자 연산 결과는 `==`연산자 연산 결과의 부정이다.

#### 비교하기: 문자열 -> 숫자
&nbsp;