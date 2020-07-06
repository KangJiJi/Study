//Make data.
class node {
  constructor(data) {
    this.data = data;
    // Previous node
    this.preNode = null;
    // Next node
    this.nextNode = null;
  }
}

class doubliyLinkedList {
  constructor() {
    // Count number of node
    this.numberOfNode = 0;
    // Make headNode variation
    this.headNode;
    // Make tailNode variation
    this.tailNode;
  }
  // Add node at head
  _addHead(node) {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero
      this.headNode = node;
      this.tailNode = node;
    } else {
      // Use call by value
      node.nextNode = this.headNode;
      this.headNode.preNode = node;
      this.headNode = node;
    }
    this.numberOfNode++;
  }
  // Add node at tail
  _addTail(node) {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero
      this.headNode = node;
      this.tailNode = node;
    } else {
      // Use call by value
      this.tailNode.nextNode = node;
      node.preNdoe = this.tailNode;
      this.tailNode = node;
    }
    this.numberOfNode++;
  }
  // Add node at index th
  _addNode(node, index) {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero
      this.headNode = node;
      this.tailNode = node;
    } else if (index > this.numberOfNode) {
      return false;
    } else if (index == 1) {
      this._addHead(node);
    } else if (index == this.numberOfNode) {
      this._addTail(node);
    } else {
      // Use call by value
      var tempNextNode = this._searchNode(index);
      var tempPreNode = this._searchNode(index - 1);
      tempPreNode.nextNode = node;
      node.preNode = tempPreNode;
      tempNextNode.preNode = node;
      node.nextNode = tempNextNode;
    }
    this.numberOfNode++;
  }
  // Erase the index th node
  _eraseNode(index) {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero
      return false;
    } else {
      // Use call by value
      var tempNextNode = this._searchNode(index + 1);
      var tempPreNode = this._searchNode(index - 1);
      tempNextNode.preNode = tempPreNode;
      tempPreNode.nextNode = tempNextNode;
      delete this._searchNode(index);
      this.numberOfNode--;
    }
  }
  // Return node at head
  _peek() {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero
      return false;
    } else {
      return this.headNode;
    }
  }
  // Print the index th node
  _printNode(index) {
    if (this.numberOfNode == 0) {
      // Exception handling when numberOfNode is zero
      return false;
    } else {
      console.log(index + "th node: " + this._searchNode(index).data);
    }
  }
  // Search the index th node
  _searchNode(index) {
    if (this.numberOfNode < index) {
      // Exception handling when numberOfNode is smaller than index
      return false;
    } else {
      var tempPresentNode = this.headNode;
      for (var i = 1; i < index; i++) {
        tempPresentNode = tempPresentNode.nextNode;
      }
      return tempPresentNode;
    }
  }
  // Returns true if the stack is empty, or return false otherwise.
  _isEmpty() {
    // Exception handling when numberOfNode is zero
    if (this.numberOfNode == 0) return true;
    else return false;
  }
}

let jsDoubliyLinkedList = new doubliyLinkedList();
const node_1 = new node("node 1");
const node_2 = new node("node 2");
const node_3 = new node("node 3");

console.log("_isEmpty: " + jsDoubliyLinkedList._isEmpty()); // True
jsDoubliyLinkedList._addNode(node_1); // Add node_1
jsDoubliyLinkedList._addHead(node_2); // Add ndoe_2 at head
jsDoubliyLinkedList._addTail(node_3); // Add node_3 at tail

jsDoubliyLinkedList._printNode(1); // Print node_2
jsDoubliyLinkedList._printNode(2); // Print node_1
jsDoubliyLinkedList._printNode(3); // Print node_3

jsDoubliyLinkedList._eraseNode(2);
console.log("After erasing.");
jsDoubliyLinkedList._printNode(1); // Print node_2
jsDoubliyLinkedList._printNode(2); // Print node_3

console.log("Frist node: " + jsDoubliyLinkedList._peek().data); // Print node_2;
