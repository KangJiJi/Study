# 3장 모두를 위한 평등

&nbsp;지금의 Dollar 객체는 VO인데 이 객체의 제약사항 중 하나는 인스턴스 생성 후 값이 절대 변하지 않는다는 것이다. 반면 별칭 문제에 대해 걱정할 필요가 없다. 이런 VO는 모든 연산이 새 객체를 반환해야 한다. 또한 `equals()`를 구현해야 한다. 또한 Dollar 객체를 해시 테이블의 키로 사용하려면 `hashCode()`를 구현해야 한다.

- $5 + 10CHF = $10
- ~~$5 \* 2 = $10~~
- amount를 private으로 만들기
- ~~Dollar 부작용?~~
- Money 반올림?
- equals() 구현
- hashCode() 구현

처음에는 빨간 막대를 보는 테스트를 작성한다.

```javascript
test("equal check", () => {
  expect(new Dollar(5).equals(new Dollar(5))).toBe(true);
});
```

그리고 초록 막대를 볼 수 있는 코드를 추가한다.

```javascript
class Dollar {
  ...

  equals(dollar) {
    return true;
  }

  ...
}
```

삼각측량법을 사용하는데 이 방법은 두 번째 예가 좀더 일반적인 해를 필요로 할 때, 일반화하는 방법이다. 두 번째 예제를 추가한다.

```javascript
test("equal check", () => {
  expect(new Dollar(5).equals(new Dollar(5))).toBe(true);
  expect(new Dollar(5).equals(new Dollar(6))).toBe(false);
});
```

이제 `equals()`의 일반화 필요성을 느끼고 일반화 한다.

```javascript
class Dollar {
  ...

  equals(object) {
    return this._amount == object.amount;
  }

  ...
}
```

- $5 + 10CHF = $10
- ~~$5 \* 2 = $10~~
- amount를 private으로 만들기
- ~~Dollar 부작용?~~
- Money 반올림?
- ~~equals() 구현~~
- hashCode() 구현

설계를 어떻게 할지 모를 때 삼각측량은 좋은 방법이다. 설계하는 프로그램이 어떤 변화 가능성을 지원해야 하는가?

- $5 + 10CHF = $10
- ~~$5 \* 2 = $10~~
- amount를 private으로 만들기
- ~~Dollar 부작용?~~
- Money 반올림?
- ~~equals() 구현~~
- hashCode() 구현
- Equal null
- Equal object

null 혹은 다른 객체들과 비교하게 될 때를 생각해서 목록에 추가한다.

- VO가 또 다른 오퍼레이션(Equals)을 암시한다는 것을 알아차렸다.
- 해당 오퍼레이션을 테스트했다.
- 해당 오퍼레이션을 간단히 구현했다.
- 곧장 리팩토링하는 대신 테스트를 조금 더 했다.
- 두 경우 모두 수용할 수 있도록 리팩토링했다.
