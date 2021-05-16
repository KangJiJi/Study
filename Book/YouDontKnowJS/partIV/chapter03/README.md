# 프라미스

&nbsp;콜백으로 비동기성을 표현하고 동시성을 다루면 '순차서'과 '믿음성'이 결여된다. 먼저 믿음의 문제를 해결하기 위해 제저의 역전을 되역전시킨다. 개발자가 언제 작업이 끝날지 알 수 있고 그 다음에 무슨 일을 해야할지 스스로 결정할 수 있게 하는 것이 프로미스 체계다.

## 1. 프라미스란

&nbsp;프로미스의 개념에 대해 충분히 설명하기 위해서 두 가지 비유를 사용한다.

### 미랫값

&nbsp;치즈 버거를 주문하는 예시다. 치즈 버거를 주문하면 5,500원을 결제하고 점원은 주문 번호가 적힌 영수증은 건네준다. 주문 번호가 IOU(차입증서)로, 프로미스(약속)다. 그리고 영수증을 가지고 기다리면서 다른일을 할 수 있다. 내 영수증은 미랫값이다. 이제 점원이 주문 번호를 부르면 카운터로 가서 영수증을 주고 치즈버거를 받는다. 프로미스를 값과 교환한다.

반면 재료가 떨어져서 치즈 버거를 받을 수 없는 상황도 생긴다. 미랫값은 성공 아니면 실패다.

#### 지금값과 나중값

&nbsp;어떤 값을 내는 코드를 짤 때 그 값이 '지금' 존재하는 구체적인 값이라는 가정을 한다.

```javascript
var x;
var y = 2;

console.log(x + y); // NaN
```

`x + y`연산을 할 때는 당연히 `x`, `y` 모두 세팅된 값이라고 본다. `+` 연산자가 스스로 `x`, `y`의 상태를 감지하지 않는다. 다음과 같이 콜백으로 해결할 수 있다.

```javascript
function add(getX, getY, cb) {
  var x, y;
  getX(function (xVal) {
    x = xVal;
    if (y != undefined) cb(x + y);
  });
  getY(function (yVal) {
    y = yVal;
    if (x != undefined) cb(x + y);
  });
}

add(fetchX, fetchY, function (sum) {
  console.log(sum);
});
```

코드가 흉하다. '지금'과 '나중'을 모두 일관적으로 다루려면 둘 다 '나중'으로 만들어 모든 작업을 비동기화하면 된다.

#### 프라미스 값

&nbsp;`x + y`예제를 프로미스 함수로 간단히 나타내보자.

```javascript
function add(xPromise, yPromise) {
  return Promise.all([xPromise, yPromise]).then(function (values) {
    return values[0] + values[1];
  });
}

add(fetchX(), fetchY()).then(function (sum) {
  console.log(sum);
});
```

`fetchX`와 `fetchY`를 직접 호출하여 이들의 반환 값(프로미스)을 `add`에 전달한다. 시점에 상관없이 각 프로미스가 같은 결과를 내게끔 정규화하면 미랫값을 독립적으로 추론할 수 있다. `X`, `Y`의 미랫값을 기다리는 로직은 `add`안에 숨어있다.

프로미스의 값은 'Fulfillment'혹은 'Rejection'으로 귀결될 수 있다. 프로미스 `then()`은 첫 번째 인자로 'Fulfillment', 두 번째 인자로 'Rejection'를 받는다.

```javascript
add(fetchX(), fetchY()).then(
  function (sum) {
    console.log(sum);
  },
  function (err) {
    console.log(err);
  }
);
```

프로미스 시간 의존적인 상태를 외부로부터 캡슐화하기 때문에 프라미스 자체는 시간 독립적이고 결과에 상관없이 예측 가능한 방향으로 구성할 수 있다. 또한, 프로미스는 'Resolve'된 이후로는 상태가 그대로 유지된다.

### 완료 이벤트

&nbsp;프로미스의 'Resolve'값은 비동기 작업의 여러 단계를 '흐름 제어'하기 위한 체계다. 콜백에서의 알림은 `foo`에서 넘겨준 콜백을 호출하면 성립된다. 하지만 프로미스에서는 이 관계가 역전되어 `foo`에서 이벤트를 리스닝하고 있다가 알림을 받으면 다음을 진행한다.

```javascript
foo(x) { }

foo(42)

// Listening
on (foo "Resolve") { }
on (foo "Reject") { }
```

`foo`를 부른 뒤 2개의 이벤트 리스너를 설정한다. 이는 관심사의 분리도 만족한다. 위 의사 코드를 자바스크립트 코드로 표현하면 다음과 같다.

```javascript
function foo(x) {
  // ...
  return listener;
}

var evt = foo(42);

evt.on('completion', function () {});
evt.on('failure', function () {});
```

