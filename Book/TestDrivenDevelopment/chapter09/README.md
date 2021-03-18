# 9장 우리가 사는 시간

&nbsp;이번에는 `통화`문제를 해결해본다. 먼저 통화 개념에 대한 테스트를 추가한다.

```javascript
test("Test currency", () => {
  expect(moneyFactory.dollar(1).currency()).toBe("USD");
  expect(moneyFactory.franc(1).currency()).toBe("CHF");
});
```

그리고 메서드를 구현한다.

```javascript
class Dollar extends Money {
  //...

  currency() {
    return currency;
  }

  //...
}
```

```javascript
class Franc extends Money {
  // ...

  currency() {
    return currency;
  }

  // ...
}
```

Dollar와 Franc의 `currency`는 동일한 메서드라 부모 객체로 올릴 수 있다. 그리고 생성자로 `currency`를 받도록 수정한다.

```javascript
class Money {
  // ...

  get currency() {
    return this._currency;
  }

  // ...
}
```

이제 팩터리 메소드의 코드까지 고친다.

```javascript
class MoneyFactory {
  dollar(amount) {
    return new Dollar(amount, "USD");
  }

  franc(amount) {
    return new Franc(amount, "CHF");
  }
}
```

마지막으로 구현을 상위 클래스로 옮긴다.

```javascript
class Money {
  constructor(amount, currency) {
    this._amount = amount;
    this._currency = currency;
  }

  get currency() {
    return this._currency;
  }

  // ...
}
```

TDD는 해야하는 일의 보폭을 조절하는 과정이다.

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
- ~~통화?~~
- testFrancMultiplication 제거
