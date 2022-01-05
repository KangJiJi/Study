6장 무식하게 풀기
================

## 01. 도입
&nbsp;대부분의 사람들이 가장 많이 하는 실수는 쉬운 문제를 어렵게 푸는 것이다. '무식하게 푼다(brute-force)'는 컴퓨터의 빠른 계산 능력을 이용해 가능한 경우의 수를 일일이 나열하면서 답을 찾는 방법을 의미한다. 이렇게 가능한 방법을 전부 만들어 보는 알고리즘들을 가리켜 흔히 완전 탐색(exhaustive search)라고 부른다.

## 02. 재귀 호출과 완전 탐색

### 재귀 호출
&nbsp;컴퓨터가 수행하는 많은 작업들은 대개 작은 조각들로 나누어 볼 수 있다. 그런데 우리가 들여다보는 범위가 작아지면 작아질수록 각 조각들의 형태가 유사해지는 작업들을 많이 볼 수 있다. for과 같은 반복문이 좋은 예이다. 이런 작업을 구현할 때 유용하게 사용되는 개념이 바로 재귀 함수(recursive function), 혹은 재귀 호출(recursion)이다. 다음은 1부터 n까지의 합을 반환하는 함수 sum()의 구현이다.

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

모든 재귀 함수는 더이상 쪼개지지 않는 최소한의 작업에 도달했을 때 갑을 곧장 반환하는 조건문을 포함해야 한다. 이때 쪼개지지 않는 가장 작은 작업들을 가리켜 재귀 호출의 기저 사례(base case)라고 한다. 문제의 특성에 따라 재귀 호출은 코딩을 훨씬 간편하게 해 줄 수 있는 강력한 무기가 된다.

### 예제: 중첩 반복문 대체하기
&nbsp;0번부터 차례대호 번호 매겨진 n개의 원소 중 네 개를 고르는 모든 경우를 출력하는 코드를 작성해 보자. 물론 4중 for문을 써서 이것을 간단하게 할 수 있다. 하지만 네 개가 아닌 일곱 개를 골라야 한다면 for문을 일곱번 중첩해야한다. 그러면 코드가 길고 복잡해지는데다, 골라야 할 원소의 수가 입력에 따라 달라질 수 있는 경우에는 사용할 수 없다는 문제가 있다. 다음은 재귀 함수로 구현을 한 코드다.

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

이와 같이 재귀 호출을 이용하면 특정 조건을 만족하는 조합을 모두 생성하는 코드를 쉽게 작성할 수 있다. 때문에 재귀 호출은 완전 탐색을 구현할 때 아주 유용한 도구다.

### 예제: 보글 게임(문제 ID: BOGGLE, 난이도: 하)
&nbsp;보글(Boggle) 게임은 그림 (a)와 같은 5x5 크기의 알파벳 격자인 게임판의 한 글자에서 시작해서 펜을 움직이면서 만나는 글자를 그 순서대로 나열하여 만들어지는 영어 단어를 찾아내는 게임입니다. 펜은 상하좌우, 혹은 대각선으로 인접한 칸으로 이동할 수 있으며 글자를 건너뛸 수는 없습니다. 지나간 글자를 다시 지나가는 것은 가능하지만, 펜을 이동하지않고 같은 글자를 여러번 쓸 수는 없습니다. 예를 들어 그림의 (b), (c), (d)는 각각 (a)의 격자에서 PRETTY, GIRL, REPEAT을 찾아낸 결과를 보여줍니다. 보글 게임판과 알고 있는 단어들의 목록이 주어질 때, 보글 게임판에서 각 단어를 찾을 수 있는지 여부를 출력하는 프로그램을 작성하세요.

> hasWord(y, x, word) = 보글 게임판의 (y, x)에서 시작하는 단어 word의 존재 여부를 반환한다.

### 문제의 분할
&nbsp;hasWord()가 하는 일을 가장 자연스럽게 조각내는 방법은 각 글자를 하나의 조각으로 만드는 것이다. 시작 위치 (x, y)에서 인접한 여덟 칸을 모두 시도하면서 답을 찾으면 된다.

### 기저 사례의 선택
&nbsp;첫번째, 위치 (x, y)에 있는 글자가 원하는 단어의 첫 글자가 아닌 경우 항상 실패한다. 두번째, 원하는 단어가 한 글자인 경우 항상 성공이다. 두 조건 간의 순서는 변하면 안된다.

### 구현

```c++
// 내가 짜본 말도 안되는 코드...
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

```c++
const int dx[8] = { -1, -1, -1, 1, 1, 1, 0, 0 };
const int dy[8] = { -1, 0, 1, -1, 0, 1, -1, 1 };

