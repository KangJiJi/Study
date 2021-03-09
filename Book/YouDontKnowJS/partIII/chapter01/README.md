# CHAPTER 1 this라나 뭐라나

&nbsp;JS에서 this는 헷갈린다. 따라서 잘 알아야 할 필요가 있다.

## 1. This를 왜?

&nbsp;This의 유용함과 사용 동기를 알아보자.

```javascript
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
}

var me = { name: "Kyle" };
var you = { name: "Reader" };

identify.call(me); // KYLE
identify.call(you); // READER

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER
```

위와 같이 암시적인 객체 레퍼런스를 함께 넘기는 this 체계가 API 설계상 좀 더 깔끔하고 명확하며 재사용하기 쉽다. 사용 패턴이 복잡해질수록 명시적인 인자를 넘기는 방법은 코드가 더 지저분해진다.

## 2. 헷갈리는 것들

&nbsp;this는 어떻게 동작하는지 알아보기 전에 헷갈리는 점에 대해서 알아본다.

### 자기 자신

&nbsp;this는 함수 그 자체를 가리키지 않는다. 함수는 this로 자기 참조를 할 수 없다.

```javascript
function foo(num) {
  console.log("foo: " + num);
  this.count++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) foo(i);
}

// 다음과 같은 출력문은 정상적으로 동작
// foo: 6
// foo: 7
// foo: 8
// foo: 9

console.log(foo.count); // 0;
```

위 코드의 자세한 설명은 `chapter02`에서 한다. 렉시컬 스코프의 특징을 이용해서 편하게 해결할 수 있다. 하지만 왜 그렇게 동작하는지 알아야한다.

### 자신의 스코프

&nbsp;this는 함수의 스코프를 가리키지 않는다. 사실 어떤 면에선 맞는 말이기도 하지만, 분명한 건 this는 함수의 렉시컬 스코프를 참조하지 않는다는 것이다.

## 3. this는 무엇인가

&nbsp;this는 런타임 시점에 바인딩 되며 함수 호출 당시 상황에 따라 콘텍스트가 결정된다. this 바인딩은 오로지 어떻게 함수를 호출했느냐에 따라 정해진다. this는 실행 콘텍스트에 바인딩 된다.

## 4. 정리하기

&nbsp;this는 실제 함수 호출 시점에 바인딩 되며 무엇을 가리킬지는 전적으로 함수를 호출한 코드에 달렸다.
