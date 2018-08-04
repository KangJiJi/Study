/**
 * 백준 2675번
 * 
 * 문제
 *      문자열 S를 입력받은 후에, 각 문자를 R번 반복해 새 문자열 T를 만든 후 출력하는 프로그램을 작성하시오.
 *      다시 설명하자면, 첫 번째 문자를 R번 반복하고, 두 번째 문자를 R번 반복하는 식으로 T를 만들면 된다. S에는 QR Code "alphanumeric" 문자만 들어있다.
 *      QR Code "alphanumeric" 문자는 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$%*+-./: 이다.
 * 
 * 입력
 *      첫째 줄에 테스트 케이스의 개수 T(1 <= T <= 1,000)가 주어진다. 각 테스트 케이스는  반복 횟수 R(1 <= R <= 8), 문자열 S가 공백으로 구분되어 주어진다. S의 길이는 적어도 1이며, 20글자를 넘지 않는다. 
 * 
 * 출력
 *      각 테스트 케이스에 대해 T를 출력한다.
*/

#include <iostream>
using namespace std;

int main() {
    int test, repeat = 0;
    char string[20];

    cin >> test;

    for(int i = 0; i < test; i++) {
        cin >> repeat >> string;

        for(int j = 0; j < 20; j++) {
            if(!string[j])
                break;

            for(int k = 0; k < repeat; k++)
                cout << string[j];
        }

        cout << "\n";
    }

    return 0;
}