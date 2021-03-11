# 1장 다중 통화를 지원하는 Money 객체

&nbsp;다중 통화를 지원하는 보고서를 생성하려면 어떤 테스트들이 있어야 정확한 보고서라는 것을 알 수 있을까?

- 통화가 다른 두 금액을 더해서 주어진 환율에 맞게 변한 금액을 결과로 얻을 수 있어야 한다.
- 어떤 금액을 어떤 수에 곱한 금액을 결과로 얻을 수 있어야 한다.

그리고 우리가 테스트할 항목은 다음과 같다.

- $5 + 10CHF = $10
- $5 \* 2 = $10
- amount를 private으로 만들기
- Dollar 부작용?
- Money 반올림?

객체를 생성하기 전에 테스트를 작성한다. 첫 번째 기능은 복잡하기 때문에, 두 번째 기능에 대한 테스트를 먼저 작성한다.

```java
public void testMultiplication() {
  Dollar five = new Dollar(5);
  five.times(2);
  assertEquals(10, five.amount);
}
```

위 테스트는 컴파일 실패한다. 컴파일은 되지만, 실행은 안되는 테스트코드를 만들어야한다. 위 테스트에는 4가지 오류가 있다.

- Dollar 클래스 없음
- 생성자 없음
- times 메서드 없음
- amount 필드 없음

처음으로 `Dollar`객체를 만들고, times메서드 추가와 amount필드를 추가한다.

```java
class Dollar {
  Dollar(int amount) {}
  int amount;
  void times(int multiplier) {}
}
```

이제 실패하는 테스트를 볼 수 있다. 그리고 다음은 성공하는 테스트다.

```java
class Dollar {
  Dollar(int amount) {}
  int amount = 10;
  void times(int multiplier) {}
}
```

테스트의 주기는 다음과 같다.

- 작은 테스트를 하나 추가한다.
- 모든 테스트를 실행해서 테스트가 실패하는 것을 확인한다.
- 조금 수정한다.
- 모든 테스트를 실행해서 테스트가 성공하는 것을 확인한다.
- 중복을 제거하기 위해 리팩토링을 한다.

> 의존성이 문제가 된다면 중복은 문제의 징후다. 프로그램에서는 중복만 제거해 주면 의존성도 제거된다.

이제 테스트 코드와 `Dollar`객체 사이의 중복을 제거한다. 사실 `amount`의 `10`이라는 값과 input으로 들어온 `10`이라는 값은 `5 * 2`가 중복된다고 볼 수 있다. 따라서 우리는 이런 중복을 제거해야한다.

```java
// Dollar class
int amount;

void times(int multiplier) {
  amount = 5 * 2;
}
```

다음으로 `5`를 얻을 수 있는 곳은 생성자 함수다. 그리고 그 값을 `times()`에서 사용할 수 있다. 또한 인자 `multiplier`의 값이 `2`다. 그러면 다음과 같이 코드를 고칠 수 있다.

```java
class Dollar {
  Dollar(int amount) {
    this.amount = amount;
  }

  void times(int multiplier) {
    amount *= multiplier;
  }
}
```

이제 테스트 완료 표시를 할 수 있다.

- $5 + 10CHF = $10
- ~~$5 \* 2 = $10~~
- amount를 private으로 만들기
- Dollar 부작용?
- Money 반올림?
