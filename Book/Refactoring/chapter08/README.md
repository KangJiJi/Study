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
