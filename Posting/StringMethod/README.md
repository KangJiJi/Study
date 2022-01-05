# String method(String의 method)

## String의 자주 사용하는 메소드

&nbsp;js를 사용하면서 String의 자주 사용하는 메소드들에 대해 정리한다. String은 `원시 타입`이다.

## bracket

&nbsp;문자열도 bracket([])을 통해서 특정 값에 접근할 수 있다.

```javascript
const string = "Hello";

string[1]; // "e"
```

## fromCharCode

&nbsp;`fromCharCode`는 숫자를 아스키 코드 값에 맞게 문자로 변경시킬 때 유용하다. 또한 UTF-16 코드 유닛을 참고해서 문자열을 생성하기도 한다.

```javascript
const string = String.fromCharCode(65, 66, 67);

string; // "ABC"
```

## charCodeAt

&nbsp;`charCodeAt`은 문자를 UTF-16 코드를 나타내는 정수를 반환한다. 입력 값으로 문자가 아닌 `index`값을 받는다.

```javascript
const string = "ABC";

string.charCodeAt(0); // 65
string.charCodeAt(1); // 66
string.charCodeAt(2); // 67
```

## concat

&nbsp;`concat`은 매개변수로 전달된 모든 문자열을 붙여서 반환한다.

```javascript
const string = "H";
const tempString = "lo";

string.concat("e", "l", tempString); // "Hello"
```

## indexOf

&nbsp;`indexOf`메소드는 주어진 값과 일치하는 첫 번째 인덱스를 반환한다. 찾을 수 없으면 -1을 반환한다.

```javascript
const string = "Hello";

string.indexOf("el"); // 1
string.indexOf("el"); // 1
```

## replace

&nbsp;`replace`는 subString과 newString을 매개 변수로 받아서 문자열을 치환한다. subString에 문자열이 입력되면 가장 처음 하나의 문자열만 변경되며, 찾지 못하면 변경 안 하고 원래 값을 반환한다. 또한 정규식이 입력되면 패턴이 일치하는 모든 부분이 치환된다.

```javascript
const string = "Hello";

string.replace("l", "p"); // "Heplo"
```

## search

&nbsp;`search`는 정규식을 이용해서 패턴이 일치하는 곳의 index를 반환한다. 찾지 못하면 -1을 반환한다.

```javascript
const string = "Hello 100";
const regex = /[0-9]/g;

string.search(regex); // 6
```

## slice

&nbsp;`slice`는 문자열 일부를 추출해서 새로운 문자열을 반환한다.

```javascript
let string = "Hello";

string.slice(); // "Hello"
string.slice(1); // "ello"
string.slice(1, 2); // "el"
string.slice(1, 0); // ""
```

## split

&nbsp;`split`은 구분자를 이용해서 여러 개의 문자열로 나눈다. Array로 반환된다.

```javascript
const string = "Hello world";

string.split("l"); // ["He", "", "o wor", "d"]
string.split(" "); // ["Hello", "world"]
string.split(""); // ["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
// 위와 같은 방법은 특수문자(UTF-16 등등)으로 하게되면 오류가 발생할 수 있어서 spread연산자를 사용하는 것을 추천한다.
string.split(" ", 1); // ["Hello"], 구분자를 통해서 나눈 배열의 크기를 지정한다.
string.split(); // ["Hello world"]
```

## toUpperCase, toLowerCase

&nbsp;대문자로 변환하거나 소문자로 변환하는 메소드다.

```javascript
const string = "Hello";

string.toUpperCase(); // "HELLO"
string.toLowerCase(); // "hello"
```
