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

## 세터 제거하기(Remove Setting Method)

```javascript
class Person {
  get name() { ... }
  set name(aString) { ... }
}
```

```javascript
class Person {
  get name() { ... }
}
```

### 배경

&nbsp;세터 메소드는 필드가 수정될 수 있다는 뜻이다. 하지만 생성하지 않아도 되는 경우가 있다. 첫째, 생성자에서만 접근자 메서드를 사용할 때. 둘째, 클라이언트에서 생성 스크립트를 사용해 객체를 생성할 때다. 생성 스크립트란 객체 생성 후 일련의 세터를 호출하여 객체를 완성하는 형태의 코드다. 따라서 위 두 경우에 세터를 제거하여 의도를 더 정확하게 전달하는 것이 좋다.

### 절차

- 설정해야 할 값을 생성자에서 받지 않는다면 그 값을 받을 매개변수를 생성자에 추가한다. 그런 다음 생성자 안에서 적절한 세터를 호출한다.
- 생성자 밖에서 세터를 호출하는 곳을 찾아 제거하고, 대신 새로운 생성자를 사용하도록 한다. 하나 수정할 때마다 테스트한다.
- 세터 메서드를 인라인한다. 가능하다면 해당 필드를 불변으로 만든다.
- 테스트한다.

## 생성자를 팩터리 함수로 바꾸기(Replace Constructor with Factory Function)

```javascript
leadEngineer = new Employee(document.leadEngineer, "E");
```

```javascript
leadEngineer = createEmployee(document.leadEngineer);
```

### 배경

&nbsp;생성자는 객체를 초기화하는 특별한 용도의 함수다. 생성자는 인스턴스를 반환하고, `new`연산자를 사용해야한다. 하지만 팩터리 함수는 이런 제약이 없다.

### 절차

- 팩터리 함수를 만든다. 팩터리 함수의 본문에서는 원래의 생성자를 호출한다.
- 생성자를 호출하던 코드를 팩터리 함수 호출로 바꾼다.
- 하나씩 수정할 때마다 테스트한다.
- 생성자의 가시 범위가 최소가 되도록 제한한다.

## 함수를 명령으로 바꾸기(Replace Function with Command)

```javascript
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
}
```

```javascript
class Score {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }

  execute() {
    this._result = 0;
    this._healthLevel = 0;
  }
}
```

### 배경

&nbsp;특정 함수만을 위한 객체를 만들어서 함수를 객체안에 캡슐화하면 더 유용해지는 상황이 있다. 이런 객체를 `명령 객체` 혹은 `명령`이라 한다. 명령 객체 대부분은 메서드 하나로 구성되며, 메서드를 요청해 실행하는 것이 이 객체의 목적이다. 이는 유연하게 함수를 제어하고 표현할 수 있다. undo와 같은 보조 연산, 수명주기를 더 정밀하게 제어하는 데 필요한 매개변수를 만들어주는 메서드도 제공할 수 있다.

### 절차

- 대상 함수의 기능을 옮길 빈 클래스를 만든다. 클래스 이름은 함수 이름에 기초해 짓는다.
- 방금 생성한 빈 클래스로 함수를 옮긴다.
- 함수의 인수들 각각은 명령의 필드로 만들어 생성자를 통해 설정할지 고민해본다.

## 명령을 함수로 바꾸기(Replace Command with Function)

```javascript
class ChargeCalculator {
  constructor(customer, usage) {
    this._customer = customer;
    this._usage = usage;
  }
  execute() [
    return this._customer.rate * this._usage;
  ]
}
```

```javascript
function charge(customer, usage) {
  return customer.rate * usage;
}
```

### 배경

&nbsp;명령 객체는 복잡한 연산을 다룰 수 있는 강력한 메커니즘을 제공한다. 하지만 그저 함수를 하나 호출해 정해진 일을 수행하는 용도이면서, 로직이 크게 복잡하지 않다면 평범한 함수로 바꿔주는 게 낫다.

### 절차

