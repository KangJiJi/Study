//Make data.
class data {
    constructor(data) {
        this.data = data;
    };
};

class queue {
    constructor(size) {
        // Make queue.
        this.queue = new Array(size);
        // Make sizeCheck to check size.
        this.sizeCheck = 0;
        // Front means head.
        this.front = 0;
        // Front means tail.
        this.rear = 0;
        //Define size of queue.
        this.size = size;
    };

    // Input data in queue.
    _inQueue(data) {
        if (this.sizeCheck == this.size)
            // Check if queue is full.
            return flase;
        else {
            this.queue[this.rear] = data;
            this.rear++;
            this.sizeCheck++;
        }
    };
    // Output data in queue
    _deQueue() {
        if(this._isEmpty())
            // Check if queue is full.
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
    _isEmpty() {
        if(this.rear == this.front)
            return true;
        else
            return false;
    };
}

let jsQueue = new queue(20);
const data_1 = new data("data 1");
const data_2 = new data("data 2");
const data_3 = new data("data 3");

console.log("isEmpty: " + jsQueue._isEmpty()); // True
console.log("Front: " + jsQueue.front) // 0
console.log("Rear: " + jsQueue.rear) // 0
console.log("sizeCheck: " + jsQueue.sizeCheck) // 0
// queue.get(); // error
jsQueue._inQueue(data_1);
jsQueue._inQueue(data_2);
jsQueue._deQueue(); // return data_1
jsQueue._inQueue(data_3);
console.log("sizeCheck: " + jsQueue.sizeCheck) // 2
console.log("First queue: " + jsQueue.queue[0].data); // queue[0] = [data_2]
console.log("Second queue: " + jsQueue.queue[1].data); // queue[1] = [data_3]
console.log("Third queue: " + jsQueue.queue[2]); // undefined
