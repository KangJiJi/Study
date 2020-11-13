# 캡슐화

## 레코드 캡슐화하기(Encapsulate Record)

```javascript
organization = { name: "kang", country: "KR" };
```

```javascript
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get country() {
    return this._country;
  }
  set country(arg) {
    this._country = arg;
  }
}
```

### 배경

&nbsp;레코드는 계산해서 얻을 수 있는 값과 그렇지 않은 값을 명확히 구분해 저장해야 하는 단점이 있다. 객체를 사용하면 사용자는 무엇이 계산된 값인지 알 필요가 없다. 필드 이름을 바꿀 때도 좋다. 이는 점진적 수정에 도움이 된다.

### 절차

- 레코드를 담은 변수를 캡슐화한다.
- 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한다.
- 테스트한다.
- 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수들을 새로 만든다.
- 레코드를 반환하는 예전 함수를 사용하는 코드가 새 함수를 사용하도록 바꾼다.
- 클래스에서 원본 데이터를 반환하는 접근자와 원본 레코드를 반환하는 함수들을 제거한다.
- 테스트한다.
- 레코드의 필드도 데이터 구조인 중첩 구조라면 레코드 캡슐화하기 와 컬렉션 캡슐화하기를 재귀적으로 적용한다.

## 컬렉션 캡슐화하기(Encapsulate Collection)

```javascript
class Person {
  get courses() {
    return this._courses;
  }
  set courses(aList) {
    this._courses = aList;
  }
}
```

```javascript
class Person {
  get courses() {
    return this._courses.slice();
  }
  addCourse(aCourse) { ... }
  removeCourse(aCourse) { ... }
}
```

### 배경

&nbsp;객체의 게터가 컬렉션(List)자체를 반환하도록 한다면, 컬렉션의 원소들이 바뀌어버릴 수 있다. 따라서 add()와 remove()라는 컬렉션 변경자 메서드를 만드는 것이 좋다. 또한 내부 컬렉션을 수정 못하게 막는 방법 중 하나는 컬렉션 복제본을 반환하는 것이다.

### 절차

- 아직 컬렉션을 캡슐화하지 않았다면 변수 캡슐화하기부터 한다.
- 컬렉션에 원소를 추가/제거하는 함수를 추가한다.
- 정적 검사를 수행한다.
- 컬렉션을 참조하는 부분을 모두 찾는다. 추가/제거 함수를 호출하도록 수정한다.
- 컬렉션 게터를 수정해서 원본 내용을 수정할 수 없는 읽기전용 프락시나 복제본을 반환하게 한다.
- 테스트한다.

## 기본형을 객체로 바꾸기(Replace Primitive with Object)

```javascript
orders.filter((o) => "high" === o.priority || "rush" === o.priority);
```

```javascript
orders.filter((o) => o.priority.higherThan(new Priority("normal")));
```

### 배경

&nbsp;단순한 정보는 숫자, 문자열 같은 간단한 데이터 항목으로 표현할 때가 많지만, 개발이 진행됨에 따라 더 이상 간단하지 않게 변한다. 그러면서 금세 중복 코드가 늘어난다. 따라서 단순한 출력 이상의 기능이 필요해지는 순간 그 데이터를 표현하는 전용 클래스를 정의해야한다.

### 절차

- 아직 변수를 캡슐화하지 않았다면 캡슐화한다.
- 단순한 값 클래스를 만든다. 생성자는 기존 값을 인수로 받아서 저장하고, 이 값을 반환하는 게터를 추가한다.
- 정적 검사를 수행한다.
- 값 클래스의 인스턴스를 새로 만들어서 필드에 저장하도록 세터를 수정한다. 이미 있다면 필드의 타입을 적절히 변경한다.
- 새로 만든 클래스의 게터를 호출한 결과를 반환하도록 게터를 수정한다.
- 테스트한다.
- 함수 이름을 바꾸면 원본 접근자의 동작을 더 잘 드러낼 수 있는지 검토한다.

## 임시 변수를 질의 함수로 바꾸기(Replace Temp with Query)

```javascript
const basePrice = this._quantity * this._itemPrice;
if (basePrice > 1000) return basePrice * 0.95;
else return basePrice * 0.98;
```

```javascript
get basePrice() { this._quantity * this._itemPrice; }
...
if (basePrice > 1000) return basePrice * 0.95;
else return basePrice * 0.98;
```

### 배경

&nbsp;임시 변수를 함수로 만들어서 사용하는 편이 나을 때가 많다. 또한 이 리팩터링은 클래스 안에서 적용할 때 효과가 가장 크다.

### 절차

- 변수가 사용되기 전에 값이 확실히 결정되는지, 변수를 사용할 때마다 계산 로직이 매번 다른 결과를 내지는 않는지 확인한다.
- 읽기전용으로 만들 수 있는 변수는 읽기전용으로 만든다.
- 테스트한다.
- 변수 대입문을 함수로 추출한다.
- 테스트한다.
- 변수 인라인하기로 임시 변수를 제거한다.

## 클래스 추출하기(Extract Class)

