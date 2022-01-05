# CHAPTER 6 작동 위임

&nbsp;[[Prototype]] 체계를 어떻게 사고하고 이해해야 하는지 알아본다.

## 1. 위임 지향 디자인으로 가는 길

&nbsp;[[Prototype]]은 클래스와 근본적으로 다른 디자인 패턴이다.

### 클래스 이론

&nbsp;클래스 기반 디자인 설계 과정은 대략 다음과 같다.

- 부모 클래스에 공통 작동을 정의
- 상속 받은 자식 클래스에 특화된 작동을 추가 정의

이때 상속을 최대한 활용해서 오버라이딩을 권장하고 원본 메서드는 `super`키워드로 접근 가능하다. 이런 과정을 의사 코드로 표현하면 다음과 같다.

```javascript
class Task {
  id;
  Task(ID) {
    id = ID;
  }
  outputTask() {
    output(id);
  }
}

class XYZ inherits Task {
  label;
  XYZ(ID, Label) {
    super(ID);
    label = Label;
  }
  outputTask() {
    super();
    output(label);
  }
}

class ABC inherits Task {
  // ...
}
```

`XYZ`를 인스턴스화하고 동작을 실행하면 실행한 동작은 인스턴스에 복사된 상태이므로 클래스가 아닌 인스턴스와 상호 작용한 것이 된다.

### 위임 이론

&nbsp;위 문제를 작동 위임을 이용해서 생각한다. `Task`객체를 정의하고 `XYZ`, `ABC`객체에서 고유한 데이터와 작동을 정의한다. 그리고 `Task`객체에 연결해 작동을 위임한다. 의사 코드는 다음과 같다.

```javascript
Task = {
  setID: function (ID) {
    this.id = ID;
  },
  outputID: function () {
    console.log(this.id);
  },
};

XYZ = Object.create(Task);
XYZ.prepareTask = function (ID, Label) {
  this.setID(ID);
  this.label = Label;
};
XYZ.outputTaskDetails = function () {
  this.outputID();
  console.log(this.label);
};

ABC = Object.create(Task);
// ...
```

`XYZ`는 `Object.create()`로 `Task`에 [[Prototype]]을 위임했다. 이런 디자인 패턴을 OLOO(Objects Linked to Other Objects)라고 한다. OLOO 디자인의 특징은 다음과 같다.

- 위임 시 상탯값은 위임하는 쪽(`XYZ`, `ABC`)에 두고 위임받는 쪽(`Task`)에 두지 않는다.
- 프로토타입 체이닝에서 명칭이 뒤섞이는 일(프로토타입 가려짐)은 될 수 있으면 피해야 한다. 따라서 서술적인 명칭이 좋다.
- `XYZ`가 `Task`에 작동을 위임해서 `Task`의 메서드는 `XYZ`가 얼마든지 이용할 수 있다.

'작동 위임'이란 찾으려는 프로퍼티/메서드 레퍼런스가 현재 객체에 없으면 다른 객체로 수색 작업을 위임하는 것을 의미한다.

#### 상호 위임(허용되지 않음)

&nbsp;양방향의 상호 위임은 허용되지 않는다.

#### 디버깅

&nbsp;다음은 크롬에서 실행한 코드다.

```javascript
function Foo() {}
var a1 = new Foo();
a1; // Foo {}
```

`a1`표현식을 `Foo {}`로 평가한다. 이는 "{}는 Foo라고 명명된 함수가 생성한 빈 객체"라는 뜻이다.

### 멘탈 모델 비교

&nbsp;코드를 보고 추론할 때 근거하는 멘탈 모델에 '클래스'와 '위임'이 어떤 의미를 가지는지 살펴본다. 다음은 고전적인 OO 스타일 코드다.

```javascript
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function () {
  return "I am " + this.me;
};

function Bar(who) {
  Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function () {
  alert("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak();
b2.speak();
```

다음은 정확히 같은 기능을 OLOO 스타일 코드로 구현한 것이다.

```javascript
Foo = {
  init: function (who) {
    this.me = who;
  },
  identify: function () {
    return "I am " + this.me;
  },
};

Bar = Object.create(Foo);
Bar.speak = function () {
  alert("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init("b2");

b1.speak();
b2.speak();
```

