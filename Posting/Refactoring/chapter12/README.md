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

## 타입 코드를 서브클래스로 바꾸기(Replace Type Code with Subclasses)

```javascript
function createEmployee(name, type) {
  return new Employee(name, type);
}
```

```javascript
function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name);
    case "salesperson":
      return new Salesperson(name);
    case "manager":
      return new Manager(name);
  }
}
```

### 배경

&nbsp;비슷한 대상들을 특정 특성에 따라 구분해야 할 때 타입 코드를 사용한다. 이때 타입 코드를 서브클래스로 바꾸면 두 가지 장점이 있다. 첫 째로 다형성을 제공해준다. 두 번째로 특정 타입에서만 의미가 있는 값을 사용하는 필드나 메서드가 있을 때 명확하게 표현할 수 있다.

### 절차

- 타입 코드 필드를 자가 캡슐화한다.
- 타입 코드 값 하나를 선택하여 그 값에 해당하는 서브클래스를 만든다. 타입 코드 게터 메서드를 오버라이드하여 해당 타입 코드의 리터럴 값을 반환하게 한다.
- 매개변수로 받은 타입 코드와 방금 만든 서브클래스를 매핑하는 선택 로직을 만든다.
- 테스트한다.
- 타입 코드 값 각각에 대해 서브클래스 생성과 선택 로직 추가를 반복한다. 클래스 하나가 완성될 때마다 테스트한다.
- 타입 코드 필드를 제거한다.
- 테스트한다.
- 타입 코드 접근자를 이용하는 메서드 모두에 메서드 내리기와 조건부 로직을 다형성으로 바꾸기를 적용한다.

## 서브클래스 제거하기(Remove Subclass)

```javascript
class Person {
  get genderCode() {
    return "X";
  }
}

class Male extends Person {
  get genderCode() {
    return "M";
  }
}

class Female extends Person {
  get genderCode() {
    return "F";
  }
}
```

```javascript
class Person {
  get genderCode() {
    return this._genderCode;
  }
}
```

### 배경

&nbsp;소프트웨어가 변경됨에 따라 거브클래스로 만든 변종이 다른 모듈로 이동하거나 완전히 사라지기도 한다. 이런 경우 서브클래스를 슈퍼클래스의 필드로 대체해 제거하는 것이 최선이다.

### 절차

- 서브클래스의 생성자를 팩터리 함수로 바꾼다.
- 서브클래스의 타입을 검사하는 코드가 있다면 그 검사 코드에 함수 추출하기와 함수 옮기기를 차례로 적용하여 슈퍼클래스로 옮긴다.
- 서브클래스의 타입을 나타내는 필드를 슈퍼클래스에 만든다.
- 서브클래스를 참조하는 메서드가 방금 만든 타입 필드를 이용하도록 수정한다.
- 서브클래스를 지운다.
- 테스트한다.

## 슈퍼클래스 추출하기(Extract Superclass)

```javascript
class Department {
  get totalAnnualCost() { ... }
  get name() { ... }
  get headCount() { ... }
}

class Employee {
  get annualCost() { ... }
  get name() { ... }
  get id() { ... }
}
```

```javascript
class Party {
  get name() { ... }
  get annualCost() { ... }
}

class Department extends Party{
  get annualCost() { ... }
  get headCount() { ... }
}

class Employee extends Party{
  get annualCost() { ... }
  get id() { ... }
}
```

### 배경

&nbsp;공통된 부분이 데이터라면 필드 올리기, 동작이라면 메서드 올리기를 활용한다.

### 절차

- 빈 슈퍼클래스를 만든다. 원래의 클래스들이 새 클래스를 상속하도록 한다.
- 테스트한다.
- 생성자 본문 올리기, 메서드 올리기, 필드 올리기를 차례로 적용하여 공통 원소를 슈퍼클래스로 옮긴다.
- 서브클래스에 남은 메서드들을 검토한다. 공통되는 부분이 있다면 함수로 추출한 다음 메서드 올리기를 적용한다.
- 원래 클래스들을 사용하는 코드를 검토하여 슈퍼클래스의 인터페이스를 사용하게 할지 고민해본다.

