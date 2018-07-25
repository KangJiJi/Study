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