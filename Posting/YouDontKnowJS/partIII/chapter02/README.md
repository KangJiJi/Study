# CHAPTER 2 this가 이런 거로군!

## 1. 호출부

&nbsp;this 바인딩의 개념을 이해하려면, 'this가 가리키는 것'이 무엇인지 찾아야한다. 하지만 코딩 패턴에 따라 '진짜' 호출부를 찾기 어려울 때가 많다. 따라서 호출 스택을 생각해봐야 한다.

```javascript
function baz() {
  // call stack: 'baz'
  console.log("baz");
  bar(); // <- 'bar'의 호출부
}

function bar() {
  // call stack: 'baz' -> 'bar'
  console.log("bar");
  foo(); // <- 'foo'의 호출부
}

function foo() {
  // call stack: 'baz' -> 'bar' -> 'foo'
  console.log("foo");
}

baz();
```

this 바인딩은 오직 호출부와 연관된다. 그래서 call stack에서 호출부를 찾기위해 코드를 주의 깊게 봐야 한다.

## 2. 단지 규칙일 뿐

&nbsp;this가 무엇을 참조할지를 호출부가 어떻게 결정하는지 4가지 규칙을 알아보고, 우선순위를 제시한다.

### 기본 바인딩

&nbsp;첫 번째 규칙은 '단독 함수 실행(Standalone Function Invocation)'에 관한 규칙으로 this의 기본 규칙이다.

```javascript
function foo() {
  console.log(this.a);
}

function bar() {
  "use strict";
  console.log(this.a);
}

var a = 2;

foo(); // 2
bar(); // error
```

`foo()`함수 호출부를 보면 지극히 평범한 있는 그대로의 호출이다. 다만 Strict Mode에서는 전역 객체가 기본 바인딩 대상에서 제외된다. 중요한 점은 `foo()`함수의 본문을 실행하면 전역 객체만이 기본 바인딩의 유일한 대상이라는 점이다.

### 암시적 바인딩

&nbsp;두 번째 규칙은 호출부에 콘텍스트 객체가 있는지 확인하는 것이다.

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

obj.foo(); // 호출부
```

호출부는 obj 콘텍스트로 `foo()`를 참조하므로 obj 객체는 함수의 레퍼런스를 '소유'한다고 볼 수 있다. 함수 레퍼런스에 대한 콘텍스트 객체가 존재할 때 이 콘텍스트 객체가 함수 호출 시 this에 바인딩 된다.

객체 프로퍼티 참조가 체이닝 형태라면 함수가 호출된 객체와 연관된다.

```javascript
function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  foo: foo,
};

var obj1 = {
  a: 2,
  foo: foo,
  obj2: obj2,
};

obj1.foo(); // 2
obj1.obj2.foo(); // 42
```

#### 암시적 소실

&nbsp;'암시적으로 바인딩 된' 함수에서 바인딩이 소실되는 경우가 있다. 엄격 모드 여부에 따라서 전역 객체나 `undefined` 중 한 가지로 바인딩 된다.

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

var bar = obj.foo;

var a = 42;

bar(); // 42
```

bar는 foo를 직접 가리키는 또 다른 레퍼런스다. 따라서 기본 바인딩이 적용된다. 또한 콜백 함수를 전달하는 경우도 똑같이 동작한다.

### 명시적 바인딩

&nbsp;명시적으로 this를 바인딩하기 위해 `call()`과 `apply()` 메서드를 사용한다.

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
};

foo.call(obj); // 2
```

또한 원시 값을 인자로 전달하면 원시 값에 대응되는 객체로 래핑된다. 하지만 명시적 바인딩으로도 this 바인딩의 소실 혹은 프레임워크가 임의로 덮어써 버리는 문제는 해결할 수 없다.

#### 하드 바인딩

&nbsp;다음은 명시적 바인딩을 약간 변경한 코드다.

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
};

var bar = function () {
  foo.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2

bar.call(window); // undefined가 아닌 2
```

