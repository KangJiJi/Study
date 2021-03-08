# CHAPTER 5 스코프 클로저

&nbsp;렉시컬 스코프에 대해 제대로 이해했다면 클로저는 이해하기 쉽다.

## 1. 꺠달음

&nbsp;클로저는 새로운 문법이나 도구가 아닌 자바스크립트 모든 곳에 존재한다. 그저 받아들이면 된다. 클로저는 렉시컬 스코프에 의존해 코드를 작성한 결과로 나타난다.

## 2. 핵심

&nbsp;클로저는 함수가 렉시컬 스코프 밖에서 실행돼도 그 스코프를 기억해 접근하는 기능이다. 다음은 클로저를 알아볼 수 있는 코드다.

```javascript
function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }

  return bar;
}

var baz = foo();

baz(); // 2
```

함수 `bar()`는 `foo()`의 렉시컬 스코프에 접근할 수 있다. 따라서 `baz()`를 호출하면 `bar()`를 호출하게 되고 `foo()`의 렉시컬 스코프를 참조하게 된다. 일반적으로는 `foo()`가 실행된 뒤에는 내부 스코프를 GC(Garbage Collector)가 처리하지만 클로저 때문에 메모리에서 해제되지 않는다. `bar()`는 `foo()`가 실행된 뒤에도 해당 스코프에 대한 참조를 가지며 이를 클로저라고 한다. 어떤 방식이던 함수를 값으로 넘기고 다른 위치에서 호출하는 행위는 클로저가 작용한 예다.

```javascript
var fn;

function foo() {
  var a = 2;
  function baz() {
    console.log(a);
  }
  fn = baz;
}

function bar() {
  fn();
}

foo();
bar(); // 2
```

위 코드에서는 어디서든지 함수를 실행하든 처음 선언된 곳의 스코프에 대한 참조를 유지한다.

## 3. 이제 나는 볼 수 있다

&nbsp;클로저는 모든 코드안에 존재한다.

```javascript
function wait(message) {
  setTimeout(function timer() {
    console.log(message);
  }, 1000);
}

wait("Hello, closure!");
```

`wait()`실행 1초 후, `wait`의 내부 스코프는 사라져야 하지만 클로저를 계속 가지고 있기 때문에 `message`를 참조할 수 있다.

#### 클로저

&nbsp;클로저는 선언할 때 발생하지만, 바로 관찰할 수 있는 것은 아니다.

## 4. 반복문과 클로저

&nbsp;`for`반복문을 통해 클로저를 잘 설명할 수 있다.

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

위 코드를 실행해 보면 예상한 값과 다르게 '6'만 5번 출력된다. 반복문이 모두다 끝나고 출력을 하기 때문이다. 의도한 대로 코드를 작동시키기 해서는 각 반복문 별로 `i`의 값을 잡아둬야 할 필요가 있다.

```javascript
for (var i = 1; i <= 5; i++) {
  (function () {
    var j = i;
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })();
}
```

위와 같이 IIFE를 사용해서 해결할 수 있다. 각 반복할 때마다 하나의 스코프를 만들어서 참조하도록 하면 된다.

### 다시 보는 블록 스코프

&nbsp;가장 짧게 고칠 수 있는 방법이 있다. 바로 `let`키워드를 사용하는 것이다. `let`키워드는 블록 스코프에 변수를 선언하기 때문에 위 문제를 해결할 수 있다.

```javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

## 5. 모듈

&nbsp;클로저의 능력을 사용하는 패턴 중 가장 강력한 패턴은 모듈 패턴이다.

```javascript
function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join(" ! "));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother,
  };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

위와 같은 패턴을 모듈(Module)이라고 부른다. `doSomething()`과 `doAnother()`는 모듈 인스턴스의 내부 스코프에 클로저를 가진다. 반환된 객체의 참조 방식으로 렉시컬 스코프 밖에서 해당 스코프에 접근한는 것이 가능하다. 결과적으로 모듈 패턴을 이용하기 위해서는 두가지 조건이 필요하다.

- 하나의 최외곽 함수가 존재하고, 이 함수가 최소 한 번은 호출되어야 한다(호출될 때마다 새로운 모듈 인스턴스 생성).
- 최외곽 함수는 최소 한 번은 하나의 내부 함수를 반환해야 한다. 그래야 클로저를 가지고 참조할 수 있다.

다음은 하나의 인스턴스만 생성하는 싱글톤(Singleton)패턴이다.

```javascript
var foo = (function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join(" ! "));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother,
  };
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

또한 모듈은 인자를 받는 것도 가능하다. 그리고 공개 API로 반환하는 객체 이름을 정하는 방식이 있다.

```javascript
var foo = (function CoolModule(id) {
  function change() {
    publicAPI.identify = identify2;
  }

  function identify1() {
    console.log(id);
  }

  function identify2() {
    console.log(id.toUpperCase());
  }

  var publicAPI = {
    change: change,
    identify: identify1,
  };

  return publicAPI;
})("foo module");

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
```

### 현재의 모듈

&nbsp;많은 모듈 의존성 로더와 관리자는 모듈 정의를 친숙한 API형태로 감싸고 있다.

```javascript
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get,
  };
})();

MyModules.define("bar", [], function () {
  function hello(who) {
    return "Let me introduce: " + who;
  }

  return {
    hello: hello,
  };
});

MyModules.define("foo", ["bar"], function (bar) {
  var hungry = "hippo";
  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome: awesome,
  };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

console.log(bar.hello("hippo")); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO
```

### 미래의 모듈

&nbsp;ES6는 파일을 개별 모듈로 처리한다. inline형식을 지원하지 않고, 개별 파일(모듈당 파일 하나)에 정의해야 한다. 또한 브라우저와 엔진은 기본 모듈 로더를 가지고 있어서 모듈 로더는 동기적으로 모듈 파일을 불러온다.

```javascript
// bar.js
function hello(who) {
  return "Let me introduce: " + who;
}

// foo.js
import hello from "bar";

var hungry = "hippo";
function awesome() {
  console.log(hello(hungry).toUpperCase());
}

// baz.js
import * as foo from "foo";
import * as bar from "bar";

console.log(bar.hello("rhino")); // Let me introduce: rhino
foo.awesome(); // LET ME INTRODUCE: HIPPO
```

`import`는 모듈 API에서 하나 이상의 멤버를 불러와 특정 변수에 묶어(hello) 현재 스코프에 저장한다. `import * as`은 모듈 API 전체를 불러와 특정 변수에 묶는다(foo, bar).

## 6. 정리하기

&nbsp;클로저는 표준이며, 함수가 자신의 렉시컬 스코프를 기억하고 접근할 수 있는 특성을 의미한다.
