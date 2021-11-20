# Iterator(반복자)

## 의도

&nbsp;내부 표현부를 노출하지 않고 어떤 집합 객체에 속한 원소들을 순차적으로 접근할 수 있는 방법을 제공합니다.

## 동기

&nbsp;리스트와 같은 집합 객체는 내부 표현 구조를 노출하지 않고도 원소에 접근할 수 있는 방법을 제공하는 것이 좋다. 그리고 이미 정의한 방법과 다른 방법으로 원소들을 순회하고자 할 수도 있다. 동일한 리스트에 대해서 하나 이상의 순회 방법을 정의하고 싶을 때도 있다. 이런 문제를 해결하기 위해서 반복자 패턴을 사용한다. 리스트 객체에 접근해서 반복자 객체에 CRUD를 구현하는 것이다.

## 활용성

- 객체 내부 표현 방식을 모르고도 집합 객체의 각 원소들에 접근하고 싶을 때
- 집합 객체를 순회하는 다양한 방법을 지원하고 싶을 때
- 서로 다른 집합 객체 구조에 대해서도 동일한 방법으로 순회하고 싶을 때

## 참여자

- Iterator
- ConcreteIterator
- Aggregate
- ConcreteAggregate

## 협력 방법

&nbsp;ConcreteIterator는 집합 객체 내 현재 객체를 계속 추적하고 다음번 방문할 객체를 결정한다.

## 결과

- 집합 객체의 다향한 순회 방법을 제공한다.
- Iterator는 Aggregate클래스의 인터페이스를 단순화한다.
- 집합 객체에 따라 하나 이상의 순회 방법이 제공될 수 있다.

## 구현

- 사용자가 반복자를 제어하면 외부 반복자, 반복자가 제어를 담당한다면 내부 반복자라고 한다.
- 순회 알고리즘을 어디에서 정의할 것인가?
- 어떻게 견고하게 만들 수 있을까?
- 추가적으로 필요한 반복자 연산.
- 반복자에는 특수한 접근 권한이 있다.
- 복합체를 위한 반복자.
- 널 반복자.

## 예제 코드

&nbsp;다음과 같은 `List`및 `Iterator`인터페이스를 구현할 수 있다.

```javascript
class List {
  count() {}
  get(index) {}
}
```

```javascript
class Iterator {
  first() {}
  next() {}
  isDone() {}
  currentItem() {}
}
```

`ListIterator`는 `Iterator`의 서브클래스로 정의한다. 그리고 구현을 한다.

```javascript
class ListIterator extends Iterator {
  first() {}
  next() {}
  isDone() {}
  currentItem() {}
}
```

역순으로 순회를 하는 `Iterator`도 간단하게 구현할 수 있다.

```javascript
class ReverseListIterator extends Iterator {
  first() {}
  next() {}
  isDone() {}
  currentItem() {}
}
```

## 관련 패턴

&nbsp;반복자 패턴은 복합체 패턴과 같이 재귀적 구조가 있을 때 자주 사용한다. 다양한 반복자를 위해서 팩토리 메서드 패턴을 사용할 수 있다. 또한 반복자 자신이 반복한 결과를 저장하기 위해서 메멘토 패턴을 사용한다.