위와 같이 `bar()`내부에 `obj`를 this에 강제로 바인딩하는 것을 하드 바인딩(Hard Binding)이라고 한다. 하드 바인딩은 인자를 넘기고 반환 값을 돌려받는 창구가 필요하거나, 재사용 가능한 핼퍼 함수를 사용할 때 사용한다. 또한 bind 역시 this 콘텍스트로 원본 함수를 호출하도록 하드 코딩된 새 함수를 반환한다.

#### API 호출 콘텍스트

많은 내장 혹은 라이브러리 함수들은 콘텍스트(Context)라는 인자를 제공해서, `bind()`를 사용해서 this를 지정할 수 없는 경우를 대비한다.

### new 바인딩

&nbsp;네 번째 바인딩 규칙을 설명하기전에 흔해 빠진 오해를 바로잡아야 한다. JavaScript의 new 키워드는 클래스 지향적인 기능과 아무 상관이 없다. 자바스크립트 생성자는 new 연산자가 있을 때 호출되는 일반 함수에 불과하다. new 연산자를 사용하면 다음과 같은 일들이 발생한다.

- 새 객체가 툭 만들어진다.
- 새로 생성된 객체의 [[Prototype]]이 연결된다.
- 새로 생성된 객체는 해당 함수 호출 시 this로 바인딩 된다.
- 이 함수가 자신의 또 다른 객체를 반환하지 않는 한 new와 함께 호출된 함수는 자동으로 생성된 객체를 반환한다.

따라서 new는 this를 새 객체와 바인딩하는 방법이며 이것이 'new 바인딩'이다.

## 3. 모든 건 순서가 있는 법

&nbsp;네 가지 규칙이 중복으로 해당될 때 우선순위가 미리 정해져 있다.

```javascript
function foo() {
  console.log(this.a);
}

var obj1 = {
  a: 2,
  foo: foo,
};

var obj2 = {
  a: 3,
  foo: foo,
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo().call(obj2); // 3 => 명시적 바인딩이 암시적 바인딩보다 우선순위가 높다.
obj2.foo().call(obj1); // 2 => 명시적 바인딩이 암시적 바인딩보다 우선순위가 높다.
```

명시적 바인딩이 암시적 바인딩보다 우선순위가 높다. 다음은 new 바인딩의 우선순위를 확인하기위한 코드다.

```javascript
function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo,
};

var obj2 = {};

obj1.foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

var bar = new obj1.foo(4);

console.log(obj1.a); // 2
console.log(bar.a); // 4 => new 바인딩이 암시적 바인딩보다 우선순위가 높다.
```

new 바인딩이 암시적 바인딩보다 우선순위가 높다. 또한 명시적 바인딩과의 우선순위를 비교하기위해서 하드 바인딩을 이용한다.

```javascript
function foo(something) {
  this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```

위 코드에서 명시적 바인딩이 new 바인딩보다 우선순위가 높다는 것을 알 수 있다. 또한 new로 오버라이드는 가능하다. 이 new로 하드 바인딩을 오버라이딩하는 경우는 함수 인자를 전부 또는 일부만 미리 셋팅해야 할 때 유용한다. 이는 커링'Currying'의 일종이다.

```javascript
function foo(p1, p2) {
  this.val = p1 + p2;
}

var bar = foo.bind(null, "p1");

var baz = new bar("p2");

baz.val; // p1p2
```

### this확정 규칙

&nbsp;this가 결정되는 규칙을 우선순위에 따라 정리해본다.

- new로 함수를 호출(new 바인딩)했는가? -> 했으면 새로 생성된 객체가 this다.
- 명시적 바인딩 혹은 하드 바인딩을 했는가? -> 했으면 명시적으로 지정된 객체가 this
- 함수를 콘텍스트 포함 형태(암시적 바인딩)로 호출했는가? -> 했으면 이 콘텍스트 객체가 this다.
- 그 외의 경우에 this는 기본 값으로 셋팅된다(기본 바인딩).

