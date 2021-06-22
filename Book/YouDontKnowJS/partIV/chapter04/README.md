# CHAPTER 4 제너레이터

&nbsp;콜백으로 비동기 흐름 제어를 나타내는 방법에는 두 가지 단점이 있다.

- 콜백식 비동기는 우리가 머리속으로 계획하는 작업의 단계와 잘 맞지 않는다.
- 콜백은 제어의 역전 문제로 인해 믿음성이 떨어지고 조합하기 어렵다.

따라서 우리는 프로미스를 통해서 믿음성과 조합성을 지키고 IoC을 다시한번 역전시키는 방법에 대해서 배웠다. 이번에는 제너레이터(Generator)를 통해서 비동기 흐름 제어를 순차적/동기적 모습으로 나타내는 방법에 대해서 알아본다.

## 1. 완전-실행을 타파하다

&nbsp;제너레이터는 완전-실행 법칙(함수가 실행되기 시작하면 완료될 때까지 계속 실행되며 도중에 다른 코드가 끼어들어 실행되지 않는 법칙)을 따르지 않는다. 다음과 같은 이야기다.

```javascript
var x = 1;

function foo() {
  x++;
  bar();
  console.log('x: ', x);
}

function bar() {
  x++;
}

foo(); // x: 3
```

위 코드에서 `x++`와 `console.log('x: ', x)` 사이에 `bar()`가 없어도 `bar()`가 실행된다는 의미다. 선점형 멀티스레드 언어라면 가능하지만 JS는 선점형 언어도, 멀티스레드 언어도 아니다. 하지만 `foo()`내부에서 멈춤 신호를 통해서 다른 코드와 협동적 형태로 나타낼 수 있다.

```javascript
var x = 1;

function* foo() {
  x++;
  yield; // Stop
  console.log('x: ', x);
}

function bar() {
  x++;
}

// Generator foo의 제어를 위해서 이터레이터 `it`을 선언
var it = foo();

it.next();
x; // 2
bar();
x; // 3
it.next(); // x: 3
```

- 제너레이터의 실행을 제어할 이터레이터(`it`)를 마련한다.
- 첫번째 `it.next()`가 제너레이터를 시작하고 `*foo()`의 `x++`를 실행한다.
- `*foo()`는 `yield`문에서 멈춘다. `*foo()`는 실행 중이지만 멈춰있는 상태다.
- `x` 값을 출력해보니 `2`다.
- `bar()`의 호출로 `x`를 증가시킨다.
- `x`값을 다시 확인하면 `3`이다.
- 두번째 `it.next()`호출에 의해 `*foo()`는 `yield`부터 재개되어 `console.log`를 실행한다.

제너레이터는 1회 이상 시작/실행을 거듭할 수 있으면서 끝까지 실행할 필요가 없는 특별한 함수다. 이는 '비동기 흐름을 제어하는 제너레이터' 패턴을 위함이다.

### 입력과 출력

&nbsp;제너레이터는 특별한 함수지만, 기본적인 체계는 일반 함수와 같다. 다만 이터레이터 객체를 통해서 제어할 수 있다.

```javascript
function* foo(x, y) {
  return x * y;
}

var it = foo(6, 7);
var res = it.next();
res.value; // 42
```

#### 반복 메시징

&nbsp;제너레이터에는 `yield`와 `next()`를 통해 I/O메시지를 주고받는 강력한 기능이 있다.

```javascript
function* foo(x) {
  var y = x * (yield);
  return y;
}

var it = foo(6);
it.next();
var res = it.next(7);
res.value; // 42
```

`it.next()`는 `yield`에서 멈추고 결과값을 달라고 호출부 코드에 요청한다. 그리고 `it.next(7)`호출로 `yield`표현식의 결과가 `7`이라고 전달한다. 따라서 `42`가 나온다.

#### 왜 안 맞을까?

&nbsp;`next`의 호출 횟수가 제각각이다. 항상 `next`를 호출하면 `yield`까지 실행한다. 다음 `next`호출은 멈췄던 `yield`표현식을 이루고 다음 `yield`까지 실행된다.

#### 두 가지 질문

&nbsp;결국 'n + 1'번째 `next`가 'n'번째 `yield`에 답한다. 이러면 이터레이터 관점에서 양방향 메시징이 가능하다는 걸 설명할 필요가 없다.

```javascript
function* foo(x) {
  var y = x * (yield 'hello');
  return y;
}

var it = foo(6);

var res = it.next();
res.value; // "hello"

res = it.next(7);
res.value; // 42
```

