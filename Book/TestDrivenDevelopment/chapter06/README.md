# 6장 돌아온 '모두를 위한 평등'

&nbsp;이번에는 `공용 equals`를 해결해본다. Dollar와 Franc의 두 클래스의 공통 상위 클래스 Money를 만든다. 그리고 Dollar가 이를 상속받고 `amount`변수를 Money로 옮긴다. 이제 `equals`메서드를 Dollar에서 Money로 옮긴다.

```javascript
class Dollar extends Money {
  constructor(amount) {
    super(amount);
  }

  times(multiplier) {
    return new Dollar(this._amount * multiplier);
  }
}
```

```javascript
class Money {
  constructor(amount) {
    this._amount = amount;
  }

  get amount() {
    return this._amount;
  }

  equals(money) {
    return this._amount == money.amount;
  }
}
```

Money의 동치성 테스트가 Franc끼리의 비교는 지원하지 않는다. 따라서 적절한 테스트를 추가하고 리팩터링을 한다. 결국 있으면 좋을 법한 테스트들이 리팩터링을 도와준다.

```javascript
test("equal check", () => {
  expect(new Dollar(5).equals(new Dollar(5))).toBe(true);
  expect(new Dollar(5).equals(new Dollar(6))).toBe(false);
  expect(new Franc(5).equals(new Franc(5))).toBe(true);
  expect(new Franc(5).equals(new Franc(6))).toBe(false);
});
```

Franc도 똑같이 중복이 생긴다. Money 클래스를 상속받고 `amount`변수를 제거한다. 그리고 중복되는 `equals`메서드도 제거한다.

```javascript
class Franc extends Money {
  constructor(amount) {
    super(amount);
  }

  times(multiplier) {
    return new Franc(this._amount * multiplier);
  }
}
```

완성이다. 그런데 Franc과 Dollar를 비교하면 어떻게 될지에 대한 의문이 생긴다. 완성한 목록은 지우고 새로 생긴 목록은 추가한다.

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
- Franc과 Dollar 비교하기
