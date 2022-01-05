# 조건부 로직 간소화

## 조건문 분해하기(Decompose Conditional)

```javascript
if (!aData.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
  charge = quantity * plan.summerRate;
else charge = quantity * plan.regularRate + plan.regularServiceCharge;
```

```javascript
if (summer()) charge = summerCharge();
else charge = regularCharge();
```

### 배경

&nbsp;복잡한 조건부 로직은 프로그램을 복잡하게 만든다. 따라서 코드를 부위별로 분해한 다음 해체된 코드 덩어리들을 각 덩어리의 의도를 살린 이름의 함수 호출로 바꾼다. 이렇게 되면 분기한 이유 역시 더 명확해진다.

### 절차

- 조건식과 그 조건식에 딸린 조건절 각각을 함수로 추출한다.

## 조건식 통합하기(Consolidate Conditional Expression)

```javascript
if (anEmployee.seniority < 2) return 0;
if (anEmployee.monthDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;
```

```javascript
if (isNotEligibleForDisability()) return 0;

function isNotEligibleForDisability() {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthDisabled > 12 ||
    anEmployee.isPartTime
  );
}
```

### 배경

&nbsp;`and`연산자와 `or`연산자를 사용하면 여러 개의 비교 로직을 하나로 합칠 수 있다. 하나로 통합함으로써 내가 하려는 일이 더 명확해진다. 또한 조건식을 통합하기는 함수 추출하기까지 이어질 가능성이 높다. 그래서 코드를 통합하는 것이다.

### 절차

- 해당 조건식들 모두에 부수효과가 없는지 확인한다.
- 조건문 두 개를 선택하여 두 조건문의 조건식들을 논리 연산자로 결합한다.
- 테스트한다.
- 조건이 하나만 남을 때까지 위 과정을 반복한다.
- 하나로 합쳐진 조건식을 함수로 추출할지 고려해본다.

## 중첩 조건문을 보호 구문으로 바꾸기(Replace Nested Conditional with Guard Clauses)

```javascript
function getPayAmount() {
  let result;
  if (isDead) result = deadAmount();
  else {
    if (isSeparated) result = separatedAmount();
    else {
      if (isRetired) result = retiredAmount();
      else result = normalPayAmount();
    }
  }
}

return result;
```

```javascript
function getPayAmount() {
  if (isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if (isRetired) return retiredAmount();
  return normalPayAmount();
}
```

### 배경

&nbsp;`if-else`문에서 한쪽만 정상이라면 비정상 조건을 `if`에서 검사한다. 이를 `보호 구문`이라고 한다. 핵심은 의도를 부각하는 것이다. `보호 구문`은 함수의 핵심이 아니라 함수를 빠져나오는 것을 의미한다.

### 절차

- 교체해야 할 조건 중 가장 바깥 것을 선택하여 보호 구문으로 바꾼다.
- 테스트한다.
- 위 과정을 반복한다.
- 모든 보호 구문이 같은 결과를 반환한다면 보호 구문들의 조건식을 통합한다.

## 조건부 로직을 다형성으로 바꾸기(Replace Conditional with Polymorphism)

```javascript
switch (bird.type) {
  case "유럽 제비":
    return "보통이다";
  case "아프리카 제비":
    return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  case "노르웨이 파랑 앵무":
    return bird.voltage > 100 ? "그을렸다" : "예쁘다";
  default:
    return "알 수 없다";
}
```

```javascript
class EuropeanSwallow {
  get plumage() {
    return "보통이다";
  }
}

class AfricanSwallow {
  get plumage() {
    return this.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  }
}

class NorwegianBlueParrot {
  get plumage() {
    return this.voltage > 100 ? "그을렸다" : "예쁘다";
  }
}
```

### 배경

&nbsp;클래스와 다형성을 이용해서 복잡한 조건부 로직을 분리할 수 있다.

### 절차

