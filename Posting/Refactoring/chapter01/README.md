# 1장 리팩터링: 첫 번째 예시

&nbsp;원칙은 실제 적용 방법을 파악하기 어렵지만 예시가 있으면 모든 것이 명확해진다. 그래서 첫 부분에 예시를 먼저 보여준다.

## 자, 시작해보자!

&nbsp;연극을 외주로 받아서 공연하는 극단은 두 가지 장르, 비극(tragedy)와 희극(comedy)만 공연한다. 그리고 공연료와 별개로 포인트(Volume credit)를 지급해서 다음 의뢰 시 공연료를 할인받을 수 있다.

```javascript
// 공연료 청구서를 출력하는 코드
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let pref of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 30) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Erroe(`알 수 없는 장르: ${play.type}`);
    }
    // 포인트 적립
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력
    result += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```

## 예시 프로그램을 본 소감

&nbsp;위 코드가 수백 줄짜리 프로그램의 일부라면 이해하기가 쉽지 않다. 또한 사람은 미적 상태에 민감하고, 설계가 나쁜 시스템은 수정하기 어렵다. 따라서 프로그램의 구조부터 바로잡고 수정하는 편이 좋다.

> 프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면, 먼저 기능을 추가하기 쉬운 형태로 리팩터링하고 나서 원하는 기능을 추가한다.

첫 번째로 청구 내역을 HTML로 출력하는 기능이 필요하다고 생각해보자. 그러면 `statement()` 함수의 복잡도가 크게 증가한다. 이런 상황에서는 보통 `statement()` 함수를 복사해서 HTML을 출력하는 함수를 따로 만든다. 하지만 청구서의 작성 로직이 변경되면 기존 `statement()`함수와 새롭게 만든 HTML을 출력하는 함수 모두를 수정해야 한다. 이런 중복 코드는 골칫거리가 된다.

두 번째로 배우들이 더 많은 장르를 연기하고 싶어한다고 생각해보자. 이 변경은 공연료와 포인트 계산법에 영향을 준다.

위 두 경우와 같이 변경에 `statement()`는 항상 변경돼야 한다. 따라서 리팩토링이 필요하다.

## 리팩터링의 첫 단계

&nbsp;리팩터링할 코드 영역을 꼼꼼하게 검사해줄 테스트 코드들 부터 마련해야 한다. 또한 테스트 결과를 보고하는 방식도 자동화 시켜야 한다. 그렇지 않으면 속도가 매우 떨어지기 때문이다.

> 리팩터링하기 전에 제대로 된 테스트부터 마련한다. 테스트는 반드시 자가진단하도록 만든다.

## statement() 함수 쪼개기

&nbsp;전체 동작을 각각의 부분으로 나눌 수 있는 지점을 찾는다. `switch`문은 한 번의 공연에 대한 요금을 계산하고 있다. 이 `switch`문이 하는 작업을 `amountFor(aPerformance)`라는 이름으로 지어준다. 그리고 유효범위를 벗어나는 변수를 찾는다. `pref`와 `play`는 값을 변경하지 않기 때문에 매개변수로 전달하면 된다. 한편 `thisAmount`는 함수 안에서 값이 변하는데, 이런 변수는 조심히 다뤄야 한다. 또한 이러한 작업을 `함수 추출하기`라고 한다.

```javascript
function amountFor(perf, play) {
  let thisAmount = 0;
  switch (play.type) {
    case "tragedy":
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":
      thisAmount = 30000;
      if (perf.audience > 30) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Erroe(`알 수 없는 장르: ${play.type}`);
  }
  return thisAmount;
}
```

그러면 `statement()`함수를 다음과 같이 변경할 수 있다.

```javascript
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let pref of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);
    // 포인트 적립
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력
    result += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```

> 리팩터링은 프로그램 수정을 작은 단계로 나눠 진행한다. 그래서 중간에 실수하더라도 버그를 쉽게 찾을 수 있다.

