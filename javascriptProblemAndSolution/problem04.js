// 4.a, b의 값은?

var a = 0;
for(var i = 5; i--;){a++};
console.log(a);

var b = 0;
for(var i = 5; i--,i;){b++};
console.log(b);



/***
 * answer: a(5), b(4)
 * 
 * 
 * 
 * 표현식과 문장(expression && statement)
 *      표현식
 *          자바스크립트 인터프리터가 계산하여 값을 구할 수 있는 자바스크립트 구절(값을 만들 수 있으면 표현식).
 *              리터럴 표현식(literal expression): 1, "hi", {a: 1}, [1, 2], function() {}
 *
 *      복잡한 표현식
 *          연산자 + 표현식: 1 + 1
 * 
 *      문장
 *          명령을 수행.(if, for)
 *          자바스크립트 프로그램이란 문장의 모음
 *          문장이 표현식을 포함.
 * 
 *      표현문
 *          부수 효과(결과값 이외의 다른 상태를 변경시키는 것)가 존재 해야함(i++, ++i)
 *      
 * 
 * 연산자 우선순위와 결합성
 *      x = y = 2는 y에 먼저 2를 대입하고 x에 대입.(좌결합성)
 * 
 * 연산자
 *      delete: 삭제 가능여부(boolean)
 *      &&: 앞 표현식이 false이면 뒤 표현식 실행 X
 *      ||: 앞 표현식이 true이면 뒤 표현식 실행 X
 *      fn(a(), b()): a와 b를 실행하고 return값으로 fn을 실행
 *      ,: 순차적으로 표현식을 실행하고 마지막 값을 return. x, y, z의 결과값은 z
 * 
 * false와 true
 *      false: 0, -0, null, false, NaN, undefined, ""
 *      true: false이외의 값은 true
 * 
 * 0과 -0
 *      0 === -0은 true이지만 0과 -0은 다르다.
 *      1 / 0은 infinity, 1 / -0은 negative infinity이다.
 * 
 * for문
 * for(선언문 || 표현식; 표현식; 표현식) 문장
 *      for(var i = 0; i < a.length; a[i++] = 0); 
 *      배열을 0으로 초기화 하는 코드.
 */



if(true)
    if(false)
        console.log(1);
else
    console.log(2);

/***
 * answer: 2출력
 * 
 * 자바스크립트는 들여쓰기로 구분을 하지 않음.
 * 따라서 else는 두번째 if문의 else가 됨.
 */



 p=[2];i=3;l=j=1;while(i<100){!j&&(i=j=p.push(i++))||i%p[--j]||(i++,j=i)}

 /***
  * Glof code
  * 
  * 소수를 구하는 코드
  */