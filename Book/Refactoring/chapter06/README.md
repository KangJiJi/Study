# 기본적인 리팩터링

## 함수 추출하기(Extract Function)

```javascript
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();

  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
}
```

```javascript
function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  printDetails(outstanding);

  function printDetails(invoice, outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
  }
}
```

### 배경

&nbsp;특정 일을 하는 코드를 찾아서 함수로 만들고 적절한 이름을 붙이는 리팩터링 기법이다. `목적과 구현을 분리`하기 위해서 코드를 나눈다. 보통 대여섯 줄을 넘어가면 냄새가 풍긴다. 또한 짧은 것은 문제가 되지 않는다.

> 색상 반전을 위해 사용하는 코드 `highlight()`는 단순히 `reverse()`메서드만 호출한다.

위와 같은 코드가 목적이 더 잘 드러난다. 또한 성능은 문제가 되지 않으면 신경쓰지 않아도 된다.

### 절차

- 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다(`무엇을` 하는지가 드러나야 한다).
- 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다.
- 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사한다. 있다면 매개변수로 전달한다.
- 변수를 다 처리했다면 컴파일한다.
- 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꾼다.
- 테스트한다.
- 다른 코드에서 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살핀다. 있다면 방금 추출한 새 함수를 호출하도록 바꿀지 검토한다.

## 함수 인라인하기(Inline Function)

```javascript
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}
```

```javascript
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
```

### 배경

&nbsp;간접 호출은 유용할 수도 있지만 쓸데없는 간접 호출은 거슬릴 뿐이다. 잘못 추출된 함수, 간접호출을 너무 과하게 쓰느 코드들이 인라인 대상이다.

### 절차

- 오버라이드하는 메서드는 인라인하면 안되기 때문에 다형 메서드(Polymorphic method)인지 확인한다.
- 인라인할 함수를 호출하는 곳을 모두 찾는다.
- 각 호출문을 함수 본문으로 교체한다.
- 하나씩 교체할 때마다 테스트한다.
- 함수 정의를 삭제한다.

## 변수 추출하기(Extract Variable)

```javascript
return (
  order.quantity * oerder.itemPrice -
  Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
  Math.min(order.quantity * order.itemPrice * 0.1, 100)
);
```

```javascript
const basePrice = order.quantity * order.itemPrice;
const quantityDiscount =
  Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
const shipping = Math.min(basePrice * 0.1, 100);
return basePrice - quantityDiscount + shipping;
```

### 배경

&nbsp;표현식이 복잡할 때 변수를 이용해서 로직의 각 단계별로 이름을 붙여서 코드를 더 명확하게 할 수 있다. 변수 추출은 표현식에 이름을 붙이는 작업이다. 또한 함수로 추출하는 것이 좋다. 다른 코드에서도 같은 표현식을 중복해서 사용하지 않아도 되기 때문이다.

### 절차

- 추출하려는 표현식에 부작용은 없는지 확인한다.
- 불변 변수를 하나 선언하고 이름을 붙일 표현식의 복제본을 대입한다.
- 원본 표현식을 새로 만든 변수로 교체한다.
- 테스트한다.
- 표현식을 여러 곳에서 사용하다면 각각을 새로 만든 변수로 교체한다. 하나 교체할 때마다 테스트 한다.

## 변수 인라인하기(Inline Variable)

```javascript
let basePrice = anOrder.basePrice;
return basePrice > 1000;
```

```javascript
return anOrder.basePrice > 1000;
```

### 배경

&nbsp;원래 표현식과 다를 바 없거나, 리팩터링에 방해가 된다면 변수를 인라인하는 것이 좋다.

### 절차

- 대입문의 우변에서 부작용이 생기지 않는지 확인한다.
- 변수가 불변으로 선언되지 않았다면 불면으로 만든 후 테스트한다.
- 이 변수를 가장 처음 사용하는 코드를 찾아서 대입문 우변의 코드로 바꾼다.
- 테스트한다.
- 변수를 사용하는 부분을 모두 교체할 때까지 이 과정을 반복한다.
- 변수 선언문과 대입문을 지운다.
- 테스트한다.

## 함수 선언 바꾸기(Change Function Declaration)

```javascript
function circum(radius) { ... };
```

```javascript
function circumference(radisu) { ... };
```

### 배경

&nbsp;연결부를 잘 정의해야한다. 그러기 위해서는 함수의 이름이 가장 중요하다. 그리고 매개변수도 마찬가지다. 하지만 정답은 없다. 따라서 더 잘 이해되게 코드를 바꾼다.

