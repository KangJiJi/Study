//Make data.
function data(data) {
    this.data = data;
}

function queue(size) {
    // Make queue.
    this.queue = new Array(size);
    // Make sizeCheck to check size.
    this.sizeCheck = 0;
    // Front means head.
    this.front = 0;
    // Front means tail.
    this.rear = 0;
    // Input data in queue.
    this.put = (data) => {
        // Check if queue is full.
        if (this.sizeCheck == size)
            return flase;
        else {
            this.queue[this.rear] = data;
            this.rear++;
            this.sizeCheck++;
        }
    };
    // Output data in queue
    this.get = () => {
        if(this.isEmpty())
            return flase;
        else {
            var tempData = this.queue[this.front];
            for(var i=0; i<this.rear+1; i++) {
                this.queue[i] = this.queue[i+1];
            }
            this.rear--;
            this.sizeCheck--;
            return tempData;
        }
    };
    //Returns true if the stack is empty, or return false otherwise.
    this.isEmpty = () => {
        if(this.rear == this.front)
            return true;
        else
            return false;
    }
}

var queue = new queue(20);
var data_1 = new data("data 1");
var data_2 = new data("data 2");
var data_3 = new data("data 3");

console.log("isEmpty: " + queue.isEmpty()); // True
console.log("Front: " + queue.front) // 0
console.log("Rear: " + queue.rear) // 0
console.log("sizeCheck: " + queue.sizeCheck) // 0
// queue.get(); // error
queue.put(data_1);
queue.put(data_2);
queue.get(); // return data_1
queue.put(data_3);
console.log("sizeCheck: " + queue.sizeCheck) // 2
console.log("First queue: " + queue.queue[0].data); // queue[0] = [data_2]
console.log("Second queue: " + queue.queue[1].data); // queue[1] = [data_3]
console.log("Third queue: " + queue.queue[2]); // undefined
