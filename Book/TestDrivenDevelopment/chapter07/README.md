# 7장 사과와 오렌지(서로 다른건 비교할 수 없다는 의미)

&nbsp;`Franc과 Dollar 비교하기`를 해결한다. 다음과 같은 테스트를 추가한다.

```javascript
test("equal check", () => {
  // ...
  expect(new Franc(5).equals(new Dollar(5))).toBe(false);
});
```

실패한다. 오직 금액과 클래스가 서로 동일할 때 동치성이 성립해야 한다. 그래서 Money의 `equals`메서드를 수정한다.

```javascript
class Money {
  constructor(amount) {
    this._amount = amount;
  }

  get amount() {
    return this._amount;
  }

  equals(money) {
    return (
      this._amount == money.amount &&
      Object.getPrototypeOf(this) === Object.getPrototypeOf(money)
    );
  }
}
```

더러운 코드처럼 보인다. 추후에 통화 개념을 도입할 수 있지만, 현재로서는 이 상태로 충분하기 때문에 잠시동안은 이대로 둔다.

- $5 + 10CHF = $10
- ~~$5 \* 2 = $10~~
- ~~amount를 private으로 만들기~~
- ~~Dollar 부작용?~~
- Money 반올림?
- ~~equals() 구현~~
- hashCode() 구현
- Equal null
- Equal object
- ~~5CHF \* 2 = 10CHF~~
- Dollar/Franc 중복
- ~~공용 equals~~
- 공용 times
- ~~Franc과 Dollar 비교하기~~
- 통화?

하나의 결함을 해결했다. 완벽하진 않지만 동작은한다. 그래서 더 많은 문제가 터지기 전까지는 통화라는 설계를 도입하지 않는다.