함수를 추출하고 나면 지금보다 명확하게 표현할 수 있는 간단한 방법을 찾아본다. 변수 이름을 바꿔본다.

```javascript
// 명확한 이름으로 변경(result와 aPerformance)
function amountFor(aPerformance, play) {
  let result = 0;
  ...
}
```

좋은 코드라면 하는 일이 명확히 드러나야 한다. 이에 변수 이름은 큰 기여를 한다.

다음은 play 변수 제거하기다. `aPerformance`는 값이 변경된다. 하지만 `play`는 `aPerormance`에서 얻기 때문에 매개변수가 될 필요가 없다. 따라서 `임시 변수를 질의 함수로 바꾸기`작업을 통해 이 문제를 해결한다.

```javascript
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
```

그러면 반복문 내부를 다음과 같이 고칠 수 있다.

```javascript
function statement(invoice, plays) {
  ...
  for (let pref of invoice.performances) {
    const play = playFor(perf);
    ...
  }
  ...
}
```

다음으로 `변수 인라인하기`를 적용한다.

```javascript
function statement(invoice, plays) {
  ...
  for (let pref of invoice.performances) {
    let thisAmount = amountFor(perf, playFor(perf));
    ...
  }
  ...
}
```

그러면 자연스럽게 `amountFor()`의 두 번째 인자 값을 `playFor(perf)`로 변경할 수 있기 때문에 최종적으로 `statement()`함수는 다음과 같이 변한다.

```javascript
function statement(invoice, plays) {
  ...
  for (let pref of invoice.performances) {
    let thisAmount = amountFor(perf);
    ...
  }
  ...
}

function amountFor(perf) {
  ...
  switch (playFor(perf).type) {
    ...
    default:
      throw new Erroe(`알 수 없는 장르: ${playFor(perf).type}`);
  }
  ...
}
```

`statement()`함수의 반복문 안에서 `amountFor(perf)`는 임시 변수 `thisAmount`를 사용하는데, 값이 변하지 않기 때문에 다시 `변수 인라인하기`를 적용한다.

```javascript
function statement(invoice, plays) {
  ...
  for (let pref of invoice.performances) {
    ...
    // 청구 내역을 출력
    result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += amountFor(perf);
  }
  ...
}
```

다음은 적립 포인트 계산 코드를 추출한다.

```javascript
function volumeCreditsFor(aPerformance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === playFor(perf).type) result += Math.floor(aPerformance.audience / 5);
  return result;
}

function statement(invoice, plays) {
  ...
  for (let pref of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
    // 청구 내역을 출력
    result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += amountFor(perf);
  }
  ...
}
```

임시 변수는 나중에 문제를 일으킬 수 있다. 따라서 `format`을 제거한다.

```javascript
function format(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let pref of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
    // 청구 내역을 출력
    result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```

그런데 `format()`함수만 봐서는 함수가 하는 일을 충분히 설명해주지 못한다. 이 함수의 핵심은 화폐 단위 맞추기이기 때문에 `함수 선언 바꾸기`를 적용한다.

```javascript
function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100); // 단위 변환 로직을 함수 안으로 이동
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let pref of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
    // 청구 내역을 출력
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```

다음은 `volumeCredit`변수를 제거한다. 이 변수는 값을 누적하기 때문에 리팩터링하기 까다롭다. `반복문 쪼개기`를 통해 값이 누적되는 부분을 분리한다.

```javascript
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let pref of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }
  for (let pref of invoice.performances) { {
    volumeCredits += volumeCreditsFor(perf);
  }

  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```

이어서 `문장 슬라이드하기`를 적용해서 `volumeCredits`변수를 선언하는 문장을 반복문 앞으로 옮긴다. 그러면 `임시 변수 질의 함수로 바꾸기`를 수월하게 할 수 있다. `volumeCredits` 값 계산 코드를 `함수로 추출`한다.

