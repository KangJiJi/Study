# Array method(Array의 method)

## Array의 자주 사용하는 메서드

&nbsp;js를 사용하면서 Array의 자주 사용하는 메서드들에 대해 정리한다. Array는 `참조 타입`이다.

## concat

&nbsp;`concat`메서드는 배열이나 값을 합쳐서 새 배열을 반환한다.

```javascript
const array = [1, 2, 3];

array.concat(["H", "e", "l", "l", "o"]); // [1, 2, 3, "H", "e", "l", "l", "o"]
array.concat("H", "e"); // [1, 2, 3, "H", "e"]
```

## filter

&nbsp;`filter`메서드는 주어진 함수의 반환 값이 true인 값들을 모아서 새로운 배열을 반환한다.

```javascript
const array = ["Hello", "world", "kang", "ji"];

array.filter((val) => val.length > 4); // ["Hello", "world"]
array.filter((val) => val.length > 5); // []
```

## flat

&nbsp;`flat`메서드는 모든 하위 배열 요소를 지정한 깊이까지 재귀적으로 이어붙인 새로운 배열을 반환한다.

```javascript
const array = ["Hello", "world", ["kang", "ji"]];

array.flat(1); // ["Hello", "world", "kang", "ji"], default value is 1

// Tip 다차원 배열의 원소 수를 세는 함수, [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]] => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const getCountOfElements = (arr) => arr.flat(Infinity).length;
```

> 단, IE는 flat메서드를 지원하지 않는다.

## forEach, map

&nbsp;`forEach`메서드는 입력된 함수를 배열의 각각의 요소에 대해 실행한다. `map`메서드는 각각의 요소에 대해 실행하고, 새로운 배열을 반환한다. 두 메서드 모두 원래 배열은 변경되지 않는다.

```javascript
const array = ["Hello", "world"];

array.forEach((val, index, currentArray) => console.log(val)); // Hello\n world
array.map((val, index, currentArray) => val + 1); // ["Hello1", "world1"]
```

## indexOf(String && Array)

&nbsp;`indexOf`메서드는 주어진 값과 일치하는 첫 번째 인덱스를 반환한다. Array에서 `indexOf`는 지정된 요소를 찾을 수 있는 첫 번째 인덱스를 반환한다. 둘 다 찾을 수 없으면 -1을 반환한다.

```javascript
let array = ["H", "e", "l", "l", "o"];

array.indexOf("e"); // 1
array.indexOf("el"); // -1
```

## join

&nbsp;`join`메서드는 배열의 모든 요소를 연결해 하나의 문자열을 만들어 반환한다.

```javascript
const array = ["Hello", "world"];

array.join(); // "Hello,world"
array.join(""); // "Helloworld"
array.join(" "); // "Hello world"
array.join("-"); // "Hello-world"
```

## pop, push, shift, unshift

&nbsp;배열에 앞과 뒤에 데이터를 추가하거나 제거하는 메서드들이다.

- pop: 배열 끝에서 제거
- push: 배열 끝에서 추가
- shift: 배열 앞에서 제거
- unshift: 배열 앞에서 추가

```javascript
const array = ["Hello", "world"];

array.push("KangJi"); // ["Hello", "world", "KangJi"], 반환 값은 늘어난 length
array.pop(); // ["Hello", "world"], 반환 값은 "KangJi"
array.unshift("KangJi"); // ["KangJi", "Hello", "world"], 반환 값은 늘어난 length
array.shift(); // ["Hello", "world"], 반환 값은 "KangJi"

const emptyArray = [];

emptyArray.pop(); // undefined 반환
emptyArray.shift(); // undefined 반환
```

## slice

&nbsp;`slice`는 배열의 일부분을 추출해서 새로운 배열을 반환한다.

```javascript
const array = ["H", "e", "l", "l", "o"];

array.slice(); // ["H", "e", "l", "l", "o"]
array.slice(1); // ["e", "l", "l", "o"]
array.slice(1, 2); // ["e"]
array.slice(1, 0); // []
```

## sort

&nbsp;`sort`메서드는 배열의 요소를 적절한 위치에 정렬한다. 새로운 배열이 반환되는 것이 아닌 원래 배열이 변경된다. 기본 정렬은 유니코드의 순서대로 정령된다.

```javascript
const array = ["h", "e", "l", "l", "o"];

array.sort(); // ["e", "h", "l", "l", "o"]
```

메서드의 인자로 비교 함수를 직접 구현할 수 있다.

- compareFunction(a, b) < 0 : a는 b보다 낮은 색인으로 처리한다.
- compareFunction(a, b) = 0 : a와 b를 변경하지 않는다.
- compareFunction(a, b) > 0 : b는 a보다 낮은 색인으로 처리한다.

> 같은 값의 `compareFunction(a, b)`에 대해서는 항상 같은 값을 반환해야 한다.

## splice

&nbsp;`splice`메서드는 배열의 기존 요소를 생성, 수정, 삭제하여 배열의 내용을 변경한다. 첫 번째 인자로 시작 인덱스를 넣고 두 번째 인자로 count를 넣는다. 세 번째 인자를 지정하지 않으면 삭제, 지정하면 추가가 된다.

```javascript
let vegetables = ["양배추", "순무", "무", "당근"];
let removedItems = vegetables.splice(1, 2);

console.log(vegetables); // ['양배추', '당근']
console.log(removedItems); // ['순무', '무']

vegetables.splice(1, 0, "오이", "무"); // ['양배추', '오이', '무', '당근']
```

## toString

&nbsp;`toString`메서드는 배열의 요소를 문자열로 변경한다.

```javascript
const array = ["h", "e", "l", "l", "o"];

array.toString(); // "h,e,l,l,o"
```
