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
