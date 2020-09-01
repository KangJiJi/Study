# 6장 객체와 자료 구조

&nbsp;변수의 접근 제한자를 private로 설정하지만, 왜 get과 set함수를 이용해서 private변수를 public처럼 동작하게 하는 것인가?

## 자료 추상화

&nbsp;아무 생각 없이 get과 set을 만들어서는 추상화가 이뤄지지 않는다.

```java
public interface Vehicle {
  double getFuelTankCapacityInGallons();
  double getGallonsOfGasoline();
}

public interface Vehicle {
  double getPercentFuelRemaining();
}
```

위 코드에서 전자는 연료 상태를 구체적인 숫자 값으로 알려준다. 하지만 후자는 백분율이라는 추상적 개념으로 알려준다. 따라서 상황에 맞게 잘 추상화해서 get과 set을 만들어야 한다.

## 자료/객체 비대칭

&nbsp;객체는 추상화를 통해 자료를 다루는 함수를 공개하고, 자료구조는 자료 그대로 공개한다. 따라서 객체와 자료구조는 본질적으로 상반된다.

> 절차적 코드는 새로운 자료 구조를 추가하기 어렵다.(모든 함수를 고쳐야 하기 때문에)

> 객체 지향 코드는 새로운 함수를 추가하기 어렵다.(모든 클래스를 고쳐야 하기 때문에)

잘 상황에 알맞게 사용해야 한다.

## 디미터 법칙

&nbsp;모듈은 자신이 조작하는 객체의 속사정을 몰라야 한다는 법칙이다. 자료를 잘 숨기고 함수를 공개한다. 정확하게는 클래스 C의 메서드 f는 다음과 같은 객체의 메서드만 호출해야 한다.

- 클래스 C
- f 가 생성한 객체
- f 인수로 넘어온 객체
- C 인스턴스 변수에 저장된 객체

다음 코드는 디미터 법칙을 어기는 코드다.

```java
final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
```

위와 같은 코드를 기차 충돌이라고 부른다. 위 코드는 다음과 같이 변경하는 것이 좋다.

```java
Option opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
final String outputDir = scratchDir.getAbsolutePath();
```

하지만 위 코드가 디미터 법칙을 어기는 지는 다른 문제다. ctxt, opts, scratchDir가 객체면 디미터 법칙을 어긴 것이다. 하지만 자료구조면 디미터 법칙이 적용되지 않는다. 하지만 자료구조라면 다음과 같이 구현했어야 한다.

```java
final String outputDir = ctxt.options.scratchDir.absolutePath;
```

이러한 혼란 덕분에 가끔 반은 객체고 반은 자료구조인 잡종 구조가 생기지만 이는 지양해야 한다.

그래서 위 코드를 잘 해결하기 위해서는 절대 경로를 알아야 하는 이유를 알아내서 다시 리펙토링 해야 한다.

## 자료 전달 객체

&nbsp;자료 구조체를 DTO라고 부른다. 또한 DTO의 특수한 형태를 활성 레코드라고 부른다.

## 결론

&nbsp;객체는 동작을 공개하고 자료를 숨긴다. 그래서 새 동작을 추가하기는 어렵다. 자료 구조는 자료를 노출한다. 그래서 기존 함수에 새 자료 구조를 추가하기는 어렵다. 따라서 문제 해결을 위해서 적절한 해결책을 선택한다.
