# 11장 모든 악의 근원

&nbsp;이번에는 `Dollar/Franc 중복`을 해결한다. `Dollar`와 `Franc`에는 생성자만 남아있다. 생성자 때문에 하위 클래스가 있을 필요는 없기 때문에 제거하는 것이 좋다. 그리고 팩토리 메서드에서는 `Money`를 반환하도록 변경한다.

```javascript
class MoneyFactory {
  dollar(amount) {
    return new Money(amount, "USD");
  }

  franc(amount) {
    return new Money(amount, "CHF");
  }
}
```

그리고 `equal check` 테스트 코드를 보면 좀 과한 테스트인 것 같다. 그래서 기존 테스트를 줄인다.

```javascript
test("equal check", () => {
  expect(moneyFactory.dollar(5).equals(moneyFactory.dollar(5))).toBe(true);
  expect(moneyFactory.dollar(5).equals(moneyFactory.dollar(6))).toBe(false);
  expect(moneyFactory.franc(5).equals(moneyFactory.dollar(5))).toBe(false);
});
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
- ~~Dollar/Franc 중복~~
- ~~공용 equals~~
- ~~공용 times~~
- ~~Franc과 Dollar 비교하기~~
- ~~통화?~~
- testFrancMultiplication 제거
