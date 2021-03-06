03 타입과 추상화
================

*일단 컴퓨터를 조작하는 것이 추상화를 구축하고, 조작하고, 추론하는 것에 관한 모든 것이라는 것을 깨닫고 나면 (훌륭한) 컴퓨터 프로그램을 작성하기 위한 중요한 전제 조건은 추상화를 정확하게 다루는 능력이라는 것이 명확해 진다.*<br>

-키스 데블린(Keith Devlin)

&nbsp;대도시 지하에는 지하철이 복잡하게 존재한다. 하지만 승객들 대부분은 지하철을 어려움 없이 타고다닌다. 1927년 런던 지하철지도는 실제 지형에 구불구불한 노선과 불규칙적인 역 간 거리를 사실적으로 묘사하고 있었다. 하지만 해리 벡은 사실적인 지형과 축척은 무시하고 현대의 지하철 노선도 같은 노선도를 만들어 냈다. "지형은 중요하지 않고, 열차를 갈아타는 것이 중요하다."라고 해리 벡이 인터뷰에서 말했다. 이는 해리 벡이 지하철 노선도를 추상화 했다고 할 수 있다.

## 추상화를 통한 복잡성 극복
&nbsp;현실을 그대로 수용하기에는 인간은 너무 보잘것없다. 따라서 인간은 쉽고 예측가능하게 현실을 분해하고 단순화 한다.

해리 벡의 지하철 노선도는 추상화의 훌륭한 예다. 역의 위치가 중요한 것이 아닌 역과 역 사이의 연결 관계가 중요하다. 따라서 해리 벡과 같이 추상화 할 수 있었다.

따라서 추상화란 불필요한 부분을 없애가면서 사물의 본질을 드러나게 하는 과정이다. 또한 추상화는 인간의 가장 기본적인 인지 수단이다.

> 추상화란 어떤 양상, 세부 사항, 구조를 좀 더 명확하게 이해하기 위해 특정 절차나 문체를 의도적으로 생략하거나 감춤으로써 복잡도를 극복하는 방법이다. 추상화는 다음 두 차원에서 이뤄진다.
> * 첫 번째 차원은 구체적인 사물들 간의 공통점은 취하고 차이점은 버리는 일반화를 통해 단순하게 만드는 것이다.
> * 두 번째 차원은 중요한 부분을 강조하기 위해 불필요한 세부 사항을 제거함으로써 단순하게 만드는 것이다.

## 객체지향과 추상화

### 모두 트럼프일 뿐
&nbsp;소설에서 앨리스는 하얀 토끼를 제외한 모든 트럼프 국민 혹은 왕을 '트럼프'라는 하나의 개념으로 단순화 시킨다. 각각의 트럼프 국민들의 특징을 제외하고 공통점만을 취했다.

### 그룹으로 나누어 단순화하기
&nbsp;명확한 경계를 가지고 서로 구별할 수 있는 구체적인 사람이나 사물을 객체라고 한다. 우리는 트럼프라고 했을 때 떠오르는 외형과 행동 방식으로 인해 많은 종류의 트럼프 국민들 '트럼프'라고 줄여 부를 수 있다.

### 개념
&nbsp;공통점을 기반으로 객체들을 묶기 위한 그릇을 개념(Concept)이라고 한다. 개념은 객체에 적용할 수 있는 아이디어나 관념이다.

예를 들어 자동차, 비행기, 인간, 모니터, 책 처럼 여러개의 객체를 하나의 개념으로 묶어서 복잡한 상황을 피할 수 있다. 개념을 이용하면 객체를 여러 그룹으로 분류(Classification)할 수 있다. 이때 객체가 개념 그룹의 일원이 될 때 객체를 그 개념의 인스턴스(Instace)라고 한다.

> 객체란 특정한 개념을 적용할 수 있는 구체적인 사물을 의미한다. 개념이 객체에 적용됐을 때 객체를 개념의 인스턴스라고 한다.

### 개념의 세 가지 관점
&nbsp;객체의 분류 장치로서 개념을 이야기할 때는 다음 세 가지 관점을 함께 언급한다.

* 심볼(Symbol): 개념을 가리키는 간략한 이름이나 명칭
* 내연(intension): 개념이 완전한 정의
* 외연(extension): 개념에 속하는 모든 객체의 집합