## 4. 바인딩 예외

&nbsp;특정 바인딩을 의도했는데 기본 바인딩 규칙이 적용되는 예외 사례들이 있다.

### this 무시

&nbsp;`call`, `apply`, `bind`메서드의 첫 번째 인자로 `null`혹은 `undefined`를 넘기면 기본 바인딩 규칙이 적용된다. 이 경우는 인자들을 커링하는 메서드로 많이 사용된다.

```javascript
function foo(a, b) {
  console.log("a: " + a + ", b: " + b);
}

// Currying
var bar = foo.bind(null, 2);
bar(3); // a: 2, b: 3
```

하지만 `null`을 애용하는 건 '리스크'가 있다. 따라서 Side effect를 발생시키지 않는 무관한 객체를 this로 바인딩하는 것이 좋다. 그래서 `Object.create(null)`을 사용한다.

```javascript
function foo(a, b) {
  console.log("a: " + a + ", b: " + b);
}

var empty = Object.create(null);

var bar = foo.bind(empty, 2);
bar(3); // a: 2, b: 3
```

### 간접 레퍼런스

&nbsp;간접 레퍼런스는 할당문에서 가장 빈번하게 발생한다.

```javascript
function foo() {
  console.log(this.a);
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo();
(p.foo = o.foo)(); // 2
```

맨 마지막 할당 표현식의 결과는 `p.foo()` 혹은 `o.foo()`가 아닌 `foo()`다. 그래서 기본 바인딩 규칙이 적용되고, 2가 출력된다.

### 소프트 바인딩

&nbsp;하드 바인딩은 this를 암시적 바인딩 하거나 추후에 수동으로 오버라이드하는 것이 불가능하다. 따라서 소프트 바인딩을 고안했다.

```javascript
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function (obj) {
    var fn = this;
    var curried = [].slice.call(arguments, 1);
    var bound = function () {
      return fn.apply(
        !this || this === (window || global) ? obj : this,
        curried.concat.apply(curried, arguments)
      );
    };
    bound.prototype = Object.create(fn.prototype);
    return bound;
  };
}
```

사용법은 다음과 같다.

```javascript
function foo() {
  console.log("name: " + this.name);
}

var obj = { name: "obj" },
  obj2 = { name: "obj2" },
  obj3 = { name: "obj3" };

var fooOBJ = foo.softBind(obj);

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2

fooOBJ.call(obj3); // name: obj3

setTimeout(obj2.foo, 10); // name: obj
```

때에 따라서 수동 바인딩 할 수 있고, 기본 바인딩 규칙이 적용되어야 할 땐 다시 obj로 되돌린다.

## 5. 어휘적 this

&nbsp;화살표 함수는 앞의 네 가지 규칙 대신 에두른 스코프(Enclosing Scope)를 보고 this를 알아서 바인딩 한다.

```javascript
function foo() {
  return (a) => console.log(this.a);
}

var obj1 = { a: 2 };
var obj2 = { a: 3 };

var bar = foo.call(obj1);
bar.call(obj2); // 2
```

`foo()`호출 당시 this를 무조건 어휘적으로 포착한다. 화살표 함수의 어휘적 바인딩은 절대 오버라이드할 수 없다. 또한 화살표 함수는 `bind()`를 대체할 수 있고 짧다. 물론 이전에도 기존 this 체계에 잘 맞는 패턴이 있다.

```javascript
function foo() {
  var self = this;
  setTimeout(function () {
    console.log(self.a);
  }, 100);
}

var obj = { a: 2 };

foo.call(obj); // 2
```

## 6. 정리하기

&nbsp;this바인딩은 함수의 호출부에 따라 달라진다. 또한 네 가지 바인딩 규칙이 있고, 규칙이 적용되지 않는 경우도 있다. 화살표 함수는 네 가지 규칙을 무시하고 렉시컬 스코프로 this를 바인딩 한다.