```javascript
function totalVolumeCredits() {
  let volumeCredits = 0;
  for (let pref of invoice.performances) { {
    volumeCredits += volumeCreditsFor(perf);
  }
  return volumeCredits;
}
```

그리고 `volumeCredits`값을 `변수를 인라인`할 차례다.

```javascript
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let pref of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
    totalAmount += amountFor(perf);
  }

  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
}
```

지금까지 `volumeCredits`변수를 제거하는 작업의 단계는 다음과 같다.

- 반복문 쪼개기
- 문장 슬라이드하기
- 함수 추출하기
- 변수 인라인하기

다음으로 `totalAmount`변수도 똑같은 절차로 제거한다.

```javascript
function totalAmount() {
  let result = 0;
  for (let pref of invoice.performances) { {
    result += amountFor(perf);
  }
  return result;
}

function totalVolumeCredits() {
  let result = 0;
  for (let pref of invoice.performances) { {
    result += volumeCreditsFor(perf);
  }
  return result;
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let pref of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
}
```

## 중간 점검: 난무하는 중첩 함수

```javascript
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let pref of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  function totalAmount() {
    let result = 0;
    for (let pref of invoice.performances) {
      result += amountFor(perf);
      return result;
    }
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let pref of invoice.performances) {
      result += volumeCreditsFor(perf);
      return result;
    }
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100); // 단위 변환 로직을 함수 안으로 이동
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let thisAmount = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        thisAmount = 40000;
        if (aPerformance.audience > 30) {
          thisAmount += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (aPerformance.audience > 30) {
          thisAmount += 10000 + 500 * (aPerformance.audience - 20);
        }
        thisAmount += 300 * aPerformance.audience;
        break;
      default:
        throw new Erroe(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return thisAmount;
  }
}
```

## 계산 단계와 포맷팅 단계 분리하기

&nbsp;이제 원하던 `statement()`의 HTML버전을 만들어보자. 하지만 분리된 계산 함수들이 `statement()`의 중첩 함수로 들어가 있다. 텍스트 버전과 HTML버전 함수가 모두 똑같은 계산 함수를 사용하게 만들고 싶을 때 `단계 쪼개기`를 사용한다. 첫 번째 단계에서 두 번째 단계로 전달하 중간 데이터 구조를 생성하는 구조다.

단계를 쪼개려면 먼저 두 번째 단계가 될 코드들을 `함수 추출하기`로 뽑아내야 한다.

```javascript
function statement(invoice, plays) {
  return renderPlainText(invoice, plays); // 본문 전체를 별도 함수로 추출
}

function renderPlainText(invoice, plays) {
  // 본문 전체를 별도 함수로 추출
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let pref of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
  ...
}
```

다음으로 두 단계 사이에 중간 데이터 구조 역할을 할 객체를 만든다.

```javascript
function statement(invoice, plays) {
  const statementData = {};
  return renderPlainText(statementData, invoice, plays);
}

function renderPlainText(data, invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let pref of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
  ...
}
```

그리고 계산 관련 코드는 전부 `statement()`함수로 모으고 `renderPlainText()`는 매개변수로 전달된 데이터만 처리하게 만들 수 있다. 또한 연극 제목도 중간 데이터 구조에서 가져온다.

```javascript
function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance); // 얕은 복사
    result.play = playFor(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  return renderPlainText(statementData, plays);
}

function renderPlainText(data, plays) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let pref of data.performances) {
    // data의 play정보를 사용하도록 변경
    result += ` ${perf.play.name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
  ...
}
```

위와 똑같은 방법으로 `amountFor()`, `volumeCreditsFor()`, `totalAmount()`도 옮긴다. 그리고 `가볍게 파이프라인으로 바꾸기`까지 적용한다.

```javascript
function totalAmount(data) {
  // array.reduce(reducer(accumulator, currentVal, index, sourceArr), initVal)
  return data.performances.reduce((total, p) => total + p.amount, 0);
}

