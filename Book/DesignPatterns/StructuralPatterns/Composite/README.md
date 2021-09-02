# Composite(복합체)

## 의도

&nbsp;부분과 전체의 계층을 표현하기 위해 객체들을 모아 트리 구조로 구성한다. 사용자로 하여금 개별 객체와 복합 객체를 모두 동일하게 다룰 수 있도록 하는 패턴이다.

## 동기

&nbsp;기본 클래스와 이들의 컨테이너를 모두 표현할 수 있는 하나의 추상 클래스를 정의한다. 그리고 사용자는 동일한 추상 클래스에 정의된 연산으로 접근할 수 있다.

## 활용성

- 부분 - 전체의 객체 계통을 표현하고 싶을 때
- 사용자가 객체의 합성으로 생긴 복합 객체와 개객의 객체 사이의 차이를 알지 않고도 자기 일을 할 수 있도록 만들고 싶을 때

## 참여자

- Component
- Leaf
- Composite
- Client

## 협력 방법

&nbsp;사용자는 `Component`클래스 인터페이스를 사용하고, 요청받은 대상이 `Leaf`면 정의한 행동을 직접 수행한다. 반면 `Composite`면 자식 객체들에게 요청을 위임한다.

## 결과

- 기본 객체와 복합 객체로 구성된 하나의 일관된 클래스 계통을 정의한다.
- 사용자의 코드가 단순해진다.
- 새로운 종류의 구성요소를 쉽게 추가할 수 있다.
- 설계가 지나치게 범용성을 많이 가진다.

## 구현

- 포함 객체에 대한 명확한 참조자
- 구성요소 공유
- Component 인터페이스를 최대화
- 자식을 관리하는 연산 선언
- Component가 Component의 리스트를 구현할 수 있을까요?
- 자식 사이의 순서 정하기
- 성능 개선을 위한 캐싱
- 누가 구성요소를 삭제하는 책임을 질까요?
- 구성요소를 저장하기 위해 가장 적당한 데이터 구조는?

## 예제 코드

&nbsp;컴퓨터를 다양한 장비를 포함하는 객체로 생각할 수 있다. 따라서 컴퓨터와 장비들은 부분 - 전체 관계가 성립된다.

```javascript
class Equipment {
  constructor(name) {
    this._name = name;
  }

  netPrice() {
    // 장비 가격 반환
  }
  discountPrice() {}

  add() {}
  remove() {}

  createIterator() {}
}
```

그리고 `Equipment`를 상속받는 말단 클래스들을 구현할 수 있다.

```javascript
class FloppyDisk extends Equipment {
  power() {}
}
```

복합 객체 `CompositeEquipment`를 다음과 같이 구현할 수 있다.

```javascript
class CompositeEquipment extends Equipment {
  netPrice() {
    // 장비들 가격 반환
  }

  add() {}
  remove() {}

  createIterator() {}
}
```

## 관련 패턴

&nbsp;구성요소 - 부모 간의 연결은 책임 연쇄 패턴에서 많이 사용되는 예다. 또한 장식자 패턴은 복합체 패턴과 함께 사용된다. 플라이급 패턴으로 공유 방법을 얻을 수 있다.
