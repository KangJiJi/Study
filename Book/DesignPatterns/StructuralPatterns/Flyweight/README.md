# Flyweight(플라이급)

## 의도

&nbsp;공유를 통해 많은 수의 소립 객체들을 효과적으로 지원한다.

## 동기

&nbsp;객체 중심 설계에서 응용프로그램의 하단을 실제로 구현하는 비용이 만만치 않은 경우들이 있다. 예를들어 문서 편집기에서 문자 단위까지 객체로 설계하는 것은 조금 머뭇거리게 된다. 또한 각각이 객체가 된다면 엄청난 메모리와 실행 시간 낭비를 가져온다. 플라이급 패턴은 이런 문제를 객체 공유를 통해서 해결한다.

플라이급에서 가장 중요한 개념은 본질적 상태와 부가적 상태의 구분이다. 본질적 상태는 플라이급 객체에 저장되어야 한다. 또한 부가적 상태는 특정 상황에 종속적이다.

## 활용성

- 응용프로그램이 대량의 객체를 사용해야 할 때
- 객체의 수가 너무 많아져 저장 비용이 너무 높아질 때
- 대부분의 객체 상태를 부가적인 것으로 만들 수 있을 때
- 부가적인 속성들을 제거한 후 객체들을 조사해 보니 객체의 많은 묶음이 비교적 적은 수의 공유된 객체로 대체될 수 있을 때
- 응용프로그램이 객체의 정체성에 의존하지 않을 때

## 참여자

- Flyweight
- ConcreteFlyweight
- UnsharedConcreteFlyweight
- FlyweightFactory
- Client

## 협력 방법

&nbsp;기능을 수행하는데 필요한 상태가 본질적인 것인지 부가적인 것인지 구분해야한다. 본질적인 상태는 `ConcreteFlyweight`에 저장하고, 부가적인 상태는 따로 관리한다. 그리고 연산을 호출할 때 필요한 부가적 상태를 플라이급 객체에 매개변수로 전달한다. 또한 `ConcreteFlyweight`는 직접 만들지 않고 `Factory`를 통해서 공유할 수 있게 만들어야 한다.

## 결과

- 공유해야 하는 인스턴스의 전체 수를 줄일 수 있다.
- 객체별 본질적 상태의 양을 줄일 수 있습니다.
- 부가적인 상태는 연산되거나 저장될 수 있습니다.

## 구현

- 부가적 상태를 제외한다.
- 공유할 객체를 관리한다.

## 예제 코드

&nbsp;다음과 같이 `Glyph` 클래스를 정의할 수 있다.

```javascript
class Glyph {
  draw(glyphContext) {}
  setFont(glyphContext) {}
  getFont(glyphContext) {}
  first(glyphContext) {}
  next(glyphContext) {}
  isDone(glyphContext) {}
  current(glyphContext) {}
  insert(glyphContext) {}
  remove(glyphContext) {}
}
```

`Character`는 문자 코드를 저장하는 클래스다.

```javascript
class Character extends Glyph {
  draw(glyphContext) {
    // overriding
  }
}
```

`GlyphContext`객체에 폰트 속성을 저장하면 `Glyph`의 할당 공간을 절약할 수 있다. 또한 `Glyph`의 요소를 순회하거나 관리하는 연산은 호출될 때마다 `GlyphContext`를 수정해야한다. `GlyphContext`는 폰트 속성을 `tree`구조로 관리한다.

```javascript
class GlyphContext {
  next(step) {}
  insert(quantity) {}

  getFont() {}
  setFont() {}
}
```

## 관련 패턴

&nbsp;복합체 패턴과 함께 사용된다. 또한 상태 혹은 전략 패턴을 플라이급 객체로 구현할 수 있다.