`yield`와 `next`는 양방향 메시징 시스템이 가능하다. 또한 마지막 `next`에 답하는 문은 `return`문이다. 따라서 제너레이터 끝에 `return`이 없으면 `undefined`로 처리한다. 이런 양방향 메시징 시스템은 매우 강력하다.

### 다중 이터레이터

&nbsp;이터레이터를 생성할 때마다 제너레이터의 인스터스 역시 암시적으로 생성된다. 따라서 같은 제너레이터의 인스턴스를 여러개 생성하고 인스턴스끼리 상호작용도 가능하다.

#### 인터리빙

&nbsp;제너레이터는 문 사이에서도 인터리빙 할 수 있다. 각각의 이터레이터 호출 순서에 따라서 프로그램의 결과는 제각각일 수 있다.

## 2. 값을 제너레이터링

&nbsp;이터레이터와 제너레이터의 관계 그리고 제너레이터로 어떻게 값들을 만들어내는지 알아본다.

### 제조기와 이터레이터

&nbsp;과거의 값과 관계가 있는 현재 값을 생산하기 위해서는 마지막에 생산한 값을 기억하는 상태성 생산기(Stateful Producer)가 필요하다. 다음과 같이 클로저로 구현할 수 있다.

```javascript
// 무한 수열 생산기
var gimmeSomething = (function () {
  var nextVal;

  return function () {
    if (nextVal === undefined) {
      nextVal = 1;
    } else {
      nextVal = 3 * nextVal + 6;
    }

    return nextVal;
  };
})();

gimmeSomething(); // 1
gimmeSomething(); // 9
gimmeSomething(); // 33
gimmeSomething(); // 105
```

위와같은 코드는 이터레이터로 해결 가능한 일반적인 설계 패턴이다. 이터레이터는 생산자로부터 일련의 값들을 받아 하나씩 거치기 위한, 명확한 인터페이스다. 다음은 위 코드에 이터레이터 인터페이스를 적용한 예제다.

```javascript
var something = (function () {
  var nextVal;
  return {
    [Symbol.iterator]: function () {
      return this;
    },
    next: function () {
      if (nextVal === undefined) {
        nextVal = 1;
      } else {
        nextVal = 3 * nextVal + 6;
      }

      return { done: false, value: nextVal };
    },
  };
})();

something.next().value; // 1
something.next().value; // 9
something.next().value; // 33
something.next().value; // 105
```

`done`은 이터레이터 완료 상태를 가리키는 불리언 값이고 `value`는 순회값이다. 또한 `for...of`를 통해서 표준 이터레이터를 기존 루프 구문 형태로 쓸 수 있다. 그리고 `for...of`는 `done: true`를 받으면 멈춘다.

```javascript
for (var v of something) {
  console.log(v);
  // 항상 `done: false`를 반환하기 때문에 무한 반복하는 것을 방지한다
  if (v > 500) {
    break;
  }
}
```

또한 ES6부터 JS 내장 자료 구조 대부분에는 기본 이터레이터가 있다.

### 이터러블

&nbsp;이터러블(Iterable)은 이터레이터를 포괄한 객체다. ES6부터 `Symbol.iterator`라는 이름을 가진 함수를 지니고 있어야 이터레이터를 가져올 수 있다. 배열을 이터러블이라고 볼 수 있고 `for...of`루프는 `Symbol.iterator`함수를 호출하여 이터레이터를 생성한다. 그리고 다음과 같이 수동으로 호출할 수 있다.

```javascript
var a = [1, 3, 5, 7, 9];

var it = a[Symbol.iterator]();
it.next().value; // 1
it.next().value; // 3
it.next().value; // 5
```

### 제너레이터 이터레이터

&nbsp;제너레이터는 값을 생성하며, 생성된 값들은 이터레이터 인터페이스의 `next`를 호출하여 하나씩 추출할 수 있다. 그래서 무한 수열 생산기 `something`을 다음과 같이 구현할 수 있다.

```javascript
function* something() {
  var nextVal;

  // yield 덕분에 무한 루프에 빠지지 않는다.
  while (true) {
    if (nextVal === undefined) {
      nextVal = 1;
    } else {
      nextVal = 3 * nextVal + 6;
    }

    yield nextVal;
  }
}
```

`for..of`루프를 통한 반복에서도 그대로 사용할 수 있다.

```javascript
for (var v of something()) {
  console.log(v);
  if (v > 500) {
    break;
  }
}
```

그런데 제너레이터와 루프 간의 상호작용에 관해서 두 가지 의문점이 생긴다.