`b1`, `Bar`, `Foo` 세 객체는 단단히 연결돼 있다. 그리고 클래스처럼 보이게 하려고 다른 장치를 쓰지 않고 그냥 연결해 주기만 했기 때문에 단순해졌다.

## 2. 클래스 VS 객체

### 위젯 클래스

&nbsp;UI 위젯을 생성하는 예를 들어본다. 다음은 클래스 디자인을 구현한 코드다.

```javascript
// 부모 클래스
function Widget(width, height) {
  this.width = width || 50;
  this.height = height || 50;
  this.$elem = null;
}
Widget.prototype.render = function ($where) {
  if (this.$elem) {
    this.$elem
      .css({ width: ths.width + "px", height: this.height + "px" })
      .appendTo($where);
  }
};

// 자식 클래스
function Button(width, height, label) {
  Widget.call(this, width, height);
  this.label = label || "Default";
  this.$elem = $("<button>").text(this.label);
}

// 'Button'은 'Widget'으로부터 상속받는다.
Button.prototype = Object.create(Widget.prototype);

// render() 오버라이드
Button.prototype.render = function ($where) {
  Widget.prototype.render.call(this.$where);
  this.$elem.click(this.onClick.bind(this));
};

Button.prototype.onClick = function (evt) {
  console.log(this.label + "버튼이 클릭됨!");
};

$(document).ready(function () {
  var $body = $(document.body);
  var btn1 = new Button(125, 30, "Hello");
  var btn2 = new Button(150, 40, "World");

  btn1.render($body);
  btn2.render($body);
});
```

명시적 의사다형성의 추한 단면을 볼 수 있는 코드다.

#### ES6 class 간편 구문

&nbsp;ES6의 classs 키워드로 간단하게 구현할 수 있다. 하지만 결국 [[Prototype]] 체계 위에서 실행되는 것이다.

### 위젯 객체의 위임

&nbsp;위 코드를 OLOO 스타일로 작성하면 다음과 같다.

```javascript
var Widget = {
  init: function (width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
  },
  insert: function ($where) {
    if (this.$elem) {
      this.$elem
        .css({ width: ths.width + "px", height: this.height + "px" })
        .appendTo($where);
    }
  },
};

var Button = Object.create(Widget);

Button.setup = function (width, height, label) {
  // 위임 호출
  this.init(width, height);
  this.label = label || "Default";
  this.$elem = $("<button>").text(this.label);
};

Button.build = function ($where) {
  // 위임 호출
  this.insert($where);
  this.$elem.click(this.onClick.bind(this));
};

Button.onClick = function (evt) {
  console.log(this.label + "버튼이 클릭됨!");
};

$(document).ready(function () {
  var $body = $(document.body);

  var btn1 = Object.create(Button);
  btn1.setup(125, 30, "Hello");
  var btn2 = Object.create(Button);
  btn2.setup(150, 40, "World");

  btn1.build($body);
  btn2.build($body);
});
```

OLOO의 관점에서는 부모도 자식도 없다. `Widget`은 유틸리티 창고 역할을 맡는다. `Button`은 그냥 객체일 뿐이다. 또한 클래스와 다르게 같은 이름의 메서드를 공유할 필요도 없다. 그리고 생성 및 초기화 과정이 분리돼 있어서 OLOO야말고 관심사 분리의 원칙을 더 잘 반영한 패턴이다.

## 3. 더 간단한 디자인

&nbsp;작동 위임 패턴은 더 간단한 코드 아키텍처를 가능케 한다. 로그인 페이지 예시를 본다. 입력 폼을 처리하는 객체와 서버와 직접 통신하는 객체 이렇게 두 컨트롤러 객체를 구현한다.

전형적인 클래스 디자인 패턴에서는 `Controller`클래스에 기본적인 기능을 담고 이를 상속받은 `LoginController`와 `AuthController`두 클래스가 구체적 작동 로직을 구현한다.

```javascript
function Controller() {
  // ...
}
Controller.prototype.showDialog = function () {};
Controller.prototype.success = function (msg) {};
Controller.prototype.failure = function (err) {};

function LoginController() {
  Controller.call(this);
}
// 자식 클래스를 부모 클래스에 연결
LoginController.prototype = Object.create(Controller.prototype);
LoginController.prototype.getUser = function () {};
LoginController.prototype.getPassword = function () {};
LoginController.prototype.validateEntry = function () {};
// failure() 오버라이딩
LoginController.prototype.failure = function (err) {};

function AuthController(login) {
  Controller.call(this);
  this.login = login;
}
// 자식 클래스를 부모 클래스에 연결
AuthController.prototype = Object.create(Controller.prototype);
AuthController.prototype.server = function (url, data) {};
AuthController.prototype.checkAuth = function () {};
// success(), failure() 오버라이딩
AuthController.prototype.success = function () {};
AuthController.prototype.failure = function (err) {};

var auth = new AuthContoller();
auth.checkAuth(new LoginController());
```

