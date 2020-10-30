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
