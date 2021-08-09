# Abstract Factory(추상 팩토리)

## 의도

&nbsp;상세화된 서브클래스를 정의하지 않고도 서로 관련성이 있거나 독립적인 여러 객체의 군을 생성하기 위한 인터페이스를 제공합니다.

## 동기

&nbsp;서로 다른 룩앤필(체험, 겉모양, 인터페이스 등등) 표준에 상관없이 프로그램을 확장 혹은 이식할 수 있어야 한다. 사용자가 팩토리에게만 메시지를 보내고 내부 적으로는 어떤 객체에게 메시지를 보내는지 알 필요가 없도록 구현하면 룩앤필과 분리될 수 있다.

## 활용성

- 객체가 생성되거나 구성, 표현되는 방식과 무관하게 시스템을 독립적으로 만들고자 할 때.
- 여러 제품군 중 하나를 선택해서 시스템을 설정해야 하고 한번 구성한 제품을 다른 것으로 대체할 수 있을 때.
- 관련된 제품 객체들이 함께 사용되도록 설계되었고, 이 부분에 대한 제약이 외부에도 지켜지도록 하고 싶을 때.
- 제품에 대한 클래스 라이브러리를 제공하고, 그들의 구현이 아닌 인터페이스를 노출시키고 싶을 때.

## 참여자

- AbstractFactory
- ConcreteFactory
- AbstractProduct
- ConcreteProduct
- Client

## 협력 방법

- ConcreteFactory는 특정 구현을 가지는 제품 객체를 생성하고, 다른 제품 객체를 생성하려면 사용자는 다른 ConcreteFactory를 사용해야 한다.
- AbstractFactory는 필요한 제품 객체를 생성하는 책임을 ConcreteFactory에 위임한다.

## 결과

- 구체적인 클래스를 분리한다.
- 제품군을 쉽게 대체할 수 있도록 한다.
- 제품 사이의 일관성을 증진시킨다.
- 새로운 종류의 제품을 제공하기 어렵다.

## 구현

&nbsp;다음은 추상 팩토리 패턴을 구현하는 여러가지 기법이다.

- ConcreteFactory를 싱글톤을 이용해서 정의한다.
- 제품을 생성한다.
- 확장 가능한 팩토리들을 정의한다.

## 예제 코드

&nbsp;미로 생성 문제에 추상 팩토리 패턴을 적용해 본다.

다음은 기본적인 미로 팩토리다.

```javascript
class MazeFactory {
  constructor() {}

  makeMaze() {
    return new Maze();
  }
  makeWall() {
    return new Wall();
  }
  makeRoom(n) {
    return new Room(n);
  }
  makeDoor(r1, r2) {
    return new Door(r1, r2);
  }
}
```

다음은 `mazeFactory`를 매개변수로 받아 언제든지 모양은 같지만 다른 성질을 가진 미로를 만들 수 있는 추상 팩토리다.

```javascript
const mazeGame = (mazeFactory) => {
  const aMaze = mazeFactory.makeMaze();
  const room1 = mazeFactory.makeRoom();
  const room2 = mazeFactory.makeRoom();
  const aDoor = mazeFactory.makeDoor(room1, room2);

  aMaze.addRoom(room1);
  aMaze.addRoom(room2);

  room1.setSide(North, mazeFactory.makeWall());
  room1.setSide(East, aDoor);
  room1.setSide(South, mazeFactory.makeWall());
  room1.setSide(West, mazeFactory.makeWall());

  room2.setSide(North, mazeFactory.makeWall());
  room2.setSide(East, mazeFactory.makeWall());
  room2.setSide(South, mazeFactory.makeWall());
  room2.setSide(West, aDoor);

  return aMaze;
};
```

이런 기본적인 구조에서 새로운 `EnchantedMazeFactory`를 `MazeFactory`를 상속 받아 오버라이딩으로 구현하면 원래 코드의 수정 없이 새로운 성질의 미로를 만들 수 있다.

```javascript
class EnchantedMazeFactory extends MazeFactory {
  constructor() {
    super();
  }

  makeRoom(n) {
    return new EnchantedRoom(n);
  }
  makeDoor(r1, r2) {
    return new DoorNeedingSpell(r1, r2);
  }
}
```

혹은 폭탄이 설치된 미로를 만들고 싶으면 새로운 팩토리를 만들면 된다.

```javascript
class BombedmazeFactory extends MazeFactory {
  constructor() {
    super();
  }

  makeWall() {
    return new BombedWall();
  }
  makeRoom(n) {
    return new RoomWithABomb(n);
  }
}
```

## 관련 패턴

&nbsp;AbstractFactory 클래스는 팩토리 메서드 패턴을 이용해서 구현되며, 원형 패턴을 이용하기도 한다. ConcreteFactory는 싱글톤으로 구현하는 경우가 많다.
