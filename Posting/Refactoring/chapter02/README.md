# 리팩터링 원칙

## 리팩터링 정의

&nbsp;리팩터링을 명사로 사용할 수 있고 동사로도 사용할 수 있다.

> 명사: 소프트웨어의 겉보기 동작은 그대로 유지한 채, 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법

> 동사: 소프트웨어의 겉보기 동작은 그대로 유지한 채, 여러 가지 리팩터링 기법을 적용해서 소프트웨어를 재구성하다.

리팩터링하기 전과 후에 코드는 똑같이 동작해야 하며, 리팩터링 과정에서 발견 된 버그는 리팩터링 후에도 그대로 남아있어야 한다.

## 두 개의 모자

&nbsp;소프트웨어 개발에서 `기능 추가`혹은 `리팩터링`을 확실하게 구분해야 한다. `기능 추가`작업을 할 때는 새 기능을 추가하기만 하고, `리팩터링`작업을 할 때는 오로지 코드 재구성에만 전념한다.

## 리팩터링하는 이유

&nbsp;리팩터링은 만병통치약은 아니지만, 코드를 건강한 상태로 유지하는 데 도와준다.

1. 리팩터링하면 소프트웨어 설계가 좋아진다
2. 리팩터링하면 소프트웨어를 이해하기 쉬워진다
3. 리팩터링하면 버그를 쉽게 찾을 수 있다
4. 리팩터링하면 프로그래밍 속도를 높일 수 있다

## 언제 리팩터링해야 할까?

&nbsp;다음은 돈 로버츠가 제시한 가이드다.

- 처음에는 그냥 한다.
- 비슷한 일을 두 번째로 하게 되면, 일단 계속 진행한다.
- 비슷한 일을 세 번째 하게 되면 리팩터링한다.

### 준비를 위한 리팩터링: 기능을 쉽게 추가하게 만들기

&nbsp;새로운 기능을 추가하기 직전 구조를 살짝 바꾸면 다른 작업을 하기 쉬워질 부분을 찾는다. 그저 기능을 추가하기만 하면 나중에 번거러울 수 있다.

### 이해를 위한 리팩터링: 코드를 이해하기 쉽게 만들기

&nbsp;코드의 의도가 더 명확하게 드러나도록 리팩터링할 여지를 찾아본다. 어떤 역할을 하는지 이해된 변수는 적절한 이름으로 바꾸고, 긴 함수를 작게 나누기도 한다. 그러면 자연스럽게 코드를 이해할 수 있다.

### 쓰레기 줍기 리팩터링

&nbsp;현재 간단히 고칠 수 있는 것은 즉시 고치고, 시간이 걸리는 일은 나중에 처리한다. 조금이나마 현재 개선해두는 것이 좋다.

### 계획된 리팩터링과 수시로 하는 리팩터링

&nbsp;보기 싫은 코드를 발견하면 리팩터링해라. 또한 잘 작성된 코드도 앞으로 계속 리팩터링 될 것이다. 리팩터링 작업은 기회가 될 때마다 해야 하며, 리팩터링에 소홀했다면 그 때 리팩터링을 계획하면 된다.

### 오래 걸리는 리팩터링

&nbsp;오래 걸리는 리팩터링도 있다. 팀 전체가 리팩터링에 매달리지 말고, 몇 주에 걸쳐 조금씩 해결해가는 편이 좋을 때가 많다.

### 코드 리뷰에 리팩터링 활용하기

&nbsp;코드 리뷰는 타인의 아이디어나 생각을 들을 수 있기 때문에 좋다. 타인의 코드 리뷰를 하면서 리팩터링하면 좋은 아이디어가 떠오르기도 한다. `Pair programming`도 좋은 방법 중 하나다.

### 관리자에게는 뭐라고 말해야 할까?

&nbsp;리팩터링은 소프트웨어를 빠르게 만드는 데 아주 효과적이다. 현재 소프트웨어 동작 방식을 이해할 때도 리팩터링부터 하는 것이 빠르다. 알아서 설득시키자.

### 리팩터링하지 말아야 할 때

&nbsp;지저분한 코드라도 굳이 수정할 필요가 없다면 리팩터링하지 않는다. 새로 작성하는 게 쉬울 때도 리팩터링하지 않는다.

## 리팩터링 시 고려할 문제

&nbsp;리팩터링에 대한 문제점에 대해서도 언제 발생하고 어떻게 대처해야 할지를 반드시 알고 있어야 한다.

### 새 기능 개발 속도 저하

&nbsp;리팩터링의 궁극적인 목적은 개발 속도를 높히는 것이다. 하지만 상황에 맞게 조율해야 한다. 그렇다고 전혀 하지 않으면 안된다. 건상한 코드가 결국 생산성의 증가를 가지고 온다.

