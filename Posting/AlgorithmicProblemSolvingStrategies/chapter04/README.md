4장 알고리즘의 시간 복잡도 분석
=============================

## 01. 도입
&nbsp;더 빠른 알고리즘을 만들기 위해서 가장 먼저 해야할 일은 알고리즘의 속도를 어떻게 측정할지를 정하는 것이다.

### 반복문이 지배한다
&nbsp;한가지 항목이 전체의 대소를 좌지우지하는 것을 지배한다(dominate)고 표현 한다. 알고리즘의 수행 시간을 지배하는 것은 반복문 이다. 따라서 우리는 알고리즘의 수행 시간을 반복문이 수행되는 횟수로 측정한다.

## 02. 선형시간 알고리즘

### 다이어트 현황 파악: 이동 평균 계산하기
&nbsp;이동 평균(Moving average)는 시간에 따라 변화하는 값들을 관찰할 때 유요하게 사용할 수 있는 통계적 기준이다. M 이동 평균은 마지막 M개의 관찰 값의 평균으로 정의 된다. 따라서 새 관찰 값이 나오면 이동 평균은 새 관찰 값을 포함하도록 바뀐다. 다음은 N개의 측정치가 주어질 때 매달 M달 간의 이동 평균을 계산 하는 프로그램이다.

```c++
vector<double> movingAverage1(const vector<double>& A, int M) {
  vector<double> ret;
  int N = A.size();

  for(int i = M - 1; i < N; ++i) {
    double partialSum = 0;
    for(int j = 0; j < M; ++j)
      partialSum += A[i-j];
    ret.push_back(partialSum / M);
  }
  return ret;
}
```

j를 사용하는 반복문은 항상 M번 실행되고 i를 사용하는 반복문은 N - M + 1번 실행되니, 전체 반복문은 N * M - M^2 + M 번 반복 된다. 이때 측정치가 M개는 돼야 이동 평균을 계산할 수 있다. 이떄 M-1의 이동 평균과 M의 이동 평균의 계산에 사용되는 값들은 0과 M일때를 제외 하면 전부 겹치게 된다. 그러면 일일이 합을 구하지 않고 M-1의 합에서 0일때 값을 빼고, M일때의 값을 더하면 M일때의 합이 나온다. 이런 구현은 다음과 같은 코드로 할 수 있다.

```c++
vector<double> movingAverage2(const vector<double>& A, int M) {
  vector<double> ret;
  int N = A.size();
  double partialSum = 0;
  
  for(int i = 0; i < M - 1; ++i)
    partialSum += A[i];
  for(int i = M-1; i < N; ++i) {
    partialSum += A[i];
    ret.push_back(partialSum / M);
    partialSum -= A[i -M + 1];
  }
  return ret;
}
```

이와 같은 구현으로 수행 시간은 N에 정비례한다. 입력의 크기에 대비해 걸리는 시간을 그래프로 그려보면 정확히 직선이 된다. 때문에 이런 알고리즘을 선형 시간(Linear time) 알고리즘이라고 부른다.

## 03. 선형 이하 시간 알고리즘

### 성형 전 사진 찾기
&nbsp;사진 10만장이 있을 때 언제 성형을 했는지 알고 싶으면 10만장을 다 보는 것 보다 5만번째 사진을 보고 성형을 했으면 2.5만번째 사진을 보고 안했으면 7.5만번째 사진을 보면서 계속 중간 값을 보는 것으로 17번 정도면 알아낼 수 있다. 이때 봐야 하는 사진의 장수를 N에 대해 표현하면 어떻게 될까? 매번 절반씩 나누니 밑이 2인 로그 함수를 사용하면 된다.(lg를 지수가 2인 log라 정의 한다) 따라서 확인해야 하는 사진의 수는 대략 lgN이 된다. 이와 같이 입력의 크기가 커지는 것보다 수행 시간이 느리게 증가하는 알고리즘들을 선형 이하 시간(Sublinear time) 알고리즘이라고 부른다.

### 이진 탐색
&nbsp;방금 전 예제에서 사용한 알고리즘을 이진 탐색(binary search) 이라고 부른다. 하지만 정렬된 배열일때 사용 가능하다.

### 구현
&nbsp;간단한 아이디어와는 달리 이진 탐색을 정확하게 구현하긴는 매우 까다롭다.
> 이진 탐색을 이용해 많은 시간초과 나는 문제를 푼 경험이 있다. 항상 구현은 어렵지만 실행시간은 엄청나게 줄일 수 있다.

## 04. 지수 시간 알고리즘

### 다항 시간 알고리즘
&nbsp;변수 N과 N^2, 그 외 N의 거듭제곱들의 선형 결합으로 이루어진 식들을 다항식이라고 부른다. 반복문의 수행 횟수를 입력 크기의 다항식으로 표현할 수 있는 알고리즘들을 다항 시간 알고리즘이라고 한다.

