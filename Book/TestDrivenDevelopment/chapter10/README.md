# 10장 흥미로운 시간

&nbsp;'공용 times'문제를 해결한다. `Franc`과 `Dollar`의 `times`구현이 거의 비슷한다.

```javascript
// Franc
times(multiplier) {
  return new Franc(this.amount * multiplier, "CHF");
}
```

```javascript
// Dollar
times(multiplier) {
  return new Dollar(this.amount * multiplier, "USD");
}
```

위 코드에서 팩토리 메서드의 두 번째 인자는 항상 `currency`를 가리킨다. 따라서 `this.currency`로 변경할 수 있다. 그리고 `Franc`과 `Dollar`의 `times`가 `Money`를 반환하도록 한다.

```javascript
// Franc
times(multiplier) {
  return new Money(this.amount * multiplier, this.currency);
}
```

```javascript
// Dollar
times(multiplier) {
  return new Money(this.amount * multiplier, this.currency);
}
```

이제 `equals()` 테스트 코드에서 오류가 발생한다. '클래스가 같은가?'를 검사하는게 아닌 'Currency가 같은가?'를 비교해야한다. 하지만 오류가 발생하는데 새로운 테스트 코드를 추가하는 것은 위험하다. 따라서 원래 테스트를 통과하는 코드로 돌리고 테스트를 추가한다.

```javascript
test("Test different class equality", () => {
  expect(new Money(10, "CHF").equals(moneyFactory.franc(10)));
});
```

새로운 테스트가 실패하는 것을 보고 `equals`메소드를 수정한다.

```javascript
// Money
equals(money) {
  return this._amount == money.amount && this.currency === money.currency;
}
```

이제 `Franc`과 `Dollar`의 `times`는 동일하기 때문에 상위 클래스로 끌어 올릴 수 있다.

```javascript
// Money
times(multiplier) {
  return new Money(this.amount * multiplier, this.currency);
}
```

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
- ~~공용 times~~
- ~~Franc과 Dollar 비교하기~~
- ~~통화?~~
- testFrancMultiplication 제거
