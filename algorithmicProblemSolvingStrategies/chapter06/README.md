6장 무식하게 풀기
================

## 01. 도입
#### &nbsp;대부분의 사람들이 가장 많이 하는 실수는 쉬운 문제를 어렵게 푸는 것이다. '무식하게 푼다(brute-force)'는 컴퓨터의 빠른 계산 능력을 이용해 가능한 경우의 수를 일일이 나열하면서 답을 찾는 방법을 의미한다. 이렇게 가능한 방법을 전부 만들어 보는 알고리즘들을 가리켜 흔히 완전 탐색(exhaustive search)라고 부른다.

## 02. 재귀 호출과 완전 탐색

* ### 재귀 호출
#### &nbsp;컴퓨터가 수행하는 많은 작업들은 대개 작은 조각들로 나누어 볼 수 있다. 그런데 우리가 들여다보는 범위가 작아지면 작아질수록 각 조각들의 형태가 유사해지는 작업들을 많이 볼 수 있다. for과 같은 반복문이 좋은 예이다. 이런 작업을 구현할 때 유용하게 사용되는 개념이 바로 재귀 함수(recursive function), 혹은 재귀 호출(recursion)이다. 다음은 1부터 n까지의 합을 반환하는 함수 sum()의 구현이다.
```c++
int sum(int n) {
  int ret = 0;
  for(int i = 1; i <= n; ++i)
    ret += i;
  return ret;
}

int recursiveSum(int n) {
  if(n == 1) return 1;
  return n + recursiveSum(n - 1);
}
```
#### 모든 재귀 함수는 더이상 쪼개지지 않는 최소한의 작업에 도달했을 때 갑을 곧장 반환하는 조건문을 포함해야 한다. 이때 쪼개지지 않는 가장 작은 작업들을 가리켜 재귀 호출의 기저 사례(base case)라고 한다. 문제의 특성에 따라 재귀 호출은 코딩을 훨씬 간편하게 해 줄 수 있는 강력한 무기가 된다.

* ### 예제: 중첩 반복문 대체하기
#### &nbsp;0번부터 차례대호 번호 매겨진 n개의 원소 중 네 개를 고르는 모든 경우를 출력하는 코드를 작성해 보자. 물론 4중 for문을 써서 이것을 간단하게 할 수 있다. 하지만 네 개가 아닌 일곱 개를 골라야 한다면 for문을 일곱번 중첩해야한다. 그러면 코드가 길고 복잡해지는데다, 골라야 할 원소의 수가 입력에 따라 달라질 수 있는 경우에는 사용할 수 없다는 문제가 있다. 다음은 재귀 함수로 구현을 한 코드다.
```c++
// n: 전체 원소의 수
// picked: 지금까지 고른 원소들의 번호
// toPick: 더 고를 원소의 수
void pick(int n, vector<int>& picked, int toPick) {
  // 기저 사례
  if(toPick == 0) {
    printPicked(picked);
    return;
  }
  // 고를 수 있는 가장 작은 번호를 계산한다.
  int smallest = picked.empty() ? 0 : picked.back() + 1;
  // 이 단계에서 원소 하나를 고른다.
  for(int next = smallest; next < n; ++next) {
    picked.push_back(next);
    pick(n, picked, toPick - 1);
    picked.pop_back();
  }
}
```
#### 이와 같이 재귀 호출을 이용하면 특정 조건을 만족하는 조합을 모두 생성하는 코드를 쉽게 작성할 수 있다. 때문에 재귀 호출은 완전 탐색을 구현할 때 아주 유용한 도구다.

* ### 예제: 보글 게임(문제 ID: BOGGLE, 난이도: 하)
#### nbsp;보글(Boggle) 게임은 그림 (a)와 같은 5x5 크기의 알파벳 격자인 게임판의 한 글자에서 시작해서 펜을 움직이면서 만나는 글자를 그 순서대로 나열하여 만들어지는 영어 단어를 찾아내는 게임입니다. 펜은 상하좌우, 혹은 대각선으로 인접한 칸으로 이동할 수 있으며 글자를 건너뛸 수는 없습니다. 지나간 글자를 다시 지나가는 것은 가능하지만, 펜을 이동하지않고 같은 글자를 여러번 쓸 수는 없습니다. 예를 들어 그림의 (b), (c), (d)는 각각 (a)의 격자에서 PRETTY, GIRL, REPEAT을 찾아낸 결과를 보여줍니다. 보글 게임판과 알고 있는 단어들의 목록이 주어질 때, 보글 게임판에서 각 단어를 찾을 수 있는지 여부를 출력하는 프로그램을 작성하세요.

> hasWord(y, x, word) = 보글 게임판의 (y, x)에서 시작하는 단어 word의 존재 여부를 반환한다.

```c++
#include <iostream>
#include <string>
using namespace std;

bool hasWord(int x, int y, const string& word) {
  // 없는 좌표인 경우
  if(x < 0 || 4 < x || y < 0 || 4 > y) return false;
  // 기저 사례
  if(word.length() == 0) return true;

  // 지금 있는 좌표의 단어와 word의 첫번째 단어와 일치를 확인한다.
  if(board[x][y] == word.at(0)) {
    // 주위 8개의 칸을 검사한다.
    for(int additionalX = -1; additionalX < 2; additionalX++) {
      for(int additionalY = -1; additionalY < 2; additionalY++) {
        // 현재 칸이 아닌 경우만 검사한다.
        if(!(additionalX == 0 && additionalY == 0)) {
          result = hasWord(x + additionalX, Y + additionalY, word.erase(0, 1));
          if(result == true) {
            // 존재하는 경우
            return true;
          }
        }
      }
    }
  } else {
    // 지금 칸이 같지 않은 경우.
    return false;
  }
}
```
