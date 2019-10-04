CHAPTER 3 네이티브
==============

&nbsp;네이티브(Native)란 내장 함수 이며, 다음과 같은 네이티브들을 가장 많이 사용한다.

* `Strig()`
* `Number()`
* `Boolean()`
* `Array()`
* `Object()`
* `Function()`
* `RegExp()`
* `Date()`
* `Error()`
* `Symbol()`

네이티브는 생성자처럼 사용할 수 있지만 실제 결과물은 예상과 다를 수 있다.

```javascript
var a = new String("abc");
typeof a; // "object"-----"string"이 아니다.
a instanceof String; // true
Object.prototype.toString.call(a); // "[object String]"
```

`new String("abc")`생성자의 결과는 원시 값(위 코드에서는 "abc")을 감싼 객체 래퍼다. 이 객체의 타입을 확인해보면 object의 하위 타입에 가깝다.

`new String("abc")`는 "abc"를 감싸는 문자열 래퍼를 생성하며 원시 값 "abc"는 아니다.

## 1. 내부 [[Class]]
&nbsp;`typeof`가 'object'인 값에는 [[Class]]라는 내부 프로퍼티가 추가로 붙는다. 직접 접근할 수 없고 `Object.prototype.toString()`메서드에 값을 넣어 존재를 알 수 있다.

```javascript
Object.prototype.toString.call([1, 2, 3]); // "[object Array]"
Object.prototype.toString.call(/regex-literal/i); // "[object RegExp]"
```

[[Class]]는 해당 값의 내장 네이티브 생성자를 가리키지만, 그렇지 않을 때도 있다.

```javascript
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
```

`Null()`, `Undefined()`같은 값의 내부 [[Class]]값은 `Null`과 `Undefined`다.

하지만 다른 단순 원시 값은 박싱(Boxing)과정을 거친다.

```javascript
Object.prototype.toString.call("abc"); // "[object String]"
Object.prototype.toString.call(42); // "[object Number]"
Object.prototype.toString.call(true); // "[object Bool]
```

## 2. 래퍼 박싱하기
&nbsp;원시 값에는 프로퍼티나 메서드가 없지만 자바스크립트는 자동으로 값을 알아서 박싱(래핑)해준다. 프로그래머가 직접 최적화를 하려다가 성능이 더욱 나빠지는 경우가 많기 때문에 알기 쉽게 원시 값을 사용하는 것이 좋다.

### 객체 래퍼의 함정
&nbsp;만약 직접 객체 래퍼를 사용해야 하는 경우 다음과 같은 함정이 존재 한다.

```javascript
var a = new Boolean(false);

if(!a) console.log("Hello world"); // 실행되지 않는다.
```

false를 객체 래퍼로 감쌌지만 객체는 'truthy'한 값이기 때문에 실행되지 않는다. 이런경우 `Object()`함수를 이용한다.

```javascript
var a = "abc";
var b = new String(a);
var c = Object(a); // new 키워드는 없다.

typeof a; // "string"
typeof b; // "object"
typeof c; // "object"

b instanceof String; // true
c instanceof String; // true

Object.prototype.toString.call(b); // "[object String]"
Object.prototype.toString.call(c); // "[object String]"
```

## 3. 언박싱
&nbsp;객체 래퍼의 원시 값은 `valueOf()`메서드로 얻을 수 있다.

```javascript
var a = new String("abc");
var b = new Number(42);
var c = new Boolean(true);

a.valueOf(); // "abc"
b.valueOf(); // 42
c.valueOf(); // true
```

## 4. 네이티브, 나는 생성자다
&nbsp;배열, 객체, 함수, 정규식을 리터럴로 생성하는 것은 생성자 형식으로 만든 것과 동일하다.

### Array()

```javascript
var a = new Array(1, 2, 3);
var b = [1, 2, 3];
a; // [1, 2, 3]
b; // [1, 2, 3]
```

위와 같이 생성자 형식으로 만들거나 리터럴 형식으로 만들어도 결과는 같다.

`Array` 생성자는 인자로 숫자 하나만 받으면 배열의 크기를 미리 정할 수 있다. 하지만 사용하지 않는 것이 좋다. '빈 슬롯'을 한 군데 이상 가지고 있는 배열을 '구멍난 배열(Sparse Array)'라고 한다.

```javascript
var a = new Array(3);
var b = [undefined, undefined, undefined];
var c = [];
c.length = 3;

// 2019년 크롬 브라우저 기준
a; // [empty × 3]
b; // [undefined, undefined, undefined]
c; // [empty × 3]
```

파이어 폭스에서는 `Array [ <3 empty slots> ]`라는 결과가 나온다. 위 경우에서 a와 b가 비슷해 보이다가도 그렇지 않으 때도 있다.