- 다형적 동작을 표현하는 클래스들이 아직 없다면 만들어준다. 이왕이면 적합한 인슽ㄴ스를 알아서 만들어 반환하는 팩터리 함수도 함께 만든다.
- 호출하는 코드에서 팩터리 함수를 사용하게 된다.
- 조건부 로직 함수를 슈퍼클래스로 옮긴다.
- 서브클래스 중 하나를 선택한다. 서브클래스에서 슈퍼클래스의 조건부 로직 메서드를 오버라이드한다. 조건부 문장 중 선택된 서브클래스에 해당하는 조건절을 서브클래스 메서드로 복사한 다음 적절히 수정한다.
- 같은 방식으로 각 조건절을 해당 서브클래스에서 메서드로 구현한다.
- 슈퍼클래스 메서드에는 기본 동작 부분만 남긴다. 혹은 슈퍼클래스가 추상 클래스여야 한다면, 이 메서드를 추상으로 선언하거나 서브클래스에서 처리해야 함을 알리는 에러를 던진다.

## 특이 케이스 추가하기(Introduce Special Case)

```javascript
if (aCustomer === "미확인 고객") customerName = "거주자";
```

```javascript
class UnknoewnCustomer {
  get name() {
    return "거주자";
  }
}
```

### 배경

&nbsp;특정 값을 확인한 후 똑같은 동작을 수행하는 코드는 중복 코드 중 하나다. 이를 해결하기 위해서 특이 케이스 패턴(Special Case Pattern)을 사용한다. 특히 Null은 특이 케이스로 처리해야 할 때가 많기 때문에 널 객체 패턴(Null Object Pattern)이라고도 한다.

### 절차

- 컨테이너에 특이 케이스인지를 검사하는 속성을 추가하고, false를 반환하게 한다.
- 특이 케이스 객체를 만든다. 이 객체는 특이 케이스인지 검사하는 속성만 포함하며, 이 속성은 true를 반환하게 한다.
- 클라이언트에서 특이 케이스인지를 검사하는 코드를 함수로 추출한다. 모든 클라이언트가 값을 직접 비교하는 대신 방금 추출한 함수를 사용하도록 고친다.
- 코드에 새로운 특이 케이스 대상을 추가한다. 함수의 반환 값으로 받거나 변환 함수를 적용하면 된다.
- 특이 케이스를 검사하는 함수 본문을 수정하여 특이 케이스 객체의 속성을 사용하도록 한다.
- 테스트한다.
- 여러 함수를 클래스로 묶기나 여러 함수를 변환 함수로 묶기를 적용하여 특이 케이스를 처리하는 공통 동작을 새로운 요소로 옮긴다.
- 아직도 특이 케이스 검사 함수를 이용하는 곳이 남아 있다면 검사 함수를 인라인한다.

## 어서션 추가하기(Introduce Assertion)

```javascript
if (this.discountRate) base -= this.discountRate * base;
```

```javascript
assert(this.discountRate >= 0);
if (this.discountRate) base -= this.discountRate * base;
```

### 배경

&nbsp;Assertion을 이용해서 조건부 문장을 삽입해서 특정 조건을 만족하는지를 알 수 있다. 또한 오류 찾기를 넘어서 소통 도구로 사용할 수 있다.

### 절차

- 참이라고 가정하는 조건이 보이면 그 조건을 명시하는 어서션을 추가한다.

## 제어 플래그를 탈출문으로 바꾸기(Replace Control Flag with Break)

```javascript
for (const p of prople) {
  if (!found) {
    if (p === "joker") {
      sendAlert();
      found = true;
    }
  }
}
```

```javascript
for (const p of people) {
  if (p === "joker") {
    sendAlert();
    break;
  }
}
```

### 배경

&nbsp;제어 프래그 대신 break문 continue문을 사용하자.

### 절차

- 제어 플래그를 사용하는 코드를 함수로 추출할지 고려한다.
- 제어 플래그를 갱신하는 코드 각각을 적절한 제어문으로 바꾼다. 하나 바꿀 때마다 테스트한다.
- 모두 수정했다면 제어 플래그를 제거한다.
