Builder(빌더)
============================

## 의도
&nbsp;복잡하느 객체를 생성, 표현하는 방법을 정의하는 클래스를 별도로 분리하여, 서로 다른 표현이라도 이를 생성할 수 있는 동일한 절차를 제공할 수 있도록 한다.

## 동기
&nbsp;RTF(Rich Text Format)문서 판독기는 문서 형식들 간의 변환(Conversion)가능성에 제한이 없어야 하며, 판독기의 변경 없이도 새로운 형태의 변환이 추가될 수 있어야 한다. 따라서 RTF토큰을 판단하는 RTFReader 클래스와 문자식으로 변환을 하는 TextConverter 클래스를 따로 분리한다. RTFReader에서 TextConverter의 적절한 클래스를 호출할 때 호출되는 클래스들을 빌더라고 한다.

## 활용성
* 복합 객체 생성 알고리즘의 요소 객체들이 독립적인 조립 방법을 가지고 있을 때
* 합성할 객체들의 표현식이 서로 다르더라도 생성 절차에서 이를 지원해야 할 때

## 참여자
* Builder
* ConcreteBuilder
* Director
* Product

## 협력 방법
* 사용자는 Director 객체를 생성하고, Builder객체로 합성해 나간다.
* Product의 일부가 구축될 때마다 Director는 Builder에 통보한다.
* Builder는 Director의 요청을 처리하여 Product에 부품을 추가한다.
* 사용자는 Builder에서 제품을 검색한다.

## 결과
* 제품에 대한 내부 표현을 다양하게 변화할 수 있다.
* 생성과 표현에 필요한 코드를 분리한다.
* 복합 객체를 생성하는 절차를 좀더 세밀하게 나눌 수 있다.

## 구현
&nbsp;Builder클래스에 요청받은 요소들을 생성하는 연산을 정의한다. 다음은 좀더 생각해야 할 구현 이슈다.

* 조합과 구축에 필요한 인터페이스를 정의한다.
* 제품에 대한 추상 클래스는 필요 없는가?
* Builder에 있는 메서드에 대해서는 구현을 제공하지 않는 게 일반적이다.

## 예제 코드
&nbsp;`mazeBuilder`클래스를 통해 미로를 복합하는 각각의 요소를 생성하는 연산을 정의한다.

```javascript
const mazeBuilder = () => {
  const buildMaze = () => {}
  const buildRoom = (room) => {}
  const buildDoor = (roomFrom, roomTo) => {}
  const getMaze = () => {}
}
```

`createMaze`는 `mazeBuilder`의 인스턴스를 인자로 받을 수 있는 함수로 정의한다.

```javascript
const createMaze = (builder) => {
  builder.buildMaze();

  builder.buildRoom(1);
  builder.buildRoom(2);
  builder.buildDoor(1, 2);

  return builder.getMaze();
}
```

위 `createMaze`는 내부 표현을 은닉한다. 미로, 방, 문을 만드는 과정의 연속일 뿐 이들이 어떻게 미로를 복합하는지, 방과 문의 관계가 어떻게 되는지 알 수 없다. 그저 필요한 요소만 계속 만들어 달라고 요청할 뿐이다.

`mazeBuilder`는 단지 미로를 생성하는 인터페이스를 정의하는 것이다. 실제 구현은 `mazeBuilder`의 서브클래스에 들어있다. 다음은 `standardMazeBuilder`의 구현이다.

```javascript
const standardMazeBuilder = () => {
  const buildMaze = () => currentMaze = maze();
  const buildRoom = (roomNum) => {
    let room = room(roomNum);
    currentMaze.addRoom(room);

    room.setSide(North, wall());
    room.setSide(South, wall());
    room.setSide(East, wall());
    room.setSide(West, wall());
  }
  const buildDoor = (roomNum1, roomNum2) => {
    let room1 = currentMaze.roomNo(roomNum1);
    let room2 = currentMaze.roomNo(roomNum2);
    let door = door(room1, room2);

    room1.setSide(commonWall(room1, room2), door);
    room2.setSide(commonWall(room2, room1), door);
  }
  const getMaze = () => {}
  let currentMaze = 0;
}
```

이제 `createMaze`의 인자 값으로 `standardMazeBuilder`를 넘겨주면 미로를 만들 수 있다.

## 관련 패턴
&nbsp;추상 팩토리 패턴과 빌더 패턴은 비슷한 모습을 보인다. 차이점은 빌더 패턴은 복잡한 객체의 단계별 생성에 중점을 둔 반면, 추상 팩토리 패턴은 제품의 유사군들이 존재할 때 유연한 설계에 중점을 둔다. 빌더 패턴의 `createMaze`와 추상 팩토리 패턴의 `mazeGame`에서 차이를 확인할 수 있다. 또한 빌더 패턴은 생성의 마지막 단계에서 제품을 반환하고, 추상 팩토리 패턴은 만드는 즉시 제품을 반환한다.