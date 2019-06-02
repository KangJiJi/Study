3장 함수
========

#### &nbsp;의도를 분명히 표현하는 함수를 어떻게 구현할 수 있을까? 함수에 어떤 속성을 부여해야 처음 읽는 사람이 프로그램 내부를 직관적으로 파악할 수 있을까?

* ## 작게 만들어라
#### &nbsp;함수를 만드는 첫쨰 규칙은 '작게'다. 두번째 규칙도 작게다. 함수는 작을 수록 좋다. 함수는 가로 150자를 넘어가지 않으며, 20줄을 넘기지 않는 것을 추천한다.

### 01. 블록과 들여쓰기
#### &nbsp;if 문 /else 문 /while 문에 들에 들어가는 블록은 한 줄이여야 한다. 함수에서 들여쓰기 수준은 1단이나 2단을 넘어서면 안된다.

* ## 한 가지만 해라
#### &nbsp;함수는 한 가지를 해야 한다. 그 한 가지를 잘 해야 한다. 그 한 가지만을 해야 한다. 우리가 함수를 만드는 이유는 큰 개념을 다음 추상화 수준에서 여러 단계로 나눠 수행하기 위해서이다.

* ## 함수 당 추상화 수준은 하나로
#### &nbsp;함수가 확실히 '한 가지' 작업만 하려면 함수 내 모든 문장의 추상화 수준이 동일해야 한다. 한 함수 내에 추상화 수준을 섞으면 코드를 읽는 사람이 헷갈린다.

### 01. 위에서 아래로 코드 읽기: 내려가기 규칙
#### &nbsp;코드는 위에서 아래로 이야기 처럼 읽혀야 좋다. 위에서 아래로 프로그램을 읽으면 함수 추상화 수준이 한 번에 한 단계씩 낮아진다. 이것을 내력가기 규칙이라 부른다. 이렇게 구현은 어렵지만 정말 중요한 규칙이다.

* ## Switch 문
#### &nbsp;switch 문은 작게 만들기 어렵다(당연히 if/else문도 포함이다). 하지만 각 switch 문을 저차원 클래스에 숨기고 절대로 반복하지 않는 방법은 있다. 다음 코드를 보자.
```java
public Money calculatePay(Employee e) throws InvalidEmployeeType {
  switch (e.type) {
    case COMMISSIONED:
      return calculateCommissionedPay(e);
    case HOURLY:
      return calculateHourlyPar(e);
    case SALARIED:
      return calculateSalariedPay(e);
    default:
      throw new InvalidEmployeeType(e.type);
  }
}
```
#### 위 함수에는 몇가지 문제가 있다. 함수가 길다. 한가지 작업만 수행하지 않는다. SRP를 위반한다. OCP를 위반한다. 이를 해결하기 위해 새로 코드를 짜봤다.
```java
public abstract class Employee {
    public abstract boolean isPayday();
    public abstract Money calculatePay();
    public abstract void deliverPay(Money pay);
}

public interface EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}

public class EmployeeFactoryImpl implements EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
    switch (r.type) {
      case COMMISSIONED:
        return new CommissionedEmployee(r) ;
      case HOURLY:
        return new HourlyEmployee(r);
      case SALARIED:
        return new SalariedEmploye(r);
      default:
        throw new InvalidEmployeeType(r.type);
    }
  }
}
```
#### 추상 팩토리를 이용해 한번 숨긴다.

* ## 서술적인 이름을 사용하라
#### &nbsp;함수가 작고 단순할수록 서술적인 이름을 고르기도 쉬워진다. 서술적인 이름을 사용하면 개발자 머릿속에서도 설계가 뚜렷해지므로 코드를 개선하기 쉬워진다. 또한 이름을 붙일 때는 일관성이 있어야 한다.

* ## 함수 인수
#### &nbsp;함수에서 이상적인 인수 개수는 0개다. 테스트 관점에서 보면 인수가 많을 수록 테스트 하기가 상당히 부담스러워진다.

### 01. 많이 쓰는 단항 형식
#### &nbsp;함수에 인수 한개를 넘기는 이유로 가장 흔한 경우는 두가지다. 인수에 질문을 던지는 경우와 인수를 뭔가로 변환해 결과를 반환하는 경우다. 또한 가끔 사용하는 함수로 이벤트 함수가 있는데 이는 조심해서 사용해야 한다.

