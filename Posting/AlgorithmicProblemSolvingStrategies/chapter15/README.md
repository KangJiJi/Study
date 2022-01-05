15장 계산 기하
==============

## 1. 도입
&nbsp;각종 기하학적 도형을 다루는 알고리즘을 계산 기하(Computational geometry)알고리즘이라고 한다.

## 2. 계산 기하의 도구들
&nbsp;다음은 계산 기하를 사용할 때 필수적으로 사용해야 하는 개념들 이다.

### 백터의 구현
&nbsp;2차원 평면 위 서로 다른 두 점의 상대적 위치를 표현하기 위해 방향과 거리를 이용해서 벡터(Vector)라는 개념을 이용한다. 다음은 벡터의 구현이다.

```c++
const double PI = 2.0 * acos(0.0);

// 2차원 벡터를 표현한다.

struct vector2 {
  double x,y;
  // 생성자를 explicit으로 지정하면 vector2를 넣을 곳에 잘못해 
  // 실수가 들어가는 일을 방지해준다.
  explicit vector2 (double x_ = 0, double y_ = 0) : x(x_), y(y_) {}

  // 두 벡터의비교 
  bool operator == (const vector2& rhs) const { 
    return x == rhs.x && y == rhs.y;
  }

  bool operator < (const vector2& rhs) const {
    return x != rhs.x ? x < rhs.x : y < rhs.y;
  }

  // 벡터의 덧셈과 뺄셈 
  vector2 operator + (const vector2& rhs) const {
    return vector2 (x + rhs.x, y + rhs.y);
  }

  vector2 operator - (const vector2& rhs) const {
    return vector2 (x -rhs.x,y-rhs.y);
  }

  // 실수로 곱셈 
  vector2 operator * (double rhs) const { 
    return vetor2 ( x*rhs,y*rhs);
  }

  // 벡터의 길이를 반환한다.
  double norm() const { return hypot(x,y); }

  // 방향이 같은 단위 벡터 (unit vector)를 반환한다.
  // 영벡터에 대해 호출한 경우 반환값은 정의되지 않는다.
  vector2 normalize() const {
    return vector2 (x/norm(),y/norm());
  }

  // x축의 양의 방향으로부터 이 벡터까지 반 시계 방향으로 잰 각도 
  double polar() const {
    return fmod(atan2(y,x) + 2*PI,2*PI);
  }

  // 내적/외적의 구현 
  double dot (const vector2& rhs) const { 
    return x * rhs.x + y * rhs.y;
  }

  double cross (const vector2& rhs) const {
    return x* rhs.y - rhs.x*y;
  }

  // 이 벡터를 rhs에 사영한 결과 
  vector2 project (const vector2& rhs) const {
    vector2 r = rhs.normalize();
    return r * r.dot(*this);
  }
};
```

### 점과 직선, 선분의 표현
&nbsp;벡터를 이용해 점과 직선, 선분을 간편하게 표현할 수 있다. 이런 표현은 귀찮을 수 있지만, 벡터를 기준으로 생각하는 것이 많은 경우 강력한 도구로 작용한다.

### 벡터의 내적과 외적
&nbsp;두 벡터의 내적 a * b는 abs(a) * abs(b) * cos(theta)이다. 내적은 다음과 같은 용도로 사용된다.

* 벡터의 사이각 구하기
* 벡터의 직각 여부 확인하기
* 벡터의 사영
* 면적 계산하기
* 두 벡터의 방향 판별

## 3. 교차와 거리, 면적

### 직선과 직선의 교차
&nbsp;직선의 교차를 작성할 수 있는 간단한 방법은 직선을 한 점과 방향 벡터로 표현하는 것이다. 다음과 같이 간결하게 코드를 짤 수 있다.

```c++
//(a, b)를 포함하는 선과 (c, d)를 포함하는 선의 교점을 x에 반환한다.
//두 선이 평행이면 (겹치는 경우를 포함) 거짓을, 아니면 참을 반환한다.

bool lineIntesection(vector2 a, vector2 b, vector2 c, vector2 d, vector2& x){
	double det = (b - a).cross(d - c);

	if(fabs(det) < EPSILON) return false;
	x = a + (b - a) * ((c - a).cross(d - c) / det);
	return true;
}
```

### 선분과 선분의 교차
&nbsp;두 직선의 교차점을 확인하고, 이 교차점이 모두 두 선분위에 오는지 확인하면 된다. 하지만 한 직선 위에 두 선분이 있을 때 이 선분들의 관계는 넷 중 하나이다.

* 두 선분이 서로 겹치지 않음
* 두 선분이 한 점에서 닿음
* 두 선분이 겹쳐짐
* 한 선분이 다른 선분 안에 포함됨

다음 코드는 이와 같은 경우를 모두 고려하는 구현을 보여준다.

