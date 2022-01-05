07 함께 모으기
==============

*코드와 모델을 밀접하게 연관시키는 것은 코드에 의미를 부여하고 모델을 적절하게 한다.*<br>

-에릭 에반스(Eric Evans)

&nbsp;다음은 객체지향 설계의 세 가지 관점이다.

* 개념 관점(Conceptual Perspective): 도메인 안에 존재하는 개념과 개념들 사이의 관계에 초점을 둔다.
* 명세 관점(Specification Perspective): 실제 소프트웨어 안 객체들의 인터페이스에 초점을 둔다.
* 구현 관점(Implementation Perspective): 객체들의 책임 수행을 위한 코드구현에 초점을 둔다.

클래스가 은유하는 개념은 도메인 관점을, 클래스 공용 인터페이스는 명세 관점을, 클래스 속성과 메서드는 구현 관점을 반영해 소프트웨어를 개발한다.

## 커피 전문점 도메인

### 커피 주문
&nbsp;흔한 커피 전문점에서 커피를 주문하는 과정을 구현해 본다.

### 커피 전문점이라는 세상
&nbsp;커피 전문점에는 네 가지의 커피가 있으며, 메뉴판과 커피들은 각각 하나의 객체다. 하지만 메뉴판은 네 가지 커피의 항목을 포함하고 있는 객체다. 또한 손님과 바리스타 그리고 바리스타가 만든 커피까지 각각의 객체가 될 수 있다.

* 메뉴 객체
* 네 가지 커피 객체
* 손님 객체
* 바리스타 객체
* 바리스카가 만든 네 가지 커피 객체

객체들간의 관계는 다음과 같이 생각할 수 있다. 손님 객체는 메뉴 객체, 바리스타 객체와 관계가 존재한다. 또한 바리스타는 자신이 만든 커피와 관계를 맺는다.

다음은 객체를 정적인 타입으로 추상화 해야한다. 타입을 분류하는 과정에서 상태와 무관하게 동일하게 행동할 수 있는 객체들은 동일한 타입으로 분류된다. 따라서 다음과 같이 분류할 수 있다.

* 손님: 손님 타입
* 바리스타: 바리스타 타입
* 네 가지 커피: 커피 타입
* 메뉴판: 메뉴판 타입
* 네 개의 메뉴 항목: 메뉴 항목 타입

메뉴판과 메뉴 항목은 '포함(Containment)관계' 혹은 '합성(Composition)관계'다. 손님과 메뉴판은 '연관(Association) 관계'다. 또한 손님은 바리스타와 바리스타는 커피와 연관 관계에 있다. 이를 단순화 시켜서 그림으로 나타내면 '도메인 모델'이 된다.

> 실제 도메인 모델을 작성하는 단계에서는 객체들 사이에 관계가 존재한다는 것만 알아도 된다.

## 설계하고 구현하기

### 커피를 주문하기 위한 협력 찾기
&nbsp;훌륭한 객체는 훌륭한 협력관계에서 얻을 수 있다. 또한 메시지가 객체를 선택해야 한다. 커피를 주문하는 협력에서 가장 첫 번째 메시지는 '커피를 주문하라'일 것이다. 커피를 주문하기 위해서 가장 적절한 객체들을 선택하기 위해서 도메인 모델을 참고한다. 이렇게 메시지를 먼저 선택하고 도메인 모델을 기반으로 설계를 하면 된다. 다음은 필요한 메시지의 목록이다. 메시지(인자, 응답 값) 형태로 나타낸다.

* 커피를 주문하라(메뉴 이름, )
* 메뉴 항목을 찾아라(메뉴 이름, 메뉴 항목)
* 커피를 제조하라(메뉴 항목, 커피)
* 커피를 생성하라( , )

### 인터페이스 정리하기
&nbsp;위에서 얻은 것들은 객체들의 인터페이스다. 메시지에게 선택 당한 객체들을 이 메시지를 자신의 인터페이스로 받아들이게 된다.

* 손님: 커피를 주문하라
* 메뉴판: 메뉴 항목을 찾아라
* 바리스타: 커피를 제조하라
* 커피: 커피를 생성하라

타입은 보통 클래스를 이용해서 구현할 수 있으며, 위 오퍼레이션들은 공용(public)으로 선언돼야 한다.

```java
class Customer {
  public void order(String menuName) { }
}

class MenuItem {

}

class Menu {
  public MenuItem choose(String name) { }
}

class Barista {
  public Coffee makeCoffee(MenuItem menuItem) { }
}

class Coffee {
 public Coffee(MenuItem menuItem) { }
}
```

### 구현하기
&nbsp;먼저 `Customer`는 `Menu`와 `Barista`객체에 접근할 수 있어야 한다. 접근을 가능하게 하는 많은 방법이 있지만 메서드의 인자를 사용하는 방법을 사용한다. 그리고 `order`메서드의 구현을 한다.

```java
class Customer {
  public void order(String menuName, Menu menu, Barista barista) {
    MenuItem menuItem = menu.choose(menuName);
    Coffee coffee = barista.makeCoffee(menuItem);
  }
}
```

구현 과정에서는 항상 인터페이스가 변경될 수 있다(인자 값의 추가).

`Menu`는 `MenuItem`을 관리하면서 `choose`메서드를 가지고 있어야 한다.

```java
class Menu {
  private List<MenuItem> items;

  public Menu(List<MenuItem> items) {
    this.items = items;
  }

  public MenuItem choose(String name) {
    for(MenuItem each : items) {
      if(each.getName().equals(name)) {
        return each;
      }
    }

    return null;
  }
}
```

`Barista`는 `MenuItem`을 이용해서 커피를 제조한다.

```java
class Barista {
  public Coffee makeCoffee(MenuItem menuItem) {
    Coffee coffee = new Coffee(menuItem);
    return coffee;
  }
}
```

`Coffee`는 생성자로 자기 자신을 생성하며, 이름과 가격의 정보를 가지고 있다.

```java
class Coffee {
  private String name;
  private int price;

  public Coffee(MenuItem menuItem) {
    this.name = menuItem.getName();
    this.price = menuItem.cost();
  }
}
```

`MenuItem`은 `getName`, `cost`메서드를 가지고 있어야 한다.

```java
public class MenuItem {
  private String name;
  private int price;

  public MenuItem(String name, int price) {
    this.name = name;
    this.price = price;
  }

  public int cost() {
    return price;
  }

  public String getName() {
    return name;
  }
}
```

이로써 모든 구현이 끝났다.

## 코드와 세 가지 관점

### 코드는 세 가지 관점을 모두 제공해야 한다
&nbsp;위 구현은 앞에서 설명한 개념 관점, 명세 관점, 구현 관점을 모두 제공한다.

* 개념 관점: Customer, Menu, MenuItem, Barista, Coffee 클래스를 볼 수 있다.
* 명세 관점: 각각의 클래스의 인터페이스를 볼 수 있다.
* 구현 관점: 클래스 내부 구현을 볼 수 있다.

세 가지 관점이 명확하게 드러날 수 있게 코드를 개선해야 한다.

### 도메인 개념을 참조하는 이유
&nbsp;도메인 개념 중 객체를 선택하는 것은 코드의 구조와 의미를 쉽게 유추할 수 있게 한다. 또한 변화에 쉽게 대응이 가능하다.

### 인터페이스와 구현을 분리하라
&nbsp;먼저 인터페이스를 통해 객체들 간의 협력을 생각하고 나머지 구현은 숨겨야 유지 보수에 좋은 설계를 얻을 수 있다.