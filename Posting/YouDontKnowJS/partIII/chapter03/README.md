# CHAPTER 3 객체

&nbsp;다양한 객체를 가리키는 this에서 객체는 정확히 무엇이고 왜 객체를 가리켜야 하는지 알아본다.

## 1. 구문

&nbsp;객체는 리터럴 형식과 생성자 형식으로 정의할 수 있다.

```javascript
// 리터럴
var obj = {
  key: value,
};

// 생성자
var obj2 = new Object();
obj2.key = value;
```

두 형식의 결과는 같고 차이점은 생성자 형식은 한 번에 한 프로퍼티만 추가할 수 있다는 것이다. 반면 리터럴 형식은 한 번의 선언으로 여러 프로퍼티를 추가할 수 있다.

## 2. 타입

&nbsp;자바스크립트의 7가지 타입은 다음과 같다.

- null
- undefined
- boolean
- number
- string
- object
- symbol

이때 '단순 원시 타입(null, undefined, boolean, number, string)'은 객체가 아닌다. 따라서 자바스크립트의 모든 것이 객체라는 말은 사실이 아니다. 반면 '복합 원시 타입'이라는 독특한 객체 하위 타입도 있다. 예를 들어 function은 객체의 하위 타입이다. 따라서 함수는 일급 객체다.

### 내장 객체

&nbsp;내장 객체라고 부르는 객체 하위 타입도 있다.

- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error

위 객체들은 생성자로 사용될 뿐이다. 또한 원시 값은 객체가 아닌 원시 리터럴이며 불변값이다. 그저 엔진이 상황에 맞게(원시 값이 객체의 메서드를 사용할 때) 원시 값을 String 객체로 자동 강제변환 하는 것이다.

```javascript
var str = "hello world";
console.log(str.charAt(3)); // l
```

또한 객체 래퍼 형식이 없는 null과 undefined는 그 자체로 유일 값이다. 그리고 Date 값은 반드시 생성자 형식으로 생성해야 한다.

Object, Arrays, Function, RegExp는 모두 객체다. 생성자 형식은 리터럴 형식보다 옵션이 더 많은 편이라 상황에 맞게 생성자 옵션을 사용해야 한다. Error 객체는 예외가 던져지면 알아서 생성되니 명시적으로 생성할 일은 드물다.

## 3. 내용

&nbsp;엔진이 값을 저장하는 방식은 구현 의존적인데, 이는 객체 컨테이너에 담지 않는 게 일반적이다. 실제로는 값이 있는 곳의 포인터를 담당하는 프로퍼티명이 담겨 있다.

```javascript
var myObject = {
  a: 2,
};

myObject.a; // 2 => 프로퍼티 접근
myObject["a"]; // 2 => 키 접근
```

객체 프로퍼티 명은 언제나 문자열이며, 다른 원시 값은 문자열로 변환된다.

### 계산된 프로퍼티명

&nbsp;ES6부터 계산된 프로퍼티명(Computed Property Names) 기능이 추가됐다.

```javascript
var prefix = "foo";

var myObject = {
  [prefix + "bar"]: "hello",
  [prefix + "baz"]: "world",
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
```

주로 Symbol을 사용할 때 사용한다.

### 프로퍼티 VS 메서드

&nbsp;명세서에서도 프로퍼티 접근과 메서드 접근을 구분해서 사용하지만, 함수는 객체에 속하는 것이 아니다.

```javascript
function foo() {
  console.log("foo");
}

var someFoo = foo;

var myObject = {
  someFoo: foo,
};

foo; // function foo() {...}
someFoo; // function foo() {...}
myObject.someFoo; // function foo() {...}
```

위 코드에서 `someFoo`나 `myObject.someFoo` 모두 같은 함수를 가리키는 개별 레퍼런스일 뿐이다. 소유의 개념이 아니다. 차이점은 this의 암시적 바인딩이다. 또한 객체 리터럴의 한 부분으로 선언해도 객체에 달라붙는 것이 아니고 레퍼런스가 생길 뿐이다.

```javascript
var myObject = {
  foo: function () {
    console.log("foo");
  },
};

var someFoo = myObject.foo;

someFoo; // function foo() {...}
myOjbect.foo; // function foo() {...}
```

### 배열

&nbsp;배열도 키로 접근하는 형태지만 저장하는 방법과 장소가 더 체계적이다. 배열은 양수로 표기된 위치에 값을 저장한다. 또한 프로퍼티를 추가할 수 있다.

```javascript
var myArray = ["foo", 42, "bar"];
myArray.baz = "baz";
myArray.length; // 3
myArray.baz; // "baz"
```

### 객체 복사

&nbsp;객체 복사는 중요한 문제 중 하나다.

```javascript
var anotherObject = {
  c: true,
};

var anotherArray = [];

function anotherFunction() {
  /*...*/
}

var myObject = {
  a: 2,
  b: anotherObject, // 사본이 아닌 레퍼런스
  c: anotherArray, // 사본이 아닌 레퍼런스
  d: anotherFunction,
};

anotherArray.push(anotherObject, myObject);
```

얕은 복사는 `myObject`의 `a`값은 복사되지만 `b`, `c`, `d` 프로퍼티는 원 객체의 레퍼런스와 같은 대상을 가리키는 또 다른 레퍼런스다. 깊은 복사는 모든 값이 복사가 된다. 하지만 문제는 `anotherArray`의 `anotherObject`, `myObject`까지 복사돼서 환형 참조의 형태로 무한 복사가 된다.

환형 참조 해결에 대한 답은 없다. 다만 `JSON-safe 객체`는 하나의 대안이 될 수 있다.

```javascript
var newObj = JSON.parse(JSON.stringify(someObj));
```

