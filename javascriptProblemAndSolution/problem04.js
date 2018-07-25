// 4.a, b의 값은?

var a = 0;
for(var i =5; i--;){a++};
console.log(a);

var b = 0;
for(var i =5; i--,i;){b++};
console.log(b);