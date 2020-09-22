# 10장 클래스

&nbsp;깨끗한 클래스 작성법에 대해 말한다.

## 클래스 체계

&nbsp;클래스를 정의하는 표준 자바 관례에 따르면 추상화 단계가 순차적으로 내려가기 때문에 신문 기사처럼 읽힌다. 또한 캡슐화는 중요하지만, 가끔은 `protected`로 선언하고 테스트 코드에 사용한다.

## 클래스는 작아야 한다!

&nbsp;클래스는 작아야 한다. 작음을 판단하는 척도로 `책임`을 측정한다. 한 클래스에 `책임`이 많으면 안된다.

클래스 이름은 해당 클래스의 책임을 기술해야 한다. 간결한 이름이 안떠오르면 클래스 크기가 너무 커서 그렇고, 이름이 모호하다면 책임이 너무 많아서다. 또한 클래스 설명은 `만일`, `그리고`, `-(하)며`, `하지만`을 사용하지 않고 25단어 내외로 가능해야 한다.

> SuperDashboard는 마지막으로 포커스를 얻었던 컴포넌트에 접근하는 방법을 제공하며, 버전과 빌드 번호를 추척하는 매커니즘을 제공한다.

위 설명 예시에서 `~하며`는 책임이 너무 많다는 증거다.

### 단일 책임 원칙

&nbsp;`SRP`는 클래스나 모듈을 변경할 이유가 하나뿐이어야 한다는 원칙이다. 변경할 이유를 파악하면 좋은 추상화가 쉽게 떠오른다. 하지만 우리는 수많은 책임을 떠안은 클래스를 꾸준하게 접한다.

코드가 동작하게 하는 활동과 깨끗한 코드는 만드는 활동은 별개의 활동이다. 우리는 깨끗한 코드를 만드는 활동에서 신경을 써야한다. 큰 클래스 몇 개가 아닌, 작은 클래스 여럿으로 이루어진 시스템이 좋다.

### 응집도

&nbsp;메서드가 클래스 인스턴스 변수를 더 많이 사용 할수록 메서드와 클래스는 응집도가 높다. 응집도가 높으면 클래스가 논리적인 단위로 묶인다. 하지만 가끔 몇몇 메서드만이 사용하는 인스턴스 변수가 매우 많아지면 클래스를 두세 개로 쪼갠다.

### 응집도를 유지하면 작은 클래스 여럿이 나온다

&nbsp;큰 클래스의 변수를 작은 클래스의 인스턴스 변수로 만들면서 나눈다. 이런식으로 클래스가 응집력을 잃게 쪼개야 한다. 그러면서 점점 견고한 체계가 잡히고 투명한 구조가 된다.

예시의 객체를 세 가지 객체로 나눌 수 있다.

- main함수 하나만 포함하며 실행 환경을 책임지는 객체
- 숫자 목록을 주어진 행과 열에 맞춰 페이지에 출력하는 객체
- 소수 목록을 생성하는 객체

위와 같이 책임별로 객체를 나눠야 한다.

## 변경하기 쉬운 클래스

&nbsp;깨끗한 시스템은 변경에 유연한다. 다음은 SQL문자열을 만드는 Sql클래스다.

```java
public class Sql {
  public Sql(String table, Column[] columns)
  public String create()
  public String insert(Object[] fields)
  ...
}
```

위 클래스는 `SRP`를 위반한다. `select`문을 수정하려면 Sql클래스를 고쳐야 하고, 새로운 SQL문을 지원하려고 해도 Sql클래스를 고쳐야 한다. 따라서 다음과 같이 공개 인터페이스를 Sql클래스에서 파생하는 클래스로 만든다.

```java
abstract public class Sql {
  public Sql(String table, Column[] columns)
  abstract public String generate()
}

public class CreateSql extends Sql {
  public CreateSql(String table, Column[] columns)
  @Override public String generate()
}

public class SelectSql extends Sql {
  public SelectSql(String table, Column[] columns)
  @Override public String generate()
}

...
```

각 클래스는 단순하고, 변경에도 유연하다. 또한 OCP(Open closed principle)도 지원한다.

### 변경으로부터 격리

&nbsp;상세한 구현에 의존하는 클래스는 구현이 변경되면 위험에 빠진다. 또한 테스트도 어렵다. 따라서 시스템의 결합도를 낮게 만든다. 이러면 DIP(Dependency Inversion Principle)를 잘 따르는 클래스가 나온다.
