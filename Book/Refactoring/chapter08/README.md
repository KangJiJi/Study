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

## 문장을 함수로 옮기기(Move Statements into Function)

```javascript
result.push(`<p>제목: ${person.pohoto.title}</p>`);
result.concat(photoData(person.photo));

function photoData(aPhoto) {
  return [
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>날짜: ${aPhoto.date.toDataString()}</p>`,
  ];
}
```

```javascript
result.concat(photoData(person.photo));

function photoData(aPhoto) {
  return [
    `<p>제목: ${person.pohoto.title}</p>`,
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>날짜: ${aPhoto.date.toDataString()}</p>`,
  ];
}
```

### 배경

&nbsp;중복 제거는 중요하다. 예를들어 특정 ㅎ마수를 호출하는 코드가 나올 때마다 그 앞이나 뒤에서 똑같은 코드가 추가로 실행되는 모습은 반복되는 부분을 피호출 함수로 합치는게 좋다. 피호출 함수와 한 몸은 아니지만 꼭 같이 호출돼야 하는 경우라면 해당 문장들과 피호출 함수를 통째로 하나의 함수로 호출한다.

### 절차

- 반복 코드를 호출 부분 근처로 옮긴다.
- 호출자가 둘 이상이면 호출자 중 하나에서 다른 함수로 추출한다. 추출한 함수에 기억하기 쉬운 임시 이름을 붙여준다.
- 다른 호출자가 방금 추출한 함수를 사용하도록 수정한다.
- 원래 함수를 새로운 함수 안으로 인라인한 후 원래 함수를 제거한다.
- 새로운 함수의 이름을 원래 함수의 이름으로 바꿔준다.

## 문자을 호출한 곳으로 옮기기(Move Statements to Callers)

```javascript
emitPhotoData(outStream, person.photo);

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${person.pohoto.title}</p>`);
  outStream.write(`<p>위치: ${aPhoto.location}</p>`);
}
```

```javascript
emitPhotoData(outStream, person.photo);
outStream.write(`<p>위치: ${aPhoto.location}</p>`);

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${person.pohoto.title}</p>`);
}
```

### 배경

&nbsp;함수는 프로그래머가 쌓아 올리는 추상화의 기본 빌딩 블록이다. 초기에는 응집도 높고 한 가지 일만 수행하던 함수가 어느새 둘 이상의 다른 일을 수행하게 바뀔 수 있다. 달라지는 동작을 문장 호출한 곳으로 옮기기 리팩터링을 적용하면 필요할 때마다 독립적으로 수정할 수 있다.

### 절차

- 호출자가 한두 개뿐이고 피호출 함수도 간단한 단순한 상황이면, 피호출 함수의 처음줄을 잘라내어 호출자로 복사해 넣는다.
- 더 복잡한 상황에서는, 이동하지 않길 원하는 모든 문자을 함수로 추출한 다음 검색하기 쉬운 임시 이름을 지어준다.
- 원래 함수를 인라인한다.
- 추출된 함수의 이름을 원래 함수의 이름으로 변경한다.

## 인라인 코드를 함수 호출로 바꾸기(Replace Inline Code with Function Call)

```javascript
let appliesToMass = false;
for (const s of states) {
  if (s === "MA") appliesToMass = true;
}
```

```javascript
appliesToMass = states.includes("MA");
```

### 배경

&nbsp;이미 존재하는 함수와 똑같은 일을 하는 인라인 코들르 발견하면 함수호출로 대체해야한다.

### 절차

- 인라인 코드를 함수 호출로 대체한다.
- 테스트한다.

## 문장 슬라이드하기(Slide Statements)

```javascript
const pricingPlan = retrievePricingPlan();
const order = retreiveOrder();
let charge;
const chargePerUnit = pricingPlan.unit;
```

```javascript
const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retreiveOrder();
let charge;
```

### 배경

&nbsp;관련된 코드들이 가까이 모여 있다면 이해하기가 더 쉽다. 따라서 관련 코드끼리 모아야한다. 다만 슬라이드가 안전한지 판단하려면 코드를 완벽히 이해해야 한다. 따라서 테스트코드가 중요한 역할을 한다.

### 절차

- 코드가 이동할 목표 위치를 찾는다.
- 코드 조각을 원래 위치에서 잘라내어 목표 위치에 붙여 넣는다.
- 테스트한다.

## 반복문 쪼개기(Split Loop)

```javascript
let averageAge = 0;
let totalSalary = 0;

for (const p of people) {
  arverageAge += p.age;
  totalSalary += p.salary;
}

averageAge = averageAge / people.length;
```

```javascript
let averageAge = 0;
for (const p of people) {
  arverageAge += p.age;
}

let totalSalary = 0;
for (const p of people) {
  totalSalary += p.salary;
}

averageAge = averageAge / people.length;
```

### 배경

&nbsp;종종 반복문 하나에서 두 가지 일을 수행한다. 하지만 각각의 반복문으로 분리해두면 수정할 동작 하나만 이해하면 된다. 또한 서로 다른 일들이 한 함수에서 이뤄지고 있다는 신호일 수 있다. 따라서 함수 추출하기랑 같이 수행하는 일이 잦다.

### 절차

- 반복문을 복제해 두 개로 만든다.
- 반복문이 중복되어 생기는 부수효과를 파악해서 제거한다.
- 테스트한다.
- 완료됐으면, 각 반복문을 함수로 추출할지 고민해본다.

## 반복문을 파이프라인으로 바꾸기(Replace Loop with Pipeline)

```javascript
const names = [];

for (const i of input) {
  if (i.job === "rogrammer") {
    names.push(i.name);
  }
}
```

```javascript
const names = input.filter((i) => i.job === "programmer").map((i) => i.name);
```

### 배경

&nbsp;컬렉션 파이프라인(list.filter().map()...)을 이용하면 처리 과정을 일련의 연산으로 표현할 수 있다. 대표적으로 map과 filter가 있다. 논리를 파이프라인으로 표현하면 이해하기 훨씬 쉬워진다.

### 절차

- 반복문에서 사용하는 컬렉션을 가리키는 변수를 하나 만든다.
- 반복문의 첫 줄부터 시작해서, 각각의 단위 행위를 적절한 컬렉션 파이프라인 연산으로 대체한다.
- 반복문의 모든 동작을 대체했다면 반복문 자체를 지운다.

## 죽은 코드 제거하기(Remove Dead Code)

```javascript
if (false) {
  doSomethingThatUsedToMatter();
}
```

```javascript
X;
```

### 배경

&nbsp;코드가 더 이상 사용되지 않게 됐다면 지워야 한다.

### 절차

- 죽은 코드를 외부에서 참조할 구 있는 경우라면 혹시라도 호출하는 곳이 있는지 확인한다.
- 없다면 죽은 코드를 제거한다.
- 테스트한다.
