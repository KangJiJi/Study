CHAPTER 4 호이스팅
==============

&nbsp;선언문의 위치에 따라서 변수가 추가되는 과정이 다르다.

## 1. 닭이 먼저냐 달걀이 먼저냐
&nbsp;자바스크립트는 위에서부터 차례대로 해석되지 않는다.

```javascript
a = 2;
var a;
console.log(a);
```

결과값은 `undefined`가 아닌 `2`가 나온다. 다음 코드 또한 비슷하다.

```javascript
console.log(a);
var a = 2;
```

이번 결과값은 `undefined`가 된다.

## 2. 컴파일러는 두 번 공격한다.
&nbsp;자바스크립트 엔진은 컴파일레이션 단계에서 모든 선언문을 찾아 스코프에 적절하게 연결해주는 작업을 진행한다. `var a = 2;`는 `var a;`와 `a = 2;`두개로 나누어 처리된다. 따라서 첫번 째 코드는 다음과 같이 처리된다.

```javascript
var a;
a = 2;
console.log(a);
```

두번 째 코드는 다음과 같이 처리된다.

```javascript
var a;
console.log(a);
a = 2;
```

이처럼 변수와 함수의 선언문은 끌어올려진다. 이러한 동작을 '호이스팅(Hoisting)'이라고 한다. 선언문이 대입문 보다 먼저가 된다.

또한 호이스팅은 스코프별로 작동한다. 그리고 함수 선언문은 호이스팅 되지만 함수 표현식은 다르다.

```javascript
foo(); // TypeError
bar(); // ReferenceError

var foo = funciton bar() {
  //...
};
```

위 코드에서 `foo`는 `undefined`로 선언되고 `foo()`를 실행하려 했기 때문에 `TypeError`를 발생시킨다. 또한 함수 표현식이 이름을 가지고 있어도 확인자는 스코프에서 찾을 수 없다. 위 코드는 다음과 같이 해석된다.

```javascript
var foo;

foo(); // TypeError
bar(); // ReferenceError

foo = function() {
  var bar = ...self...;
  // ...
}
```

## 3. 함수가 먼저다
&nbsp;호이스팅에서는 함수가 끌어올려지고 다음으로 변수가 올려진다.

```javascript
foo(); // 1
var foo;

function foo() {
  console.log(1);
}

foo = function() {
  console.log(2);
};
```

위 코드는 다음과 같이 해석된다.

```javascript
function foo() {
  console.log(1);
}

foo(); // 1

foo = function() {
  console.log(2);
}
```

위 코드에서 `var foo`가 중복이기 때문에 무시된다. 그리고 함수 선언문이 일반 변수보다 먼저 실행된다. 또한 블록 내 함수 선언은 지양하는 것이 가장 좋다.

## 4. 정리하기
&nbsp;`var a = 2;`는 `var a;`와 `a = 2;` 두 개의 구문으로 해석된다. 전자의 구문은 컴파일 단계에서 처리하고 후자의 구문은 실행 단계에서 처리된다. 컴파일 단계에서 호이스팅이 발생하며 선언문을 스코프 꼭대기로 올려서 먼저 처리하게 된다. 하지만 대입문은 끌어올려 지지 않는다. 그리고 중복 선언은 조심해야 한다.