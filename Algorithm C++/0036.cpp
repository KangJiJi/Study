/**
 * 백준 1152번
 * 
 * 문제
 *      영어 대소문자와 띄어쓰기만으로 이루어진 문장이 주어진다. 이 문장에는 몇 개의 단어가 있을까? 이를 구하는 프로그램을 작성하시오.
 * 
 * 입력
 *      첫 줄에 영어 대소문자와 띄어쓰기로 이루어진 문장이 주어진다. 이 문장의 길이는 1,000,000을 넘지 않는다. 단어는 띄어쓰기 한 개로 구분되며, 공백이 연속해서 나오는 경우는 없다.
 * 
 * 출력
 *      첫째 줄에 단어의 개수를 출력한다.
*/

#include <iostream>
#include <string>
 
using namespace std;
 
int main() {
	int num = 0;
	string space, temp;
	string sentence;
 
	getline(cin, sentence);
	
	space = " ";
 
	for(int i = 0; i < sentence.length(); i++) {
		temp = sentence[i];
		if(temp == space && i != 0) {
			num++;
		}
	}
	
	if(temp == space) {
		num--;
	}
 
	cout << num + 1;
 
	return 0;
}