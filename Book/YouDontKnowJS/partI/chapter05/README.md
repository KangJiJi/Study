CHAPTER 5 문법
==============

&nbsp;자바스크립트 구문(Syntax) 혹은 문법(Grammar)에 대해서 정리한다.

## 1. 문과 표현식
&nbsp;자바스크립트에서 문(Statement)과 표현식(Expression)은 명확하게 분별해야 한다. 자바스크립트에서 모든 표현식은 단일한, 특정한 결괏값으로 계산된다.

```javascript
var a = 3 * 6;
var b = a;
b;
```

위 세줄의 코드 모두 표현식이다. `var a = 3 * 6`, `var b = a`두 문은 '선언문(Declaration Statement)'이라 한다. `a = 3 * 6`, `b = a`는 '할당 표현식(Assignment Expression)'이라고 한다.

### 문의 완료 값
&nbsp;모든 문은 완료 값(Completion Value)을 가진다. 콘솔 창은 실행문의 완료 값을 기본적으로 출력한다. 예를 들어 `var b = a`와 같은 문의 완료 값은 `undefined`다. `b = a`의 완료 값은 할당 이후의 값 이지만, `var`문 자체의 완 값은 `undefined`이기 때문이다(명세에 그렇게 나와있다).

그러면 완료 값을 순간 포착하는 것이 가능할 것이다. 하지만 왜 그래야 하는지 생각해야 한다.

보통의 `{ }`블록은 내부의 가장 마지막 완료 값이 자신의 완료 값이다.

```javascript
var b;
if(true) {
  b = 4 + 38; // 콘솔 창에는 42가 나온다.
}
```

즉, 블록의 완료 값은 마지막 문의 값을 암시적으로 반환한 것이다. 하지만 다음과 같은 코드는 작동하지 않는다.

```javascript
var a, b;
// Uncaught SyntaxError: Unexpected token 'if'
a = if(true) {
  b = 4 + 38;
};
```

문의 완료 값을 다른 변수에 할당하는 건 귀운 구문/문법으로는 불가능하다. 하지만 `eval()`함수를 사용하면 완료 값을 포착할 수 있다(`eval()`함수는 사용하면 안된다).

```javascript
var a, b;
a = eval("if (true) { b = 4 + 38; }" );
a; // 42
```

ES7 명세에는 'do 표현식'을 제안했다. `do { }`표현식은 마지막 문의 완료 값을 반환한다.

```javascript
var a, b;
a = do {
  if(true) {
    b = 4 + 38;
  }
};
a; // 42
```

### 표현식의 부수 효과
&nbsp;대부분의 표현식에는 부수 효과가 없다. 다음 부수 효과를 가진 표현식의 예다.

```javascript
function foo() {
  a = a + 1;
}

var a = 1;
foo(); // 결괏값: undefined, 부수 효과: 'a'가 변경됨
```

`++`(증가 연산자)또한 부수 효과를 지니고 있다. 전위(Prefix) 또는 후위(Postfix) 연산자로 사용된다. 또한 `( )`로 감싸도 후위 부수 효과를 캡슐화할 수 없다.

```javascript
var a = 42;
var b = (a++);

a; // 43
b; // 42
```

하지만 문을 나열하는(Statement Series) 콤마 연사자 `,`를 사용하면 다수의 표현식을 하나로 연결할 수 있다.

```javascript
var a = 42, b;
b = (a++, a);
a; // 43
b; // 43
```

`delete`역시 결괏값은 `true`혹은 `false`다(`delete`부수 효과는 프로퍼티를 제거하는 것이다).

```javascript
var obj = {
  a: 42
};

obj.a; // 42
delet obj.a; // true
obj.a; // undefined
```

또한 `=`연산자도 `a = 42`에서 42를 `a`에 할당하는 자체가 본질적으로 부수 효과다. 다음과 같은 연쇄 할당문(Chained Assignment)을 유용하게 사용할 수 있다.

```javascript
var a, b, c;

a = b = c = 42;
```

다음과 같이 할당 연산자의 부수효과를 잘 이용하면 2개의 `if문`을 하나로 합치는 것도 가능하다.

