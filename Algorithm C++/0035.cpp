/**
 * 백준 2448번
 * 
 * 문제
 *      예제를 보고 별찍는 규칙을 유추한 뒤에 별을 찍어 보세요.
 * 
 * 입력
 *      첫째 줄에 N이 주어진다. N은 항상 3*2^k 수이다. (3, 6, 12, 24, 48, ...) (k<=10)
 * 
 * 출력
 *      첫째 줄부터 N번째 줄까지 별을 출력한다.
*/

#include <iostream>
using namespace std;

int star[3072][6143] = { 0 };

void drawStar(int row, int col, int check) {
	if(check != 3) {
		drawStar(row, col, check / 2);
		drawStar(row + (check / 2), col - (check / 2), check / 2);
		drawStar(row + (check / 2), col + (check / 2), check / 2);
	}
 
	if(check == 3) {
		star[row][col] = 1;
		star[row + 1][col - 1] = 1;
		star[row + 1][col + 1] = 1;
		star[row + 2][col - 2] = 1;
		star[row + 2][col - 1] = 1;
		star[row + 2][col] = 1;
		star[row + 2][col + 1] = 1;
		star[row + 2][col + 2] = 1;
	}
}
 
int main() {
	int num = 0;
	cin >> num;
	
	drawStar(0, num - 1, num);
 
	for(int i = 0; i < num; i++) {
		for(int j = 0; j < ((num * 2) - 1); j++) {
			if(star[i][j] == 1) {
				cout << "*";
			} else {
				cout << " ";
			}
		}
		cout << "\n";
	}
 
	return 0;
}