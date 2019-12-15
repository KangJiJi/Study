Prototype(원형)
============================

## 의도
&nbsp;원형이 되는 인스턴스를 사용하여 생성할 객체의 종류를 명시하고, 이렇게 만든 견본을 복사해서 새로운 객체를 생성한다.

## 동기
&nbsp;범용적인 프레임워크에 속해있는 A 클래스는 특정 응용프로그램에 국한되어 사용해야할 B 클래스들의 인스턴스 생성 방법을 모른다. 따라서 A 클래스가 B 클래스를 복제(Cloning)해서 사용하는 것으로 문제를 해결할 수 있다. 따라서 모든 B 클래스의 서브클래스는 `clone()`연산을 제공해야 한다. 원형 패턴을 사용하면 클래스 수를 더욱 더 줄일 수 있다.

## 활용성
* 인스턴스화할 클래스를 런타임에 지정할 때(동적 로딩)
* 제품 클래스 계통과 병렬적으로 만드는 팩토리 클래스를 피하고 싶을 때
* 클래스의 인스턴스들이 서로 다른 상태 조합 중에 어느 하나일 때(매번 수동적으로 초기화 하는 것보다 편리함)

## 참여자
* Prototype
* ConcretePrototype
* Client

## 협력 방법
&nbsp;사용자는 원형 클래스에 스스로를 복제하도록 요청한다.

## 결과
&nbsp;사용자 쪽에서 상대해야 하는 클래스의 수가 적고, 수정하지 않고도 응용프로그램에 따라 필요나 클래스들과 동작할 수 있게 된다. 또한 다음과 같은 추가적인 특성이 있다.

* 런타임에 새로운 제품을 추가하고 삭제할 수 있다.
* 원형을 이용해 새로운 클래스를 정의하면, 이는 새로운 행동이 정의된 듯한 결과를 보여준다.
* 구조를 다양화함으로써 새로운 객체를 명세할 수 있다.
* 원형을 복제하는 것이기 때문에 새로운 상속 계층이 필요 없어 서브클래스의 수를 줄인다.
* 동적으로 클래스에 따라 응용프로그램을 설정할 수 있다.

위와같은 장점이 있지만 가장 큰 단점 중 하나는 원형의 서브클래스들은 `clone()`메서드를 구현해야 한다는 것이다.

## 구현
* 원형 관리자를 만들어 모든 원형을 키 : 값 형태로 관리한다. 또한 삭제 기능도 담당한다.
* `clone()`연산을 구현한다.
* `clone()`연산에 매개변수를 정의하게 되면 복제 인터페이스의 일관성이 사라지기 떄문에 `clone()`을 초기화하는 연산을 따로 구현해줘야 한다.

## 예제 코드
&nbsp;`MazePrototypeFactory`를 `MazeFactory`의 서브클래스로 정의한다. `MazePrototypeFactory`는 생성자가 prototype을 인자로 받도록 한다.

```javascript
class MazePrototypeFactory extends MazeFactory {
  constructor(maze, wall, room, door) {
    this.prototypeMaze = maze;
    this.prototypeWall = wall;
    this.prototypeRoom = room;
    this.prototypeDoor = door;
  }

  makeMaze() {
    return this.prototypeMaze.clone();
  }

  makeWall() {
    return this.prototypeWall.clone();
  }

  makeRoom() {
    return this.prototypeRoom.clone();
  }

  makeDoor(room1, room2) {
    let door = this.prototypeDoor.clone();
    door.initialize(room1, room2);
    return door;
  }
}
```

벽, 방, 문을 만드는 멤버 함수들은 각각의 원형을 `clone()`연산을 통해 복제하고 `Initialize()`로 초기화 한다. 그리고 다음과 같이 기본적인 미로를 만들수 있다.

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

let simpleMazeFactory = MazePrototypeFactory(maze, wall, room, door);

let maze = mazeGame(simpleMazeFactory);
```

만약 다른 형식의 미로를 만들고 싶으면 다른 원형으로 `MazePrototypeFactory`를 초기화 해주면 된다.


```javascript
let bombedMazeFactory = MazePrototypeFactory(maze, bombedWall, roomWithABoom, door);

let maze = mazeGame(simpleMazeFactory);
```

## 관련 패턴
&nbsp;원형 패턴과 푸상 팩토리 패턴은 경쟁적인 관계이지만 함께 사용될 수 있다.