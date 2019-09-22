14장 정수론
====================================

## 01. 도입
#### &nbsp;정수론에 관련된 문제들도 자주 등장한다. 정수론에 관련된 가장 기초적인 알고리즘들을 소개한다.

## 02. 소수
#### &nbsp;소수(Prime Number)는 양의 약수가 1과 자기 자신 두 개 뿐인 자연수를 의미한다. 소수의 반대말은 합성수(Composite Number)라고 부른다. 또한 1은 소수도 아니고 합성수도 아니다.

* ### 소수 판별
#### &nbsp;n이 소수인지 판단하는 가장 단순한 방법은 2부터 n-1까지의 모든 수를 순회하면서 이 중 n의 약수가 있는지 확인하는 것이다. 또한 약수는 중 하나는 항상 n^(1/2) 이상 혹은 이하라는 점을 이용하면 n^(1/2)까지만 순회 하도록 최적화 할 수 있습니다.

```c++
// 주어진 자연수 n이 소수인지 확인한다.
bool isPrime(int n) {
	// 예외 처리: 1과 2는 예외로 처리한다.
	if(n <= 1) return false;
	if(n == 2) return true;
	// 2를 제외한 모든 짝수는 소수가 아니다.
	if(n % 2 == 0) return false;
	// 2를 제외했으니 3이상의 모든 홀수로 나누어보자.
	int sqrtn = int(sqrt(n));
	for(int div = 3; div <= sqrtn; div += 2)
		if(n % div == 0)
			return flase;
		return true;
}
```

* ### 소인수 분해
#### &nbsp;소인수 분해를 하는 가장 쉬운 방법은 앞에서 다룬 간단한 소수 판별 알고리즘을 응용하는 것이다. 2부터 시작해 n의 소인수가 될 수 있는 수들을 하나하나 순회하면서, n의 약수를 찾을 때마다 n을 이 숫자로 나눈다. 시간복잡도는 O(n^(1/2))이다.

```c++
// 주어진 정수 n을 소인수분해하는 간단한 알고리즘
vector<int> factorSimple(int n) {
	vector<int> ret;
	int sqrtn = int(sqrt(n));
	for(int div = 2; div <= sqrtn; ++div)
		while(n % div == 0) {
			n /= div;
			ret.push_back(div);
		}
	if(n > 1) ret.push_back(n);
	return ret;
}
```

* ### 에라토스테네스의 체
#### &nbsp;주어진 수 n이하의 소수들을 모두 찾아낸다. 각 수 m이 소수인지 판단하기 위해 m^(1/2)까지의 모든 수로 나눠보는 대신, 소수를 찾을 때마다 그 배수들을 지우는 형태로 동작하기 때문에 훨씬 빠르게 동작한다.

```c++
int n;
bool isPrime[MAX_N + 1];
// 가장 단순한 형태의 에라토스테네스의 체의 구현
// 종료한 뒤 isPrime[i] = i가 소수인가?
void eratosthenes() {
	memset(isprime, 1, sizeOf(isPrime));
	// 1은 항상 예외 처리
	isPrime[0] = isPrime[1] = flase;
	int sqrtn = int(sqrt(n));
	for(int i = 2; i <= sqrtn; ++i)
		// 이 수가 아직 지워지지 않았다면
		if(isPrime[i])
			// i의 배수 j들에 대해 isPrime[j] = false로 둔다.
			// i * i 미만의 배수는 이미 지워졌으므로 신경 쓰지 않는다.
			for(int j = i * i; j <= n; j += i)
				isPrime[j] = false;
}
```
#### 시간 복잡도는 O(n * log(log n))이다 log(log n)은 매우 느리게 증가하기 때문에 실용적인 범위에서는 O(n)과 비슷하다고 생각해도 된다.

* #### 예제: 에라토스테네스의 체를 이용한 빠른 소인수 분해
#### &nbsp;체에서 각 숫자가 소수인지 합성수인지만을 기록하는 것이 아니라, 각 숫자의 가장 작은 소인수를 같이 기록해 두는 것이다.

```c++
// minFactor[i]=i의 가장 작은 소인수(i가 소수인 경우 자기 자신)
int minFactor[MAX_N];
// 에라토스테네스의 체를 수행하면서 소인수분해를 위한 정보도 저장한다.
void eratosthenes2() {
  // 1은 항상 예외
  minFactor[0] = minFactor[1] = -1;
  // 모든 숫자를 처음에는 소수로 표시해 둔다.
  // 자기 자신이 가장 작은 소인수라고 초기화한다.
  for(int i=2; i<=n; i++) {
    minFactor[i] = i;
  }
  // 에라토스테네의 체를 수행
  int sqrtn = int(sqrt(n));
  for(int i=2; i<=sqrtn; i++) {
    // 가장 작은 소인수를 찾지 못했다.
    if(minFactor[i] == i) {
      for(int j=i*i; j<=n; j+=i) {
        // 아직 약수를 본 적 없는 숫자인 경우 i를 써 둔다.
        if(minFactor[j] == j) minFactor[j] = i;
      }
    }
  }
}

// 2 이상의 자연수 n을 소인수분해한 결과를 반환한다.
vector<int> factor(int n) {
  vector<int> ret;
  // n이 1이 될 때까지 가장 작은 소인수로 나누기를 반복한다.
  while(n > 1) {
    ret.push_back(minFactor[n]);
    n /= minFactor[n];
  }
  return ret;
}
```

