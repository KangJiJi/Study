/**
 * 백준 1008번
 * 
 * 문제
 *      두 정수 A와 B를 입력받은 다음, A/B를 출력하는 프로그램을 작성하시오.
 * 
 * 입력
 *      첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)
 * 
 * 출력
 *      첫째 줄에 A/B를 출력한다. 절대/상대 오차는 10^9 까지 허용한다.
*/

#include <iostream>
using namespace std;

int main() {
    double a, b;
    cin >> a >> b;
    cout.precision(11);
    cout << a / b << endl;
}