function totalVolumeCredits(data) {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}
```

`statement()`에 필요한 데이터 처리하는 코드를 별도 함수로 빼낸다. 그리고 두 파일로 나눈다. 간단하게 변수명도 변경한다.

```javascript
// statement.js
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data, plays) { ... };
function htmlStatement(invoice, plays) { ... };
function renderHtml(data) { ... };
function usd(aNumber) { ... };

// createStatementData.js
export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) { ... };
  function playFor(aPerformance) { ... };
  function amountFor(aPerformance) { ... };
  function volumeCreditsFor(aPerformance) { ... };
  function totalAmount(data) { ... };
  function totalVolumeCredits(data) { ... };
}
```

## 다형성을 활용해 계산 코드 재구성하기

&nbsp;이번에는 연극 장르를 추가하고 장르마다 다른 공연료와 다른 적립 포인트 계산법을 지정하도록 코들르 수정한다. `amountFor()`의 `switch`문은 조건부 로직으로 적절히 보완해야 한다. 다형성을 이용해서 조건부 로직을 명확한 구조로 보완한다. 이를 `조건부 로직을 다형성으로 바꾸기`라고 한다.

`enrichPerformance()`는 조건부 로직을 포함한 함수인 `amountFor()`과 `volumeCreditsFor()`를 호출한다. 그래서 이 두 함수를 전용 클래스로 옮긴다. 이 클래스를 `PerformanceCalculator`라고 한다. `함수 선언 바꾸기`를 적용하여 공연할 연극을 계산기로 전달한다.

```javascript
function enrichPerformance(aPerformance) {
  const calculator = new PerformanceCalculator(
    aPerformance,
    playFor(aPerformance)
  );
  const result = Object.assign({}, aPerformance);
  result.play = calculator.play;
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);
  return result;
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }
}
```

그리고 `함수 옮기기`작업으로 차근차근 진행한다. 공연료 게산, 적립 포인트 계산 코드들을 계산기 클래스 안으로 복사한다. 그리고 `함수를 인라인`하여 새 함수를 직접 호출하도록 수정한다.

```javascript
function enrichPerformance(aPerformance) {
  const calculator = new PerformanceCalculator(
    aPerformance,
    playFor(aPerformance)
  );
  const result = Object.assign({}, aPerformance);
  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;
  return result;
}
```

이제 다형성을 지원하게 만들어보자. `타입 코드를 서브클래스로 바꾸기`를 한다. 하지만 자바스크립트에서는 생성자가 서브클래스의 인스턴스를 반환할 수 없기 때문에 `생성자를 팩터리 함수로 바꾸기`를 적용한다. `TragedyCalculator`, `ComedyCalculator`에 `amount`를 오버라이드한다.

```javascript
function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
  return new PerformanceCalculator(aPerformance, aPlay);
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    result = 40000;
    if (this.aPerformance.audience > 30) {
      result += 1000 * (this.aPerformance.audience - 30);
    }
    return result;
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    result = 30000;
    if (this.aPerformance.audience > 30) {
      result += 10000 + 500 * (this.aPerformance.audience - 20);
    }
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

function enrichPerformance(aPerformance) {
  const calculator = createPerformanceCalculator(
    aPerformance,
    playFor(aPerformance)
  );
  const result = Object.assign({}, aPerformance);
  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;
  return result;
}
```

## 상태 점검: 다형성을 활용하여 데이터 생성하기

&nbsp;이제 새로운 장르를 추가하려면 해당 서브클래스를 작성하고 `createPerformanceCalculator()`에 추가하면 된다.

## 마치며

&nbsp;크게 세 단계의 리팩터링을 진행했다.

- 원본 함수를 중첩 함수 여러 개로 나누기
- `단계 쪼개기`를 이용한 계산 코드와 출력 코드 분리
- 계산 로직을 다형성으로 표현

> 좋은 코드를 가늠하는 확실한 방법은 '얼마나 수정하기 쉬운가'다.
