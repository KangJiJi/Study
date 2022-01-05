# CHAPTER 5 프로그램 성능

&nbsp;JS에서 비동기성이 중요한 이유는 성능때문이다. 비동기성은 성능이 우수하고, UX에도 많은 도움을 준다. 따라서 로컬 영역이 아닌 프로그램 수준의 성능을 고찰한다.

## 1. 웹 워커

&nbsp;웹 워커는 브라우저의 특성으로 프로그램을 덩이로 나누어 작업 병행성을 추구한다. 우선 다음과 같이 인스턴스화 할 수 있다.

```javascript
var w1 = new Worker('worker.js');
```

JS 파일을 생성자로 입력하면 이 파일을 별도의 스레드에서 독립적 프로그램으로 실행한다. 워커는 이벤트 메시징 체계를 바탕으로 서로 연결된다. 이벤트 리스닝 코드는 다음과 같다.

```javascript
w1.addEventListener('message', function (event) {
  // event.data
});
```

워커로 메시지 이벤트를 보낼 때는 다음과 같다.

```javascript
w1.postMessage('message');
```

워커 내부에서는 다음과 같이 메시지를 받는다.

```javascript
// worker.js
addEventListener('message', function (event) {
  // event.data
});

postMessage('message');
```

보통 워커는 메인에서 만들지만 필요하면 자신의 자식 워커를 인스턴스화할 수 있다. `terminate()`를 통해서 워커 객체를 제거할 수 있다. 또한 페이지별로 별개의 워커를 생성하며, 공유도 할 수 있다.

### 워커 환경

&nbsp;워커 내부에서는 메인 프로그램의 자원(전역 변수, DOM 등등)에 접근할 수 없다. 하지만 네트워크 작업, 타이머 설정, navigator, location, JSON 등 중요한 전역 변수 자체를 복사하여 접근할 수 있다. 추가 적인 JS 파일은 `importScripts()`를 사용한다.

```javascript
// worker.js
importScripts('foo.js', 'bar.js');
```

웹 워커의 주요 용도는 다음과 같다.

- 처리 집약적 수학 계산
- 대용량 데이터 세트 정렬
- 데이터 작업(압축, 오디오 분석, 픽섹 변환 등등)
- 트래픽 높은 네트워크 통신

### 데이터 전송

&nbsp;웹 워커를 사용할 때는 대량의 데이터가 양방향 전송이 가능해야한다. 직렬화, 구조화된 복제 알고리즘, 트랜스퍼러블 객체 등등 을 사용한다.

### 공유 워커

&nbsp;중복되는 워커는 막아야한다. 이런경우 페이지 인스턴스가 서로 공유할 수 있는 중앙 워커를 두는 것이 좋다.

```javascript
var w1 = new SharedWorker('worker.js');
```

공유 워커는 어떤 인스턴스에서 메시지를 보낸 것인지 알 수 있어야한다. 그래서 포트를 이용한다.

```javascript
w1.port.addEventListener('message', handleMessage);

w1.port.postMessage('message');
```

포트 연결은 다음과 같이 초기화한다.

```javascript
w1.port.start();
```

공유 워커 내부에서는 다음과 같은 `connect` 이벤트를 처리한다.

```javascript
// worker.js
addEventListener('connect', function (e) {
  var port = e.ports[0];

  port.addEventListener('message', function (e) {
    // ...
    port.postMessage('message');
  });

  port.start();
});
```

### 웹 워커 폴리필

&nbsp;구형 브라우저에서는 적절한 폴리필을 이용하자.

## 2. SIMD

&nbsp;SIMD는 Single Instruction, Multiple Data의 약자로 여러 데이터 비트를 병렬로 처리하는 일이다. 추후에 JS 표준으로 추가될 수 있지만 아직은 추가되지 않았다.

## 3. asm.js

&nbsp;asm.js는 JS에서 고도로 최적화 가능한 부분 집합이다. 하지만 현재는 Web assembly가 있다.

## 4. 정리하기

&nbsp;JS는 단일 스레드로 동작하면서 이벤트 루프를 통해 비동기를 만족한다. 따라서 프로그램 수준에서 성능을 개선할 방법을 알아봤다.

- 웹 워커
- SIMD 연산
- asm.js
