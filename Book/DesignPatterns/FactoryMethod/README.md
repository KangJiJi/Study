Factory Method(팩토리 메서드)
============================

## 의도
&nbsp;객체를 생성하기 위해 인터페이스를 정의하지만, 어떤 클래스의 인스턴스를 생성할지에 대한 결정은 서브클래스가 내리도록 한다. 

## 동기
&nbsp;프레임워크가 클래스를 인스턴스로 만들어야 하지만, 추상 클래스는 인스턴스를 가질 수 없기 때문에 이러한 문제를 해결하기 위한 해법이 필요하다. 따라서 팩토리 메서드 패턴을 이용해서 서브 클래스 중 어떤 것을 생성해야 하는지에 대한 정보를 캡슐화하고, 프레임워크에서 떼어낸다.

## 활용성
* 어떤 클래스가 자신이 생성해야 하는 객체의 클래스를 예측할 수 없을 때
* 생성할 객체를 기술하는 책임을 자신의 서브클래스가 지정했으면 할 때
* 객체 생성의 책임을 몇 개의 보조 서브클래스 가운데 하나에게 위임하고, 어떤 서브클래스가 위임자인지에 대한 정보를 국소화시키고 싶을 때

## 참여자
* Product
* ConcreteProduct
* Creator
* ConcreteCreator

## 협력 방법
&nbsp; Creator는 서브클래스를 통해 실제 필요한 펙토리 메서드를 정의하여 적절한 ConcreteProduct의 인스턴스를 반환할 수 있게 한다.

## 결과
&nbsp;팩토리 메서드 패턴은 응용프로그램에 국한된 클래스가 코드에 종속되지 않게 해 준다. 또한 서브클래스에 대한 훅 메서드(오버라이딩이 강제적이지 않은 추상 메서드)를 제공한다. 그리고 병렬적인 클래스 계통을 연결하는 역할을 담당한다.

## 구현
&nbsp;팩토리 메서드 패턴은 구현 방법이 크게 두 가지로 나눠진다.

* Creator 클래스를 추상 클래스로 정의하고, 정의한 팩토리 메서드에 대한 구현은 제공하지 않는 경우
* Creator 가 구체 클래스고, 팩토리 메서드에 대한 기본 구현을 제공하는 경우

전자의 경우는 구현을 제공한 서브클래스에서 반드시 정의해야 하며, 후자는 유연성을 보장할 수 있다.

팩토리 메서드를 매개변수화 해서 어떤 종류의 제품을 생성할지 식별하게 만들 수 있다. 이런 경우 팩토리 메서드는 다음과 같은 형태를 가진다.

```javascript
const creator = productId => {
  if(productId === "MINE") return Mine;
  if(productId === "YOURS") return Yours;
  // ...
}
```

또한 팩토리 메서드 패턴은 언어마다 구현 방법이 조금 다를 수 있다. 가상 함수로 정의되어야 하거나 지연 초기화(Lazy Initialization) 기법을 사용해야 할 수 있다. 그리고 템플릿을 사용하여 서브클래싱을 피해 클래스 계통의 부피 확장 문제를 해결할 수 있다. 또한 명명 규칙을 따르는 것도 매우 중요하다.

## 예제 코드
&nbsp;`CreateMaze()` 함수는 미로를 반환하지만, 미로, 방, 문, 벽 클래스를 직접 코딩해야 한다. 이러한 문제를 해결하기 위해 팩토리 메서드 패턴을 이용해 서브클래스들이 요소들을 선택할 수 있도록 할 수 있다.

```javascript
const mazeGame = () => {
  // Creator
  const createMaze = () => {
    const aMaze = makeMaze();
    const room1 = makeRoom();
    const room2 = makeRoom();
    const aDoor = makeDoor(room1, room2);

    aMaze.addRoom(room1);
    aMaze.addRoom(room2);

    room1.setSide(North, makeWall());
    room1.setSide(East, aDoor);
    room1.setSide(South, makeWall());
    room1.setSide(West, makeWall());
    
    room2.setSide(North, makeWall());
    room2.setSide(East, makeWall());
    room2.setSide(South, makeWall());
    room2.setSide(West, aDoor);
    
    return aMaze;
  };

  // 팩토리 메서드들
  const makeMaze = () => maze();
  const makeRoom = (n) => room(n);
  const makeWall = () => wall();
  const makeDoor = (room1, room2) => door(room1, room2);
}
```

```javascript
class MazeGame {
  createMaze() {
    const aMaze = makeMaze();
    const room1 = makeRoom();
    const room2 = makeRoom();
    const aDoor = makeDoor(room1, room2);

    aMaze.addRoom(room1);
    aMaze.addRoom(room2);

    room1.setSide(North, makeWall());
    room1.setSide(East, aDoor);
    room1.setSide(South, makeWall());
    room1.setSide(West, makeWall());
    
    room2.setSide(North, makeWall());
    room2.setSide(East, makeWall());
    room2.setSide(South, makeWall());
    room2.setSide(West, aDoor);
    
    return aMaze;
  };

  // 팩토리 메서드들
  makeMaze() { return new Maze(); };
  makeRoom(n) { return new Room(n); };
  makeWall() { return new Wall(); };
  makeDoor(room1, room2) { return new Door(room1, room2); };
}
```

위 `MazeGame`을 상속 받아서 오버라이딩을 통해 다음과 같이 새로운 게임을 만들 수 있다.

```javascript
class bombedMazeGame extends MazeGame {
  makeRoom(n) { return new RoomWithBomb(n); };
  makeWall() { return new BombedWall; };
}
```

## 관련 패턴
&nbsp;추상 팩토리 패턴은 팩토리 메서드를 이용해 구현할 때가 많다. 또한 템플릿 메서드 패턴에서도 사용될 때가 많다.