## 03. 문제: 비밀번호 486(문제 ID: PASS486, 난이도: 중)
#### &nbsp;재훈이는 한 번 담배를 끊겠다고 다짐할 때마다 이메일 계정 비밀번호를 바꾸는 습관이 있습니다. 재훈이는 비밀번호를 항상 "no-smok**X**" 와 같이 정하는데, 여기서 X는 1자리 이상의 자연수입니다. 재훈이에게는 k번째로 금연을 다짐할 때는 항상 정확히 k개의 약수를 갖는 숫자로 X를 선택하는 습관이 있습니다. 예를 들어 재훈이가 12번째로 금연을 다짐했을 때 쓴 비밀번호는 no-smok486 이었습니다. 486 에는 1, 2, 3, 6, 9, .., 243, 486으로 모두 12개의 약수가 있으니까요. 재훈이는 금연을 다짐하고 비밀번호를 바꾼 뒤 잠들었는데, 아침에 일어나서는 비밀번호가 기억나지 않는다는 사실을 깨달았습니다. 재훈이가 어렴풋이 기억하는 것은 비밀번호가 n개의 약수를 가진다는 사실과, 비밀번호가 아마도 [lo,hi] 범위 내에 있을 거라는 것 뿐입니다 (범위는 양 끝의 수를 포함합니다). 재훈이가 예상한 범위 내에 비밀번호가 될 수 있는 수가 몇 개나 되는지 계산하는 프로그램을 작성하세요.

* ### 시간 및 메모리 제한
#### &nbsp;프로그램은 5초 안에 실행되어야 하며, 128MB 이하의 메모리를 사용해야 한다.

* ### 입력
#### &nbsp;입력의 첫 줄에는 테스트 케이스의 수 c(c <= 50)가 주어집니다. 그 후 c줄에 각 3개의 정수로 n (n < 400), lo , hi(1 <= lo <= hi <= 10,000,000)이 주어집니다. hi-lo 는 항상 1백만 이하입니다.

* ### 출력
#### &nbsp;각 테스트 케이스마다, 해당 범위 내에 비밀번호가 될 수 있는 숫자가 몇 개인지 출력합니다.

## 04. 풀이: 비밀번호 486

* ### 약수의 개수 구하기
#### &nbsp;정수 n이 주어졌을 때 약수의 개수를 구하는 것은 어렵지 않지만 매우 느리다. 486의 소인수 분해 결과는 2 * 3^5이다. 이때 486의 약수는 항상 2^a * 3^b꼴이어야 한다. a는 0이상 1이하의 값, b는 0이상 5이하의 값이여야만 486의 약수가 될 수 있다. 따라서 486의 약수는 모두 열두 개 이다.

* ### 에라토스테네스의 체 응용하기
#### &nbsp;가장 간단한 방법은 1천만 이하의 모든 수들을 빠르게 소인수 분해할 수 있도록 처음에 에라토스테네스의 체를 수행해 두는 것이다. 그러면 각 수의 소인수 분해를 빠르게 할 수 있다. 하지만 소인수 분해하지 않고도 약수의 수를 셀 수 있다. 67,500은 2^2 * 3^3 * 5^4으로 60(3 * 4 * 5)개의 약수가 있을 수 있다. 만약 67,500을 2로 나눈 33,750의 약수의 수를 알고 있으면 33,750은 2 * 3^3 * 5^4이기 때문에 2 * 4 * 5에서 3/2를 곱하면 67,500의 약수의 수를 얻을 수 있다.

```c++
// Ten Million
const int TM = 1000*1000*10;
// minFactor[i]=i의 가장 작은 소인수 (i가 소수인 경우 자기 자신)
int minFactor[TM+1];
// minFactorPower[i]=i의 소인수 분해에는 minFactor[i]의 몇 승이 포함되어 있는가?
int minFactorPower[TM+1];
// factor[i]=i가 가진 약수의 수
int factors[TM+1];
void getFactorsSmart() {
  factors[1] = 1;
  for(int n=2; n<=TM; n++) {
    // 소수인 경우 약수가 두개 밖에 없다.
    if(minFactor[n] == n) {
      minFactorPower[n] = 1;
      factors[n] = 2;
    }
    // 소수가 아닌 경우, 가장 작은 소인수로 나눈 수(m)의
    // 약수의 수를 응용해 n의 약수의 수를 찾는다.
    else {
      int p = minFactor[n];
      int m = n/p;
      // m이 p로 더이상 나누어지지 않는 경우
      if(p != minFactor[m])
        minFactorPower[n] = 1;
      else
        minFactorPower[n] = minFactorPower[m] + 1;
      int a = minFactorPower[n];
      factors[n] = (factors[m] / a) * (a + 1);
    }
  }
}
```

* ### 좀더 단순한 접근 방법
#### &nbsp;사실 각 수의 약수의 수를 직접적으로 구해도 풀 수 있다.

```c++
void getFactorsBrute() {
	memset(factors, 0, sizeof(factors));
	for(int div = 1; div <= TM; ++div)
		for(int multiple = div; multiple <= TM; multiple += div)
			factors[multiple] += 1;
}
```

## 05. 유클리드 알고리즘
#### &nbsp;