```c++
// (a, b)와 (c, d)가 평행한 두 선분 일 때, 이들이 한 점에서 겹치는지 확인한다.
bool parallelSegments(vector2 a, vector2 b, vector2 c, vector2 d, vector2& p){
	if(b < a) swap(a, b);
	if(d < c) swap(c, d);

	// 한 직선 위에 없거나 두 선분이 겹치지 않는 경우를 우선 걸러낸다.
	if(ccw(a, b, c) != 0 || b < c || d < a) return false;

	// 두 선분은 확실히 겹친다. 교차점을 하나 찾자
	if(a < c) p = c;
	else p = a;
	return true;

}

// p가 (a, b)를 감싸면서 각 변이 x, y축에 평행한 최소 사각형 내부에 있는지 확인한다.
// a, b, p는 일직선 상에 있다고 가정한다
bool inBoundingRectangle(vector2 p, vector2 a, vector2 b){
	if(b < a) swap(a, b);
	return p == a || p == b || (a < p && p < b);
}

// (a, b) 선분과 (c, d) 선분의 교점을 p에 반환한다.
// 교점이 여러 개일 경우 아무 점이나 반환한다.
// 두 선분이 교차하지 않을 경우 false를 반환한다.
bool segmentIntersection(vector2 a, vector2 b, vector2 c, vector2 d, vector2& p){

	// 두 직선이 평행인 경우를 우선 예외로 처리한다.
	if(!lineIntesection(a, b, c, d, p))
		return parallelSegments(a , b, c, d, p);

	// p가 두 선분에 포함되어 있는 경우에만 참을 반환한다.
	return inBoundingRectangle(p, a, b) && inBoundingRectangle(p, c, d);
}
```

### 선분과 선분의 교차: 교차점이 필요 없을 때
&nbsp;`ccw()`를 이용해 두 선분의 교차여부를 확인할 수 있다. 두 선분 ab와 cd가 있을 때 ccw(a, b, c)와 ccw(a, b, d)중 하나는 양수, 하나는 음수가 되기 때문에 두 곱은 음수가 돼야 한다.

```c++
//두 선분이 서로 접촉하는지 여부를 반환한다.
bool segmentIntersects(vector2 a, vector2 b, vector2 c, vector2 d){
	double ab = ccw(a,b,c) * ccw(a, b, d);
	double cd = ccw(c, d, a) * ccw(c, d, b);

	//두 서분이 한 직선 위에 있거나 끝점이 겹치는 경우
	if(ab == 0 && cd == 0){
		if(b < a) swap(a, b);
		if(d < c) swap(c, d);
		return !(b < c || d < a);
	}
	return ab <= 0 && cd <= 0;
}
```

### 점과 선 사이의 거리
&nbsp;점과 선 사이의 거리를 벡터를 이용하면 쉽게 풀 수 있다. 수선의 발을 내려서 거리를 구할 수 있다.

```c++
// 점 p에서 (a, b) 직선에 내린 수선의 발을 구한다.
vector2 perpendicularFoot(vector2 p, vector2 a, vector2 b){
	return a + (p - a).project(b - a);
}
// 점 p와 (a, b)직선 사이의 거리를 구한다.
double pointToLine(vector2 p, vector2 a, vector2 b){
	return (p - perpendicularFoot(p, a, b)).norm();
}
```

## 6. 다각형
&nbsp;다각형은 현실을 계산 기하로 표현할 때 필수적인 요소다.

### 다각형의 종류

* 블록 다각형
* 오목 다각형
* 다순 다각형

### 면적 구하기
&nbsp;다음과 같이 단순 다각형의 넓이를 구할 수 있다.

```c++
//주어진 단순 다각형 p의 넓이를 구한다
//p는 각 꼭지점의 위치 벡터의 집합으로 주어진다
double area(const vector<vector2> &p) {
  double ret = 0;
  for (int i = 0; i < p.size(); i++) {
    int j = (i + 1) % p.size();
    ret += p[i].x * p[j].y - p[j].x * p[i].y;
  }
  return fabs(ret) / 2.0;
}
```

### 내부/외부 판별
&nbsp;점 q가 다각형 내부에 있는지 외부에 있는지 판별하는 함수를 만들어 본다. 반직선을 그어서 위로 살짝식 움직이면서 정확하게 계산할 수 있다. 다음은 구현이다.

```c++
//점 q가 다각형 p 안에 포함되어 있을 경우 참, 아닌 경우 거짓 반환
//q가 다각형의 경계 위에 있는 경우의 반환값은 정의되어 있지 않다
bool isInside(vector2 q, const vector<vector2> &p) {
  int crosses = 0;
  for (int i = 0; i < p.size(); i++) {
    int j = (i + 1) % p.size();
    // (p[i], p[j])가 반직선을 세로로 가로지르는가?
    if ((p[i].y > q.y) != (p[j].y > q.y)) {
      // 가로지르는 x 좌표를 계산
      double atX = (p[j].x - p[i].x)*(q.y - p[i].y) / (p[j].y - p[i].y) + p[i].x;
      if (q.x < atX) ++crosses;
    }
  }
  return crosses % 2 > 0;
}
```