- `for (var v of something)`처럼 사용하면 어떻게 될까?
- `something()`을 호출하면 이터레이터가 만들어지지만 `for...of`는 이터러블을 원하는 것 아닌가?

#### 제너레이터 멈춤

&nbsp;`for...of`루프가 `break`, `return`과 같이 비정상 완료(Abnormal Completion)이 되면 제너레이터의 이터레이터를 중지하도록 신호를 준다. 또한 수동으로 신호를 보내야하는 경우는 `return()`을 이용한다.

제너레이터가 외부적으로 완료된 다음에도 `try...finally`절을 이용하면 실행할 수 있다. 이는 자원을 정리할 때 유용하다.

```javascript
function* something() {
  try {
    var nextVal;
    while (true) {
      if (nextVal === undefined) {
        nextVal = 1;
      } else {
        nextVal = 3 * nextVal + 6;
      }

      yield nextVal;
    }
  } finally {
    console.log('정리 완료');
  }
}

var it = something();

for (var v of it) {
  console.log(v);

  if (v > 500) {
    console.log(it.return('Hello world').value);
    // break 필요 X
  }
}

// 1 9 33 105 321 969
// 정리완료
// Hello world
```

`it.return`하면 제너레이터 실행은 끝나고 `finally`절로 옮겨간다. 또한 인자값이 반환값이 된다. 그리고 이터레이터는 `done: true`이므로 `break`없이도 `for...of`루프는 끝난다.

## 3. 제너레이터를 비동기적으로 순회

&nbsp;다음은 콜백식 코드다.

```javascript
function foo(x, y, cb) {
  ajax('http://some.url.1/?x=' + x + '&y=' + y, cb);
}

foo(11, 31, function (err, text) {
  if (err) {
    console.error(err);
  } else {
    console.log(text);
  }
});
```

위 코드를 제너레이터로 표현하면 다음과 같다.

```javascript
function foo(x, y) {
  ajax('http://some.url.1/?x=' + x + '&y=' + y, function (err, data) {
    if (err) {
      // *main()으로 에러 throw
      it.throw(err);
    } else {
      // 수신한 data로 *main() 재개
      it.next(data);
    }
  });
}

function* main() {
  try {
    var text = yield foo(11, 31);
    console.log(text);
  } catch (err) {
    console.error(err);
  }
}

var it = main();
it.next();
```

`var text = yield foo(11, 31);`가 핵심이다. 보기에는 동기적 코드인데 비동기로 동작한다. 제너레이터 자신이 알아서 코드를 중단한다. 여기서 `yield`는 흐름 제어 수단으로 사용했다. `yield`를 만나면 제너레이터는 "text에 어떤 값을 할당해야 하나요?"라고 묻는다.

그러면 Ajax요청이 성공한 다음 호출되는 `it.next(data)`가 `text`에 할당해야할 값을 넘긴다.

### 동기적 에러 처리

&nbsp;에러처리 또한 `yield`를 통해 동기적으로 할 수 있다. 그리고 제너레이터 밖으로도 에러를 던질 수 있다.

```javascript
function* main() {
  var x = yield 'Hello World';
  yield x.toLowerCase(); // 에러 발생
}

var it = main();

it.next().value; // Hello World

try {
  it.next(42);
} catch (err) {
  console.error(err); // TypeError
}
```

제너레이터에 `throw()`로 던져넣은 에러를 잡는 것도 가능하다.

```javascript
function* main() {
  var x = yield 'Hello World';
  console.log(x); // 실행 안됨
}

var it = main();

it.next();

try {
  it.throw('허걱');
} catch (err) {
  console.error(err); // 허걱
}
```

이렇게 동기적인 모양으로 처리할 수 있는 것은 가독성, 추론성 면에서 매우 큰 강점이다.

## 4. 제너레이터 + 프라미스

&nbsp;제너레이터(동기적 형태의 비동기 코드)와 프로미스(믿음성과 조합성)의 만남이 ES6의 강점이다. 프로미스를 `yield`한 다음 이 프로미스로 제너레이터의 이터레이터를 제어하는 것이다. 다음과 같이 할 수 있다.

```javascript
function foo(x, y) {
  return request("http://some.url.1/?x=' + x + '&y=' + y");
}

function* main() {
  try {
    var text = yield foo(11, 31);
    console.log(text);
  } catch (err) {
    console.log(err);
  }
}

var it = main();

var p = it.next().value;

p.then(
  function (text) {
    it.next(text);
  },
  function (err) {
    it.throw(err);
  }
);
```

