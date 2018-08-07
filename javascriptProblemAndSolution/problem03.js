// 3. 다음중 값이 다른 this는?

var obj = {
	a: console.log(this),  // --- 1
	fn: function() {
		console.log(this); // --- 2
		function fn() {
			console.log(this); // --- 3
		}
		fn();
	}
}

obj.a;
obj.fn();



/***
 * answer: 2(obj), 1(global), 3(global)
 * 
 * function fn() { console.log(this) } fn();은 global.(암기)
 * 
 * 인터프리터 시점에 변수 table을 만들고 기본적으로 this와 argument변수 추가.
 * 
 * var obj = { a: console.log(this) }는 obj.a = console.log(this)와 같음.
 * 
 * 함수를 호출하는 시점에 . 앞에 있는 것이 this로 바인딩 됨.
 * 
 * setTimeout(obj.fn, 100);
 * 		var temp = obj.fn();
 * 		setTimeout(temp, 100);으로 변환하고 실행.
 * 		temp()에서 temp앞에 아무것도 없으므로 this는 global.
 * 
 * this를 바꾸는 방법
 * 		call, apply, bind
 */

 // 출처: YouTube 김썬