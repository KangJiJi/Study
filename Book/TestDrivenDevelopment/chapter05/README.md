# 5장 솔직히 말하자면

&nbsp;할일 목록에서 첫 번째 테스트에 어떤식으로 접근해야 할까? 작은 것부터 시작하기 위해서 Dollar와 비슷하게 동작하는 Franc 객체를 만들어서 테스트를 한다.

- $5 + 10CHF = $10
- ~~$5 \* 2 = $10~~
- ~~amount를 private으로 만들기~~
- ~~Dollar 부작용?~~
- Money 반올림?
- ~~equals() 구현~~
- hashCode() 구현
- Equal null
- Equal object
- 5CHF \* 2 = 10CHF

Dollar객체의 테스트를 복사해서 수정한다.

```javascript
test("Test Franc multiplication", () => {
  const five = new Franc(5);
  expect(five.times(2).equals(new Franc(10))).toBe(true);
  expect(five.times(3).equals(new Franc(15))).toBe(true);
});
```

테스트에서 초록 막대를 보기위해서 Dollar 객체를 복사해서 Franc으로 바꾼다. 물론 좋은 방법은 아니지만, 단계에 맞춰서 코딩을한다.

- 테스트 작성
- 컴파일되게 하기
- 실패하는지 확인하기 위해 실행
- 실행하게 만듦
- 중복 제거

적절한 시기에 적절한 설계를. 돌아가게 만들고, 올바르게 만들어라.

```javascript
class Franc {
  constructor(amount) {
    this._amount = amount;
  }

  times(multiplier) {
    return new Franc(this._amount * multiplier);
  }

  equals(dollar) {
    return this._amount == dollar.amount;
  }

  get amount() {
    return this._amount;
  }
}
```

이제 초록 막대를 볼 수 있다. 그리고 중복이 많이 생겼다.

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
- 공용 equals
- 공용 times

`$5 + 10CHF = $10`라는 큰 테스트를 공략하기 위해서 작은 테스트를 먼저 만들었다. 그리고 이제 중복을 해결한다.
