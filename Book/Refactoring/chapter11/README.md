# API 리팩터링

## 질의 함수와 변경 함수 분리하기(Separate Query from Modifier)

```javascript
function getTotalOutstandingAndSendBill() {
  const result = customer.invoices.reduce(
    (total, each) => each.amount + total,
    0
  );
  sendBill();
  return result;
}
```

```javascript
function totalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}

function sendBill() {
  emailGateway.send(formatBill(customer));
}
```

### 배경

&nbsp;우리는 겉보기 부수효과(Observable Side Effect)가 전혀 없는 값을 반환해주는 함수를 추구해야 한다. 이때 사용하는 방법은 질의 함수는 모두 부수효과가 없어야 한다는 규칙(명령-질의 분리)이다. 상태를 변경하는 부분과 질의하는 부분을 분리하려 시도해야 한다.

### 절차

- 대상 함수를 복제하고 질의 목적에 충실한 이름을 짓는다.
- 새 질의 함수에서 부수효과를 모두 제거한다.
- 정적 검사를 수행한다.
- 원래 함수를 호출하는 곳을 모두 찾아낸다. 호출하는 곳에서 반환 값을 사용한다면 징의 함수를 호출하도록 바꾸고, 원래 함수를 호출하는 코드를 바로 아래 줄에 새로 추가한다. 하나 수정할때마다 테스트한다.
- 원래 함수에서 질의 관련 코드를 제거한다.
- 테스트한다.

## 함수 매개변수화하기(Parameterize Function)

```javascript
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}

function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05);
}
```

```javascript
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}
```

### 배경

&nbsp;함수의 로직이 비슷하고 리터럴 값만 다르다면, 다른 값만 매개변수로 받아 처리하는 함수 하나로 합쳐서 중복을 없앨 수 있다.

### 절차

- 비슷한 함수 중 하나를 선택한다.
- 함수 선언 바꾸기로 리터럴들을 매개변수로 추가한다.
- 이 함수를 호출하는 곳 모두에 적절한 리터럴 값을 추가한다.
- 테스트한다.
- 매개변수로 받은 값을 사용하도록 함수 본문을 수정한다. 하나 수정할 때마다 테스트한다.
- 비슷한 다름 함수를 호출하는 코드를 찾아 매개변수화된 함수를 호출하도록 하나씩 수정한다. 하나 수정할 때마다 테스트한다.

## 플래그 인수 제거하기(Remove Flag Argument)

```javascript
function setDimension(name, value) {
  if (name === "height") {
    this._height = value;
    return;
  }
  if (name === "width") {
    this._width = value;
    return;
  }
}
```

```javascript
function setHeight(value) {
  this._height = value;
}

function setWidth(value) {
  this._width = value;
}
```

### 배경

&nbsp;플래그 인수란 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수다. 이는 함수 이해를 어렵게 하는 요인 중 하나다. 따라서 특정한 기능 하나만 수행하는 명시적인 함수를 제공하는 것이 좋다.

### 절차

- 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수들을 생성한다.
- 원래 함수를 호출하는 코드들을 모두 찾아서 각 리터럴 값에 대응되는 명시적 함수를 호출하도록 수정한다.

## 객체 통째로 넘기기(Perserve Whole Object)

```javascript
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if(aPlan.withinRange(low, high))
```

```javascript
if(aPlan.withinRange(aRoom.daysTempRange))
```

### 배경

&nbsp;하나의 레코드에서 여러 값을 가져와 인수로 넘기는 것 대신 레코드를 통째로 넘기고 함수에서 필요한 값들을 꺼내 쓰도록 수정한다. 레코드를 통째로 넘기면 변화에 대응하기 쉽다. 또한 함수 사용법을 이해하기도 쉬워진다. 하지만 함수가 레코드에 의존하지 않기를 원한다면 `객체 통째로 넘기기`리팩터링을 하면 안된다.

### 절차

- 매개변수들을 원하는 형태로 받는 빈 함수를 만든다.
- 새 함수의 본문에서는 원래 함수를 호출하도록 하며, 새 매개변수와 원래 함수의 매개변수를 매핑한다.
- 정적 검사를 수행한다.
- 모든 호출자가 새 함수를 사용하게 수정한다. 하나씩 수정하며 테스트하자.
- 호출자를 모두 수정했다면 원래 함수를 인라인 한다.
- 새 함수의 이름을 적절히 수정하고 모든 호출자에 반영한다.

## 매개변수를 질의 함수로 바꾸기(Replace Parameter with Query)

```javascript
availableVacation(anEmployee, anEmployee.grade);

function availableVacation(anEmployee, grade) { ... }
```

```javascript
availableVacation(anEmployee);

function availableVacation(anEmployee) {
  const grade = anEmployee.grade;
  ...
}
```

### 배경

&nbsp;매개변수 목록은 중복을 피하는 게 좋고 짧을수록 이해하기 쉽다. 하지만 피호출 함수가 그 역할을 수행하기에 적합할 때만 책임을 넘긴다. 그리고 피호출 함수는 참조 투명해야 한다.

### 절차

- 필요하다면 대상 매개변수의 값을 계산하는 코드를 별도 함수로 추출해놓는다.
- 함수 본문에서 대상 매개변수로의 참조를 모두 찾아서 그 매개변수의 값을 만들어주는 표현식을 참조하도록 바꾼다. 하나 수정할 때마다 테스트한다.
- 함수 선언 바꾸기로 대상 매개변수를 없앤다.

## 질의 함수를 매개변수로 바꾸기(Replace Query with Parameter)

```javascript
targetTemperature(aPlan);

function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature;
}
```

```javascript
targetTemperature(aPlan, thermostat.currentTemperature);

function targetTemperature(aPlan, currentTemperature) {
  ...
}
```

### 배경

&nbsp;함수 안에 두기엔 거북한 참조를 발견하면 매개변수로 바꿔서 해결할 수 있다. 이때도 참조 투명성이 지켜지는 것이 중요하다. 따라서 순수 함수들을 따로 구분하고, 순수 함수들의 겉을 감싸는 패턴을 많이 활용한다.

### 절차

- 변수 추출하기로 질의 코드를 함수 본문의 나머지 코드와 분리한다.
- 함수 본문 중 해당 질의를 호출하지 않는 코드들을 별도 함수로 추출한다.
- 방금 만든 변수를 인라인하여 제거한다.
- 원래 함수도 인라인한다.
- 새 함수의 이름을 원래 함수의 이름으로 고쳐준다.
