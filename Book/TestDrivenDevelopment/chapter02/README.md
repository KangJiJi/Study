# 2장 타락한 객체

&nbsp;일반적인 TDD 주기는 다음과 같다.

- 테스트를 작성한다.
- 실행 가능하게 만든다.
- 올바르게 만든다.

앞장에서 작성한 테스트에서 연산을 수행하면 `Dollar`의 값이 바뀌는 부작용이 있다.

```java
public void testMultiplecation() {
  Dollar five = new Dollar(5);
  five.times(2);
  assertEquals(10, product.amount);
  five.times(3);
  assertEquals(15, product.amount);
}
```

위와 같은 테스트를 통과하게 하려면 `times`에서 새로운 객체를 반환하게 만들면 될 것 같다. 그리고 테스트 코드와 객체도 변경해줘야 한다.

```java
public void testMultiplecation() {
  Dollar five = new Dollar(5);
  Dollar product = five.times(2);
  assertEquals(10, product.amount);
  product = five.times(3);
  assertEquals(15, product.amount);
}
```

```java
Dollar times(int multiplier) {
  return new Dollar(amount * multiplier);
}
```

그러면 항목을 다음과 같이 지울 수 있다.

- $5 + 10CHF = $10
- ~~$5 \* 2 = $10~~
- amount를 private으로 만들기
- ~~Dollar 부작용?~~
- Money 반올림?
