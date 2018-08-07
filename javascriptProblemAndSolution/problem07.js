// 7. a,b,c,d 값을 구하시요

function closure(start) {
	return  function count(){
		return {
			inc: function() {start++;},
			get: function() {return start;}
		}
	}
}

var f1 = closure(0);
var f2 = f1;
var f3 = closure(0);
var fc1 = f1();
var fc2 = f2();
var fc3 = f3();
var fc4 = fc1;

fc1.inc();
fc2.inc();
fc3.inc();
fc4.inc();

var a = fc1.get();
var b = fc2.get();
var c = fc3.get();
var d = fc4.get();



/***
 * answer: a(3), b(3), c(1), d(3)
 * 
 * 
 * 
 * closure
 * 		클로저를 이용해 모듈화 가능
 * 		그림을 그려가면서 문제 해결
 * 
 * 스코프
 * 		JS는 어휘적 유효범위(스코프)를 가진다.
 * 			동적 스코프
 * 				함수 실행
 * 			어휘적 스코프
 *				함수 정의
 *
 *		최상위는 전역객체
 *		함수 선언, try catch가 스코프 생성(ES3)
 *		ES6이상은 블럭이 스코프 생성
 *		중첩 스코프 가능
 */

 // 출처: YouTube 김썬