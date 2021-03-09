# Appendix B 스코프와 렉시컬 this

&nbsp;동적 스코프는 자바스크립트의 `this`와 가까운 친척 관계에 있다.

## 부록 B.1 동적 스코프

&nbsp;렉시컬 스코프는 변수를 찾는 검색 방식과 위치에 대한 규칙이다. `eval()`이나 `with`를 사용하지 않으면 코드를 작성할 때 렉시컬 스코프가 결정된다. 동적 스코프는 함수가 어디서 호출됐는지와 연관된다.

```javascript
function foo() {
  console.log(a); // 2
}

function bar() {
  var a = 3;
  foo();
}

var a = 2;
bar();
```

`foo()`는 렉시컬 스코프를 이용해 글로벌 변수 a(2)에서 가져온다. 만약 자바스크립트가 동적 스코프를 사용한다면 결과 값은 3이 나왔을 것이다. 자바스크립트는 동적 스코프를 사용하지 않지만 `this`메커니즘은 동적 스코프와 비슷한 면이 있다.

- 렉시컬 스코프는 작성할 때, 동적 스코프(그리고 this)는 런타임에 결정된다.
- 렉시컬 스코프는 어디서 함수가 선언됐는지와 관련 있지만, 동적 스코프는 어디서 함수가 호출됐는지와 관련있다.

## 부록 B.2 폴리필링 블록 스코프

&nbsp;ES6부터 `let`을 지원하면서 자바스크립트도 블록 스코핑을 지원하게 됐다. 하지만 ES6이전 환경에서 블록 스코프를 사용하고 싶다면 다음과 같이 만들 수 있다.

```javascript
try {
  throw 2;
} catch (a) {
  console.log(a); // 2
}
console.log(a); // ReferenceError
```

### 트레이서

&nbsp;트레이서라는 프로젝트에서 ES6 특성을 이전 환경에서 이용하게 해준다. 현재는 바벨이라는 트렌스컴파일러가 사용된다.

### 암시적 블록 vs 명시적 블록

&nbsp;명시적 블록을 생성하면 블록 스코프를 잘 활용할 수 있다.

```javascript
/*let*/ {
  let a = 2;
  console.log(a);
}

console.log(a); // ReferenceError
```

### 성능

&nbsp;`try/catch`는 `IIEF`보다 느리고 둘 모두 1:1로 비교할 수 없는 대상이다.

## 부록 B.3 렉시컬 this

&nbsp;ES6는 '화살표 함수'라는 함수 선언문 문법을 추가했다. 다음은 문제가 있는 코드다.

```javascript
var obj = {
  id: "awesome",
  cool: function coolFn() {
    console.log(this.id);
  },
};

var id = "not awesome";
obj.cool(); // awesome
setTimeout(obj.cool, 100); // not awesome
```

위 코드는 `this`를 변수로 저장함으로써 해결할 수 있다. 하지만 화살표 함수를 사용하면 더 짧게 해결할 수 있다.

```javascript
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(() => {
        this.count++;
        console.log("awesome?");
      }, 100);
    }
  },
};

obj.cool(); // awesome?
```

화살표 함수는 자신 가까이의 둘러싼 렉시컬 스코프에서 `this`값을 받아온다. 하지만 `this`스타일 코딩 패러다임을 고집하지 않고 `this`메커니즘을 정확하게 받아들여 사용하면 다음과 같이 문제를 해결할 수 있다.

```javascript
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(
        function timer() {
          this.count++;
          console.log("more awesome");
        }.bind(this),
        100
      );
    }
  },
};

obj.cool();
```
