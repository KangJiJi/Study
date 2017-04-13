//Make data.
function data(data) {
    this.data = data;
}

// If it is a singleton pattern, it is better.
function stack(size) {
    //Make stack.
    this.stack = new Array(size);
    //Top means TOS(Top Of Stack).
    this.top = 1;
    //Input data in TOS.
    this.push = (data) => {
        //Check the stack
        if (this.top > size)
            return false;
        else {
            this.stack[this.top] = data;
            this.top++;
        }
    };
    //Output data in TOS.
    this.pop = () => {
        //Check the stack
        if (this.isEmpty == true)
            return false;
        else {
            this.top--;
            return this.stack[this.top];
        }
    };
    //Returns true if the stack is empty, or return false otherwise.
    this.isEmpty = () => {
        if (this.top == 1)
            return true;
        else
            return false;
    };
};


// Use
var stack = new stack(20); //Make stack with size 20.
var data_1 = new data("data 1"); // Make data_1
var data_2 = new data("data 2"); // Make data_2
var data_3 = new data("data 3"); // Make data_3

console.log("isEmpty: " + stack.isEmpty()); // True
console.log("TOS: " + stack.top); // 1
// stack.pop(); // error
stack.push(data_1);
stack.push(data_2);
stack.pop(); // return data_2
stack.push(data_3);
console.log("First stack: " + stack.stack[1].data); // stack[1] = [data_1]
console.log("Second stack: " + stack.stack[2].data); // stack[2] = [data_3]