트럼프라는 개념의 심볼, 내연, 외연은 다음과 같이 표현할 수 있다.

* 심볼: 트럼프
* 내연: 몽이 납작하고 두 손과 두 발은 네모 귀퉁이에 달려 있는 등장인물
* 외연: 정원사, 병사, 신하, 왕자와 공주 등등...

### 객체를 분류하기 위한 틀
&nbsp;객체에게 적용할 개념을 결정하는 것은 결국 객체 집합의 일원으로 맞아들인다는 것을 의미한다. 이는 객체들을 개념에 따라 분류하는 것과 동일하다.

> 분류란 객체에 특정한 개념을 적용하는 작업이다. 객체에 특정한 개념을 적용하기로 결심했을 때 우리는 그 객체를 특정한 집합의 멤버로 분류하고 있는 것이다.

객체를 어떤 개념으로 분류할지가 객체지향의 품질을 결정한다. 따라서 우리의 인지능력을 발휘해 최대한 직관적으로 분류해야 한다.

### 분류는 추상화를 위한 도구다
&nbsp;추상화는 두 가지 차원에서 이뤄진다. 추상화는 일반화를 통해 단순화 하는 것이다. 또한 불필요한 세부 사항을 제거해 단순화하는 것이다. 개념을 통해 객체를 분류하는 과정은 추상화의 두 가지 차원을 모두 사용한다. 개념은 객체들의 복잡성을 극복하기 위한 추상화 도구다.

## 타입

### 타입은 개념이다
&nbsp;타입(Type)의 정의는 개념의 정의와 완전히 동일하다. 타입은 공통점을 기반으로 객체들을 묶기 위한 틀이다.

> 타입이란 우리가 인식하고 있는 다양한 사물이나 객체에 적용할 수 있는 아이디어나 관념을 의미한다. 어떤 객체에 타입을 적용할 수 있을 때 그 객체를 타입의 인스턴스라고 한다. 타입의 인스턴스는 타입을 구성하는 외연인 객체 집합의 일원이 된다.

### 데이터 타입
&nbsp;메모리 안에는 0과 1의 행렬만이 존재한다. 이러한 메모리 조각에 들어 있는 값의 의미는 외부의 해석가(애플리케이션)에 의해 결정된다. 데이터를 목적에 따라 분류하기 시작하면서 타입 시스템(Type system)이 자라나기 시작했다. 타입 시스템의 목적은 데이터가 잘못 사용되지 않도록 제약사항을 부과하는 것이다.

* 타입은 데이터가 어떻게 사용되느냐에 관한 것이다.
* 타입에 속한 데이터를 메모리에 어떻게 표현하는지는 외부로부터 철저하게 감춰진다.

따라서 데이터 타입을 다음과 같이 정의할 수 있다.

> 데이터 타입이란 메모리 안에 저장된 데이터의 종류를 분류하는 데 사용하는 메모리 집합에 관한 메타데이터다. 데이터에 대한 분류는 암시적으로 어떤 종류의 연산이 해당 데이터에 대해 수행될 수 있는지를 결정한다.

### 객체와 타입
&nbsp;우리는 객체를 일종의 데이터처럼 사용한다. 하지만 객체는 데이터가 아니다. 중요한 것은 객체의 행동이다. 상태는 행동의 결과로 나타난 부수효과를 쉽게 표현하기 위해 도입한 추상적인 개념이다. 객체의 타입 또한 다음과 같이 말할 수 있다.

* 어떤 객체가 어떤 타입에 속하는지를 결정하는 것은 객체가 수행하는 행동이다.
* 객체의 내부적인 표현은 외부로부터 철저하게 감춰진다.

### 행동이 우선이다
&nbsp;동일한 책임을 수행하는 객체는 동일한 타입에 속한다. 객체가 어떤 데이터를 가지고 있는지는 우리의 관심사가 아니다.

따라서 같은 타입에 속한 객체는 행동만 동일하다면 서로 다른 데이터를 가질 수 있다. 동일 행동이란 동일한 책임이자 동일한 메시지 수신을 의미한다. 하지만 내부 표현 방식이 다르더라도 동일한 메시지를 처리할 수 있는 것은 '다형성'에 의미를 부여한다. '다형성'이란 동일한 요청에 대해 서로 다른 방식으로 응답할 수 있는 능력이다.

