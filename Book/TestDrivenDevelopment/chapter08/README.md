# 8장 객체 만들기

&nbsp;Dollar와 Franc 객체의 `times`메서드가 거의 똑같기 때문에 `Dollar/Franc 중복`을 해결한다. `times`메서드를 바로 제거해도 되지만 이렇게 큰 단계를 한번에 밟는 것은 TDD를 효과적으로 보여주기에 적절하지 않다. 그래서 '하위 클래스에 대한 직접적 참조를 적게하는 것은 하위 클래스를 제거하기 위한 행위'라는 생각을 가지고 Money에 Dollar를 반환하는 팩토리 메서드를 도입한다.

다만 JS에서는 팩토리 객체를 만들어서 해결한다.

```javascript
class MoneyFactory {
  dollar(amount) {
    return new Dollar(amount);
  }

  franc(amount) {
    return new Franc(amount);
  }
}
```

그리고 테스트 코드를 변경한다.

```javascript
test("Test Dollar multiplication", () => {
  const five = moneyFactory.dollar(5);
  expect(five.times(2).equals(moneyFactory.dollar(10))).toBe(true);
  expect(five.times(3).equals(moneyFactory.dollar(15))).toBe(true);
});

// ...
```

다음장에서 `times()`의 중복을 제거할 것이다.

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
- testFrancMultiplication을 지워야 할까?