`foo`가 `evt`라는 이벤트 구독기를 반환하고 여기에 콜백 함수를 넣는다. 이는 콜백 지향 코드와 정반대이다. 그래서 우리는 더 우아하게 관심사를 분리할 수 있다.

#### 프라미스 '이벤트'

&nbsp;이 `evt` 이벤트 구독기는 프라미스와 유사하다. 다음 코드를 보자.

```javascript
function foo(x) {
  return new Promise(function (resolve, reject) {
    // ...
  });
}

var p = foo(42);

bar(p);
baz(p);
```

아마 `bar`와 `baz`는 다음과 같은 코드로 채워져 있을 것이다.

```javascript
function bar(fooPromise) {
  fooPromise.then(
    function () {
      // resolve
    },
    function () {
      // reject
    }
  );
}
```

결과적으로 `foo`가 반환한 프로미스로 다음에 벌어질 일을 제어할 수 있다. 또한 프로미스는 똑같은 결과를 영원히 유지한다.

## 2. 데너블 덕 타이핑

&nbsp;어떤 값이 진짜 프로미스인지 아닌지 확신할 수 있어야한다. 프로미스는 다른 브라우저 창에서 넘겨받기도 하는데 인스턴스 체크만으로는 제대로 확신할 수 없다. 또한 외부 패키지가 고유한 프로미스를 사용하는 경우도 있다. 따라서 사이비 프로미스 값을 찾아내서 흡수하는 기능이 중요하다.

진짜 프로미스는 `then`메서드를 가진, 데너블(Thenable)이라는 객체 또는 함수로 판별한다. 데너블한 값은 무조건 프로미스 규격에 맞다고 간주한다.

반면 어떤 값의 타입을 형태로 보고 짐작하는 타입 체크를 덕 타이핑이라 한다. Javascript도 덕 타이핑을 지원한다. 그런데 이 덕 타이핑 때문에 `then`이라는 메서드를 프로미스와 관계없이 가지고 있는 객체들을 데너블한 값으로 처리하는 문제가 있다.

## 3. 프라미스 믿음

&nbsp;콜백에서 무너진 비동기 코드의 신뢰를 회복시킬 만한 중요한 안전 장치에 대해 알아본다. `foo`에 콜백을 넘긴 이후 일어날 수 있는 경우는 다음과 같다.

- 너무 일찍 콜백 호출
- 너무 늦게 콜백 호출
- 너무 적게, 아니면 너무 많이 콜백 호출
- 필요한 환경/인자를 정상적으로 콜백에 전달 못함
- 발생 가능한 에러/예외를 무시함

프로미스는 위 모든 일들에 대해 해결책을 제시한다.

### 너무 빨리 호출

&nbsp;`then`을 호출하면 프로미스가 이미 귀결된 이후라 해도 `then`에 건넨 콜백은 항상 비동기적으로만 부른다. 따라서 경합 조건을 방지한다.

### 너무 늦게 호출

&nbsp;`then`에 등록한 콜백은 새 프로미스가 생성되면서 `resolve`와 `reject` 둘 중 하나를 자동으로 호출하도록 스케줄링된다. 따라서 어느 한 콜백에서 다른 콜백에 영향을 주지 않는다.

```javascript
p.then(function () {
  p.then(function () {
    console.log('C');
  });
  console.log('A');
});
p.then(function () {
  console.log('B');
});

// A B C
```

위 코드에서 C가 B를 앞지를 가능성은 없다.

#### 프라미스 스케줄링의 기벽

&nbsp;별개의 두 프로미스에서 연쇄된 콜백 사이의 상대적인 실행 순서는 장담할 수 없다.

```javascript
var p3 = new Promise(function (resolve, reject) {
  resolve('B');
});

var p1 = new Promise(function (resolve, reject) {
  resolve(p3);
});

var p2 = new Promise(function (resolve, reject) {
  resolve('A');
});

p1.then(function (v) {
  console.log(v);
});

p2.then(function (v) {
  console.log(v);
});

// A B
```

`p1`은 `p3`를 `resolve`하고 다시 `B`를 `resolve`한다. 이때 `p1`콜백은 `p2`콜백보다 비동기 잡 큐에서 후순위로 밀리게 된다. 처음부터 콜백의 순서가 문제를 일으키지 않는 방향으로 코딩하는 편이 바람직하다.

### 한번도 콜백을 안 호출

&nbsp;프로미스 스스로 귀결 사실을 알리지 못하게 막을 방도는 없다. 하지만 프로미스 스스로 어느 쪽으로도 귀결되지 않으면? 이런 경우도 프로미스로 해결 가능하다.

```javascript
function timeoutPromise(delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('Timeout');
    }, delay);
  });
}

Promise.race([foo(), timeoutPromise(3000)]).then(
  function () {},
  function (err) {}
);
```

반드시 `foo`의 결과를 알려준다.

### 너무 가끔, 너무 종종 호출

