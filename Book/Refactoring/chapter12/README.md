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

## 필드 올리기(Pull Up Field)

```javascript
class Employee { ... }

class Salesperson extends Employee {
  private String name;
}

class Engineer extends Employee {
  private String name;
}
```

```javascript
class Employee {
  protected String name;
}

class Salesperson extends Employee { ... }

class Engineer extends Employee { ... }
```

### 배경

&nbsp;서브클래스들이 독립적으로 개발되었거나 뒤늦게 하나의 계층구조로 리팩터링된 경우라면 일부 중복된 기능이 존재하는 경우가 가끔 있다. 따라서 비슷한 필드들을 슈퍼클래스로 끌어올려서 중복을 제거한다.

### 절차

- 후보 필드들을 사용하는 곳 모두가 그 필드들을 똑같은 방식으로 사용하는지 면밀히 살핀다.
- 필드들의 이름이 각기 다르다면 똑같은 이름으로 바꾼다.
- 슈퍼클래스에 새로운 필드를 생성한다.
- 서브클래스의 필드들을 제거한다.
- 테스트한다.

## 생성자 본문 올리기(Pull Up Constructor Body)

```javascript
class Party { ... }

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
}
```

```javascript
class Party {
  constructor(name) {
    this._name = name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
}
```

### 배경

&nbsp;생성자는 다루기 까다롭기 때문에 하는 일에 제약을 둬야 한다.

### 절차

- 슈퍼클래스에 생성자가 없다면 하나 정의한다. 서브클래스의 생성자들에서 이 생성자가 호출되는지 확인한다.
- 문장 슬라이드하기로 공통 문장 모두를 super() 호출 직후로 옮긴다.
- 테스트한다.
- 생성자 시작 부분으로 옮길 수 없는 공통 코드에는 함수 추출하기와 메서드 올리기를 차례로 적용한다.

## 메서드 내리기(Push Down Method)

```javascript
class Employee {
  get quota { ... }
}

class Engineer extends Employee { ... }
class Salesperson extends Employee { ... }
```

```javascript
class Employee { ... }

class Engineer extends Employee { ... }
class Salesperson extends Employee {
  get quota { ... }
}
```

### 배경

&nbsp;특정 서브클래스에서 사용하는 메서드는 슈퍼클래스에서 제거하고 해당 서브클래스에 추가하는 것이 깔끔하다.

### 절차

- 대상 메서드를 모든 서브클래스에 복사한다.
- 슈퍼클래스에서 그 메서드를 제거한다.
- 테스트한다.
- 이 메서드를 사용하지 않는 모든 서브클래스에서 제거한다.
- 테스트한다.

## 필드 내리기(Push Down Field)

```javascript
class Employee {
  private String quota;
}

class Engineer extends Employee { ... }
class Salesperson extends Employee { ... }
```

```javascript
class Employee { ... }

class Engineer extends Employee { ... }
class Salesperson extends Employee {
  get quota { ... }
}
```

### 배경

&nbsp;필드 올리기의 반대 리팩터링이다.

### 절차

- 대상 필드를 모든 서브클래스에 정의한다.
- 슈퍼클래스에서 그 필드를 제거한다.
- 테스트한다.
- 이 필드를 사용하지 않는 모든 서브클래스에서 제거한다.
- 테스트한다.