bool hasWord(int y, int x, const string& word) {
  // 기저 사례 1: 시작 위치가 범위 밖이면 무조건 실패
  if(!inRange(y, x)) return false;
  // 기저 사례 2: 첫 글자가 일치하지 않으면 실패
  if(board[y][x] != word[0]) return false;
  // 기저 사례 3: 단어 길이기 1이면 성공
  if(word.size() == 1) return true;
  // 인접한 여덟 칸을 검사한다
  for(int direction = 0; direction < 8; ++direction) {
    int nextY = y + dy[direction], nextX = x + dx[direction];
    // 다음 칸이 범위 안에 있는지, 첫 글자는 일치하는지 확인할 필요가 없다.
    if(hasWord(nextY, nextX, word.substr(1)))
      return true;
  }
  return false;
}
```

### 시간 복잡도 분석
&nbsp;시간 복잡도를 계산하는 것은 비교적 단순하다. 모든 경우의 수를 세어보기만 하면 된다.

### 완전 탐색 레시피
&nbsp;어떤 식으로 문제에 처음 접근해야 할지에 대한 대략적인 지침이다.

* 완전 탐색은 존재하는 모든 답을 하나씩 검사하므로, 걸리는 시간은 가능한 답의 수에 정확히 비례한다.
* 가능한 모든 답의 후보를 만드는 과정을 여러 개의 선택으로 나눈다. 각 선택은 답의 후보를 만드는 과정의 한 조각이 된다.
* 그중 하나의 조각을 선택해 답의 일부를 만들고, 나머지 답을 재귀 호출을 통해 완성한다.
* 조각이 하나밖에 남지 않은 경우, 혹은 하나도 남지 않은 경우에는 답을 생성했으므로, 이것을 기저 사례로 선택해 처리한다.

### 이론적 배경: 재귀 호출과 부분 문제
&nbsp;보글 게임에서 해당 단어를 이 위치에서 찾을 수 있는지 알기 위해 최대 아홉가지 정보를 알아야 한다. 주위 8가지 글자를 검사하는 경우는 형식이 같은 또 다른 문제다. 문제를 구성하는 조각들 중 하나를 뺐기 때문에, 이 문제들은 원래 문제의 일부라고 말할 수 있다. 이런 문제들을 원래 문제의 부분 문제라고 한다.

## 03. 문제: 소풍(문제 ID: PICNIC, 난이도: 하)
&nbsp;안드로메다 유치원 익스프레스반에서는 다음 주에 율동공원으로 소풍을 갑니다. 원석 선생님은 소풍 때 학생들을 두 명씩 짝을 지어 행동하게 하려고 합니다. 그런데 서로 친구가 아닌 학생들끼리 짝을 지어 주면 서로 싸우거나 같이 돌아다니지 않기 때문에, 항상 서로 친구인 학생들끼리만 짝을 지어 줘야 합니다. 각 학생들의 쌍에 대해 이들이 서로 친구인지 여부가 주어질 때, 학생들을 짝지어줄 수 있는 방법의 수를 계산하는 프로그램을 작성하세요. 짝이 되는 학생들이 일부만 다르더라도 다른 방법이라고 봅니다. 예를 들어 다음 두 가지 방법은 서로 다른 방법입니다.

* (태연,제시카) (써니,티파니) (효연,유리)
* (태연,제시카) (써니,유리) (효연,티파니)

### 시간 및 메모리 제한
&nbsp;프로그램은 1초 내에 실행되어야 하고, 64MB 이하의 메모리만을 사용해야 한다.

### 입력
&nbsp;입력의 첫 줄에는 테스트 케이스의 수 C (C <= 50) 가 주어집니다. 각 테스트 케이스의 첫 줄에는 학생의 수 n (2 <= n <= 10) 과 친구 쌍의 수 m (0 <= m <= n*(n-1)/2) 이 주어집니다. 그 다음 줄에 m 개의 정수 쌍으로 서로 친구인 두 학생의 번호가 주어집니다. 번호는 모두 0 부터 n-1 사이의 정수이고, 같은 쌍은 입력에 두 번 주어지지 않습니다. 학생들의 수는 짝수입니다.

### 출력
&nbsp;각 테스트 케이스마다 한 줄에 모든 학생을 친구끼리만 짝지어줄 수 있는 방법의 수를 출력합니다.

### 개인적 풀이
&nbsp;만약 10P10으로 모든 경우의 수를 계산할 때는 10! * 50 = 1.8억 이렇게 경우의 수만 1억이 넘는다. 따라서 이렇게 풀면 안된다. 우리에게는 친구 쌍이 주어지기 때문에 이것을 이용해 만들 수 있는 경우의 수를 생각해보면 될 것 같다.

```c++
// 어렵다....너무 어렵다...
int combinationFriend(int numberOfStudents, const vector<int>& friendList, const vector<int>& selectedFriends) {
  // 기저 사례
  if(selectedFriends.length() == numberOfStudents) { return 1; }
  int result = 0;
  for(int friendListIndex = 0; friendListIndex < friendList.length(); friendListIndex + 2) {
    if(checkStudentsDuplecation(selectedFriends, { friendList[friendListIndex], friendList[friendListIndex + 1] })) {
      // selectedFriends에 friendList[friendListIndex], friendList[friendListIndex + 1]를 추가하고, friendList에서 앞에 추가한 값을 빼고, 새롭게 combinationFriend를 호출한다.
    } else {
      // 조합을 다 못만들었는데 친구들이 중복되면 0을 반환
      return 0;
    }
  }
}
```

## 04. 풀이: 소풍

### 완전 탐색
&nbsp;완전 탐색을 이용해 조합을 모두 만들어 보는 것이다. 재귀 호출을 이용해 코드를 작성해 보자.

### 중복으로 세는 문제
&nbsp; 이 코드를 예제 입력을 이용해 실행해 보면 전혀 다른 답이 나온다. 이유는 한 경우를 중복으로 여러번 세고 있기 때문이다.

```c++
int n;
bool areFriends[10][10];
// taken[i] = i 번째 학생이 짝을 이미 찾았으면 true, 아니면 false
int countPairings(bool taken[10]) {
  // 기저 사례: 모든 학생이 찾을 찾았으면 한 가지 방법을 찾았으니 종료한다.
  bool finished = true;
  for(int i = 0; i < n; ++i) if(!taken[i]) finished = false;
  if(finished) return 1;
  int ret = 0;
  // 서로 친구인 두 학생을 찾아 짝을 지어 준다.
  for(int i = 0; i < n; ++i)
    for(int j = 0; j < n; ++j)
      if(!taken[i] && !taken[j] && areFriends[i][j]) {
        taken[i] = taken[j] = true;
        ret += countPairings(taken);
        taken[i] = taken[j] = false;
      }
  return ret;
}
```

이 코드에는 두가지 문제점이 있다. 같은 학생 쌍을 두 번 짝지어 준다. 다른 순서로 학생들을 짝지어 주는 것을 서로 다른 경우로 세고 있다. 이 상황을 해결하기 위한 좋은 방법은 항상 특정 형태를 갖는 답만을 세는 것이다. 흔히 사용하는 방법으로는 같은 답 중에서 사전순으로 가장 먼저 오는 답 하나만을 세는 것이 있다. 이 속성을 강제하기 위해서 각 단계에서 남아 있는 학생들 중 가장 번호가 빠른 학생의 짝을 찾아 주도록 하면 됩니다.

```c++
int n;
bool areFriends[10][10];
// taken[i] = i 번째 학생이 짝을 이미 찾았으면 true, 아니면 false
int countPairings(bool taken[10]) {
  // 남은 학생들 중 가장 번호가 빠른 학생을 찾는다.
  int firstFree = -1;
  for(int i = 0; i < n; ++i) {
    if(!taken[i]) {
      firstFree = i;
      break;
    }
  }
  // 기저 사례: 모든 학생이 짝을 찾았으면 한 가지 방법을 찾았으니 종료한다.
  if(firstFree == -1) return 1;
  int ret = 0;
  // 이 학생과 짝지을 학생을 결정한다.
  for(int pairWith = firstFree + 1; pairWith < n; ++pairWith) {
    if(!taken[pairWith] && areFriends[firstFree][pairWith]) {
      taken[firstFree] = taken[pairWith] = true;
      ret += countPairings(taken);
      taken[firstFree] = taken[pairWith] = false;
    }
  }
  return ret;
}
```

### 답의 수의 상한
&nbsp;프로그램을 짜기 전에 답의 수가 얼마나 될지 예측해 보고 모든 답을 만드는 데 시간이 얼마나 오래 걸릴지를 확인해야 한다.

## 05. 문제: 게임판 덮기(문제 ID: BOARDCOVER, 난이도: 하)
&nbsp;H*W 크기의 게임판이 있습니다. 게임판은 검은 칸과 흰 칸으로 구성된 격자 모양을 하고 있는데 이 중 모든 흰 칸을 3칸짜리 L자 모양의 블록으로 덮고 싶습니다. 이 때 블록들은 자유롭게 회전해서 놓을 수 있지만, 서로 겹치거나, 검은 칸을 덮거나, 게임판 밖으로 나가서는 안 됩니다. 게임판이 주어질 때 이를 덮는 방법의 수를 계산하는 프로그램을 작성하세요.

### 시간 및 메모리 제한
&nbsp;프로그램은 2초 안에 실행되어야 하며, 64MB 이하의 메모리를 사용해야만 한다.

### 입력
&nbsp;입력의 첫 줄에는 테스트 케이스의 수 C (C <= 30) 가 주어집니다. 각 테스트 케이스의 첫 줄에는 2개의 정수 H, W (1 <= H,W <= 20) 가 주어집니다. 다음 H 줄에 각 W 글자로 게임판의 모양이 주어집니다. # 은 검은 칸, . 는 흰 칸을 나타냅니다. 입력에 주어지는 게임판에 있는 흰 칸의 수는 50 을 넘지 않습니다.

### 출력
&nbsp;한 줄에 하나씩 흰 칸을 모두 덮는 방법의 수를 출력한다.

### 개인적 풀이
&nbsp;이 문제 또한 모든 경우를 대입해 보면 된다. 우선 빈칸의 개수를 알아낸다. 입력을 받을 때 .이면 빈칸의 개수 변수(emptyBoard)를 증가시키는 방법이면 될 것 같다. 또한 빈칸이 다 채워지기 위해서는 emptyBoard / 3 개 만큼의 ㄴ자 블럭이 필요하다. 또한 ㄴ 블럭은 자유롭게 회전이 가능하기 때문에 ㄴ, ㄱ(좌우반전), ㄱ, ㄴ(좌우반전) 이렇게 4가지의 블럭이 나온다. 게임판의 [0][0]부터 [H][W]까지 ㄴ 블럭을 넣을 수 있는 곳을 검사하고 넣을 수 있으면 재귀적으로 함수를 다시 호출한다. 이렇게 모든 블럭을 순서대로 넣어보고 처음에 구한 emptyBoard / 3 개 만큼의 블럭을 다 사용하면 1을 return한다.

```c++
// 소풍 문제를 참고해서 만들어 봤다.
char board[20][20];
int blockShape[4][3][2] = {
  {{0, 0}, {1, 0}, {1, 1}}, // ㄴ
  {{0, 0}, {1, 0}, {0, 1}}, // ㄱ(좌우반전)
  {{0, 0}, {0, 1}, {1, 1}}, // ㄱ
  {{0, 1}, {1, 0}, {1, -1}}  // ㄴ(좌우반전)
};
int numberOfBlock, H, W;