### 절차

- 간단한 절차
  - 매개변수를 제거하려든 먼저 함수 본문에서 제거 대상 매개변수를 참조하는 곳은 없는지 확인한다.
  - 메서드 선언을 원하는 형태로 바꾼다.
  - 기존 메서드 선언을 참조하는 부분을 모두 찾아서 바뀐 형태로 수정한다.
  - 테스트한다.
- 마이그레이션 절차
  - 이어지는 추출 단계를 수월하게 만들어야 한다면 함수의 본문을 적절히 리팩터링한다.
  - 함수 본문을 새로운 함수로 추출한다.
  - 추출한 함수에 매개변수를 추가해야 한다면 '간단한 절차'를 따라 추가한다.
  - 테스트한다.
  - 기존 함수를 인라인 한다.
  - 이름을 임시로 붙여뒀다면 함수 선언 바꾸기를 한 번 더 적용해서 원래 이름으로 되돌린다.
  - 테스트한다.

## 변수 캡슐화하기(Encapsulate Variable)

```javascript
let defaultOwner = { firstName: "마틴", lastName: "파울러" };
```

```javascript
let defaultOwnerData = { firstName: "마틴", lastName: "파울러" };

export function defaultOwner() {
  return defaultOwnerData;
}

export function setDeaultOwner(arg) {
  defaultOwnerData = arg;
}
```

### 배경

&nbsp;함수는 데이터보다 다루기 수월하다. 그렇기 때문에 접근할 수 있는 범위가 넓은 데이터를 옮길 때는 먼저 그 데이터로의 접근을 독점하는 함수를 만들어서 캡슐화하는 것이 좋은 방법일 때가 많다.

### 절차

- 변수로의 접근과 갱신을 전담하는 캡슐화 함수들을 만든다.
- 정적 검사를 수행한다.
- 변수를 직접 참조하던 부분을 모두 적절한 캡슐화 함수 호출로 바꾼다. 하나씩 바꿀 때마다 테스트 한다.
- 변수의 접근 범위를 제한한다.
- 테스트한다.
- 변수 값이 레코드라면 레코드 캡슐화하기를 적용할지 고려해본다.

## 변수 이름 바꾸기(Rename Variable)

```javascript
let a = height * width;
```

```javascript
let area = height * width;
```

### 배경

&nbsp;명확한 이름은 프로그래밍의 핵심이다.

### 절차

- 폭넓게 쓰이는 변수라면 변수 캡슐화하기를 고려한다.
- 이름을 바꿀 변수를 참조하는 곳을 모두 찾아서, 하나씩 변경한다.
- 테스트한다.

## 매개변수 객체 만들기(Introduce Parameter Object)

```javascript
function amountInvoiced(startData, endData) { ... };
function amountReceived(startData, endData) { ... };
function amountOverdue(startData, endData) { ... };
```

```javascript
function amountInvoiced(aDataRange) { ... };
function amountReceived(aDataRange) { ... };
function amountOverdue(aDataRange) { ... };
```

### 배경

&nbsp;데이터 항목 여러 개가 몰려다릴 때 테이터 구조 하나로 모아준다. 이는 매개변수 수가 줄어들고, 일관성도 높여준다.

### 절차

- 적당한 데이터 구조가 아직 마련되어 있지 않다면 새로 만든다.
- 테스트한다.
- 함수 선언 바꾸기로 새 데이터 구조를 매개변수로 추가한다.
- 테스트한다.
- 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정한다. 하나씩 수정할 때마다 테스트한다.
- 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꾼다.
- 다 바꿨다면 기존 매개변수를 제거하고 테스트한다.

## 여러 함수를 클래스로 묶기(Combine Functions into Class)

```javascript
function base(aReading) { ... };
function taxableCharge(aReading) { ... };
function calculateBaseCharge(aReading) { ... };
```

```javascript
class Reading {
  base() { ... };
  taxableCharge() { ... };
  calculateBaseCharge() { ... };
}
```

### 배경

&nbsp;공통 데이터를 중심으로 긴밀하게 엮여 작동하는 함수 무리는 하나의 클래스로 묶는다. 이때 장점은 클라이언트가 핵심 데이터를 변경할 수 있고, 객체들을 일관성 있게 관리할 수 있다.

### 절차

- 함수들이 공유하는 공통 데이터 레코드를 캡슐화한다.
- 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮긴다.
- 데이터를 조작하는 로직들은 함수로 추출해서 새 클래스로 옮긴다.