- 명령을 생성하는 코드와 명령의 실행 메서드를 호출하는 코드를 함께 함수로 추출한다.
- 명령의 실행 함수가 호출하는 보조 메서드들 각각을 인라인한다.
- 함수 선언 바꾸기를 적용하여 생성자의 매개변수 모두를 명령의 실행 메서드로 옮긴다.
- 명령의 실행 메서드에서 참조하는 필드들 대신 대응하는 매개변수를 사용하게끔 바꾼다. 하나씩 수정할 때마다 테스트한다.
- 생성자 호출과 명령의 실행 메서드 호출을 호출자 안으로 인라인한다.
- 테스트한다.
- 죽은 코드 제거하기로 명령 클래스를 없앤다.

## 수정된 값 반환하기(Return Modified Value)

```javascript
let totalAscent = 0;
calculateAscent();

function calculateAscent() {
  for (let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    totalAscent += verticalChange > 0 ? verticalChange : 0;
  }
}
```

```javascript
let totalAscent = calculateAscent();

function calculateAscent() {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    result += verticalChange > 0 ? verticalChange : 0;
  }
  return result;
}
```

### 배경

&nbsp;데이터가 어떻게 수정되는지 이해하는 일은 어렵다. 따라서 변수를 갱신하는 함수라면 수정된 값을 반환하여 호출자가 그 값을 변수에 담아두도록 하면 데이터가 수정됨을 알려줄 수 있다.

### 절차

- 함수가 수정된 값을 반환하게 하여 호출자가 그 값을 자신의 변수에 저장하게 한다.
- 테스트한다.
- 피호출 함수 안에 반환할 값을 가리키는 새로운 변수를 선언한다.
- 테스트한다.
- 계산이 선언과 동시에 이뤄지도록 통합한다.
- 테스트한다.
- 피호출 함수의 변수 이름을 새 역할에 어울리도록 바꿔준다.
- 테스트한다.

## 오류 코드를 예외로 바꾸기(Replace Error Code with Exception)

```javascript
if (data) return new ShippingRules(data);
else return -23;
```

```javascript
if (data) return new ShippingRules(data);
else return new OrderProcessingError(-23);
```

### 배경

&nbsp;예외는 독립적인 오류 처리 메커니즘이다. 오류가 발견되면 적절한 예외 핸들러를 찾을 때까지 콜스택을 타고 위로 전파된다. 예외는 정상 동작 범주에 들지 않는 오류를 나타낼 때만 쓰여야 한다. 그렇지 않으면 예외 대신 오류를 검출하여 프로그램을 정상 흐름으로 되돌리게끔 처리해야 한다.

### 절차

- 콜스택 상위에 해당 예외 처리할 예외 핸들러를 작성한다.
- 테스트한다.
- 해당 오류 코드를 대체할 예외와 그 밖의 예외를 구분할 식별 방법을 찾는다.
- 정적 검사를 수행한다.
- catch절을 수정하여 직접 처리할 수 있는 예외는 적절히 대처하고 그렇지 않은 예외는 다시 던진다.
- 테스트한다.
- 오류 코드를 반환하는 곳 모두에서 예외를 던지도록 수정한다. 하나씩 수정할 때마다 테스트한다.
- 모두 수정했다면 그 오류 코드를 콜스택 위로 전달하는 코드를 모두 제거한다. 하나씩 수정할 때마다 테스트한다.

## 예외를 사전확인으로 바꾸기(Replace Exception with Precheck)

```javascript
double getValueForPeriod (int periodNumber) {
  try {
    return values[periodNumber];
  } catch (ArrayIndexOutOfBoundsException e) {
    return 0;
  }
}
```

```javascript
doubler getValueForPeriod (int periodNumber) {
  return (periodNumber >= values.length) ? 0 : values[periodNumber];
}
```

### 배경

&nbsp;예외는 예외적으로 동작할 때만 쓰여야 한다. 따라서 함수 수행 시 문제가 될 수 있는 조건을 함수 호출 전에 검사할 수 있다면, 예외를 던지는 대신 호출하는 곳에서 조건을 검사하도록 해야 한다.

### 절차

- 예외를 유발하는 상황을 검사할 수 잇는 조건문을 추가한다. catch 블록의 코드를 조건문의 조건절 중 하나로 옮기고, 남은 try 블록의 코드를 다른 조건절로 옮긴다.
- catch 블록에 어서션을 추가하고 테스트한다.
- try 문과 catch 블록을 제거한다.
- 테스트한다.
