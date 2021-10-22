# Observer(감시자)

## 의도

&nbsp;객체 사이에 일 대 다의 의존 관계를 정의해 두어, 어떤 객체의 상태가 변할 때 그 객체에 의존성을 가진 다른 객체들이 그 변화를 통지받고 자동으로 갱신될 수 있게 만듭니다.

## 동기

&nbsp;어떤 하나의 시스템을 서로 연동되는 클래스 집합으로 분할했을 때 각 객체 간의 일관성을 유지할 수 있어야 한다. 그렇다고 객체간의 결합도를 높이고 싶지는 않다. 따라서 감시자 패턴을 이용한다. 감시자는 주체의 상태 변화가 있을 때마다 이 변화를 통보받는다. 또한 각 감시자는 주체의 상태와 자신의 상태를 동기화시키기 위해 주체의 상태를 알아본다.

## 활용성

- 어떤 추상 개념이 두 가지 양상을 갖고 하나가 다른 하나에 종속적일 때
- 한 객체에 가해진 변경으로 다른 객체를 변경해야 하고, 프로그래머들은 얼마나 많은 객체들이 변경되어야 하는지 몰라도 될 때
- 어떤 객체가 다른 객체에 자신의 변화를 통보할 수 있는데, 그 변화에 관심있어 하는 객체들이 누구인지에 대한 가정 없이도 그러한 통보가 될 때

## 참여자

- Subject
- Observer
- ConcreteSubject
- ConcreteObserver

## 협력 방법

&nbsp;`ConcreteSubject`는 `Observer`의 상태와 자신의 상태가 달라지는 변경이 발생할 때마다 감시자에게 통보한다. 또한 `ConcreteSubject`에서 변경이 통보된 후, `ConcreteObserver`는 필요한 정보를 주체에게 질의하여 얻어온다.

## 결과

- `Subject`와 `Observer`클래스 간에는 추상적인 결합도만이 존재한다.
- 브로드캐스트 방식의 교류를 가능하게 한다.
- 예측하지 못한 정보를 갱신한다.
- 불필요한 갱신이 일어날 수도 있다.

## 구현

- 주체와 그것의 감시자를 대응시킨다.
- 하나 이상의 주체를 감시한다.
- 누가 갱신을 촉발 시킬 것인가?
- 삭제한 주체에 대한 무효 참조자를 계속 유지할 때가 있다.
- 통보 전에 주체의 상태가 자체 일관성을 갖추도록 만들어야 한다.
- 감시자별 갱신 프로토콜을 피한다(푸시 모델 & 풀 모델).
- 자신이 관심 있는 변경이 무엇인지 명확하게 지정한다.
- 복잡한 갱신의 의미 구조를 캡슐화한다.
- Subject와 Observer 클래스를 합친다.

## 예제 코드

&nbsp;`Observer`와 `Subject`인터페이스는 다음과 같다.

```javascript
class Observer {
  update() {}
}
```

```javascript
class Subject {
  constructor() {
    this._observers = [];
  }

  attach(observer) {}
  detach(observer) {}
  notify() {
    this._observers.forEach((ob) => ob.update());
  }
}
```

`ClockTimer`클래스는 일정을 기억하고 관리하는 클래스로, 매초마다 감시자에게 시간 변경을 알려주어야 한다.

```javascript
class ClockTimer extends Subject {
  getHour() {}
  getMinute() {}
  getSecond() {}
  tick() {
    this.notify();
  }
}
```

`DigitalClock`과 `AnalogClock`은 `notify`된 정보를 받아서 업데이트한다.

```javascript
class DigitalClock extends Observer {
  constructor(sub) {
    sub.attach(this);
  }
  update() {}
  draw() {}
}
```

```javascript
class AnalogClock extends Observer {
  constructor(sub) {
    sub.attach(this);
  }
  update() {}
  draw() {}
}
```

선언은 다음과 같이 한다.

```javascript
const timer = new ClockTimer();
const analogClock = new AnalogClock(timer);
const digitalClock = new DigitalClock(timer);
```

## 관련 패턴

&nbsp;`ChangeManaer`객체는 주체와 감시자 사이의 중재자 역할을 한다. 또한 단일체 패턴을 적용하는 것이 좋다.
