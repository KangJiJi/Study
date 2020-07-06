//Make data.
class data {
  constructor(data) {
    this.data = data;
  }
}

class stack {
  constructor(size) {
    //Make stack.
    this.stack = new Array(size);
    //Top means TOS(Top Of Stack).
    this.top = 0;
    //Define size of stack.
    this.size = size;
  }

  //Input data in TOS.
  _push(data) {
    if (this.top > this.size)
      //Check the stack
      return false;
    else {
      this.stack[this.top] = data;
      this.top++;
    }
  }
  //Output data in TOS.
  _pop() {
    if (this._isEmpty == true)
      //Check the stack
      return false;
    else {
      this.top--;
      return this.stack[this.top];
    }
  }
  //Returns true if the stack is empty, or return false otherwise.
  _isEmpty() {
    if (this.top == 0) return true;
    else return false;
  }
}

// Use
let jsStack = new stack(20); //Make stack with size 20.
const data_1 = new data("data 1"); // Make data_1
const data_2 = new data("data 2"); // Make data_2
const data_3 = new data("data 3"); // Make data_3

console.log("isEmpty: " + jsStack._isEmpty()); // True
console.log("TOS: " + jsStack.top); // 0
// stack.pop(); // error
jsStack._push(data_1);
jsStack._push(data_2);
jsStack._pop(); // return data_2
jsStack._push(data_3);
console.log("First stack: " + jsStack.stack[0].data); // stack[0] = [data_1]
console.log("Second stack: " + jsStack.stack[1].data); // stack[1] = [data_3]
