# 7장 오류 처리

&nbsp;뭔가 잘못될 가능성은 항상 존재하기 때문에 오류를 처리해줘야 한다. 하지만 오류 처리 코드로 인해 프로그램 논리 이해가 어려워지면 더러운 코드가 된다.

## 오류 코드보다 예외를 사용

&nbsp;예외를 지원하지 않는 언어는 오류 플래그를 설정하거나 오류 코드를 반환하는 방법이 전부였다. 이런 방법은 호출자의 코드가 복잡해지고 오류 확인 코드를 잊어버리는 경우가 생긴다. 그래서 오류가 발생하면 예외를 던지는 편이 낫다.

```java
public class DeviceController {
  public void sendShutDown() {
    try {
      tryToShutDown();
    } cathc(DeviceShutDownError e) {
      logger.log(e);
    }
  }

  private void tryToShutDown() throws DeviceShutDownError {
    ...
  }

  private Devicehandle getHandle(DeviceID id) {
    ...
  }
}
```

위와 같이 깨끗한 코드를 만들 수 있다. 또한 종료 알고리즘과 오류를 처리하는 알고리즘을 분리할 수 있다.

## Try-Catch-Finally 문부터 작성하라

&nbsp;try-catch-finally문을 사용하면 try블록에 호출자가 기대하는 상태를 정의하기 쉽다.

## 미확인 예외를 사용하라

&nbsp;과거에는 확인된 예외는 멋진 아디이어였다. 하지만 확인된 예외가 없어도 안정적인 소프트웨어를 제작할 수 있다. 따라서 확인된 오류로 통해 치르는 비용에 대해서 따져봐야한다.

확인된 예외는 개방 폐쇄의 원칙을 위반한다. 메서드에서 확인된 예외를 던졌는데 catch 블록이 세 단계 위에 있다면 그 사이 메서드 모두가 해당 예외를 정의해야 한다. 그리고 상위 모든 함수가 최하위 함수에서 던지는 예외를 알아야 하기 때문에 캡슐화도 깨지게 된다.

## 예외에 의미를 제공하라

&nbsp;오류 메시지에 정보를 담아 예외와 함께 던져야 한다.

## 호출자를 고려해 예외 클래스를 정의하라

&nbsp;오류를 잡아내는 방법을 잘 만들어야 한다.

```java
ACMEPort port = new ACMEPort(12);

try {
  port.open();
} catch (DeviceResponseException e) {
  reportPortError(e);
  looger.log("Device response exception", e);
} catch (ATM1212UnlockedException e) {
  reportPortError(e);
  looger.log("Unlock exception", e);
} catch (GMXError e) {
  reportPortError(e);
  looger.log("Device response exception", e);
} finally {
  ...
}
```

위 사례는 오류를 형편없이 분류한 사례다. 모든 예외를 catch한다. 따라서 다음과 같이 고칠 수 있다.

```java
LocalPort port = new LocalPort(12);

try {
  port.open();
} catch (PortDeviceFailure e) {
  reportError(e);
  logger.log(e.getMessage(), e);
} finally {
  ..
}
```

이때 LocalPort 클래스는 단순한 예외를 변환하는 wrapper 클래스다.

```java
public class LocalPort {
  private ACMEPort innerPort;

  public LocalPort(int portNumber) {
    innerPort = new ACMEPort(portNumber);
  }

  public void open() {
    try {
      innerPort.open()
    } catch (DeviceResponseException e) {
      throw new PortDeviceFailure(e);
    } catch (ATM1212UnlockedException e) {
      throw new PortDeviceFailure(e);
    } catch (GMXError e) {
      throw new PortDeviceFailure(e);
    } finally {
      ...
    }
  }
}
```

외부 API를 감싸면 라이브러리와 프로그램 사이의 의존성이 줄어든다.

## 정상 흐름을 정의하라

&nbsp;가끔 예외가 논리를 따라가기 어렵게 만드는 경우가 있다. 예외적인 상황을 캡슐화해서 처리하면 된다.

## null을 반환하지 마라

&nbsp;호출자가 null확인을 하나라도 빼먹으면 동작하지 않는다. null 대신 예외를 던지거나 특수 사례 객체를 반환하도록 한다.

```java
List<Employee> employees = getEmployees();
if(employees != null) {
  for(Employee e : employees) {
    totalPay += e.getPay();
  }
}
```

위 코드에서 getEmployees가 빈 리스트를 반화하면 null을 확인할 필요가 없어진다.

```java
List<Employee> employees = getEmployees();
for(Employee e : employees) {
  totalPay += e.getPay();
}
```

## null을 전달하지 마라

&nbsp;함수의 인자로 null을 전달하면 NullPointerException이 발생할 수 있다. 따라서 조건문을 통해 처리하거나 assert문을 사용해서 처리하는 방법을 사용한다.

```java
public class MetricsCalculator {
  public double xProjection(Point p1, Point p2) {
    assert p1 != null : "p1 should not be null";
    assert p2 != null : "p2 should not be null";
    return (p2.x - p1.x) * 1.5;
  }
}
```

## 결론

&nbsp;깨끗한 코든느 읽기도 좋고 안정성도 높아야 한다. 따라서 오류 처리를 논리와 분리해서 생각해야 한다.
