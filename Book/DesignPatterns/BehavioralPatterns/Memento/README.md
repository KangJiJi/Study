# Memento(메멘토)

## 의도

&nbsp;캡슐하를 위배하지 않은 채 어떤 객체의 내부 상태를 잡아내고 실체와시켜 둠으로써, 이후 해당 객체가 그 상태로 되돌아올 수 있도록 합니다.

## 동기

&nbsp;때에 따라서 객체의 내부 상태를 기록해 둘 필요가 있다. 예를 들어, 체크포인트같은 것이 있다. 그러나 객체는 상태를 외부에 공개하지 않기 때문에 다른 객체는 상태에 접근하지 못한다. 잘 알려진 제약 해결(Constraint solving)을 사용해도 되지만, 원상태로 복귀할 수 있다는 보장이 없다. 따라서 메멘토 패턴을 이용해서 객체 내부 상태의 스냅샷을 저장한다.

## 활용성

- 어떤 객체의 상태에 대한 스냅샷을 저장한 후 나중에 이 상태로 복구해야 할 때
- 상태를 얻는 데 필요한 직접적인 인터페이스를 두면 그 객체의 구현 세부 사항이 드러날 수밖에 없고, 이것으로 객체의 캡슐화가 깨질 때

## 참여자

- Memento
- Originator
- Caretaker

## 협력 방법

&nbsp;Caretaker 객체는 원조본 객체에 메멘토 객체를 요청한다. 또 요청한 시간을 저장하며, 받은 메멘토 객체를 다시 원조본 객체에게 돌려준다.

## 결과

- 캡슐화된 경계를 유지할 수 있습니다.
- Originator 클래스를 단순화할 수 있습니다.
- 메멘토의 사용으로 더 많은 비용이 들어갈 수도 있습니다.
- 제한 범위 인터페이스와 광범위 인터페이스를 정의해야 합니다.
- 메멘토를 관리하는 데 필요한 비용이 숨어있습니다.

## 구현

- 언어의 지원 여부 고려
- 점증적 상태 변경을 저장

## 예제 코드

&nbsp;명령으로는 `MoveCommand`객체를 사용하고, 자신이 어느 주체를 이동시키고 취소했는지 저장해야한다. 또한 이동한 거리 및 `ConstraintSolver`의 상태를 저장할 `ConstraintSolverMemento` 클래스의 인스턴스도 저장해야 한다.

```javascript
class MoveCommand {
  constructor(target, delta) {
    this._state;
    this._delta = delta;
    this._target = target;
  }

  execute() {
    const solver = new ConstraintSolver();
    this._state = solver.createMemento();
    this._target.move(this._delta);
    solver.solve();
  }

  unExecute() {
    const solver = new ConstraintSolver();
    this._target.move(-1 * this._delta);
    solver.setMemento(this._state);
    solver.solve();
  }
}
```

```javascript
class ConstraintSolver {
  addConstraint() {}
  removeConstraint() {}
  createMemento() {}
  setMemento() {}
  solve() {}
}
```

```javascript
class ConstraintSolverMemento {}
```

## 관련 패턴

&nbsp;명령 패턴은 실행 취소가 가능한 연산의 상태를 저장할 떄 메멘토 패턴을 사용할 수 있다.
