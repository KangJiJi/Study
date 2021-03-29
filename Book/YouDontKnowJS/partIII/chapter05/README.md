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

&nbsp;Javascript는 클래스라는 추상화된 패턴이나 설계가 없다.

### 클래스 함수

&nbsp;클래스처럼 생긴 것을 만들어 쓰기 위해 여러 꼼수가 존재했다. 이 꼼수를 위해서 Prototype을 이용한다.

```javascript
function Foo() {
  // ...
}

var a = new Foo();

Object.getPrototypeOf(a) === Foo.prototype; // true
```

`a`가 생성될 때 `Foo.prototype`이 가리키는 객체를 `a`의 [[Prototype]]과 연결한다. 또한 `b`라는 인스턴스를 생성해도 `b`의 [[Prototype]]에 `Foo.prototype`이 가리키는 객체를 연결한다. 따라서 객체들은 서로 끈끈하게 연결된다. 이런 링크의 생성은 `new Foo()`의 부수 효과 중 하나일 뿐이다.

#### 이름에는 무엇이 들어 있을까?

&nbsp;[[Prototype]]체계를 프로토타입 상속이라고 한다. 상속은 복사를 수반하지만, Javascript에서 복사는 일어나지 않는다. 대신 링크를 걸어서 접근할 수 있게 위임한다.

### 생성자

&nbsp;`Foo`는 클래스가 아니다.

```javascript
function Foo() {
  // ...
}

Foo.prototype.constructor === Foo; // true

var a = new Foo();
a.constructor === Foo; // true
```

`Foo.prototype`객체는 열거 불가능한 `.constructor`프로퍼티를 가지고있다. 이는 객체 생성과 관련된 함수를 다시 참조한다. `a`의 `.constructor`또한 '자신을 생성한 함수'를 가리킨다.

#### 생성자냐 호출이냐?

&nbsp;위 코드에서 `Foo`는 생성자가 아닌 함수일 뿐이다. `new`키워드를 붙여서 호출하는 순간 '생성자 호출'을 하는 것이다. 즉, `new`키워드는 일반 함수 호출을 가로채어 객체 생성이라는 잔업을 더 부과한다. `new`키워드의 부수 효과로 생성된 객체를 할당한다. 이를 '생성자 호출'이라고 한다.

### 체계

&nbsp;