&nbsp;프로미스는 정의상 단 한번만 귀결된다. `resolve`혹은 `reject`중 하나만 호출하면 이후의 시도는 무시한다.

### 인자/환경 전달 실패

&nbsp;명시적인 값으로 귀결되지 않으면 그 값은 `undefined`로 세팅된다. 또한 `resolve`, `reject`함수를 호출할 때 인자를 여러개 넘겨도 두 번째 인자 이후로는 무시된다. 여러 값을 넘기고 싶으면 배열이나 객체로 꼭 감싸야한다.

### 에러/예외 삼키기

&nbsp;프로미스에서 Javascript 에러가 나면 주어진 프로미스를 강제로 버린다.

```javascript
var p = new Promise(function (resolve, reject) {
  foo.bar(); // Error
  resolve(42); // 실행 안됨
});

p.then(
  function fulfilled() {
    // 실행 안됨
  },
  function rejected(err) {
    // TypeError 예외 객체
  }
);
```

프로미스 버림 콜백에서 잡아 대응할 수 있다.

### 미더운 프라미스?

&nbsp;프로미스는 콜백을 완전히 없애기 위한 장치가 아니다. `foo`에서 콜백을 바로 넘기지 않고 `foo`에서 '뭔가(프로미스)'를 반환받아 이 '뭔가'에 콜백을 전하는 것이다. 하지만 이 '뭔가'가 프로미스라고 장담할 수 있는가?

즉시값 혹은 데너블이 아닌 값을 `Promise.resolve`에 전달하면 이 값으로 이루어진 프로미스를 반환한다.

```javascript
var p1 = Promise.resolve(42);
var p2 = Promise.resolve(p1);

p1 === p2; // true
```

데너블 값을 `Promise.resolve`에 주면 그 값을 풀어보고 프로미스가 아닌 구체적인 값이 나올 때까지 계속 풀어본다.

```javascript
var p = {
  then: function (cb) {
    cb(42);
  },
};

p.then(
  function fulfilled(val) {
    console.log(val); // 42
  },
  function rejected(err) {
    // 실행 X
  }
);
```

어떤 값이라도 `Promise.resolve()`에 넣으면 정규화한다.

```javascript
// 이렇게 하지 말자
foo(42).then(function (v) {});

// 이렇게 하자
Promise.resolve(foo(42)).then(function (v) {});
```

### 믿은 형성

&nbsp;따라서 프로미스는 믿음직하다.

## 4. 연쇄 흐름

&nbsp;프로미스는 단일 단계 작업을 대상으로 만들어진 체계가 아니다. 비동기 단계를 나타낼 수 있다.

- 프로미스에 `then`을 부를 때마다 생성하여 반환하는 새 프로미스를 계속 연쇄할 수 있다.
- `then`의 콜백이 반환한 값은 연쇄 프로미스의 이룸 값으로 세팅된다.

비동기 시퀸스를 생성할 때 프로미스를 어떻게 사용하는지 알아본다.

```javascript
var p = Promise.resolve(21);

var p2 = p.then(function (v) {
  console.log(v); // 21
  return v * 2;
});

p2.then(function (v) {
  console.log(v); // 42
});
```

하지만 `p`가 추가된다면 `p2`, `p3`, `p4`와 같은 계속 선언하는 것은 번거롭다. 따라서 다음과 같이 연쇄할 수 있다.

```javascript
var p = Promise.resolve(21);

p.then(function (v) {
  console.log(v); // 21
  return v * 2;
}).then(function (v) {
  console.log(v); // 42
});
```

프로미스를 반환하거나 비동기성을 부여해도 작동방식은 동일하다. 따라서 다음과 같이 사용할 수 있다.

```javascript
function request(url) {
  return new Promise(function (resolve, reject) {
    ajax(url, resolve);
  });
}

request('http://some.url.1')
  .then(function (response1) {
    return request('http://some.url.2' + response1);
  })
  .then(function (response2) {
    console.log(response2);
  });
```

`then`에 온전한 함수를 넘기지 않아도 기본 처리도 동작한다.

```javascript
var p = Promise.resolve(42);

// null 대신
// function(v) {
//   return v;
// }
// 가 있다고 가정하여 처리
p.then(null, function rejected(err) {
  // 실행되지 않는다.
});
```

### 용어 정의: 귀결, 이룸, 버림

&nbsp; 용어들을 살펴본다.

```javascript
var p = new Promise(function (x, y) {
  // x 는 이룸
  // y 는 버림
});
```

`y`는 `reject`라고 쓰는 것이 좋다. 그리고 `x`에 대해서는 많은 책에서 `resolve`라고 사용한다. 하지만 `fulfill`이라는 이름이 더 정확하다. 실제 ES6 명세에서도 두 콜백을 `onFulfilled`와 `onRejected`라고 명명한다.