```javascript
class Person {
  get officeAreaCode() {
    return this._officeAreaCode;
  }

  get officeNumber() {
    return this._officeNumber;
  }
}
```

```javascript
class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }

  get officeNumber() {
    return this._telephoneNumber.number;
  }
}

class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }

  get number() {
    return this._number;
  }
}
```

### 배경

&nbsp;클래스는 명확하게 추상화하고 소수의 역할만 처리해야한다. 따라서 적절히 분리하는 것이 좋다. 작은 일부의 기능만을 위해 서브클래스를 만들거나, 기능에 따라 서브클래스를 만드는 방식도 달라진다면 클래스를 나눠야 한다는 신호다.

- 클래스의 역할을 분리할 방법을 정한다.
- 분리될 역할을 담당할 클래스를 새로 만든다.
- 원래 클래스의 생성자에서 새로운 클래스의 인스턴스를 생성하여 필드에 저장해둔다.
- 분리될 역할에 필요한 필드들을 새 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다.
- 메서드들도 새 클래스로 옮긴다.
- 양쪽 클래스의 인터페이스를 살펴보면서 불필요한 메서드를 제거하고, 이름도 새로운 환경에 맞게 바꾼다.
- 새 클래스를 외부로 노출하지 정한다.

## 클래스 인라인하기(Inline Class)

```javascript
class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }

  get officeNumber() {
    return this._telephoneNumber.number;
  }
}

class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }

  get number() {
    return this._number;
  }
}
```

```javascript
class Person {
  get officeAreaCode() {
    return this._officeAreaCode;
  }

  get officeNumber() {
    return this._officeNumber;
  }
}
```

### 배경

&nbsp;클래스 인라인하기는 클래스 추출하기를 거꾸로 돌리는 리팩터링이다. 제 역할을 못 해서 그대로 두면 안 되는 클래스는 인라인해버린다. 두 클래스를 지금과 다르게 나누고 싶을 때도 클래스를 인라인한다. 나눠져 있는 클래스를 하나로 합치고 다시 다른 방식으로 나누는거다.

### 절차

- 소스 클래스의 각 public 메서드에 대응하는 메서드들을 타깃 클래스에 생성한다. 이 메서드들은 단순히 작업을 소스 클래스로 위임해야 한다.
- 소스 클래스의 메서드를 사용하는 코드를 모두 타깃 클래스의 위임 메서드를 사용하도록 바꾼다. 하나씩 바꿀 때마다 테스트한다.
- 소스 클래스의 메서드와 필드를 모두 타깃 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다.
- 소스 클래스를 삭제하고 조의를 표한다?

## 위임 숨기기(Hide Delegate)

```javascript
manager = aPerson.department.manager;
```

```javascript
manager = aPerson.manager;

class Person {
  get manager() {
    return this.department.manager;
  }
}
```

### 배경

&nbsp;모듈화 설계의 핵심은 캡슐화다. 예를들어 위임 객체를 캡슐화를 통해 숨기면 위임 객체가 수정되더라도 서버코드만 고치면 되고, 클라이언트는 아무런 영향을 받지 않는다.

### 절차

- 위임 객체의 각 메서드에 해당하는 위임 메서드를 서버에 생성한다.
- 클라이언트가 위임 객체 대신 서버를 호출하도록 수정한다. 하나씩 바꿀 때마다 테스트한다.
- 모두 수정했다면, 서버로부터 위임 객체를 얻는 접근자를 제거한다.
- 테스트한다.

## 중개자 제거하기(Remove Middle Man)

```javascript
manager = aPerson.manager;

class Person {
  getManager() {
    return this.department.manager;
  }
}
```

```javascript
manager = aPerson.department.manager;
```

### 배경

&nbsp;위임 객체를 캡슐화하면 이점도 있지만, 서버에 위임 메서드를 추가 할 때마다 단순히 전달만 하는 위임 메서드들이 쌓인다. 이럴때는 차라리 클라이언트가 위임 객체를 직접 호출하는 게 나을 수 있다.

### 절차

- 위임 객체를 얻는 게터를 만든다.
- 위임 메서드를 호출하는 클라이언트가 모두 이 게터를 거치도록 수정한다. 하나씩 바꿀 때마다 테스트한다.
- 모두 수정했다면 위임 메서드를 삭제한다.

## 알고리즘 교체하기(Substitute Algorithm)

```javascript
function foundPerson(people) {
  ...
  ...
  ...
}
```

```javascript
function foundPerson(people) {
  const candidates = ["Don", "John", "Kent"];
  return people.find((p) => candidates.includes(p)) || "";
}
```

### 배경

&nbsp;더 간명한 알고리즘을 찾아내면 알고리즘을 바꾼다.

### 절차

- 교체할 코드를 함수 하나에 모은다.
- 이 함수만을 이용해 동작을 검증하는 테스트를 마련한다.
- 대체할 알고리즘을 준비한다.
- 정적 검사를 수행한다.
- 기존 알고리즘과 새 알고리즘의 결과를 비교하는 테스트를 수행한다. 두 결과가 같다면 리팩터링이 끝난다.
