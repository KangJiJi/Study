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