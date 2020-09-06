# 8장 경계

&nbsp;외부 코드를 우리 코드에 깔끔하게 붙이는 방법에 대해서 말한다.

## 외부 코드 사용하기

&nbsp;패키지 혹은 프레임워크 제공자는 적용성을 최대한으로 넓히려하는 반면 사용자는 자신의 요구에 집중하는 인터페이스를 바란다. 다음은 java.util.Map의 예시다.

```java
Map sensors = new HashMap();
Sensor s = (Sensor)sensors.get(sensorId);
```

위 코드에서 Map이 반환하는 Object를 올바른 유형을 변환할 책임(Sensor 형변환)은 클라이언트한테 있다. 하지만 의도도 들어나지 않고, 깨끗한 코드라 볼 수 없다. 따라서 다음과 같이 제네릭을 사용한다.

```java
Map<String, Sensor> sensors = new HashMap<Sensor>();
Sensor s = sensors.get(sensorId);
```

하지만 위 경우도 Map<String, Sensor> 인스턴스를 여기저기로 넘기면, Map인스턴스가 변할 경우, 수정할 코드가 많아진다. 따라서 사용자는 제네릭의 사용여부는 모르고 Sensors안에서 결정돼야 한다.

```java
public class Sensors {
  private Map sensors = new HashMap();

  public Sensor getById(String id) {
    return (Sensor)sensors.get(id);
  }
}
```

Map을 Sensors안으로 숨기면 Map 인터페이스가 변해도 나머지 프로그램에 영향을 미치지 않는다. 경계 인터페이스를 이용할 때는 클래스 밖으로 노출되지 않도록 주의한다.

## 경계 살피고 익히기

&nbsp;외부 패키지를 테스트하는 편이 바람직하다. 따라서 간단한 테스트 케이스를 통해 외부 코드를 익혀야 한다. 이를 학습 테스트라고 부른다.

## log4j 익히기

&nbsp;log4j에 대한 설명

## 학습 테스트는 공짜 이상이다

&nbsp;학습 테스트는 이해도를 높여주는 정확한 실험이다. 또한 새버전 패키지도 기존 학습 테스트를 돌려서 차이점을 찾아낼 수 있다. 따라서 이런 테스트 코드가 있다면 새로운 패키지 버전으로 이전하기 쉬워진다.

## 아직 존재하지 않는 코드를 사용하기

&nbsp;아는 코드와 모르는 코드를 분리야해 한다. 현재로서 할 수 없는 코드는 생각하지 않고 Adapter 패턴을 통해 추후에 다른 코드와 간극을 매꾼다.

## 꺠끗한 경계

&nbsp;소프트웨어의 설계가 우수하면 변경에는 많은 재작업이 필요 없다. 따라서 경계를 개끗하게 유지하고 관리해야 한다.
