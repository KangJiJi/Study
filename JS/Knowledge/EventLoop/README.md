# Event loop(이벤트루프)

## Event loop?

&nbsp;JS는 단일 스레드 기반의 언어라고 한다. 하지만 단일 스레드 기반이라고 해서 여러 작업을 동시에 처리할 수 없는 것은 아니다. 예를 들어 웹 사이트에서 동영상을 보여주면서 사용자의 마우스 클릭 이벤트를 받아서 처리할 수 있고 동시에 여러 컴포넌트에서 각각의 api call을 통해 서버에서 정보를 가져올 수 있다. 이러한 동시성을 지원할 수 있게 해주는 것이 Event loop다.

> Event loop 지원은 브라우저나 Node.js에서 해주는 것이다. ECMAScript에는 정의돼 있지 않다.

## 어떻게 동작하는가?

&nbsp;JS엔진이 JS코드를 차례대로 읽어서 Call stack이라는 곳에 순차적으로 쌓아둔다. 만약 쌓아 둔 코드가 바로 처리할 수 있으면 바로 처리하고 아니면 Web Api를 참고해서 Task queue로 넘겨버린다. 이때 Call stack이 비어 있으면 Taks queue에서 있는 작업을 Event loop가 Call stack으로 넘겨서 실행하게 된다.

## Call stack?

&nbsp;JS엔진(V8, Spidermonkey 등등)이 Call stack을 가지고 있으며 코드를 읽어서 하나의 작업을 하나씩 꺼내서 실행시킨다.

```javascript
function funcA() {
  console.log("This is funcA");
}

function funcB() {
  funcA();
  console.log("This is funcB");
}

funcB();
```

위 코드는 다음과 같은 결과를 가져온다.

```javascript
This is funcA
This is funcB
```

왜냐 하면 Call stack에서 처음에 main 함수를 넣고 다음에 `funcB()` 함수를 실행시킨다. 다음으로 `funcB()`안에 있는 `funcA()`를 Call stack에 넣고 `funcA()`의 `console.log("This is funcA")`를 실행시킨다. 그리고 `console.log("This is funcB")`를 실행시키고 프로그램은 종료가 된다. 실행 동작은 다음과 같다.

![Call stack](https://user-images.githubusercontent.com/22635168/81417378-114b1580-9186-11ea-85c0-0add9784d296.png)

## Web Api?

&nbsp;비동기 호출을 위한 setTimeout이나 XMLHttpRequest와 같은 함수들이 정의돼 있는 곳이다.

## Task queue, Micro queue?

&nbsp;Call stack의 작업들이 Web api를 이용해야 하는 작업이라면 Task queue로 넣고 이때 promise관련 작업이라면 Micro queue에 넣는다. Call stack이 비어있게 되면 Event loop가 Micro queue에 있는 작업을 Call stack으로 가져와서 실행시키고 다시 Call stack이 비어지면 Task queue에 있는 작업을 가져와서 실행시킨다. 따라서 `setTimeout(func, 0)`보다 `promise.resolve().then(() => func())`가 먼저 실행된다.

```javascript
function funcA() {
  console.log("This is funcA");
}

function funcB() {
  console.log("This is funcB");
}

function funcC() {
  console.log("This is funcC");
}

setTimeout(funcA, 0);

Promise.resolve().then(funcB).then(funcC);
```

위 코드의 결과는 다음과 같다.

```javascript
This is funcB
This is funcC
This is funcA
```

또한 이런 Queue들을 한번에 Callback queue라고 부른다.

## 결론

&nbsp;따라서 결론적으로 다음과 같은 동작 방식을 가지게 된다.

![event loop](https://user-images.githubusercontent.com/22635168/81417375-0f815200-9186-11ea-8295-2f9c52550ea2.png)

1. 코드를 읽어서 Call stack에 넣는다.
   1. 바로 실행가능하면 5번 작업으로 이동한다.
   2. 바로 실행할 수 없으면 2번 작업으로 이동한다.
2. 사용자가 사용한 api를 찾아서 사용하고 3번 작업으로 넘어간다.
3. Promise이면 Micro queue에 넣고 아니면 Task queue에 넣는다.
4. 이벤트 루프는 Call stack이 비어있으면 Micro queue의 작업을 먼저 Call stack으로 올리고 Micro queue가 비어있으면 Task queue의 작업을 Call stack으로 올란다.
5. 코드를 실행해서 Screen이나 Console에 보여준다.

## 추가

- `window.requestAnimationFrame(callback)`는 크롬 기준으로 우선 순위는 Micro queue보다 낮지만 Task queue 보다는 높다.
- JS에서 web worker(웹 워커)를 사용하면 멀티 스레딩이 가능하다.
- Call stack이 비어있으면 Callback queue의 에서 작업을 Call stack으로 넣는 작업을 Tick(틱)이라고 한다.
