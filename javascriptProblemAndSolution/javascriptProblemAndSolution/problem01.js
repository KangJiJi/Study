// 1. if(2 == ___ ) 중에 밑줄에 값이 들어올때 true가 아닌 경우?

//  1. Number(2);
//  2. Number(2).valueOf();
//  3. Number(2).toString();
//  4. 2.valueOf();
//  5. 2 .toString();



/***
 * answer: 4(Syntax Error)
 * 
 * 기본형
 *      string, number, boolean, undefined, null, symbol
 * 
 * 참조형
 *      배열, 객체 등등
 * 
 * ==: 동치 비교
 *      null == undefined 은 true.
 *      NaN == NaN 은 false.
 *      0 == "0" 는 문자열을 숫자로 변환해 일치 비교(true).
 *      true == "1" 는 true를 숫자로 변환하고 문자열도 숫자로 변화해 일치 비교(true).
 *      0 == "a" 는 문자열을 NaN으로 변환하고 일치 비교(false).
 *      [2, 3] == "2,3" 는 참조형이 기본형이 될 때까지 valueOf를 실행하고 toString실행 그리고 일치 비교(true).
 * 
 * ===: 일치 비교
 *      기본형 같은 경우 형과 값이 일치해야 true반환.
 * 
 * 숫자. 뒤에는 무조건 숫자가 나와야 함(소수점).
 * 숫자.숫자.toString()은 정상 작동 숫자.숫자.숫자 이런 숫자는 없기 때문.
 * 하지만 숫자 .뒤에는 수소점이 없다는 것을 의미.
 */

 // 출처: YouTube 김썬