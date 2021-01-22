# 상속 다루기

## 메서드 올리기(Pull Up Method)

```javascript
class Employee { ... }

class Salesperson extends Employee {
  get name() { ... }
}

class Engineer extends Employee {
  get name() { ... }
}
```

```javascript
class Employee {
  get name() { ... }
}

class Salesperson extends Employee { ... }

class Engineer extends Employee { ... }
```

### 배경

&nbsp;중복 코드를 제거하기 위한 리팩터링이다. 메서드들의 본문 코드가 똑같을 때 사용한다. 하지만 메서드의 본문에서 참조하는 필드들이 서브클래스에만 있으면 필드들을 먼저 슈퍼클래스로 올린 후 메서드를 올려야 한다.

### 절차

- 똑같이 동작하는 메서드인지 면밀히 살펴본다.
- 메서드 안에서 호출하는 다른 메서드와 참조하는 필드들을 슈퍼클래스에서도 호출하고 참조할 수 있는지 확인한다.
- 메서드 시그니처가 다르다면 함수 선언 바꾸기로 슈퍼클래스에서 사용하고 싶은 형태로 통일한다.
- 슈퍼클래스에 새로운 메서드를 생성하고, 대상 메서드의 코드를 복사해넣는다.
- 정적 검사를 수행한다.
- 서브클래스 중 하나의 메서드를 제거한다.
- 테스트한다.
- 모든 서브클래스의 메서드가 없어질 때까지 다른 서브클래스의 메서드를 하나씩 제거한다.