## 9. 문제: 너드인가, 너드가 아닌가? (문제 ID: NERDS, 난이도: 중)
&nbsp;알고스팟에서 매년 진행하는 프로그래밍 대회가 가까워지고 있다. 올해는 열기가 특히 뜨거워, 참가 신청자의 수가 1만명을 돌파했다. 하지만 채점관을 할 자원봉사자는 다섯명박에 없어서 이 사람들을 다 대회에 참가시킬 수 없게 되었다. 그래서 대회 조직위는 오직 진정한 프로그래밍 너드(nerd) 들만을 대회에 받아주기로 했다. 종만의 새 이론에 따르면 어떤 사람의 너드 지수는 다음과 같이 두 가지 숫자의 선형 결합으로 정의된다.

F=A*신발 사이즈 + B*분당 타이핑 속도

이 너드 지수가 높으면 높을수록 너드에 가깝고, 낮을수록 너드가 아닐 확률이 높다. 이 이론에 따라 우리는 기준 점수 T를 정한뒤 너드 지수가 T 이상인 사람들만을 대회에 받아들이기로 했다. 과연 이 이론이 타당한가?

### 시간 및 메모리 제한
&nbsp;프로그램은 3초 안에 실행되어야 하며, 64MB 이하의 메모리를 사용해야 한다.

### 입력
&nbsp;입력의 첫 줄에는 테스트 케이스의 수 C(C <= 50)가 주어집니다. 각 테스트 케이스의 첫 줄에는 우리가 알고 있는 사람들의 수 N(6 <= N <= 5000)이 주어집니다. 그 후 N줄에 각 사람들의 정보가 각 세 개의 정수로 주어집니다. 첫 번째 정수는 이 사람이 너드인 경우 1, 아닌 경우 0입니다. 두 번째 정수와 세 번째 정수는 이 사람의 신발 사이즈와 분당 타이핑 속도로, 각각 [0, 10000] 범위의 정수 입니다. 입력에는 너드인 사람과 너드가 아닌 사람이 최소한 세 명 이상씩 주어집니다. 각 그룹에 대해 사람들의 신발 사이즈 벡터와 타이핑 속도 벡터는 서로 선형 독립입니다.

### 출력
&nbsp;각 테스트 케이스마다 한 줄을 출력합니다. A, B, T를 적절히 정해서 이 이론에 따라 너드와 너드가 아닌 사람들을 구분할 수 있으면 "THEORY HOLDS"를 출력하고, 구분할 수 없다면 "THEORY IS INVALID"를 출력합니다.

## 10. 풀이: 너드인가, 너드가 아닌가?

### 기하 문제로의 변환
&nbsp;이 문제는 기하 문제로 바꿔서 풀 수 있다. 신발 사이즈와 타이핑 속도를 각각 x, y좌표로 표현할 수 있다. 따라서 F를 직선으로 나타냈을 때 직선 위에 있으면 너드, 아래 있으면 너드가 아닌 것으로 판단할 수 있다.

### 볼록 껍질 모델링
&nbsp;볼록 껍질(Convex hull)을 이용해 이들을 구분할 수 있는 직선을 찾을 수 있다. 볼록 껍질이란 주어진 점들을 모두 포함하는 최소 크기의 다각형이다. 이런한 껍질을 찾을 수 있다면 두 껍질이 겹치거나 닿아 있지만 않다면 이들을 구분하는 직선은 반드시 존재한다.

### 볼록 껍질 찾기
&nbsp;볼록 껍질을 찾는 알고리즘 중 선물 포장 알고리즘(Gift wrapping algorithm)이 있다. 블록 껍질에 포함될 수 밖에 없는 점 하나를 찾아 가상의 '포장지'를 반시계 방향으로 돌리면서 다른 점들을 감싼다. 다음과 같이 구현할 수 있다.

```c++
typedef vector<vector2> polygon;

//points에 있는 점들을 모두 포함하는 최소의 볼록 다각형 찾기
//선물 포장 알고리즘
polygon giftWrap(const vector<vector2> &points) {
  int N = points.size();
  polygon hull;
  //가장 왼쪽 아래 점을 찾는다. 이 점은 껍질에 반드시 포함

  vector2 pivot = *min_element(points.begin(), points.end());

  hull.push_back(pivot);

  while (1) {
    // ph에서 시작하는 벡터가 가장 왼쪽인 점 next를 찾는다
    // 평행인 점이 여러 개 있으면 가장 먼 것을 선택
    vector2 ph = hull.back(), next = points[0];
    for (int i = 1; i < N; i++) {
      double cross = ccw(ph, next, points[i]);
      double distance = (next - ph).norm() - (points[i] - ph).norm();
      if (cross > 0 || (!cross&&distance < 0)) next = points[i];
    }
    // 시작점으로 돌아오면 종료
    if (next == pivot) break;
    // next를 볼록껍질에 포함
    hull.push_back(next);
  }

  return hull;
}
```