int fillBoard(int numberOfBlock) {
  // 기저 사례
  if(numberOfBlock == 0) return 1;

  int ret = 0;
  
  for(int block = 0; block < 4; block++) {
    // block 모양을 바꾸면서 들어갈 수 있는지 검사한다.
    for(int row = 0; row < H; row++) {
      for(int col = 0; col < W; col++) {
        // 모든 row col 검사
        if(board[row + blockShape[block][0][0]][col + blockShape[block][0][1]] == "." && board[row + blockShape[block][1][0]][col + blockShape[block][1][1]] == "." && board[row + blockShape[block][2][0]][col + blockShape[block][2][1]] == ".") {
          // 만약 블럭이 들어갈 수 있으면 블럭을 채워 넣는다.
          board[row + blockShape[block][0][0]][col + blockShape[block][0][1]] = "#";
          board[row + blockShape[block][1][0]][col + blockShape[block][1][1]] = "#";
          board[row + blockShape[block][2][0]][col + blockShape[block][2][1]] = "#";
          // 재귀적 함수 호출. 블럭을 하나 채웠기 때문에 블럭의 개수를 하나 줄인다.
          ret += fillBoard(numberOfBlock - 1);
          // 다시 채운 블럭을 뺀다.
          board[row + blockShape[block][0][0]][col + blockShape[block][0][1]] = ".";
          board[row + blockShape[block][1][0]][col + blockShape[block][1][1]] = ".";
          board[row + blockShape[block][2][0]][col + blockShape[block][2][1]] = ".";

        }
      }
    }
  }
  return ret;
}
```

## 06. 풀이: 게임판 덮기
&nbsp;이 문제도 경우의 수를 세는 것이니만큼, 모든 경우를 생성하는 완전 탐색을 이용해 해결할 수 있다. 우선 입력으로 주어진 게임판에서 흰 칸의 수가 3의 배수가 아닐 경우에는 무조건 답이 없으니 이 부분을 따로 처리한다. 이 외의 경우에는 흰 칸의 수를 3으로 나눠서 내려놓을 블록의 수 N을 얻은 뒤, 문제의 답을 생성하는 과정을 N조각으로 나눠 한 조각에서 한 블록을 내려놓도록 한다.

### 중복으로 세는 문제
&nbsp;블록을 놓는 순서는 이 문제에서 중요하지 않은데, 방금 설명한 방식으로는 같은 배치도 블록을 놓는 순서에 따라서 여러 번 세기 때문이다. 따라서 특정한 순서대로 답을 생성하도록 강제할 필요가 있다. 빈 칸 중에서 가장 위, 그 중에서도 가장 왼쪽에 있는 칸을 처음 채운다고 가정하기 때문에 그 왼쪽과 위에 있는 칸은 항상 이미 채워져 있다고 가정할 수 있습니다.

### 답의 수의 상한
&nbsp;이 문제의 답은 최대 얼마가 될까? 무리는 최대 16개의 블록을 놓기 때문에 가능한 답의 상한은 4^16 = 2^32 개가 된다. 하지만 실제 입력을 손으로 풀어보면 각 단계에서 우리가 선택할 수 있는 블록 배치가 크게 제한됨을 알 수 있다. 예를 들어 6칸이 잇는 입력이 주어진다면 이론 상으로는 4^2 = 16가지 방법이 있어야 하지만 실제로는 두가지 방법 뿐이다. 이렇게 실제 답은 상한보다 훨씬 작다.

### 구현
```c++
// 주어진 칸을 덮을 수 있는 네가지 방법
// 블록을 구성하는 세 칸의 상대적 위치 (dy, dx)의 목록
const int coverType[4][3][2] = {
  { { 0, 0 }, { 1, 0 }, { 0, 1 } },
  { { 0, 0 }, { 0, 1 }, { 1, 1 } },
  { { 0, 0 }, { 1, 0 }, { 1, 1 } },
  { { 0, 0 }, { 1, 0 }, { 1, -1 } }
};
// board의 (y, x)를 type번 방법으로 덮거나, 덮었던 블록을 없앤다.
// delta = 1이면 덮고, -1이면 덮엇던 블록을 없앤다.
// 만약 블록이 제대로 덮이지 않은 경우 (게임판 밖으로 나가거나,
// 겹치거나, 검은 칸을 덮을 때) false를 반환한다.

