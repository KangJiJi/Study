/**
 * 백준 1157번
 * 
 * 문제
 *      알파벳 대소문자로 된 단어가 주어지면, 이 단어에서 가장 많이 사용된 알파벳이 무엇인지 알아내는 프로그램을 작성하시오. 단, 대문자와 소문자를 구분하지 않는다.
 * 
 * 입력
 *      첫째 줄에 알파벳 대소문자로 이루어진 단어가 주어진다. 주어지는 단어의 길이는 1,000,000을 넘지 않는다.
 * 
 * 출력
 *      첫째 줄에 이 단어에서 가장 많이 사용된 알파벳을 대문자로 출력한다. 단, 가장 많이 사용된 알파벳이 여러 개 존재하는 경우에는 ?를 출력한다.
*/

#include <iostream>
using namespace std;

int main() {
    char string[1000000], tempChar;
    int alphabet[26] = { 0 };
    int temp, max= 0;

    cin >> string;

    while(string[temp] != tempChar) {
        if(string[temp] > 96)
            alphabet[string[temp] - 97]++;
        else
            alphabet[string[temp] - 65]++;
        
        if(++temp == 1000000)
            break;
    }

    temp = 0;

    for(int i = 0; i < 26; i++) {
        if(max < alphabet[i]) {
            max = alphabet[i];
            tempChar = i + 65;
        } else if(max == alphabet[i])
            tempChar = '?';
    }

    cout << tempChar;

    return 0;
}