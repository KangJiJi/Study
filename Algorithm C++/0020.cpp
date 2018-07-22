/**
 * 백준 2440번
 * 
 * 문제
 *      첫째 줄에는 별 N개, 둘째 줄에는 별 N-1개, ..., N번째 줄에는 별 1개를 찍는 문제
 * 
 * 입력
 *      첫째 줄에 N (1<=N<=100)이 주어진다.
 * 
 * 출력
 *      첫째 줄부터 N번째 줄 까지 차례대로 별을 출력한다.
*/

#include <iostream>
using namespace std;

int main() {
	int num;
	cin >> num;

	for(int i = 1; i <= num; i++) {
		for(int j = 0; j <= num - i; j++) {
			cout << "*";
		}
		cout << "\n";
	}

	return 0;
}