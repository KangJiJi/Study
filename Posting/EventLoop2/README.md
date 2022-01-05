# Event loop(이벤트루프)

## Event loop?

[기초](https://github.com/KangJiJi/Study/tree/master/JS/EventLoop)

## 여러가지 사실

- 이벤트 루프는 Node.js나 브라우저가 담당하고 JS 엔진에는 없다.
- 이벤트 루프는 여러개의 큐를 사용한다.
- 이벤트 루프는 단일 스레드로 모든 것을 처리한다.
- `setTimeout`이 타이머가 끝나면 외부 요인(OS, 커널 등등)에 의해 작업큐에 삽입되는 것이 아니다.
- `setImmediate`의 콜백은 작업 큐의 가장 첫번째에 위치하지 않고 `Check phase`에서 실행된다.
- 모든 작업 큐는 `FIFO`로만 동작한다.

## 이벤트 루프의 페이즈

- Timer
- Pending I/O callbacks
- Idle, Prepare
- Poll
- Check
- Close callbacks

각 페이즈는 각자 하나의 큐를 가지고 `Idle`, `Prepare`를 제외한 모든 단계에서 `JS`를 실행할 수 있다. 또한 `nextTickQueue`와 `microTaskQueue`는 이벤트 루프의 일부가 아니며, 가장 높은 실행 우선 순위를 가진다.

### Timer phase

&nbsp;`Timer phase`의 큐에서는 `setTimeout`이나 `setInterval`같은 타이머가 끝난 콜백을 저장한다. 이때 타이머들은 항상 힙에 오름차순으로 저장돼 있다. 힙을 순회 하면서 끝난 타이머를 확인하고 실행시키고 오름차순으로 정렬돼 있기 때문에 끝나지 않은 타이머를 만나면 순회를 멈추고 다음 페이즈로 넘어간다. 혹은 시스템 실행 한도에 도달해도 다음 페이즈로 넘어간다.

### Pending I/O callbacks phaser

&nbsp;`pending_queue`에 있는 콜백을 실행하며, 이전 루프에서 넣었놨던 콜백들이다. 에러 핸들러 또한 포함된다. `pending_queue`에 저장돼 있는 작업을 큐가 비거나 시스템 실행한도에 도달할때까지 실행시키고, 내부처리를 위한 `Idle phase`, `Prepare phase`를 거쳐서 `poll phase`로 넘어간다.

### Idle phase, Prepare phase

&nbsp;`Idle phase`는 매 틱마다 실행되고, `Prepare phase`도 매 `Polling`마다 실행된다. `Node.js`의 내부적인 관리를 위한 페이즈다. 정보를 모으거나, 실행 계획을 세울 때 사용한다.

### Poll phase

&nbsp;`watch_queue`를 가지고 수신 커넥션과 데이터 읽기 쓰기를 허용하는 페이즈다. 예를 들어 `파일 읽기 콜백`, `HTTP 콜백`과 같은 작업을 담당한다.

`watch_queue`가 비어있지 않다면, 큐가 비거나 실행 한도에 도달할 때까지 모든 콜백 실행한다. 그리고 `check_queue`, `pending_queue`, `closing_callback_queue`에 해야할 작업이 있는지 검사하고, 있으면 다음 페이즈로 넘어간다.

`watch_queue`가 비어있고, `check_queue`, `pending_queue`, `closing_callback_queue`에 해야할 작업이 없다면 다음 페이즈로 넘어가지 않고 `Timer phase`에서 `타이머 힙`에서 첫번째 타이머가 실행 가능할때 까지 대기 시간을 가진다. 그리고 `Timer phase`로 넘어간다.

### Check phase

&nbsp;`setImmediate`의 콜백만을 위한 페이즈다. `check_queue`가 비거나 한도 초과가 될 때까지 `setImmediate`의 콜백을 실행한다. `setImmediate`의 존재 의미를 생각해보면 `setTimeout`의 0초 뒤에 실행과 비교해볼 수 있을 것 같다. `setTimeout`에 0초뒤 콜백 실행을 하는 것은 바로 실행되지 않고 이벤트 루프를 한바퀴 돌고 실행된다. 반면 `setImmediate`는 이벤트 루프가 한 바퀴 돌기 전에 실행된다.

### Close callbacks phase

&nbsp;`closing_callback_queue`를 가지고 `close`나 `destory` 콜백 타입들을 실행한다. `Close callback phase`가 종료되면 다음 루프가 있는지 확인하고 없으면 종료한다. 반면 다음 루프가 있으면 `Timer phase`부터 시작하게 된다.

## nextTickQueue && microTaskQueue

&nbsp;`nextTickQueue`와 `microTaskQueue`는 이벤트 루프에 포함된 기술이 아니다. `nextTickQueue`는 `process.nextTick()`의 콜백(오류처리, 자원 정리 혹은 작업의 순서를 미룰때 사용)을 가지고 있다. 또한 `microTaskQueue`는 `Promise`의 `resolve`의 콜백을 가지고 있다. 이때 각 큐는 매 Tick(phaser가 넘어가는 과정)마다 완전 비워질 때까지 실행되고, `nextTickQueue`는 `microTaskQueue`보다 우선순위가 높다.
