/**
 * 백준 1065번
 * 
 * 문제
 *      어떤 양의 정수 X의 자리수가 등차수열을 이룬다면, 그 수를 한수라고 한다. 등차수열은 연속된 두 개의 수의 차이가 일정한 수열을 말한다. N이 주어졌을 때, 1보다 크거나 같고, N보다 작거나 같은 한수의 개수를 출력하는 프로그램을 작성하시오. 
 * 
 * 입력
 *      첫째 줄에 1,000보다 작거나 같은 자연수 N이 주어진다.
 * 
 * 출력
 *      첫째 줄에 1보다 크거나 같고, N보다 작거나 같은 한수의 개수를 출력한다.
*/

#include <iostream>
using namespace std;

int isNum(int num) {
	// num == (a * 100) + (b * 10) + c
	int a, b, c = 0;

	if(num > 0 && num < 10) {
		return 1;
	} else if(num >= 10 && num < 100) {
		return 1;
	} else if(num >= 100 && num < 1000) {
		c = num % 10;
		b = (num / 10) % 10;
		a = (num / 100) % 10;
		
		if(a - b == b - c) {
			return 1;
		} else {
			return 0;
		}
	} else {
		return 0;
	}
}

int main() {
	int num, result = 0;
	cin >> num;
	
	for(int i = 1; i <= num; i++) {
		result += isNum(i);
	}
	
	cout << result << "\n";
	
	return 0;
}