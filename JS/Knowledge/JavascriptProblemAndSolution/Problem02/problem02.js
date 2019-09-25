// 2. 다음 값은?

function abc() {
	var a = "bbb";
    console.log(a) //  ---- 1

	function c() {
        console.log(a); // --- 2
		(function() {
            console.log(a); // --- 3
	        a = "ccc";
        })();
        var a;
        console.log(a) // ---4
    }

    function d() {
        console.log(a); // --- 5
    }

    c();
    a = "ddd";
    d();
};

abc();



/***
 * answer
 *      1. bbb
 *      2. undefined
 *      3. undefined
 *      4. ccc
 *      5. ddd
 * 
 * Hoisting
 *      스코프별로 변수 table을 선언 만든다. 스코프 안에 변수 선언 혹은 함수 선언문을 찾아서 변수 테이블에 추가. 대입은 실행 시점에 대입.
 *      var a = 2; 의 동작 방식
 *          var a; a = 2;
 *          변수 table을 만들고 table에 a라는 변수를 추가(인터프리터 시점). 그리고 a에 2를 대입한다(실행 시점).
 * 
 *     foo = function()도 실행 시점에 대입.
 *      변수 선언없이 변수에 값대입을 하면 global table에 변수를 추가하고 대입.
 */

 // 출처: YouTube 김썬