`main`에는 프로미스를 인식하는 단계가 하나만 있다. 이처럼 비동기 코드를 동기적으로 동작하는 것 처럼 보이게 할 수 있다. 정리하자면 제너레이터가 프로미스를 `yield`하고 이 프로미스가 제너레이터의 이터레이터를 제어하여 끝까지 진행하는 것이다.

### 프라미스-인식형 제너레이터 실행기

&nbsp;위와 같은 제너레이터를 쉽게 실행시켜주는 유틸리티를 직접 구현해서 사용할 수 있다.

#### ES7: async와 await

&nbsp; 현재 표준에 속해있는 문법이다.

### 제너레이터에서의 프로미스 동시성

&nbsp;다음 코드는 실행은 잘 되지만 최적을 성능을 내는 코드는 아니다.

```javascript
function* foo() {
  var r1 = yield request('http://some.url.1');
  var r2 = yield request('http://some.url.2');
  var r3 = yield request('http://some.url.3/?v=' + r1 + ',' + r2);
  console.log(r3);
}

run(foo); // custom 유틸리티 사용
```

여기서 `r1`과 `r2`는 동시 실행이 가능하지만 실제로는 순차 실행된다. 따라서 시간 독립적 형태로 상태 관리가 가능한 프로미스 본연의 능력에 맡긴다.

```javascript
function* foo() {
  // 동시에 요청
  var p1 = request('http://some.url.1');
  var p2 = request('http://some.url.2');

  var r1 = yield p1;
  var r2 = yield p2;

  var r3 = yield request('http://some.url.3/?v=' + r1 + ',' + r2);
  console.log(r3);
}

run(foo); // custom 유틸리티 사용
```

또한 `Promise.all([])`을 이용해서 나타낼 수 있다.

#### 프라미스 숨김

&nbsp;제너레이터 내부에 얼마만큼의 프로미스 로직을 넣을지 신중히 판단해야 한다. 프로미스 로직을 어떤 함수로 뽑아내고 `yield`와 함께 제너레이터에서 호출하는 식의 코드는 흐름 제어를 정교하게 다루기 유용하다. 의도적으로 추상화 해야지 표현하기 편하다. 간결함이라는 대가로 복잡도는 증기하기 마련이다.

## 5. 제너레이터 위임

&nbsp;다음 코드를 보자.

```javascript
function* foo() {
  var r2 = yield request('http://some.url.2');
  var r3 = yield request('http://some.url.3/?v=' + r2);

  return r3;
}

function* bar() {
  var r1 = yield request('http://some.url.1');
  var r3 = yield run(foo);
  console.log(r3);
}

run(bar);
```

위 코드에서 `*bar()`안에서 다시 `run`을 통해서 `*foo()`를 호출한다. 이때 `*foo()`호출을 `*bar()`안으로 합하고자 한다면 'yield 위임'을 사용하는 것이 좋다. 더 간단한 코드를 보자.

```javascript
function *foo() {
  console.log("*foo() 시작");
  yield 3;
  yield 4;
  console.log("*foo() 끝");
}

function *bar() {
  yield 1;
  yield 2;
  yield *foo(); // yield 위임
  yield 5;
}

var it = var();

it.next().value; // 1
it.next().value; // 2
it.next().value; // *foo() 시작
// 3
it.next().value; // 4
it.next().value; // *foo() 끝
// 5
```

`foo()`를 호출하면 이터레이터를 생성하고 `yield *`는 이터레이터 인스턴스에 관한 제어권을 `*foo()`에게 위임한다. 위 방식을 앞의 예제에 적용하면 다음과 같다.

```javascript
function* foo() {
  var r2 = yield request('http://some.url.2');
  var r3 = yield request('http://some.url.3/?v=' + r2);

  return r3;
}

function* bar() {
  var r1 = yield request('http://some.url.1');
  var r3 = yield* foo();
  console.log(r3);
}

run(bar);
```

### 왜 위임을?

&nbsp;코드를 조직화하고 일반 함수 호출과 맞추기 위해서다. 위와같이 `*bar()`내부에서 `*foo()`의 실행 단계를 수동으로 순회할 수 있다.

### 메시지 위임

&nbsp;yield 위임은 양방향 메시징에도 쓰인다. 또한 예외도 위임할 수 있다.

### 비동기성을 위임

&nbsp;위 `ajax`요청 예제와 동일하다.

### 위임 '재귀'

&nbsp;스스로에게 yield 위임하는 제너레이터 작성 시에도 쓸 수 있다.

```javascript
function* foo(val) {
  if (val > 1) {
    // 재귀
    val = yield* foo(val - 1);
  }
  return yield request('http://some.url/?v=' + val);
}

function* bar() {
  var r1 = yield* foo(3);
  console.log(r1);
}

run(bar);
```

