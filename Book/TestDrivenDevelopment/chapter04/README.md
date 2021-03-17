# 4장 프라이버시

&nbsp;이제 `amount를 private으로 만들기`를 해결한다. Dollar와 Dollar를 비교하는 것으로 `amount`를 숨긴다. 또한 임시 변수인 `product`를 인라인 시킨다.

```javascript
test("$5 * 2 is $10", () => {
  const five = new Dollar(5);
  expect(five.times(2).equals(new Dollar(10))).toBe(true);
  expect(five.times(3).equals(new Dollar(15))).toBe(true);
});
```

테스트 코드를 고치니 `amount`변수를 private로 변경할 수 있다.

- $5 + 10CHF = $10
- ~~$5 \* 2 = $10~~
- ~~amount를 private으로 만들기~~
- ~~Dollar 부작용?~~
- Money 반올림?
- ~~equals() 구현~~
- hashCode() 구현
- Equal null
- Equal object

또 하나의 할일을 완성했지만 위험한 상황이기도 한다. 동치성 테스트가 정확하지 않다면, 곱하기 테스트 역시 정확한 작동 검증에 실패한다. 그래서 잘 열심히 배워가면서 하자.
