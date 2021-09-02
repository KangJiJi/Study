# Decorator(장식자)

## 의도

&nbsp;객체에 동적으로 새로운 책임을 추가할 수 있게 합니다. 기능을 추가하려면, 서브클래스를 생성하는 것보다 융통성 있는 방법을 제공합니다.

## 동기

&nbsp;가끔 개별적인 객체에 새로운 책임을 추가할 필요가 있다. 이때 일반적으로 상속을 이용한다. 하지만 복잡성이 증가한다. 따라서 장식자를 감싸서 책임을 추가하는 것이다. 또한 장식자의 중첩이 가능하며 책임을 무한정으로 추가할 수 있다.

## 활용성

- 동적으로 다른 객체에 영향을 주지 않고 새로운 책임을 추가할 때
- 제거될 수 있을 책임에 대해
- 상속으로 기능 확장을 하는 방법이 실질적이지 못할 때

## 참여자

- Component
- Concrete
- Decorator
- ConcreteDecorator

## 협력 방법

&nbsp;`Decorator`는 자신의 `Component` 객체 쪽으로 요청을 전달한다.

## 결과

- 단순한 상속보다 설계의 융통성을 더 많이 증대시킬 수 있습니다.
- 클래스 계통의 상부측 클래스에 많은 기능이 누적되는 상황을 피할 수 있습니다.
- 장식자와 해당 그 장식자의 구성요소가 동일한 것은 아닙니다.
- 장식자를 상용함으로써 작은 규모의 객체들이 많이 생깁니다.

## 구현

- 인터페이스 일치시키기
- 추상 클래스로 정의되는 Decorator 클래스 생략하기
- Component 클래스는 가벼운 무게를 유지하기
- 객체의 겉포장을 변경할 것인가, 속을 변경할 것인가

## 예제 코드

&nbsp;인터페이스 예시를 살펴본다.

```javascript
class VisualComponent {
  draw() {}
  resize() {}
}
```

위와 같은 기본 컴포넌트가 있다고 가정한다. 그리고 `Decorator`를 정의한다.

```javascript
class Decorator extends VisualComponent {
  constructor(visualComponent) {
    this._component = visualComponent;
  }

  draw() {
    this._component.draw();
  }

  resize() {
    this._component.resize();
  }
}
```

이 `Decorator`를 상속받은 `ConcreteDecorator`를 구현한다.

```javascript
class BorderDecorator extends Decorator {
  constructor(visualComponent, borderWidth) {
    super(visualComponent);
    this._borderWidth = borderWidth;
  }

  draw() {
    drawBorder(this._borderWidth);
  }
}
```

`BorderDecorator`객체를 원래 객체와 함께 생성함으로써 책임을 추가할 수 있다.

## 관련 패턴

&nbsp;장식자는 어쩌면 일종의 적응자 패턴이다. 적응자는 인터페이스를 변경시키지만, 장식자는 객체의 책임과 행동을 변경한다. 또한 전략 패턴과 복합체 패턴과도 관련있다.
