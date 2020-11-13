# 기능 이동

## 함수 옮기기(Move Function)

```javascript
class Account {
  get overdraftCharge() { ... }
}
```

```javascript
class AccountType {
  get overdraftCharge() { ... }
}
```

### 배경

&nbsp;모듈성(Modularity)을 증가시키기 위해서 요소들을 이리저리 옮겨야 할 수 있다. 이때 대상 함수의 현재 컨텍스트와 후보 컨텍스트를 둘러보면 함수를 옮길지 말지 정하기 쉽다.

### 절차

- 함수가 현재 컨텍스트에서 사용 중인 모든 프로그램 요소를 살펴본다.
- 선택한 함수가 다형 메서드인지 확인한다.
- 선택한 함수를 타깃 컨텍스트로 복사한다.
- 정적 분석을 수행한다.
- 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영한다.
- 소스 함수를 타깃 함수의 위임 함수가 되도록 수정한다.
- 테스트한다.
- 소스 함수를 인라인할지 고민해본다.

## 필드 옮기기(Move Field)

```javascript
class Customer {
  get plan() {
    return this._plan;
  }

  get discountRate() {
    return this._discountRate;
  }
}
```

```javascript
class Customer {
  get plan() {
    return this._plan;
  }

  get discountRate() {
    return this.plan.discountRate;
  }
}
```

### 배경

&nbsp;데이터 구조를 잘못 선택하면 데이터를 다루기 위한 코드로 범벅이 된다. 레코드를 변경하려 할 때 다른 레코드의 필드까지 변경해야만 한다면 필드 위치가 잘못되었다는 신호다.

### 절차

- 소스 필드가 캡슐화되어 있지 않다면 캡슐화한다.
- 테스트한다.
- 타깃 객체에 필드를 생성한다.
- 정적 검사를 수행한다.
- 소스 객체에서 타깃 객체를 참조할 수 있는지 확인한다.
- 접근자들이 타깃 필드를 사용하도록 수정한다.
- 테스트한다.
- 소스 필드를 제거한다.
- 테스트한다.