### 다각형 교차 판정
&nbsp;두 볼록 껍질을 구한 뒤 두 볼록 다각형이 닿는지 판단한다.

```c++
// 두 다각형이 서로 닿거나 겹치는지 여부를 반환한다.
// 한점이라도 겹친다면 true를 반환
bool polygonIntersects(const polygon &p, const polygon &q) {
  int N = p.size(), M = q.size();
  // 우선 한 다각형이 다른 다각형에 포함되어 있는 경우를 확인하자.
  if (isInside(p[0], q) || isInside(q[0], p)) return true;
  for (int i = 0; i < N; i++)
    for (int j = 0; j < M; j++)
      if (segmentIntersects(p[i], p[(i + 1) % N], q[j], q[(j + 1) % M]))
        return true;
  return false;
}
```

### 선형 분리
&nbsp;두 종류의 점들을 구분하는 직선이 존재하는지 여부를 찾는 문제를 선형 분리(Linear separability)라고 한다.

### 시각화에 대하여
&nbsp;시각화를 통해 문제를 해결할 수 있는 경우도 있다.

## 11. 계산 기하 알고리즘 디자인 패턴
&nbsp;더 효율적인 코드를 만드는데 도움이 된다.

### 평면 스위핑
&nbsp;평면 스위핑(plane sweeping), 혹은 라인 스위핑(line sweeping)이라고 불리는 패턴은 주어진 평면을 '쓸고 지나가면서' 문제를 해결한다.

### 직사각형의 합집합의 면적
&nbsp;이 문제는 포함-배제 원칙을 이용할 수 있다. 사각형이 n개 있을 떄 2^n개의 교집합을 방문해 풀 수 있다. 하지만 너무 느리다. 사각형을 수직선으로 잘랐을 때 단면(세로 길이)의 길이를 반환하는 함수를 만들고 직사각형의 오른쪽 끝이나 왼쪽 끝에서 각 사이의 거리를 곱하면 합집합의 면적을 구할 수 있다.

### 다각형 교집합의 넓이 구하기
&nbsp;두 다각형의 꼭지점과 변들의 교차점을 모두 찾아서 확인해보면 교집합은 항상 사다리꼴 형태를 보인다. 이 사다리꼴들의 넓이의 합을 구하면 교집합의 넓이를 구할 수 있다.

### 교차하는 선분들
&nbsp;선분의 끝점들을 찾아내고, y좌표가 증가하는 순으로 정렬해 둔다. 이 집합에 새로운 선분이 추가될 때마다 새 선분과 인접한 두 선분의 교차 여부를 확인한다.

### 회전하는 캘리퍼스
&nbsp;캘리퍼스로 무언가를 재는 과정을 이용해 문제를 풀 수 있다.

### 블록 다각형의 지름
&nbsp;다각형을 평행한 두 직선 사이에 끼우고, 다각형을 따라 직선을 한 바퀴 돌리면서 직선에 닿는 꼭지점들 간의 거리를 잰다.

## 12. 자주 하는 실수와 유의점들

### 퇴화 도형
&nbsp;다음은 퇴화(degenerate) 도형의 예다.

* 일직선 상에 있는 세 개 이상의 점들
* 서로 평행이거나 겹치는 직선/선분들
* 넓이가 0인 다각형들
* 다각형의 변들이 서로 겹치는 경우

이런 도형들을 생각해 보고 문제를 풀어야 한다.

### 직교 좌표계와 스크린 좌표계
&nbsp;데카르트 좌표계를 사용하는 것이 아닌 스크린 좌표계를 사용하면 x와 y의 좌표의 혼동을 주의해야 한다.

### 다른 실수들

* 의외로 많은 기하 문제들은 정수만을 사용해 해결할 수 있다.
* `acos()`, `asin()`이나 `atan2()`와 같은 함수들은 느리고 불안정하기 때문에 사용을 자제해야 한다.
* `acos()`, `asin()`은 `max(-1.0, min(1.0, x))`와 같이 범위를 제한하는 습관을 들여야 한다.
* `sqrt()`함수도 `sqrt(max(0.0, x))`와 같이 범위를 제한하면 좋다.

## 13. 더 읽을거리
&nbsp;이 장에서 배운 알고리즘을 좀더 자세하게 배울 수 있다.