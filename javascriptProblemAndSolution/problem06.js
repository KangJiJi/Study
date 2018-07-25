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