또한 객체를 분류할 때 행동만이 고려 대상이라는 사실은 외부에 데이터를 감춰야 한다는 것을 의미하며 이는 '캡슐화'를 의미한다. 따라서 객체가 외부에 제공해야 하는 책임을 먼저 결정하고 적합한 데이터를 나중에 결정한 후, 데이터를 외부 인터페이스 뒤로 캡슐화해야 한다. 이는 흔히 책임-주도 설계(Responsibility-Driven Design)라고 부른다.

'객체를 결정하는 것은 행동이다.'

## 타입의 계층

### 트럼프 계층
&nbsp;객체가 동일한 타입으로 분류되기 위해서는 공통의 행동을 가져야만 한다. 하지만 트럼프 인간은 트럼프의 특징을 모두 가지고 있으면 추가적으로 특수한 행동까지 가능하다. 따라서 트럼프 인간은 트럼프 카드보다 좀 더 특화된 행동을 한다. 이를 외연의 부분 집합으로 표현하면 트럼프는 트럼프 인간을 포함하는 좀 더 일반적인 개념이고, 트럼프 인간은 프럼프보다 좀 더 특화된 행동을 하는 특수한 개념이다. 이런 관계를 일반화/특수화(generalization/specialization) 관계라고 한다.

### 일반화/특수화 관계
&nbsp;일반화와 특수화는 동시에 일어난다. 일반화/특수화 관계를 결정하는 것 또한 객체의 행동이다. 특수한 타입이란 일반적인 타입이 가진 행동에서 자신만의 행동을 추가하는 타입을 가리킨다. 또한 특수한 타입은 일반적인 타입의 모든 행동을 동일하게 수행할 수 있어야 한다. 따라서 일반적 타입은 적은 수의 행동을 가지지만 더 큰 외연 집합을 가진다.

### 슈퍼타입과 서프타입
&nbsp;일반화/특수화 관계를 말할 때 일반적인 타입을 슈퍼타입(Supertype)이라고 하고 좀 더 특수한 타입을 서브타입(Subtype)이라고 한다. 또한 서브타입은 슈퍼타입을 대체할 수 있어야 한다. Liskov는 '어떤 타입을 다른 타입의 서브타입이라고 말할 수 있으려면 다른 타입을 대체할 수 있어야 한다.' 라고 말했다.

### 일반화는 추상화를 위한 도구다
&nbsp;추상화의 두 번째 차원은 불필요한 세부 사항을 제거시켜 단순하게 만드는 것이다. 따라서 추상화를 할 때 일반화 기법을 적용하게 된다.

## 정적 모델

### 타입의 목적
&nbsp;동적으로 변하는 객체의 복잡성을 극복하기에 인간의 인지능력은 부족하다. 타입은 동적으로 변하는 상태를 정적인 모습으로 다루게 해준다. 예를 들어 앨리스의 키는 항상 변하지만 타입으로 키가 임의의 값을 가질 수 있다고 생각하면 된다.

### 그래서 결국 타입은 추상화다
&nbsp;어떤 시점에 불필요한 것들은 제외하고 철저하게 정적인 관점에서 묘사할 수 있기 때문이다. 이는 객체의 상태 변경을 단순화 할 수 있는 효과적인 방법이다.

### 동적 모델과 정적 모델
&nbsp;우리는 객체를 생각할 때 두 가지 모델을 동시에 고려한다.

하나는 객체가 특정 시점에 어떤 상태를 가지느냐다. 이를 객체의 스냅샷(snapshot)이라고 하며 객체 상태의 변화를 포착하는 것을 동적 모델(dynamic model)이라고 한다.

다른 하나는 모든 상태와 모든 행동을 시간에 동립적으로 표현하는 것이며, 이를 타입 모델(type diagram)이라고 한다. 이는 객체의 정적인 모습을 표현하기 때문에 정적 모델(static model)이라고도 한다.

### 클래스
&nbsp;객체지향 프로그래밍 언어에서 클래스를 이용해 정적인 모델을 구현한다. 타입을 구현하는 방법중 하나가 클래스를 이용하는 것이지, 클래스와 타입은 동일하지 않다. 결국 객체지향에서 중요한 것은 동적으로 변하는 객체의 '상태'와 상태를 변경하는 '행위'다.