ES6부터는 `Object.assign()`메서드를 제공한다. 첫 번째 인자는 타깃 객체고 두 번째 이후 인자는 소스 객체다.

```javascript
var newObj = Object.assign({}, myObject);
```

### 프로퍼티 서술자

&nbsp;ES5부터 모든 프로퍼티는 프로퍼티 서술자로 표현된다.

```javascript
var myObject = {
  a: 2,
};

Object.getOwnPropertyDescriptor(myObject, "a");
// configurable: true
// enumerable: true
// value: 2
// writable: true
```

`defineProperty()`로 프로퍼티 서술자와 함께 프로퍼티를 추가할 수 있다.

- 쓰기 가능 => 값을 변경, 일반 모드에서는 조용히 실패, 엄격 모드에서는 에러
- 설정 가능 => 프로퍼티 서술자를 변경, 모드에 상관없이 TypeError, delete 연산자로 삭제도 안됨
- 열거 가능 => for...in 루프처럼 객체 프로퍼티 열거하는 구문에서 표출 여부

### 불변성

&nbsp;ES5부터는 불변 처리를 할 수 있는 여러 방법을 제공하지만, 얕은 불변성만 지원한다. 객체가 다른 객체의 레퍼런스를 가지고 있을 때 이 레퍼런스까지 불변으로 만들지는 못한다.

#### 객체 상수

```javascript
var myObject = {};

Object.defineProperty(myObject, "FAVORITE_NUMBER", {
  value: 42,
  writable: false,
  configurable: false,
});
```

#### 확장 금지

&nbsp;`Object.preventExtensions()`을 사용한다.

#### 봉인

&nbsp;`Object.seal()`을 사용한다. 즉, 어떤 객체에 대해 `Object.preventExtensions()`를 실행하고 프로퍼티 전부를 `configurable:false`처리한다.

#### 동결

&nbsp;`Object.freeze()`을 사용한다. `Object.seal()`을 적용하고 `writable:false`처리한다.

### [[Get]]

&nbsp;프로퍼티 접근 과정은 중요하다.

```javascript
var myObject = {
  a: 2,
};

myObject.a; // 2
```

위 코드는 `myObject`에 대해 `[[Get]]`연산을 하는 것이다. 찾을 수 없다면 `undefined`를 반환한다.

### [[Put]]

&nbsp;`[[Put]]`의 동작 방식은 복잡하다.

- 프로퍼티가 접근 서술자인가? 맞으면 세터를 호출
- 프로퍼티가 `writable:false`인 데이터 서술자인가? 맞으면 조용히 실패한다.(엄격모드는 TypeError)
- 이외에는 프로퍼티에 해당 값을 세팅한다.

### 게터와 세터

&nbsp;ES5부터는 프로퍼티 수준에서 기본 로직을 오버라이드 할 수 있다.

```javascript
var myObject = {
  get a() {
    return 2;
  },
};

Object.defineProperty(myObject, "b", {
  get: function () {
    return this.a * 2;
  },
  enumerable: true,
});

myObject.a; // 2
myObject.b; // 4
```

프로퍼티에 접근하면 자동으로 게터 함수를 호출한다.

### 존재 확인

&nbsp;`in`연산자를 통해서 객체에 어떤 프로퍼티가 존재하는지 확인할 수 있다. 그리고 프로토타입 체이닝을 통해 상위 단계에 있는지 까지 확인한다. 반면 `hasOwnProperty()`는 프로퍼티에 객체가 있는지 확인만 한다.

```javascript
var myObject = {
  a: 2,
};

"a" in myObject; // ture
"b" in myObject; // false

myObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("b"); // false
```

#### 열거

&nbsp;`propertyIsEnumerable()`을 통해서 열거 가능한 프로퍼티인지 확인할 수 있다. 또한 `getOwnPropertyNames()`는 주어진 객체를 모두 반환한다.

```javascript
myObject.propertyIsEnumerable("b"); // false
Object.getOwnPropertyNames(myObject); // ["a", "b"]
```

## 4. 순회

&nbsp;`for...in`은 객체 프로퍼티를 순회한다. 그러면 프로퍼티 값을 순회하려면 어떻게 해야할까? 흔하게 사용하는 반복문을 사용해서 `array[i]` 방식으로 접근하는 것은 인덱스를 순환하면서 값을 사용할 뿐 값 자체를 순회하는 것은 아니다. ES6부터는 배열 순회용 `for...of`구문을 제공한다. 또한 원소에는 순회자 객체(@@iterator)가 있어야 한다.

```javascript
var myArray = [1, 2, 3];
for (var v of myArray0) {
  console.log(v);
}
```

ES6부터는 `Symbol.iterator`심볼을 통해서 `@@iterator`에 접근할 수 있다.

```javascript
var myArray = [1, 2, 3];
var it = myArray[Symbol.iterator]();

it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
it.next(); // { value: 3, done: false }
it.next(); // { done: true }
```

하지만 일반 객체 내부에는 `@@iterator`가 없어서 직접 정의해줘야 한다.

```javascript
myObject = {
  a: 2,
  b: 3,
  [Symbol.iterator]: function () {
    /*...*/
  },
};
```

## 5. 정리하기

&nbsp;객체는 리터럴 형식과 생성자 형식 두 가지 형태를 가진다. 객체는 6개의 원시 타입 중 하나다. 객체의 프로퍼티에 접근할 때는 엔진이 내부적으로 `[[Put]]` 혹은 `[[Get]]`연산을 사용한다. 객체에 불변성을 부여하는 여러 메서드가 있다. 열거 가능성을 조작하여 순회 시 노출 여부를 정할 수 있고, iterator를 이용해서 값 자체를 순회할 수 있다.
