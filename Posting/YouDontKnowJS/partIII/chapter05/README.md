# CHAPTER 5 프로토타입

&nbsp;프로토타입 채이닝에 대해서 알아본다.

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
myObject.foo = 'bar';
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

anotherObject.hasOwnProperty('a'); // true
myObject.hasOwnProperty('a'); // false

myObject.a++; // 암시적 가려짐 발생

anotherObject.a; // 2
myObject.a; // 3

myObject.hasOwnProperty('a'); // true
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

&nbsp;Javscript는 클래스 지향을 흉내 내기 위해 노력했다.

```javascript
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function () {
  return this.name;
};

var a = new Foo('a');
var b = new Foo('b');

a.myName(); // a
b.myName(); // b
```

위 코드에서 `this.name = name`은 데이터값을 캡슐화하는 모습처럼 보인다. 또한 `Foo.prototype`에 추가한 함수를 인스턴스에서 실행할 수 있다. 이때 `Foo.prototype`의 프로퍼티는 `a`와 `b`로 복사되지 않는다. 단지 [[Get]]의 알고리즘이 프로토타입 체이닝을 통해 `prototype`의 프로퍼티에 접근할 수 있는 것이다.

#### 돌아온 '생성자'

&nbsp;`a.constructor === Foo`의 결과는 true다. 이때 `.constructor`는 `Foo.prototype`에 위임된 레퍼런스로 `Foo`를 가리킨다.

```javascript
function Foo() {
  //...
}
Foo.prototype = {};

var a = new Foo();
a.constructor === Object; // true;
```

위 코드에서 '생성자'가 '~에 의해 생성됨'이 아니라는 것을 알 수 있다. `a`에는 `.constructor`가 없어서 프로토타입 체이닝을 통해서 상위로 올라가면서 검색하다가 `Object.prototype` 객체의 `.constructor`를 호출한다. 다음과 같이 `.constructor`를 손수 삽입이 가능하다.

```javascript
function Foo() {
  // ...
}
Foo.prototype = {};

Object.defineProperty(Foo.prototype, 'constructor', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: Foo,
});
```

생성자는 '생성됨'을 의미하지 않는다. 또한 `constructor`는 열거 불가하지만 쓰기가 가능하다. 결국 `constructor`는 신뢰할 수 없는 레퍼런스이므로 코드에 직접 사용하지 않는 것이 좋다.

## 3. 프로토타입 상속

&nbsp;상속이라 하면 보통 클래스와 인스턴스 간의 관계를 떠올리진 않는다. 다음은 위임 링크를 생성하는 전형적인 '프로토타입 스타일'코드다.

```javascript
function Foo(name) {
  this.name = name;
}

Foo.prototype.myname = function () {
  return this.name;
};

function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}

// Bar의 prototype을 Foo의 prototype에 연결한다.
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.myLabel = function () {
  return this.label;
};

var a = new Bar('a', 'obj a');

a.myName(); // a
a.myLabel(); // obj a
```

위 코드는 `Bar.prototype`을 `Foo.prototype`과 연결한다. 하지만 다음과 같은 방법은 부수 효과를 발생시킨다.

```javascript
Bar.prototype = Foo.prototype;
Bar.prototype = new Foo();
```

`Bar.prototype = Foo.prototype`는 링크된 새로운 객체가 생성되지 않는다. 또한 `Bar.prototype`할당문은 `Foo.prototype`에 영향을 끼친다.

`Bar.prototype = new Foo()`는 `Foo`의 생성자 호출을 한다. 그러면 여러 부수 효과까지 함께 일어난다.

그래서 ES6 이후에는 `Object.setPrototypeOf()`를 사용한다.

```javascript
// ES6 이전(기존 Bar.prototype를 없애버리고 새롭게 할당한다)
Bar.prototype = Object.create(Foo.prototype);
// ES6 이후(기존 Bar.prototype를 수정한다)
Object.setPrototypeOf(Bar.prototype, Foo.prototype);
```

### 클래스 관계 조사

&nbsp;`a`같은 객체가 어떤 객체로 위임할지 어떻게 알 수 있을까?

```javascript
function Foo() {
  // ...
}

Foo.prototype.blah = 'blahblah';
var a = new Foo();

a instanceof Foo; // true
```

`instanceof`는 `a`의 [[Prototype]]을 순회(프로토타입 체이닝)하면서 `Foo.prototype`을 가리키는 객체가 있는지 조사한다. 이는 계통만 살펴볼 수 있는 연산자다. 또한 [[Prototype]] 상속 계통을 확인할 수 있는 훌륭한 대안이 있다.

```javascript
Foo.prototype.isPrototypeOf(a); // true
```

`isPrototypeOf`는 `instanceof`와 똑같은 원리지만 `Foo.prototype`을 거치는 등 잡다한 과정이 생략된다.

ES5부터 `getPrototypeOf`를 통해서 [[Prototype]]을 곧바로 조회할 수 있다. 또한 `__proto__`(Dunder Proto)를 통해서 [[Prototype]]에 접근할 수 있게 됐다. 근데 `__proto__`는 게터/세터에 가깝다.

```javascript
Object.defineProperty(Object.prototype, '__proto__', {
  get: function () {
    return Object.getPrototypeOf(this);
  },
  set: function (o) {
    Object.setPrototypeOf(this, o);
    return o;
  },
});
```

되도록 [[Prototype]]은 변경하지 않는 편이 좋다.

## 4. 객체 링크

&nbsp;[[Prototype]]에 연결된 객체를 따라가면서 사용되는 일련의 링크를 '프로토타입 체인'이라고 한다.

### 링크 생성

&nbsp;왜 프로토타입 체인을 만들었을까? 먼저 `Object.create`의 설명을 한다.

```javascript
var foo = {
  something: function () {
    console.log('Show');
  },
};

var bar = Object.create(foo);

bar.something(); // Show
```

`Object.create`는 새로운 객체를 생성하고 `foo`와 연결한다.

#### Object.create() 폴리필

```javascript
if (!Object.create) {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}
```

### 링크는 대비책?

&nbsp;프로토타입 체인은 프로퍼티를 찾지 못할 경우를 위한 대비책이 아니다.

## 5. 정리하기

- [[Get]]은 프로토타입 체이닝을 통해서 프로퍼티를 탐색한다.
- 모든 객체의 최상위는 `Object.prototype`이다.
- 두 객체(클래스와 인스턴스)를 연결 짓는 가장 일반적인 방버은 `new`키워드 사용이다.
- `new`로 호출한 함수를 생성자라고 하지만 클래스 지향 언어의 생성자와는 다른 개념이다.
- Javascript 에서는 복사가 일어나지 않는다. 하지만 [[Prototype]] 연쇄를 통해 연결된다.
- Javascript 객체 간의 관계는 위임이 더 적절한 표현이다.