## 계층 합치기(Collapse Hierarchy)

```javascript
class Employee { ... }
class Salesperson extends Employee { ... };
```

```javascript
class Employee { ... }
```

### 배경

&nbsp;클래스 계층을 리팩터링하다 보면 어떤 클래스의 부모가 너무 비슷해져서 더는 독립적으로 있을 필요가 없을 때 사용한다.

### 절차

- 두 클래스 중 제거할 것을 고른다.
- 필드 올리기와 메서드 올리기 혹은 필드 내리기와 메서드 내리기를 적용하여 모든 요소를 하나의 클래스로 옮긴다.
- 제거할 클래스를 참조하던 모든 코드가 남겨질 클래스를 참조하도록 고친다.
- 빈 클래스를 제거한다.
- 테스트한다.

## 서브클래스를 위임으로 바꾸기(Replace Subclass with Delegate)

```javascript
class Order {
  get daysToShip() {
    return this._warehouse.daysToShip;
  }
}

class PriorityOrder extends Order {
  get daysToShip() {
    return this._priorityPlan.daysToShip;
  }
}
```

```javascript
class Order {
  get daysToShip() {
    return this._priorityDelegate
      ? this._priorityDelegate.daysToShip
      : this._warehouse.daysToShip;
  }
}

class PriorityOrderDelegate {
  get daysToShip() {
    return this._priorityDelegate.daysToShip;
  }
}
```

### 배경

&nbsp;상속은 한 번만 사용할 수 있는 카드라는 것이 단점이다. 예를 들어 사람을 '나이'와 '소득분위'로 나누고 싶다면 젊은이, 어르신 과 부자, 서민이 돼야 한다. 또 다른 문제로 부모를 수정하면 자식들의 기능을 헤치기 쉽기 때문에 주의해야 한다. 위임은 위 두 문제를 해결할 수 있다.

### 절차

- 생성자를 호출하는 곳이 많다면 생성자를 팩터리 함수로 바꾼다.
- 위임으로 활용할 빈 클래스를 만든다. 이 클래스의 생성자는 서브클래스에 특화된 데이터를 전부 받아야 하며, 보통은 슈퍼클래스를 가리키는 역참조도 필요하다.
- 위임을 저장할 필드를 슈퍼클래스에 추가한다.
- 서브클래스 생성 코드를 수정하여 위임 인스턴스를 생성하고 위임 필드에 대입해 초기화한다.
- 서브클래스의 메서드 중 위임 클래스로 이동할 것을 고른다.
- 함수 옮기기를 적용해 위임 클래스로 옮긴다.
- 서브클래스 외부에도 원래 메서드를 호출하는 코드가 있다면 서브클래스의 위임 코드를 슈퍼클래스로 옮긴다.
- 테스트한다.
- 서브클래스의 모든 메서드가 옮겨질 때까지 위 과정을 반복한다.
- 서브클래스들의 생성자를 호출하는 코드를 찾아서 슈퍼클래스의 생성자를 사용하도록 수정한다.
- 테스트한다.
- 서브클래스를 삭제한다.

## 슈퍼클래스를 위임으로 바꾸기(Replace Superclass with Delegate)

```javascript
class List { ... }
class Stack extends List { ... }
```

```javascript
class Stack {
  constructor() {
    this._storage = new List();
  }
}

class List { ... }
```

### 배경

&nbsp;상속은 혼란과 복잡도를 키우는 방식으로 이뤄지기도 한다. 제대로 된 상속이라면 슈퍼클래스가 사용되는 모든 곳에서 서브클래스를 사용할 수 있어야한다. 그렇지 않은 상황이라면 위임을 사용해 기능 일부만 빌려온다.

### 절차

- 슈퍼클래스 객체를 참조하는 필드를 서브클래스에 만든다. 위임 참조를 새로운 슈퍼클래스 인스턴스로 초기화한다.
- 슈퍼클래스의 동작 각각에 대응하는 전달 함수를 서브클래스에 만든다.
- 슈퍼클래스의 동작 모두가 전달 함수로 오버라이드되었다면 상속 관계를 끊는다.
