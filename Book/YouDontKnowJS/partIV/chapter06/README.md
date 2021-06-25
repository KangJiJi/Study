# CHAPTER 6 벤치마킹과 튜닝

&nbsp;미시적 수준의 성능 문제에 대해서 알아본다.

## 1. 벤치마킹

&nbsp;벤치마킹은 측정한 결과에 따라서 무엇을 알 수 있는지, 무엇을 알 수 없는지 파악해야한다.

### 반복

&nbsp;테스트를 100회 반복한 결과가 137ms였을 때 1번 작업 소요 시간은 1.37ms가 아니다. 다른 측정치와 너무나도 다른 측정치가 1~2개만 있어도 평균은 왜곡된다. 일정 시간동안 테스트를 반복하는 방법도 있을 것이다. 이처럼 여러 경우를 생각해서 벤치마킹을 해야한다.

### Benchmark.js

&nbsp;통계학을 기초로 잘 만든 Benchmark.js라는 벤치마킹 도구가 있다. 다음과 같이 사용할 수 있다.

```javascript
function foo() {}

var bench = new Benchmark('foo test', foo, {
  // Option
});

bench.hz; // 초당 작업 개수
bench.stats.moe; // 한계 에러
bench.stats.variance; // 분산
```

## 2. 콘텍스트가 제일

&nbsp;둘 간의 성능 차이를 확실하게 보기 위해서는 정말 많은 반복을 통해서 확인할 수 있다.

### 엔진 최적화

&nbsp;현대 JS 엔진은 매우 복잡하다. 따라서 미세한 벤치마킹은 무시하는 것이 좋다.

## 3. jsPerf.com

&nbsp;jsPerf를 통해서 환경별 테스트도 가능하다.

## 4. 좋은 테스트를 작성하려면

&nbsp;좋은 테스트를 위해서는 두 테스트 케이스 사이의 차이점을 잘 알아야한다. 더 명확한 테스트를 통해서 차이점을 잘 알 수 있다.

## 5. 미시성능

&nbsp;개발자의 코드와 컴파일러가 만들어낸 코드는 다르다. 어떤 엔진은 재귀를 반복문으로 해석하기도 한다.

```javascript
function factorial(n) {
  if (n < 2) return 1;
  return n * factorial(n - 1);
}

factorial(5);
```

위와같은 코드를 다음과 같이 해석한다(풀림 재귀).

```javascript
function factorial(n) {
  if (n < 2) return 1;
  var res = 1;
  for (var i = n; i > 1; i--) {
    res *= i;
  }

  return res;
}

factorial(5);
```

반면 `--n` vs `n--`의 성능은 엔진이 알아서 처리할 문제다.

### 똑같은 엔진은 없다.

&nbsp;JS엔진은 모두 스펙을 준수하지만 코드 처리 방식은 제각각이다. 그래서 특정 엔진에 맞게끔 최적화는 지양하자. 성능이 중요한 것은 맞지만 그렇다고 유일무이한 요소는 아니다.

## 6. 꼬리 호출 최적화(TCO)

&nbsp;꼬리 호출은 함수 호출부가 다른 함수의 꼬리 부분에 있고 호출이 끝나면 더 이상 수행할 작업ㅇ르 남기지 않는 방식이다.

```javascript
function foo(x) {
  return x;
}

function bar(y) {
  return foo(y + 1); // 꼬리 호출
}

function baz() {
  return 1 + bar(4); // 꼬리 호출 X
}

baz(); // 42
```

새 함수를 호출하려면 스택 프레임(Stack Frame)이라는 메모리 할당이 필요한데 TCO는 `bar`가 끝난 뒤 `foo`를 호출할 때 새로운 스택 프레임을 생성하지 않는다. 그래서 팩토리얼을 다음과 같이 최적화 할 수 있다.

```javascript
function factorial(n) {
  function fact(n, res) {
    if (n < 2) return res;
    return fact(n - 1, n * res);
  }

  return fact(n, 1);
}

factorial(5);
```

TCO가 구현 요건이 된 이유는 개발자들이 재귀 알고리즘을 안 쓰려고 하기 때문이다. 이를 Tail Recursion이라고 한다.

## 7. 정리하기

&nbsp;코드를 효과적으로 벤치마킹하려면 자세한 내막을 알아야한다. 미시성능에 집착하지 말고 가독성을 중요하게 생각하자. 또한 TCO를 통해서 재귀 함수를 Call stack overflow 상관하지 않고 사용할 수 있다.
