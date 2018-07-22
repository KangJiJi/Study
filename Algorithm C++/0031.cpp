/**
 * 백준 4344번
 * 
 * 문제
 *      대학생 새내기들의 90%는 자신이 반에서 평균은 넘는다고 생각한다. 당신은 그들에게 슬픈 진실을 알려줘야 한다.
 * 
 * 입력
 *      첫째 줄에는 테스트케이스의 개수 C가 주어진다.
 *      둘째 줄부터 각 테스트케이스마다 학생의 수 N(1 ≤ N ≤ 1000, N은 정수)이 첫 수로 주어지고, 이어서 N명의 점수가 주어진다. 점수는 0보다 크거나 같고, 100보다 작거나 같은 정수이다.
 * 
 * 출력
 *      각 케이스마다 한 줄씩 평균을 넘는 학생들의 비율을 반올림하여 소수점 셋째자리까지 출력한다.
*/

#include <iostream>
#include <cmath>
#include <vector>
using namespace std;

int main() {
	int num, people, temp = 0;
	double percent, average = 0;
	
	cin >> num;
	
	for(int i = 0; i < num; i++) {
		cin >> people;
		vector<double> score(people);
		average = 0;
		
		for(int j = 0; j < people; j++) {
			cin >> temp;
			score[j] = (double)temp;
			average += temp;
		}
		
		average = average / (double)people;
		temp = 0;
		
		for(int k = 0; k < people; k++) {
			if(score[k] > average) {
				temp += 1;
			}
		}
		
		percent = ((double)temp / (double)people) * 100;
		percent = roundf(percent * 1000) / 1000;
		cout.setf(ios::fixed);
		cout.precision(3);
		cout << percent << "%" << "\n";
	}
	
	return 0;
}