CHAPTER 3 함수 VS 블록 스코프
==============

## 1. 함수 기반 스코프
&nbsp;자바스크립트는 함수 기반 스코프를 사용한다.

```javascript
function foo(a) {
  var b = 2;
  function bar() {
    // ...
  }
  var c = 3;
}
```

위 코드에서 `foo()`의 스코프 버블은 확인자 `a`, `b`, `bar`, `c`를 가진다. 또한 글로벌 스코프에는 하나의 확인자 `foo`만 존재한다. 따라서 `foo()`의 바깥에서는 `foo()` 스코프 버블 확인자에 접근하려면 오류가 발생한다.

## 2. 일반 스코프에 숨기
&nbsp;함수로 감싸는 것으로 변수와 함수를 '숨길' 수 있다. 이를 이용해 소프트웨어 디자인 원칙 중 하나인 '최소 권한의 원칙'을 만족시킬 수 있다. 필요한 것들만 노출시키고 나머지는 숨겨야 한다.

```javascript
function doSomething(a) {
  b = a + doSomethingElse(a * 2);
  console.log(b * 3);
}

function doSomethingElse(a) {
  return a - 1;
}
var b;

doSomething(2); // 15
```

위와 같은 코드에서 `doSomethingElse()`가 외부로 노출돼야할 이유가 없다. 따라서 다음과 같이 리팩토링 해줘야 한다.

```javascript
function doSomething(a) {
  funciton doSomethingElse(a) {
    return a - 1;
  }
  var b;
  b = a + doSomethingElse(a * 2);
  console.log(b * 3);
}

doSomething(2); // 15
```

결과는 다르지 않지만 이것이 더 나은 코드다.

### 충돌 회피
&nbsp;변수와 함수를 '숨기는 것'은 같은 이름을 가진 두 확인자가 충돌하는 것을 방지할 수 있다.

```javascript
function foo() {
  function bar(a) {
    i = 3;
    console.log(a + i);
  }

  for(var i = 0; i < 10; i++) {
    bar(i * 2); // Infinite loop
  }
}
foo();
```

이런 무한 루프를 피하기 위해서 `bar()` 내부의 `i = 3`을 `var i = 3`으로 바꿔줘야 한다.

#### 글로벌 '네임스페이스'
&nbsp;라이브러리는 글로벌 스코프에 있는 하나의 객체 선언문을 '네임스페이스'로 사용한다. 하지만 적절하게 숨겨져 있지 않은 라이브러리들을 불러오면 오류가 난다.

#### 모듈 관리
&nbsp;좀 더 현대적인 충돌을 방지하는 방법 중 하나는 모듈로 관리하는 방법이 있다.

## 3. 스코프 역할을 하는 함수
&nbsp;다음은 문제가 있는 코드다.

```javascript
var a = 2;

function foo() {
  var a = 2;
  console.log(a); // 3
}
foo();

console.log(a); // 2
```

두 가지 문제점이 존재하는데 하나는 `foo()`라는 함수를 선언해야 한다는 것이고, 다른 하나는 이 함수를 직접 호출해야 한다는 것이다. 이는 스코프를 '오염'시킨다. 다음은 이런한 문제점을 해결할 수 있는 방법이다.

```javascript
var a = 2;
(function foo() {
  var a = 3;
  console.log(a); // 3
})();
console.log(a); // 2
```

위 코드에서 함수는 함수 표현식으로 취급된다.

> `function`이 구문의 시작 위치에 있으면 함수 선언문, 다른 경우는 함수 표현식이다.

### 익명 vs 기명
&nbsp;다음과 같은 콜백 사용법은 익숙한 사용법이다.

```javascript
setTimeout(function() {
  console.log("I waited 1 second!");
}, 1000);
```

이러한 함수 표현식을 '익명 함수 표현식'이라고 한다. 확인자의 이름이 없기 때문이다. 하지만 익명 함수 표현식은 몇가지 단점이 있다.

* 익명 함수는 스택 추적 시 표시할 이름이 없어서 디버깅이 더 어려울 수 있다.
* 이름 없이 함수 스스로 재귀 호출을 하려면 불행히도 `arguments.callee`(폐기 예정)를 참조해야 한다. 또한 한 번 실행하면 해제되는 이벤트 처리도 힘들다.
* 이름은 읽을 수 있는 코드 작성에 도움이 된다.

따라서 다음과 같이 고치는 것이 좋다.

```javascript
setTimeout(funciton timeoutHandler() {
  console.log("I waited 1 second!");
}, 1000);
```