### 알러지가 심한 친구들
&nbsp;집들이에 N명의 친구를 초대하려고 한다. 할 줄 아는 M가지의 음식 중 무엇을 대접해햐 할까를 고민하는데, 각각의 친구들은 알러지 때문에 아무 음식이나 해서는 안된다. 만들 줄 아는 음식의 목록과, 해당 음식을 못 먹는 친구들의 표가 주어질 때 각 친구가 먹을 수 있는 음식이 최소한 하나씩은 있으려면 최소 몇 가지의 음식을 해야 할까?
> 처음 내가 생각 답안. 음식 하나씩 선택해서 다 먹을 수 있는지 계산해보고 되면 1을 반환 안되면 음식을 2개씩 선택해본다. 이런식으로 M가지의 음식을 선택해 본다.

### 모든 답 후보를 평가
&nbsp;모든 답안을 고려해 보자. 우선 첫 번째 요리를 만들지 말지 결정하고, 그 다음엔 두번 째 요리를 만들지 말지 결정하는 식으로 만들어보자. 이런 알고리즘을 구현하는 가장 쉬운 방법은 재귀 호출을 이용하는 것이다.

```c++
const int INF = 987654321;
bool canEverybodyEat(const vector<int>& menu);
int M;

int selectMenu(vector<int>& menu, int food) {
  if(food == M) {
    if(canEverybodyEat(menu)) return menu.size();
    return INF;
  }

  int ret = selectMenu(menu, food + 1);
  menu.push_back(food);
  ret = min(ret, selectMenu(menu, food + 1));
  menu.pop_back();
  return ret;
}
```

### 지수 시간 알고리즘
&nbsp;이 코드는 모든 답을 한 번씩 다 확인하기 때문에, 전체 걸리는 시간은 만들 수 있는 답의 수에 비례하게 된다. M가지 음식을 만들지, 안 만들지 선택할 수 있기 때문에 답의 경우의 수는 2^M 개 이다. 2^M과 같은 지수 함수는 알고리즘의 전체 수행 시간에 엄청난 영향을 미친다. 이와 같으 N이 하나 증가할 때마다 걸리는 시간이 배로 증가하는 알고리즘들은 지수 시간(exponential time)에 동작한다고 말한다.

### 소인수 분해의 수행 시간
&nbsp;다음은 소인수 분해 결과를 반환하는 간단한 알고리즘이다.

```c++
vector<int> factor(int n) {
  if(n == 1) reuturn vector<int>(1, 1);
  vector<int> ret;
  for(int div = 2; n > 1; ++div)
    while(n % div == 0) {
      n /= div;
      ret.push_back(div);
    }
  return ret;
}
```

이 함수는 최악의 경우에는 선형 시간이 걸린다고 생각하기 쉽다. 하지만 입력이 차지하는 비트의 수가 하나 증가할 때마다 표현할 수 있는 수의 범위와 알고리즘의 최대 수행 시간은 두 배로 증가한다. 이렇게 입력의 크기를 입력이 차지하는 비트 수로 정의하면 입력의 크기에 대해 지수 시간이 걸린다고 말할 수 있다.

## 05. 시간 복잡도
&nbsp;시간 복잡도(Time complexity)랑 가장 널리 사용되는 알고리즘의 수행 시간 기준이다. 하지만 시간 복잡도가 낮다고 해서 언제나 빠르게 동작하는 것은 아니다. 입력의 크기가 충분히 작을 때는 시간 복잡도가 높은 알고리즘이 더 빠르게 동작할 수도 있다.

### 입력의 종류에 따른 수행 시간의 변화
&nbsp;입력이 어떤 형태로 구성되어 있는지도 수행 시간에 영향을 미친다.

### 점근적 시간 표기: O 표기
&nbsp;O표기법(Big-O Notation)을 사용해 알고리즘의 수행 시간을 표기한다. O표기법은 함수에서 가장 빨리 증가하는 항만을 남긴 채 나머지를 다 버리는 표기법이다.

### O표기법의 의미
&nbsp;O표기법은 대략적으로 함수의 상한을 나타낸다는 데 그 의미가 있다. O표기법은 각 경우의 수행 시간을 간단히 나타내는 표기법일 뿐, 특별히 최악의 수행 시간과 관련이 있는 것은 아닌다.

### 시간 복잡도 분석 연습
&nbsp;선택 정렬(Selection sort)과 삽입 정렬(Insertion sort)의 시간 복잡도를 O 표기법으로 나타 냈을 때 선택 정렬은 O(N^2)이고 삽입 정렬은 최선의 경우 O(N)이고 최악의 경우 O(N^2)이다. 그래서 삽입 정렬은 보통 O(N^2)이라고 표기 한다.