위 코드에서 `showDialog`, `success`, `failure`는 모든 컨트롤러가 공유하는 메서드다. `AuthController`가 로그인 폼과 연동하기 위해서 `LoginController`를 멤버 프로퍼티로 들고 있다.

### 탈클래스화

&nbsp;위 코드를 OLOO 디자인 패턴을 활용해 간단한 형태로 디자인한다.

```javascript
var LoginController = {
  errors: [],
  getUser: function () {},
  getPassword: function () {},
  validateEntry: function (user, pw) {},
  showDialog: function (title, msg) {},
  failure: function (err) {},
};

var AuthController = Object.create(LoginController);
AuthController.errors = [];
AuthController.checkAuth = function () {};
AuthController.server = function (url, data) {};
AuthController.accepted = function () {};
AuthController.rejected = function (err) {};
```

`AuthController`는 생성자 함수가 아니므로 인스턴스화할 필요가 없다. 객체를 추가로 생성해야 할 경우는 다음과 같이 하면 된다.

```javascript
var controller1 = Object.create(AuthController);
var controller2 = Object.create(AuthController);
```

작동 위임 패턴에서 `LoginController`와 `AuthController`는 수평적으로 서로를 엿보는 객체일 뿐이다. 또한 반대 방향으로 위임을 설정해도 전혀 문제가 없다. 그리고 똑같은 메서드 이름을 포함하지 않아도 된다.

## 4. 더 멋진 구문

&nbsp;ES6부터는 객체 리터럴에 단축 메서드 선언이 가능하다. 또한 위임도 `Object.setPrototypeOf()`간단하게 가능하다.

```javascript
var LoginController = {
  errors: [],
  getUser() {},
  getPassword() {},
};

Object.setPrototypeOf(AuthController, LoginController);
```

### 비어휘적 식별자

&nbsp;이런 단축 메서드 선언은 단점이 있다. 앞에서 배운 함수 이름에 식별자가 없는 경우 단점은 세 가지가 있다.

- 스택 추적을 통해 디버깅 하기가 곤란해진다.
- 재귀, 이벤트 바인딩 등에서 자기 참조가 어려워진다.
- 코드 가독성이 더 나빠진다.

단축 메서드 선언은 두 번째 단점을 가지고 있다. 자기 참조에 사용할 수 있는 어휘적 식별자는 없다.

## 5. 인트로스펙션

&nbsp;객체 유형을 거꾸로 유추하는 타입 인트로스펙션(Type introspection)은 객체의 구조와 기능을 추론하는 용도로 쓰인다. `instanceof`는 인스턴스와 클래스의 프로토타입의 관계([[Prototype]])을 알려주는 일을 한다. '덕 타이핑'을 통해 `instanceof`를 대체하는 경우도 있다.

```javascript
if (a1.something) {
  a1.something();
}
```

하지만 다른 기능까지 확장하여 추정하는 경향이 있어 리스크가 더해진다.

OLOO스타일 코드의 타입 인트로스펙션은 깔끔하다.

```javascript
var Foo = {};
var Bar = Object.create(Foo);

var b1 = Object.create(Bar);

Foo.isPrototytpeOf(Bar); // true
Object.getPrototytpeOf(Bar) === Foo; // true

Foo.isPrototytpeOf(b1); // true
Bar.isPrototytpeOf(b1); // true
Object.getPrototytpeOf(b1) === Bar; // true
```

## 6. 정리하기

- 클래스와 상속은 디자인 패턴의 하나다.
- 작동 위임이라는 디자인 패턴도 있다.
- 부모/자식 관계가 아닌 동등한 입장에서 서로 위임하는 형태다
- [[Prototype]]은 태생적으로 작동 위임 체계다.
- 객체만으로 구성된 코드를 구성한다면 코드 아키텍처또한 더 간단하게 가져갈 수 있다.
