// Quick sort functional programming
let test = [
  29,
  5,
  96,
  21,
  65,
  45,
  20,
  69,
  54,
  18,
  22,
  98,
  36,
  14,
  14,
  92,
  39,
  1,
  1,
  11,
];

const sort = (arr) => {
  if (arr.length < 2) {
    return arr;
  } else {
    return [
      ...sort([
        ...arr.filter((value, index) => {
          if (value < arr[arr.length - 1] && index != arr.length - 1) {
            return value;
          }
        }),
      ]),
      arr[arr.length - 1],
      ...sort([
        ...arr.filter((value, index) => {
          if (value >= arr[arr.length - 1] && index != arr.length - 1) {
            return value;
          }
        }),
      ]),
    ];
  }
};

let sorted = sort(test);

console.log(sorted);
