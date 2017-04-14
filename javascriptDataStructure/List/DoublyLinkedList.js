//Make data.
function node(data) {
    this.data = data;
    this.preNode = null; // Previous node
    this.nextNode = null; // Next node
}

function doubliyLinkedList() {
    // Count number of node
    this.numberOfNode = 0;
    // Make headNode variation
    this.headNode;
    // Make tailNode variation
    this.tailNode;
    // Add node at head
    this.addHead = (node) => {
        // Exception handling when numberOfNode is zero
        if (this.numberOfNode == 0) {
            this.headNode = node;
            this.tailNode = node;
        } else {
            // Use call by reference
            node.nextNode = this.headNode;
            this.headNode.preNode = node;
            this.headNode = node;
        }
        this.numberOfNode++;
    };
    // Add node at tail
    this.addTail = (node) => {
        // Exception handling when numberOfNode is zero
        if (this.numberOfNode == 0) {
            this.headNode = node;
            this.tailNode = node;
        } else {
            // Use call by reference
            this.tailNode.nextNode = node;
            node.preNdoe = this.tailNode;
            this.tailNode = node;
        }
        this.numberOfNode++;
    };
    // Add node at index th
    this.addNode = (node, index) => {
        // Exception handling when numberOfNode is zero
        if (this.numberOfNode == 0) {
            this.headNode = node;
            this.tailNode = node;
        } else if (index > this.numberOfNode) {
            return false;
        } else if (index == 1) {
            this.addHead(node);
        } else if (index == this.numberOfNode) {
            this.addTail(node);
        } else {
            // Use call by reference
            var tempNextNode = this.searchNode(index);
            var tempPreNode = this.searchNode(index - 1);
            tempPreNode.nextNode = node;
            node.preNode = tempPreNode;
            tempNextNode.preNode = node;
            node.nextNode = tempNextNode;
        }
        this.numberOfNode++;
    };
    // Erase the index th node
    this.eraseNode = (index) => {
        // Exception handling when numberOfNode is zero
        if (this.numberOfNode == 0) {
            return false;
        } else {
            // Use call by reference
            var tempNextNode = this.searchNode(index + 1);
            var tempPreNode = this.searchNode(index - 1);
            tempNextNode.preNode = tempPreNode;
            tempPreNode.nextNode = tempNextNode;
            delete this.searchNode(index);
            this.numberOfNode--;
        }
    };
    // Return node at head
    this.peek = () => {
        // Exception handling when numberOfNode is zero
        if (this.numberOfNode == 0) {
            return false;
        } else {
            return this.headNode;
        }
    };
    // Print the index th node
    this.printNode = (index) => {
        // Exception handling when numberOfNode is zero
        if (this.numberOfNode == 0) {
            return false;
        } else {
            console.log(index + "th node: " + this.searchNode(index).data);
        }
    };
    // Search the index th node
    this.searchNode = (index) => {
        // Exception handling when numberOfNode is zero
        if (this.numberOfNode < index) {
            return false;
        } else {
            var tempPresentNode = this.headNode
            for (var i = 1; i < index; i++) {
                tempPresentNode = tempPresentNode.nextNode;
            }
            return tempPresentNode;
        }
    };
    // Returns true if the stack is empty, or return false otherwise.
    this.isEmpty = () => {
        // Exception handling when numberOfNode is zero
        if (this.numberOfNode == 0)
            return true;
        else
            return false;
    }
}

var doubliyLinkedList = new doubliyLinkedList();
var node_1 = new node("node 1");
var node_2 = new node("node 2");
var node_3 = new node("node 3");

console.log("isEmpty: " + doubliyLinkedList.isEmpty()); // True
doubliyLinkedList.addNode(node_1); // Add node_1
doubliyLinkedList.addHead(node_2); // Add ndoe_2 at head
doubliyLinkedList.addTail(node_3); // Add node_3 at tail

doubliyLinkedList.printNode(1); // Print node_2
doubliyLinkedList.printNode(2); // Print node_1
doubliyLinkedList.printNode(3); // Print node_3

doubliyLinkedList.eraseNode(2);
console.log("After erasing.");
doubliyLinkedList.printNode(1); // Print node_2
doubliyLinkedList.printNode(2); // Print node_3

console.log("Frist node: " + doubliyLinkedList.peek().data); // Print node_2;
