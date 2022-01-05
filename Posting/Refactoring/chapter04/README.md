# 테스트 구축하기

&nbsp;리팩터링을 위해서는 견고한 테스트가 뒷받침돼야 한다.

## 자가 테스트 코드의 가치

&nbsp;모든 테스트를 완전히 자동화하고 그 결과까지 스스로 검사한다. 자동화 된 테스트는 버그를 찾는 시간을 줄이고, 생산성을 극대화 시켰다.

코드를 짜기 전에 테스트 코드를 작성해야 한다. 이런 방식은 구현보다 인터페이스에 집중하게 도와준다. 이것이 TDD다.

## 테스트할 샘플 코드

&nbsp;사용자가 생산 계획을 검토하고 수정하도록 해주는 어플리케이션의 코드다.

## 첫 번째 테스트

&nbsp;다음과 같이 `Mocha`를 이용해서 테스트를 할 수 있다.

```javascript
describe("province", function () {
  it("shortfall", function () {
    const asia = new Province(sampleProvinceData()); // 픽스처 설정
    expect(asia.shortfall).equal(5); // 검증(Chai 라이브러리)
  });
});
```

테스트는 실패 할 상황에서는 실패해야 한다. 따라서 실패 상황을 검증하기 위해 코드에 오류를 주입해보는 것도 좋은 방법이다.

## 테스트 추가하기

&nbsp;클래스의 모든 일을 살펴보고 각각의 기능에서 오류가 생길 수 잇는 조건을 하나씩 테스트한다. 테스트는 위험 요인을 중심으로 작성해야 한다. 다음과 같이 총수익 계산 테스트를 추가할 수 있다.

```javascript
describe("province", function () {
  it("shortfall", function () {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).equal(5);
  });

  it("profit", function () {
    const asia = new Province(sampleProvinceData());
    expect(asia.profit).equal(230);
  });
});
```

하지만 위 코드에서 `Province`인스턴스 생성 코드가 중복이다. 하지만 그냥 바깥 범위로 인스턴스 생성 코드를 옮기면 테스트끼리 상호작용하게 하는 공유 픽스처를 생성하게 된다. 따라서 `beforeEach`를 이용한다. 그러면 모든 테스트를 독립적으로 구성할 수 있다.

## 픽스처 수정하기

&nbsp;`beforeEach`블록의 픽스처를 `it`블록에서 수정해서 검증할 수 있다. 또한 `it`블록에서는 하나의 검증만 하는게 좋지만, 한 테스트로 묶어도 될 정도면 괜찮다.

## 경계 조건 검사하기

&nbsp;범위를 벗어나는 경계 지점에서의 테스트를 작성하는 것이 좋다.

```javascript
describe("province", function () {
  let noProducers;
  beforeEach(function () {
    const data = {
      name: "No producers",
      producers: [], // 비어있을 때
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });

  it("shortfall", function () {
    expect(noProducers.shortfall).equal(30);
  });

  it("profit", function () {
    expect(noProducers.profit).equal(0);
  });
});
```

위와같이 `producers`가 비어있을 때 어떤일이 일어나는지 확인한다. 또한 숫자형이면 0일때나 음수일 떄를 테스트해본다. 이렇게 경계를 확인하는 테스트를 작성하면 특이 상황을 어떻게 처리하는 게 좋을지 생각할 수 있다.

## 끝나지 않은 여정

&nbsp;위 테스트는 단위 테스트(Unit test)에 해당한다. 다른 여러 테스트도 있다. 버그를 찾으면 버그를 드러내는 단위 테스트부터 작성해라.
