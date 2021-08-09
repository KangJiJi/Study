# Singleton(단일체)

## 의도

&nbsp;오직 한 개의 클래스 인스턴스만을 갖도록 보장하고, 이에 대한 전역적인 접근점을 제공한다.

## 동기

&nbsp;어떤 클래스는 하나의 인스턴스만 가지도록 구현하는 것이 좋다. 예를 들어 관리자나 socket같은 인스터스들이 해당한다. 이런 클래스들은 전역 변수로 만들어서 활용해도 되지만, 클래스 자신이 유일한 인스턴스를 관리하는 방법을 제공하는 것이 좋다. 이를 Singleton 패턴이라고 한다.

## 활용성

- 클래스의 인스턴스가 하나여야 함을 보장하고, 모든 사용자가 접근할 수 있도록 해야 할 때
- 유일한 인스턴스가 서브클래싱으로 확장되어야 하며, 사용자는 코드의 수정 없이 확장된 서브클래스의 인스턴스를 사용할 수 있어야 할 때

## 참여자

- Singleton

## 협력 방법

&nbsp;`Singleton` 클래스에 정의된 `Instance()` 메서드를 통해서 생성된 인스턴스에 접근할 수 있다.

## 결과

&nbsp;다음은 `Singleton` 패턴이 가지는 장점들이다.

- 유일하게 존재하는 인스턴스로의 접근을 통제한다.
- 이름 공간을 좁힌다.
- 연산 및 표현의 정제를 허용한다.
- 인스턴스의 개수를 변경하기가 자유롭다.
- 클래스 연산을 사용하는 것보다 훨씬 유연한 방법이다.

## 구현

- 인스턴스의 유일함을 보장해야 합니다.
- `Singleton`클래스를 서브클래싱 합니다.

## 예제 코드

&nbsp;`MazeFactory`의 인스턴스는 하나만 있어도 된다. 다음과 같이 사용할 수 있다.

```javascript
class MazeFactory {
  static _instance = 0;
  static instance() {
    const style = getEnv('MAZE_STYLE');
    if (_instance === 0) {
      if (style === 'bombed') _instance = new BombedMazeFactory();
      else if (style === 'enchanted') _instance = new EnchantedMazeFactory();
      else _instance = new MazeFactory();
    }

    return _instance;
  }
}
```

## 관련 패턴

&nbsp;많은 패턴을 `Singleton`패턴으로 구현할 수 있다.