## 6. 제너레이터 동시성

&nbsp;`ajax`응답 처리를 경합 조건이 발생하지 않게끔 다음과 같은 코드를 이용했었다.

```javascript
function response(data) {
  if (data.url == 'http://some.url.1') {
    res[0] = data;
  } else if (data.url == 'http://some.url.2') {
    res[1] = data;
  }
}
```

위 코드를 제너레이터로 구현하면 다음과 같다.

```javascript
var res = [];

function* reqData(url) {
  res.push(yield request(url));
}
```

두 요청간 상호작용이 필요한 경우는 다음과 같이 해결할 수 있을 것이다.

```javascript
var res = [];

function* reqData(url) {
  var data = yield request(url);
  yield;
  res.push(data);
}

var it1 = reqData('http://some.url.1');
var it2 = reqData('http://some.url.2');

var p1 = it.next();
var p2 = it.next();

p1.then(function (data) {
  it1.next(data);
});

p2.then(function (data) {
  it2.next(data);
});

Promise.all([p1, p2]).then(function () {
  it1.next();
  it2.next();
});
```

두 `request`가 동시에 독립적으로 실행된다. 다음으로 `runAll()`이란 유틸리티를 생각해보자.

```javascript
var res = [];

runAll(
  function* () {
    var p1 = request('http://some.url.1');
    yield;
    res.push(yield p1);
  },
  function* () {
    var p2 = request('http://some.url.2');
    yield;
    res.push(yield p2);
  }
);
```

## 7. 썽크

&nbsp;'Thunk'는 다른 함수를 호출할 운명을 가진 인자가 없는 함수다. 다시 말하면 함수를 감싸서 실행을 지연시키는 함수가 'Thunk'다. 다음과 같이 사용할 수 있다.

```javascript
function foo(x, y, cb) {
  setTimeout(function () {
    cb(x + y);
  }, 1000);
}

function fooThunk(cb) {
  foo(3, 4, cb);
}

fooThunk(function (sum) {
  console.log(sum); // 7
});
```

JS에서 Thunk를 이용하는 표준적인 방법은 Thunk를 만드는 함수를 생성하는 것이다.

```javascript
function thunkify() {
  return function () {
    var args = [].slice.call(arguments);
    return function (cb) {
      args.push(cb);
      return fn.apply(null, args);
    };
  };
}
```

### s/promise/thunk

&nbsp;Thunk와 Promise를 비교하면 Promise가 훨씬 더 능력 좋고 믿을 수 있다. 하지만 어떤 값을 요청해서 비동기적 응답을 받는다는 점은 같다. 이런 점을 이용하면 다음과 같이 사용할 수 있다.

```javascript
function* foo() {
  var val = yield request('http://some.url.1');
  console.log(val);
}

run(foo);
```

제너레이터 입장에서는 promise인지 thunk인지 신경쓸 필요가 없다.

## 8. ES6 이전 제너레이터

&nbsp;트랜스파일러에서 기능을 제공하고 있지만 다음과 같이 직접 구현할 수도 있을 것이다.

### 수동 변환

&nbsp;제너레이터를 수동으로 트랜스파일하는 방법이다.

```javascript
function foo(url) {
  // ...
  return {
    next: function (v) {},
    throw: function (e) {},
  };
}
```

우선 이터레이터를 반환하도록 한다. 그리고 클로저에 상태 추적용으로 사용할 변수를 추가한다.

```javascript
function foo(url) {
  var state;
  // ...
}
```

`Switch`문을 통해서 상태에 따라서 처리하는 `process`함수를 추가하고, 상태가 변할때마다 `process`를 호출하도록 한다.

### 자동 변환

&nbsp;앞에서 봤듯이 제너레이터는 개념적으로 `state`와 `switch`로 동작한다. 이런 개념만 잘 알고, 이제는 트랜스파일러가 알아서 잘 변경해줄 것이다.

## 9. 정리하기

&nbsp;제너레이터는 완전 실행하지 않고 실행도중 멈출 수 있는 새로운 유형의 함수다. `yield`를 통해서 멈출 수 있고 이터레이터의 `next`를 통해서 다시 시작할 수 있다. 또한 양방향 메시징 체계가 있다. 이런 제너레이터의 핵심은 비동기 흐름을 제너레이터를 통해서 동기/순차적 형태로 표현할 수 있다는 것이다. 따라서 코드를 자연스럽게 이해하거나 콜백식 비동기 코드의 신뢰성과 가독성을 해결할 수 있다.