### 함수 표현식 즉시 호출하기
&nbsp;`(function foo() {})()`와 같은 패턴을 즉시 호출 함수 표현식(IIFE, Immediately Invoked Function Expression)이라고 부른다. 꼭 익명일 필요는 없지만 함수 이름을 `IIEF`라고 사용하기도 한다. 또한 UMD(Universal Module Definition, 범용 모듈 정의)프로젝트에서 다음과 같이 사용하기도 한다.

```javascript
var a = 2;
(function IIEF(def){
  def(window);
})(function def(global) {
  var a = 3;
  console.log(a); // 3
  console.log(global.a); // 2
})
```

## 4. 스코프 역할을 하는 블록
&nbsp;블록 스코프는 자바스크립트에서는 약한 어색한 개념일 수도 있다. 다음은 익숙한 코드다.

```javascript
for(var i = 0; i < 10; i++) {
  console.log(i);
}
```

하지만 위 코드에서 i는 둘러싼 스코프에 포함된다. 위 경우는 글로벌 스코프에 `i`가 정의된다. 다음 코드 또한 동일하다.

```javascript
var foo = true;

if(foo) {
  var bar = foo * 2;
  bar = something(bar);
  console.log(bar);
}
```

'가짜'스코프 블록에 의해 의도치 않게 다른 곳(글로벌)에 선언이 된다. 이런 방식을 해결하기 위해 블록 스코프를 사용하지만 아쉽게도 자바스크립트는 블록 스코프를 지원하지 않는다. 하지만 방법은 있다.

### with
&nbsp;with문을 사용하면 바깥 스코프에 영향 주는 일 없이 동작할 수 있다. 하지만 자양해야 할 구조다.

### try/catch
&nbsp;`try/catch`문 중 `catch`부분에 선언된 변수는 `catch`블록 스코프에 속한다.

```javascript
try {
  undefined();
}
catch(err) {
  console.log(err); // works
}

console.log(err); // ReferenceError: 'err' not found
```

### let
&nbsp;ES6부터 `let`키워드가 채택됐다. `let`은 선언된 변수를 둘러싼 아무 블록 스코프에 붙는다.

```javascript
var foo = true;
if(foo) {
  let bar = foo * 2;
  bar = something(bar);
  console.log(bar);
}
console.log(bar); // ReferenceError
```

또한 다음과 같이 명시적으로 할 수도 있다.

```javascript
var foo = true;
if(foo) {
  {
    let bar = foo * 2;
    bar = something(bar);
    console.log(bar);
  }
}
console.log(bar); // ReferenceError
```

`{}`를 추가만 해도 `let`을 통해 선언된 변수를 임의의 블록에 묶을 수 있다. 또한 `let`을 사용한 선언문은 호이스팅 효과를 받지 않는다.

#### 가비지 콜렉션(Garbage Collection)
&nbsp;블록 스코프가 유용한 다른 이유가 있다.

```javascript
function process(data) {
  // do something interesting
}

var someReallyBigData = {};
process(someReallyBigData);

var btn = document.getElementById("my_button");

btn.addEventListener("click", function click(evt) {
  console.log("button clicked");
}, /*capturingPhase=*/false);
```

위 코드에서 `click`함수는 `someReallyBigData`변수가 필요 없다. 하지만 `click`함수가 해당 스코프 전체의 클로저를 가지고 있기 때문에 계속 엔진이 데이터를 가지고 있을 것이다. 다음과 같이 해결할 수 있다.

```javascript
function process(data) {
  // do something interesting
}

{
  let someReallyBigData = {};
  process(someReallyBigData);
}

var btn = document.getElementById("my_button");

btn.addEventListener("click", function click(evt) {
  console.log("button clicked");
}, /*capturingPhase=*/false);
```

명시적으로 변수 영역을 한정하는 것은 효과적인 코딩 방식이다.

#### let반복문
&nbsp;`let`은 `for`반복문에서도 유용하게 사용된다.

```javascript
for(let i = 0; i < 10; i++) {
  console.log(i);
}

console.log(i); // ReferenceError
```

### const
&nbsp;`const`역시 블록 스코프를 생성하지만 변경하려고 하면 오류가 난다.

## 5. 정리하기
&nbsp;자바스크립트에서 함수안에 선언된 변수와 함수는 '숨겨진' 것이다. 이는 잘 적용해야할 디자인 원칙이다. 하지만 함수는 유일한 스코프 단위가 아니다. `try/catch`에서 블록스코프를 가진다. 또한 `let`키워드를 통해 코드 블록 안에 변수 선언이 가능해 졌다. 블록 스코프와 `var`함수 스코프는 같이 공존하면서 때에 맞게 사용할 수 있어야 한다.