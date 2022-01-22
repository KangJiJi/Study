1장 문제 해결과 프로그래밍 대회
=============================

## 01. 도입
&nbsp;세상에는 다양한 종류의 프로그래머들이 있다. 이런 분야 간의 차이를 뛰어넘는 좋은 개발자의 조건이 존재할까?

### 프로그래밍은 문제 해결이다
&nbsp;프로그래밍을 하기 위해서는 많은 것을 알아야 한다. 많은 제약 조건과 요구사항을 이해하고 최선의 방법을 찾아내는 능력은 분야를 막론하고 좋은 프로그래머가 되기 위해 필수적이다.

## 02. 프로그래밍 대회
&nbsp;프로그래밍 대회에 참가하는 것은 문제 해결 기술을 연마하기에 가장 좋은 방법이다.

### 문제: 록 페스티벌(난이도: 하)
&nbsp;커다란 공연장을 빌려서 록 페스티벌을 개최하려고 합니다. 이 페스티벌은 여러 날 동안 진행되며, 하루에 한 팀의 밴드가 공연장에서 콘서트를 하게 됩니다. 전체 밴드를 몇 팀 섭외할 지는 아직 결정하지 않았지만, 페스티벌의 간판 스타인 L개의 팀은 이미 섭외가 끝난 상태입니다. 따라서 페스티벌은 최소 L일 이상 진행하게 됩니다.

이번에 사용할 공연장은 하루 빌리는 데 드는 비용이 매일 매일 다릅니다. 때문에 공연 일정을 잘 정해서 공연장 대여 비용을 줄이려고 합니다. 앞으로 N일간의 공연장 대여 비용을 알고 있다고 합시다. 이 중 L일 이상을 연속해서 대여하되, 공연장을 하루 빌리는 데 드는 평균 비용을 최소화하려면 어떻게 공연장을 빌려야 할까요?

예를 들어 앞으로 6일간 공연장을 빌리는 데 드는 비용이 각 {3, 1, 2, 3, 1, 2}라고 합시다. 이미 세 팀을 섭외했다고 하면, 3일 대신 4일 동안 공연을 진행해서 평균 비용을 더 저렴하게 할 수 있습니다. 3일 동안의 평균 대여 비용을 최소화하는 방법은 2일째부터 4일째까지 공연장을 대여하는 것인데, 이 때 하루 평균 (1+2+3)/3 = 2의 비용이 듭니다. 반면 2일째부터 5일째까지 공연장을 대여하면 평균 비용이 (1+2+3+1)/4 = 7/4밖에 되지 않습니다.

### 입력
&nbsp;입력의 첫 줄에는 테스트 케이스의 수 C (C ≤ 100)가 주어집니다. 각 테스트 케이스의 첫 줄에는 공연장을 대여할 수 있는 날들의 수 N (1 ≤ N ≤ 1000)과 이미 섭외한 공연 팀의 수 L (1 ≤ L ≤ 1000, L ≤ N)이 주어집니다. 그 다음 줄에는 N개의 숫자로 공연장 대여 비용이 날짜별로 주어집니다. 모든 비용은 100 이하의 자연수입니다.

### 출력
&nbsp;입력에 주어지는 각 테스트 케이스마다 한 줄에 최소의 평균 대여 비용을 출력합니다. 10^-7 이하의 절대/상대 오차가 있는 답은 정답 처리됩니다.

### 풀이
&nbsp;이문제의 경우 2초라는 충분한 시간이 주어지기 때문에 모든 경우의 수를 비교해도 충분할 것이다. 따라서 배열N을 N의 길이 - L번 돌면서 평균값의 최솟값을 구해주는 작업을 C번하면 된다.

### 프로그래밍 대회에서 배울 수 있는 것들
&nbsp;프로그래밍 대회의 문제들은 현업에서의 사양서와 아주 다르다. 하지만 이러한 장점들이 있다.
* 단순히 텍스트를 읽고 출력하기 때문에 다른 데 정신을 빼앗기지 않고 문제를 해결하는데 집중할 수 있다.
* 명시적인 시간 제한과 메모리 제한이 있다. 따라서 알고리즘을 신중하게 설계해야 한다.
* 정답과 오답의 여부가 훨씬 명확히 가려진다.
* 프로그램을 고쳐 가며 작은 변경이 프로그램의 효율성에 미치는 영향을 직접 체험해 볼 수 있다.
* 문제를 풀때마다 처음부터 코드를 다시 짜기 때문에 대형 프로젝트에서 간과했던 프로그램의 작은 부분에 집중이 가능하다.
* 경쟁덕분에 실력을 늘리기 위한 좋은 동기가 된다.

## 03. 이 책을 읽는 방법

### 이 책의 구성
&nbsp;전체 7부에 1부와 2부는 후반부에 다루는 주제들을 공부하기 위해 필요한 기본 지식들을 다룬다.

### 필요한 배경 지식
&nbsp;컴퓨터 과학 전공하는 학부생이 독자층으로 가정한다.
> STL: Standard Template Library

### 입문자를 위한 권장 사항
&nbsp;기초적인 주제만을 우선 소화해라.

## 04. 국내에서 참가할 수 있는 프로그래밍 대회
&nbsp;국내 대표적인 프로그래밍 대회
* 한국 정보 올림피아드
* ACM-ICPC
* TopCoder
* Google Code Jam
* 기타 온라인 대회와 모의고사들
> UCPC(전국 대학생 프로그래밍 대회 동아리 연합 대회) 예선대회에 참가해본 경험이 있다.(결과는 좋지 않았다. 중간?)

## 05. 대회 준비를 위한 조언
&nbsp;독자들에게 당부하고 싶은 조언
* 가능한 한 많은 문제 풀기
* 온라인 채점 사이트 이용하기
* 가능한 한 많은 프로그래밍 대회에 참가하기
* 팀 단위 연습을 위한 조언
* 팀 노트북 준비하기(공책)