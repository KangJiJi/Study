# React SetInterval(React에서의 setInterval 메소드 사용)

## setInterval

&nbsp;setInterval은 특정 간격동안 함수를 호출하거나 표현식을 평가하는 일을 하는 메소드다.

```javascript
// 3초마다 한번 Hello
setInterval(function () {
  alert("Hello");
}, 3000);
```

## React에서 setInterval메소드 사용

&nbsp;React로 타이머 어플리케이션을 구현하다가 평소에 사용하는 대로 `setInterval`을 사용했다.

```javascript
import React, { useState, useEffect } from "react";

const DEFAULT_TIME = 1;

const App = () => {
  const [seconds, setSeconds] = useState(DEFAULT_TIME);

  const handleTimer = () => {
    console.log(seconds);
    setSeconds(seconds + 1);
  };

  useEffect(() => {
    const interval = setInterval(handleTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="App">{seconds}</div>;
};

export default App;
```

하지만 위 코드에는 두가지 오류가 있다.

1. `seconds`의 값은 1로 고정 돼 있다
2. `handleTimer`함수가 사용하는 변수들을 `useEffect`의 의존성에 명시하지 않았다.

![오류](https://user-images.githubusercontent.com/22635168/86485992-22cf2900-bd95-11ea-9f35-9890769415b7.gif)

첫 번째 문제는 `useEffect`가 첫 번째 `rendering`의 결과인 `seconds` 즉, 1의 값을 가지고 있기 때문이다. `useEffect`의 콜백을 재적용 하지 않기 때문에 클로저에 있는 `setInterval`이 처음 `seconds`를 참조하게 된다. 일단 2번 문제를 해결하기 위해서 다음과 같은 코드로 변경한다.

```javascript
import React, { useState, useEffect } from "react";

const DEFAULT_TIME = 1;

const App = () => {
  const [seconds, setSeconds] = useState(DEFAULT_TIME);

  const handleTimer = () => {
    setSeconds((s) => s + 1);
  };

  useEffect(() => {
    const interval = setInterval(handleTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="App">{seconds}</div>;
};

export default App;
```

`setState`함수가 최신 `seconds`값을 받아서 1을 더해준 값을 반환하도록 만들면 `handleTimer`함수는 `seconds`값에 대한 의존성이 사라진다. 하지만 `handlerTimer`함수에서 특정 시간에 특정 이벤트를 발생시키기 위해서는 `seconds`값을 읽을 필요가 있다. 또한 1번 문제도 해결되지 않았다.

혹은 다른 방법으로 다음과 같이 해결할 수도 있다.

```javascript
import React, { useState, useEffect } from "react";

const DEFAULT_TIME = 1;

const App = () => {
  const [seconds, setSeconds] = useState(DEFAULT_TIME);

  const handleTimer = () => {
    console.log(seconds);
    setSeconds(seconds + 1);
  };

  useEffect(() => {
    const interval = setInterval(handleTimer, 1000);
    return () => clearInterval(interval);
  });

  return <div className="App">{seconds}</div>;
};

export default App;
```

위 코드의 문제점은 다음과 같다. 리액트에서는 `effect cleanup phase`가 `re-render phase`다음에 실행되기 때문에 너무 자주 `re-render`가 실행되면 `interval`은 실행될 기회조차 갖지 못할 수 있다.

> Hooks는 `class`보다는 `React programming model`에 더 가깝기 때문에 `setInterval`과 상성이 좋지 않다.
>
> > One might say Databases are from Mars and Objects are from Venus. Databases do not map naturally to object models. It’s a lot like trying to push the north poles of two magnets together. -Phil Haack-
> >
> > > Our “impedance mismatch” is not between Databases and Objects. It is between the React programming model and the imperative setInterval API. -Dan-

## 문제 해결 방법

&nbsp;문제 해결 방법에는 세가지가 있다.

- `setState`함수 콜백에 로직 추가
- `setInterval hooks`제작
- 두 개의 `useEffect`

## 첫 번째 해결 방법

&nbsp; 첫 번째 해결 방법은 `setState`함수의 콜백에서 `seconds`를 읽고 여러 로직을 추가하는 것이다.

```javascript
import React, { useState, useEffect } from "react";

const DEFAULT_TIME = 1;

const App = () => {
  const [seconds, setSeconds] = useState(DEFAULT_TIME);

  const handleTimer = () => {
    setSeconds((s) => {
      console.log(s);
      return s + 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(handleTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="App">{seconds}</div>;
};

export default App;
```

위 코드는 정상작동 하지만 특이한 점이 있다. `setState`가 두 번씩 실행된다는 점이다.

![두 번씩 실행](https://user-images.githubusercontent.com/22635168/86486030-3c707080-bd95-11ea-91b5-bf99dc131e7a.gif)

두 번씩 실행되는 이유는 `index.js`파일에서 찾을 수 있다.

```javascript
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

위와같이 `create-react-app`으로 만든 프로젝트는 `Strict`모드를 기본으로 사용한다. `Strict`모드에서 `setState updater`가 두 번 실행되는 것은 의도된 것이다. 두 번 업데이트 하더라도 똑같은 결과 값이 나오면 함수가 순수하다는 것을 보장해준다. `setState`의 콜백을 순수하게 만들면 로직에는 영향을 주지 않는다.

> 참고: [Facebook/react issues](https://github.com/facebook/react/issues/12856)

> 하지만 두 번씩 실행되는게 마음에 안든다.

## 두 번째 해결 방법

&nbsp;두 번째 해결 방법으로 `setInterval hooks`를 만드는 방법이 있다. `re-rendring`과정이 계속 돼도 `setInterval`의 콜백이 항상 일관된 값으로 새로운 `state`를 읽을 수 있어야 한다. 이는 일반적인 변수로는 할 수 없다. 그래서 `useRef`를 통해 항상 최신의 값을 읽을 수 있다.

```javascript
// useInterval.js
import React, { useState, useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};

export default useInterval;
```

`useInterval`에서 매번 `re-rendering`할 때 새로운 콜백을 받아서 `useRef`값에 저장한다. 매번 `re-rendering`될 때마다 콜백은 새로운 `state`를 읽을 수 있기 때문에 예상한 대로 동작하게 된다.

```javascript
// App.js
import React, { useState, useEffect } from "react";
import useInterval from "./useInterval";

const DEFAULT_TIME = 1;

const App = () => {
  const [seconds, setSeconds] = useState(DEFAULT_TIME);

  const handleTimer = () => {
    console.log(seconds);
    setSeconds(seconds + 1);
  };

  useInterval(handleTimer, 1000);

  return <div className="App">{seconds}</div>;
};

export default App;
```

![잘 실행](https://user-images.githubusercontent.com/22635168/86486056-4e521380-bd95-11ea-9dc4-78263ede1a9e.gif)

또한 `useInterval`의 인자는 동적으로 변경될 수 있다. `setInterval`은 한번 `interval`을 설정하게 되면 `clearInterval`를 실행하기 전에는 어떤 것도 변경할 수 없다.

> 예를 들어 동적으로 `delay`값을 맘대로 변경 가능

그리고 한가지 팁으로 다음과 같은 코드로 Pause를 구현할 수 있다.

```javascript
useInterval(handleTimer, isRunning ? delay : null);
```

## 세 번째 해결 방법

&nbsp;세 번째 해결 방법으로 두 개의 `useEffect`를 사용하는 방법이 있다.

```javascript
import React, { useState, useEffect } from "react";

const DEFAULT_TIME = 1;

const App = () => {
  const [seconds, setSeconds] = useState(DEFAULT_TIME);

  const handleTimer = () => {
    setSeconds((s) => s + 1);
  };

  useEffect(() => {
    const interval = setInterval(handleTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(seconds);
  }, [seconds]);

  return <div className="App">{seconds}</div>;
};

export default App;
```

처음 `useEffect`에서 컴포넌트가 처음 랜더링 됐을 때 `setInterval`을 등록한다. 그리고 `seconds`를 의존성으로 가지는 두 번째 `useEffect`에서의 콜백은 항상 최신 `seconds`값에 접근할 수 있다.

## 결론

&nbsp;`React`에서는 `setInterval`을 그냥 사용할 수 없다. 그러기 위해서는 다양한 해결법들이 있고, 그 중 세가지에 대해서 정리해 봤다. 가장 가독성에도 좋은 것은 두 번째 방법인 것 같다.

참고 링크: [Dan의 Overreacted blog 'Making setInterval Declarative with React Hooks'](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
