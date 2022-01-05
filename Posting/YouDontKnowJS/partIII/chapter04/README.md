# CHAPTER 4 클래스와 객체의 혼합

&nbsp;클래스와 OOP에 대해서 알아본다.

## 1. 클래스 이론

&nbsp;OOP에는 데이터와 작동을 잘 감싸는(캡슐화) 것이 올바른 설계라고 강조한다. 단어의 나열을 `String` 객체로 작동과 함께 묶여진 것도 하나의 예시다. 또한 클래스는 특정 자료 구조를 분류하는 용도로 사용한다. 그리고 다형성은 부모 클래스에 정의된 작동을 자식 클래스에서 오버라이드하는 것을 의미한다. 이런 다형성의 결과가 재정의 된 작동에서 기반 작동을 참조할 수 있는 것이다.

### 클래스 디자인 패턴

&nbsp;클래스 역시 디자인 패턴의 일종이다.

### 자바스크립트 클래스

&nbsp;자바스크립트에는 클래스가 없다. 프로토타입으로 클래스 기능과 비슷하게 구현하는 것 뿐이다. 내부에서는 다른 클래스 기반 언어와 전혀 다른 방식으로 동작한다.

## 2. 클래스 체계

&nbsp;Stack 클래스가 있다. 하지만 Stack 클래스에서 어떤 작업을 직접 수행하는 것이 아니다. 그저 Stack 이라면 마땅히 해야 할 기능을 추상화한 것이다. Stack을 인스턴스화 해야지 구체적인 자료 구조가 마련된다.

### 건축

&nbsp;클래스와 인스턴스를 이해하기 위해 건축을 예시로 든다. 클래스가 청사진에 해당한다. 건물을 짓는 과정은 인스턴스화고 완공된 건물은 청사진의 인스턴스다. 따라서 객체는 클래스에 기술된 모든 특성을 그대로 가진 사본이다. 잘 설계된 객체라면 클래스를 보고 어떤 동작을 하는지 알 수 있어야 한다.

### 생성자

&nbsp;생성자의 임무는 인스턴스에 필요한 정보를 초기화하는 것이다. `new`키워드는 생성자를 호출하고 생성자는 인스턴스를 반환한다.

## 3. 클래스 상속

&nbsp;클래스 지향 언어에서는 상속을 받을 수 있는데, 이를 부모/자식으로 나눈다. 자식은 부모의 작동을 오버라이드할 수 있다. 하지만 인스턴스화 하기 전까지는 추상적인 개념일 뿐이다.

### 다형성

&nbsp;자식은 부모로부터 상속 받은 메서드를 오버라이드(재정의)한다. 하지만 자식에서의 메서드 호출은 오버라이드하기 전의 원본을 참조한다. 이런 기법을 다형성 혹은 가상 다형성이라고 한다. 한 메서드가 상위 수준의 상속 체계에서 다른 메서드를 참조할 수 있게 해주는 것이다.

> 원본 함수가 호출되면 오버라이드된(참조돼 있는) 함수가 호출된다.

자식 클래스는 부모 클래스를 가리키는 레퍼런스를 가지는데, 보통 super라고 불린다.

### 다중 상속

&nbsp;일부 클래스 지향 언어에서는 다중 상속이 가능하다. 이는 부모 클래스 각각의 정의가 자식에게 복사된다는 것을 의미한다. 하지만 JS는 다중 상속은 지원하지 않는다.

## 4. 믹스인

&nbsp;JS의 객체는 상속받거나 인스턴스화해도 자동으로 복사작업이 일어나지 않는다. 즉, 클래스란 개념 자체가 없고 오직 객체만 있다. 그리고 객체는 복사되는 게 아니라 서로 연결된다. 믹스인은 JS에서 누락된 클래스 복사 기능을 흉내 낸 것이다.

### 명시적 믹스인

&nbsp;Vehicle/Car 예시를 본다. Car는 Vehicle을 상속 받는데 복사하지 않기 때문에 수동으로 복사하는 함수를 만든다.

```javascript
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key];
    }
  }
  return targetObj;
}

var Vehicle = {
  engines: 1,
  ignition: function () {
    console.log("엔진을 켠다");
  },
  drive: function () {
    this.ignition();
    console.log("부릉부릉");
  },
};

var Car = mixin(Vehicle, {
  wheels: 4,
  drive: function () {
    Vehicle.drive.call(this);
    console.log(this.wheels + "개의 바퀴로 부릉부릉");
  },
});
```

위 코드는 실제 복사된 것이 아니라 원본 함수를 가리키는 레퍼런스만 복사된 것이다. 따라서 Car에는 Vehicle 객체의 `ignition` 메서드 레퍼런스와 `engines`, 자체적으로 선언한 `drive`와 `wheels`를 가진다.

#### 다형성의 재고

&nbsp;`Vehicle.drive.call(this)`와 같은 코드를 '명시적 의사다형성'이라고 한다. JS는 상대적 다형성을 제공하지 않아서 Vehicle과 Car의 메서드를 구별해서 호출하려면 절대적인 레퍼런스를 이용해야만 했다. 그래서 `Vehicle.drive.call(this)`와 같은 코드가 나왔다. 이런 '명시적 의사다형성'은 단점이 더 많기 때문에 쓰지 않는게 좋다.

#### 사본 혼합

&nbsp;복사 시 타깃 프로퍼티를 덮어쓰지 않게 조심해야한다. 사실 JS의 함수는 복사할 수 없고, 함수의 레퍼런스를 복사할 뿐이다. 그리고 '명시적 믹스인'은 다중 상속을 흉내 낼 수 있지만 대개 잃는 것이 더 많다.

#### 기생 상속

&nbsp;기생 상속(Parasitic Inheritance)는 명시적 믹스인 패턴의 변형이다.

```javascript
// 전통적 JS 클래스
function Vehicle() {
  this.engines = 1;
}

Vehicle.prototype.ignition = function () {
  console.log("엔진을 켠다");
};

Vehicle.prototype.drive = function () {
  this.ignition();
  console.log("방향을 맞추고 앞으로 간다!");
};

// 기생 클래스
function Car() {
  var car = new Vehicle();
  car.wheels = 4;

  // 내부 레퍼런스 저장
  var vehDrive = car.drive;

  // 오버라이드
  car.drive = function () {
    vehDrive.call(this);
    console.log(this.wheels + "개의 바퀴로 굴러간다!");
  };

  return car;
}

var myCar = new Car();
myCar.drive();
// 엔진을 켠다
// 방향을 맞추고 앞으로 간다!
// 4개의 바퀴로 굴러간다!
```

### 암시적 믹스인

&nbsp;사용할 때 주의해야 한다.

```javascript
var Something = {
  cool: function () {
    this.greeting = "Hello World";
    this.count = this.count ? this.count + 1 : 1;
  },
};

Something.cool();
Something.greeting; // Hello World
Something.count; // 1

var Another = {
  cool: function () {
    Something.cool.call(this);
  },
};

Another.cool();
Another.greeting; // Hello World
Another.count; // 1
```

`Something`의 작동을 `Another`와 섞은 셈이다. 쓰지 않는 편이 좋다.

## 5. 정리하기

- 클래스는 일종의 패턴이다.
- 클래스는 복사를 의미한다.
- 다형성은 복사 작업의 결과물이다.
- JS는 객체 간 사본을 자동으로 생성하지 않아서 믹스인 패턴을 사용한다.
- 명시적 믹스인은 클래스의 복사 기능과 다르며, 유지보수를 위해서 쓰지 않는 것이 좋다.
