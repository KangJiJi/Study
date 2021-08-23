# Bridge(가교)

## 의도

&nbsp;구현에서 추상을 분리하여, 이들이 독립적으로 다양성을 가질 수 있도록 한다.

## 동기

&nbsp;상속은 추상적 개념을 영구적으로 종속시킨다. 그래서 추상적 개념과 구현을 분리해서 재사용하거나 수정, 확장하기 쉽지 않다. 그래서 인터페이스에 대한 계통 하나와 구현에 해당하는 계통 하나를 따로 구축한다. 그러면 인터페이스와 구현을 분리시킬 수 있다. 이때 인터페이스와 구현의 관계를 `Bridge`라고 한다.

## 활용성

- 추상적 개념과 구현의 종속 관계를 피하고 싶을때(런타임에 구현 내용을 변경)
- 추상적 개념과 구현 모두가 독립적으로 확장돼야 할 때
- 추상적 개념에 대한 구현 내용을 변경하는 것이 다른 관련 프로그램에 아무런 영향을 주지 않아야 할 때
- 사용자에게 구현을 완벽하게 은닉하길 원할 때
- 클래스 계통에서 클래스 수가 급증하는 것을 방지하고자 할 때
- 여러 객체들에 걸쳐 구현을 공유하고자 하며, 이런 사실을 사용자 쪽에 공개하고 싶지 않을 때

## 참여자

- Abstraction
- RefinedAbstraction
- Implementor
- ConcreteImplementor

## 협력 방법

&nbsp;`Abstraction` 클래스가 사용자 요청을 `Implementor` 객체에 전달합니다.

## 결과

- 인터페이스와 구현 분리
- 확장성 제고
- 구현 세부 사항을 사용자에게서 숨기기

## 구현

- `Implementor` 하나만 둔다.
- 정확한 `Implementor` 객체를 생성한다.
- `Implementor`를 공유한다.
- 다중 상속을 이용한다.

## 예제 코드

&nbsp;`Window/WindowImp`의 예제다.

```javascript
class Window {
  // window가 처리하는 요청
  draw() {}
  close() {}
  iconify() {}
  deiconify() {}
  getWindowImp() {}

  // 구현 클래스에 위임할 요청
  setOrigin() {}
  setExtent() {}
  raise() {}
  lower() {}
  drawLine() {}
  drawRect() {}
  drawPolygon() {}
  drawText() {}
}
```

그리고 `WindowImp` 클래스의 구조는 `Window`에 정의된 연산과 다른 이름의 연산들이 정의되어 있다. 이때 `WindowImp`에는 실제 윈도우를 생성하고 관리하는 데 필요한 구체적인 연산이 정의되어 있다.

```javascript
class WindowImp {
  impTop() {}
  impBottom() {}
  impSetExtent() {}
  impSetOrigin() {}
  deviceRect() {}
  deviecText() {}
  deviceBitmap() {}
}
```

이제 `Window`를 상속하여 다른 종류의 윈도우를 정의한다.

```javascript
class ApplicationWindow extends Window {}
class IconWindow extends Window {
  drawContents() {
    this._imp.deviceBitmap();
  }
}
```

이렇게 `Window`를 상속받아서 계속 확장할 수 있다. `WindowImp`를 상속받는 클래스들을 구현한다. 각각의 클래스들은 시스템에 맞는 구현을 갖고 있다.

```javascript
class XWindowImp extends WindowImp {}
class PMWindowImp extends WindowImp {}
```

마지막으로 `Window`의 `getWindowImp`메서드를 통해서 적절한 `WindowImp`인스턴스를 반환하도록 한다.

## 관련 패턴

&nbsp;추상 팩토리 패턴을 통해 특정 `imp`를 생성할 수 있도록 한다.