### 시간 복잡도의 분할 상환 분석
&nbsp;더 복잡한 시간 복잡도를 계산하기 위해 시간 복잡도의 분할 상환 분석(Amortized analysis)을 사용한다. N개의 작은 작업들을 순서대로 하는데, 각 작업에 걸리는 시간은 모두 다르지만 전체 작업에 걸리는 시간이 일정한 경우 이런 방법을 적용할 수 있다. 이때 각 작업에 걸리는 평균 시간은 전체 시간을 작업의 개수로 나눈 것과 같다고 할 수 있다.

## 06. 수행 시간 어림짐작하기

### 주먹구구 법칙
&nbsp;1초당 반복문 수행 횟수가 1억을 넘어가면 시간 제한을 초과할 가능성이 있다.

### 주먹구구 법칙은 주먹구구일 뿐이다
&nbsp;주먹구구 법칙을 절대로 맹신해서는 안된다. 여러가지 요소들을 고려해야 한다.

01. 시간 복잡도가 프로그램의 실제 수행 속도를 반영하지 못하는 경우
02. 반복문의 내부가 복잡한 경우
03. 메모리 사용 패턴이 복잡한 경우
04. 언어와 컴파일러의 차이
05. 구형 컴퓨터를 사용하는 경우

### 실제 적용해 보기
&nbsp;1차원 배열에서 연속된 부분 구간 중 그 합이 최대인 구간을 찾는 문제를 풀어보자.

```c++
const int MIN = numeric_limits<int>::min();

// O(n^3)
int infficientMaxSum(const vector<int>& A) {
  int N = A.size(), ret = MIN;
  for(int i = 0; i < N; ++i)
    for(int j = i; j < N; ++j) {
      int sum = 0;
      for(int k = i; k <= j; ++k)
        sum += A[k];
      ret = max(ret, sum);
    }
  return ret;
}

// O(N^2)
int betterMaxSum(const vector<int>& A) {
  int N = A.size(), ret = MIN;
  for(int i = 0; i < N; ++i)
    int sum = 0;
    for(int j = i; j < N; ++j) {
      sum += A[j];
      ret = max(ret, sum);
    }
  return ret;
}
```

분할 정복 기법을 사용하면 이보다 빠른 시간에 동작하는 알고리즘을 설계할 수 있다.

```c++
// O(NlgN)
int fastMaxSum(const vector<int>& A, int lo, int hi) {
  if(lo == hi) return A[lo];
  int mid = (lo + hi) / 2;

  int left = MIN, right = MIN, sum = 0;
  
  for(int i = mid; i >= lo; --i) {
    sum += A[i];
    left = max(left, sum);
  }

  sum = 0;

  for(int j = mid + 1; j <= hi; ++j) {
    sum += A[j];
    right = max(right, sum);
  }

  int single = max(fastMaxSum(A, lo, mid), fastMaxSum(A, mid + 1, hi));

  return max(left + right, single);
}
```

이 문제를 동적 계획법을 사용해서 선형 시간에 푸는 방법이다.

```c++
// O(N)
int fastestMaxSum(const vector<int>& A){
	int N = A.size(), ret = MIN, psum = 0;
	for (int i = 0; i < N; i++) {
		psum = max(psum, 0) + A[i];
		ret = max(psum, ret);
	}
	return ret;
}
```

이때 각 알고리즘의 수행 시간을 짐작해 결론을 내보자.
01. O(N^3): 크기 2560인 입력까지를 1초안에 풀 수 있다.
02. O(N^2): 크기 40960인 입력까지를 1초안에 풀 수 있다.
03. O(NlgN): 크기 2천만인 입력까지를 1초안에 풀 수 있다.
04. O(N): 크기 1억 6천만인 입력까지를 1초안에 풀 수 있다.

## 07. 계산 복잡도 클래스: P, NP, NP-완비

### 문제의 특성 공부하기
&nbsp;계산 복잡도 이론에서는 다항 시간 알고리즘이 존재하는 문제들의 집합을 P문제(Polynomial)라고 부른다.

### 난이도의 함정
&nbsp;어떤 문제를 다항 시간에 풀 수 있음을 증명하기란 쉽지만, 풀 수 없음을 보이기란 어렵다는 점이다.

### NP 문제, NP 난해 문제
&nbsp;어려운 문제의 기준이 되는 것이 바로 SAT 문제(Satisfiability problem)이다. SAT 문제는 모든 NP 문제 이상으로 어렵기 때문에 어려운 문제의 기준으로 삼는다.

### P = NP?
&nbsp;NP-Hard 문제 중 하나를 다항 시간에 풀 수 있다면, 이 알고리즘을 이용해 NP에 속한 모든 문제를 다항 시간에 해결할 수 있다.