```javascript
function vowels(str) {
  var matches;

  if(str && (matches = str.match(/[aeiou]/g))) return mathces;
}
```

### 콘텍스트 규칙
&nbsp;같은 구문을 어디서 어떤 식으로 사용하느냐에 따라 서로 다른 의미를 가질 수 있다.

#### 중괄호
&nbsp;자바스크립에서 `{ }`는 '객체 리터럴'과 '레이블'에 주로 사용된다.

#### 객체 리터럴
&nbsp;객체를 만들 때 다음과 같이 객체 리터럴 형식으로 만들 수 있다.

```javascript
var a = {
  foo: bar()
};
```

#### 레이블
&nbsp;위 코드에서 `var a =`부분을 삭제하면 할당되지 않은 객체가 아니라 평범함 코드 블록이다.

```javascript
{
  foo: bar()
}
```

`foo: bar()`는 '레이블 문(Labeled Statement)'이다. `foo`는 `bar()`문의 레이블 이다. 자바스크립트에는 `goto`문이 없지만 '레이블 점프(Labeled Jump)'라는 장치가 있다. `continue`와 `break`문이 선택적으로 레이블을 받아 프로그램 실행 흐름을 '점프' 한다.

```javascript
foo: for(var i = 0; i < 4; i++) {
  for(var j = 0; j < 4; j++) {
    // 두 루프의 반복자가 같을 때마다 바깥쪽 루프를 continue 한다.
    if(j == i) {
      //다음 순회 시 'foo' 붙은 루프로 점프한다.
      continue foo;
    }

    // 홀수 배수는 건너뛴다.
    if((j * i) % 2 == 1) {
      // 평범한(레이블 없는), 안쪽 루프의 'continue'
      continue;
    }

    console.log(i, j);
  }
}

// 1 0
// 2 0
// 2 1
// 3 0
// 3 2
```

`continue foo`는 "`foo`라는 레이블이 붙은 루프의 다음 순회를 계속하라"는 뜻이다. 또한 `break foo`도 "`foo`라는 레이블이 붙은 바깥쪽 루프/블록 밖으로 나가 그 이후부터 계속하라"는 뜻이다.

레이블 루프/블록은 피하는 게 좋지만 꼭 사용해야 한다면 주석으로 잘 문서화 시켜야 한다. 또한 `JSON`은 자바스크립트 구문의 하위 집합이지만, 올바른 자바스크립트 문법은 아니다. `{"a": 42}`는 올바른 `JSON`값이지만, 그 자체로는 레이블이 잘못된 블록으로 해석해 에러가 난다.

#### 블록
&nbsp;다음과 같은 함정이 있다.

```javascript
[] + {}; // "[object Object]"
{} + []; // 0
```

윗 줄에서 `{}`를 빈 객체로 해석한다. 하지만 아랫 줄의 `{}`는 빈 블록으로 간주 된다. 따라서 결과는 0이 나온다.

#### 객체 분해
&nbsp;ES6부터 '분해 할당(Destructuring Assignments)'은 객체 분해 시 `{ }`를 사용한다.

```javascript
fucntion getDate() {
  return {
    a: 42,
    b: "foo"
  };
}

var {a, b} = getData();
console.log(a, b); // 42 "foo"

// 위 코드와 같다
var res = getData();
var a = res.a;
var b = res.b;
```

`{ }`를 이용한 객체 분해로 간편 구문(Sugar Syntax)을 사용할 수 있다.

```javascript
function foo({ a, b, c }) {
  console.log(a, b, c);
}

foo({
  c: [1, 2, 3],
  a: 42,
  b: "foo"
}); // 42 "foo" [1, 2, 3]
```


#### else if와 선택적 블록
&nbsp;자바스크립트에는 `else if`절은 없다. `else if`는 항상 다음과 같이 파싱된다.

```javascript
if(a) {
  // ...
} else {
  if(b) {
    // ...
  } else {
    if(c) {
      // ...
    } else {
      // ...
    }
  }
}
```

## 2. 연산자 우선순위
&nbsp;