```javascript
var a = new Array(3);
var b = [undefined, undefined, undefined];

// 결과가 같은 경우
a.join("-"); // "--"
b.join("-"); // "--"

// 결과가 다른 경우
a.map(function(v, i) { return i; }); // [empty × 3]
b.map(function(v, i) { return i; }); // [0, 1, 2]
```

`join()`은 슬롯이 있다는 가정하에 length만큼 반복하지만, `map()`은 그렇지 않다.

진짜 `undefined`값으로 채워진 배열을 만들기 위해서는 다음과 같이 한다.

```javascript
var a = Array.apply(null, {length: 3});
a; // [undefined, undefined, undefined]
```

하여튼, 이런 빈 슬롯을 만들어서 멋 부리지 말아야 한다.

### Object(), Function(), and RegExp()
&nbsp;`Object()`, `Function()`, `RegExp()`생성자도 선택사항이다. 하지만 분명한 의도가 아니라면 사용하지 않는 편이 좋다.

```javascript
var c = new Object();
c.foo = "bar";
c; // { foo: "bar" }

var d = { foo: "bar" };
d; // { foo: "bar" }

var e = new Function("a", "return a * 2;");
var f = function(a) { return a * 2 ;};
function g(a) { return a * 2 };

var h = new RegExp("^a*b+", "g");
var i = /^a*b+/g;
```

`new Object()`같은 생성자는 사용할 일이 없다. 한번에 프로퍼티를 지정해 주는 것이 가능한데 굳이 사용할 필요가 없기 때문이다.

Function 생성자는 함수의 인자나 내용을 동적으로 정의해야 하는 경우에 유용하다.

정규 표현식은 리터럴 형식(/^a*b+/g)으로 정의하는 것이 좋다. 구문이 쉽고 성능상 이점이 있다.

### Data() and Error()
&nbsp;`Date()`와 `Error()`는 리터럴 형식이 없다. `Date()`는 `new Date()`와 같이 사용하고, `Error()`생성자는 앞에 `new`키워드를 사용 하던 안하던 결과는 똑같다. `error`객체는 보통 `throw`연산자와 함께 사용한다.

```javascript
function foo(x) {
  if(!x) {
    throw new Error("x를 안 주셨어요!");
  }
}
```

### Symbol()
&nbsp;'심벌(Symbol)'은 ES6에서 나온 새로운 원시 값 타입이다. 심벌은 객체 프로퍼티로 사용 가능한, '유일 값'이다. `Symbol`의 사용법은 다음과 같다.

```javascript
// iterator사용
obj[Symbol.iterator] = function() {};

var mysym = Symbol("my own symbol");
mysym; // Symbol(my own symbol)
mysym.toString(); // "Symbol(wy own symbol)"
typeof mysym; // "symbol"

var a = {}:
a[mysys] = "foobar";

Object.getOwnPropertySymbols(a); // [ Symbol(my own symbol) ]
```

심벌은 '전용(Private)'프로퍼티는 아니지만, 본래의 목적에 사용하면 대부분 전용 프로퍼티가 될 것이다.

### 네이티브 프로토타입
&nbsp;내장 내이티브 생성자는 각자의 `prototype`객체를 가진다. `prototype`객체에는 고유한 로직이 담겨있다. 예를들어 `String`객체는 `String.prototype`객체에 정의된 메서드에 접근가능하다. 프로토타입 위임(Prototype Delegation)덕분에 모든 문자열이 메서드들을 같이 쓸 수 있다. 또한 모든 함수는 `Function.prototype`에 정의된 `apply()`, `call()`, `bind()` 메서드를 사용할 수 있다.

#### 프로토타입은 디폴트다
&nbsp;변수에 프로토타입은 멋진 '디폴트 값'이다.

```javascript
function isThisCool(vals, fn, rx) {
  vals  = vals || Array.prototype; // Array.prototype은 빈 배열
  fn = fn || Function.prototype; // Function.prototype은 빈 함수
  rx = rx || Function.prototype; // RegExp.prototype은 빈 정규식

  return rx.test(vals.map(fn).join(""));
}

isThisCool(); // true

isThisCool(["a", "b", "c"], function(v) { return v.toUpperCase() }, /D/); // false
```

> 네이티브와 프로토타입에 너무 의존하지 않고, 프로토타입은 변경하지 않도록 해야한다.

## 5. 정리하기
&nbsp;자바스크립트는 원시 값을 감싸는 객체 래퍼(네이티브)를 제공한다. 객체 래퍼에는 타입별로 쓸 만한 기능이 구현되어 있기 때문에 편리하게 사용할 수 있다. 단순 스칼라 원시 값이 있을 때, 자바스크립트가 자동으로 원시 값을 객체 래퍼로 '박싱'해준다.