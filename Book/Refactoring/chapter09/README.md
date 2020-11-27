# 데이터 조직화

## 변수 쪼개기(Split Variable)

```javascript
let temp = 2 * (height + width);
console.log(temp);
temp = height * width;
console.log(temp);
```

```javascript
let perimeter = 2 * (height + width);
console.log(perimeter);
area = height * width;
console.log(area);
```

### 배경

&nbsp;변수는 다양한 용도로 쓰인다. 한 변수에 대입이 두 번 이상 이뤄진다면 여러가지 역할을 수행한다는 신호다. 그러면 쪼개야 한다.

### 절차

- 변수를 선언한 곳과 값을 처음 대입하는 곳에서 변수 이름을 바꾼다.
- 가능하면 이때 Immutable로 선언한다.
- 이 변수에 두 번째로 값을 대입하는 곳 앞까지의 모든 참조를 새로운 변수 이름으로 바꾼다.
- 두 번재 대입 시 변수를 원래 이름으로 다시 선언한다.
- 테스트한다.
- 반복한다.

## 필드 이름 바꾸기(Rename Field)

```javascript
class Organization {
  get name() { ... }
}
```

```javascript
class Organization {
  get title() { ... }
}
```

### 배경

&nbsp;적절한 이름은 중요하다. 이름만으로 무슨 일이 벌어지는지를 이해할 수 있다.

### 절차

- 레코드의 유효 범위가 제한적이라면 필드에 접근하는 모든 코드를 수정한 후 테스트한다.
- 레코드가 캡슐화되지 않았다면 우선 레코드를 캡슐화 한다.
- 캡술화된 객체 안의 private 필드명을 변경하고, 그에 맞게 내부 메서드들을 수정한다.
- 테스트한다.
- 생성자의 매개변수 중 필드와 이름이 겹치는게 있다면 함수 선언 바꾸기로 변경한다.
- 접근자들의 이름도 바꿔준다.

## 파생 변수를 질의 함수로 바꾸기(Replace Derived Variable with Query)

```javascript
get discountedTotal() { return this._discountedTotal }
set discount(aNumber) {
  const old = this._discount;
  this._discount = aNumber;
  this._discountedTotal += old - aNumber;
}
```

```javascript
get discountedTotal() { return this._baseTotal - this._discount; }
set discount(aNumber) { this._discount = aNumber; }
```

### 배경

&nbsp;가변 데이터는 소프트웨어에 문제를 일으키는 큰 골칫거리다. 따라서 가변 데이터의 유효 범위를 가능한 한 좁혀야 한다. 이를 위해서 값을 쉽게 계산해낼 수 있는 변수들을 모두 제거한다.

### 절차

- 변수 값이 갱신되는 지점을 모두 찾는다.
- 해당 변수의 값을 계산해주는 함수를 만든다.
- 해당 변수가 사용되는 모든 곳에서 어서션을 추가하여 함수의 계산 결과가 변수의 값과 같은지 확인한다.
- 테스트한다.
- 변수를 읽는 코드를 모두 함수 호출로 대체한다.
- 테스트한다.
- 변수를 선언하고 갱신하는 코드를 죽은 코드 제거하기로 없앤다.

## 참조를 값으로 바꾸기(Change Reference to Value)

```javascript
class Product {
  applyDiscount(arg) {
    this._price.amount -= arg;
  }
}
```

```javascript
class Product {
  applyDiscount(arg) {
    this._Price. = new Money(this._price.amount - arg, this._price.currency);
  }
}
```

### 배경

&nbsp;객체를 다른 객체에 중첩하면 내부 객체를 참조 혹은 값으로 취급할 수 있다. 내부 객체의 클래스를 수정하여 Value Object로 만들 수 있다. VO는 불변하기 때문에 활용하기 좋다. 하지만 특정 객체를 여러 객체에서 공유하고자 한다면, 참조로 다뤄야 한다.

### 절차

- 후보 클래스가 불변인지, 혹은 불변이 될 수 있는지 확인한다.
- 각각의 세터를 하나씩 제거한다.
- 이 값 객체의 필드들을 사용하는 동치성 비교 메서드를 만든다.

## 값을 참조로 바꾸기(Change Value to Reference)

```javascript
let customer = new Customer(customerData);
```

```javascript
let customer = customerRepository.get(customerData.id);
```

### 배경

&nbsp;하나의 데이터 구조 안에 논리적으로 똑같은 제3의 데이터 구조를 참조하는 레코드가 여러 개 있을 때가 있다. VO로 사용하면 데이터를 갱신해야 할 때 모든 복제본을 찾아서 빠짐없이 갱신해야 하기 때문에 이는 부작용이 된다.

### 절차

- 같은 부류에 속하는 객체들을 보관할 저장소를 만든다.
- 생성자에서 이 부류의 객체들 중 특정 객체를 정확히 찾아내는 방법이 있는지 확인한다.
- 호스트 객체의 생성자들을 수정하여 필요한 객체를 이 저장소에서 찾도록 한다.

## 매직 리터럴 바꾸기(Replace Magic Literal)

```javascript
function potentialEnergy(mass, height) {
  return mass * 9.81 * height;
}
```

```javascript
const STANDARD_GRAVITY = 9.81;
function potentialEnergy(mass, height) {
  return mass * STANDARD_GRAVITY * height;
}
```

### 배경

&nbsp;Magic literal이란 일반적인 리터럴 값을 말한다. 읽는 사람이 이 값의 의미를 모를 때 Magic literal이 된다. 적절한 상수를 정의해서 사용해야한다.

### 절차

- 상수를 선언하고 매직 리터럴을 대입한다.
- 해당 리터럴이 사용되는 곳을 모두 찾는다.
- 찾은 곳 각각에서 리터럴이 새 상수와 똑같은 의미로 쓰였는지 확인하여, 같은 의미라면 상수로 대체한 후 테스트한다.
