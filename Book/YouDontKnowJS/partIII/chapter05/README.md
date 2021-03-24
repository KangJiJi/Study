# CHAPTER 5 프로토타입

&nbsp;프로토타이 채이닝에 대해서 알아본다.

## 1. [[Prototype]]

&nbsp;명세에 따르면 JS 객체는 [[Prototype]](Chrome에서는 \_\_proto\_\_)이라는 내부 프로퍼티가 있고 다른 객체를 참조하는 단순 레퍼런스로 사용한다.

```javascript
var anotherObject = {
  a: 2,
};

var myObject = Object.create(anotherObject);

myObject.a; // 2
```

위 코드에서 `myObject`에는 `a`프로퍼티가 존재하지 않는다. 따라서 [[Get]]의 결과값은 `myObject.[[Prototype]]`의 `a`프로퍼티를 반환한다. 또한 `for...in` 반복문에서도 [[Prototype]]에 연결 돼 있는 모든 프로퍼티를 열거한다.

### Object.prototype

&nbsp;[[Prototype]]의 연쇄는 `Object.prototype`에서 끝난다.

### 프로퍼티 세팅과 가려짐

&nbsp;`foo` 프로퍼티가 `myObject` 객체와 이 객체를 기점으로 한 [[Prototype]] 연쇄의 상위 여러 곳에서 발견될 때 가려짐이라 한다.

```javascript
myObject.foo = "bar";
```

만약 `myObject`에 `foo`가 없고 [[Prototype]] 연쇄 상위 수준에 `foo`가 있을 때 `myObject.foo = "bar"`할당문은 다음 세 가지 경우의 수를 따른다.

- [[Prototype]] 연쇄 상위 수준에 `foo`가 읽기 전용이 아닐 경우 `myObject`에 `foo`가 추가된다.
- [[Prototype]] 연쇄 상위 수준에 `foo`가 읽기 전용이면 가려짐이 발생하는 상황은 나타나지 않는다.
- [[Prototype]] 연쇄 상위 수준에 `foo`가 세터일 경우 이 세터가 호출된다.

다음 코드를 보자.

```javascript
var anotherObject = {
  a: 2,
};

var myObject = Object.create(anotherObject);

anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("a"); // false

myObject.a++; // 암시적 가려짐 발생

anotherObject.a; // 2
myObject.a; // 3

myObject.hasOwnProperty("a"); // true
```

`myObject.a++`는 `myObject.a = myObject.a + 1`이 된다. 그래서 [[Prototype]]을 통해서 [[Get]]을 찾고 `anotherObject.a`에서 현재 값 2를 얻어서 1을 더한 후, 결과를 [[Put]]으로 `myObject`에 프로퍼티 `a`를 생성한 뒤 할당한다.

## 2. 클래스
