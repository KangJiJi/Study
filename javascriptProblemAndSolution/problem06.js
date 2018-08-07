// 6. console.log에 찍히는 값을 적으시오.

function Child(aa, bb){
	if(this.constructor !== Child) new Child();
	this.aa = aa;
	this.bb = bb;
}

function Parent() {
	if(this.constructor !== Parent) new Parent();
}

Parent.prototype.a = [1];
Parent.prototype.f = function() {
	this.a.push(this.a.length+1);
}

Child.prototype = new Parent();
Child.prototype.f = function() {
	this.a.push(this.a.length *2);
}
Child.prototype.constructor = Child

var p = new Parent();
var c = new Child();

p.f();
c.f();

console.log(p.a);
console.log(c.a);



/***
 * answer: p.a() === c.a() ([1, 2, 4])
 * 
 * 
 * 
 * Prototype
 * 
 * prototype
 * 		다른 객체의 기반이 되는 객체
 * 		기본적으로 제일 상위는 Object
 * 		set과 get은 비대칭적
 * 
 * new 연산자
 * 		함수의 prototype을 __proto__로 가지는 객체 생성
 * 		위의 객체를 this로 바인딩하고 함수 실행
 * 		그리고 함수의 리턴 값이 객체면 객체 반환
 * 		아니면 this를 반환
 * 
 * prototype chaining
 * 		__proto__ 링크를 계속 따라서 property를 찾고, 없으면 undefined 반환.
 */

 // 출처: YouTube 김썬