### 02. 플래그 인수
#### &nbsp;플래그 인수는 추하다. 함수로 부울 값을 넘기는 관례는 정말로 끔직하다. 사용하지 말자.

### 03. 이항 함수
#### &nbsp;이항 함수는 지양하는 편이 좋다. 가능하면 단항 함수로 바꾸도록 애써야 한다.

### 04. 삼항 함수
#### &nbsp;삼항 함수를 만들어야 한다면 신중히 고려하고 이역시 지양해야 한다.

### 05. 인수 객체
#### &nbsp;인수가 2, 3개 필요하다면 일부를 독자적인 클래스 변수로 선언할 가능을 짚어 본다. 다음 두 함수를 보자.
```java
Circle makeCircle(double x, double y, double radius);
Circle makeCircle(Point center, double radius);
```
#### 객체를 생성해 인수를 줄이는 방법이 눈속임이라 여겨질지 모르지만 그렇지 않다.

### 06. 인수 목록
#### &nbsp;때로는 인수 개수가 가변적인 함수도 필요하다. 이런 함수도 모두 같은 원리가 적용된다. 인수가 많아지는 편은 지양하는게 좋다.

### 07. 동사와 키워드
#### &nbsp;단항 함수는 함수와 인수가 동사 / 명사 쌍을 이뤄야 한다. 또한 키워드를 추가하는 방법도 좋은 방법이다.

* ## 부수 효과를 일으키지 마라
#### &nbsp;함수에서 한 가지를 하겠다고 약속하고선 남몰래 다른 짓을 하면 안된다. 부수 효과는 시간적인 결합이나 순서 종속성을 초래한다. 또한 출력 인수는 객체 지향 개념이 나오면서 지양해야 한다.

* ## 명령과 조회를 분리하라
#### &nbsp;함수는 뭔가를 수행하거나 뭔가에 답하거나 둘 중 하나만 해야 한다.
```java
public boolean set(String attribute, String value);
```
#### 이 함수를 사용했을 떄 코드다.
```java
set("userName", "unclebob");
```
#### 독자 입장에서 코드를 읽을 떄 userName이 unclebob으로 설정 돼 있는지 확인하는 코드인지, userName을 unclebob으로 설정하는 코드인지 함수를 호출하는 코드만 봐서는 의미가 모호하다.

* ## 오류 코드보다 예외를 사용하라
#### &nbsp;명령 함수에서 오류 코드를 반환하는 방식은 명령/조회 분리 규칙을 미묘하게 위반한다. 반면 오류 코드 대신 예외를 사용하면 오류 처리 코드가 원래 코드에서 분리 되므로 코드가 깔끔해진다.

### 01. Try/Catch 블록 뽑아내기
#### &nbsp;Try/Catch 블록을 별도 함수로 뽑아내는 편이 좋다. 아래와 같이 사용하는 것을 추천한다.
```java
public void delete(Page page) {
  try {
    deletePageAndAllReferences(page);
  } catch(Exception e) {
    logError(e);
  }
}
```

### 02. 오류 처리도 한 가지 작업이다.
#### &nbsp;함수는 한가지 작업만 해야 한다. 오류 처리도 한가지 작업에 속한다. 그러므로 오류를 처리하는 함수는 오류만 처리해야 마땅하다.

### 03. Error.java 의존성 자석
#### &nbsp;오류 코드를 반환한다는 이야기는, 어디선가 오류 코드를 정의한다는 뜻이다.

* ## 반복하지 마라
#### &nbsp;반복하지 마라. 같은 코드가 여러번 사용 됐다면 하나의 함수로 빼야한다.

* ## 구조적 프로그래밍
#### &nbsp;모든 함수와 함수 내 모든 블록에 입구와 출구가 하나만 존재해야 한다고 말했다. 즉, 함수는 return문이 하나여야 한다. 루프 안에서 break나 continue를 사용하면 안 되며, goto는 절대로 안된다.

* ## 함수를 어떻게 짜쬬
#### &nbsp;함수를 짜고 지속적으로 보이스카우트 규칙을 적용시켜 점차적으로 좋은 함수를 만든다.