### 코드 소유권

&nbsp;코드 소유권이 나뉘어 있으면 리팩터링에 방해가 된다. 그래도 리팩터링이 가능하다. 그러나 코드는 점점 복잡해진다. 따라서 코드 소유권은 느슨하게 정하고 오픈소스 개발 모델을 권장한다.

### 브랜치

&nbsp;어떤 기능을 한 브랜치에 구현하고 배포할 때 마스터에 통합하는 경우가 많다. 하지만 독립 브랜치에서 작업하는 기간이 길어질수록 마스터로 통합하기 어려워진다. 그래서 마스터를 개인 브랜치로 Rebase 혹은 Merge 하지만 여러 브랜치에서 동시에 기능이 개발되면 이런 방식으로 해결하기도 어렵다. 따라서 CI(Continuous Integration)를 통해 하루에 한 번은 마스터와 통합한다. 이는 Merge의 복잡도를 상당히 낮출 수 있다. CI를 완벽히 적용하지는 못하더라도 통합 주기만큼은 짧게 잡아야 한다.

### 테스팅

&nbsp;리팩터링하기 위해서는 자가 테스트 코드를 마련해야 한다. 빠르게 버그를 찾을 수 있고, 새 기능도 안전하게 추가할 수 있다. 따라서 견고한 테스트를 마련해야 한다.

### 레거시 코드

&nbsp;레거시 코드는 대체로 복잡하고 테스트도 제대로 갖춰지지 않은 것이 많다. 그리고 리팩토링은 레거시 시스템 이해에 도움이 된다. 나눠서 하나씩 공략해야 한다.

### 데이터베이스

&nbsp;데이터 마이그레이션 스크립트를 작성하고, 접근 코드와 데이터베이스 스키마에 대한 구조적 변경을 이 스크립트로 처리하게끔 통합한다.

## 리팩터링, 아키텍처, 애그니(YAGNI)

&nbsp;오래된 소프트웨어도 리팩터링을 통해 구조를 변경할 수 있다. 하지만 테스트가 뒷받침해주지 못하면 어렵다. 우리는 가끔 유연성 메커니즘을 소프트웨어에 심어둔다. 가령 함수를 정의할 때 다양한 시나리오에 대응하기 위해서 매개변수를 추가한다. 이런 매개변수가 유연성 매커니즘이다. 그러나 오히려 변화에 대응하는 능력을 떨어뜨릴 때가 대부분이다. 따라서 현재 요구사항을 해결하는 소프트웨어를 구축하고, 리팩터링을 통해 지속적으로 기능을 더해간다. 이런 설계를 다음과 같이 부른다.

- 간결한 설계
- 점진적 설계
- YAGNI

## 리팩터링과 소프트웨어 개발 프로세스

&nbsp;자가 테스트 코드와 리팩터링을 함께 진행하는 프로세스가 TDD다. 리팩터링의 첫 번째 토대는 자가 테스트 코드다. 또한 팀에서 다른 사람의 작업을 방해하지 않고 언제든지 리팩터링이 가능해야 한다. 이것이 CI를 권장하는 이유다.

- 리팩터링
- 자가 테스트 코드
- CI(지속적 통합)

위 세 기법은 서로 강력한 시너지를 발휘한다. 요구사항 변화에 빠르게 대응하고, 안정적인 선순환 구조를 코드베이스에 심을 수 있다.

## 리팩터링과 성능

&nbsp;리팩터링을 하면 성능을 튜닝하기 쉬워진다. 다음은 빠른 소프트웨어를 위한 방법 세 가지다.

- 시간 예산 분배 방식
- 끊임없이 관심을 기울이기
- 프로파일러 프로그램을 분석하여 시간과 공간을 많이 잡아먹는 지점을 알아내고, 최척화 한다.

평소에 리팩터링을 잘 해두면 성능 튜닝에 투입할 시간을 벌 수 있고, 성능을 더 세밀하게 분석할 수 있다.

## 리팩터링의 유래

&nbsp;정확한 유래는 찾을 수 없다. 하지만 현재는 코드를 재구성하는 모든 작업을 가리키는 느슨한 의미로 사용된다.

## 리팩터링 자동화

&nbsp;자동 리팩터링을 제대로 구현하기 위해서는 코드를 `구문 트리`로 해석해서 다뤄야 한다. 또한 가끔은 IDE가 잘못하는 경우도 있어서 테스트를 꾸준히 해줘야 한다.

## 더 알고 싶다면

&nbsp;다른 책 찾아보자.