bool set(vector<vector<int> >& board, int y, int x, int type, int delta) {
  bool ok = true;
  for(int i = 0; i < 3; ++i) {
    const int ny = y + coverType[type][i][0];
    const int nx = x + coverType[type][i][1];
    if(ny < 0 || ny >= board.size() || nx < 0 || nx >= board[0].size())
      ok = false;
    else if((board[ny][nx] += delta) > 1)
      ok = flase;
  }
  return ok;
}
// board의 모든 빈 칸을 덮을 수 있는 방법의 수를 반환한다.
// board[i][j] = 1 이미 덮인 칸 혹은 검은 칸
// board[i][j] = 0 아직 덮이지 않은 칸
int cover(vector<vector<int> >& board) {
  // 아직 채우지 못한 칸 중 가장 윗줄 왼쪽에 있는 칸을 찾는다.
  int y = -1, x = -1;
  for(int j = 0; i < board.size(); ++i) {
    for(int j = 0; j < board[i].size(); ++j)
      if(board[i][j] == 0) {
        y = i;
        x = j;
        break;
      }
    if(y != -1) break;
  }
  // 기저 사례: 모든 칸을 채웠으면 1을 반환한다.
  if(y == -1) return 1;
  int ret = 0;
  for(int type = 0; type < 4; ++type) {
    if(set(board, y, x, type, 1))
      ret += cover(board);
    // 덮었던 블록을 치운다
    set(board, y, x, type, -1)
  }
  return ret;
}
```

### 내가 짠 코드와 비교해 보기
&nbsp;일단 아이디어는 책과 비슷했다. 다만 순서를 강제한다는 생각을 하지 못하고 처음부터 0, 0부터 넣기로 생각 했었다. 또한 -1을 처리하는 부분에서 0 - 1이 계산 돼서 존재하지 않는 인덱스에 접근하는 경우를 예외처리 해주지 못했다. 다음부터는 좀더 깊게 생각해야 할 것 같다.

## 07. 최적화 문제
&nbsp;답이 여러 개이고, 그 중 에서 어떤 기주에 따라 가장 좋은 답을 찾아 내는 문제들을 통칭해 최적화 문제(Optimization problem)라고 부른다. 최적화 문제를 보다 빠르게 푸는 기술은 이 책의 중요한 주제 중 하나이다. 최적화 문제 해결 기법중 가장 기초적인 것이 완전 탐색이다.

### 예제: 여행하는 외판원 문제
&nbsp;가장 유명한 최적화 문제 중 하나로 여행하는 외원판 문제(Traveling Sales-man Problem, TSP)가 있다. 어떤 나라에 n(2 <= n <= 10)개의 큰 도시가 있다고 한다. 한 영업 사원이 한 도시에서 출발해 다른 도시들을 전부 한 번씩 방문한 뒤 시작 도시로 돌아오려고 한다. 문제를 간단히 하기 위해, 각 도시들은 모두 직선 도로로 연결되어 있다고 한다. 이때 영업 사원이 여행해야 할 거리는 어느 순서로 각 도시들을 방문하느냐에 따라 달라진다. 이때 가능한 모든 경로 중 가장 짧은 경로를 어떻게 찾아낼 수 있을까?

### 무식하게 풀 수 있을까?
&nbsp;완전 탐색으로 문제를 풀기 위한 첫 번째 단계는 시간 안에 답을 구할 수 있을지 확인하는 것이다. 우리는 시작한 도시로 돌아오는 경로를 찾기 때문에, 결로의 시작점은 신경 쓰지 않고 무조건 0번 도시에서 출발한다고 가정해도 경로의 길이는 다르지 않다. 그러면 남은 도시들을 어떤 순서로 방문할지를 정하기만 하면 된다.

### 재귀 호출을 통한 답안 생성

```c++
int n; // 도시의 수
double dist[MAX][MAX]; // 두 도시 간의 거리를 저장하는 배열
// path: 지금까지 만든 경로
// visited: 각 도시의 방문 여부
// currentLength: 지금까지 만든 경로의 길이
// 나머지 도시들을 모두 방문하는 경로들 중 가장 짧은 것의 길이를 반환한다.
double shortestPath(vector<int>& path, vector<bool>& visited, double currentLength) {
  // 기저 사례: 모든 도시를 다 방문했을 때는 시작 도시로 돌아가고 종료한다.
  if(path.size() == n)
    return currentLength + dist[path[0]][path.back()];
  double ret = INF; // 매우 큰 값으로 초기화
  // 다음 방문할 도시를 전부 시도해 본다.
  for(int next = 0; next < n; ++next) {
    if(visited[next]) continue;
    int here = path.back();
    path.push_back(next);
    visited[next] = true;
    // 나머지 경로를 재귀 호출을 통해 완성하고 가장 짧은 경로의 길이를 얻는다.
    double cand = shortestPath(path, visited, currentLength + dist[here][next]);
    ret = min(ret, cand);
    visited[next] = false;
    path.pop_back();
  }
  return ret;
}
```

## 08. 문제: 시계 맞추기(문제 ID: CLOCKSYNC, 난이도: 중)
&nbsp;4 x 4 개의 격자 형태로 배치된 16개의 시계가 있다. 이 시계들은 모두 12시, 3시, 6시, 혹은 9시를 가리키고 있다. 이 시계들이 모두 12시를 가리키도록 바꾸고 싶다. 시계의 시간을 조작하는 유일한 방법은 모두 10개 있는 스위치들을 조작하는 것으로, 각 스위치들은 모두 적게는 3개에서 많게는 5개의 시계에 연결되어 있다. 한 스위치를 누를 때마다, 해당 스위치와 연결된 시계들의 시간은 3시간씩 앞으로 움직인다.

* 0번 버튼: 0, 1, 2
* 1번 버튼: 3, 7, 9, 11
* 2번 버튼: 4, 10, 14, 15
* 3번 버튼: 0, 4, 5, 6, 7
* 4번 버튼: 6, 7, 8, 10, 12
* 5번 버튼: 0, 2, 14, 15
* 6번 버튼: 3, 14, 15
* 7번 버튼: 4, 5, 7, 14, 15
* 8번 버튼: 1, 2, 3, 4, 5
* 9번 버튼: 3, 4, 5, 9, 13

### 시간 및 메모리 제한
&nbsp;프로그램은 10초 안에 실행되어야 하며, 64MB 이하의 메모리를 사용해야 한다.

### 입력
&nbsp;첫 줄에 테스트 케이스의 개수 C (<= 30) 가 주어진다. 각 테스트 케이스는 한 줄에 16개의 정수로 주어지며, 각 정수는 0번부터 15번까지 각 시계가 가리키고 있는 시간을 12, 3, 6, 9 중 하나로 표현한다.

### 출력
&nbsp;각 테스트 케이스당 한 줄을 출력한다. 시계들을 모두 12시로 돌려놓기 위해 눌러야 할 스위치의 최소 수를 출력한다. 만약 이것이 불가능할 경우 -1 을 출력한다.

### 개인적 풀이
&nbsp;clocks[15]에 입력받은 배열을 저장한다. clocks배열 값을 12에서 빼고 3으로 나누면 눌러져야할 버튼의 횟수가 나온다. 이 횟수를 n이라 했을 때, n + 4m (m은 정수)번 눌러야 한다고 할 수 있다. 시계의 시간을 바꾸는 스위치는 10개가 있다. 또한 스위치를 누를때는 순서와 상관없이 항상 결과 값은 같다. 그리고 시간 제한이 10초이기 때문에 아마도 모든 경우을 시도해봐도 될 것 같다. 0번 버튼부터 눌러보거나 안 눌러보거나 두가지 경우로 나눠서 각각의 경우에서 다시 1번 버튼을 누르는 경우 안 누르는 경우 이렇게 나눠가면서 재귀적으로 계산해 보면 될 것 같다. 기저 사례는 어떠한 버튼이 4번이상 눌러지면 종료 되게끔 만들면 될 것 같다. 또한 이 경우들 중에서 아무리 눌러도 전부 12시로 맞추는 경우가 없을때는 걸러내야 한다. 만약 똑같은 버튼을 5번 누르면 그건 버튼 1번 누른 것과 같다. 한 버튼당 누를 수 있는 최대 횟수는 3번이다. 최소 값을 찾아야 하기 때문에 4번 이상 누르는 것은 의미가 없다.

```c++
// 기저 사례 검사를 위한 변수
int check = 0;
// 현재 버튼
int switchNumber = 0;
// 입력받은 배열
vector<int> clocks;
// 스위치들의 배열
vector<vector<int> > switches{
  { 0, 1, 2 }, { 3, 7, 9, 11 }, { 4, 10, 14, 15 }, { 0, 4, 5, 6, 7 }, { 6, 7, 8, 10, 12 },
  { 0, 2, 14, 15 }, { 3, 14, 15 }, { 4, 5, 7, 14, 15 }, { 1, 2, 3, 4, 5 }, { 3, 4, 5, 9, 13 }
};
// 기저 사례를 위한 스위치 눌린 횟수
vector<int> numberOfSwitchPressList{
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
};
// 눌러져야 할 버튼의 횟수. 길이는 12
vector<int> numberOfSwitchPressed = calculateNumberOfSwitchPressed(clocks);

