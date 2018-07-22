/**
 * 백준 15810번
 * 
 * 문제
 *      전북대학교 프로그래밍 경진 대회에서는 ACM-ICPC 스타일을 따라 문제를 해결한 팀에게 그 문제에 해당하는 풍선을 달아준다.
 *      풍선을 담당하는 N명의 스태프가 있다. 스태프마다 폐활량이 다르기 때문에 하나의 풍선을 만드는 데 걸리는 시간은 다양하다.
 *      대회가 시작되고 운영진으로부터 M개의 풍선을 만들어 달라는 의뢰가 들어왔다!
 *      각 스태프가 풍선 하나를 만드는 시간(분) Ai를 알고 있을 때, 풍선 M개를 만들기 위해서 최소 몇 분이 걸릴까?
 *      풍선을 만든 후에 문제를 표시할 것이기 때문에 풍선의 종류는 상관이 없다.
 *      모든 스태프는 풍선을 만드는 데에 정확하게 자신이 말한 시간만큼 걸린다. 예를 들어 스태프 A가 풍선 하나를 만드는 데 5분이 걸린다면, 0분에 만들기 시작해서 5분에 끝난다.
 * 
 * 입력
 *      스태프의 수 N과 풍선의 개수 M이 입력된다. (1 < N ≤ 1 000 000, 0 < M ≤ 1 000 000)
 *      다음 줄에 N명의 각 스태프들이 풍선 하나를 만드는 데 걸리는 시간 Ai가 순서대로 주어진다. Ai는 1 000 000 이하의 자연수이다.
 * 
 * 출력
 *      M개의 풍선이 다 만들어지는 최소 시간을 출력한다.
*/

#include <iostream>
using namespace std;
 
int air[1000000];
 
int main() {
	int staff, balloon, temp = 0;
	long long maxTime, minTime, tempTime, tempSum = 0;
 
	cin >> staff >> balloon;
 
	for(int i = 0; i < staff; i++) {
		cin >> temp;
		air[i] = temp;
	}
 
	maxTime = 1000000000000;
	minTime = 0;
 
	while(minTime != maxTime - 1) {
		tempTime = (maxTime + minTime) / 2;
		tempSum = 0;
		
		for(int i = 0; i < staff; i++)
			tempSum += tempTime / air[i];
 
		if(tempSum >= balloon) {
			maxTime = tempTime;
		} else {
			minTime = tempTime;
		}
	}
 
	cout << minTime + 1;
 
	return 0;
}