int calculateMinimum(vector<int>& numberOfSwitchPressed, vector<int>& numberOfSwitchPressList, int switchNumber) {
  if(switchNumber == 10) switchNumber = 0;
  // 기저 사례: 한 스위치가 4번 이상 눌려서 더이상 경우의 수를 계산하지 않아도 되는 경우
  // 틀렸음: 이렇게 되면 아무 것도 누르지 않는 경우는 무한 루프로 실행된다.
  for(int i = 0; i < 10; i++) if(numberOfSwitchPressList[i] == 4) return -1;

  // 기저 사례: 시계바늘이 12를 가리키고 있으면 check변수를 ++ 해서 검사를 한다.
  for(int i = 0; i < 12; i++) if(numberOfSwitchPressed[i] == 0) check++;
  if(check == 12) return sum(numberOfSwitchPressList);
  else check = 0;

  int ret = 0;
  // switchNumber 버튼을 누른 경우
  numberOfSwitchPressList[switchNumber]++;
  for(int i = 0; i < switches[switchNumber].length(); i++) {
    if(--numberOfSwitchPressed[switches[switchNumber][i]] == -1) {
      // 눌러야하는 횟수가 -1이 되면 3번더 눌러야 12가 되기 때문에 3을 대입
      numberOfSwitchPressed[switches[switchNumber][i]] = 3;
    }
  }
  // 재귀적 호출
  int firstCase = calculateMinimum(numberOfSwitchPressed, numberOfSwitchPressList, switchNumber++);
  // 누르지 않은 경우를 계산하기 위해서 원래 상태로 돌린다
  numberOfSwitchPressList[switchNumber]--;
  for(int i = 0; i < switches[switchNumber].length(); i++) {
    if(++numberOfSwitchPressed[switches[switchNumber][i]] == 4) {
      // 눌러야하는 횟수가 4이 되면 누를 필요가 없기 때문에 0을 대입
      numberOfSwitchPressed[switches[switchNumber][i]] = 0;
    }
  }
  // switchNumber 버튼을 안 누른 경우
  // 재귀적 호출
  int secondCase = calculateMinimum(numberOfSwitchPressed, numberOfSwitchPressList, switchNumber++);
  
  if(firstCase == -1 && secondCase == -1)
    ret = -1;
  else if(firstCase == -1)
    ret = secondCase;
  else if(secondCase == -1)
    ret = firstCase;
  else if(firstCase < secondCase)
    ret = firstCase;
  else
    ret = secondCase;

  return ret;
}
```

## 09. 풀이: 시계 맞추기

### 문제 변형하기
&nbsp;이 문제는 있는 그대로 풀려고 하면 꽤나 복잡하다. 그러나 문제의 특성을 이용해 적절히 단순화하면 완전 탐색으로 해결할 수 있다. 처음 깨달아야 할 것은 스위치를 누르는 순서는 전혀 중요하지 않다는 것이다. 따라서 우리가 계산해야 할 것은 각 스위치를 몇 번이나 누를 것이냐 뿐이다. 시계는 12시간이 지나면 제 자리로 돌아온다는 점을 이용하면 무한한 조합의 수를 유한하게 바꿀 수 있다. 어떤 스위치건 간에 최대 세 번 이상 누를 일이 없다. 따라서 열개의 스위치를 누르는 경우의 수는 4 ^ 10개가 된다. 따라서 완전 탐색으로 무난하게 풀 수 있다.

### 완전 탐색 구현하기
&nbsp;문제를 모두 열 조각으로 나눈 후 각 조각에서 한 스위치를 누를 횟수를 정하는 식으로 구현됐다. 재귀 호출의 깊이가 정해져 있기 때문에 사실 이 코드는 10중 for문과 다르지 않지만, 이 쪽이 훨씬 구현하기도 편하고 디버깅하기도 쉽다.

```c++
const int INF = 9999, SWITCHES = 10, CLOCKS = 16;
// linked[i][j] = 'x': i번 스위치와 j번 시계가 연결되어 있다.
// linked[i][j] = '.': i번 스위치와 j번 시계가 연결되어 있지 않다.
const char linked[SWITCHES][CLOCKS + 1] = {
  "xxx.............",
  "...x...x.x.x....",
  "....x.....x...xx",
  "x...xxxx........",
  "......xxx.x.x...",
  "x.x...........xx",
  "...x..........xx",
  "....xx.x......xx",
  ".xxxxx..........",
  "...xxx...x...x.."
};
// 모든 시계가 12시를 가리키고 있는지 확인한다.
bool areAligend(const vector<int>& clocks);
// swtch번 스위치를 누른다.
void push(vector<int>& clocks, int swtch) {
  for(int clock = 0; clock < CLOCKS; ++clock)
    if(linked[swtch][clock] == 'x') {
      clocks[clock] += 3;
      if(clocks[clock] == 15) clocks[clock] = 3;
    }
}
// clocks: 현재 시계들의 상태
// swtch: 이번에 누를 스위치의 번호
// 가 주어질 때, 남은 스위치들을 눌러서 clocks를 12시로 맞출 수 있는 최소 횟수를 반환한다.
// 만약 불가능하다면 INF 이상의 큰 수를 반환한다.
int solve(vector<int>& clocks, int swtch) {
  if(swtch == SWITCHES) return areAligned(clocks) ? 0 : INF;
  // 이 스위치를 0번 누르는 경우부터 세 번 누르는 경우까지를 모두 시도한다.
  int ret = INF;
  for(int cnt = 0; cnt < 4; ++cnt) {
    ret = min(ret, cnt + slove(clocks, swtch + 1));
    push(clocks, swtch);
  }
  // push(clocks, swtch)가 네 번 호출되었으니 clocks는 원래와 같은 상태가 된다.
  return ret;
}
```

### 내가 짠 코드와 비교해 보기
&nbsp;아이디어는 똑같았다. 하지만 내가 짠 코드에서는 인자값으로 n번 버튼을 누를지 말지 결정하고 다음 n + 1번 버튼을 누를지 말지 결정하는 방식으로 해서 이러한 사이클을 4번 반복하는 식이였다. 하지만 4번 반복했는지를 검사하는 방법을 어떤 버튼이 4번 이상 눌렸는지 검사하는 경우라 이렇게 되면 버튼을 안누를 경우는 무한 재귀함수로 실행된다. 따라서 이 코드는 잘못 됐다. 책에서 나온 풀이가 가장 효율적인 방법중 하나인 것 같다.

## 10. 많이 등장하는 완전 탐색 유형
&nbsp;주어진 원소로 만들 수 있는 모든 순열 만들기, 주어진 원소 중 R개를 골라낼 수 있는 방법 만들기 등은 다른 문제의 부분 문제로도 빈번히 출제 된다.

### 모든 순열 만들기
&nbsp;서로 다른 N개의 원소를 일렬로 줄 세운 것을 순열(Permutation)이라고 부른다. 가능한 순열의 수는 N!이 되는데, N이 10을 넘어간다면 시간 안에 모든 순열을 생성하기 어려우므로 완전 탐색 말고 다른 방법을 생각해야 한다. STL에 포함된 next_permutation() 함수에서 모든 순열을 순서대로 생성하는 작업을 대신해 준다.

### 모든 조합 만들기
&nbsp;서로 다른 N개의 원소 중에서 R개를 순서 없이 골라낸 것을 조합(Combination)이라고 부른다.

### 2^n가지 경우의 수 만들기
&nbsp;n개의 질문에 대한 다빙 예/아니오 중의 하나라고 할 때 존재할 수 있는 답의 모든 조합의 수는 2^n가지다. 각 조합을 하나의 n비트 정수로 표현한다고 생각하면 재귀 호출을 사용할 것 없이 1차원 for문 하나로 이 조합들을 간단하게 모두 시도할 수 있다.